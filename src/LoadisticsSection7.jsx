import React, { useMemo, useState, useEffect } from "react";import { SlideNavigation } from "./components/ui/SlideNavigation";

import loadisticsLogo from "./assets/Loadistics-Logo.jpg";

// ===== Minimal UI primitives (no external deps) =====
function Button({ children, onClick, disabled, variant = "solid", className = "" }) {
  const base = "px-4 py-2 rounded-xl text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";
  const style = variant === "outline"
    ? "border border-gray-300 bg-white hover:bg-gray-50"
    : "bg-[#C8102E] text-white hover:opacity-90";
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${style} ${className}`}>{children}</button>
  );
}
function Card({ children, className = "", style }) {
  return <div className={`rounded-2xl shadow-xl border border-gray-100 bg-white ${className}`} style={style}>{children}</div>;
}
function CardContent({ children, className = "" }) {
  return <div className={`p-6 md:p-10 ${className}`}>{children}</div>;
}


// ===== Inline icons (simple SVG) =====
const Icon = {
  Truck: (props) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="currentColor" d="M3 7h10v7h1.5a3.5 3.5 0 1 0 0 2H16v1a1 1 0 0 1-1 1h-1a3 3 0 0 1-6 0H7a1 1 0 0 1-1-1H5a3 3 0 1 1 0-2h1V7Zm10 2v5h2.764l1.8-3H16V9h-3Zm5 3h1.5V9H20l-2-2h-2v3h2.764Z"/>
    </svg>
  ),
  ListChecks: (props) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="currentColor" d="M3 5h9v2H3V5Zm0 6h9v2H3v-2Zm0 6h9v2H3v-2Zm14.5-9L19 9l3.5-3.5L21 3l-3 3-1.5-1.5L15 6l2.5 2Zm0 6L19 15l3.5-3.5L21 9l-3 3-1.5-1.5L15 12l2.5 2Z"/>
    </svg>
  ),
  CheckCircle: (props) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="currentColor" d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm-1 15l-5-5 1.414-1.414L11 13.172l5.586-5.586L18 9l-7 8Z"/>
    </svg>
  ),
  Users: (props) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="currentColor" d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4c0-2.21 1.79-4 4-4s4 1.79 4 4v4h-2v5H6v-5H4zM10 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2z"/>
    </svg>
  ),
  BookOpen: (props) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
  )
};

// ===== Brand palette =====
const brand = { red: "#C8102E", black: "#0F1115", gray: "#4A4A4A", lightGray: "#F3F4F6" };

// ===== Slides data =====
const slides = [
  {
    sectionLabel: "Section 7",
    title: "Step 1 — Planning: Know Your Carrier & Shape the Day",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Step 1 is **planning**. We'll turn preferences and market realities into a practical plan for the day.",
      "Navigation cue: Use the navigation box to move between sections."
    ]
  },
  {
    title: "Today's Scenario",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "**Quinton** — Owner-operator, based in **Jacksonville, FL**; older truck + older **reefer**; prefers **Florida only**, will go to **Texas occasionally** if pay is strong.",
      "**Derek** — Company driver delivering **9:00 a.m. in Chicago, IL**; runs **nationwide**; paid **by miles**; wants to maximize weekly miles."
    ],
    trainerNotes: [
      "Two trucks, two drivers, different priorities: **Quinton** (owner-operator, older reefer, **FL-only**, TX sometimes) and **Derek** (company driver, **Chicago 9:00 a.m.** delivery, wants miles)."
    ]
  },
  {
    title: "Principle: Plan to the Carrier's Wishes",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Your job isn't to find the **highest rate**, it's to find the **most appropriate load** for the carrier's goals.",
      "Gather preferences: **states/regions**, **equipment & age**, **weight/temperature comfort**, **home time**, **risk tolerance**, **weather/terrain**."
    ],
    trainerNotes: [
      "Highest price isn't always the right load. Align to **states**, **equipment limits**, **weight/temp comfort**, **home time**, **risk tolerance**, and **weather/terrain**."
    ]
  },
  {
    title: "Financial Factors",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Term", "Definition / How to use"],
      rows: [
        ["**Rate (Gross)**", "Total the broker pays the carrier for the load."],
        ["**Total Mileage**", "**Loaded miles** (PU→DEL) + **Deadhead** (to pickup). Example: **33** mi deadhead (Fort Worth→Dallas) + **1026** loaded (Dallas→Charlotte) = **1059** total."],
        ["**Rate per Mile (RPM)**", "**Rate ÷ Total miles**. Example: **$2,500 ÷ 1059 ≈ $2.36/mi**."],
        ["**Tolls**", "Can materially change real RPM (e.g., **NYC**). Use toll calculators (TollGuru, Tollsmart, TruckRouter) or board tools."]
      ]
    },
    trainerNotes: [
      "Define **rate**, **total miles** (loaded + **deadhead**), and **RPM**. Example: **33** DH + **1026** loaded = **1059** miles; **$2,500 / 1059 ≈ $2.36/mi**.",
      "Consider **tolls**—they change real profitability. Use calculators or board tools."
    ]
  },
  {
    title: "Costs & Weekly Lens",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "**Fixed costs**: lease, insurance, licenses/permits—owed even when parked.",
      "**Variable costs**: fuel, tolls, driver pay (per-mile), etc.",
      "Know **cost per mile** → loads below it lose money; above it profit—**but** weekly average RPM can justify a single tactical loss."
    ],
    trainerNotes: [
      "Know **fixed vs variable** costs to estimate **cost per mile**. Sometimes we accept a tactical loss to position for a stronger **weekly average RPM**."
    ]
  },
  {
    title: "Load Parameters that Change Choices",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Factor", "Why it matters"],
      rows: [
        ["**Weight**", "Heavy loads raise fuel use & wear—older equipment may **avoid heavy** even at higher pay."],
        ["**Reefer temperature**", "Very low temps (e.g., **ice cream**) are riskier; **older reefers** less reliable at low setpoints."],
        ["**Commodity risk**", "Temperature-sensitive or high-claim freight may not fit every carrier's comfort."]
      ]
    },
    trainerNotes: [
      "**Weight** drives fuel and wear; older equipment may avoid heavy loads even with higher pay.",
      "**Reefer temps**: ultra-low setpoints (e.g., ice cream) raise risk; older units may be unreliable."
    ]
  },
  {
    title: "Route, Terrain & Congestion",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "**Mountains vs flats**: e.g., **Virginia** winding roads vs **Texas** flat highways. Driver stress & skill differ.",
      "**Urban congestion**: e.g., **NYC** vs open **Arizona** roads.",
      "Owner-operators often optimize for **comfort/safety** as well as money."
    ],
    trainerNotes: [
      "**Mountains** (e.g., Virginia) vs **flat** Texas highways; **NYC** congestion vs open **Arizona**—stress & time differ.",
      "Owner-operators often prioritize **comfort/safety** alongside revenue."
    ]
  },
  {
    title: "Weather Intelligence",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "U.S. weather risks: **hurricanes**, **snow/ice** in the North; risk often → **higher pay**.",
      "Monitor continuously: **NOAA**, **Weather.gov**, **Weather.com**, **TripCheck.com**; save these in your notes."
    ],
    trainerNotes: [
      "Watch for **hurricanes** and **winter storms**; risky areas pay more but carry exposure.",
      "Keep **NOAA / Weather.gov / Weather.com / TripCheck** open and refresh through the day."
    ]
  },
  {
    title: "Apply It: Plan for **Quinton**",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Focus **Florida intrastate** lanes; consider **light** or moderate weights; **avoid ultra-low reefer temps**.",
      "If **TX** pays strongly, confirm return path & weekly average; minimize tolls.",
      "Prioritize **familiar routes** to match comfort preference."
    ],
    trainerNotes: [
      "Search **Florida intrastate** first; bias to **lighter** loads and **moderate** reefer temps.",
      "If a **Texas** offer pays well, check the **return** and weekly math; avoid heavy toll corridors if possible.",
      "Favor **familiar routes** to fit his comfort/risk profile."
    ]
  },
  {
    title: "Apply It: Plan for **Derek**",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "After **9:00 a.m. Chicago** delivery, target **high-mile interstate** outbound; maximize weekly miles.",
      "Price in **tolls & weather** on longer lanes; he's flexible on states/areas.",
      "Use weekly RPM target; accept slightly lower RPM if it positions next **high-mile** load."
    ],
    trainerNotes: [
      "After the **Chicago 9:00 a.m.** drop, target long **interstate** lanes to maximize miles.",
      "Price in **tolls/weather**. Use weekly RPM goals; accept a slightly lower RPM if it sets up a **high-mile** follow-on load."
    ]
  },
  {
    title: "Pop Quiz",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    quiz: {
      questions: [
        "Define **deadhead** and compute total miles for **33** DH + **1026** loaded.",
        "If the rate is **$2,500**, what's the **RPM** on **1059** miles?",
        "Name two reasons a carrier might refuse a **heavy** load.",
        "Why might an older **reefer** avoid very low temperatures?",
        "Give two **route** factors besides distance that affect planning.",
        "Name two **weather** resources a dispatcher should monitor."
      ],
      answers: [
        "Empty miles to pickup; **1059 mi** total.",
        "**≈ $2.36/mi**.",
        "Fuel cost + wear/tear (and equipment age).",
        "Reliability risk of older units at low setpoints.",
        "Terrain (mountains vs flats), urban congestion.",
        "NOAA, Weather.gov, Weather.com, TripCheck.com."
      ]
    },
    trainerNotes: [
      "Answer first; then I'll reveal model answers. If answers are thin, we'll revisit the financials and route factors."
    ]
  },
  {
    title: "Section Material",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "No external files for this section yet; this lesson is from **Step 1 — Planning** text.",
      "When materials arrive (PDFs/images/links), embed here (PDFs inline; images gallery; links with short descriptions).",
      "Use the navigation panel here to go to the **Next** or **Previous** section."
    ],
    trainerNotes: [
      "No files yet for Section 7. When we get documents or links, we'll embed them here and walk step-by-step.",
      "Navigation cue (last slide): Use the navigation box here to jump to the next section or back to the previous one."
    ],
    isMaterialsSlide: true
  }
];

// ===== Utility components =====
function EmphasisText({ text }) {
  const formattedText = useMemo(() => {
    // Handle bold text with **text** - remove asterisks and make bold
    if (text.includes('**')) {
      const parts = [];
      // Use a more comprehensive regex to match **text** patterns
      const segments = text.split(/(\*\*[^*]*\*\*)/g);
      
      segments.forEach(segment => {
        if (segment.startsWith('**') && segment.endsWith('**')) {
          // Remove the asterisks and mark as bold
          const boldContent = segment.slice(2, -2);
          if (boldContent) {
            parts.push({ type: 'bold', content: boldContent });
          }
        } else if (segment) {
          parts.push({ type: 'text', content: segment });
        }
      });
      
      return parts;
    }

    // If no bold text found, handle colon/dash emphasis as before
    const idxColon = text.indexOf(":");
    const idxDash = text.indexOf(" — ") !== -1 ? text.indexOf(" — ") : text.indexOf("—");
    const idx = [idxColon, idxDash].filter((n) => n > -1).sort((a, b) => a - b)[0] ?? -1;
    if (idx > -1 && idx < 80) {
      return [
        { type: 'bold', content: text.slice(0, idx) },
        { type: 'text', content: text.slice(idx) }
      ];
    }
    
    return [{ type: 'text', content: text }];
  }, [text]);

  return (
    <span>
      {formattedText.map((part, index) => (
        part.type === 'bold' ? (
          <strong key={index} className="font-bold text-gray-900">{part.content}</strong>
        ) : (
          <span key={index}>{part.content}</span>
        )
      ))}
    </span>
  );
}

// ===== Slide schema validation (runtime tests) =====
function validateSlides(sl) {
  const issues = [];
  if (!Array.isArray(sl) || sl.length === 0) issues.push("slides must be a non-empty array");
  sl.forEach((s, i) => {
    if (!s.title) issues.push(`slide[${i}] missing title`);
    if (!s.layout) issues.push(`slide[${i}] missing layout`);
    if (s.layout === "table") {
      if (!s.table) issues.push(`slide[${i}] table layout missing table`);
      else {
        if (!Array.isArray(s.table.headers)) issues.push(`slide[${i}] table.headers must be an array`);
        if (!Array.isArray(s.table.rows)) issues.push(`slide[${i}] table.rows must be an array`);
      }
    }
    if (s.layout === "bullets" && !s.bullets && !s.quiz) {
      issues.push(`slide[${i}] bullets layout requires bullets[] or quiz{}`);
    }
    if (s.quiz) {
      if (!Array.isArray(s.quiz.questions) || s.quiz.questions.length === 0) issues.push(`slide[${i}] quiz.questions must be non-empty array`);
      if (!Array.isArray(s.quiz.answers) || s.quiz.answers.length === 0) issues.push(`slide[${i}] quiz.answers must be non-empty array`);
    }
  });
  return issues;
}

// ===== Tests =====
function runUnitTests() {
  const cases = [];
  // Case 1: Happy path (current slides)
  cases.push({ name: "current slides compile", issues: validateSlides(slides), expectPass: true });
  // Case 2: Broken slide (missing title) — intentionally broken, must be detected
  const bad = [{ layout: "title" }];
  cases.push({ name: "missing title detected", issues: validateSlides(bad), expectPass: false, expectContains: "missing title" });
  // Case 3: Table layout missing table
  const badTable = [{ title: "T", layout: "table" }];
  cases.push({ name: "table layout missing table", issues: validateSlides(badTable), expectPass: false, expectContains: "table layout missing table" });
  return cases;
}

// ===== Main App =====
export default function LoadisticsSection7({ onNavigateToSection, sectionDropdown }) {
  const [slideIndex, setSlideIndex] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  const slide = slides[slideIndex];
  const tests = useMemo(() => runUnitTests(), []);

  useEffect(() => {
    setMounted(true);
    function onResize() { setDims({ width: window.innerWidth, height: window.innerHeight }); }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slideIndex]);

  function prev() { setSlideIndex((i) => Math.max(0, i - 1)); }
  function next() {
    setSlideIndex((i) => {
      if (i + 1 >= slides.length) { setShowConfetti(true); return i; }
      return Math.min(slides.length - 1, i + 1);
    });
  }

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 flex flex-col relative" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" }}>
      {/* Confetti (triggered on last slide) */}
      {mounted && showConfetti && (
        <div className="fixed inset-0 pointer-events-none grid place-items-center text-6xl animate-bounce">🎉</div>
      )}

      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur p-3">
        <div className="max-w-6xl mx-auto flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded grid place-items-center text-white font-bold" style={{ backgroundColor: brand.red }}>L</div>
            <div className="leading-tight">
              <div className="text-sm uppercase tracking-wide text-gray-500">{slides[0].sectionLabel || "Section"}</div>
              <div className="font-semibold">Loadistics Training</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Section Navigation Dropdown */}
            {sectionDropdown}
            
            
            {/* Logo */}
            <div className="hidden md:block">
              <img src={loadisticsLogo} alt="Loadistics Logo" className="h-12 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Slide area */}
      <div className="relative flex-1">
        {/* Watermark overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10 z-0">
          <img src={loadisticsLogo} alt="" className="max-w-lg max-h-80" />
        </div>

        <div className="max-w-6xl mx-auto p-6">
          <Card style={{ borderColor: "#F3F4F6" }}>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                  {slides[0].sectionLabel && (
                    <div className="text-xs uppercase tracking-wider text-gray-500">{slides[0].sectionLabel}</div>
                  )}
                  <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3" style={{ color: brand.black }}>
                    <span style={{ width: 48, height: 48 }} className="grid place-items-center">{slide.icon}</span>
                    {slide.title}
                  </h1>
                  <div className="text-xs text-gray-500">Slide {slideIndex + 1} of {slides.length}</div>
               
                  <SlideNavigation 
                    currentSlide={slideIndex} 
                    totalSlides={slides.length} 
                    onSlideChange={setSlideIndex}
                    sectionNumber={7}
                  /> </div>
              </div>

              <div className="space-y-6">
                {slide.layout === "title" && (
                  <div className="text-gray-700"><p className="text-lg md:text-xl">Loadistics LLC Training – Presentation Version</p></div>
                )}

                {slide.layout === "bullets" && !slide.quiz && slide.bullets && (
                  <ul className="list-disc pl-6 text-lg md:text-xl leading-8">
                    {slide.bullets.map((t, i) => (<li key={i} className="mb-3"><EmphasisText text={t} /></li>))}
                  </ul>
                )}

                {slide.layout === "bullets" && slide.quiz && slide.quiz.questions && (
                  <ol className="list-decimal pl-6 text-lg md:text-xl leading-8 space-y-3">
                    {slide.quiz.questions.map((q, i) => (<li key={i} className="mb-2"><p><EmphasisText text={q} /></p></li>))}
                  </ol>
                )}

                {slide.layout === "table" && slide.table && (
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-base md:text-lg">
                      <thead style={{ backgroundColor: brand.red, color: "white" }}>
                        <tr>
                          {slide.table.headers.map((h, i) => (<th key={i} className="text-left font-semibold px-4 md:px-5 py-3 md:py-4"><EmphasisText text={h} /></th>))}
                        </tr>
                      </thead>
                      <tbody>
                        {slide.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={rIdx % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={`align-top px-4 md:px-5 py-3 md:py-4 ${cIdx === 0 ? "font-semibold text-gray-900" : "text-gray-800"}`} style={{ wordBreak: "break-word" }}>
                                <EmphasisText text={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slide.isMaterialsSlide) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(6)} 
                        disabled={7 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 6)
                      </Button>
                      <Button onClick={() => onNavigateToSection(8)} className="rounded-xl">
                        Next Section (Section 8) →
                      </Button>
                    </div>
                  </div>
                )}

                {/* Trainer-facing panels when Trainer Mode is ON */}
                

                
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <Button variant="outline" onClick={prev} disabled={slideIndex === 0} className="rounded-xl">Prev</Button>
                <div className="text-xs text-gray-500">Slide {slideIndex + 1} / {slides.length}</div>
                <Button onClick={next} disabled={slides.length === 0} className="rounded-xl">Next</Button>
              </div>
            </CardContent>
          </Card>

          {/* Diagnostics */}
          <details className="max-w-6xl mx-auto mt-4 text-sm text-gray-600">
            <summary className="cursor-pointer select-none">DEV: Diagnostics & Tests</summary>
            <div className="mt-2 space-y-2">
              {tests.map((t, i) => {
                const passed = t.expectPass ? t.issues.length === 0 : (t.expectContains ? t.issues.some((m) => String(m).includes(t.expectContains)) : t.issues.length > 0);
                return (
                  <div key={i}>
                    <div className="font-medium">{t.name}</div>
                    {passed ? (
                      <div className="text-green-600">✔ All checks passed</div>
                    ) : (
                      <ul className="list-disc pl-5 text-red-600">
                        {t.issues.map((m, j) => (<li key={j}>{m}</li>))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </details>
        </div>
      </div>

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 7</div>
    </div>
  );
}
