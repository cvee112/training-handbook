import { useState } from "react";

const C = {
  bg: "#0a0a0c", bgCard: "#111114", border: "#222228", text: "#e8e8ec",
  textMuted: "#8888a0", textDim: "#55556a", accent: "#c8a864", accentDim: "#8a7444",
  accentGlow: "rgba(200,168,100,0.08)", danger: "#c45c5c", dangerDim: "rgba(196,92,92,0.12)",
  success: "#5c9a6e", successDim: "rgba(92,154,110,0.12)", blue: "#5c8cc4",
  blueDim: "rgba(92,140,196,0.12)", purple: "#9b7cc4", purpleDim: "rgba(155,124,196,0.12)",
};

const SECTIONS = [
  { id: "overview", label: "Overview", icon: "◉" },
  { id: "principles", label: "Core Principles", icon: "◈" },
  { id: "warmup", label: "Warm-Up Protocol", icon: "△" },
  { id: "exercises", label: "Exercise Library", icon: "◻" },
  { id: "dayA", label: "Day A — Strength", icon: "1" },
  { id: "dayB", label: "Day B — Hypertrophy", icon: "2" },
  { id: "dayC", label: "Day C — Volume", icon: "3" },
  { id: "correctives", label: "Scoliosis Correctives", icon: "↺" },
  { id: "tendon", label: "Tendon Rehab", icon: "+" },
  { id: "running", label: "Zone 2 Running", icon: "→" },
  { id: "progression", label: "Progression Rules", icon: "↑" },
  { id: "week", label: "Full Week Map", icon: "▦" },
  { id: "faq", label: "Key Warnings", icon: "!" },
];

