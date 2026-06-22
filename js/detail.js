// ─── DETAIL.JS ────────────────────────────────────────────────────────────────

// Debounced note saving — waits 800ms after last keystroke before writing to localStorage
let _noteTimer=null;
function noteDebounce(id,val){
  G.notes[id]=val;
  clearTimeout(_noteTimer);
  _noteTimer=setTimeout(saveG,800);
}


function openDet(id) {
  const d = MEDS.find(m => m.id === id);
  if (!d) return;
  if (!G.seenDrugs.includes(id)) G.seenDrugs.push(id);
  document.getElementById('detName').textContent  = d.name;
  document.getElementById('detBarName').textContent = d.name;  // condensed name in pinned bar
  document.getElementById('detClass').textContent = d.classification;
  const smap = { EMT:'EMT', P:'Paramedic', AP:'Adv. Paramedic' };
  const m       = getDM(id);
  const correct = G.drugCorrect[id] || 0;
  const mLabel  = m === 'unseen' ? `Questions (0/10)` : `${MASTERY_LABELS[m]} (${Math.min(correct,10)}/10)`;
  document.getElementById('detBadges').innerHTML =
    d.scope.map(s => `<span class="sbadge sbadge-${s}">${smap[s]}</span>`).join('') +
    `<span class="det-mbadge det-mbadge-${m}">${mLabel}</span>`;
  document.getElementById('detBody').innerHTML = buildDet(d);
  const overlay = document.getElementById('detOverlay');
  overlay.classList.add('open');
  overlay.scrollTop = 0;
  document.getElementById('detBar')?.classList.remove('condensed');
  document.body.style.overflow = 'hidden';
  haptic();
}

// Toggle the condensed pinned-bar name once the full hero has scrolled out of view.
// Attached once; reads the hero height each scroll so it adapts to any drug.
function onDetScroll() {
  const overlay = document.getElementById('detOverlay');
  const hero = document.getElementById('detHero');
  const bar = document.getElementById('detBar');
  if (!overlay || !hero || !bar) return;
  // Condense once scrolled past most of the hero
  const threshold = hero.offsetTop + hero.offsetHeight - 12;
  bar.classList.toggle('condensed', overlay.scrollTop > threshold);
}

function closeDet() {
  document.getElementById('detOverlay').classList.remove('open');
  document.body.style.overflow = '';
  checkBadges();
  saveG();
  renderDrugList();
}

