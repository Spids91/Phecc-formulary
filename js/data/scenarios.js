// ─── SCENARIOS.JS (DATA) — OSCE Scenario Generator ───────────────────────────────
// Data for the OSCE scenario generator. Two parts:
//   1. SCEN_VITALS  — normal vital-sign ranges by age band (the physiological baseline)
//   2. PRESENTATIONS — authored clinical templates (the "fingerprint" of each condition)
//
// HOW GENERATION WORKS (engine lives in js/scenario.js):
//   • Pick a presentation, then a random patient (age/sex) within its constraints.
//   • For each vital: if the presentation doesn't deviate it, pick a random NORMAL
//     value from the age band. If it DOES deviate it (e.g. anaphylaxis drops SpO₂),
//     pick a random value from the presentation's deviation range instead.
//   • Randomised-within-range each time, so the same presentation never gives the
//     identical numbers twice — the student must reason, not memorise.
//
// ⚠️ CLINICAL REVIEW STATUS:
//   ★ = sourced from the app's existing PHECC-verified PAED_VITALS (reference.js)
//   ⚠️ = PLACEHOLDER from general medical references (PALS / standard texts),
//        PENDING Keith's PHECC verification. Especially the BP values and all the
//        anaphylaxis deviation ranges below — these are first-draft, to be corrected.

// ── NORMAL VITAL RANGES BY AGE BAND ──────────────────────────────────────────────
// age = upper bound in years for that band (e.g. a 4-year-old falls in the age:5 band
// if 3<age<=5... we select by "first band whose age >= patient age"). Neonate = 0.
// Each vital is [low, high]. BP is systolic only for now (diastolic added later if needed).
const SCEN_VITALS = [
  // label        age   hr(★)       rr(★)      spo2(⚠️)   sysBP(⚠️)   temp(⚠️)      bgl(⚠️)
  { label:'Neonate',   age:0,   hr:[90,180], rr:[30,60], spo2:[94,99], bp:[60,85],   temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'6 months',  age:0.5, hr:[80,160], rr:[30,60], spo2:[94,99], bp:[72,104],  temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'1 year',    age:1,   hr:[75,130], rr:[20,30], spo2:[94,99], bp:[72,104],  temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'2 years',   age:2,   hr:[75,130], rr:[20,30], spo2:[94,99], bp:[86,106],  temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'3 years',   age:3,   hr:[75,130], rr:[20,30], spo2:[94,99], bp:[89,112],  temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'4 years',   age:4,   hr:[70,110], rr:[16,24], spo2:[94,99], bp:[89,112],  temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'5 years',   age:5,   hr:[70,110], rr:[16,24], spo2:[94,99], bp:[89,112],  temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'6 years',   age:6,   hr:[70,110], rr:[16,24], spo2:[94,99], bp:[97,115],  temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'7 years',   age:7,   hr:[60,90],  rr:[14,20], spo2:[94,99], bp:[97,115],  temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'8 years',   age:8,   hr:[60,90],  rr:[14,20], spo2:[94,99], bp:[97,115],  temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'9 years',   age:9,   hr:[60,90],  rr:[14,20], spo2:[94,99], bp:[97,120],  temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'10 years',  age:10,  hr:[60,90],  rr:[14,20], spo2:[94,99], bp:[102,120], temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'11 years',  age:11,  hr:[60,90],  rr:[14,20], spo2:[94,99], bp:[102,120], temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'12 years',  age:12,  hr:[60,90],  rr:[14,20], spo2:[94,99], bp:[110,131], temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'13 years',  age:13,  hr:[60,90],  rr:[14,20], spo2:[94,99], bp:[110,131], temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'14 years',  age:14,  hr:[60,90],  rr:[14,20], spo2:[94,99], bp:[110,131], temp:[36.1,37.2], bgl:[4.0,7.0] },
  { label:'15 years',  age:15,  hr:[60,90],  rr:[14,20], spo2:[94,99], bp:[110,131], temp:[36.1,37.2], bgl:[4.0,7.0] },
  // Adult band catches any age > 15. ⚠️ all placeholder.
  { label:'Adult',     age:120, hr:[60,100], rr:[12,20], spo2:[94,99], bp:[100,130], temp:[36.1,37.2], bgl:[4.0,7.0] },
];

