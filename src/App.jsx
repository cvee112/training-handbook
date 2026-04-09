import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0c",
  bgCard: "#111114",
  bgCardHover: "#18181c",
  border: "#222228",
  borderAccent: "#333340",
  text: "#e8e8ec",
  textMuted: "#8888a0",
  textDim: "#55556a",
  accent: "#c8a864",
  accentDim: "#8a7444",
  accentGlow: "rgba(200,168,100,0.08)",
  danger: "#c45c5c",
  dangerDim: "rgba(196,92,92,0.12)",
  success: "#5c9a6e",
  successDim: "rgba(92,154,110,0.12)",
  blue: "#5c8cc4",
  blueDim: "rgba(92,140,196,0.12)",
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
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background: color === "accent" ? COLORS.accentGlow : color === "danger" ? COLORS.dangerDim : color === "success" ? COLORS.successDim : COLORS.blueDim,
        color: color === "accent" ? COLORS.accent : color === "danger" ? COLORS.danger : color === "success" ? COLORS.success : COLORS.blue,
        border: `1px solid ${color === "accent" ? COLORS.accentDim : color === "danger" ? COLORS.danger + "33" : color === "success" ? COLORS.success + "33" : COLORS.blue + "33"}`,
      }}
    >
      {children}
    </span>
  );
}

function Card({ children, style, highlight }) {
  return (
    <div
      style={{
        background: COLORS.bgCard,
        border: `1px solid ${highlight ? COLORS.accentDim : COLORS.border}`,
        borderRadius: 8,
        padding: "20px 24px",
        marginBottom: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontSize: 26,
        fontWeight: 800,
        color: COLORS.text,
        marginBottom: 8,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        fontFamily: "'Playfair Display', Georgia, serif",
      }}
    >
      {children}
    </h2>
  );
}

function SubTitle({ children }) {
  return (
    <h3
      style={{
        fontSize: 17,
        fontWeight: 700,
        color: COLORS.accent,
        marginTop: 24,
        marginBottom: 10,
        letterSpacing: "0.01em",
      }}
    >
      {children}
    </h3>
  );
}

function P({ children, style }) {
  return (
    <p
      style={{
        fontSize: 14.5,
        lineHeight: 1.72,
        color: COLORS.text,
        marginBottom: 12,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Muted({ children }) {
  return <span style={{ color: COLORS.textMuted }}>{children}</span>;
}

function Warn({ children }) {
  return (
    <div
      style={{
        background: COLORS.dangerDim,
        border: `1px solid ${COLORS.danger}44`,
        borderRadius: 6,
        padding: "12px 16px",
        marginBottom: 14,
        fontSize: 13.5,
        lineHeight: 1.65,
        color: COLORS.text,
      }}
    >
      <span style={{ color: COLORS.danger, fontWeight: 700, marginRight: 6 }}>⚠</span>
      {children}
    </div>
  );
}

function Tip({ children }) {
  return (
    <div
      style={{
        background: COLORS.successDim,
        border: `1px solid ${COLORS.success}44`,
        borderRadius: 6,
        padding: "12px 16px",
        marginBottom: 14,
        fontSize: 13.5,
        lineHeight: 1.65,
        color: COLORS.text,
      }}
    >
      <span style={{ color: COLORS.success, fontWeight: 700, marginRight: 6 }}>✓</span>
      {children}
    </div>
  );
}

function ExerciseBlock({ name, category, sets, reps, rest, cues, why, avoid, note, asymmetric }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 8,
        marginBottom: 10,
        overflow: "hidden",
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "14px 18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>{name}</span>
            {category && <Badge color="accent">{category}</Badge>}
            {asymmetric && <Badge color="blue">Asymmetric</Badge>}
          </div>
          <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginTop: 4 }}>
            {sets} × {reps} · Rest {rest}
          </div>
        </div>
        <span style={{ color: COLORS.textDim, fontSize: 18, transition: "transform 0.2s", transform: open ? "rotate(90deg)" : "none" }}>▸</span>
      </div>
      {open && (
        <div style={{ padding: "0 18px 16px", borderTop: `1px solid ${COLORS.border}` }}>
          {why && (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, marginTop: 14, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Why this exercise</div>
              <P style={{ fontSize: 13.5 }}>{why}</P>
            </>
          )}
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, marginTop: 10, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Form cues — step by step</div>
          <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, lineHeight: 1.72, color: COLORS.text }}>
            {cues.map((c, i) => (
              <li key={i} style={{ marginBottom: 6 }}>{c}</li>
            ))}
          </ol>
          {avoid && (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.danger, marginTop: 14, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>Common mistakes</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, lineHeight: 1.72, color: COLORS.text }}>
                {avoid.map((a, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>{a}</li>
                ))}
              </ul>
            </>
          )}
          {note && <Tip>{note}</Tip>}
        </div>
      )}
    </div>
  );
}

// --- SECTIONS ---

function OverviewSection() {
  return (
    <div>
      <SectionTitle>Program Overview</SectionTitle>
      <P>This is a 3-day full body resistance training program designed for an adult male managing two concurrent conditions — <strong>levoscoliosis</strong> (a left convex thoracolumbar spinal curve) and <strong>right-sided gluteal tendinopathy</strong> — while building general muscle and strength. It is evidence-based, drawing on ACSM position stands, the LEAP trial for tendinopathy, and Schroth/SEAS principles for scoliosis.</P>

      <SubTitle>What you need</SubTitle>
      <P>A set of dumbbells (adjustable or multiple pairs ranging from light to heavy), four resistance bands of graded strength (light through extra-heavy), a flat surface for floor work, and access to a step or bench. Running shoes for Zone 2 cardio days.</P>

      <SubTitle>Weekly structure at a glance</SubTitle>
      <Card>
        <div style={{ fontSize: 13.5, lineHeight: 2.1, color: COLORS.text }}>
          <div><strong style={{ color: COLORS.accent, width: 90, display: "inline-block" }}>Monday</strong> Full Body A — Strength focus · Evening: scoliosis correctives</div>
          <div><strong style={{ color: COLORS.textMuted, width: 90, display: "inline-block" }}>Tuesday</strong> Zone 2 run (30–40 min) · Scoliosis correctives + isometric hip abduction</div>
          <div><strong style={{ color: COLORS.accent, width: 90, display: "inline-block" }}>Wednesday</strong> Full Body B — Hypertrophy focus · Evening: scoliosis correctives</div>
          <div><strong style={{ color: COLORS.textMuted, width: 90, display: "inline-block" }}>Thursday</strong> Zone 2 run (30–40 min) · Scoliosis correctives + banded lateral walks</div>
          <div><strong style={{ color: COLORS.accent, width: 90, display: "inline-block" }}>Friday</strong> Full Body C — Volume focus · Evening: scoliosis correctives</div>
          <div><strong style={{ color: COLORS.textMuted, width: 90, display: "inline-block" }}>Saturday</strong> Optional Zone 2 run or walk · Scoliosis correctives</div>
          <div><strong style={{ color: COLORS.textMuted, width: 90, display: "inline-block" }}>Sunday</strong> Full rest · Light scoliosis correctives only</div>
        </div>
      </Card>

      <SubTitle>How to use this handbook</SubTitle>
      <P>Read the <strong>Core Principles</strong> and <strong>Warm-Up Protocol</strong> sections before your first session. On training days, navigate to the relevant day (A, B, or C), tap each exercise to expand full form instructions, and follow the prescribed sets, reps, and rest times. Perform the <strong>Scoliosis Correctives</strong> routine daily — it takes 10–15 minutes. The <strong>Tendon Rehab</strong> section explains loading stages and the critical 24-hour monitoring rule. Read <strong>Key Warnings</strong> before you begin.</P>

      <Warn>This handbook is for educational purposes and is not a substitute for individualized assessment by a physiotherapist or sports medicine physician. If you experience new neurological symptoms (numbness, tingling, weakness in the legs), sharp or worsening pain, or any sudden change in your condition, stop and consult a healthcare professional.</Warn>
    </div>
  );
}