function Badge({ color, children }) {
  const bg = {accent:C.accentGlow,danger:C.dangerDim,success:C.successDim,purple:C.purpleDim}[color]||C.blueDim;
  const fg = {accent:C.accent,danger:C.danger,success:C.success,purple:C.purple}[color]||C.blue;
  return <span style={{display:"inline-block",padding:"2px 10px",borderRadius:4,fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",background:bg,color:fg,border:`1px solid ${fg}33`}}>{children}</span>;
}
function Card({children,style,highlight}){return <div style={{background:C.bgCard,border:`1px solid ${highlight?C.accentDim:C.border}`,borderRadius:8,padding:"20px 24px",marginBottom:16,...style}}>{children}</div>}
function SectionTitle({children}){return <h2 style={{fontSize:26,fontWeight:800,color:C.text,marginBottom:8,letterSpacing:"-0.02em",lineHeight:1.2,fontFamily:"'Playfair Display',Georgia,serif"}}>{children}</h2>}
function SubTitle({children}){return <h3 style={{fontSize:17,fontWeight:700,color:C.accent,marginTop:24,marginBottom:10}}>{children}</h3>}
function P({children,style}){return <p style={{fontSize:14.5,lineHeight:1.72,color:C.text,marginBottom:12,...style}}>{children}</p>}
function Warn({children}){return <div style={{background:C.dangerDim,border:`1px solid ${C.danger}44`,borderRadius:6,padding:"12px 16px",marginBottom:14,fontSize:13.5,lineHeight:1.65,color:C.text}}><span style={{color:C.danger,fontWeight:700,marginRight:6}}>⚠</span>{children}</div>}
function Tip({children}){return <div style={{background:C.successDim,border:`1px solid ${C.success}44`,borderRadius:6,padding:"12px 16px",marginBottom:14,fontSize:13.5,lineHeight:1.65,color:C.text}}><span style={{color:C.success,fontWeight:700,marginRight:6}}>✓</span>{children}</div>}

function AltBlock({type,alt}){
  const[open,setOpen]=useState(false);
  const isBW=type==="bw";
  const col=isBW?C.success:C.purple;
  const bgCol=isBW?C.successDim:C.purpleDim;
  return(
    <div style={{background:bgCol,border:`1px solid ${col}33`,borderRadius:6,marginBottom:8,overflow:"hidden"}}>
      <div onClick={()=>setOpen(!open)} style={{padding:"10px 14px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Badge color={isBW?"success":"purple"}>{isBW?"Bodyweight":"Band (no anchor)"}</Badge>
          <span style={{fontSize:13.5,fontWeight:600,color:C.text}}>{alt.name}</span>
        </div>
        <span style={{color:C.textDim,fontSize:14,transition:"transform 0.2s",transform:open?"rotate(90deg)":"none"}}>▸</span>
      </div>
      {open&&(
        <div style={{padding:"0 14px 14px",borderTop:`1px solid ${col}22`}}>
          {alt.setup&&<P style={{fontSize:13,marginTop:10}}><strong style={{color:col}}>Setup:</strong> {alt.setup}</P>}
          <div style={{fontSize:11,fontWeight:700,color:col,marginTop:10,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.08em"}}>Form cues</div>
          <ol style={{margin:0,paddingLeft:20,fontSize:13,lineHeight:1.72,color:C.text}}>
            {alt.cues.map((c,i)=><li key={i} style={{marginBottom:5}}>{c}</li>)}
          </ol>
          {alt.progression&&<div style={{marginTop:10,fontSize:12.5,color:C.textMuted,fontStyle:"italic"}}><strong>Progression:</strong> {alt.progression}</div>}
          {alt.note&&<div style={{marginTop:8}}><Tip>{alt.note}</Tip></div>}
        </div>
      )}
    </div>
  );
}

function ExerciseBlock({name,category,sets,reps,rest,cues,why,avoid,note,asymmetric,bw,band}){
  const[open,setOpen]=useState(false);
  const hasAlts=bw||band;
  return(
    <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:8,marginBottom:10,overflow:"hidden"}}>
      <div onClick={()=>setOpen(!open)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <span style={{fontWeight:700,fontSize:15,color:C.text}}>{name}</span>
            {category&&<Badge color="accent">{category}</Badge>}
            {asymmetric&&<Badge color="blue">Asymmetric</Badge>}
            {hasAlts&&<span style={{fontSize:10,color:C.textDim}}>+alts</span>}
          </div>
          <div style={{fontSize:12.5,color:C.textMuted,marginTop:4}}>{sets} × {reps} · Rest {rest}</div>
        </div>
        <span style={{color:C.textDim,fontSize:18,transition:"transform 0.2s",transform:open?"rotate(90deg)":"none"}}>▸</span>
      </div>
      {open&&(
        <div style={{padding:"0 18px 16px",borderTop:`1px solid ${C.border}`}}>
          {why&&<><div style={{fontSize:11,fontWeight:700,color:C.accent,marginTop:14,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.08em"}}>Why this exercise</div><P style={{fontSize:13.5}}>{why}</P></>}
          <div style={{fontSize:11,fontWeight:700,color:C.accent,marginTop:10,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.08em"}}>Form cues</div>
          <ol style={{margin:0,paddingLeft:20,fontSize:13.5,lineHeight:1.72,color:C.text}}>
            {cues.map((c,i)=><li key={i} style={{marginBottom:6}}>{c}</li>)}
          </ol>
          {avoid&&<><div style={{fontSize:11,fontWeight:700,color:C.danger,marginTop:14,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.08em"}}>Common mistakes</div><ul style={{margin:0,paddingLeft:20,fontSize:13.5,lineHeight:1.72,color:C.text}}>{avoid.map((a,i)=><li key={i} style={{marginBottom:4}}>{a}</li>)}</ul></>}
          {note&&<Tip>{note}</Tip>}
          {hasAlts&&(
            <div style={{marginTop:18,borderTop:`1px solid ${C.border}`,paddingTop:14}}>
              <div style={{fontSize:11,fontWeight:700,color:C.textMuted,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.1em"}}>Alternatives — tap to expand</div>
              {bw&&<AltBlock type="bw" alt={bw}/>}
              {band&&<AltBlock type="band" alt={band}/>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const ALT={
  gobletBW:{name:"Bodyweight Squat → Pistol Progression",setup:"No equipment. For pistol progression, eventually use a chair for the assisted version.",cues:["Same form as goblet squat: feet hip-width, toes 15–30° out, core braced.","Clasp hands at chest or extend arms forward for counterbalance.","Descend slowly (3 sec down), same depth cues.","When BW bilateral reaches 3 × 20+ at 1 RIR, progress to split squats, then assisted pistols (hold doorframe)."],progression:"BW bilateral → 1.5-rep squats → split squat → assisted pistol → pistol. Transition at 3 × 15+."},
  gobletBand:{name:"Banded Front Squat",setup:"Stand on band center with both feet. Loop other end over hands at shoulder height in a front-rack position. Band stretches as you stand up.",cues:["Step on band center, feet hip-width. Bring band up to shoulders, elbows high.","High elbows prevent slipping and force upright torso — same benefit as the goblet position.","Squat with identical form cues: hips back, knees track toes, flat back.","Band resists most at lockout — squeeze glutes hard at top.","Heavier band for strength days, lighter for volume days."],progression:"Light → medium → heavy → extra-heavy → double up bands or add 3-sec bottom pause."},
  rowBW:{name:"Inverted Row (Table or Sturdy Surface)",setup:"Sturdy table, desk, or railing. Lie underneath and pull yourself up. Alternatively: two chairs with a broomstick across them.",cues:["Lie under table edge, grip overhand at shoulder width.","Walk feet forward — more horizontal = harder.","Pull chest to table edge, driving elbows back and squeezing shoulder blades.","Pause 1 sec at top. Lower 2–3 sec to full extension.","For scoliosis asymmetry: after bilateral set, do 3–5 extra reps biased to the LEFT arm (shift body slightly right)."],progression:"45° angle → horizontal → feet elevated → weighted (backpack)."},
  rowBand:{name:"Single-Arm Bent-Over Band Row",setup:"Step on band center with OPPOSITE foot (right foot for left-arm row). Creates diagonal pull. No anchor needed.",cues:["Right foot on band. Stagger left foot behind. Hinge forward 45°, flat back.","Hold band in LEFT hand. Row toward lower left rib cage, driving elbow back and up.","Squeeze shoulder blade 1 sec at top.","Lower under control. Choke up on band for more resistance."],progression:"Light → medium → heavy → doubled band → 2-sec pause at peak."},
  pressBW:{name:"Pushup (with Progressions)",setup:"Floor only. Start at whatever level maintains good form.",cues:["Hands slightly wider than shoulders, fingers spread, middle fingers forward.","Rigid plank: glutes squeezed, core braced, chin tucked. Straight line head to heels.","Lower with elbows at 45° (not 90°). Chest to 1–2 inches from floor.","Push through palms, full extension at top.","Scoliosis cue: maintain level pelvis and shoulders — don't let one side dip."],progression:"Wall → incline (hands on bench) → knees → full → deficit (hands on books) → archer pushup. Transition at 3 × 15+.",note:"Excellent Day C substitute. On strength days, deficit or archer pushups challenge more. Slow tempo (3-1-2) increases difficulty without equipment."},
  pressBand:{name:"Banded Floor Press",setup:"Loop band around upper back below shoulder blades. Hold one end in each hand. Lie on back — band provides resistance as you press up.",cues:["Route band across upper back. Grip one end per hand at chest height.","Elbows at 45°, forearms vertical.","Press upward — increasing resistance as arms extend.","Lower until triceps touch floor. Pause. Press back up.","If band slides, place towel between band and back."],progression:"Light → medium → heavy → wrap band once around each hand to shorten → single-arm variant."},
  rdlBW:{name:"Bodyweight Single-Leg RDL",setup:"No equipment. Use wall or chair for fingertip balance if needed.",cues:["Identical form to DB version. Arms extended forward or to sides for counterbalance.","Stand on RIGHT leg, soft knee. Hinge forward, left leg extending behind.","Focus on hip hinge and balance — surprisingly hard with BW alone.","Touch wall or chair lightly if balance is a struggle; gradually wean off."],progression:"Supported → unsupported → slow tempo (5/5) → eyes closed (advanced). At 3 × 15 BW, progress to DB/band version."},
  rdlBand:{name:"Banded Single-Leg RDL",setup:"Stand on band center with WORKING foot (right). Hold other end in opposite hand (left). Band loads the hip extension as you stand.",cues:["Step on band with right foot. Hold other end in left hand.","Identical SL RDL movement: hinge, left leg rises, torso tips.","Band is slack at bottom, tighter as you stand — matches the strength curve well.","Squeeze right glute hard at top where tension is highest."],progression:"Light → medium → heavy → doubled band. Variable resistance is advantageous for tendon loading."},
  pallofBW:{name:"Plank Shoulder Taps",setup:"Floor only. Full pushup plank. Anti-rotation — each hand lift forces core to resist rotation.",cues:["Pushup position: hands under shoulders, body rigid, feet hip-width (wider = easier).","Without shifting hips or rotating, lift RIGHT hand, tap LEFT shoulder.","Return. Lift LEFT hand, tap RIGHT shoulder.","KEY: minimize hip sway. Imagine a cup of water on your back.","Move slowly — each tap 2–3 sec. Widen feet if hips sway."],progression:"Wide stance → narrow → feet together → add pushup between taps → elevate feet."},
  pallofBand:{name:"Pallof Press (Pole/Post Wrap)",setup:"Wrap band around any sturdy vertical object — pole, tree, railing, table leg, bedpost. No dedicated anchor needed.",cues:["Wrap band around pole at chest height.","Stand perpendicular, clasp both ends at chest. Step away for tension.","Press forward identically to standard Pallof.","If band slips, add extra wrap or use textured surface.","If truly no anchor available, use plank shoulder taps instead."],note:"If no vertical object at all: loop band around your back (like banded press setup), hold both ends in front, twist torso against pull for standing anti-rotation hold."},
  splitBW:{name:"Bodyweight Split Squat → Bulgarian Split Squat",setup:"Floor only. For Bulgarian: rear foot elevated on chair/bench (12–18 inches).",cues:["Same split stance, hands at chest or arms forward.","Lower until back knee 2–3 inches from floor. Drive up through front foot.","At 3 × 15+, progress to Bulgarian: rear foot on bench, same squat motion.","For Bulgarians, front foot far enough that knee doesn't overshoot toes."],progression:"BW split squat → slow tempo (4 sec down) → 1.5-rep → Bulgarian → slow tempo Bulgarian → backpack with books."},
  splitBand:{name:"Banded Split Squat",setup:"Step on band with FRONT foot. Hold other end at shoulders or sides.",cues:["Band under front foot. Bring to shoulders or hold at sides.","Same split stance and form cues.","Band provides increasing resistance as you stand.","Compensate for lighter load with slower tempo (3 down, 2 pause, 2 up)."],progression:"Light → medium → heavy → 2-sec bottom pause → banded Bulgarian."},
  ohpBW:{name:"Pike Pushup → Handstand Pushup Progression",setup:"Floor only. For decline pike: feet on chair. This loads shoulders through the same pressing pattern as OHP.",cues:["Pushup position → walk feet toward hands until hips pike high (inverted V). Closer feet = harder.","Hands slightly wider than shoulders, fingers spread.","Lower head toward floor between hands. Elbows at 45°.","Press to full extension. Core tight.","For half-kneeling benefit: staggered stance for asymmetric stability demand."],progression:"Standard pike → decline pike (feet on chair) → wall handstand pushup → freestanding (advanced)."},
  ohpBand:{name:"Banded Overhead Press (Half-Kneeling)",setup:"Kneel on band with DOWN knee. Hold other end in same-side hand at shoulder. Band runs from knee to pressing hand.",cues:["Half-kneeling: right knee down → band under right knee → press with right hand.","Hold at shoulder, palm forward. Press straight overhead.","Band progressively resists as arm extends — squeeze at top.","Lower under control.","Choke up or use heavier band for more resistance."],progression:"Light → medium → heavy. Very stable setup, no anchor needed."},
  thrustBW:{name:"Bodyweight Hip Thrust → Single-Leg",setup:"Back against bench, couch, or sturdy chair. No equipment.",cues:["Same setup, no weight. Hands on stomach or crossed at chest.","Drive hips up, squeeze glutes 2–3 sec at top.","At 3 × 20+, progress: extend one leg straight, thrust with other leg only.","Start with RIGHT leg (affected side) for tendon loading.","Single-leg is demanding — start at 3 × 8."],progression:"Bilateral BW → 3-sec pause at top → single-leg supported (foot lightly touching) → full single-leg → single-leg with pause."},
  thrustBand:{name:"Banded Hip Thrust",setup:"Loop band across hips, pin both ends under your feet. When you thrust up, band stretches. No external anchor.",cues:["Back against bench. Band across hips, step on both ends.","Band should be taut at bottom. If slack, wrap around feet once.","Thrust against band. Squeeze 2 sec at top.","Band resists most at full extension — matches glute's strongest position."],progression:"Light → medium → heavy → 3-sec pause → single-leg banded."},
  sidePlankBW:{name:"This IS Bodyweight — Progressions",setup:"Floor only.",cues:["If full side plank too hard: start from KNEES — bend both knees 90°, support from knee.","Progression: Knee (20s) → full (20s) → full (40s) → full (60s).","Add hip dips: from side plank, lower hips toward floor and drive up. 8–12 reps.","Star side plank: lift top leg and arm toward ceiling.","Copenhagen plank: top foot on bench, bottom foot hanging (very advanced)."],progression:"Knee → full → hip dips → star → Copenhagen."},
  stepBW:{name:"Bodyweight Step-Up",setup:"Step, chair, bench, or staircase. Hands on hips or for balance.",cues:["Identical form, no weights.","Increase difficulty: slow tempo (5 up, 5 down), increase height, add knee drive at top.","Eccentric (lowering) phase remains priority."],progression:"Low step (6–8 in) → standard (12–18 in) → slow tempo (5/5) → knee drive → lateral step-up."},
  stepBand:{name:"Banded Step-Up",setup:"Band under WORKING foot on the step. Hold other end at shoulders.",cues:["Band under right foot on step. Hold at shoulder(s).","Step up — band resists as you rise.","Same form cues. Lower under control.","Works best with longer band. If short, hold at hip level."],progression:"Light → medium → heavy. Combine with slow tempo."},
  rowBilBW:{name:"Inverted Row",setup:"Same as single-arm row BW alt: sturdy table, railing, or broomstick on chairs.",cues:["Under table, overhand grip, shoulder width.","Pull chest to edge. Pause 1 sec. Lower 2–3 sec.","Adjust angle for difficulty — upright = easier, horizontal = harder."],progression:"45° → horizontal → feet elevated → weighted (backpack)."},
  rowBilBand:{name:"Banded Bent-Over Row",setup:"Stand on band center with both feet. Hold one end per hand. Hinge forward. No anchor.",cues:["Stand on band, hip-width. Hinge 45°, flat back.","Row both ends toward lower ribs, driving elbows back.","Squeeze shoulder blades 1 sec at top.","Widen stance on band or choke up for more resistance."],progression:"Light → medium → heavy → 2-sec pause at peak."},
  latWalkBW:{name:"Side-Lying Hip Abduction",setup:"No equipment. Lie on LEFT side (right hip up).",cues:["Body straight. Lift right leg 30–40° with toes slightly downward (targets glute med over TFL).","Hold 2 sec at top. Lower slowly. 3 × 15–20.","Do NOT let top hip roll forward.","BW lateral walks (no band): same form as banded, but actively push against imaginary resistance, very slow tempo (3 sec/step)."],progression:"Side-lying abduction → with ankle weight → standing abduction → banded versions."},
  faceBW:{name:"Prone Y-T-W Raises",setup:"Lie face down on floor (or bench edge for more range). No equipment.",cues:["Face down, forehead on towel.","Y-raise: Arms overhead in Y shape, thumbs up. Lift off floor, squeeze below shoulder blades. Hold 2 sec. 8 reps.","T-raise: Arms straight to sides, palms down. Lift, squeeze. Hold 2 sec. 8 reps.","W-raise: Elbows bent 90°, upper arms 45° out. Rotate hands toward ceiling, squeeze. Hold 2 sec. 8 reps.","Circuit: 8Y → 8T → 8W = 1 round. Do 2–3 rounds."],progression:"Floor → bench edge (full range) → add water bottles → slow tempo (3 up, 3 hold, 3 down).",note:"Arguably better than banded version for posture — gravity forces work with zero momentum. Recommended even when bands are available."},
  faceBand:{name:"Band Pull-Apart",setup:"Hold band in front of you at shoulder height. NO anchor — your arms create resistance. The ideal no-anchor band exercise.",cues:["Hold band at shoulder height, arms extended, hands shoulder-width apart on band.","With straight arms, pull band apart until it touches chest.","Squeeze shoulder blades hard. Hold 1–2 sec.","Return slowly — control the band.","Shoulders DOWN throughout. Adjust grip: wider = easier, narrower = harder."],progression:"Wide grip light band → narrower → thicker band → 3-sec hold at peak. Excellent daily posture exercise — 2–3 × 15–20 anytime."},
  latRaiseBW:{name:"Water Bottle Lateral Raise / Wall Press",setup:"Water bottles (500ml–1.5L) as light weights. Or: wall isometric.",cues:["Water bottle version: identical lateral raise form with bottles.","Wall version: stand with side against wall, press back of hand/wrist outward against wall. Hold 20–30 sec per side. Isometric lateral raise."],progression:"Isometric wall (20 sec) → 500ml bottles → 1.5L → slow tempo (5/5) → bands or DBs."},
  latRaiseBand:{name:"Banded Lateral Raise",setup:"Stand on band center with both feet. Hold one end per hand at sides. No anchor.",cues:["Stand on band center, hip-width.","Raise arms to sides with slight elbow bend and forward tip at top.","Band resists most at shoulder height — where deltoid works hardest.","Lower 3 sec.","Adjust grip for even resistance between hands."],progression:"Light → medium → heavy → slow tempo (4 up, 2 hold, 4 down) → 1.5-rep style."},
  curlBW:{name:"Towel Curl / Doorframe Curl",setup:"Towel: loop under one foot, hold both ends. Doorframe: grip frame at waist height, lean back, curl yourself toward it.",cues:["Towel: stand on towel, curl hands toward shoulders. Foot resists — control tension with foot pressure.","Doorframe: grip with one hand, lean back, curl yourself in. 8–12 reps/arm.","Both methods allow real-time resistance self-regulation."],progression:"Towel light → heavy pressure → doorframe (more lean = harder) → chin-ups if bar available."},
  curlBand:{name:"Banded Bicep Curl",setup:"Stand on band center, hold ends palms forward. No anchor.",cues:["Band under feet, palms forward, arms at sides.","Curl toward shoulders, upper arms pinned.","Squeeze at top. Lower under control.","Single-arm: one foot on band, same-side hand curls."],progression:"Light → medium → heavy → choke up → slow tempo (3-2-3)."},
  triBW:{name:"Diamond Pushup / Bench Dip",setup:"Floor for diamond pushups. Chair/bench for dips.",cues:["Diamond: pushup position, hands together forming diamond with thumbs and index fingers. Lower and press — shifts work to triceps.","If too hard: from knees or incline.","Bench dip: sit on bench edge, hands gripping beside hips. Slide off, lower by bending elbows ~90°, press up.","Keep back close to bench throughout."],progression:"Incline diamond → knee diamond → full diamond → bench dip (knees bent) → legs straight → feet elevated.",note:"Diamond pushups preferred over bench dips for scoliosis — dips can stress shoulder asymmetrically."},
  triBand:{name:"Banded Overhead Tricep Extension",setup:"Step on one end with one foot (behind you). Hold other end behind head. Your foot is the anchor.",cues:["Step on band with right foot behind you.","Bring other end behind head, grip with both hands. Elbows forward/upward.","Extend arms overhead against resistance.","Lower behind head under control.","Keep elbows forward — don't flare."],progression:"Light → medium → heavy → single-arm → slow tempo."},
  deadBugBW:{name:"This IS Bodyweight — Progressions",setup:"Floor only. Band variant is optional.",cues:["Standard dead bug: back flat, 3-sec extensions.","Increase difficulty: slow tempo (5/5), full limb extension with 3-sec hold, both limbs simultaneously."],progression:"Standard → slow tempo → full extension with hold → both limbs simultaneously."},
};

const EXERCISES = [
  {name:"Dumbbell Goblet Squat",cat:"Legs",sets:"3–5",reps:"4–6 (A) / 8–12 (B)",rest:"2–3 min",asym:false,
   why:"Safest loaded squat for scoliosis — front-loaded DB counterbalances torso for upright spine. Less spinal compression than barbell back squat.",
   cues:["Hold one DB vertically at chest, both hands cupping top end, elbows down.","Feet hip-width to slightly wider, toes 15–30° out.","Brace core before descending.","Hips back + knees bend simultaneously — 'sit between your hips.'","Descend until hip crease below knee line or as deep as back stays flat.","Knees track over toes, pushing slightly outward. No valgus collapse.","Bottom: elbows between or inside knees.","Drive up through whole foot — big toe, little toe, heel equally.","Full lockout: squeeze glutes at top.","Scoliosis cue: 'long spine, level ribs' as you stand."],
   avoid:["Heels lifting — use heel wedge.","Knees caving — stresses gluteal tendon.","Excessive forward lean.","Lower back rounding at bottom."],
   note:"Tendinopathy: hip-width or wider stance. Narrow stance increases hip adduction, compressing the tendon.",
   bw:ALT.gobletBW,band:ALT.gobletBand},
  {name:"Single-Arm Dumbbell Row",cat:"Back",sets:"3–5",reps:"4–6 (A) / 8–12 (B)",rest:"2 min",asym:true,
   why:"Unilateral rowing addresses scoliosis muscle asymmetry. Left (convex) lat and lower trap are stretch-weakened. Extra volume on left corrects this.",
   cues:["Right knee + hand on bench, left foot on floor.","DB in left hand, arm fully extended.","Set shoulder blade: draw it down and slightly back.","Pull DB toward lower rib cage by driving elbow to ceiling.","Top: 1-sec pause, squeeze between shoulder blade and spine.","Lower 2–3 sec to full extension.","Torso parallel to floor — no trunk rotation.","All reps on left first, then switch."],
   avoid:["Jerking with rotation.","Shrugging toward ear.","Hyperextending lower back."],
   note:"Scoliosis: extra set on LEFT side for stretch-weakness correction.",
   bw:ALT.rowBW,band:ALT.rowBand},
  {name:"Dumbbell Floor Press",cat:"Chest",sets:"3–4",reps:"4–6 (A) / 8–12 (B)",rest:"2–3 min",asym:false,
   why:"Limited ROM reduces shoulder stress — important with scoliosis-related shoulder asymmetry. DBs let each arm find its natural path.",
   cues:["Lie on back, knees bent, feet flat hip-width.","DB in each hand at chest level, palms toward feet. Upper arms at 45°.","Press upward to full extension over chest.","Lower until triceps lightly touch floor. Pause — no bounce.","Press up, squeeze chest at top.","Natural back arch — don't flatten or over-arch."],
   avoid:["90° elbow flare — keep 45°.","Bouncing off floor.","Uneven pressing."],
   bw:ALT.pressBW,band:ALT.pressBand},
  {name:"DB Single-Leg Romanian Deadlift",cat:"Posterior Chain",sets:"3–4",reps:"6–8 (A) / 10–12 (B)",rest:"2 min",asym:true,
   why:"Trains posterior chain on one leg, loads glute med as pelvic stabilizer (treats tendinopathy), demands anti-rotation (benefits scoliosis). Most runner-relevant exercise.",
   cues:["Stand on RIGHT leg (affected side). DB in LEFT hand.","Slight knee bend (15–20°) throughout.","Hinge: hips back, torso forward. Left leg rises behind.","DB hangs straight down, tracking close to right leg.","Descend until hamstring stretch OR torso parallel — whichever first.","CRITICAL: hips stay level. Don't let trailing hip rotate open.","Drive back by squeezing right glute.","Full lockout, glute squeeze before next rep."],
   avoid:["Rounding lower back.","Opening hips.","Locking standing knee.","Too heavy — start light."],
   note:"Tendon-safe: standing-leg glute med works as stabilizer without hip adduction compression.",
   bw:ALT.rdlBW,band:ALT.rdlBand},
  {name:"Banded Pallof Press",cat:"Core / Anti-rotation",sets:"3",reps:"8–10/side",rest:"60 sec",asym:true,
   why:"Most important core exercise for scoliosis. Trains anti-rotation — resisting the rotational tendency of the curve.",
   cues:["Band attached to anchor at chest height.","Stand perpendicular, band clasped at chest. Step away for tension.","Feet hip-width, knees soft, core braced.","Press hands straight forward, arms fully extended. Resist rotation completely.","Hold 2–3 sec. Return to chest = 1 rep.","All reps one direction, then switch."],
   avoid:["Torso rotating toward band.","Leaning away.","Rushing — hold at extension matters most."],
   note:"Scoliosis: band from LEFT side is more therapeutic — 1–2 extra reps that direction.",
   bw:ALT.pallofBW,band:ALT.pallofBand},
  {name:"Dumbbell Split Squat",cat:"Legs",sets:"3–4",reps:"8–12/leg",rest:"90 sec/leg",asym:true,
   why:"Loads legs independently, reveals scoliosis-related asymmetry. Staggered stance is tendon-forgiving.",
   cues:["DB in each hand at sides.","Long split stance: front foot forward enough that knee doesn't pass toes.","Back foot on ball, heel up.","Torso upright, lower straight down. Back knee 2–3 inches from floor.","Front shin near vertical at bottom.","Drive up through front midfoot/heel.","All reps one leg, then switch."],
   avoid:["Knee caving in.","Too short a stance.","Forward lean."],
   note:"Start weaker leg first. Right-leg pain → widen stance slightly.",
   bw:ALT.splitBW,band:ALT.splitBand},
  {name:"Single-Arm DB OHP (Half-Kneeling)",cat:"Shoulders",sets:"3–4",reps:"8–12/arm",rest:"90 sec/arm",asym:true,
   why:"Half-kneeling eliminates spinal compression and compensatory shifting. Single-arm challenges lateral core stability.",
   cues:["RIGHT knee down (on pad), LEFT foot forward. Both joints ~90°.","DB in RIGHT hand at shoulder, palm forward.","Brace core, gently squeeze right glute.","Press straight overhead to full extension, bicep near ear.","DB directly over shoulder at top. Ribs stay down.","Lower under control.","Switch sides."],
   avoid:["Leaning away from press.","Rib cage flaring.","Rushing."],
   bw:ALT.ohpBW,band:ALT.ohpBand},
  {name:"Dumbbell Hip Thrust",cat:"Glutes",sets:"3–4",reps:"10–15",rest:"90 sec",asym:false,
   why:"Gold standard for glute max hypertrophy with zero hip adduction compression — tendon-safe. Eliminates spinal compression.",
   cues:["Upper back (shoulder blades) against sturdy bench.","DB across hip crease, padded with towel.","Feet flat hip-width, shins vertical at top.","Drive through heels until thighs and torso form straight line.","Squeeze glutes hard at top, 1–2 sec hold.","Lower just short of floor.","Chin tucked — look at wall, not ceiling."],
   avoid:["Hyperextending lower back at top.","Pushing through toes.","Feet too close/far from bench."],
   note:"Priority tendon exercise. Strong glute loading with NO adduction compression.",
   bw:ALT.thrustBW,band:ALT.thrustBand},
  {name:"Side Plank (Left Side Down)",cat:"Core / Scoliosis",sets:"2–3",reps:"20–40 sec",rest:"60 sec",asym:true,
   why:"Targets convex-side (left) QL and obliques — directly addresses stretch-weakness. One of the most evidence-supported scoliosis correctives.",
   cues:["LEFT side, left elbow under shoulder, forearm flat.","Stack or stagger feet.","Lift hips — straight line head to ankles.","No sag or pike.","Breathe into RIGHT rib cage (Schroth cue).","Hold, lower with control."],
   avoid:["Sagging hips.","Rolling forward/back.","Holding breath."],
   note:"Emphasis on LEFT (convex) side. Short hold on right for balance.",
   bw:ALT.sidePlankBW},
  {name:"Dumbbell Step-Up",cat:"Legs",sets:"2–3",reps:"12–15/leg",rest:"60–90 sec/leg",asym:true,
   why:"Functional single-leg exercise. Pelvic stability demand = glute med activation = tendon rehabilitation.",
   cues:["DB in each hand. Face step/bench (12–18 in).","Entire RIGHT foot on step.","Lean forward ~10–15° from hips. Drive through right foot.","Stand fully upright on step, pause.","Lower with LEFT foot — 2–3 sec controlled descent with RIGHT leg.","Eccentric phase is most important for tendon adaptation.","All reps one leg, then switch."],
   avoid:["Pushing off bottom foot.","Knee caving in.","Step too high initially."],
   note:"Early tendon stages: lower step (6–8 in) + bodyweight only.",
   bw:ALT.stepBW,band:ALT.stepBand},
  {name:"Dumbbell Bent-Over Row",cat:"Back",sets:"3",reps:"10–15",rest:"90 sec",asym:false,
   why:"Bilateral horizontal pull for back hypertrophy with heavier combined loading than single-arm rows.",
   cues:["DB in each hand, neutral grip.","Hinge ~45°, flat back.","DBs hang at arm's length below shoulders.","Pull toward lower ribs, drive elbows back.","Squeeze shoulder blades 1 sec at top.","Lower under control.","Core braced throughout."],
   avoid:["Jerking by standing more upright.","Rounding back.","Shrugging."],
   bw:ALT.rowBilBW,band:ALT.rowBilBand},
  {name:"Banded Lateral Walk",cat:"Glutes / Tendon Rehab",sets:"2–3",reps:"15–20 steps/dir",rest:"60 sec",asym:false,
   why:"Directly strengthens glute med through hip abduction — primary tendinopathy target. Hip stays in safe position.",
   cues:["Band above knees (NOT ankles).","Feet hip-width, knees bent ~20°, hips hinged ~10°.","Step sideways 12–18 in with leader. Follow with trailer — maintain tension.","Consistent mini-squat depth.","Toes forward. Movement from hip.","Reverse after prescribed steps."],
   avoid:["Knees caving.","Standing too tall.","Too heavy a band — form first."],
   note:"Early tendon: non-lifting days. Later: integrate into warm-up.",
   bw:ALT.latWalkBW},
  {name:"Banded Face Pull",cat:"Upper Back / Posture",sets:"2–3",reps:"15–20",rest:"60 sec",asym:false,
   why:"Rear delts, external rotators, mid/lower traps — all chronically undertrained with scoliosis posture.",
   cues:["Band at head height on anchor.","Hold both ends, arms forward.","Pull toward face — elbows out and back. Thumbs to sides of head.","Upper arms parallel floor, 90° elbow bend, squeeze between shoulder blades.","Hold 1–2 sec.","Return with control."],
   avoid:["Pulling to chest.","Momentum.","Shrugging."],
   bw:ALT.faceBW,band:ALT.faceBand},
  {name:"Dumbbell Lateral Raise",cat:"Shoulders",sets:"3",reps:"12–20",rest:"60 sec",asym:false,
   why:"Medial deltoid isolation. Responds well to high-rep training.",
   cues:["Stand with light DB at sides, palms inward.","Slight elbow bend (~15°). Raise to sides to shoulder height.","Top: slight forward dumbbell tip ('pouring water').","Lower 2–3 sec.","Torso still — no swing."],
   avoid:["Momentum/swing — go lighter.","Above shoulder height.","Shrugging."],
   bw:ALT.latRaiseBW,band:ALT.latRaiseBand},
  {name:"Dumbbell Curl",cat:"Arms",sets:"2–3",reps:"12–15",rest:"60 sec",asym:false,
   why:"Bicep isolation. Grip strength for other exercises.",
   cues:["DB in each hand, palms forward.","Upper arms pinned to sides. Curl toward shoulders.","Squeeze at top. Lower 2–3 sec.","Full extension at bottom."],
   avoid:["Swinging.","Moving elbows forward."],
   bw:ALT.curlBW,band:ALT.curlBand},
  {name:"DB Overhead Tricep Extension",cat:"Arms",sets:"2–3",reps:"12–15",rest:"60 sec",asym:false,
   why:"Overhead position stretches tricep long head — optimal for hypertrophy.",
   cues:["Seated for back support. Hold one DB with both hands, press overhead.","Upper arms vertical, elbows forward.","Lower behind head — elbows only.","Descend until tricep stretch. Press to full extension.","Core braced, ribs down."],
   avoid:["Flaring elbows.","Arching back.","Bouncing."],
   bw:ALT.triBW,band:ALT.triBand},
  {name:"Dead Bug (Anti-Rotation)",cat:"Core / Scoliosis",sets:"2",reps:"8–10/side",rest:"60 sec",asym:false,
   why:"Deep core stability, spine-safe. Anti-rotation variant combats scoliosis rotation.",
   cues:["On back, arms up, knees 90°, shins parallel to floor.","Press lower back FLAT into floor.","Optional band variant: anchored to one side, resist lateral pull.","Slowly extend RIGHT arm + LEFT leg (3 sec out, 3 sec back).","If lower back lifts off floor → reduce range.","Alternate sides. Exhale during extension."],
   avoid:["Losing lower back contact.","Moving too fast.","Holding breath."],
   bw:ALT.deadBugBW},
];

function ExerciseLibrarySection(){
  const[filter,setFilter]=useState("All");
  const cats=["All",...new Set(EXERCISES.map(e=>e.cat.split(" /")[0]))];
  const filtered=filter==="All"?EXERCISES:EXERCISES.filter(e=>e.cat.includes(filter));
  return(
    <div>
      <SectionTitle>Exercise Library</SectionTitle>
      <P>Tap any exercise for full form cues. Inside each, look for <Badge color="success">Bodyweight</Badge> and <Badge color="purple">Band (no anchor)</Badge> alternatives with their own cues and progression paths.</P>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
        {cats.map(c=><button key={c} onClick={()=>setFilter(c)} style={{padding:"5px 14px",borderRadius:5,fontSize:12,fontWeight:600,cursor:"pointer",border:`1px solid ${filter===c?C.accent:C.border}`,background:filter===c?C.accentGlow:"transparent",color:filter===c?C.accent:C.textMuted}}>{c}</button>)}
      </div>
      {filtered.map((ex,i)=><ExerciseBlock key={i} name={ex.name} category={ex.cat} sets={ex.sets} reps={ex.reps} rest={ex.rest} cues={ex.cues} why={ex.why} avoid={ex.avoid} note={ex.note} asymmetric={ex.asym} bw={ex.bw} band={ex.band}/>)}
    </div>
  );
}

function DaySection({day,title,focus,rir}){
  const getEx=(n)=>EXERCISES.find(e=>e.name.includes(n))||{};
  return(
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}><Badge color="accent">{focus}</Badge><Badge color="success">Target: {rir} RIR</Badge></div>
      <P>Complete full warm-up (12–15 min). Tap any exercise for alternatives if no dumbbells today.</P>
      {day==="A"&&<>
        <ExerciseBlock name="1. Goblet Squat" category="Compound" sets="4" reps="4–6" rest="2–3 min" cues={["Heavy DB — primary strength movement.","All 4 sets same weight.","Hit 6 reps all sets at 2 RIR → increase weight."]} why="Lower body strength at low reps." bw={ALT.gobletBW} band={ALT.gobletBand}/>
        <ExerciseBlock name="2. Single-Arm Row" category="Compound" sets="4(L) / 3(R)" reps="4–6" rest="2 min" asymmetric cues={["Start LEFT arm. Extra set on left.","1-sec squeeze at top.","Heaviest DB with proper form."]} why="Horizontal pull. Asymmetric for scoliosis." bw={ALT.rowBW} band={ALT.rowBand}/>
        <ExerciseBlock name="3. Floor Press" category="Compound" sets="4" reps="4–6" rest="2–3 min" cues={["Pause when triceps touch floor.","Drive evenly.","Heaviest pressing of the week."]} why="Primary press at strength loads." bw={ALT.pressBW} band={ALT.pressBand}/>
        <ExerciseBlock name="4. Single-Leg RDL" category="Compound" sets="3" reps="6–8/leg" rest="2 min/leg" asymmetric cues={["Start RIGHT leg. DB in LEFT hand.","Focus on balance and hinge.","Touch wall if needed."]} why="Posterior chain + pelvic stability." bw={ALT.rdlBW} band={ALT.rdlBand}/>
        <ExerciseBlock name="5. Pallof Press" category="Core" sets="3" reps="10/side" rest="60 sec" cues={["Band from LEFT first.","Hold press-out 2–3 sec.","Feet hip-width, knees soft."]} why="Anti-rotation for scoliosis." bw={ALT.pallofBW} band={ALT.pallofBand}/>
        <P style={{marginTop:20,color:C.textMuted,fontSize:13}}>~50–60 min including warm-up. Evening: 10–15 min scoliosis correctives.</P>
      </>}
      {day==="B"&&<>
        <ExerciseBlock name="1. Split Squat" category="Compound" sets="3" reps="8–12/leg" rest="90 sec/leg" asymmetric cues={["Start weaker leg.","3-sec controlled descent.","Widen stance if right hip hurts."]} why="Unilateral leg hypertrophy." bw={ALT.splitBW} band={ALT.splitBand}/>
        <ExerciseBlock name="2. Half-Kneel OHP" category="Compound" sets="3" reps="8–12/arm" rest="90 sec/arm" asymmetric cues={["Right knee down, press right arm. Switch.","Squeeze down-side glute.","Ribs down, full lockout."]} why="Vertical press, minimal spinal compression." bw={ALT.ohpBW} band={ALT.ohpBand}/>
        <ExerciseBlock name="3. Bent-Over Row" category="Compound" sets="3" reps="10–12" rest="90 sec" cues={["Hinge 45°, flat back, neutral grip.","Elbows back, 1-sec squeeze at top."]} why="Bilateral back hypertrophy." bw={ALT.rowBilBW} band={ALT.rowBilBand}/>
        <ExerciseBlock name="4. Hip Thrust" category="Compound" sets="3" reps="10–15" rest="90 sec" cues={["Back against bench, feet hip-width.","Full extension, 2-sec squeeze.","Chin tucked."]} why="Max glute activation, zero tendon compression." bw={ALT.thrustBW} band={ALT.thrustBand}/>
        <ExerciseBlock name="5. Side Plank (L down)" category="Core" sets="3" reps="30–45 sec" rest="60 sec" cues={["Left elbow under shoulder, body in plane.","Breathe into right rib cage.","Start from knees if needed."]} why="Convex-side stabilizer strengthening." bw={ALT.sidePlankBW}/>
        <P style={{marginTop:20,color:C.textMuted,fontSize:13}}>~50–60 min including warm-up. Evening: scoliosis correctives.</P>
      </>}
      {day==="C"&&<>
        <ExerciseBlock name="1. Step-Up" category="Compound" sets="3" reps="12–15/leg" rest="60–90 sec/leg" asymmetric cues={["Moderate step, light-mod DBs.","3-sec lowering every rep.","Working leg does all work."]} why="Functional + eccentric tendon loading." bw={ALT.stepBW} band={ALT.stepBand}/>
        <ExerciseBlock name="2. Lateral Raise" category="Isolation" sets="3" reps="15–20" rest="60 sec" cues={["Light, strict.","Shoulder height, forward tip.","2–3 sec lower."]} why="Medial deltoid, high-rep metabolic." bw={ALT.latRaiseBW} band={ALT.latRaiseBand}/>
        <ExerciseBlock name="3. Face Pull" category="Isolation" sets="3" reps="15–20" rest="60 sec" cues={["Pull to face, elbows high.","Squeeze between shoulder blades.","1–2 sec hold."]} why="Posterior shoulder + scapular health." bw={ALT.faceBW} band={ALT.faceBand}/>
        <ExerciseBlock name="4. Curl" category="Isolation" sets="2" reps="12–15" rest="60 sec" cues={["Upper arms pinned. Full range.","Controlled descent."]} why="Bicep development." bw={ALT.curlBW} band={ALT.curlBand}/>
        <ExerciseBlock name="5. Overhead Tricep Ext" category="Isolation" sets="2" reps="12–15" rest="60 sec" cues={["Seated, elbows forward.","Full stretch to full lockout."]} why="Tricep long head emphasis." bw={ALT.triBW} band={ALT.triBand}/>
        <ExerciseBlock name="6. Dead Bug" category="Core" sets="2" reps="8–10/side" rest="60 sec" cues={["Lower back flat. 3-sec extensions.","Exhale on extension."]} why="Deep core + anti-rotation." bw={ALT.deadBugBW}/>
        <P style={{marginTop:20,color:C.textMuted,fontSize:13}}>~45–55 min including warm-up. Evening: scoliosis correctives.</P>
      </>}
    </div>
  );
}

function OverviewSection(){return(
  <div>
    <SectionTitle>Program Overview</SectionTitle>
    <P>A 3-day full body resistance training program for an adult male managing <strong>levoscoliosis</strong> and <strong>right-sided gluteal tendinopathy</strong> while building muscle and strength. Evidence-based: ACSM position stands, LEAP trial, Schroth/SEAS.</P>
    <SubTitle>Equipment flexibility</SubTitle>
    <P>The primary program uses dumbbells and bands. Every exercise includes two alternatives:</P>
    <Card>
      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}><Badge color="success">Bodyweight</Badge><span style={{fontSize:13.5,color:C.text}}>No equipment — body, furniture, gravity</span></div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><Badge color="purple">Band (no anchor)</Badge><span style={{fontSize:13.5,color:C.text}}>Resistance band only — step on it or wrap around your body. No wall/door anchor assumed</span></div>
    </Card>
    <P>Mix freely. Dumbbells at gym, bands while traveling, bodyweight with nothing. Movement patterns and targets are preserved across all three.</P>
    <SubTitle>Weekly structure</SubTitle>
    <Card>
      <div style={{fontSize:13.5,lineHeight:2.1,color:C.text}}>
        <div><strong style={{color:C.accent}}>Mon</strong> Full Body A — Strength · Evening: scoliosis correctives</div>
        <div><strong style={{color:C.textMuted}}>Tue</strong> Zone 2 run (30–40 min) · Correctives + isometric hip abduction</div>
        <div><strong style={{color:C.accent}}>Wed</strong> Full Body B — Hypertrophy · Evening: correctives</div>
        <div><strong style={{color:C.textMuted}}>Thu</strong> Zone 2 run · Correctives + banded lateral walks</div>
        <div><strong style={{color:C.accent}}>Fri</strong> Full Body C — Volume · Evening: correctives</div>
        <div><strong style={{color:C.textMuted}}>Sat</strong> Optional Zone 2 run or walk · Correctives</div>
        <div><strong style={{color:C.textMuted}}>Sun</strong> Rest · Light correctives only</div>
      </div>
    </Card>
    <Warn>This handbook is educational, not a substitute for professional assessment. Stop and consult a healthcare professional if you experience new neurological symptoms, sharp pain, or sudden changes in your condition.</Warn>
  </div>
)}

function PrinciplesSection(){return(
  <div>
    <SectionTitle>Core Training Principles</SectionTitle>
    <SubTitle>1. Reps in Reserve (RIR)</SubTitle>
    <Card>
      <div style={{fontSize:13,lineHeight:2,color:C.text}}>
        <div><strong style={{color:C.danger}}>0 RIR</strong> — Absolute failure. Rarely used.</div>
        <div><strong style={{color:C.accent}}>1–2 RIR</strong> — Hard. Could squeeze 1–2 grindy reps. <span style={{color:C.textMuted}}>Hypertrophy days.</span></div>
        <div><strong style={{color:C.success}}>2–3 RIR</strong> — Moderate-hard. Quality reps left. <span style={{color:C.textMuted}}>Strength days.</span></div>
        <div><strong style={{color:C.blue}}>3–4 RIR</strong> — Moderate. <span style={{color:C.textMuted}}>Warm-ups and deloads.</span></div>
      </div>
    </Card>
    <Tip>RIR applies to ALL modalities. A set of 25 pushups at 2 RIR is as valid as 8 heavy floor presses at 2 RIR.</Tip>
    <SubTitle>2. Progressive overload</SubTitle>
    <P><strong>Double progression:</strong> work within rep range → add reps → hit top of range for all sets → increase resistance → reset. With DBs: +2–5 lbs. With bands: next thickness or choke up. With bodyweight: harder variation or slower tempo.</P>
    <SubTitle>3. The 24-hour pain rule</SubTitle>
    <Warn>If right lateral hip pain worsens overnight or next morning → reduce tendon-relevant exercises by 20–30% next session. This overrides all other progression rules.</Warn>
    <SubTitle>4. Scoliosis awareness</SubTitle>
    <P>Every exercise: <strong>"long spine, level ribs, breathe into the right side."</strong> Unilateral exercises: start with weaker side first.</P>
    <SubTitle>5. Deload every 4th week</SubTitle>
    <P>Same exercises, same intensity. Cut volume in half. This lets tendons and connective tissue catch up.</P>
  </div>
)}

function WarmupSection(){return(
  <div>
    <SectionTitle>Warm-Up Protocol</SectionTitle>
    <P>12–15 minutes before every session. RAMP framework with tendon rehab and scoliosis activation embedded. Do not skip.</P>
    <SubTitle>Phase 1: Raise (3–5 min)</SubTitle>
    <Card><P style={{fontSize:13.5,marginBottom:0}}>Brisk walk, march in place, or light jog. Break a light sweat.</P></Card>
    <SubTitle>Phase 2: Activate (5–8 min)</SubTitle>
    <Card highlight>
      <div style={{fontSize:11,fontWeight:700,color:C.accent,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em"}}>A1: Isometric hip abduction — tendon loading</div>
      <P style={{fontSize:13.5}}>LEFT side down, right hip up. Stack hips. Knees bent ~45°. Press right knee upward against wall/pillow/hand — hold isometrically. 30–50% effort. 5 × 30–45 sec, 15–20 sec rest.</P>
      <Warn>Hip neutral or slightly abducted. Do NOT let top leg cross midline — compresses tendon.</Warn>
    </Card>
    <Card highlight>
      <div style={{fontSize:11,fontWeight:700,color:C.accent,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em"}}>A2: Schroth breathing</div>
      <P style={{fontSize:13.5}}>Sit tall. Hands on ribs. Inhale 4 sec into RIGHT rib cage. Exhale 6 sec, left ribs inward. 8–10 cycles.</P>
    </Card>
    <Card highlight>
      <div style={{fontSize:11,fontWeight:700,color:C.accent,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em"}}>A3: Dead bug</div>
      <P style={{fontSize:13.5}}>On back, arms up, knees 90°. Lower back pressed flat. Extend opposite arm+leg slowly (3 sec). 2 × 8/side.</P>
    </Card>
    <SubTitle>Phase 3: Mobilize (3–5 min)</SubTitle>
    <Card><P style={{fontSize:13.5,marginBottom:0}}>Hip CARs (5 circles/dir/leg) → Thoracic rotation (8/side) → Cat-cow (8 cycles) → Lateral lunge (5/side).</P></Card>
    <SubTitle>Phase 4: Potentiate (2–3 min)</SubTitle>
    <Card><P style={{fontSize:13.5,marginBottom:0}}>2–3 progressively heavier warm-up sets of first exercise. BW version: partial range → slow tempo → full movement.</P></Card>
  </div>
)}

function CorrectivesSection(){return(
  <div>
    <SectionTitle>Daily Scoliosis Correctives</SectionTitle>
    <P>10–15 min, <strong>every day</strong>. Lifting days: evening. Consistency &gt; intensity.</P>
    <SubTitle>1. Schroth Breathing (3 min)</SubTitle>
    <Card><P style={{fontSize:13.5,marginBottom:0}}>Sit tall. Hands on ribs. Inhale 4 sec into RIGHT rib cage. Exhale 6 sec, left ribs inward. 8–12 cycles.</P></Card>
    <SubTitle>2. Side-Lying Reach, L Down (2 min)</SubTitle>
    <Card><P style={{fontSize:13.5,marginBottom:0}}>LEFT side. Reach RIGHT arm overhead. 5–6 breaths into RIGHT ribs per hold. 2–3 × 30 sec.</P></Card>
    <SubTitle>3. Quadruped Arm-Leg Reach (3 min)</SubTitle>
    <Card><P style={{fontSize:13.5,marginBottom:0}}>All fours. Shift trunk RIGHT, extend LEFT arm + RIGHT leg. Hold 5 sec. 8–10 reps. Then opposite side 6–8 reps.</P></Card>
    <SubTitle>4. Side Plank L Down (2 min)</SubTitle>
    <Card><P style={{fontSize:13.5,marginBottom:0}}>Lifting day: 15–20 sec × 2. Non-lifting: 3 × 30–40 sec.</P></Card>
    <SubTitle>5. Supine Pelvic Corrections (2 min)</SubTitle>
    <Card><P style={{fontSize:13.5,marginBottom:0}}>On back, knees bent. Band above knees (or press outward without band). Posterior pelvic tilts while maintaining outward pressure. 10–12 × 3-sec holds.</P></Card>
  </div>
)}

function TendonSection(){return(
  <div>
    <SectionTitle>Gluteal Tendon Rehabilitation</SectionTitle>
    <P>Rehab is built in — warm-up isometrics, exercise selection, position avoidances. This section explains staging.</P>
    <Card><div style={{fontSize:11,fontWeight:700,color:C.blue,marginBottom:6,textTransform:"uppercase"}}>Stage 1: Isometric</div><P style={{fontSize:13.5}}>5 × 30–45 sec at 30–50%. Daily. Advance: 45s × 5 at 50–70%, pain ≤ 2/10, no flare, 1 week.</P></Card>
    <Card><div style={{fontSize:11,fontWeight:700,color:C.blue,marginBottom:6,textTransform:"uppercase"}}>Stage 2: Slow isotonic</div><P style={{fontSize:13.5}}>Lateral walks, BW hip thrusts, step-ups. 3–4 × 8–15. Every other day. Advance: pain ≤ 3/10, no flare, 2 weeks.</P></Card>
    <Card><div style={{fontSize:11,fontWeight:700,color:C.blue,marginBottom:6,textTransform:"uppercase"}}>Stage 3: Heavy slow resistance</div><P style={{fontSize:13.5}}>Loaded thrusts, weighted step-ups, SL RDLs. 3–4 × 6–12. 3×/week, 48–72 hr recovery. Advance: progressive loads, pain ≤ 2/10, 3+ weeks.</P></Card>
    <Card><div style={{fontSize:11,fontWeight:700,color:C.blue,marginBottom:6,textTransform:"uppercase"}}>Stage 4: Energy storage / sport</div><P style={{fontSize:13.5}}>Faster movements, plyometrics, running progression.</P></Card>
    <SubTitle>Always avoid</SubTitle>
    <Warn>These compress the tendon:</Warn>
    <Card><ul style={{margin:0,paddingLeft:20,fontSize:13.5,lineHeight:1.9,color:C.text}}>
      <li><strong>Crossed legs</strong></li><li><strong>Sleeping on RIGHT side</strong></li><li><strong>Weight shifted onto right hip</strong></li>
      <li><strong>Stretching right glute/ITB</strong> — tightness is guarding, not shortness</li><li><strong>Foam rolling over trochanter</strong></li>
      <li><strong>Deep chairs</strong> (hip &gt; 90°)</li><li><strong>Crossover lunges</strong></li>
    </ul></Card>
  </div>
)}

function RunningSection(){return(
  <div>
    <SectionTitle>Zone 2 Running</SectionTitle>
    <P>142–155 bpm. 2–3×/week on non-lifting days. 30–40 min.</P>
    <Card><P style={{fontSize:13.5,marginBottom:0}}><strong>Conversation test:</strong> Full sentences with effort. Can sing = too easy. Gasping = too hard. Walk-jog is fine early on.</P></Card>
    <SubTitle>Tendinopathy modifications</SubTitle>
    <Card><ul style={{margin:0,paddingLeft:20,fontSize:13.5,lineHeight:1.9,color:C.text}}>
      <li><strong>Cadence +5–10%</strong> (170–180 spm) reduces tendon loading</li>
      <li><strong>Flat, even surfaces</strong></li><li><strong>Change track direction</strong> every few laps</li>
      <li><strong>"Train tracks" gait</strong> — each foot its own rail</li><li><strong>24-hour rule after every run</strong></li>
    </ul></Card>
    <P><strong>Before:</strong> 5 min walk + 3 × 30 sec isometric hip abduction. <strong>After:</strong> 5 min walk + hip CARs. No right glute/ITB stretch.</P>
  </div>
)}

function ProgressionSection(){return(
  <div>
    <SectionTitle>Progression Rules</SectionTitle>
    <Card><P style={{fontWeight:700,color:C.accent,marginBottom:4}}>Rule 1: 24-hour rule overrides everything</P><P style={{fontSize:13.5,marginBottom:0}}>Worse night/morning pain → reduce tendon exercises 20–30%.</P></Card>
    <Card><P style={{fontWeight:700,color:C.accent,marginBottom:4}}>Rule 2: Double progression</P><P style={{fontSize:13.5}}>Bottom of range → add reps → top of range → increase resistance → reset.</P><P style={{fontSize:13,color:C.textMuted,marginBottom:0}}>DB: +2–5 lbs. Band: next thickness. BW: harder variation or slower tempo.</P></Card>
    <Card><P style={{fontWeight:700,color:C.accent,marginBottom:4}}>Rule 3: Deload every 4th week</P><P style={{fontSize:13.5,marginBottom:0}}>Same exercises, same intensity, half volume.</P></Card>
    <Card><P style={{fontWeight:700,color:C.accent,marginBottom:4}}>Rule 4: Mesocycle blocks</P>
      <div style={{fontSize:13.5,lineHeight:2,color:C.text}}>
        <div><strong>Wk 1–4:</strong> Foundation. 8–12 sets/muscle. Tendon Stage 1–2.</div>
        <div><strong>Wk 5–8:</strong> Development. 12–16 sets. Asymmetric emphasis. Tendon Stage 2–3.</div>
        <div><strong>Wk 9–12:</strong> Intensification. 14–18 sets. Tendon Stage 3. Consider 4-day split.</div>
      </div>
    </Card>
  </div>
)}

function WeekSection(){return(
  <div>
    <SectionTitle>Full Week Map</SectionTitle>
    {[{d:"Monday",m:"Full Body A",t:"Warm-up → Squat 4×4–6 → Row 4/3×4–6 → Press 4×4–6 → SL RDL 3×6–8 → Pallof 3×10/side",e:"Correctives (15 min)"},
      {d:"Tuesday",m:"Zone 2 Run",t:"Walk + isometrics → 30–40 min @ 142–155 bpm → Walk + CARs",e:"Correctives (15 min)"},
      {d:"Wednesday",m:"Full Body B",t:"Warm-up → Split Squat 3×8–12 → OHP 3×8–12 → Row 3×10–12 → Thrust 3×10–15 → Side Plank 3×30–45s",e:"Correctives (15 min)"},
      {d:"Thursday",m:"Zone 2 Run",t:"Walk + isometrics → 30–40 min → Lateral walks + hip hikes",e:"Correctives (15 min)"},
      {d:"Friday",m:"Full Body C",t:"Warm-up → Step-Up 3×12–15 → Lat Raise 3×15–20 → Face Pull 3×15–20 → Curl 2×12–15 → Tricep 2×12–15 → Dead Bug 2×8–10",e:"Correctives (15 min)"},
      {d:"Saturday",m:"Active Recovery",t:"Optional 20–30 min run or 30–45 min walk",e:"Correctives (10 min)"},
      {d:"Sunday",m:"Rest",t:"No structured exercise",e:"Light correctives (10 min)"},
    ].map((r,i)=><Card key={i} style={{padding:"14px 18px"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontWeight:800,fontSize:14,color:C.accent}}>{r.d}</span><span style={{fontSize:12,color:C.textMuted}}>{r.m}</span></div>
      <P style={{fontSize:13,marginBottom:6}}>{r.t}</P>
      <P style={{fontSize:12,color:C.textDim,marginBottom:0}}>{r.e}</P>
    </Card>)}
  </div>
)}

function FAQSection(){return(
  <div>
    <SectionTitle>Key Warnings and FAQs</SectionTitle>
    <Warn>Do NOT stretch the right glute, piriformis, or ITB. Stretching worsens tendon compression.</Warn>
    <Warn>Do NOT foam roll over the right greater trochanter.</Warn>
    <Warn>Do NOT sleep on the right side. Left side with pillow between knees, or on back.</Warn>
    <Warn>Do NOT ignore worsening night pain — earliest indicator of tendon overload.</Warn>
    <SubTitle>FAQs</SubTitle>
    <Card><P style={{fontWeight:700,color:C.accent,marginBottom:4,fontSize:14}}>Can I mix equipment in one session?</P><P style={{fontSize:13.5}}>Yes. DB goblet squats, banded rows, pushups — all in one session. Movement patterns matter, not the tool.</P></Card>
    <Card><P style={{fontWeight:700,color:C.accent,marginBottom:4,fontSize:14}}>Are bodyweight exercises effective for hypertrophy?</P><P style={{fontSize:13.5}}>Yes, when taken close to failure. Evidence shows no meaningful hypertrophy difference between modalities at equivalent effort. Main trade-off: progression is less granular — you use variation progressions and tempo manipulation instead of adding 2 lbs.</P></Card>
    <Card><P style={{fontWeight:700,color:C.accent,marginBottom:4,fontSize:14}}>My band isn't heavy enough.</P><P style={{fontSize:13.5}}>Options: (1) thicker band, (2) choke up — grip closer to foot, (3) double up two bands, (4) add 2–3 sec pause at peak contraction. Option 4 dramatically increases difficulty.</P></Card>
    <Card><P style={{fontWeight:700,color:C.accent,marginBottom:4,fontSize:14}}>More than 3 lifting days?</P><P style={{fontSize:13.5}}>Not initially. After 8–12 weeks with stable tendon at Stage 3, transition to 4-day upper/lower split.</P></Card>
    <Card><P style={{fontWeight:700,color:C.accent,marginBottom:4,fontSize:14}}>How long until results?</P><P style={{fontSize:13.5}}>Strength: 2–4 weeks. Visible muscle: 6–12 weeks. Tendinopathy: 4–12 weeks. Scoliosis posture: 6–12 weeks daily correctives.</P></Card>
  </div>
)}

export default function Handbook(){
  const[sec,setSec]=useState("overview");
  const[menuOpen,setMenuOpen]=useState(false);
  const idx=SECTIONS.findIndex(s=>s.id===sec);
  const render=()=>{switch(sec){
    case "overview":return <OverviewSection/>;case "principles":return <PrinciplesSection/>;
    case "warmup":return <WarmupSection/>;case "exercises":return <ExerciseLibrarySection/>;
    case "dayA":return <DaySection day="A" title="Day A — Strength Focus" focus="Heavy compounds" rir="2–3"/>;
    case "dayB":return <DaySection day="B" title="Day B — Hypertrophy Focus" focus="Moderate load, higher reps" rir="1–2"/>;
    case "dayC":return <DaySection day="C" title="Day C — Volume Focus" focus="Light load, high reps + accessories" rir="1"/>;
    case "correctives":return <CorrectivesSection/>;case "tendon":return <TendonSection/>;
    case "running":return <RunningSection/>;case "progression":return <ProgressionSection/>;
    case "week":return <WeekSection/>;case "faq":return <FAQSection/>;default:return <OverviewSection/>;
  }};
  return(
    <div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{borderBottom:`1px solid ${C.border}`,padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:C.bg,zIndex:100}}>
        <div>
          <div style={{fontSize:13,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:C.accent}}>Training Handbook</div>
          <div style={{fontSize:11,color:C.textDim,marginTop:2}}>Full Body · Scoliosis · Tendon Rehab</div>
        </div>
        <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:6,padding:"6px 14px",color:C.textMuted,fontSize:12,fontWeight:600,cursor:"pointer"}}>{menuOpen?"Close":"Navigate ▾"}</button>
      </div>
      {menuOpen&&<div style={{position:"sticky",top:52,zIndex:99,background:C.bgCard,borderBottom:`1px solid ${C.border}`,padding:"8px 12px",display:"flex",flexWrap:"wrap",gap:4}}>
        {SECTIONS.map(s=><button key={s.id} onClick={()=>{setSec(s.id);setMenuOpen(false)}} style={{padding:"6px 12px",borderRadius:5,fontSize:12,fontWeight:600,cursor:"pointer",border:`1px solid ${sec===s.id?C.accent:C.border}`,background:sec===s.id?C.accentGlow:"transparent",color:sec===s.id?C.accent:C.textMuted}}><span style={{marginRight:4,fontSize:10}}>{s.icon}</span>{s.label}</button>)}
      </div>}
      <div style={{maxWidth:720,margin:"0 auto",padding:"28px 20px 80px"}}>
        {render()}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:40,paddingTop:20,borderTop:`1px solid ${C.border}`}}>
          {idx>0?<button onClick={()=>setSec(SECTIONS[idx-1].id)} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:6,padding:"8px 16px",color:C.textMuted,fontSize:13,cursor:"pointer"}}>← {SECTIONS[idx-1].label}</button>:<div/>}
          {idx<SECTIONS.length-1?<button onClick={()=>setSec(SECTIONS[idx+1].id)} style={{background:"none",border:`1px solid ${C.accentDim}`,borderRadius:6,padding:"8px 16px",color:C.accent,fontSize:13,fontWeight:600,cursor:"pointer"}}>{SECTIONS[idx+1].label} →</button>:<div/>}
        </div>
      </div>
    </div>
  );
}