// ── PRESENTATION TEMPLATES ───────────────────────────────────────────────────────
// Each presentation is an authored clinical template. The engine randomises the
// patient + the actual vital numbers; everything else here is fixed clinical content.
//
// Fields:
//   id, name          — identity
//   demographics      — constraints: minAge/maxAge (years), sex ('any'|'male'|'female')
//   variants[]        — narrative variants so the *story* differs each run (the cause).
//                       Each variant supplies dispatch text, presentation findings,
//                       and the SAMPLE bits that depend on the cause (allergies/events).
//   deviations        — per-vital override of the normal range. Key = vital name,
//                       value = [low,high] absolute range to draw from. Omitted vitals
//                       use the age-band normal. ⚠️ ALL PLACEHOLDER — Keith to verify.
//   sample            — SAMPLE history fixed parts (signs/symptoms, meds, pmh, last intake)
//   opqrst            — OPQRST findings (lighter for non-pain presentations)
//   reveal            — the tap-to-reveal debrief: diagnosis, pathway, interventions,
//                       drugs (pulled from the app's existing medication data by name)
//
// ⚠️ The anaphylaxis deviations + reveal specifics below are FIRST-DRAFT PLACEHOLDERS
//    so the engine can be demonstrated. Keith to replace with verified PHECC values.
const PRESENTATIONS = [
  {
    id: 'anaphylaxis',
    name: 'Anaphylaxis',
    demographics: { minAge: 1, maxAge: 90, sex: 'any' },
    variants: [
      {
        cause: 'bee sting',
        dispatch: 'You are called to a private residence for a PATIENT with difficulty breathing shortly after being stung by a bee.',
        presentation: 'Visible facial and lip swelling, widespread urticarial (hive-like) rash, audible wheeze, looks anxious and flushed.',
        allergies: 'Known allergy to bee/wasp stings.',
        events: 'Stung by a bee in the garden roughly 10 minutes ago; symptoms came on rapidly.',
      },
      {
        cause: 'peanuts',
        dispatch: 'You are called to a café for a PATIENT who became acutely unwell after eating a dessert.',
        presentation: 'Swollen lips and tongue, blotchy raised rash on neck and chest, noisy breathing, clutching at throat.',
        allergies: 'Known nut allergy.',
        events: 'Ate a dessert that unknowingly contained peanuts about 15 minutes ago.',
      },
      {
        cause: 'shellfish',
        dispatch: 'You are called to a restaurant for a PATIENT with sudden breathing difficulty during a meal.',
        presentation: 'Facial swelling, urticaria over the arms and torso, wheeze, appears distressed and sweaty.',
        allergies: 'Known shellfish allergy.',
        events: 'Began eating a seafood dish shortly before symptoms started.',
      },
      {
        cause: 'penicillin',
        dispatch: 'You are called to a residence for a PATIENT who became acutely breathless after taking medication.',
        presentation: 'Lip and periorbital swelling, spreading hives, wheeze, anxious and flushed.',
        allergies: 'No previously documented drug allergy.',
        events: 'Took a first dose of a newly prescribed antibiotic about 20 minutes ago.',
      },
    ],
    // ⚠️ PLACEHOLDER deviation ranges for moderate–severe anaphylaxis — Keith to verify.
    deviations: {
      hr:   [110, 140],   // tachycardia
      rr:   [24, 34],     // tachypnoea
      spo2: [85, 93],     // hypoxia
      bp:   [70, 90],     // hypotension (systolic)
      // temp + bgl left at normal (anaphylaxis usually doesn't drive these)
    },
    sample: {
      symptoms: 'Difficulty breathing, throat tightness, itching, feeling of impending doom.',
      medications: 'Nil regular (or as per cause variant).',
      pmh: 'Previous milder allergic reactions.',
      lastIntake: 'As per the triggering event.',
    },
    opqrst: {
      onset: 'Sudden, minutes after exposure.',
      provocation: 'Nothing relieves it; worsening.',
      quality: 'Tight chest, "can\'t get air in".',
      radiates: 'N/A.',
      severity: 'Severe and escalating.',
      time: 'Began ~10–20 minutes ago.',
    },
    reveal: {
      diagnosis: 'Anaphylaxis (severe systemic allergic reaction).',
      pathway: 'Recognise anaphylaxis early (airway/breathing/circulation compromise + skin changes after exposure). Remove trigger if possible, high-flow O₂, position appropriately, IM adrenaline without delay, then adjuncts and fluids.',
      interventions: 'High-flow oxygen, IM adrenaline (repeat every 5 min PRN), IV/IO fluids for hypotension, consider antihistamine and steroid as adjuncts per scope, continuous monitoring, early transport.',
      drugs: ['Adrenaline 1:1,000', 'Chlorphenamine', 'Hydrocortisone', 'Sodium Chloride 0.9%'],
    },
  },
];
