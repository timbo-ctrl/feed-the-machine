import { useState } from "react";

const phases = [
  {
    id: 1,
    name: "The Foundation",
    weeks: "Weeks 1–4",
    color: "#00D2FF",
    glow: "rgba(0,210,255,0.3)",
    steps: "12k steps",
    lifting: "2 Upper / 2 Lower",
    cardio: "3 × 20 min",
    calories: 2100,
    carbs: 175,
    protein: 190,
    fats: 55,
    calNote: null,
  },
  {
    id: 2,
    name: "The Ramp-Up",
    weeks: "Weeks 5–8",
    color: "#FF6B35",
    glow: "rgba(255,107,53,0.3)",
    steps: "15k steps",
    lifting: "2 Upper / 2 Lower",
    cardio: "4 × 30 min",
    calories: 1900,
    carbs: 125,
    protein: 190,
    fats: 55,
    calNote: "−50g carbs / −200 cals",
  },
  {
    id: 3,
    name: "The Peak",
    weeks: "Weeks 9–12",
    color: "#FF2D87",
    glow: "rgba(255,45,135,0.3)",
    steps: "17–20k steps",
    lifting: "2 Upper / 2 Lower",
    cardio: "4–5 × 30–45 min",
    calories: 1700,
    carbs: 75,
    protein: 190,
    fats: 55,
    calNote: "−50g carbs / −200 cals",
  },
];

const workouts = {
  upper1: {
    title: "Upper 1",
    emoji: "🔥",
    exercises: [
      { name: "Incline Bench Press", sets: "3 × 6–8" },
      { name: "Wide Grip Pull-Up", sets: "3 × max reps" },
      { name: "Machine Chest Press", sets: "3 × 10–12" },
      { name: "Machine Cable Row", sets: "3 × 10–12" },
      { name: "Cable Lateral Raise", sets: "2–3 × 10" },
      { name: "EZ Bicep Curl ⟷ Rope Tricep Ext", sets: "3 × 10 (superset)" },
      { name: "Cable Crunch", sets: "3 × 12" },
    ],
  },
  lower1: {
    title: "Lower 1",
    emoji: "🦵",
    exercises: [
      { name: "Seated Leg Curl", sets: "3–4 × 8–10" },
      { name: "Leg Press", sets: "3 × 10–12" },
      { name: "Bulgarian Split Squat", sets: "2–3 × 10 each leg" },
      { name: "Leg Extension", sets: "3 × 12–15" },
      { name: "Standing Calf Raise", sets: "3 × 12" },
    ],
  },
  upper2: {
    title: "Upper 2",
    emoji: "💪",
    exercises: [
      { name: "Flat DB Bench", sets: "3 × 8–10" },
      { name: "Close Grip Pulldown", sets: "3 × 12" },
      { name: "Machine Shoulder Press", sets: "3 × 10" },
      { name: "Low Cable Fly", sets: "3 × 10" },
      { name: "Plate Loaded Row", sets: "2–3 × 10" },
      { name: "Cable Bicep Curl", sets: "2–3 × 12" },
      { name: "OH Tricep Extension", sets: "2–3 × 12" },
      { name: "Hanging Knee Raise", sets: "3 × max reps" },
    ],
  },
};

const weekSchedule = [
  { day: "MON", label: "Upper 1", type: "lift", key: "upper1" },
  { day: "TUE", label: "Cardio", type: "cardio", key: null },
  { day: "WED", label: "Lower 1", type: "lift", key: "lower1" },
  { day: "THU", label: "Rest", type: "rest", key: null },
  { day: "FRI", label: "Upper 2", type: "lift", key: "upper2" },
  { day: "SAT", label: "Cardio", type: "cardio", key: null },
  { day: "SUN", label: "Rest", type: "rest", key: null },
];