function PrinciplesSection() {
  return (
    <div>
      <SectionTitle>Core Training Principles</SectionTitle>
      <P>Before diving into the exercises, you need to understand five governing principles. These aren't abstract theory — they directly determine what you do in every session, how hard you push, and when you back off.</P>

      <SubTitle>1. Reps in Reserve (RIR) — how hard to push</SubTitle>
      <P><strong>RIR</strong> is the number of additional reps you could have performed before your muscles fail completely. If you do 10 reps of a goblet squat and feel you could have done 2 more, that's <strong>2 RIR</strong>. This program prescribes effort targets in RIR rather than fixed weights, because your capacity varies day to day — especially with a tendinopathy that fluctuates.</P>
      <Card>
        <div style={{ fontSize: 13, lineHeight: 2, color: COLORS.text }}>
          <div><strong style={{ color: COLORS.danger }}>0 RIR</strong> — Absolute failure. You cannot complete another rep. <Muted>Rarely used in this program.</Muted></div>
          <div><strong style={{ color: COLORS.accent }}>1–2 RIR</strong> — Hard effort. You could squeeze out 1–2 more, but they'd be grindy. <Muted>Main target for hypertrophy days.</Muted></div>
          <div><strong style={{ color: COLORS.success }}>2–3 RIR</strong> — Moderate-hard. You stop with quality reps still available. <Muted>Target for strength days (heavier loads).</Muted></div>
          <div><strong style={{ color: COLORS.blue }}>3–4 RIR</strong> — Moderate. You could clearly do more. <Muted>Warm-up sets and deload weeks.</Muted></div>
        </div>
      </Card>
      <Tip>If you're new to RIR estimation, err on the side of leaving more in the tank during weeks 1–2. It takes practice to calibrate. A good test: if your bar speed or dumbbell speed slowed noticeably on the last 2 reps, you were probably at 1–2 RIR.</Tip>

      <SubTitle>2. Progressive overload — how you get stronger</SubTitle>
      <P>This program uses <strong>double progression</strong>. Each exercise has a rep range (e.g., 8–12). Start at the bottom of the range with a weight that brings you to the target RIR. Across sessions, add reps. When you can complete all prescribed sets at the <em>top</em> of the range at the target RIR, increase the dumbbell weight by the smallest available increment (usually 2–5 lbs / 1–2.5 kg) and reset to the bottom of the rep range.</P>
      <P><strong>Example:</strong> Week 1 you do goblet squats 3 × 8 with a 20 kg dumbbell at 2 RIR. Week 2 you manage 3 × 9. Week 3 you hit 3 × 10. Week 4 you get 3 × 12. Now move to 22.5 kg and start back at 3 × 8.</P>

      <SubTitle>3. The 24-hour pain rule — your tendon's veto</SubTitle>
      <P>After every training session and every run, monitor your right lateral hip for 24 hours. The tendon "talks back" on a delay. Acceptable during exercise: mild discomfort up to 5/10 that settles quickly after stopping. <strong>Red flags requiring load reduction</strong>: increased night pain, increased pain on waking the next morning, or pain that takes longer to settle than previous sessions.</P>
      <Warn>The 24-hour rule overrides all other progression rules. If your tendon flares, reduce load or volume for the affected exercises by 20–30% and rebuild. Do not push through worsening tendon symptoms — tendons have very slow healing biology (weeks to months) and pushing through a flare can set you back significantly.</Warn>

      <SubTitle>4. Scoliosis awareness during every lift</SubTitle>
      <P>Your left convex thoracolumbar curve means your spine naturally shifts leftward in the lower back. During every exercise, apply a gentle mental cue: <strong>"long spine, ribs level, breathe into the right side."</strong> You are not trying to forcefully correct the curve under load — you are training your brain to find a more neutral alignment through repetition. On unilateral exercises, you may notice strength differences between sides — this is expected. Train both sides through the same range, and start every set with the weaker side first.</P>

      <SubTitle>5. Recovery and deload</SubTitle>
      <P>Every 4th week is a <strong>deload</strong>: perform the same exercises but reduce volume by 40–50% (e.g., 3 sets becomes 2) while keeping weights the same. This isn't laziness — it's strategic recovery that allows tendons, joints, and connective tissue to adapt. You will often feel stronger in the week following a deload.</P>
    </div>
  );
}

function WarmupSection() {
  return (
    <div>
      <SectionTitle>Warm-Up Protocol</SectionTitle>
      <P>Every lifting session begins with this 12–15 minute warm-up. It follows the <strong>RAMP</strong> framework (Raise, Activate, Mobilize, Potentiate) and embeds both your tendon rehab isometrics and scoliosis activation work. Do not skip this — it is treatment time, not filler.</P>

      <SubTitle>Phase 1: Raise — 3 to 5 minutes</SubTitle>
      <P><strong>Goal:</strong> Increase heart rate and core temperature. Warm muscles are more pliable and perform better.</P>
      <Card>
        <P style={{ marginBottom: 0 }}>Choose one:</P>
        <ul style={{ margin: "8px 0 0 0", paddingLeft: 20, fontSize: 13.5, lineHeight: 1.9, color: COLORS.text }}>
          <li><strong>Brisk walking</strong> — 3–5 minutes at a pace where conversation becomes slightly effortful.</li>
          <li><strong>Marching in place</strong> — lift knees to hip height, pump arms naturally, 3 minutes.</li>
          <li><strong>Light jogging</strong> — if your tendon tolerates it, a very easy 3-minute jog works well.</li>
          <li><strong>Jumping jacks</strong> (modified) — only if tendon is in Stage 3 or 4 and tolerates impact. 2 minutes.</li>
        </ul>
        <Tip>You should break a light sweat by the end of this phase. If you're training in a cold environment, add an extra minute or two.</Tip>
      </Card>

      <SubTitle>Phase 2: Activate — 5 to 8 minutes</SubTitle>
      <P><strong>Goal:</strong> Wake up specific muscles that are undersActive in your pattern — deep core, right-side gluteals, and convex-side spinal stabilizers — while providing analgesic isometric loading for the tendon.</P>

      <Card highlight>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Exercise A1: Isometric hip abduction — tendon loading</div>
        <P style={{ fontSize: 13.5 }}>Lie on your LEFT side (unaffected side down, so the right hip is on top). Stack your hips vertically — do not let the top hip roll forward. Bend both knees to about 45°. Press your top (right) knee upward against a wall, a pillow, or your own hand, generating a moderate contraction in the right gluteal muscles. <strong>Do not actually move the leg — hold the contraction isometrically.</strong></P>
        <P style={{ fontSize: 13.5 }}><strong>Intensity:</strong> 30–50% of your maximum effort. This should feel like a moderate squeeze, not an all-out push. If you feel pain above 3/10 at the lateral hip, reduce effort.</P>
        <P style={{ fontSize: 13.5 }}><strong>Prescription:</strong> 5 holds × 30–45 seconds each, with 15–20 seconds rest between holds.</P>
        <Warn>The hip must remain in a neutral or slightly abducted position. Do NOT let the top leg cross the midline (adduct) — this compresses the tendon against the trochanter, which is the exact mechanism that causes pain.</Warn>
      </Card>

      <Card highlight>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Exercise A2: Schroth breathing — scoliosis activation</div>
        <P style={{ fontSize: 13.5 }}>Sit on a firm chair or kneel in a tall kneeling position. Place your left hand on your left lower ribs and your right hand on your right lower ribs. Inhale slowly through your nose and <strong>direct the breath into the right side of your rib cage</strong> — the concave (collapsed) side. You should feel your right hand being pushed outward more than your left. Exhale slowly through pursed lips while gently drawing your left-side ribs inward and downward.</P>
        <P style={{ fontSize: 13.5 }}>This is called <strong>rotational angular breathing</strong>. It trains the respiratory muscles to expand the compressed side of the curve while gently deflating the convex side.</P>
        <P style={{ fontSize: 13.5 }}><strong>Prescription:</strong> 8–10 breath cycles (each cycle = one full inhale + exhale). Each inhale should last ~4 seconds, each exhale ~6 seconds.</P>
        <Tip>Don't force the breathing. The directional cue is about intention and attention — over time, the intercostal muscles on the concave side will become more mobile. It will feel subtle at first.</Tip>
      </Card>

      <Card highlight>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Exercise A3: Dead bug — deep core activation</div>
        <P style={{ fontSize: 13.5 }}>Lie on your back with both arms pointing straight up toward the ceiling and both knees bent at 90° with shins parallel to the floor (the "dead bug" start position). Press your lower back firmly into the floor — there should be no gap between your lumbar spine and the ground. This engages your transversus abdominis and internal obliques.</P>
        <P style={{ fontSize: 13.5 }}>Slowly extend your RIGHT arm overhead (toward the wall behind your head) and your LEFT leg forward (straightening it toward the ground), maintaining the lower back pressed flat. Return to start. Repeat on the opposite side (left arm + right leg). Alternate for the prescribed reps.</P>
        <P style={{ fontSize: 13.5 }}><strong>Key form cue:</strong> If your lower back arches away from the floor at any point, you've gone too far. Reduce the range of motion — the point is to maintain core stability against limb movement, not to achieve full extension.</P>
        <P style={{ fontSize: 13.5 }}><strong>Prescription:</strong> 2 sets × 8 reps per side (16 total movements per set). Move slowly — each extension should take ~3 seconds out, ~3 seconds back.</P>
      </Card>

      <SubTitle>Phase 3: Mobilize — 3 to 5 minutes</SubTitle>
      <P><strong>Goal:</strong> Move your major joints through their full available range to prepare for loaded movements.</P>
      <Card>
        <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, lineHeight: 1.9, color: COLORS.text }}>
          <li><strong>Hip CARs (Controlled Articular Rotations):</strong> Stand on one leg (hold a wall for balance). Lift the other knee to hip height, then slowly rotate the thigh outward (opening the hip), extend the leg behind you, and reverse the circle back to start. 5 circles each direction, each leg. Move smoothly and slowly — about 5 seconds per full circle.</li>
          <li><strong>Thoracic rotation:</strong> Get on all fours. Place your right hand behind your head. Rotate your right elbow toward your left knee, then open up toward the ceiling, following your elbow with your eyes. 8 reps per side. This is critical for your scoliosis — the thoracolumbar junction needs rotational mobility.</li>
          <li><strong>Cat-cow:</strong> On all fours, inhale and drop your belly toward the floor while lifting your head and tailbone (cow). Exhale and round your entire spine toward the ceiling, tucking your chin and pelvis (cat). 8 slow cycles. Focus on articulating through each vertebral segment rather than just hinging at two points.</li>
          <li><strong>Lateral lunge:</strong> From standing, take a wide step to the right, bending the right knee while keeping the left leg straight. Push your hips back and keep your chest up. Return to center, then repeat to the left. 5 per side. Keep the movement moderate — this is mobilization, not a deep stretch.</li>
        </ol>
      </Card>

      <SubTitle>Phase 4: Potentiate — 2 to 3 minutes</SubTitle>
      <P><strong>Goal:</strong> Ramp up to working weights for your first exercise of the day.</P>
      <Card>
        <P style={{ fontSize: 13.5 }}>Perform 2–3 progressively heavier warm-up sets of the first exercise on today's program. For example, if your working weight for goblet squats is 24 kg:</P>
        <ol style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, lineHeight: 1.9, color: COLORS.text }}>
          <li>Set 1: Bodyweight squats × 8 (no dumbbell)</li>
          <li>Set 2: Goblet squat with 12 kg × 6</li>
          <li>Set 3: Goblet squat with 18 kg × 4</li>
          <li>Begin working sets at 24 kg</li>
        </ol>
        <P style={{ fontSize: 13, color: COLORS.textMuted }}>Warm-up sets should feel easy — 4+ RIR. Their purpose is to rehearse the movement pattern and prepare the nervous system, not to fatigue you.</P>
      </Card>
    </div>
  );
}

