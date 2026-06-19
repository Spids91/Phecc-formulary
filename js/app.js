colors[chartMetric]||['var(--primary)','var(--primary-dark)']// ─── APP.JS — Tús Medic v6.1 ──────────────────────────────────────────────────
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']const LEVELS=[
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {name:"Rookie",          xp:0,    next:100,      color:"#059669",gradient:"linear-gradient(135deg,#064E3B,#059669)"},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {name:"Student",         xp:100,  next:300,      color:"#0891B2",gradient:"linear-gradient(135deg,#0C4A6E,#0891B2)"},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {name:"Responder",       xp:300,  next:600,      color:"#2563EB",gradient:"linear-gradient(135deg,#1E3A8A,#2563EB)"},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {name:"Clinician",       xp:600,  next:1000,     color:"#7C3AED",gradient:"linear-gradient(135deg,#4C1D95,#7C3AED)"},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {name:"Expert",          xp:1000, next:1500,     color:"#D97706",gradient:"linear-gradient(135deg,#78350F,#D97706)"},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {name:"Senior Clinician",xp:1500, next:2200,     color:"#EA580C",gradient:"linear-gradient(135deg,#7C2D12,#EA580C)"},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {name:"Master Clinician",xp:2200, next:Infinity, color:"#DC2626",gradient:"linear-gradient(135deg,#7F1D1D,#DC2626)"}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']];
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function getLevel(xp){for(let i=LEVELS.length-1;i>=0;i--)if(xp>=LEVELS[i].xp)return LEVELS[i];return LEVELS[0];}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function getMastery(correct){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(correct>=10)return'mastered';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(correct>=6)return'proficient';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(correct>=3)return'learning';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(correct>=1)return'novice';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  return'unseen';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']const MASTERY_LABELS={unseen:'· Unseen',novice:'◎ Novice',learning:'~ Learning',proficient:'✦ Proficient',mastered:'★ Mastered'};
colors[chartMetric]||['var(--primary)','var(--primary-dark)']const MASTERY_COLORS={unseen:'#9CA3AF',novice:'#D97706',learning:'#0891B2',proficient:'#2563EB',mastered:'#00875A'};
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function masteryTag(id){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const correct=G.drugCorrect[id]||0;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const m=getMastery(correct);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  // Don't show "unseen" label — just show count
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const label=m==='unseen'?`Questions (0/10)`:MASTERY_LABELS[m]+` (${Math.min(correct,10)}/10)`;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  return`<div class="mtag mt-${m}">${label}</div>`;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']// BADGES
colors[chartMetric]||['var(--primary)','var(--primary-dark)']const BADGES=[
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'first_quiz',     icon:'🎯', name:'First Quiz',           check:g=>g.quizzes>=1},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'streak_7',       icon:'📅', name:'7 Day Streak',          check:g=>g.streak>=7},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'streak_30',      icon:'🔥', name:'30 Day Streak',         check:g=>g.streak>=30},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'mastered_10',    icon:'⭐', name:'10 Drugs Mastered',     check:g=>Object.values(g.drugCorrect).filter(v=>v>=10).length>=10},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'mastered_25',    icon:'💜', name:'25 Drugs Mastered',     check:g=>Object.values(g.drugCorrect).filter(v=>v>=10).length>=25},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'mastered_all',   icon:'👑', name:'All 46 Mastered',       check:g=>Object.values(g.drugCorrect).filter(v=>v>=10).length>=46},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'emt_mastered',   icon:'🏆', name:'All EMT Drugs Mastered',check:g=>MEDS.filter(m=>m.scope.includes('EMT')).every(m=>(g.drugCorrect[m.id]||0)>=10)},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'xp_500',         icon:'⚡', name:'500 XP',                check:g=>g.xp>=500},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'xp_1000',        icon:'🚀', name:'1000 XP',               check:g=>g.xp>=1000},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'questions_100',  icon:'🧠', name:'100 Questions',         check:g=>g.totalQ>=100},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'all_opened',     icon:'💊', name:'Opened Every Drug',     check:g=>MEDS.every(m=>(g.drugCorrect[m.id]||0)>=0&&g.seenDrugs&&g.seenDrugs.includes(m.id))},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  {id:'freeze_used',    icon:'❄️', name:'Used Streak Freeze',    check:g=>g.freezesUsed>=1}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']];
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']// STATE
colors[chartMetric]||['var(--primary)','var(--primary-dark)']let G={
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  xp:0,streak:0,lastDate:null,quizzes:0,totalQ:0,totalCorrect:0,
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  drugCorrect:{},notes:{},disclaimerDone:false,
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  seenDrugs:[],
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  earnedBadges:[],
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  freezeTokens:1,freezesUsed:0,
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  dailyLog:{},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  trackingStart:null,
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  nextReview:{},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  recentWrong:[],
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  lastDailyDate:null
colors[chartMetric]||['var(--primary)','var(--primary-dark)']};
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function loadG(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  try{const s=localStorage.getItem('tusMedicG09');if(s)G={...G,...JSON.parse(s)};}catch(e){}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  MEDS.forEach(m=>{
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    if(!G.drugCorrect[m.id])G.drugCorrect[m.id]=0;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    if(G.notes[m.id]===undefined)G.notes[m.id]='';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  });
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!G.seenDrugs)G.seenDrugs=[];
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!G.earnedBadges)G.earnedBadges=[];
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!G.dailyLog)G.dailyLog={};
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!G.trackingStart)G.trackingStart=todayKey();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!G.nextReview)G.nextReview={};
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!G.recentWrong)G.recentWrong=[];
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(G.lastDailyDate===undefined)G.lastDailyDate=null;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function saveG(){try{localStorage.setItem('tusMedicG09',JSON.stringify(G));}catch(e){}}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function getDM(id){return getMastery(G.drugCorrect[id]||0);}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function todayKey(){return new Date().toISOString().slice(0,10);}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']// Daily log
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function logToday(questions,correct,quizzes,xp){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const k=todayKey();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!G.dailyLog[k])G.dailyLog[k]={questions:0,correct:0,quizzes:0,xp:0};
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  G.dailyLog[k].questions+=questions;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  G.dailyLog[k].correct+=correct;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  G.dailyLog[k].quizzes+=quizzes;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  G.dailyLog[k].xp+=xp;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']// Streak freeze
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function useFreeze(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(G.freezeTokens<=0){showToast('No freeze tokens remaining');return;}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(confirm('Use a streak freeze token to protect your streak today?')){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    G.freezeTokens--;G.freezesUsed++;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    // Extend lastDate to today so streak isn't broken
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    G.lastDate=todayKey();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    checkBadges();saveG();renderHome();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    showToast('❄️ Streak freeze used!');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  }
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']// Badge checking
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function checkBadges(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  let newBadges=[];
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  BADGES.forEach(b=>{
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    if(!G.earnedBadges.includes(b.id)&&b.check(G)){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']      G.earnedBadges.push(b.id);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']      newBadges.push(b);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    }
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  });
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  // Earn freeze tokens at milestones
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const masteredCount=Object.values(G.drugCorrect).filter(v=>v>=10).length;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const expectedTokens=1+Math.floor(masteredCount/10);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(expectedTokens>G.freezeTokens+G.freezesUsed){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    G.freezeTokens=Math.min(G.freezeTokens+1,5);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    showToast('❄️ Streak freeze token earned!');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  }
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(newBadges.length){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    newBadges.forEach(b=>setTimeout(()=>showToast(`🏅 Badge unlocked: ${b.name}`),500));
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  }
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']// Feedback / toasts
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function showToast(msg){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const t=document.getElementById('toast');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  t.textContent=msg;t.classList.add('show');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2600);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function haptic(type='light'){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!navigator.vibrate)return;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(type==='success')navigator.vibrate([10,20,10]);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  else if(type==='error')navigator.vibrate([30]);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  else navigator.vibrate([10]);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function updateHdr(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('xpVal').textContent=G.xp;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('streakVal').textContent=G.streak;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const lv=getLevel(G.xp);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const ll=document.getElementById('levelLabel');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  ll.textContent=lv.name;ll.style.color=lv.color;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function scrollTop(){window.scrollTo({top:0,behavior:'instant'});}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function toggleDark(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const h=document.documentElement,dark=h.getAttribute('data-theme')==='dark';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  h.setAttribute('data-theme',dark?'light':'dark');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('darkBtn').textContent=dark?'🌙':'☀️';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  try{localStorage.setItem('tusMedicTheme',dark?'light':'dark');}catch(e){}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  haptic();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function loadTheme(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  try{const t=localStorage.getItem('tusMedicTheme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');document.getElementById('darkBtn').textContent='☀️';}}catch(e){}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function checkOnline(){document.getElementById('offlineBar').classList.toggle('show',!navigator.onLine);}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function dismissDisclaimer(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('disclaimerModal').style.display='none';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  G.disclaimerDone=true;saveG();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function checkDisclaimer(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!G.disclaimerDone)document.getElementById('disclaimerModal').style.display='flex';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']// NAV
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function showPage(id,btn){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.querySelectorAll('.nb').forEach(b=>b.classList.remove('active'));
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('page-'+id).classList.add('active');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  btn.classList.add('active');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  haptic();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(id==='home')renderHome();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(id==='quiz')renderQuizTab();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(id==='stats'){updateStats();renderDonut();renderChart();}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(id==='learn')renderLearn();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function goHome(){showPage('home',document.getElementById('btn-home'));scrollTop();}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function goProgress(){showPage('stats',document.getElementById('btn-stats'));scrollTop();}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']// STATS
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function updateStats(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const counts={unseen:0,novice:0,learning:0,proficient:0,mastered:0};
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  MEDS.forEach(m=>counts[getDM(m.id)]++);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('stXP').textContent=G.xp;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('stStreak').textContent=G.streak;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('stQuizzes').textContent=G.quizzes;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('stAccuracy').textContent=G.totalQ>0?Math.round(G.totalCorrect/G.totalQ*100)+'%':'—';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('tCorrect').textContent=G.totalCorrect;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('tWrong').textContent=G.totalQ-G.totalCorrect;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  Object.keys(counts).forEach(k=>{const el=document.getElementById('dl'+k.charAt(0).toUpperCase()+k.slice(1));if(el)el.textContent=counts[k];});
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const lv=getLevel(G.xp),nxt=LEVELS[LEVELS.indexOf(lv)+1];
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('lcName').textContent=lv.name;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('levelCard').style.background=lv.gradient;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(nxt){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    document.getElementById('lcBar').style.width=((G.xp-lv.xp)/(lv.next-lv.xp)*100)+'%';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    document.getElementById('lcNext').textContent=`${lv.next-G.xp} XP to ${nxt.name}`;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  }else{
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    document.getElementById('lcBar').style.width='100%';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    document.getElementById('lcNext').textContent='Maximum level reached! 🎉';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  }
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  // Study time (approx 2 min per quiz)
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const mins=G.quizzes*2;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const hrs=Math.floor(mins/60),rem=mins%60;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('studyTime').textContent=hrs>0?`${hrs}h ${rem}m`:`${rem}m`;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  // Badges
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  renderBadges();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function renderBadges(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const el=document.getElementById('badgesGrid');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!el)return;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  el.innerHTML=BADGES.map(b=>{
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    const earned=G.earnedBadges.includes(b.id);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    return`<div class="badge-item ${earned?'earned':''}">
colors[chartMetric]||['var(--primary)','var(--primary-dark)']      <div class="badge-icon ${earned?'earned':''}">${b.icon}</div>
colors[chartMetric]||['var(--primary)','var(--primary-dark)']      <div class="badge-name">${b.name}</div>
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    </div>`;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  }).join('');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function renderDonut(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const counts={unseen:0,novice:0,learning:0,proficient:0,mastered:0};
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  MEDS.forEach(m=>counts[getDM(m.id)]++);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const total=MEDS.length,circ=2*Math.PI*35;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const order=[{key:'mastered',id:'dMastered'},{key:'proficient',id:'dProficient'},{key:'learning',id:'dLearning'},{key:'novice',id:'dNovice'}];
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  let offset=0;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  order.forEach(({key,id})=>{
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    const dash=circ*(counts[key]/total);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    const el=document.getElementById(id);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    if(el){el.setAttribute('stroke-dasharray',`${dash} ${circ-dash}`);el.setAttribute('stroke-dashoffset',-(offset-circ/4));offset+=dash;}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  });
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']// CHART
colors[chartMetric]||['var(--primary)','var(--primary-dark)']let chartMetric='questions';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function setChartMetric(m,el){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  chartMetric=m;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.querySelectorAll('.chart-tab').forEach(t=>t.classList.remove('on'));
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  el.classList.add('on');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  renderChart();haptic();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function renderChart(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const el=document.getElementById('chartArea');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!el)return;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  // Get last 14 days
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const days=[];
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  for(let i=13;i>=0;i--){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    const d=new Date();d.setDate(d.getDate()-i);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    days.push(d.toISOString().slice(0,10));
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  }
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const vals=days.map(d=>{
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    const log=G.dailyLog[d]||{questions:0,correct:0,quizzes:0,xp:0};
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    if(chartMetric==='questions')return log.questions;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    if(chartMetric==='accuracy')return log.questions>0?Math.round(log.correct/log.questions*100):0;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    if(chartMetric==='quizzes')return log.quizzes;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    if(chartMetric==='xp')return log.xp;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    return 0;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  });
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const max=Math.max(...vals,1);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const hasData=vals.some(v=>v>0);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const labels=days.map(d=>{const dt=new Date(d+'T12:00:00');return dt.toLocaleDateString('en-IE',{weekday:'short'}).slice(0,2);});
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  el.innerHTML=days.map((d,i)=>{
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    const h=Math.round((vals[i]/max)*120);
colors[chartMetric]||['var(--primary)','var(--primary-dark)'],accuracy:['#2563EB','#1E3A8A'],quizzes:['#7C3AED','#4C1D95'],xp:['#D97706','#78350F']};
colors[chartMetric]||['var(--primary)','var(--primary-dark)'];
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    return`<div class="chart-bar-wrap">
colors[chartMetric]||['var(--primary)','var(--primary-dark)']      <div class="chart-bar" style="height:${h}px;background:linear-gradient(to top,${c2},${c1})"></div>
colors[chartMetric]||['var(--primary)','var(--primary-dark)']      <div class="chart-day">${labels[i]}</div>
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    </div>`;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  }).join('');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('chartNote').textContent=hasData?`Tracking from ${G.trackingStart||todayKey()}`:'Data will appear here as you study';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function confirmReset(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!confirm('Reset all progress? This cannot be undone.'))return;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const ts=G.trackingStart||todayKey();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  G={xp:0,streak:0,lastDate:null,quizzes:0,totalQ:0,totalCorrect:0,drugCorrect:{},notes:{},
colors[chartMetric]||['var(--primary)','var(--primary-dark)']     disclaimerDone:G.disclaimerDone,seenDrugs:[],earnedBadges:[],freezeTokens:1,freezesUsed:0,
colors[chartMetric]||['var(--primary)','var(--primary-dark)']     dailyLog:{},trackingStart:ts};
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  MEDS.forEach(m=>{G.drugCorrect[m.id]=0;G.notes[m.id]='';});
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  saveG();updateHdr();updateStats();renderDonut();renderChart();renderDrugList();renderHome();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  showToast('Progress reset');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']// GLOBAL SEARCH
colors[chartMetric]||['var(--primary)','var(--primary-dark)']let _gsTimer=null;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function handleGlobalSearch(q,clearId,resultsId){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const clearBtn=document.getElementById(clearId||'searchClear');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(clearBtn)clearBtn.style.display=q?'flex':'none';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  clearTimeout(_gsTimer);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const el=document.getElementById(resultsId||'gsearchResults');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(!q.trim()){el.classList.remove('show');el.innerHTML='';if(resultsId==='homeSearchResults'){}else renderDrugList();return;}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  _gsTimer=setTimeout(()=>{
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    const ql=q.toLowerCase(),results=[];
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    MEDS.filter(m=>m.name.toLowerCase().includes(ql)||m.classification.toLowerCase().includes(ql)||m.indications.some(i=>i.toLowerCase().includes(ql))).slice(0,5).forEach(m=>results.push({type:'drug',name:m.name,sub:m.classification,action:()=>openDet(m.id)}));
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    TERMS.filter(t=>t.term.toLowerCase().includes(ql)||t.def.toLowerCase().includes(ql)).slice(0,4).forEach(t=>results.push({type:'term',name:t.term,sub:t.def.substring(0,60)+'…',action:()=>{showPage('learn',document.getElementById('btn-learn'));selLearn('terms',document.querySelector('[data-lsec="terms"]'));setTimeout(()=>{document.getElementById('learnSearch').value=t.term;handleLearnSearch(t.term);scrollToTerm(t.term);},150);}}));
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    HOSPITALS.filter(h=>h.name.toLowerCase().includes(ql)||h.pcr.toLowerCase().includes(ql)||h.county.toLowerCase().includes(ql)).slice(0,4).forEach(h=>results.push({type:'hospital',name:h.name,sub:`${h.county} — PCR: ${h.pcr}`,action:()=>{showPage('learn',document.getElementById('btn-learn'));selLearn('pcr',document.querySelector('[data-lsec="pcr"]'));}}));
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    if(!results.length){el.innerHTML='<div class="gsr-item"><div style="color:var(--text3);font-size:13px">No results found</div></div>';el.classList.add('show');return;}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    el.innerHTML=results.map((r,i)=>`<div class="gsr-item" onclick="gsrClick(${i},'${resultsId||'gsearchResults'}')"><span class="gsr-type gsr-${r.type}">${r.type}</span><div><div class="gsr-name">${r.name}</div><div class="gsr-sub">${r.sub}</div></div></div>`).join('');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    el.classList.add('show');el._actions=results.map(r=>r.action);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  },200);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function gsrClick(i,resultsId){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  const el=document.getElementById(resultsId||'gsearchResults');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  if(el._actions&&el._actions[i])el._actions[i]();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function clearSearch(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('searchInput').value='';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('searchClear').style.display='none';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('gsearchResults').classList.remove('show');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('gsearchResults').innerHTML='';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  renderDrugList();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function clearHomeSearch(){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('homeSearchInput').value='';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('homeSearchClear').style.display='none';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('homeSearchResults').classList.remove('show');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  document.getElementById('homeSearchResults').innerHTML='';
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']function scrollToTerm(termName){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  setTimeout(()=>{
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    const cards=document.querySelectorAll('.term-card');
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    for(const card of cards){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']      if(card.querySelector('.term-word')&&card.querySelector('.term-word').textContent===termName){
colors[chartMetric]||['var(--primary)','var(--primary-dark)']        card.scrollIntoView({behavior:'smooth',block:'center'});
colors[chartMetric]||['var(--primary)','var(--primary-dark)']        card.classList.add('open');break;
colors[chartMetric]||['var(--primary)','var(--primary-dark)']      }
colors[chartMetric]||['var(--primary)','var(--primary-dark)']    }
colors[chartMetric]||['var(--primary)','var(--primary-dark)']  },300);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']}
colors[chartMetric]||['var(--primary)','var(--primary-dark)']
colors[chartMetric]||['var(--primary)','var(--primary-dark)']// INIT
colors[chartMetric]||['var(--primary)','var(--primary-dark)']window.addEventListener('online',checkOnline);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']window.addEventListener('offline',checkOnline);
colors[chartMetric]||['var(--primary)','var(--primary-dark)']document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDet();});
colors[chartMetric]||['var(--primary)','var(--primary-dark)']loadG();loadTheme();checkOnline();checkDisclaimer();updateHdr();
colors[chartMetric]||['var(--primary)','var(--primary-dark)']if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