const meals = [
  {
    phaseId: 1,
    slots: [
      { time: "Meal 1", emoji: "🍳", name: "Eggs & Toast", desc: "Whole eggs, sourdough, fruit on the side" },
      { time: "Meal 2", emoji: "🍗", name: "Chicken & Rice Bowl", desc: "Grilled chicken, white rice, veggies" },
      { time: "Meal 3", emoji: "🥩", name: "Lean Beef Stir-Fry", desc: "Ground beef, peppers, rice or potatoes" },
      { time: "Meal 4", emoji: "🐟", name: "Fish & Sweet Potato", desc: "White fish or salmon, roasted sweet potato" },
      { time: "Snack", emoji: "🥜", name: "Greek Yogurt & Nuts", desc: "High-protein yogurt, small handful of almonds" },
    ],
  },
  {
    phaseId: 2,
    slots: [
      { time: "Meal 1", emoji: "🍳", name: "Egg White Omelette", desc: "Egg whites, spinach, light cheese, berries" },
      { time: "Meal 2", emoji: "🍗", name: "Chicken & Veggies", desc: "Grilled chicken, big salad, light dressing" },
      { time: "Meal 3", emoji: "🥩", name: "Turkey Lettuce Wraps", desc: "Lean ground turkey, lettuce cups, salsa" },
      { time: "Meal 4", emoji: "🐟", name: "Salmon & Greens", desc: "Baked salmon, steamed broccoli, small rice portion" },
      { time: "Snack", emoji: "🥤", name: "Protein Shake", desc: "Whey protein, water or almond milk, banana" },
    ],
  },
  {
    phaseId: 3,
    slots: [
      { time: "Meal 1", emoji: "🍳", name: "Eggs & Avocado", desc: "Whole eggs, half avocado, no bread" },
      { time: "Meal 2", emoji: "🍗", name: "Chicken Salad Bowl", desc: "Grilled chicken, mixed greens, olive oil" },
      { time: "Meal 3", emoji: "🥩", name: "Lean Burger Patties", desc: "Extra-lean beef patties, side salad, no bun" },
      { time: "Meal 4", emoji: "🐟", name: "White Fish & Asparagus", desc: "Cod or tilapia, roasted asparagus, lemon" },
      { time: "Snack", emoji: "🥤", name: "Casein Shake", desc: "Slow-digesting protein, water, before bed" },
    ],
  },
];