const EXERCISE_LIB = [
  {
    name: "Dumbbell Goblet Squat",
    category: "Legs",
    sets: "3–5",
    reps: "4–6 (Day A) / 8–12 (Day B)",
    rest: "2–3 min",
    why: "The goblet squat is the safest loaded squat pattern for scoliosis because the front-loaded dumbbell counterbalances your torso, encouraging an upright spine. It generates substantially less spinal compression than a barbell back squat while still loading the quads, glutes, and core effectively. The position also makes it easy to self-correct toward neutral spine alignment.",
    cues: [
      "Hold one dumbbell vertically at chest height with both hands cupping the top end, elbows pointing down.",
      "Set your feet hip-width to slightly wider than hip-width apart, toes turned out 15–30°.",
      "Before you descend, take a breath in through your nose and brace your core as if someone were about to poke you in the stomach. This creates intra-abdominal pressure that protects your spine.",
      "Initiate the squat by pushing your hips back and bending your knees simultaneously. Think 'sit between your hips' — not 'sit back onto a chair.'",
      "Descend until your hip crease drops just below your knee line (roughly parallel), or to whatever depth you can reach while keeping your lower back flat (not rounded). Depth is individual.",
      "Your knees should track over your toes — let them push slightly outward. Do not let them collapse inward.",
      "At the bottom, your elbows should be between or just inside your knees. Use them as a proprioceptive guide.",
      "Drive up by pushing the floor away through your whole foot — feel pressure through the big toe, little toe, and heel equally.",
      "Stand fully upright at the top, squeezing your glutes briefly at lockout.",
      "Scoliosis cue: as you stand up, think 'long spine, level ribs.' Avoid lateral shifting."
    ],
    avoid: [
      "Heels lifting off the floor — this indicates ankle mobility limitation. Place small plates or a wedge under your heels.",
      "Knees caving inward (valgus collapse) — this overloads the inside of the knee and increases hip adduction, which stresses the gluteal tendon.",
      "Excessive forward lean — if you're tipping forward, the dumbbell may be too heavy, or your ankles need more mobility work.",
      "Rounding the lower back at the bottom — stop above the depth where this occurs."
    ],
    note: "For your tendinopathy: keep your stance at hip-width or wider. A narrow stance increases the hip adduction moment, compressing the gluteal tendon.",
    asymmetric: false,
  },
  {
    name: "Single-Arm Dumbbell Row",
    category: "Back",
    sets: "3–5",
    reps: "4–6 (Day A) / 8–12 (Day B)",
    rest: "2 min",
    asymmetric: true,
    why: "Unilateral rowing directly addresses the muscle asymmetry created by levoscoliosis. The left (convex side) latissimus dorsi and lower trapezius are typically stretch-weakened. By training one side at a time, you can apply slightly more volume to the weaker left side. This exercise also trains anti-rotation of the torso — critical for scoliosis management.",
    cues: [
      "Place your right knee and right hand on a flat bench, with the right hand directly under the right shoulder. Your left foot stays on the floor, stepped back slightly for balance.",
      "Hold a dumbbell in your left hand with arm fully extended, hanging straight down from the shoulder.",
      "Before pulling, set your shoulder blade: gently draw the left shoulder blade down and slightly back (toward your opposite back pocket). This prevents the shoulder from rounding forward.",
      "Pull the dumbbell upward by driving your elbow toward the ceiling, not toward your side. The dumbbell should travel in a slight arc toward your lower rib cage.",
      "At the top, pause for a full second. Squeeze the muscles between your shoulder blade and spine.",
      "Lower the dumbbell under control (2–3 seconds) back to full arm extension. Let the shoulder blade protract slightly at the bottom to get a full stretch.",
      "Keep your torso parallel to the floor throughout — do not rotate your trunk to heave the weight up.",
      "Complete all reps on the left side first, then switch to the right side."
    ],
    avoid: [
      "Jerking the weight up with body rotation — this uses momentum instead of the target muscles and torques your spine.",
      "Shrugging the shoulder toward your ear — this shifts work to the upper trapezius.",
      "Hyperextending the lower back — keep your core braced and spine neutral."
    ],
    note: "Scoliosis-specific loading: perform an extra set on the LEFT side if there's a noticeable strength asymmetry. For example, if the prescription is 4 sets, do 4 on the left and 3 on the right. This helps address the stretch-weakness on the convex side.",
  },
  {
    name: "Dumbbell Floor Press",
    category: "Chest",
    sets: "3–4",
    reps: "4–6 (Day A) / 8–12 (Day B)",
    rest: "2–3 min",
    asymmetric: false,
    why: "The floor press limits the range of motion compared to a bench press, which reduces stress on the shoulder joint — important because scoliosis can create subtle shoulder asymmetry. It still effectively targets the chest, front deltoids, and triceps. Performing it with dumbbells (versus a barbell) allows each arm to find its natural path, accommodating rib cage asymmetry.",
    cues: [
      "Lie flat on your back on the floor with knees bent and feet flat on the ground, hip-width apart.",
      "Hold a dumbbell in each hand at chest level, with palms facing your feet (pronated grip). Your upper arms should rest on the floor at about 45° to your body — not flared out at 90° or pinned to your sides.",
      "Press both dumbbells upward until your arms are fully extended, directly over your chest.",
      "Lower the dumbbells under control until your upper arms (triceps) lightly touch the floor. Pause — do not bounce off the floor.",
      "Press back up, thinking about squeezing your chest muscles together at the top.",
      "Keep your lower back in a natural arch — do not flatten or excessively arch it."
    ],
    avoid: [
      "Flaring elbows out to 90° — this stresses the shoulder joint. Keep them at 45°.",
      "Bouncing the elbows off the floor to generate momentum.",
      "Pressing unevenly — if one arm drifts ahead, reduce the weight and focus on synchronizing."
    ],
  },
  {
    name: "Dumbbell Single-Leg Romanian Deadlift",
    category: "Posterior Chain",
    sets: "3–4",
    reps: "6–8 (Day A) / 10–12 (Day B)",
    rest: "2 min",
    asymmetric: true,
    why: "This exercise trains the posterior chain (hamstrings, glutes, and erector spinae) through a hip hinge pattern on one leg. For your presentation, it's ideal because it simultaneously loads the gluteus medius as a pelvic stabilizer (directly treating the tendinopathy through functional strengthening) and demands anti-rotation core stability (beneficial for scoliosis). It is the most functionally relevant exercise for runners.",
    cues: [
      "Stand on your RIGHT leg (the affected side — we want to load it). Hold a dumbbell in your LEFT hand.",
      "Maintain a slight bend (about 15–20°) in your standing knee throughout — it should never be locked straight.",
      "Initiate the movement by hinging at the hip: push your hips backward while tilting your torso forward. Your left leg rises behind you as a counterbalance.",
      "The dumbbell hangs straight down from your left shoulder, tracking close to your right leg as you descend.",
      "Descend until you feel a strong stretch in the back of your right thigh (hamstring) OR until your torso is roughly parallel to the floor — whichever comes first.",
      "CRITICAL: keep your hips level throughout. The most common error is the hip of the trailing leg rotating open (upward). Imagine balancing a cup of water on your lower back.",
      "Drive back to standing by squeezing your right glute and pushing through your right foot. Avoid pulling with your lower back.",
      "At the top, stand fully upright and squeeze the right glute for a beat before beginning the next rep."
    ],
    avoid: [
      "Rounding the lower back — if your back rounds before your hamstrings stretch, you've gone too deep. Reduce range.",
      "Opening the hips — the trailing leg's hip rotating outward. Keep hips squared to the floor.",
      "Standing leg knee locking — keep the soft bend.",
      "Using too heavy a dumbbell — balance is the primary challenge. Start lighter than you think."
    ],
    note: "For gluteal tendinopathy: this exercise is safe and therapeutic because the standing-leg gluteus medius works as a stabilizer without hip adduction compression. Start with bodyweight or a very light dumbbell, and progress load only when balance is confident and the 24-hour response is clean.",
  },
  {
    name: "Banded Pallof Press",
    category: "Core / Anti-rotation",
    sets: "3",
    reps: "8–10 per side",
    rest: "60 sec",
    asymmetric: true,
    why: "The Pallof press is arguably the single most important core exercise for someone with scoliosis. It trains anti-rotation — your core's ability to resist being twisted. Since your curve creates a rotational component in the spine, training the core to resist rotation directly counteracts the curve's mechanical tendency. Using a band rather than a cable allows infinite adjustability.",
    cues: [
      "Attach a resistance band to a fixed anchor point at chest height (a door frame anchor, rack upright, or sturdy pole).",
      "Stand perpendicular to the anchor, holding the band with both hands clasped together at your chest. Step away from the anchor until there's moderate tension.",
      "Your feet should be hip-width apart, knees slightly bent, core braced.",
      "Press both hands straight forward, extending your arms fully. The band will try to rotate your body toward the anchor — resist this rotation completely. Your shoulders and hips should remain squared forward.",
      "Hold the extended position for 2–3 seconds.",
      "Return hands to chest. That's one rep.",
      "Complete all reps facing one direction, then turn around and repeat with the band pulling from the other side."
    ],
    avoid: [
      "Allowing your torso to rotate toward the band — this defeats the purpose.",
      "Leaning away from the band to compensate — stay upright and centered.",
      "Rushing — the hold at full extension is where the work happens."
    ],
    note: "Scoliosis-specific application: when the band pulls from your LEFT side (toward the convex side), this is the more therapeutic direction because it forces the right-side core muscles to activate. You can do 1–2 extra reps in this direction.",
  },
  {
    name: "Dumbbell Split Squat",
    category: "Legs",
    sets: "3–4",
    reps: "8–12 per leg",
    rest: "90 sec per leg",
    asymmetric: true,
    why: "Split squats load each leg independently, revealing and correcting strength asymmetries caused by scoliosis-related pelvic tilt. The staggered stance is more forgiving for the gluteal tendon than deep bilateral squats because the hip stays closer to neutral in the frontal plane.",
    cues: [
      "Hold a dumbbell in each hand at your sides, arms straight.",
      "Step one foot forward and one back into a long split stance. Your front foot should be far enough forward that when you descend, your front knee doesn't travel past your toes by more than an inch or two.",
      "Your back foot is on the ball of the foot, heel raised.",
      "Keeping your torso upright (do not lean forward), lower your body straight down by bending both knees simultaneously. Your back knee should descend toward the floor — aim to come within 2–3 inches of the floor, or as low as comfortable.",
      "Your front shin should remain close to vertical at the bottom position.",
      "Push up through your front foot to return to the top. Think about driving through the midfoot and heel, not the toes.",
      "Complete all reps on one leg before switching."
    ],
    avoid: [
      "Front knee caving inward — push it slightly outward, tracking over the 2nd-3rd toe.",
      "Taking too short a stance — this puts excessive stress on the knee.",
      "Leaning the torso far forward — this turns it into a lunge variation that loads the back excessively."
    ],
    note: "Always start with the weaker leg first (while you're freshest). For the tendinopathy: if right-leg split squats provoke lateral hip pain, widen your stance slightly (move the right foot a few inches to the right of center rather than directly in line with the hip).",
  },
  {
    name: "Single-Arm DB Overhead Press (Half-Kneeling)",
    category: "Shoulders",
    sets: "3–4",
    reps: "8–12 per arm",
    rest: "90 sec per arm",
    asymmetric: true,
    why: "Pressing overhead from a half-kneeling position dramatically reduces spinal compression compared to standing bilateral presses. The half-kneeling position also locks out compensatory lateral shifting and excessive lumbar extension — both of which scoliosis makes you more prone to. Single-arm execution further challenges lateral core stability.",
    cues: [
      "Kneel with your RIGHT knee on the ground (on a pad or folded towel) and your LEFT foot forward, both hips and knees at approximately 90°.",
      "Hold a dumbbell in your RIGHT hand at shoulder height, palm facing forward, elbow directly below the wrist.",
      "Brace your core — squeeze your right glute gently to prevent the pelvis from tilting forward.",
      "Press the dumbbell straight overhead until your arm is fully extended, bicep near your ear.",
      "At the top, the dumbbell should be directly over your shoulder (not in front of or behind it). Your rib cage should not flare open — keep it pulled down.",
      "Lower the dumbbell under control back to shoulder height. That's one rep.",
      "Complete all reps on the right arm, then switch the kneeling leg and pressing arm."
    ],
    avoid: [
      "Leaning away from the pressing arm — this compensates with the spine instead of the shoulder.",
      "Flaring the rib cage open at the top — this hyperextends the lower back.",
      "Rushing — control the descent."
    ],
    note: "This position is naturally self-correcting for scoliosis. If you feel one side is much harder, that tells you about your lateral stability asymmetry.",
  },
  {
    name: "Dumbbell Hip Thrust",
    category: "Glutes",
    sets: "3–4",
    reps: "10–15",
    rest: "90 sec",
    asymmetric: false,
    why: "The hip thrust is the gold standard for glute max hypertrophy and produces high EMG activation with minimal compressive hip adduction — making it tendon-safe. The supine position eliminates spinal compression entirely. It directly builds the hip extension strength needed for both running and pelvic stability.",
    cues: [
      "Sit on the floor with your upper back (shoulder blades) resting against a sturdy bench or elevated surface. The bench should not slide.",
      "Roll or place a dumbbell across your hip crease (the fold between your torso and thighs). You can place a towel or pad under the dumbbell for comfort.",
      "Place your feet flat on the floor, hip-width apart, with your shins approximately vertical when you're at the top of the movement.",
      "Drive through your heels to lift your hips upward until your thighs and torso form a straight line — your hips should be fully extended at the top.",
      "Squeeze your glutes hard at the top and hold for 1–2 seconds. Your shin should be vertical at this point.",
      "Lower your hips back down under control, stopping just short of your glutes touching the floor.",
      "Your chin should stay slightly tucked throughout — look at the wall in front of you, not at the ceiling. This prevents neck hyperextension."
    ],
    avoid: [
      "Hyperextending the lower back at the top — stop when hips are level with the line from shoulder to knee.",
      "Pushing through the toes — drive through heels and midfoot.",
      "Feet too close to the bench (knees travel past toes) — shift feet forward.",
      "Feet too far from bench (hamstrings dominate over glutes) — shift feet closer."
    ],
    note: "For tendinopathy: this is a priority exercise. It strongly loads the glutes through hip extension with NO hip adduction compression. If bilateral feels uneven, you can progress to single-leg hip thrusts once you can do 3 × 15 comfortably.",
  },
  {
    name: "Side Plank (Left Side Down)",
    category: "Core / Scoliosis",
    sets: "2–3",
    reps: "20–40 sec hold",
    rest: "60 sec",
    asymmetric: true,
    why: "Research has shown that the side plank specifically targets the quadratus lumborum and obliques on the down side. For a LEFT convex curve, performing the side plank with the LEFT side down directly strengthens the stretch-weakened convex-side lateral stabilizers. This is one of the most studied scoliosis-specific corrective exercises.",
    cues: [
      "Lie on your LEFT side with your left elbow directly under your left shoulder, forearm flat on the floor pointing forward.",
      "Stack your feet (right foot on top of left) or stagger them (right foot in front of left) for more stability if needed.",
      "Lift your hips off the floor, creating a straight line from your head through your shoulders, hips, and ankles.",
      "Your body should be in one plane — do not let your hips sag toward the floor (too little effort) or pike upward (compensating with shoulders).",
      "Breathe steadily throughout the hold. Apply the Schroth breathing cue: direct breath into the right rib cage.",
      "Hold for the prescribed time, then lower with control."
    ],
    avoid: [
      "Sagging hips — this collapses the spine rather than stabilizing it.",
      "Rolling forward or backward — keep your body in a single plane.",
      "Holding your breath — breathe continuously."
    ],
    note: "You perform this predominantly on the LEFT side because that's the convex (weak) side. You may also do a shorter hold on the right side for balance, but the therapeutic emphasis is on the left.",
  },
  {
    name: "Dumbbell Step-Up",
    category: "Legs",
    sets: "2–3",
    reps: "12–15 per leg",
    rest: "60–90 sec per leg",
    asymmetric: true,
    why: "Step-ups are a functional single-leg exercise that trains hip extension, knee extension, and pelvic stability in a pattern directly relevant to walking, running, and stairs. The single-leg stance demands gluteus medius activation for balance, making it rehabilitative for the tendinopathy.",
    cues: [
      "Hold a dumbbell in each hand at your sides. Stand facing a sturdy step, bench, or box (12–18 inches high).",
      "Place your entire RIGHT foot on the step — make sure the whole foot is on the surface, not just the toes.",
      "Lean your torso slightly forward (about 10–15° of forward lean from the hips, not the waist), then drive through the right foot to step up.",
      "Stand fully upright on the step, bringing the left foot up to meet the right. Pause briefly.",
      "Lower yourself down with the LEFT foot, controlling the descent with your RIGHT leg. Do not drop or plop down.",
      "The down phase is the most important part — take 2–3 seconds to lower yourself. Your right leg is doing an eccentric contraction, which is highly effective for both strength and tendon adaptation.",
      "Complete all reps on one leg before switching."
    ],
    avoid: [
      "Pushing off with the bottom foot — this defeats the purpose. The step leg does all the work.",
      "Knee caving inward on the stepping leg — actively push the knee slightly outward.",
      "Using a step that's too high — your thigh should be approximately parallel to the ground at the start position, not higher."
    ],
    note: "For the tendinopathy: start with a lower step height (6–8 inches) and bodyweight only if this is in your early stages. Progress height and load gradually using the 24-hour rule.",
  },
  {
    name: "Dumbbell Bent-Over Row",
    category: "Back",
    sets: "3",
    reps: "10–15",
    rest: "90 sec",
    asymmetric: false,
    why: "The bilateral bent-over row is a foundational horizontal pulling movement that builds the entire posterior chain of the upper body — lats, rhomboids, rear delts, and biceps. It complements the single-arm row by allowing heavier loading in a symmetrical pattern.",
    cues: [
      "Hold a dumbbell in each hand with a neutral grip (palms facing each other).",
      "Hinge at the hips (like the start of a Romanian deadlift) until your torso is approximately 45° to the floor. Maintain a flat back — no rounding.",
      "Let the dumbbells hang at arm's length, directly below your shoulders.",
      "Pull both dumbbells simultaneously toward your lower rib cage / upper abdomen by driving your elbows back.",
      "Squeeze your shoulder blades together at the top, holding for a 1-second pause.",
      "Lower under control to full arm extension.",
      "Keep your core braced throughout — this exercise loads the lower back, so core stability is essential."
    ],
    avoid: [
      "Jerking the weight up by standing more upright — maintain the hip hinge angle.",
      "Rounding the upper or lower back.",
      "Shrugging the shoulders toward the ears."
    ],
  },
  {
    name: "Banded Lateral Walk",
    category: "Glutes / Tendon Rehab",
    sets: "2–3",
    reps: "15–20 steps each direction",
    rest: "60 sec",
    asymmetric: false,
    why: "This directly strengthens the gluteus medius through hip abduction against resistance, which is the primary therapeutic target for gluteal tendinopathy. The lateral walk maintains the hip in a safe position (abduction and neutral flexion) throughout the movement.",
    cues: [
      "Place a light-to-medium resistance band around both legs, just above the knees (NOT around the ankles, which changes the lever arm and can increase ITB tension).",
      "Stand with feet hip-width apart, knees slightly bent (~20°), and hips slightly hinged (lean forward ~10°). This is a mini-squat position.",
      "Step sideways with the leading foot, about 12–18 inches. Then follow with the trailing foot, maintaining tension in the band — do not let the trailing foot snap to meet the leading foot.",
      "Maintain a consistent mini-squat depth throughout — do not bob up and down.",
      "Keep your toes pointing forward, not outward. The movement comes from the hip, not the foot.",
      "After the prescribed number of steps in one direction, reverse."
    ],
    avoid: [
      "Letting the knees cave in during the step — keep them pushed slightly outward against the band.",
      "Standing too upright — the slight hip hinge engages the glute med more effectively.",
      "Using a band that's too heavy — if you can't maintain form for 15 steps, go lighter."
    ],
    note: "For early-stage tendinopathy: perform this on non-lifting days as part of your rehabilitation. As tolerance builds, integrate it into the warm-up on lifting days. Monitor 24-hour response.",
  },
  {
    name: "Banded Face Pull",
    category: "Upper Back / Posture",
    sets: "2–3",
    reps: "15–20",
    rest: "60 sec",
    asymmetric: false,
    why: "Face pulls target the rear deltoids, external rotators of the shoulder, and middle/lower trapezius — muscles that are chronically undertrained and often inhibited by scoliosis-related postural shifts. They counteract the forward shoulder rounding that accompanies many scoliotic patterns.",
    cues: [
      "Attach a resistance band to a fixed point at head height or slightly above.",
      "Hold the band with both hands, palms facing each other (or facing down, depending on comfort), arms extended in front of you.",
      "Pull the band toward your face by driving your elbows out and back. Think about trying to touch your thumbs to the sides of your head.",
      "At the end position, your upper arms should be parallel to the floor, elbows bent to 90°, and you should feel a strong squeeze between your shoulder blades.",
      "Hold the contracted position for 1–2 seconds.",
      "Return to the start position with control."
    ],
    avoid: [
      "Pulling the band to your chest instead of your face — the high pull angle is what targets the rear delts and external rotators.",
      "Using momentum — this is a control exercise, not a power exercise.",
      "Shrugging your shoulders during the pull."
    ],
  },
  {
    name: "Dumbbell Lateral Raise",
    category: "Shoulders",
    sets: "3",
    reps: "12–20",
    rest: "60 sec",
    asymmetric: false,
    why: "Lateral raises isolate the medial deltoid, which is primarily responsible for shoulder width. They're included on the volume day at higher reps to accumulate metabolic stress and volume for a muscle that responds well to high-rep training.",
    cues: [
      "Stand upright holding a light dumbbell in each hand at your sides, palms facing your body.",
      "With a very slight bend in your elbows (~15°), raise both arms out to the sides until they reach approximately shoulder height.",
      "At the top, your arms should form a 'T' shape with your body. Tip the dumbbell slightly forward — imagine pouring water out of a jug. This increases medial deltoid activation.",
      "Lower under control (2–3 seconds) back to the start.",
      "Keep your torso still — no swinging or momentum."
    ],
    avoid: [
      "Using momentum/swinging — if you need to rock your body, the weight is too heavy. Use lighter dumbbells.",
      "Raising the dumbbells above shoulder height — this impinges the shoulder.",
      "Shrugging the shoulders — initiate the movement from the deltoid, not the traps."
    ],
  },
  {
    name: "Dumbbell Curl",
    category: "Arms",
    sets: "2–3",
    reps: "12–15",
    rest: "60 sec",
    asymmetric: false,
    why: "Bicep curls are an isolation exercise included on volume day for arm development. They also strengthen the elbow flexors, which contributes to grip strength for other exercises.",
    cues: [
      "Stand with a dumbbell in each hand, arms at your sides, palms facing forward (supinated grip).",
      "Keeping your upper arms pinned to your sides (they should not move forward or backward), bend your elbows to curl the dumbbells upward toward your shoulders.",
      "Squeeze the biceps at the top, then lower under control (2–3 seconds).",
      "Fully extend your arms at the bottom — no half reps."
    ],
    avoid: [
      "Swinging the dumbbells using body momentum.",
      "Moving the elbows forward to shorten the range — keep upper arms vertical."
    ],
  },
  {
    name: "Dumbbell Overhead Tricep Extension",
    category: "Arms",
    sets: "2–3",
    reps: "12–15",
    rest: "60 sec",
    asymmetric: false,
    why: "The overhead position places the long head of the triceps under a stretch, which is optimal for hypertrophy. Included on volume day for balanced arm development.",
    cues: [
      "Sit on a bench or sturdy chair for back support. Hold one dumbbell with both hands, gripping the inner plate or handle, and press it overhead.",
      "Your upper arms should be vertical, elbows pointing forward (not flaring out to the sides).",
      "Lower the dumbbell behind your head by bending at the elbows only. Your upper arms remain stationary.",
      "Descend until you feel a stretch in the back of your arms (triceps), then press back to full extension.",
      "Keep your core braced and ribs down — do not arch your back."
    ],
    avoid: [
      "Flaring elbows outward — keep them pointing forward.",
      "Arching the lower back — sit tall and brace.",
      "Bouncing at the bottom — use a controlled turnaround."
    ],
  },
  {
    name: "Dead Bug (Anti-Rotation Variant)",
    category: "Core / Scoliosis",
    sets: "2",
    reps: "8–10 per side",
    rest: "60 sec",
    asymmetric: false,
    why: "The dead bug trains deep core stability — specifically the transversus abdominis and internal obliques — in a spine-safe supine position. The anti-rotation variant adds a band pulling laterally, forcing the core to resist rotation, which directly combats the rotational component of your scoliosis.",
    cues: [
      "Lie on your back, arms pointing to the ceiling, knees bent 90° with shins parallel to the floor.",
      "Press your lower back firmly into the floor (posterior pelvic tilt). If you can slide your hand under your lower back, you're not pressing hard enough.",
      "If using the banded variant: hold a band in both hands that's anchored to one side at floor level. The band tries to pull you sideways — resist it.",
      "Slowly extend your RIGHT arm overhead and LEFT leg forward simultaneously. Move as slowly as you can — 3 seconds out, 3 seconds back.",
      "If your lower back lifts off the floor at any point, you've gone too far. Reduce the range.",
      "Return to start, then repeat with LEFT arm and RIGHT leg.",
      "Breathe out during the extension (the hard part), breathe in during the return."
    ],
    avoid: [
      "Losing lower back contact with the floor — this is the primary form break and means your core has given up.",
      "Moving too fast — speed defeats the purpose.",
      "Holding your breath — exhale during the effort."
    ],
  },
];

