/* Iron Week — machine guide.
   Tap an exercise name to see what the machine looks like and how to use it.
   Self-contained: window.GUIDES (keyed by PLAN exercise names) + window.openGuide(name).
   Any element with data-guide="<exercise name>" opens the guide on click.
   Photos: free-exercise-db (github.com/yuhonas/free-exercise-db), public domain (Unlicense), bundled in guides/. */
(function(){
'use strict';

const G = {
  'Hack squat': {
    img:'hack-squat', equip:'Hack squat machine', muscles:'Quads, glutes',
    steps:[
      'Set the shoulder pads so you can get under them with your knees slightly bent.',
      'Stand on the platform with feet shoulder-width apart, in the middle of the plate, toes turned out a little.',
      'Back and head flat against the pad, shoulders under the pads. Release the safety handles.',
      'Bend your knees and lower yourself slowly until your thighs are at least parallel to the platform.',
      'Push through your whole foot to stand back up. Stop just short of locking your knees.',
      'After the last rep, lock the safety handles before you step off.'
    ],
    tips:['Feet higher on the plate works glutes more; lower works quads more.','Keep your heels down the whole time.']
  },
  'Leg press': {
    img:'leg-press', equip:'45° leg press', muscles:'Quads, glutes, hamstrings',
    steps:[
      'Sit with your back and hips pressed into the seat pad.',
      'Place your feet in the middle of the platform, shoulder-width apart.',
      'Press the platform up a little and turn the safety handles out to release it.',
      'Lower the platform slowly until your knees are at about 90°, without letting your lower back lift off the pad.',
      'Press back up through your heels and mid-foot. Keep a slight bend at the top.',
      'Turn the safety handles back in before you get out.'
    ],
    tips:['Never fully lock your knees under load.','If your hips roll up at the bottom, shorten the range.']
  },
  'Leg extensions': {
    img:'leg-extension', equip:'Leg extension machine', muscles:'Quads',
    steps:[
      'Adjust the back pad so your knees line up with the machine’s pivot point.',
      'Set the ankle pad so it rests on your lower shins, just above your feet.',
      'Sit tall and hold the side handles.',
      'Straighten your legs until they are almost fully extended, and squeeze your quads for a second.',
      'Lower slowly, taking about 2–3 seconds, and stop before the weights touch.'
    ],
    tips:['Don’t swing; if your hips lift off the seat the weight is too heavy.']
  },
  'Calf raises': {
    img:'calf-raise', equip:'Standing calf raise machine', muscles:'Calves',
    steps:[
      'Set the shoulder pads so you have to bend your knees slightly to get under them.',
      'Stand with the balls of your feet on the edge of the step, heels hanging off.',
      'Stand up straight under the pads, legs straight but not locked.',
      'Lower your heels as far as is comfortable to stretch your calves.',
      'Rise up onto your toes as high as you can and pause for a second.',
      'Lower slowly and repeat.'
    ],
    tips:['Pause at the bottom for a second so you don’t bounce.','No machine? Use the leg press or a step holding a dumbbell.']
  },
  'Bench press': {
    img:'bench-press', equip:'Flat bench and barbell', muscles:'Chest, front shoulders, triceps',
    steps:[
      'Lie on the bench with your eyes directly under the bar and feet flat on the floor.',
      'Grip the bar slightly wider than shoulder-width. Squeeze your shoulder blades together.',
      'Unrack the bar and hold it straight over your shoulders with arms locked.',
      'Breathe in and lower the bar slowly to your mid-chest, elbows at about 45° from your body.',
      'Press the bar back up over your shoulders as you breathe out.',
      'After the last rep, guide the bar back into the hooks.'
    ],
    tips:['Set the safety pins or use a spotter when going heavy.','Keep your butt on the bench.']
  },
  'Weighted dips': {
    img:'dips', equip:'Parallel dip bars + dip belt', muscles:'Chest, triceps, front shoulders',
    steps:[
      'Attach the weight to a dip belt (or hold a dumbbell between your feet).',
      'Grip the bars and push up so your arms are straight and you’re supporting your weight.',
      'Lean your torso forward a little to put more work on your chest.',
      'Bend your elbows to lower yourself until your upper arms are about parallel to the floor.',
      'Push back up to straight arms without locking out hard.'
    ],
    tips:['Master bodyweight dips for clean reps before adding weight.','Stop the descent if you feel it in the front of your shoulder.']
  },
  'Incline dumbbell press': {
    img:'incline-db-press', equip:'Adjustable bench + dumbbells', muscles:'Upper chest, front shoulders, triceps',
    steps:[
      'Set the bench to about 30°.',
      'Sit with the dumbbells on your thighs, then lie back and kick them up to your shoulders.',
      'Press the dumbbells up over your chest, palms facing forward.',
      'Lower them slowly to the sides of your upper chest, elbows a little below the bench line.',
      'Press back up and bring the dumbbells close together at the top without clanking.'
    ],
    tips:['A steeper bench shifts work to your shoulders; 30° is the sweet spot for upper chest.']
  },
  'Flyes': {
    img:'flyes', equip:'Flat bench + dumbbells (or pec deck)', muscles:'Chest',
    steps:[
      'Lie on a flat bench holding the dumbbells above your chest, palms facing each other.',
      'Keep a slight, fixed bend in your elbows.',
      'Open your arms out wide in an arc until you feel a stretch across your chest.',
      'Bring the dumbbells back up along the same arc, as if hugging a big tree.',
      'Squeeze your chest at the top, then repeat.'
    ],
    tips:['Go light. This is a stretch-and-squeeze move, not a press.','On a pec deck machine the motion is the same: seat height so the handles line up with mid-chest.']
  },
  'Lateral raises': {
    img:'lateral-raise', equip:'Dumbbells', muscles:'Side shoulders',
    steps:[
      'Stand tall with a dumbbell in each hand at your sides, palms facing in.',
      'Keep a slight bend in your elbows.',
      'Raise your arms out to the sides until they are about shoulder height.',
      'Lead with your elbows, as if pouring water from a jug.',
      'Lower slowly, taking about 2–3 seconds.'
    ],
    tips:['Don’t shrug your shoulders up toward your ears.','Lighter and strict beats heavy and swinging.']
  },
  'Dumbbell curls': {
    img:'db-curl', equip:'Dumbbells', muscles:'Biceps',
    steps:[
      'Stand tall holding a dumbbell in each hand, arms straight, palms facing forward.',
      'Pin your elbows to your sides.',
      'Curl the dumbbells up toward your shoulders, moving only your forearms.',
      'Squeeze your biceps at the top for a moment.',
      'Lower slowly back to straight arms.'
    ],
    tips:['If your body swings, lower the weight.']
  },
  'Weighted pull-ups': {
    img:'pull-up', equip:'Pull-up bar + dip belt', muscles:'Lats, upper back, biceps',
    steps:[
      'Attach weight to a dip belt (or hold a dumbbell between your feet).',
      'Grab the bar slightly wider than shoulder-width, palms facing away.',
      'Hang with arms straight and pull your shoulders down away from your ears.',
      'Pull yourself up until your chin is over the bar, driving your elbows down toward your ribs.',
      'Lower all the way to straight arms under control.'
    ],
    tips:['No kipping or swinging.','Can’t do clean reps with weight yet? Do bodyweight or band-assisted pull-ups.']
  },
  'Rows': {
    img:'cable-row', equip:'Seated cable row', muscles:'Mid-back, lats, biceps',
    steps:[
      'Sit on the bench with your feet on the foot plates and knees slightly bent.',
      'Grab the handle and sit upright, arms extended, chest up.',
      'Pull the handle to your belly, driving your elbows back past your body.',
      'Squeeze your shoulder blades together for a moment.',
      'Let your arms extend slowly back to the start without rounding your back.'
    ],
    tips:['Don’t lean far back to move the weight; your torso stays mostly still.','Same steps on a chest-supported row machine.']
  },
  'Overhead triceps extension': {
    img:'overhead-triceps', equip:'One dumbbell (or cable + rope)', muscles:'Triceps',
    steps:[
      'Hold one dumbbell with both hands under the top plate.',
      'Press it straight overhead, arms extended.',
      'Keeping your upper arms close to your head, bend your elbows to lower the dumbbell behind your head.',
      'Go down until you feel a stretch in your triceps.',
      'Straighten your arms to press the dumbbell back up.'
    ],
    tips:['Keep your elbows pointing forward, not flared out.','Brace your abs so your lower back doesn’t arch.']
  },
  'Triceps pushdowns': {
    img:'pushdown', equip:'Cable machine + bar or rope', muscles:'Triceps',
    steps:[
      'Set the pulley at the top and attach a straight bar or rope.',
      'Grip it, stand close with a slight forward lean, and pin your elbows to your sides.',
      'Push the handle down until your arms are fully straight.',
      'Squeeze your triceps at the bottom.',
      'Let the handle rise slowly until your forearms are just above parallel, keeping your elbows still.'
    ],
    tips:['Only your forearms move. If your shoulders join in, it’s too heavy.']
  },
  'Romanian deadlifts / hip thrusts': {
    variants:[
      {label:'Romanian deadlift', img:'rdl', equip:'Barbell (or dumbbells)', muscles:'Hamstrings, glutes, lower back',
        steps:[
          'Stand with feet hip-width apart, holding the bar at your thighs with an overhand grip.',
          'Soften your knees slightly and keep them at that angle.',
          'Push your hips back and lower the bar down the front of your legs, keeping your back flat.',
          'Go down until you feel a strong stretch in your hamstrings, usually just below the knee.',
          'Drive your hips forward to stand back up, squeezing your glutes at the top.'
        ],
        tips:['Keep the bar touching your legs the whole way.','Stop if your lower back starts to round.']},
      {label:'Hip thrust', img:'hip-thrust', equip:'Bench + barbell with pad', muscles:'Glutes, hamstrings',
        steps:[
          'Sit on the floor with your upper back against the edge of a bench.',
          'Roll a padded barbell over your legs until it sits in the crease of your hips.',
          'Plant your feet flat, about shoulder-width, knees bent.',
          'Drive through your heels to lift your hips until your body is straight from shoulders to knees.',
          'Squeeze your glutes hard at the top, then lower slowly.'
        ],
        tips:['Tuck your chin and keep your ribs down so you don’t over-arch your back.','At the top your shins should be about vertical.']}
    ]
  },
  'Leg curls': {
    img:'leg-curl', equip:'Lying leg curl machine', muscles:'Hamstrings',
    steps:[
      'Adjust the pad so it sits just above your heels, on the back of your ankles.',
      'Lie face down with your knees just off the end of the bench, lined up with the pivot point.',
      'Hold the handles and keep your hips pressed into the pad.',
      'Curl your heels toward your butt as far as you can.',
      'Lower slowly, taking about 2–3 seconds, back to almost straight legs.'
    ],
    tips:['If your hips lift off the pad, lighten the weight.','Seated leg curl machines work the same way.']
  }
};

/* Map a plan name to a guide: exact, then without "(lighter)"-style notes, then case-insensitive. */
function find(name){
  if(!name) return null;
  if(G[name]) return G[name];
  const base = String(name).replace(/\s*\(.*?\)\s*/g,'').trim().toLowerCase();
  const k = Object.keys(G).find(k => k.toLowerCase() === base);
  return k ? G[k] : null;
}

const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const BASE = 'guides/';

const CSS = `
.ig-back{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.5);display:flex;align-items:flex-end;justify-content:center;animation:ig-fade .18s ease-out}
.ig-sheet{background:var(--surface,#fff);color:var(--ink,#1B2128);width:100%;max-width:560px;max-height:92vh;max-height:92dvh;overflow-y:auto;border-radius:16px 16px 0 0;
  padding:8px 16px calc(20px + env(safe-area-inset-bottom,0px));box-shadow:0 -10px 30px rgba(0,0,0,.25);animation:ig-up .22s ease-out;overscroll-behavior:contain}
.ig-grab{width:40px;height:4px;border-radius:2px;background:var(--line,#D5DAE0);margin:0 auto 10px}
.ig-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.ig-top h2{margin:0;font-family:var(--f-display,inherit);font-weight:800;font-size:28px;line-height:1;text-transform:uppercase;letter-spacing:.01em}
.ig-meta{font-size:12px;color:var(--muted,#5E6873);letter-spacing:.04em;text-transform:uppercase;margin-top:6px}
.ig-x{appearance:none;border:none;background:var(--chip,#E3E7EB);color:var(--ink,#1B2128);width:36px;height:36px;border-radius:50%;font-size:20px;line-height:1;cursor:pointer;flex:none}
.ig-tabs{display:flex;gap:6px;margin-top:12px}
.ig-tab{appearance:none;border:1px solid var(--line,#D5DAE0);background:var(--bg,#EEF0F2);color:var(--ink,#1B2128);border-radius:999px;padding:6px 12px;font:600 13px inherit;font-family:inherit;cursor:pointer}
.ig-tab[aria-selected="true"]{background:var(--ink,#1B2128);color:var(--surface,#fff);border-color:var(--ink,#1B2128)}
.ig-fig{margin:12px 0 0;position:relative;border-radius:12px;overflow:hidden;background:var(--bg,#EEF0F2);aspect-ratio:3/2}
.ig-fig img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity .35s}
.ig-fig img.off{opacity:0}
.ig-phase{position:absolute;left:8px;bottom:8px;display:flex;gap:4px}
.ig-phase button{appearance:none;border:none;border-radius:999px;padding:4px 10px;font:600 11px var(--f-num,ui-monospace,monospace);text-transform:uppercase;letter-spacing:.04em;background:rgba(0,0,0,.55);color:#fff;cursor:pointer}
.ig-phase button[aria-pressed="true"]{background:var(--accent,#C8372B)}
.ig-h{margin:16px 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted,#5E6873);font-weight:600}
.ig-steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px;counter-reset:ig}
.ig-steps li{counter-increment:ig;display:grid;grid-template-columns:28px 1fr;gap:10px;align-items:start}
.ig-steps li::before{content:counter(ig);width:28px;height:28px;border-radius:50%;background:var(--accent,#C8372B);color:#fff;display:grid;place-items:center;font:600 13px var(--f-num,ui-monospace,monospace)}
.ig-steps li span{padding-top:3px}
.ig-tips{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px;color:var(--muted,#5E6873);font-size:14px}
.ig-credit{margin:16px 0 0;font-size:11px;color:var(--muted,#5E6873)}
.ig-credit a{color:inherit}
[data-guide]{cursor:pointer}
.ig-open{appearance:none;border:none;background:none;padding:0;margin:0;font:inherit;color:inherit;text-align:left;cursor:pointer;display:inline-flex;align-items:center;gap:6px}
.ig-open svg{width:16px;height:16px;flex:none;color:var(--muted,#5E6873)}
.ig-open:hover svg,.ig-open:focus-visible svg{color:var(--accent,#C8372B)}
@keyframes ig-up{from{transform:translateY(24px);opacity:.6}to{transform:none;opacity:1}}
@keyframes ig-fade{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion: reduce){.ig-back,.ig-sheet{animation:none}.ig-fig img{transition:none}}
`;

let root=null, flip=null, lastFocus=null, current=null;

function addStyle(){
  if(document.getElementById('ig-style')) return;
  const st=document.createElement('style'); st.id='ig-style'; st.textContent=CSS; document.head.appendChild(st);
}
addStyle(); // up front, so the tappable exercise names are styled before the first open

function ensure(){
  if(root) return;
  root=document.createElement('div'); root.id='ig-root'; document.body.appendChild(root);
  root.addEventListener('click', onClick);
  document.addEventListener('keydown', e => {
    if(!current) return;
    if(e.key==='Escape'){ e.preventDefault(); closeGuide(); }
    else if(e.key==='Tab'){ trap(e); }
  });
}

function trap(e){
  const f=[...root.querySelectorAll('button,a[href]')].filter(el=>!el.disabled);
  if(!f.length) return;
  const first=f[0], last=f[f.length-1];
  if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
}

const reduced = () => { try{ return matchMedia('(prefers-reduced-motion: reduce)').matches }catch(e){ return false } };

function body(v){
  return `<figure class="ig-fig">
      <img src="${BASE}${v.img}-0.jpg" alt="${esc(v.label||current.name)}: start position" decoding="async">
      <img src="${BASE}${v.img}-1.jpg" alt="${esc(v.label||current.name)}: end position" class="off" decoding="async">
      <div class="ig-phase" role="group" aria-label="Show position">
        <button data-ig-phase="0" aria-pressed="true">Start</button><button data-ig-phase="1" aria-pressed="false">Finish</button>
      </div>
    </figure>
    <div class="ig-meta" style="margin-top:10px">${esc(v.equip)} · ${esc(v.muscles)}</div>
    <h3 class="ig-h">How to do it</h3>
    <ol class="ig-steps">${v.steps.map(s=>`<li><span>${esc(s)}</span></li>`).join('')}</ol>
    ${v.tips&&v.tips.length?`<h3 class="ig-h">Tips</h3><ul class="ig-tips">${v.tips.map(t=>`<li>${esc(t)}</li>`).join('')}</ul>`:''}`;
}

function setPhase(p, user){
  const imgs=root.querySelectorAll('.ig-fig img');
  if(imgs.length<2) return;
  imgs[0].classList.toggle('off', p===1); imgs[1].classList.toggle('off', p!==1);
  root.querySelectorAll('[data-ig-phase]').forEach(b=>b.setAttribute('aria-pressed', String(+b.dataset.igPhase===p)));
  current.phase=p;
  if(user) stopFlip();
}
function startFlip(){ stopFlip(); if(reduced()) return; flip=setInterval(()=>setPhase(current.phase?0:1), 1600); }
function stopFlip(){ clearInterval(flip); flip=null; }

function draw(){
  const g=current.g, vs=g.variants||[g], v=vs[current.vi];
  root.innerHTML=`<div class="ig-back" data-ig-close>
    <div class="ig-sheet" role="dialog" aria-modal="true" aria-labelledby="ig-title">
      <div class="ig-grab"></div>
      <div class="ig-top"><div><h2 id="ig-title">${esc(current.name)}</h2></div>
        <button class="ig-x" data-ig-close aria-label="Close guide">×</button></div>
      ${vs.length>1?`<div class="ig-tabs" role="tablist">${vs.map((x,i)=>`<button class="ig-tab" role="tab" aria-selected="${i===current.vi}" data-ig-v="${i}">${esc(x.label)}</button>`).join('')}</div>`:''}
      <div class="ig-body">${body(v)}</div>
      <p class="ig-credit">Photos: <a href="https://github.com/yuhonas/free-exercise-db" target="_blank" rel="noopener">Free Exercise DB</a>, public domain.</p>
    </div></div>`;
  current.phase=0; startFlip();
}

function onClick(e){
  const c=e.target.closest('[data-ig-close]');
  if(c && (c.classList.contains('ig-x') || e.target===c)){ closeGuide(); return; }
  const ph=e.target.closest('[data-ig-phase]');
  if(ph){ setPhase(+ph.dataset.igPhase, true); return; }
  const t=e.target.closest('[data-ig-v]');
  if(t){ current.vi=+t.dataset.igV; draw(); const b=root.querySelector(`[data-ig-v="${current.vi}"]`); b&&b.focus(); }
}

function openGuide(name){
  const g=find(name);
  if(!g) return false;
  ensure();
  lastFocus=document.activeElement;
  current={name:String(name).replace(/\s*\(.*?\)\s*/g,' ').trim(), g, vi:0, phase:0};
  draw();
  document.documentElement.style.overflow='hidden';
  const x=root.querySelector('.ig-x'); x&&x.focus({preventScroll:true});
  return true;
}

function closeGuide(){
  if(!current) return;
  stopFlip(); current=null; root.innerHTML='';
  document.documentElement.style.overflow='';
  if(lastFocus && lastFocus.focus){ try{ lastFocus.focus({preventScroll:true}) }catch(e){} }
}

/* Delegated opener: any [data-guide="Exercise name"] element. */
document.addEventListener('click', e => {
  const el=e.target.closest && e.target.closest('[data-guide]');
  if(!el || (root && root.contains(el))) return;
  if(openGuide(el.dataset.guide)) e.preventDefault();
});

window.GUIDES=G;
window.hasGuide=name=>!!find(name);
window.openGuide=openGuide;
window.closeGuide=closeGuide;
})();