function buildDet(d) {
  const pres    = Array.isArray(d.presentation)   ? d.presentation   : [d.presentation];
  const adm     = Array.isArray(d.administration) ? d.administration : [d.administration];
  const correct = G.drugCorrect[d.id] || 0;
  const pct     = Math.min(correct / 10 * 100, 100);
  const m       = getDM(d.id);
  // Escape for safe embedding inside the textarea (prevents tag breakout).
  // Notes are local-only, but correct escaping avoids the field breaking on
  // characters like < > & " that a user might legitimately type.
  const noteVal = (G.notes[d.id] || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  // Render a dose value. Strings are parsed line-by-line: any line in the form
  // "Label: dose detail" becomes a labelled severity/scenario card; plain lines
  // (no leading label) render as simple dose text. Works for every drug — drugs
  // with severity tiers get cards, single-dose drugs stay clean. Objects keep
  // their existing key→value card behaviour.
  function dh(dose) {
    if (!dose) return '<div style="color:var(--text3);font-size:14px">Not indicated.</div>';
    if (typeof dose === 'string') return renderDoseString(dose);
    return Object.entries(dose).map(([k, v]) => `
      <div style="margin-bottom:8px">
        <div style="font-size:11px;font-weight:600;color:var(--success);margin-bottom:3px">${k}</div>
        <div class="dose-text">${v.replace(/\n/g, '<br>')}</div>
      </div>`).join('');
  }

  function renderDoseString(str) {
    const lines = str.split('\n').map(l => l.trim()).filter(Boolean);
    // A "label" is a short leading phrase before the first colon that names a
    // severity, scenario or indication (not a time like "after 4–6hrs").
    // We treat a line as labelled only if the colon comes early and the label
    // contains no digits (so "1g PO" or "Recheck BGL..." stay plain).
    const parsed = lines.map(line => {
      const ci = line.indexOf(':');
      if (ci > 0 && ci <= 28) {
        const label = line.slice(0, ci).trim();
        const body = line.slice(ci + 1).trim();
        const looksLikeLabel = !/\d/.test(label) && body.length > 0 && label.split(' ').length <= 4;
        if (looksLikeLabel) return { label, body };
      }
      return { label: null, body: line };
    });
    const hasAnyLabel = parsed.some(p => p.label);
    if (!hasAnyLabel) {
      // No severity structure — render as clean lines
      return `<div class="dose-text">${lines.join('<br>')}</div>`;
    }
    // At least one labelled tier — render each as a card
    return '<div class="dose-tiers">' + parsed.map(p => {
      if (p.label) {
        return `<div class="dose-tier">
          <div class="dose-tier-lbl">${p.label}</div>
          <div class="dose-tier-body">${p.body}</div>
        </div>`;
      }
      return `<div class="dose-tier dose-tier-plain">
        <div class="dose-tier-body">${p.body}</div>
      </div>`;
    }).join('') + '</div>';
  }

  const mLabel = m === 'unseen' ? 'Questions (0/10)' : `${MASTERY_LABELS[m]} (${Math.min(correct,10)}/10)`;

  return `
    <div class="dsec">
      <div class="dsh"><div class="sico" style="background:var(--surf2)">💊</div><div class="dst">Presentation</div></div>
      <div class="dsb"><ul class="blist">${pres.map(p => `<li>${p}</li>`).join('')}</ul></div>
    </div>
    <div class="dsec">
      <div class="dsh"><div class="sico" style="background:var(--surf2)">🛤</div><div class="dst">Routes of Administration</div></div>
      <div class="dsb"><ul class="blist">${adm.map(a => `<li>${a}</li>`).join('')}</ul></div>
    </div>
    <div class="dsec">
      <div class="dsh"><div class="sico" style="background:var(--success-light)">✅</div><div class="dst">Indications</div></div>
      <div class="dsb"><ul class="blist">${d.indications.map(i => `<li>${i}</li>`).join('')}</ul></div>
    </div>
    <div class="dsec">
      <div class="dsh"><div class="sico" style="background:var(--error-light)">🚫</div><div class="dst">Contraindications</div></div>
      <div class="dsb"><div class="ci-list">${d.contraindications.map(c => `
        <div class="ci"><div class="ci-dot"></div><div class="ci-text">${c}</div></div>`).join('')}
      </div></div>
    </div>
    <div class="dsec">
      <div class="dsh"><div class="sico" style="background:var(--warning-light)">💉</div><div class="dst">Dosages</div></div>
      <div class="dsb"><div class="dose-block">
        <div class="dose-grp"><div class="dose-lbl">👤 Adult</div>${dh(d.dosages.adult)}</div>
        <div class="dose-grp"><div class="dose-lbl">👶 Paediatric</div>${dh(d.dosages.paediatric)}</div>
      </div></div>
    </div>
    <div class="dsec">
      <div class="dsh"><div class="sico" style="background:var(--error-light)">⚠️</div><div class="dst">Side Effects</div></div>
      <div class="dsb"><ul class="blist">${d.sideEffects.map(s => `<li>${s}</li>`).join('')}</ul></div>
    </div>
    <div class="dsec">
      <div class="dsh"><div class="sico" style="background:var(--surf2)">ℹ️</div><div class="dst">Additional Information</div></div>
      <div class="dsb"><div class="info-box">${d.additionalInfo}</div></div>
    </div>
    <div class="dsec">
      <div class="dsh"><div class="sico" style="background:var(--primary-light)">📈</div><div class="dst">Question Progress</div></div>
      <div class="dsb">
        <div class="prog-wrap">
          <div class="prog-fill" style="width:${pct}%;background:linear-gradient(to right,#1E3A8A,#3B82F6)"></div>
        </div>
        <div class="prog-lbl"><span>${mLabel}</span><span>${Math.min(correct,10)}/10 correct</span></div>
      </div>
    </div>
    <div class="dsec">
      <div class="dsh"><div class="sico" style="background:rgba(124,58,237,.08)">📝</div><div class="dst">My Notes</div></div>
      <div class="dsb">
        <textarea class="notes-area" id="note-${d.id}"
          placeholder="Add your own notes, mnemonics, clinical pearls…"
          oninput="noteDebounce(${d.id},this.value)">${noteVal}</textarea>
        <div class="notes-hint">Notes save automatically</div>
      </div>
    </div>`;
}