function ExerciseLibrarySection() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(EXERCISE_LIB.map(e => e.category.split(" /")[0].split(" (")[0]))];
  const filtered = filter === "All" ? EXERCISE_LIB : EXERCISE_LIB.filter(e => e.category.includes(filter));
  return (
    <div>
      <SectionTitle>Exercise Library</SectionTitle>
      <P>Tap any exercise to expand full form instructions, common mistakes, and condition-specific notes. Every exercise in this program is described here — learn the form before loading heavy.</P>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              padding: "5px 14px",
              borderRadius: 5,
              border: `1px solid ${filter === c ? COLORS.accent : COLORS.border}`,
              background: filter === c ? COLORS.accentGlow : "transparent",
              color: filter === c ? COLORS.accent : COLORS.textMuted,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {c}
          </button>
        ))}
      </div>
      {filtered.map((ex, i) => (
        <ExerciseBlock key={i} {...ex} />
      ))}
    </div>
  );
}

function DaySection({ day, title, focus, rir, exercises }) {
  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <Badge color="accent">{focus}</Badge>
        <Badge color="success">Target: {rir} RIR</Badge>
      </div>
      <P>Complete the full warm-up protocol (12–15 min) before beginning. Rest times are between working sets of the same exercise, not between different exercises.</P>
      {day === "A" && (
        <>
          <ExerciseBlock
            name="1. Dumbbell Goblet Squat"
            category="Compound"
            sets="4"
            reps="4–6"
            rest="2–3 min"
            cues={["See Exercise Library for full form cues.", "Use a heavy dumbbell — this is your primary strength movement today.", "All 4 sets should be at the same working weight.", "If you hit 6 reps on all sets at 2 RIR, increase weight next session."]}
            why="Primary lower body strength movement. The lower rep range with heavier loads prioritizes neural adaptations and maximal strength development."
            avoid={["Reducing depth to lift more weight — depth consistency matters more than load."]}
          />
          <ExerciseBlock
            name="2. Single-Arm Dumbbell Row"
            category="Compound"
            sets="4 (left) / 3 (right)"
            reps="4–6"
            rest="2 min"
            asymmetric
            cues={["Start with the LEFT arm (convex side).", "Extra set on the left addresses stretch-weakness.", "Focus on a 1-second squeeze at the top of each rep.", "Use the heaviest dumbbell you can control with proper form."]}
            why="Primary horizontal pull. The asymmetric set prescription addresses your scoliosis pattern."
          />
          <ExerciseBlock
            name="3. Dumbbell Floor Press"
            category="Compound"
            sets="4"
            reps="4–6"
            rest="2–3 min"
            cues={["Pause briefly when your triceps touch the floor.", "Drive both dumbbells evenly.", "This is your heaviest pressing movement of the week."]}
            why="Primary pressing movement for chest, front delts, and triceps at strength-oriented loads."
          />
          <ExerciseBlock
            name="4. Dumbbell Single-Leg Romanian Deadlift"
            category="Compound"
            sets="3"
            reps="6–8 per leg"
            rest="2 min per leg"
            asymmetric
            cues={["Start with the RIGHT leg (affected side).", "Dumbbell in LEFT hand (contralateral — this increases gluteus medius demand).", "Focus on balance and hip hinge quality, not maximum load.", "If balance is shaky, lightly touch a wall with your free hand."]}
            why="Posterior chain and pelvic stability. Therapeutic for the gluteal tendon through functional loading."
          />
          <ExerciseBlock
            name="5. Banded Pallof Press"
            category="Core"
            sets="3"
            reps="10 per side"
            rest="60 sec"
            cues={["Perform the set with the band pulling from the LEFT first (more therapeutic for your curve).", "Hold each press-out for 2–3 seconds.", "Stand with feet hip-width apart, knees soft."]}
            why="Anti-rotation core training. Directly counteracts the rotational tendency of your spinal curve."
          />
          <P style={{ marginTop: 20, color: COLORS.textMuted, fontSize: 13 }}>Estimated session time: 50–60 minutes including warm-up. Evening: 10–15 min scoliosis correctives (see Scoliosis Correctives section).</P>
        </>
      )}
      {day === "B" && (
        <>
          <ExerciseBlock
            name="1. Dumbbell Split Squat"
            category="Compound"
            sets="3"
            reps="8–12 per leg"
            rest="90 sec per leg"
            asymmetric
            cues={["Start with the weaker leg.", "Moderate weight — this is hypertrophy, not max strength.", "Focus on controlled descent (3 sec down) and strong drive up.", "If right leg provokes lateral hip pain, widen stance slightly."]}
            why="Unilateral leg development at hypertrophy-oriented rep ranges."
          />
          <ExerciseBlock
            name="2. Single-Arm DB Overhead Press (Half-Kneeling)"
            category="Compound"
            sets="3"
            reps="8–12 per arm"
            rest="90 sec per arm"
            asymmetric
            cues={["Right knee down, press with right arm first. Then switch.", "Squeeze the down-side glute to stabilize the pelvis.", "Keep ribs pulled down — no flaring.", "Full lockout overhead on every rep."]}
            why="Vertical pressing with minimal spinal compression. Challenges lateral core stability."
          />
          <ExerciseBlock
            name="3. Dumbbell Bent-Over Row"
            category="Compound"
            sets="3"
            reps="10–12"
            rest="90 sec"
            cues={["Hinge to ~45°, flat back, neutral grip.", "Drive elbows back, squeeze shoulder blades 1 sec at top.", "Lower under control."]}
            why="Bilateral horizontal pull for back hypertrophy with heavier combined loading than single-arm rows."
          />
          <ExerciseBlock
            name="4. Dumbbell Hip Thrust"
            category="Compound"
            sets="3"
            reps="10–15"
            rest="90 sec"
            cues={["Back against a sturdy bench, feet hip-width apart.", "Full hip extension at the top — squeeze glutes hard, 2-sec hold.", "Control the descent, don't drop.", "Chin slightly tucked throughout."]}
            why="Maximum glute activation with zero hip adduction compression. Priority exercise for tendinopathy rehabilitation."
          />
          <ExerciseBlock
            name="5. Side Plank — Left Side Down"
            category="Core / Scoliosis"
            sets="3"
            reps="30–45 sec hold"
            rest="60 sec"
            cues={["Left elbow under left shoulder, body in one plane.", "Breathe into the right rib cage (Schroth cue).", "If 30 sec is too hard, start from the knees instead of the feet."]}
            why="Directly strengthens the convex-side lateral stabilizers. One of the most evidence-supported scoliosis corrective exercises."
          />
          <P style={{ marginTop: 20, color: COLORS.textMuted, fontSize: 13 }}>Estimated session time: 50–60 minutes including warm-up. Evening: 10–15 min scoliosis correctives.</P>
        </>
      )}
      {day === "C" && (
        <>
          <ExerciseBlock
            name="1. Dumbbell Step-Up"
            category="Compound"
            sets="3"
            reps="12–15 per leg"
            rest="60–90 sec per leg"
            asymmetric
            cues={["Use moderate step height (12–18 inches).", "Light-to-moderate dumbbells — this is about volume and control.", "3-second lowering phase on every rep.", "Right leg does all the work — don't push off with the bottom foot."]}
            why="Functional single-leg movement with eccentric emphasis. High reps build work capacity and tendon tolerance."
          />
          <ExerciseBlock
            name="2. Dumbbell Lateral Raise"
            category="Isolation"
            sets="3"
            reps="15–20"
            rest="60 sec"
            cues={["Light weight, strict form.", "Raise to shoulder height, slight forward tip.", "2–3 second lowering phase.", "No body English — if you're swinging, go lighter."]}
            why="Medial deltoid isolation. High-rep metabolic work that responds well to volume accumulation."
          />
          <ExerciseBlock
            name="3. Banded Face Pull"
            category="Isolation"
            sets="3"
            reps="15–20"
            rest="60 sec"
            cues={["Pull toward your face, not your chest.", "Elbows high, squeeze between shoulder blades.", "1–2 second hold at full contraction."]}
            why="Posterior shoulder and scapular health. Counteracts forward posture associated with scoliosis."
          />
          <ExerciseBlock
            name="4. Dumbbell Curl"
            category="Isolation"
            sets="2"
            reps="12–15"
            rest="60 sec"
            cues={["Upper arms pinned to sides.", "Full extension at bottom, full squeeze at top.", "Controlled descent — no dropping."]}
            why="Bicep isolation for arm development and elbow health."
          />
          <ExerciseBlock
            name="5. Dumbbell Overhead Tricep Extension"
            category="Isolation"
            sets="2"
            reps="12–15"
            rest="60 sec"
            cues={["Seated for back support.", "Elbows point forward, not flaring.", "Full stretch at bottom, full lockout at top."]}
            why="Tricep isolation with long head emphasis for balanced arm development."
          />
          <ExerciseBlock
            name="6. Dead Bug (Anti-Rotation Variant)"
            category="Core"
            sets="2"
            reps="8–10 per side"
            rest="60 sec"
            cues={["Lower back pressed flat to floor throughout.", "If using the band variant, resist the lateral pull.", "3-second extensions, 3-second returns.", "Exhale on the extension."]}
            why="Deep core stability training with anti-rotation component for scoliosis management."
          />
          <P style={{ marginTop: 20, color: COLORS.textMuted, fontSize: 13 }}>Estimated session time: 45–55 minutes including warm-up. Evening: 10–15 min scoliosis correctives.</P>
        </>
      )}
    </div>
  );
}

