// ─── SCENARIO.JS — OSCE Scenario Generator (engine + UI) ─────────────────────────
// Generates a complete, physiologically-coherent OSCE station on demand. The app is
// the scenario AUTHOR, not an assessor: it hands a study group a fresh station to run,
// then a tap-to-reveal panel anchors their debrief. No marking, no branching.
//
// Data comes from js/data/scenarios.js (SCEN_VITALS + PRESENTATIONS).

// ── HELPERS ──────────────────────────────────────────────────────────────────────
// Random integer in [lo, hi] inclusive.
function _ri(lo, hi) { return Math.floor(Math.random() * (hi - lo + 1)) + lo; }
// Random float in [lo, hi] to 1 decimal (for temp / bgl).
function _rf(lo, hi) { return Math.round((Math.random() * (hi - lo) + lo) * 10) / 10; }
// Pick a random element from an array.
function _pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Find the vital age-band for a given age in years: first band whose age >= patient age.
function scenVitalBand(age) {
  return SCEN_VITALS.find(b => age <= b.age) || SCEN_VITALS[SCEN_VITALS.length - 1];
}

// Generate the patient's age (years) within a presentation's demographic constraints.
// Weighted toward whole years for adults, allows young paeds where the band permits.
function _genAge(demo) {
  const lo = demo.minAge, hi = demo.maxAge;
  // If the band allows infants (<2), occasionally produce a sub-2 age for realism.
  if (lo < 2 && Math.random() < 0.25) {
    const months = _pick([0, 0.5, 1]); // neonate, 6mo, 1yr
    return months;
  }
  return _ri(Math.max(1, Math.ceil(lo)), Math.floor(hi));
}

// ── CORE GENERATOR ───────────────────────────────────────────────────────────────
// Build one complete scenario object from a presentation template.
function generateScenario(presId) {
  // Pick the presentation (specific id, or random if none given).
  const pres = presId
    ? PRESENTATIONS.find(p => p.id === presId)
    : _pick(PRESENTATIONS);
  if (!pres) return null;

  // 1. Patient within demographic constraints.
  const age = _genAge(pres.demographics);
  const sex = pres.demographics.sex === 'any'
    ? _pick(['male', 'female'])
    : pres.demographics.sex;

  // 2. The narrative variant (the cause/story) — drives dispatch + some SAMPLE fields.
  const variant = _pick(pres.variants);

  // 3. Vitals. For each vital, use the presentation's deviation range if it overrides
  //    that vital, otherwise draw a normal value from the patient's age band.
  const band = scenVitalBand(age);
  const dev = pres.deviations || {};
  const v = {
    hr:   _ri(...(dev.hr   || band.hr)),
    rr:   _ri(...(dev.rr   || band.rr)),
    spo2: _ri(...(dev.spo2 || band.spo2)),
    bp:   _ri(...(dev.bp   || band.bp)),
    temp: _rf(...(dev.temp || band.temp)),
    bgl:  _rf(...(dev.bgl  || band.bgl)),
  };
  // ECG rhythm line only shown for presentations that flag it (cardiac calls).
  const ecg = pres.ecg ? _pick(pres.ecg) : null;

  // 4. Assemble. Replace the PATIENT placeholder in dispatch with a readable descriptor.
  const ageLabel = age < 1 ? band.label.toLowerCase()
                  : age === 1 ? '1-year-old'
                  : age <= 15 ? `${age}-year-old`
                  : `${age}-year-old`;
  const personWord = age <= 15 ? (sex === 'male' ? 'boy' : 'girl')
                               : (sex === 'male' ? 'man' : 'woman');
  const dispatch = variant.dispatch.replace('a PATIENT', `a ${ageLabel} ${personWord}`)
                                   .replace('PATIENT', `${ageLabel} ${personWord}`);

  return {
    pres, variant, age, sex, band, ageLabel, personWord,
    dispatch, vitals: v, ecg,
  };
}

