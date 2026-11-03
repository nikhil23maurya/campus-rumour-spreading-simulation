/*
  The Rumour Experiment — browser interpretation of the campus NetLogo model.
  This is intentionally not NetLogo in the browser. Its phases follow the desktop
  model: MOVE -> SPREAD -> FACT-CHECK -> TICK, with toroidal boundaries.
  The original NetLogo model: https://github.com/nikhil23maurya/campus-rumour-spreading-simulation
*/
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const source = 'https://github.com/nikhil23maurya/campus-rumour-spreading-simulation';
  const COLORS = ['#4380a1','#dc6d42','#54a88d'];
  const WORLD = 33;
  const RADIUS2 = 1.5 ** 2;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const config = {population:200,initial:4,spread:20,checking:10,maxTicks:300};
  const settings = [
    ['population','population',''],['initial','initial',''],['spread','spread','%'],
    ['checking','checking','%'],['max-ticks','maxTicks','']
  ];

  const permutation = arr => {
    for (let i=arr.length-1;i>0;i--) {
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  };
  const wrap = value => (value % WORLD + WORLD) % WORLD;
  const createPopulation = (total, believers) => {
    const people = Array.from({length:total}, () => ({
      x:Math.random()*WORLD,y:Math.random()*WORLD,
      heading:Math.floor(Math.random()*360),state:0,change:0
    }));
    const chosen=permutation([...people.keys()]).slice(0,Math.min(total,believers));
    for (const idx of chosen) people[idx].state=1;
    return people;
  };
  function populations(people){
    const out=[0,0,0];
    for(const person of people) out[person.state]++;
    return out;
  }
  const toroidalDistanceSq = (a,b) => {
    const rawX=Math.abs(a.x-b.x),rawY=Math.abs(a.y-b.y);
    const dx=Math.min(rawX,WORLD-rawX),dy=Math.min(rawY,WORLD-rawY);
    return dx*dx+dy*dy;
  };
  function simulateTick(people, spread, checking){
    // NetLogo's ask uses a random agentset order.
    for(const p of permutation([...people])){
      p.heading += Math.floor(Math.random()*50)-Math.floor(Math.random()*50);
      const radians=p.heading*Math.PI/180;
      p.x=wrap(p.x+0.5*Math.sin(radians));
      p.y=wrap(p.y-0.5*Math.cos(radians));
      p.change=Math.max(0,p.change-1);
    }
    // Snapshot believers before spread phase: freshly converted students
    // can fact-check this tick but only spread in a later tick.
    const transmitters=permutation(people.filter(p=>p.state===1));
    for(const p of transmitters){
      const nearby=permutation(people.filter(other=>other!==p&&toroidalDistanceSq(p,other)<=RADIUS2));
      for(const q of nearby){
        if(q.state===0&&Math.random()*100<spread){q.state=1;q.change=7;}
      }
    }
    for(const p of permutation(people.filter(p=>p.state===1))){
      if(Math.random()*100<checking){p.state=2;p.change=7;}
    }
  }

  const canvases={hero:$('hero-canvas'),scene:$('sim-canvas'),trend:$('trend-canvas')};
  const contexts=Object.fromEntries(Object.entries(canvases).map(([name,canvas])=>[name,canvas.getContext('2d')]));
  let dims={hero:{w:0,h:0},scene:{w:0,h:0},trend:{w:0,h:0}};
  let agents=[],history=[],tick=0,running=false,finished='',lastStepAt=0,heroAgents=createPopulation(200,7),lastHeroAt=0;
  let records=[],savedRun=false;

  function resizeCanvas(canvas,ctx){
    const box=canvas.getBoundingClientRect();
    const ratio=Math.min(2,window.devicePixelRatio||1);
    canvas.width=Math.max(1,Math.round(box.width*ratio));canvas.height=Math.max(1,Math.round(box.height*ratio));
    ctx.setTransform(ratio,0,0,ratio,0,0);
    return {w:box.width,h:box.height};
  }
  function resizeAll(){
    for(const name of Object.keys(canvases)) dims[name]=resizeCanvas(canvases[name],contexts[name]);
    drawAll();
  }
  function dots(ctx,dim,people,hero=false){
    const {w,h}=dim;ctx.clearRect(0,0,w,h);
    if(w<2||h<2)return;
    const pad=hero?37:17, usableW=Math.max(2,w-pad*2),usableH=Math.max(2,h-pad*2);
    // Fine registration marks and coordinates, not a decorative glow.
    if(hero){
      ctx.strokeStyle='rgba(154,180,178,.12)';ctx.lineWidth=1;
      for(let i=1;i<8;i++){
        const x=pad+usableW*i/8, y=pad+usableH*i/8;
        ctx.beginPath();ctx.moveTo(x,pad);ctx.lineTo(x,h-pad);ctx.stroke();
        ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(w-pad,y);ctx.stroke();
      }
      // Local proximity arcs are limited to active transmitters.
      const active=people.filter(p=>p.state===1).slice(0,15);
      for(const a of active){
        const ax=pad+a.x/WORLD*usableW,ay=pad+a.y/WORLD*usableH;
        for(const b of people){
          if(a===b||b.state!==0||toroidalDistanceSq(a,b)>RADIUS2*3)continue;
          const bx=pad+b.x/WORLD*usableW,by=pad+b.y/WORLD*usableH;
          if(Math.hypot(ax-bx,ay-by)>75)continue;
          ctx.strokeStyle='rgba(219,125,94,.13)';ctx.lineWidth=.8;
          ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.stroke();
        }
      }
    }
    for(const p of people){
      const x=pad+p.x/WORLD*usableW, y=pad+p.y/WORLD*usableH;
      const radius=hero?(p.state===1?3.9:2.4):(w<500?2.6:3.05);
      if(p.change>0&&!hero){
        ctx.strokeStyle=p.state===1?'rgba(220,109,66,.5)':'rgba(84,168,141,.5)';
        ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,radius+4+(7-p.change),0,Math.PI*2);ctx.stroke();
      }
      ctx.fillStyle=COLORS[p.state];ctx.beginPath();ctx.arc(x,y,radius,0,Math.PI*2);ctx.fill();
    }
    if(hero){
      ctx.fillStyle='#7d9da4';ctx.font='10px monospace';ctx.textAlign='left';
      ctx.fillText('X −16',17,h-18);ctx.textAlign='right';ctx.fillText('X +16',w-18,h-18);ctx.textAlign='left';
      ctx.fillStyle='#a0bdba';ctx.font='10px monospace';ctx.fillText('N = 200 / ILLUSTRATIVE FIELD',20,28);
    }
  }
  function trendGraph(){
    const ctx=contexts.trend,{w,h}=dims.trend;
    ctx.clearRect(0,0,w,h);if(w<4||h<4)return;
    const margins={left:39,right:15,top:13,bottom:26};
    const gw=w-margins.left-margins.right,gh=h-margins.top-margins.bottom;
    ctx.lineWidth=1;ctx.font='10px monospace';ctx.textBaseline='middle';ctx.textAlign='left';
    for(let i=0;i<5;i++){
      const yy=margins.top+gh*i/4;
      ctx.strokeStyle='#e3eae6';ctx.beginPath();ctx.moveTo(margins.left,yy);ctx.lineTo(w-margins.right,yy);ctx.stroke();
      ctx.fillStyle='#8c9995';ctx.fillText(String(Math.round(config.population*(4-i)/4)),4,yy);
    }
    ctx.fillStyle='#8c9995';ctx.textBaseline='bottom';ctx.fillText('0',margins.left,h-5);
    ctx.textAlign='right';ctx.fillText(String(config.maxTicks),w-margins.right,h-5);ctx.textAlign='left';
    for(let series=0;series<3;series++){
      if(!history.length)continue;
      ctx.beginPath();ctx.lineWidth=2;ctx.strokeStyle=COLORS[series];
      history.forEach((r,i)=>{
        const x=margins.left+(i/config.maxTicks)*gw;
        const y=margins.top+(1-r[series]/config.population)*gh;
        i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      });
      ctx.stroke();
      const latest=history[history.length-1];
      ctx.fillStyle=COLORS[series];ctx.beginPath();ctx.arc(margins.left+(history.length-1)/config.maxTicks*gw,margins.top+(1-latest[series]/config.population)*gh,2.6,0,Math.PI*2);ctx.fill();
    }
  }
  function drawAll(){dots(contexts.hero,dims.hero,heroAgents,true);dots(contexts.scene,dims.scene,agents,false);trendGraph();}
  function tickLabel(){return String(tick).padStart(3,'0');}
  function render(){
    const [u,b,v]=populations(agents);
    $('count-u').textContent=u;$('count-b').textContent=b;$('count-v').textContent=v;
    $('run-tick-heading').textContent=`TICK ${tickLabel()}`;
    $('trend-meta').textContent=`${tick} — ${config.maxTicks} TICKS`;
    $('status-marker').className='status-marker'+(running?' running':finished?' stopped':'');
    $('run-status').textContent=running?'RUNNING':finished?'COMPLETE':tick?'PAUSED':'READY';
    $('play-label').textContent=running?'Pause simulation':finished?'Run again':tick?'Resume simulation':'Run simulation';
    $('play-icon').textContent=running?'Ⅱ':'▶';
    $('save-run').disabled=!finished||savedRun;
    if(finished==='no-believers'){
      $('observation-text').textContent=`Completed at tick ${tick}: no believers remain. ${u} students stayed unaware; ${v} are verified.`;
    }else if(finished==='limit'){
      $('observation-text').textContent=`Stopped at the ${config.maxTicks}-tick limit with ${b} believers still active. The rumour has not necessarily ended.`;
    }else if(running){
      $('observation-text').textContent=`At tick ${tick}: ${b} active believers and ${v} verified students. Same settings can lead to different outcomes.`;
    }else if(tick){
      $('observation-text').textContent=`Paused at tick ${tick}. Resume or use +1 tick to inspect the next step.`;
    }else{
      $('observation-text').textContent='The model is initialized. Press Run simulation to begin.';
    }
    drawAll();
  }
  function reset(){
    running=false;finished='';savedRun=false;tick=0;
    agents=createPopulation(config.population,config.initial);
    history=[populations(agents)];
    render();
  }
  function step(){
    if(finished)return;
    if(populations(agents)[1]===0){finished='no-believers';running=false;render();return;}
    if(tick>=config.maxTicks){finished='limit';running=false;render();return;}
    simulateTick(agents,config.spread,config.checking);
    tick++;history.push(populations(agents));
    if(populations(agents)[1]===0){finished='no-believers';running=false;}
    else if(tick>=config.maxTicks){finished='limit';running=false;}
    render();
  }
  function playPause(){
    if(running){running=false;render();return;}
    if(finished)reset();
    running=true;
    lastStepAt=performance.now();
    render();
  }
  $('play').addEventListener('click',playPause);
  $('step').addEventListener('click',()=>{if(running)running=false;step();});
  $('reset').addEventListener('click',reset);
  function activePreset(name){
    document.querySelectorAll('[data-preset]').forEach(b=>b.classList.toggle('active',b.dataset.preset===name));
  }
  function refreshSettings(){
    for(const [id,key,suffix] of settings){
      const element=$(id),val=Number(element.value);
      config[key]=val;$(id+'-output').textContent=val+suffix;
      element.style.background=`linear-gradient(to right,#314a4d 0%,#314a4d ${100*(val-Number(element.min))/(Number(element.max)-Number(element.min))}%,#dce5df ${100*(val-Number(element.min))/(Number(element.max)-Number(element.min))}%,#dce5df 100%)`;
    }
    reset();
  }
  for(const [id] of settings)$(id).addEventListener('input',()=>{activePreset('');refreshSettings();});
  document.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>{
    const preset=button.dataset.preset;
    const pair={baseline:[20,10],fast:[70,10],check:[20,70]}[preset];
    $('spread').value=pair[0];$('checking').value=pair[1];
    activePreset(preset);refreshSettings();
  }));
  function drawRecords(){
    $('clear-results').disabled=records.length===0;
    $('record-rows').innerHTML='';
    if(!records.length){
      const tr=document.createElement('tr');tr.className='empty-record';
      const td=document.createElement('td');td.colSpan=5;td.textContent='No recorded runs yet. Finish a simulation and save its result.';
      tr.appendChild(td);$('record-rows').appendChild(tr);return;
    }
    records.forEach((r,index)=>{
      const tr=document.createElement('tr');
      const cells=[String(index+1).padStart(2,'0'),`${r.spread}%`,`${r.checking}%`,`${r.coverage.toFixed(1)}%`,String(r.tick)];
      for(const text of cells){const td=document.createElement('td');td.textContent=text;tr.appendChild(td);}
      $('record-rows').appendChild(tr);
    });
  }
  $('save-run').addEventListener('click',()=>{
    if(!finished||savedRun)return;
    const [u,b,v]=populations(agents);
    records.unshift({spread:config.spread,checking:config.checking,coverage:(b+v)/config.population*100,tick});
    records=records.slice(0,8);savedRun=true;drawRecords();render();
  });
  $('clear-results').addEventListener('click',()=>{records=[];drawRecords();});

  let lastPaint=0;
  function frame(now){
    // Only meaningful motion. Respect OS reduced-motion preference by leaving
    // the decorative hero illustration static, without disabling user controls.
    if(!reduceMotion&&now-lastHeroAt>180){
      simulateTick(heroAgents,22,5);
      if(populations(heroAgents)[1]===0)heroAgents=createPopulation(200,8);
      lastHeroAt=now;
    }
    if(running&&now-lastStepAt>110){step();lastStepAt=now;}
    if(now-lastPaint>33){
      dots(contexts.hero,dims.hero,heroAgents,true);
      if(running)dots(contexts.scene,dims.scene,agents,false);
      lastPaint=now;
    }
    requestAnimationFrame(frame);
  }
  window.addEventListener('resize',resizeAll,{passive:true});
  new ResizeObserver(()=>resizeAll()).observe(canvases.scene);
  activePreset('baseline');refreshSettings();drawRecords();resizeAll();requestAnimationFrame(frame);
})();