function CorrectivesSection() {
  return (
    <div>
      <SectionTitle>Daily Scoliosis Correctives</SectionTitle>
      <P>Perform this 10–15 minute routine <strong>every day</strong>, including rest days. On lifting days, do it in the evening (separated from your training session). On non-lifting days, do it whenever convenient. Consistency matters far more than intensity — these are neuromuscular retraining exercises, not strength work.</P>

      <SubTitle>1. Schroth Rotational Angular Breathing (3 minutes)</SubTitle>
      <Card>
        <P style={{ fontSize: 13.5 }}>Sit tall on a chair or in tall kneeling. Place your hands on your lower ribs. Inhale through your nose for 4 seconds, directing the breath <strong>into the right (concave) rib cage</strong>. You should feel the right ribs expand more than the left. Exhale through pursed lips for 6 seconds while gently drawing the left ribs inward. Repeat for 8–12 breath cycles.</P>
        <P style={{ fontSize: 13, color: COLORS.textMuted }}>This trains the intercostal muscles to expand the collapsed concave side. Think of it as "inflating a deflated balloon" on the right.</P>
      </Card>

      <SubTitle>2. Side-Lying Reach (Left Side Down) — 2 minutes</SubTitle>
      <Card>
        <P style={{ fontSize: 13.5 }}>Lie on your LEFT side with your body straight, left arm extended under your head. Reach your RIGHT arm overhead (toward the wall above your head), creating a long stretch along your entire right side. While holding this elongated position, take 5–6 deep breaths, directing air into the RIGHT rib cage. This combines Schroth breathing with active lengthening of the concave side.</P>
        <P style={{ fontSize: 13, color: COLORS.textMuted }}>2–3 holds of 30 seconds each.</P>
      </Card>

      <SubTitle>3. Quadruped Arm-Leg Reach with Curve Correction — 3 minutes</SubTitle>
      <Card>
        <P style={{ fontSize: 13.5 }}>On all fours (hands under shoulders, knees under hips), simultaneously extend your LEFT arm forward and RIGHT leg backward. Before extending, gently shift your trunk slightly to the RIGHT (toward the concave side) — this nudges your spine away from the curve direction. Hold the extended position for 5 seconds while breathing normally, then return. Repeat 8–10 times.</P>
        <P style={{ fontSize: 13.5 }}>Then perform the opposite side (RIGHT arm, LEFT leg) for 6–8 reps as a standard bird-dog for general core stability.</P>
        <P style={{ fontSize: 13, color: COLORS.textMuted }}>The emphasis is on the left arm / right leg combination because this activates the convex-side back extensors while the subtle trunk shift provides corrective input.</P>
      </Card>

      <SubTitle>4. Side Plank — Left Side Down (2 minutes)</SubTitle>
      <Card>
        <P style={{ fontSize: 13.5 }}>If you did this during today's lifting session, you can do a shorter hold here (15–20 sec × 2). If today is a non-lifting day, do the full prescription (3 × 30–40 sec). See the Exercise Library for full form cues.</P>
      </Card>

      <SubTitle>5. Supine Pelvic Corrections (2 minutes)</SubTitle>
      <Card>
        <P style={{ fontSize: 13.5 }}>Lie on your back with knees bent, feet flat. Place a resistance band around your thighs, just above the knees. Gently press both knees outward against the band (this activates both gluteus medius muscles). While holding this outward pressure, perform a gentle posterior pelvic tilt: flatten your lower back into the floor by tilting your pelvis, then release. This links pelvic stability with hip abductor activation.</P>
        <P style={{ fontSize: 13.5 }}>10–12 repetitions of the tilt, holding each for 3 seconds while maintaining the outward knee pressure.</P>
      </Card>

      <Tip>These exercises are cumulative. You may not feel dramatic effects in the first week, but after 4–6 weeks of daily practice, most people notice improved posture awareness, reduced muscle guarding on the concave side, and better symmetry during loaded exercises.</Tip>
    </div>
  );
}

