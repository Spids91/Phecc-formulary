// ─── HOME.JS — Drug of the Day + Home Dashboard ───────────────────────────────

function getDotd(){
  // Deterministic daily drug based on date
  const day=Math.floor(Date.now()/86400000);
  return MEDS[day%MEDS.length];
}

function openDotd(){
  openDet(getDotd().id);
}

function getGreeting(){
  const h=new Date().getHours();
  if(h<12)return'Good morning';
  if(h<17)return'Good afternoon';
  return'Good evening';
}

function renderHome(){
  document.getElementById('homeGreeting').textContent=getGreeting();

  // Level card
  const lv=getLevel(G.xp);
  const nxt=LEVELS[LEVELS.indexOf(lv)+1];
  document.getElementById('homeLevelCard').style.background=lv.gradient;
  document.getElementById('hlcName').textContent=lv.name;
  document.getElementById('hlcXP').textContent=G.xp;
  if(nxt){
    const pct=(G.xp-lv.xp)/(lv.next-lv.xp)*100;
    document.getElementById('hlcBar').style.width=pct+'%';
    document.getElementById('hlcNext').textContent=`${lv.next-G.xp} XP to ${nxt.name}`;
  }else{
    document.getElementById('hlcBar').style.width='100%';
    document.getElementById('hlcNext').textContent='Maximum level reached! 🎉';
  }

  // Drug of the day
  const d=getDotd();
  document.getElementById('dotdName').textContent=d.name;
  document.getElementById('dotdClass').textContent=d.classification;
  document.getElementById('dotdFact').textContent=d.quizHints.keyFact;

  // Quick stats
  const counts={unseen:0,novice:0,learning:0,proficient:0,mastered:0};
  MEDS.forEach(m=>counts[getDM(m.id)]++);
  document.getElementById('hsMastered').textContent=counts.mastered;
  document.getElementById('hsLearning').textContent=counts.novice+counts.learning+counts.proficient;
  document.getElementById('hsUnseen').textContent=counts.unseen;
  document.getElementById('hsStreak').textContent=G.streak;
}
