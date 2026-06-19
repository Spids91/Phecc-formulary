// ─── HOME.JS ──────────────────────────────────────────────────────────────────
function getDotd(){
  // Shuffles through all 46 drugs before repeating any
  // Uses the day number to pick from a deterministic shuffle sequence
  const day=Math.floor(Date.now()/86400000);
  const cycle=Math.floor(day/MEDS.length); // which full cycle we're in
  const pos=day%MEDS.length;              // position within current cycle
  // Seeded shuffle for this cycle so order changes each time through
  const indices=[...Array(MEDS.length).keys()];
  for(let i=indices.length-1;i>0;i--){
    const seed=cycle*997+i*31+7;
    const j=Math.abs(Math.sin(seed)*10000)%( i+1)|0;
    [indices[i],indices[j]]=[indices[j],indices[i]];
  }
  return MEDS[indices[pos]];
}
function openDotd(){
  const d=getDotd();
  // Mark as seen today
  const k=todayKey();
  if(!G.seenToday)G.seenToday={};
  G.seenToday[k]=true;
  saveG();
  openDet(d.id);
  renderHome();
}
function getGreeting(){
  const h=new Date().getHours();
  if(h<12)return'Good morning';
  if(h<17)return'Good afternoon';
  return'Good evening';
}
function renderHome(){
  // Greeting
  document.getElementById('homeGreeting').textContent=getGreeting();

  // Level card
  const lv=getLevel(G.xp),nxt=LEVELS[LEVELS.indexOf(lv)+1];
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

  // Streak + freeze tokens
  document.getElementById('homeStreakNum').textContent=`${G.streak} day streak`;
  const freezeEl=document.getElementById('homeFreezes');
  const tokens=G.freezeTokens||0;
  // Single clear button showing snowflake + count, tappable to use
  freezeEl.innerHTML=`<button class="freeze-btn${tokens<=0?' empty':''}" onclick="useFreeze()" aria-label="Streak freeze tokens">`
    +`<span class="freeze-flake">❄️</span>`
    +`<span class="freeze-count">${tokens}</span>`
    +`</button>`;

  // Daily Challenge card on home
  const dailyEl=document.getElementById('homeDailyCard');
  if(dailyEl){
    const done=isDailyDone();
    const now=new Date();
    const dateStr=now.toLocaleDateString('en-IE',{day:'numeric',month:'long'});
    let dHtml='<div class="home-daily-card'+(done?' done':'')+'" id="homeDailyCardInner">'
      +'<div class="daily-top">'
        +'<div class="daily-icon">📅</div>'
        +'<div class="daily-info">'
          +'<div class="daily-title">5 questions · '+dateStr+'</div>'
          +'<div class="daily-sub">Same for everyone · '+(done?'Completed ✓':'+15 XP bonus')+'</div>'
        +'</div>'
        +'<div class="daily-status">'+(done
          ?'<span class="daily-done-badge">✓</span>'
          :'<span class="daily-start-btn">Start →</span>')
        +'</div>'
      +'</div>'
      +'</div>';
    dailyEl.innerHTML=dHtml;
    const inner=document.getElementById('homeDailyCardInner');
    if(inner){
      inner.addEventListener('click',function(){
        if(done){showToast('Come back tomorrow for a new set!');}
        else{showPage('quiz',document.getElementById('btn-quiz'));scrollTop();startDaily();}
      });
    }
  }

  // Drug of the Day
  const d=getDotd();
  document.getElementById('dotdName').textContent=d.name;
  document.getElementById('dotdClass').textContent=d.classification;
  document.getElementById('dotdFact').textContent=d.quizHints.keyFact;
  const k=todayKey();
  const seen=G.seenToday&&G.seenToday[k];
  document.getElementById('dotdSeen').textContent=seen?'✓':'';
}