function TendonSection() {
  return (
    <div>
      <SectionTitle>Gluteal Tendon Rehabilitation</SectionTitle>
      <P>Your gluteal tendinopathy rehabilitation is <strong>built into</strong> this program, not bolted on top. The warm-up isometrics, the exercise selection (hip thrusts, single-leg RDLs, step-ups, banded lateral walks), and the avoidance of compressive positions are all designed with tendon loading principles in mind. This section explains the staging system so you understand where you are and how to progress.</P>

      <SubTitle>Understanding tendon loading stages</SubTitle>
      <P>Tendons adapt to load more slowly than muscles — they respond on a timescale of weeks to months, not days. The rehabilitation follows a four-stage progression based on the Grimaldi/Fearon framework used in the LEAP trial. You advance when you meet the criteria — <strong>not on a fixed calendar</strong>.</P>

      <Card>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.blue, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Stage 1: Isometric loading</div>
        <P style={{ fontSize: 13.5 }}><strong>What:</strong> Isometric hip abduction holds in non-compressed positions (done during warm-up). 5 × 30–45 sec at 30–50% effort. Daily or twice daily.</P>
        <P style={{ fontSize: 13.5 }}><strong>When to advance:</strong> You can hold for 45 seconds × 5 sets at 50–70% effort with pain ≤ 2/10 during and no 24-hour flare-up, consistently for one week.</P>
      </Card>
      <Card>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.blue, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Stage 2: Slow isotonic loading</div>
        <P style={{ fontSize: 13.5 }}><strong>What:</strong> Slow concentric-eccentric movements: banded lateral walks, bodyweight hip thrusts, sit-to-stand, gentle step-ups on a low step. 3–4 × 8–15 reps. Every other day (48-hour recovery between sessions).</P>
        <P style={{ fontSize: 13.5 }}><strong>When to advance:</strong> You can complete the prescribed exercises with pain ≤ 3/10 during, no 24-hour flare-up, consistently for 2 weeks.</P>
      </Card>
      <Card>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.blue, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Stage 3: Heavy slow resistance</div>
        <P style={{ fontSize: 13.5 }}><strong>What:</strong> Loaded hip thrusts, weighted step-ups, single-leg RDLs with meaningful dumbbell weight, weighted lateral walks. 3–4 × 6–12 reps. Three times per week with 48–72 hours between sessions.</P>
        <P style={{ fontSize: 13.5 }}><strong>When to advance:</strong> You can perform all Stage 3 exercises at progressively increasing loads with pain ≤ 2/10 and no next-day worsening for 3+ weeks. Your function in daily activities is near-normal.</P>
      </Card>
      <Card>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.blue, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Stage 4: Energy storage and return to sport</div>
        <P style={{ fontSize: 13.5 }}><strong>What:</strong> Faster movements, controlled plyometrics, running progression, sport-specific activities. Full integration of the tendon into demanding activities.</P>
        <P style={{ fontSize: 13.5 }}>Most people in this program will be working through Stages 2–3. The full body training sessions are designed at Stage 3 intensity — if you're still in Stage 1–2, reduce the load on tendon-relevant exercises (hip thrusts, step-ups, single-leg RDLs) and use the scaled options.</P>
      </Card>

      <SubTitle>What to avoid — always</SubTitle>
      <Warn>
        These positions and activities compress the gluteal tendon against the greater trochanter and should be avoided regardless of your current stage:
      </Warn>
      <Card>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, lineHeight: 1.9, color: COLORS.text }}>
          <li><strong>Sitting with legs crossed</strong> — especially right leg over left</li>
          <li><strong>Sleeping on the RIGHT side</strong> — sleep on the left side or back, with a pillow between the knees if side-lying</li>
          <li><strong>Standing with weight shifted onto the right hip</strong> — the "hangman's" posture</li>
          <li><strong>Stretching the right glute or ITB</strong> — piriformis stretches, figure-4 stretches, ITB foam rolling on the right side. The perceived tightness is muscle guarding, not muscle shortness — stretching worsens the compression</li>
          <li><strong>Foam rolling over the greater trochanter</strong> — directly compresses the irritated tendon</li>
          <li><strong>Deep chairs or car seats</strong> where hips flex beyond 90°</li>
          <li><strong>Crossover lunges or any exercise that brings the right leg across the body's midline</strong></li>
        </ul>
      </Card>
    </div>
  );
}