export default function App() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [activeView, setActiveView] = useState("phases");
  const phase = phases[activePhase];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#f0f0f0",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      position: "relative",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: "-200px", right: "-200px",
        width: "600px", height: "600px", borderRadius: "50%",
        background: `radial-gradient(circle, ${phase.glow} 0%, transparent 70%)`,
        transition: "background 0.8s ease", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "-150px", left: "-150px",
        width: "400px", height: "400px", borderRadius: "50%",
        background: `radial-gradient(circle, ${phase.glow} 0%, transparent 70%)`,
        opacity: 0.4, transition: "background 0.8s ease", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "32px 20px" }}>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{
            fontSize: "11px", letterSpacing: "4px", color: phase.color,
            textTransform: "uppercase", marginBottom: "8px",
            transition: "color 0.5s ease",
          }}>
            12-WEEK CUT — 209 LBS → LEAN
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700,
            margin: 0, lineHeight: 1.1,
            background: `linear-gradient(135deg, ${phase.color}, #ffffff)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            transition: "all 0.5s ease",
          }}>
            {phase.name}
          </h1>
          <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>{phase.weeks}</div>
        </div>

        {/* Phase Selector */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
          {phases.map((p, i) => (
            <button key={p.id} onClick={() => { setActivePhase(i); setActiveWorkout(null); }} style={{
              flex: 1, padding: "14px 12px", border: `1.5px solid ${i === activePhase ? p.color : "#1a1a2e"}`,
              borderRadius: "12px", cursor: "pointer",
              background: i === activePhase ? `${p.color}15` : "#0d0d14",
              color: i === activePhase ? p.color : "#555",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
              fontWeight: i === activePhase ? 700 : 400,
              letterSpacing: "1px", textTransform: "uppercase",
              transition: "all 0.3s ease",
              boxShadow: i === activePhase ? `0 0 20px ${p.glow}` : "none",
            }}>
              <div style={{ fontSize: "13px", marginBottom: "4px" }}>Phase {p.id}</div>
              <div style={{ fontSize: "10px", opacity: 0.7 }}>{p.weeks}</div>
            </button>
          ))}
        </div>

        {/* Nav Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", background: "#0d0d14", borderRadius: "10px", padding: "4px" }}>
          {[
            { id: "phases", label: "Overview" },
            { id: "training", label: "Training" },
            { id: "meals", label: "Meals" },
            { id: "week", label: "Week View" },
            { id: "rules", label: "Rules" },
          ].map(tab => (
            <button key={tab.id} onClick={() => { setActiveView(tab.id); setActiveWorkout(null); }} style={{
              flex: 1, padding: "10px", border: "none", borderRadius: "8px", cursor: "pointer",
              background: activeView === tab.id ? `${phase.color}20` : "transparent",
              color: activeView === tab.id ? phase.color : "#555",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 600,
              transition: "all 0.2s ease",
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== OVERVIEW ===== */}
        {activeView === "phases" && (
          <div>
            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "24px" }}>
              {[
                { label: "CALORIES", value: phase.calories, unit: "kcal" },
                { label: "PROTEIN", value: `${phase.protein}g`, unit: "" },
                { label: "CARBS", value: `${phase.carbs}g`, unit: "" },
                { label: "FATS", value: `${phase.fats}g`, unit: "" },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: "#0d0d14", border: "1px solid #1a1a2e", borderRadius: "14px",
                  padding: "18px", position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, height: "2px",
                    width: `${(i === 0 ? phase.calories / 2100 : i === 2 ? phase.carbs / 175 : 1) * 100}%`,
                    background: phase.color, transition: "all 0.6s ease",
                  }} />
                  <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#555", marginBottom: "8px" }}>{stat.label}</div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px",
                    fontWeight: 700, color: "#fff",
                  }}>
                    {stat.value}<span style={{ fontSize: "14px", color: "#555", marginLeft: "2px" }}>{stat.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity targets */}
            <div style={{
              background: "#0d0d14", border: "1px solid #1a1a2e", borderRadius: "14px",
              padding: "20px", marginBottom: "16px",
            }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#555", marginBottom: "16px" }}>ACTIVITY TARGETS</div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                {[
                  { icon: "👟", label: "Steps", value: phase.steps },
                  { icon: "🏋️", label: "Lifting", value: phase.lifting },
                  { icon: "🫀", label: "Cardio", value: phase.cardio },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: "center", flex: 1 }}>
                    <div style={{ fontSize: "24px", marginBottom: "6px" }}>{item.icon}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 600, color: "#fff" }}>{item.value}</div>
                    <div style={{ fontSize: "10px", color: "#555", marginTop: "2px" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {phase.calNote && (
              <div style={{
                background: `${phase.color}10`, border: `1px solid ${phase.color}30`,
                borderRadius: "10px", padding: "12px 16px",
                fontSize: "12px", color: phase.color, textAlign: "center",
              }}>
                ⚡ {phase.calNote} from previous phase
              </div>
            )}
          </div>
        )}

        {/* ===== TRAINING ===== */}
        {activeView === "training" && !activeWorkout && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {Object.entries(workouts).map(([key, w]) => (
              <button key={key} onClick={() => setActiveWorkout(key)} style={{
                background: "#0d0d14", border: "1px solid #1a1a2e", borderRadius: "14px",
                padding: "20px", cursor: "pointer", textAlign: "left",
                transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "16px",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = phase.color; e.currentTarget.style.boxShadow = `0 0 20px ${phase.glow}`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a2e"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: "36px" }}>{w.emoji}</div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 700, color: "#fff" }}>{w.title}</div>
                  <div style={{ fontSize: "12px", color: "#555", marginTop: "2px" }}>{w.exercises.length} exercises</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: "20px", color: "#333" }}>→</div>
              </button>
            ))}
          </div>
        )}

        {/* ===== WORKOUT DETAIL ===== */}
        {activeView === "training" && activeWorkout && (
          <div>
            <button onClick={() => setActiveWorkout(null)} style={{
              background: "none", border: "none", color: phase.color, cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
              marginBottom: "16px", padding: 0,
            }}>
              ← Back to workouts
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ fontSize: "36px" }}>{workouts[activeWorkout].emoji}</div>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px",
                fontWeight: 700, margin: 0, color: "#fff",
              }}>
                {workouts[activeWorkout].title}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {workouts[activeWorkout].exercises.map((ex, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: i % 2 === 0 ? "#0d0d14" : "#111118",
                  borderRadius: "10px", padding: "14px 16px",
                  borderLeft: `3px solid ${phase.color}${i === 0 ? "ff" : "50"}`,
                }}>
                  <div>
                    <div style={{ fontSize: "14px", color: "#ddd", fontWeight: 500 }}>{ex.name}</div>
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "13px",
                    color: phase.color, fontWeight: 600, whiteSpace: "nowrap",
                  }}>
                    {ex.sets}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== MEALS ===== */}
        {activeView === "meals" && (
          <div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#555", marginBottom: "4px" }}>SAMPLE DAY</div>
              <div style={{ fontSize: "13px", color: "#888" }}>
                ~{phase.calories} kcal • {phase.protein}g protein • {phase.carbs}g carbs • {phase.fats}g fats
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {(meals.find(m => m.phaseId === phase.id)?.slots || []).map((slot, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  background: "#0d0d14", borderRadius: "12px", padding: "16px",
                  border: "1px solid #1a1a2e",
                  borderLeft: `3px solid ${phase.color}${i === 0 ? "ff" : "60"}`,
                }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "12px",
                    background: `${phase.color}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "24px", flexShrink: 0,
                  }}>
                    {slot.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "10px", letterSpacing: "1.5px", color: phase.color, marginBottom: "4px", textTransform: "uppercase" }}>{slot.time}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#fff" }}>{slot.name}</div>
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "3px" }}>{slot.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: "16px", background: `${phase.color}08`, border: `1px solid ${phase.color}20`,
              borderRadius: "10px", padding: "12px 16px",
              fontSize: "12px", color: "#777", textAlign: "center", lineHeight: 1.6,
            }}>
              💡 These are templates — swap proteins and veggies freely. Hit your protein target first, then fill carbs and fats.
            </div>
          </div>
        )}

        {/* ===== WEEK VIEW ===== */}
        {activeView === "week" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {weekSchedule.map((d, i) => {
              const isLift = d.type === "lift";
              const isCardio = d.type === "cardio";
              const isRest = d.type === "rest";
              return (
                <div key={i}
                  onClick={() => { if (d.key) { setActiveView("training"); setActiveWorkout(d.key); }}}
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    background: "#0d0d14", borderRadius: "12px", padding: "14px 16px",
                    border: `1px solid ${isLift ? phase.color + "40" : "#1a1a2e"}`,
                    cursor: d.key ? "pointer" : "default",
                    transition: "all 0.2s ease",
                    opacity: isRest ? 0.5 : 1,
                  }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "10px",
                    background: isLift ? `${phase.color}20` : isCardio ? "#1a1a2e" : "#0a0a0f",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: "12px", color: isLift ? phase.color : "#555",
                  }}>
                    {d.day}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px",
                      fontWeight: 600, color: isRest ? "#444" : "#fff",
                    }}>
                      {d.label}
                    </div>
                    <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>
                      {isLift ? "45–60 min • RPE 8–9 compounds" : isCardio ? `Zone 2–3 • ${phase.cardio.split("×")[1] || "20 min"}` : "Steps + recovery"}
                    </div>
                  </div>
                  {d.key && <div style={{ fontSize: "16px", color: "#333" }}>→</div>}
                </div>
              );
            })}
          </div>
        )}

        {/* ===== RULES ===== */}
        {activeView === "rules" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { emoji: "🔋", title: "Refeed Days", text: "When energy crashes or lifts tank, have a high-carb day at ~2,500 cals. Could be week 2 or week 6. Be intuitive — take it when it's there." },
              { emoji: "💚", title: "Cardio Zones", text: "Zone 2–3 for the majority. Conversational pace. You can sustain it longer, burn more total cals, and avoid burnout/sickness/injury." },
              { emoji: "🥩", title: "Protein Priority", text: "190g daily (2g/kg). No need for 250g. Spread across 4 meals at ~48g each. You won't lose muscle at this level." },
              { emoji: "🥦", title: "Whole Foods First", text: "Make 2,100 cals stretch with volume-dense foods. Lean into cooking hungry — homemade burgers, big salads, low-cal sauces." },
              { emoji: "📊", title: "Tracking", text: "Weigh daily, average weekly. Progress photos every 2 weeks. If weekly avg stalls for 2 weeks straight, bump steps before cutting more cals." },
              { emoji: "🧠", title: "Your Personality Matters", text: "Cals are aggressive because you've done this. Steps ease in because that's sustainable. If you need comfort, the refeed is there. No shame." },
            ].map((rule, i) => (
              <div key={i} style={{
                background: "#0d0d14", border: "1px solid #1a1a2e", borderRadius: "14px",
                padding: "18px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "22px" }}>{rule.emoji}</span>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px",
                    fontWeight: 700, color: "#fff",
                  }}>{rule.title}</span>
                </div>
                <div style={{ fontSize: "13px", lineHeight: 1.6, color: "#999" }}>{rule.text}</div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: "48px", paddingTop: "20px",
          borderTop: "1px solid #1a1a2e", fontSize: "11px",
          color: "#333", textAlign: "center",
        }}>
          209 lbs • ~30% BF • Target 15% • 12 weeks • Aggressive cals + phasic steps
        </div>
      </div>
    </div>
  );
}
