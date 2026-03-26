import { useState, useEffect } from "react";

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

  // Tracker state
  const [trackerEntries, setTrackerEntries] = useState([]);
  const [trackerLoaded, setTrackerLoaded] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickName, setQuickName] = useState("");
  const [quickCal, setQuickCal] = useState("");
  const [quickPro, setQuickPro] = useState("");
  const [quickCarb, setQuickCarb] = useState("");
  const [quickFat, setQuickFat] = useState("");

  // Load tracker from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ftm-tracker");
      if (stored) setTrackerEntries(JSON.parse(stored));
    } catch (e) { /* no data */ }
    setTrackerLoaded(true);
  }, []);

  // Save tracker to localStorage
  useEffect(() => {
    if (trackerLoaded) {
      localStorage.setItem("ftm-tracker", JSON.stringify(trackerEntries));
    }
  }, [trackerEntries, trackerLoaded]);

  const todayKey = new Date().toISOString().slice(0, 10);
  const todayEntries = trackerEntries.filter(e => e.date === todayKey);
  const totals = todayEntries.reduce((a, e) => ({
    calories: a.calories + e.calories,
    protein: a.protein + e.protein,
    carbs: a.carbs + e.carbs,
    fat: a.fat + e.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const addTrackerEntry = () => {
    if (!quickName.trim() || !quickCal) return;
    const entry = {
      id: Date.now().toString(),
      name: quickName.trim(),
      calories: Number(quickCal) || 0,
      protein: Number(quickPro) || 0,
      carbs: Number(quickCarb) || 0,
      fat: Number(quickFat) || 0,
      date: todayKey,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
    setTrackerEntries(prev => [entry, ...prev]);
    setQuickName(""); setQuickCal(""); setQuickPro(""); setQuickCarb(""); setQuickFat("");
    setShowQuickAdd(false);
  };

  const deleteTrackerEntry = (id) => {
    setTrackerEntries(prev => prev.filter(e => e.id !== id));
  };

  const clearTrackerToday = () => {
    setTrackerEntries(prev => prev.filter(e => e.date !== todayKey));
  };

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
        <div style={{ display: "flex", gap: "4px", marginBottom: "10px", background: "#0d0d14", borderRadius: "10px", padding: "4px" }}>
          {[
            { id: "phases", label: "Overview" },
            { id: "training", label: "Training" },
            { id: "meals", label: "Meals" },
            { id: "week", label: "Week" },
            { id: "rules", label: "Rules" },
          ].map(tab => (
            <button key={tab.id} onClick={() => { setActiveView(tab.id); setActiveWorkout(null); }} style={{
              flex: 1, padding: "10px", border: "none", borderRadius: "8px", cursor: "pointer",
              background: activeView === tab.id && activeView !== "tracker" ? `${phase.color}20` : "transparent",
              color: activeView === tab.id && activeView !== "tracker" ? phase.color : "#555",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 600,
              transition: "all 0.2s ease",
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tracker button */}
        <button onClick={() => { setActiveView("tracker"); setActiveWorkout(null); }} style={{
          width: "100%", padding: "14px", marginBottom: "24px",
          borderRadius: "12px", border: "none", cursor: "pointer",
          background: activeView === "tracker"
            ? `linear-gradient(135deg, ${phase.color}25, ${phase.color}10)`
            : "#0d0d14",
          outline: activeView === "tracker" ? `1.5px solid ${phase.color}50` : "1px solid #1a1a2e",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          transition: "all 0.3s ease",
          boxShadow: activeView === "tracker" ? `0 0 24px ${phase.glow}` : "none",
        }}>
          <span style={{ fontSize: "16px" }}>📊</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "13px",
            fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
            color: activeView === "tracker" ? phase.color : "#666",
            transition: "color 0.3s ease",
          }}>
            Macro Tracker
          </span>
          {totals.protein > 0 && activeView !== "tracker" && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
              color: totals.protein >= phase.protein ? phase.color : "#555",
              background: totals.protein >= phase.protein ? `${phase.color}15` : "#1a1a2e",
              padding: "3px 8px", borderRadius: "6px",
            }}>
              {Math.round(totals.protein)}g P
            </span>
          )}
        </button>

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

        {/* ===== TRACKER ===== */}
        {activeView === "tracker" && (
          <div>
            {/* Protein - hero stat */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ display: "inline-block", position: "relative" }}>
                <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="80" cy="80" r="68" fill="none" stroke="#1a1a2e" strokeWidth="10" />
                  <circle cx="80" cy="80" r="68" fill="none"
                    stroke={totals.protein >= phase.protein ? phase.color : "#a8e6cf"}
                    strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 68}
                    strokeDashoffset={2 * Math.PI * 68 - Math.min(totals.protein / phase.protein, 1) * 2 * Math.PI * 68}
                    style={{
                      transition: "stroke-dashoffset 0.6s ease",
                      filter: totals.protein >= phase.protein ? `drop-shadow(0 0 10px ${phase.glow})` : "none",
                    }} />
                </svg>
                <div style={{
                  position: "absolute", top: 0, left: 0, width: "160px", height: "160px",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px",
                    fontWeight: 700, color: totals.protein >= phase.protein ? phase.color : "#fff", lineHeight: 1,
                  }}>{Math.round(totals.protein)}</div>
                  <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#555", marginTop: "4px" }}>/ {phase.protein}g</div>
                </div>
              </div>
              <div style={{
                fontSize: "11px", letterSpacing: "3px", color: totals.protein >= phase.protein ? phase.color : "#555",
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, marginTop: "8px",
              }}>PROTEIN</div>
            </div>

            {/* Secondary macros row */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "20px",
            }}>
              {[
                { label: "CALORIES", val: totals.calories, max: phase.calories, unit: "kcal", color: "#fff" },
                { label: "CARBS", val: totals.carbs, max: phase.carbs, unit: "g", color: "#ffd3b6" },
                { label: "FAT", val: totals.fat, max: phase.fats, unit: "g", color: "#ffb7c5" },
              ].map((m, i) => {
                const pct = Math.min(m.val / m.max, 1) * 100;
                const over = m.val > m.max;
                return (
                  <div key={i} style={{
                    background: "#0d0d14", border: "1px solid #1a1a2e", borderRadius: "12px",
                    padding: "14px 12px", textAlign: "center", position: "relative", overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, height: "3px",
                      width: `${pct}%`,
                      background: over ? "#ff4d6a" : m.color,
                      opacity: 0.6, transition: "width 0.6s ease", borderRadius: "0 3px 0 0",
                    }} />
                    <div style={{ fontSize: "9px", letterSpacing: "1.5px", color: "#555", marginBottom: "6px" }}>{m.label}</div>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px",
                      fontWeight: 700, color: over ? "#ff4d6a" : "#fff", lineHeight: 1,
                    }}>{Math.round(m.val)}</div>
                    <div style={{ fontSize: "9px", color: "#444", marginTop: "4px" }}>/ {m.max}{m.unit}</div>
                  </div>
                );
              })}
            </div>

            {/* Chat hint */}
            <div style={{
              background: "#0d0d14", border: "1px solid #1a1a2e",
              borderRadius: "12px", padding: "12px 14px", marginBottom: "16px",
              display: "flex", gap: "10px", alignItems: "center",
            }}>
              <span style={{ fontSize: "14px" }}>💬</span>
              <span style={{ fontSize: "11px", color: "#555", lineHeight: 1.4 }}>
                Tell Claude what you ate in chat — get macros to log here
              </span>
            </div>

            {/* Quick add */}
            {!showQuickAdd ? (
              <button onClick={() => setShowQuickAdd(true)} style={{
                width: "100%", padding: "14px", borderRadius: "12px",
                background: "transparent", border: `1px dashed ${phase.color}30`,
                color: "#555", cursor: "pointer", fontSize: "13px",
                fontFamily: "'JetBrains Mono', monospace", fontWeight: 500,
                marginBottom: "16px", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = phase.color + "60"; e.currentTarget.style.color = phase.color; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = phase.color + "30"; e.currentTarget.style.color = "#555"; }}
              >
                + Add food
              </button>
            ) : (
              <div style={{
                background: "#0d0d14", border: "1px solid #1a1a2e", borderRadius: "14px",
                padding: "16px", marginBottom: "16px",
              }}>
                <input value={quickName} onChange={e => setQuickName(e.target.value)} placeholder="What did you eat?"
                  onKeyDown={e => e.key === "Enter" && addTrackerEntry()}
                  style={{
                    width: "100%", background: "#0a0a0f", border: "1px solid #1a1a2e", borderRadius: "10px",
                    padding: "10px 14px", color: "#fff", fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif",
                    outline: "none", marginBottom: "8px",
                  }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "10px" }}>
                  {[
                    { val: quickCal, set: setQuickCal, ph: "Calories" },
                    { val: quickPro, set: setQuickPro, ph: "Protein (g)" },
                    { val: quickCarb, set: setQuickCarb, ph: "Carbs (g)" },
                    { val: quickFat, set: setQuickFat, ph: "Fat (g)" },
                  ].map((f, i) => (
                    <input key={i} type="number" value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                      style={{
                        background: "#0a0a0f", border: "1px solid #1a1a2e", borderRadius: "10px",
                        padding: "10px 12px", color: "#ddd", fontSize: "13px",
                        fontFamily: "'JetBrains Mono', monospace", outline: "none", width: "100%",
                      }}
                      onFocus={e => e.target.style.borderColor = phase.color + "40"}
                      onBlur={e => e.target.style.borderColor = "#1a1a2e"}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => setShowQuickAdd(false)} style={{
                    flex: 1, padding: "10px", borderRadius: "10px", background: "transparent",
                    border: "1px solid #1a1a2e", color: "#555", cursor: "pointer",
                    fontSize: "12px", fontFamily: "'JetBrains Mono', monospace",
                  }}>Cancel</button>
                  <button onClick={addTrackerEntry} style={{
                    flex: 2, padding: "10px", borderRadius: "10px",
                    background: `${phase.color}15`, border: `1px solid ${phase.color}30`,
                    color: phase.color, cursor: "pointer", fontSize: "12px",
                    fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = `${phase.color}25`}
                    onMouseLeave={e => e.currentTarget.style.background = `${phase.color}15`}
                  >Add</button>
                </div>
              </div>
            )}

            {/* Today's entries */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#555", fontFamily: "'JetBrains Mono', monospace" }}>
                TODAY ({todayEntries.length})
              </div>
              {todayEntries.length > 0 && (
                <button onClick={clearTrackerToday} style={{
                  background: "none", border: "none", color: "#333", cursor: "pointer",
                  fontSize: "10px", fontFamily: "'JetBrains Mono', monospace",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "#ff4d6a"}
                  onMouseLeave={e => e.currentTarget.style.color = "#333"}
                >CLEAR DAY</button>
              )}
            </div>

            {todayEntries.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "32px 20px", color: "#333",
                fontSize: "12px", fontFamily: "'JetBrains Mono', monospace",
                border: "1px solid #1a1a2e", borderRadius: "12px", background: "#0d0d14",
              }}>
                Nothing logged yet
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {todayEntries.map(entry => (
                  <div key={entry.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "#0d0d14", borderRadius: "12px", padding: "12px 14px",
                    border: "1px solid #1a1a2e",
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px",
                        fontWeight: 600, color: "#fff",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      }}>{entry.name}</div>
                      <div style={{ fontSize: "10px", color: "#555", marginTop: "3px", display: "flex", gap: "8px" }}>
                        <span style={{ color: "#a8e6cf" }}>{entry.protein}g P</span>
                        <span style={{ color: "#ffd3b6" }}>{entry.carbs}g C</span>
                        <span style={{ color: "#ffb7c5" }}>{entry.fat}g F</span>
                        <span style={{ color: "#333" }}>{entry.time}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
                        fontWeight: 600, color: "#666",
                      }}>{entry.calories}</span>
                      <button onClick={() => deleteTrackerEntry(entry.id)} style={{
                        background: "none", border: "none", color: "#333", cursor: "pointer",
                        fontSize: "16px", padding: "2px 4px", lineHeight: 1,
                      }}
                        onMouseEnter={e => e.currentTarget.style.color = "#ff4d6a"}
                        onMouseLeave={e => e.currentTarget.style.color = "#333"}
                      >×</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Protein status footer */}
            {totals.protein > 0 && (
              <div style={{
                marginTop: "16px", textAlign: "center", padding: "10px",
                fontSize: "10px", fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "1px",
                color: totals.protein >= phase.protein ? phase.color : "#444",
              }}>
                {totals.protein >= phase.protein
                  ? `⚡ TARGET HIT — ${Math.round(totals.protein)}g PROTEIN`
                  : `${phase.protein - Math.round(totals.protein)}g protein to go`}
              </div>
            )}
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