function RunningSection() {
  return (
    <div>
      <SectionTitle>Zone 2 Running</SectionTitle>
      <P>Running at Zone 2 intensity builds aerobic capacity without meaningful interference with muscle growth and provides cardiovascular health benefits that resistance training alone cannot match. Your heart rate target is <strong>142–155 bpm</strong>, based on your HRmax of ~196 bpm.</P>

      <SubTitle>How to know you're in Zone 2</SubTitle>
      <Card>
        <P style={{ fontSize: 13.5 }}>The simplest test: you can hold a conversation in complete sentences, but it requires some effort. If you can sing, you're going too easy. If you can only get out a few words before gasping, you're going too hard. Your watch should confirm you're between 142–155 bpm for the majority of the run.</P>
        <P style={{ fontSize: 13.5 }}>This will feel <strong>embarrassingly slow</strong> at first, especially as a newer runner. Many people need to walk-jog to stay in Zone 2. That's normal and correct. You are training your aerobic system, not your speed.</P>
      </Card>

      <SubTitle>Schedule</SubTitle>
      <P>2–3 sessions per week, always on non-lifting days (Tuesday, Thursday, optionally Saturday). Duration: 30–40 minutes. Do not exceed 40 minutes until the tendon has been stable in Stage 3 for at least 4 weeks.</P>

      <SubTitle>Tendinopathy-specific running modifications</SubTitle>
      <Card>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, lineHeight: 1.9, color: COLORS.text }}>
          <li><strong>Increase cadence by 5–10%:</strong> Target 170–180 steps per minute. Higher cadence reduces ground contact time and the hip adduction moment on each stride, reducing tendon compression. Many running watches display cadence in real time.</li>
          <li><strong>Run on flat, even surfaces:</strong> Avoid cambered roads (which tilt the pelvis) and hills (which increase gluteal demand before capacity is built).</li>
          <li><strong>Avoid unidirectional track running:</strong> If you use a track, change direction every few laps.</li>
          <li><strong>Monitor foot strike pattern:</strong> Avoid crossover gait (feet landing on or past the body's midline). Think about running on train tracks — each foot has its own rail.</li>
          <li><strong>Apply the 24-hour rule after every run:</strong> If right lateral hip pain increases overnight or the next morning, reduce run duration by 5–10 minutes and reassess.</li>
        </ul>
      </Card>

      <SubTitle>Before and after your run</SubTitle>
      <P><strong>Before:</strong> 5 minutes of brisk walking, then perform the isometric hip abduction holds from the Activate phase (3 × 30 sec — shorter than on lifting days). This provides pre-run tendon analgesia.</P>
      <P><strong>After:</strong> 5-minute walk cooldown, followed by standing hip CARs (5 circles each direction per leg). Do NOT stretch the right glute or ITB.</P>
    </div>
  );
}

function ProgressionSection() {
  return (
    <div>
      <SectionTitle>Progression Rules</SectionTitle>
      <P>This section summarizes how to progress over weeks and months. Follow these rules in order of priority.</P>

      <SubTitle>Rule 1: The 24-hour rule overrides everything</SubTitle>
      <Card>
        <P style={{ fontSize: 13.5, marginBottom: 0 }}>If your right lateral hip pain is worse the night after training, or worse the next morning, <strong>reduce load on tendon-relevant exercises by 20–30%</strong> at the next session and hold that level for one week before attempting to re-progress. Do not push through worsening tendon symptoms — ever.</P>
      </Card>

      <SubTitle>Rule 2: Double progression for strength exercises</SubTitle>
      <Card>
        <P style={{ fontSize: 13.5 }}>Each exercise has a rep range. Start at the bottom. Add reps across sessions. When you hit the top of the range for all sets at the target RIR, increase weight by the smallest available increment and reset to the bottom of the rep range.</P>
        <P style={{ fontSize: 13.5 }}><strong>Example:</strong> DB Split Squat prescribed at 3 × 8–12 reps, target 1–2 RIR.</P>
        <P style={{ fontSize: 13, color: COLORS.textMuted }}>Week 1: 3 × 8 @ 12 kg, 2 RIR → Week 2: 3 × 10 @ 12 kg, 2 RIR → Week 3: 3 × 12 @ 12 kg, 2 RIR → Week 4: 3 × 8 @ 14 kg, 2 RIR</P>
      </Card>

      <SubTitle>Rule 3: Deload every 4th week</SubTitle>
      <Card>
        <P style={{ fontSize: 13.5 }}>Keep the same exercises, same weights, and same intensity (RIR), but <strong>cut volume in half</strong> (e.g., 4 sets → 2 sets). Run at a reduced duration (20 min instead of 35 min). This allows connective tissue, tendons, and the nervous system to recover.</P>
        <P style={{ fontSize: 13.5 }}>You may feel restless during deloads. That's a sign you need them.</P>
      </Card>

      <SubTitle>Rule 4: Mesocycle progression</SubTitle>
      <Card>
        <div style={{ fontSize: 13.5, lineHeight: 2, color: COLORS.text }}>
          <div><strong style={{ color: COLORS.accent }}>Weeks 1–4 (Foundation):</strong> Learn the movements, establish 24-hour baseline, 8–12 weekly sets per muscle group. Tendon work at Stage 1–2.</div>
          <div><strong style={{ color: COLORS.accent }}>Weeks 5–8 (Development):</strong> Progress loads, increase to 12–16 weekly sets. Begin asymmetric loading emphasis. Tendon Stage 2–3.</div>
          <div><strong style={{ color: COLORS.accent }}>Weeks 9–12 (Intensification):</strong> Heavier loads on strength days, 14–18 weekly sets. Tendon stable at Stage 3. Consider adding a 4th day (Upper/Lower split).</div>
        </div>
      </Card>

      <SubTitle>Rule 5: When to modify an exercise</SubTitle>
      <P>If any exercise causes sharp pain (not the dull ache of working muscles), joint clicking that worsens over sessions, or consistently fails the 24-hour rule despite load reduction, <strong>substitute it</strong>. The exercise library contains alternatives for every pattern — no single exercise is irreplaceable.</P>
    </div>
  );
}