// ── STATION CARD UI ──────────────────────────────────────────────────────────────
// Renders the generated scenario as an OSCE station card into the scenario container.
function renderScenarioCard(sc) {
  if (!sc) { return; }
  const v = sc.vitals;
  const p = sc.pres;
  const variant = sc.variant;

  // Vital rows — each as a labelled line. ECG only if present.
  const vitalRows = [
    ['Heart Rate', `${v.hr} bpm`],
    ['Resp Rate', `${v.rr} /min`],
    ['SpO₂', `${v.spo2}%`],
    ['Blood Pressure', `${v.bp} mmHg (systolic)`],
    ['BGL', `${v.bgl} mmol/L`],
    ['Temperature', `${v.temp}°C`],
  ];
  if (sc.ecg) vitalRows.push(['ECG Rhythm', sc.ecg]);

  const sampleRows = [
    ['Signs/Symptoms', p.sample.symptoms],
    ['Allergies', variant.allergies],
    ['Medications', p.sample.medications],
    ['Past Medical History', p.sample.pmh],
    ['Last Oral Intake', p.sample.lastIntake],
    ['Events Leading Up', variant.events],
  ];

  const opqrst = p.opqrst ? [
    ['Onset', p.opqrst.onset],
    ['Provocation', p.opqrst.provocation],
    ['Quality', p.opqrst.quality],
    ['Radiates', p.opqrst.radiates],
    ['Severity', p.opqrst.severity],
    ['Time', p.opqrst.time],
  ] : [];

  const sec = (title, rows) => `
    <div class="scen-sec">
      <div class="scen-sec-title">${title}</div>
      <div class="scen-rows">
        ${rows.map(([k, val]) => `<div class="scen-row"><span class="scen-k">${k}</span><span class="scen-v">${val}</span></div>`).join('')}
      </div>
    </div>`;

  const reveal = p.reveal;
  // Map drug names to existing medication data for dose display in the reveal.
  const drugLines = (reveal.drugs || []).map(name => {
    const d = MEDS.find(m => m.name === name);
    if (!d) return `<li>${name}</li>`;
    // Show the adult dose first line as a quick reference; full detail is in the drug page.
    const adultFirst = (typeof d.dosages.adult === 'string'
      ? d.dosages.adult.split('\n')[0]
      : '');
    return `<li><strong>${name}</strong>${adultFirst ? ' — ' + adultFirst : ''}</li>`;
  }).join('');

  const html = `
    <div class="scen-card">
      <div class="scen-head">
        <div class="scen-badge">OSCE Station</div>
        <div class="scen-title">${p.name === 'Anaphylaxis' ? 'Emergency Call' : p.name}</div>
      </div>

      ${sec('Patient', [['Age', sc.age < 1 ? sc.band.label : `${sc.age} years`], ['Sex', sc.sex === 'male' ? 'Male' : 'Female']])}

      <div class="scen-sec">
        <div class="scen-sec-title">Dispatch</div>
        <div class="scen-dispatch">${sc.dispatch}</div>
      </div>

      <div class="scen-sec">
        <div class="scen-sec-title">On Arrival</div>
        <div class="scen-dispatch">${variant.presentation}</div>
      </div>

      ${sec('Vital Signs', vitalRows)}
      ${sec('SAMPLE History', sampleRows)}
      ${opqrst.length ? sec('OPQRST', opqrst) : ''}

      <button class="scen-reveal-btn" id="scenRevealBtn">Reveal Diagnosis &amp; Management</button>
      <div class="scen-reveal" id="scenReveal" style="display:none">
        <div class="scen-sec">
          <div class="scen-sec-title">Diagnosis</div>
          <div class="scen-dispatch">${reveal.diagnosis}</div>
        </div>
        <div class="scen-sec">
          <div class="scen-sec-title">Pathway</div>
          <div class="scen-dispatch">${reveal.pathway}</div>
        </div>
        <div class="scen-sec">
          <div class="scen-sec-title">Interventions</div>
          <div class="scen-dispatch">${reveal.interventions}</div>
        </div>
        <div class="scen-sec">
          <div class="scen-sec-title">Drugs &amp; Doses</div>
          <ul class="scen-drugs">${drugLines}</ul>
        </div>
        <div class="scen-disclaimer">Placeholder clinical content pending PHECC verification. For study practice only — always follow current clinical practice guidelines.</div>
      </div>

      <button class="scen-new-btn" id="scenNewBtn">Generate New Scenario</button>
    </div>`;

  const wrap = document.getElementById('scenarioContent');
  if (wrap) {
    wrap.innerHTML = html;
    // Wire buttons (no inline onclick, consistent with the rest of the app).
    const rb = document.getElementById('scenRevealBtn');
    const rv = document.getElementById('scenReveal');
    if (rb && rv) rb.addEventListener('click', () => {
      const open = rv.style.display !== 'none';
      rv.style.display = open ? 'none' : 'block';
      rb.textContent = open ? 'Reveal Diagnosis & Management' : 'Hide Diagnosis & Management';
      if (!open) rv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      haptic();
    });
    const nb = document.getElementById('scenNewBtn');
    if (nb) nb.addEventListener('click', () => { startScenario(); haptic(); });
  }
}

// ── ENTRY POINTS ─────────────────────────────────────────────────────────────────
// Open the scenario view inside the quiz tab: a back bar + a container the card
// renders into. Called when the "Scenario" quiz-mode card is tapped.
function goScenario() {
  window.scrollTo({ top: 0, behavior: 'instant' });
  const wrap = document.getElementById('quizTabContent');
  if (!wrap) return;
  wrap.innerHTML = `
    <div class="quiz-back-sticky" id="scenBack">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back
    </div>
    <div class="pg-title">🏥 OSCE Scenario</div>
    <div class="pg-sub">A fresh practice station every time. Run it as a group, then reveal for the debrief.</div>
    <div id="scenarioContent"></div>`;
  document.getElementById('scenBack')?.addEventListener('click', renderQuizTab);
  startScenario();
}

// Generate and display a fresh scenario (random presentation for now — only 1 exists).
function startScenario(presId) {
  const sc = generateScenario(presId);
  renderScenarioCard(sc);
}