function WeekSection() {
  return (
    <div>
      <SectionTitle>Full Week Map</SectionTitle>
      <P>A complete bird's-eye view of everything you do in a typical training week.</P>
      {[
        { day: "Monday", main: "Full Body A — Strength", detail: "Warm-up (15 min) → Goblet Squat 4×4–6 → SA Row 4/3×4–6 → Floor Press 4×4–6 → SL RDL 3×6–8/leg → Pallof Press 3×10/side", evening: "Scoliosis correctives (15 min)" },
        { day: "Tuesday", main: "Zone 2 Run", detail: "Pre-run: 5 min walk + 3×30s isometric hip abduction → 30–40 min run at 142–155 bpm → 5 min walk cooldown + hip CARs", evening: "Scoliosis correctives (15 min)" },
        { day: "Wednesday", main: "Full Body B — Hypertrophy", detail: "Warm-up (15 min) → Split Squat 3×8–12/leg → Half-Kneel OHP 3×8–12/arm → Bent-Over Row 3×10–12 → Hip Thrust 3×10–15 → Side Plank L 3×30–45s", evening: "Scoliosis correctives (15 min)" },
        { day: "Thursday", main: "Zone 2 Run", detail: "Pre-run: 5 min walk + 3×30s isometric hip abduction → 30–40 min run → Cooldown → Banded lateral walks 2×15 steps/dir + hip hikes 2×12/side", evening: "Scoliosis correctives (15 min)" },
        { day: "Friday", main: "Full Body C — Volume", detail: "Warm-up (15 min) → Step-Up 3×12–15/leg → Lateral Raise 3×15–20 → Face Pull 3×15–20 → Curl 2×12–15 → Tricep Ext 2×12–15 → Dead Bug 2×8–10/side", evening: "Scoliosis correctives (15 min)" },
        { day: "Saturday", main: "Active Recovery", detail: "Optional: 20–30 min easy Zone 2 run OR 30–45 min brisk walk", evening: "Scoliosis correctives (10 min)" },
        { day: "Sunday", main: "Full Rest", detail: "No structured exercise", evening: "Scoliosis correctives — light (10 min, breathing + side plank only)" },
      ].map((d, i) => (
        <Card key={i} style={{ padding: "14px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <span style={{ fontWeight: 800, fontSize: 14, color: COLORS.accent }}>{d.day}</span>
            <span style={{ fontSize: 12, color: COLORS.textMuted }}>{d.main}</span>
          </div>
          <P style={{ fontSize: 13, marginBottom: 6 }}>{d.detail}</P>
          <P style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 0 }}>{d.evening}</P>
        </Card>
      ))}
    </div>
  );
}

function FAQSection() {
  return (
    <div>
      <SectionTitle>Key Warnings and FAQs</SectionTitle>

      <Warn>Do NOT stretch the right glute, piriformis, or ITB. The perceived tightness is muscle guarding — the tendon's way of protecting itself. Stretching pushes the tendon against the bone, worsening the pathology. This is the single most common mistake in gluteal tendinopathy self-management.</Warn>

      <Warn>Do NOT foam roll over the right greater trochanter (the bony point on the outside of the hip). This directly compresses the irritated tendon. You may foam roll the quads, hamstrings, and calves freely.</Warn>

      <Warn>Do NOT sleep on the right side. Sleep on the left side with a pillow between the knees, or on your back with a pillow under the knees. This eliminates 6–8 hours of nightly tendon compression.</Warn>

      <Warn>Do NOT ignore worsening night pain. This is the earliest and most reliable indicator of tendon overload. If it appears, reduce the next session's tendon-relevant exercises by 20–30% and reassess.</Warn>

      <SubTitle>Frequently asked questions</SubTitle>

      <Card>
        <P style={{ fontWeight: 700, color: COLORS.accent, marginBottom: 4, fontSize: 14 }}>Can I do more than 3 lifting days per week?</P>
        <P style={{ fontSize: 13.5 }}>Not initially. The 3-day structure is deliberately conservative to preserve recovery bandwidth for tendon adaptation and daily corrective work. After 8–12 weeks, if the tendon is stable in Stage 3, you can transition to a 4-day upper/lower split. More is not always better with concurrent rehabilitation.</P>
      </Card>
      <Card>
        <P style={{ fontWeight: 700, color: COLORS.accent, marginBottom: 4, fontSize: 14 }}>What if I miss a day?</P>
        <P style={{ fontSize: 13.5 }}>Simply continue with the next scheduled session. Do not try to "make up" a missed day by combining sessions — this spikes volume and tendon load. The scoliosis correctives should still be done daily even if you miss a lifting day.</P>
      </Card>
      <Card>
        <P style={{ fontWeight: 700, color: COLORS.accent, marginBottom: 4, fontSize: 14 }}>Should I feel pain during exercises?</P>
        <P style={{ fontSize: 13.5 }}>Mild discomfort up to 3/10 at the lateral hip is acceptable during exercise, provided it settles within minutes of stopping and does not worsen overnight. Sharp pain, pinching, or pain above 5/10 means you should reduce the load or modify the exercise. Normal muscle burning and fatigue (the "pump") is fine and expected.</P>
      </Card>
      <Card>
        <P style={{ fontWeight: 700, color: COLORS.accent, marginBottom: 4, fontSize: 14 }}>How long until I see results?</P>
        <P style={{ fontSize: 13.5 }}>Strength gains: 2–4 weeks (neural adaptations). Visible muscle growth: 6–12 weeks. Tendinopathy improvement: 4–12 weeks for meaningful symptom reduction (the LEAP trial showed significant improvement by 8 weeks). Scoliosis postural improvements: 6–12 weeks of daily corrective work for noticeable changes in awareness and muscle symmetry. Scoliosis is a structural condition — corrective exercise manages it and improves function, but does not "cure" or eliminate the curve in adults.</P>
      </Card>
      <Card>
        <P style={{ fontWeight: 700, color: COLORS.accent, marginBottom: 4, fontSize: 14 }}>Can I add exercises?</P>
        <P style={{ fontSize: 13.5 }}>Not during the first 4-week block. After that, you can add 1–2 exercises per session if recovery allows, staying within 20 sets per muscle group per week. Always monitor the 24-hour response when adding volume.</P>
      </Card>
    </div>
  );
}

// --- MAIN APP ---
export default function Handbook() {
  const [activeSection, setActiveSection] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <OverviewSection />;
      case "principles": return <PrinciplesSection />;
      case "warmup": return <WarmupSection />;
      case "exercises": return <ExerciseLibrarySection />;
      case "dayA": return <DaySection day="A" title="Day A — Strength Focus" focus="Heavy compound lifts" rir="2–3" />;
      case "dayB": return <DaySection day="B" title="Day B — Hypertrophy Focus" focus="Moderate load, higher reps" rir="1–2" />;
      case "dayC": return <DaySection day="C" title="Day C — Volume Focus" focus="Light load, high reps + accessories" rir="1" />;
      case "correctives": return <CorrectivesSection />;
      case "tendon": return <TendonSection />;
      case "running": return <RunningSection />;
      case "progression": return <ProgressionSection />;
      case "week": return <WeekSection />;
      case "faq": return <FAQSection />;
      default: return <OverviewSection />;
    }
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${COLORS.border}`, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: COLORS.bg, zIndex: 100 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.accent }}>Training Handbook</div>
          <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>Full Body · Scoliosis · Tendon Rehab</div>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "6px 14px", color: COLORS.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
        >
          {menuOpen ? "Close" : "Navigate ▾"}
        </button>
      </div>

      {/* Nav dropdown */}
      {menuOpen && (
        <div style={{ position: "sticky", top: 52, zIndex: 99, background: COLORS.bgCard, borderBottom: `1px solid ${COLORS.border}`, padding: "8px 12px", display: "flex", flexWrap: "wrap", gap: 4 }}>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => { setActiveSection(s.id); setMenuOpen(false); }}
              style={{
                padding: "6px 12px",
                borderRadius: 5,
                border: `1px solid ${activeSection === s.id ? COLORS.accent : COLORS.border}`,
                background: activeSection === s.id ? COLORS.accentGlow : "transparent",
                color: activeSection === s.id ? COLORS.accent : COLORS.textMuted,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <span style={{ marginRight: 4, fontSize: 10 }}>{s.icon}</span>{s.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 80px" }}>
        {renderSection()}

        {/* Nav footer */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, paddingTop: 20, borderTop: `1px solid ${COLORS.border}` }}>
          {SECTIONS.findIndex(s => s.id === activeSection) > 0 ? (
            <button
              onClick={() => setActiveSection(SECTIONS[SECTIONS.findIndex(s => s.id === activeSection) - 1].id)}
              style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "8px 16px", color: COLORS.textMuted, fontSize: 13, cursor: "pointer" }}
            >
              ← {SECTIONS[SECTIONS.findIndex(s => s.id === activeSection) - 1].label}
            </button>
          ) : <div />}
          {SECTIONS.findIndex(s => s.id === activeSection) < SECTIONS.length - 1 ? (
            <button
              onClick={() => setActiveSection(SECTIONS[SECTIONS.findIndex(s => s.id === activeSection) + 1].id)}
              style={{ background: "none", border: `1px solid ${COLORS.accentDim}`, borderRadius: 6, padding: "8px 16px", color: COLORS.accent, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              {SECTIONS[SECTIONS.findIndex(s => s.id === activeSection) + 1].label} →
            </button>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
