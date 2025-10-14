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
    sectionLabel: "Section 3",
    title: "Types of Trucks & Trailers: Standard Equipment",
    layout: "title",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "In this section we’ll focus on equipment: trucks, standard trailers, and what dispatchers must know to plan and negotiate confidently.",
      "Most of our work involves 18-wheelers. The U.S. recognizes 8 truck classes; dispatch teams mainly work with Class 8 (the heaviest)",
      "“A semi truck (tractor) pulls a semi trailer. Power Only means the tractor runs without its own trailer—common where shippers provide pre-loaded trailers.”",
      "equipment determines what loads we can accept, weight we can carry, and how we negotiate",

    ]
  },
  {
    title: "Truck Classes & Core Terms",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Concept", "Definition / Implication"],
      rows: [
        ["Truck Classes", "U.S. has 8 classes by size/weight. Our focus is Class 8 (heaviest)."],
        ["Semi + Semi Trailer", "Tractor with an attached semi trailer; the typical combination for long-haul freight."],
        ["Power Only", "Tractor only (no trailer). Used when shippers provide pre-loaded trailers; dispatcher coordinates hook-and-go."],
        ["Trailer Shortage Trend", "Many carriers run Power Only to move available pre-loaded customer trailers."],
        ["Implication for Dispatcher", "Know the carrier's equipment profile (tractor only vs tractor+trailer; which trailer types) before negotiating."]
      ]
    },
    trainerNotes: [
      "Let's walk row-by-row—short and clear.",
      "Truck Classes: Eight classes exist; we focus on Class 8. That affects payload, lanes, and equipment assumptions.",
      "Semi + Semi Trailer: The standard long-haul combo: tractor + trailer. Most full-truckload (FTL) operations use this.",
      "Power Only: Tractor only. Often we hook a shipper's or broker's trailer. Confirm trailer availability, yard access, and hook time.",
      "Trailer Shortage Trend: Expect more Power Only opportunities. Know your carrier's flexibility and limits.",
      "Implication for Dispatcher: Before booking, confirm exact equipment your carrier has (tractor-only vs tractor+trailer) and which trailer types they can run.",
      "Check understanding: Who owns the trailer on Power Only? What do you need to verify before accepting?"
    ]
  },
  {
    title: "Dry Van",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Attribute", "Standard / Notes"],
      rows: [
        ["What it is", "Fully enclosed box; most common U.S. trailer; protects cargo from weather."],
        ["Length (ft)", "Standard 53 ft (common); 48 ft exists but some loads require 53 ft."],
        ["Pallet Count", "53 ft → 26 pallets; 48 ft → 24 pallets."],
        ["Height / Width", "Height ~12.5–13.6 ft; Width ~8.6 ft."],
        ["Empty Weight", "≈ 14,000–17,000 lb."],
        ["Max Load Weight", "≈ 43,000–45,000 lb (depends on actual tractor+trailer weight). U.S. GVW limit = 80,000 lb."],
        ["Doors", "Swing doors maximize space; Roll-up doors reduce usable space (can limit FTL suitability)."],
        ["Typical Freight", "Palletized, floor-loaded, or bulk (e.g., beverages, consumer goods, tires, carpets)."]
      ]
    },
    trainerNotes: [
      "Dry van is the most common trailer—fully enclosed, protects cargo from weather.",
      "Length: Typically 53 ft (some 48 ft still in use).",
      "Pallet math: 53 ft → 26 pallets, 48 ft → 24 pallets. State this up front to avoid loading conflicts.",
      "Max load weight: Usually 43–45k lb, but it depends on tractor + trailer empty weight; the road GVW limit is 80,000 lb.",
      "Doors: Swing doors maximize space; roll-up doors reduce usable space—ask if the shipper requires swing.",
      "Use cases: Palletized or floor-loaded consumer goods, beverages, tires, carpets, etc.",
      "Key reminder: Always confirm actual empty weight and door type—these change what we can safely load."
    ]
  },
  {
    title: "Dry Van Load Securement",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "E-track rails — steel rails with multiple anchor points (for straps/devices).",
      "Elastic straps — reduce pallet shift.",
      "Load locks — ratcheting bars (steel/aluminum) to brace cargo.",
      "Dunnage bags — inflatable bags to fill gaps and stabilize cargo."
    ],
    trainerNotes: [
      "A van protects from weather, but securement prevents load shift and damage.",
      "E-track rails: anchor points for straps and devices.",
      "Elastic straps: reduce pallet movement.",
      "Load locks: ratcheting bars to brace cargo between walls.",
      "Dunnage bags: fill gaps to stabilize mixed pallets.",
      "Prompt: If we have mixed pallet heights, which securement combo would you choose and why?"
    ]
  },
  {
    title: "Reefer (Refrigerated Trailer)",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Attribute", "Standard / Notes"],
      rows: [
        ["What it is", "Dry-van-like trailer with a refrigeration unit for temperature control."],
        ["Length / Width", "48–53 ft; width 8.6 ft (similar to dry van)."],
        ["Empty Weight", "≈ 14,000–17,000 lb + unit (~2,000 lb)."],
        ["Max Load Weight", "≈ 42,000–45,000 lb (varies with fuel/equipment)."],
        ["Temperature Range", "About −20°F to 65°F (≈ −28°C to 18°C)."],
        ["Examples", "Ice cream −15°F; frozen pork 0°F; avocados 38°F; watermelons 45°F."],
        ["Rates", "Temp-controlled freight typically 20–50% higher than dry freight."],
        ["Flexibility", "Some dry freight can ride in a reefer when temp control isn't critical."]
      ]
    },
    trainerNotes: [
      "A reefer is like a dry van with a refrigeration unit for temperature control.",
      "Lengths: 48–53 ft; width: about 8.6 ft—similar to dry van.",
      "Weights: Empty is similar to dry van + ~2k lb for the unit; that reduces payload slightly.",
      "Temperature range: approx −20°F to 65°F. Example setpoints: ice cream −15°F, frozen pork 0°F, avocados ~38°F, watermelons ~45°F.",
      "Rates: Reefer usually pays 20–50% more vs dry—temperature control adds cost and risk.",
      "Flexibility: Some dry freight can ride in a reefer when temp control isn't critical.",
      "Negotiation cue: Fuel in tractor + reefer tank affects total weight; on tight weights, ask for exacts."
    ]
  },
  {
    title: "Flatbed",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Attribute", "Standard / Notes"],
      rows: [
        ["What it is", "Open flat platform; no roof/walls; side/top loading with cranes/forklifts."],
        ["Lengths (ft)", "Typically 48–53 ft; 40 ft also common for standard cargo."],
        ["Max Load Weight", "≈ 48,000 lb (lighter trailer → higher payload potential)."],
        ["Oversize", "Can exceed standard dimensions/weights → permits and sometimes escort vehicles required."],
        ["Securement", "Chains, winch straps, tarp cords, corner protectors, etc."],
        ["Tarps", "Protect from rain/snow/mud; not temperature control. Tarping is labor-intensive → ask higher rate when required."]
      ]
    },
    trainerNotes: [
      "Flatbed is an open platform—no roof or walls—loaded by crane/forklift from sides/top.",
      "Lengths: 48–53 ft common (40 ft also accepted for some loads).",
      "Max load weight: about 48,000 lb (lighter trailer → higher payload potential).",
      "Oversize: Exceeding standard dimensions/weights requires permits, sometimes escort vehicles—plan ahead.",
      "Securement: Chains, winch straps, corner protectors, tarp cords, etc.",
      "Tarps: Weather protection only (not temperature control). Tarping is labor-intensive—push for a higher rate when required.",
      "Prompt: What are the safety and liability risks if securement is insufficient? How would that change our pricing?"
    ]
  },
  {
    title: "Pop Quiz",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    quiz: {
      questions: [
        "Which truck class do we mainly work with, and why does it matter for dispatch?",
        "Define Power Only and give one reason it's common today.",
        "Dry van: standard length and typical pallet count; what's the U.S. GVW limit?",
        "Name two load securement tools used inside a dry van.",
        "Reefer: typical temperature range and one example setpoint.",
        "Why are reefer rates typically higher than dry van?",
        "Flatbed: when are permits/escorts required, and why does tarping affect rate?"
      ],
      answers: [
        "Class 8; it's the heavy segment we dispatch most, affecting payload and route choices.",
        "Tractor without trailer; shippers provide pre-loaded trailers; shortages/asset costs make this common.",
        "53 ft (≈ 26 pallets); 80,000 lb GVW.",
        "Any two: E-track rails, elastic straps, load locks, dunnage bags.",
        "About −20°F to 65°F; example: ice cream ≈ −15°F (any one of the listed examples is fine).",
        "Temperature control adds complexity/risk → higher price.",
        "When cargo exceeds standard size/weight; tarping is extra labor/time and protects cargo → higher rate."
      ]
    },
    trainerNotes: [
      "Answer first, then I'll show model answers.",
      "Q1: Which truck class do we mainly work with, and why does it matter for dispatch? A (Trainer Mode): Class 8; it determines payload/route assumptions and typical freight we target.",
      "Q2: Define Power Only and give one reason it's common today. A: Tractor without trailer; common where shippers supply pre-loaded trailers and due to trailer scarcity/cost.",
      "Q3: Dry van: standard length and typical pallet count; what's the U.S. GVW limit? A: 53 ft and 26 pallets; 80,000 lb GVW.",
      "Q4: Name two load-securement tools used inside a dry van. A: Any two of: E-track rails, elastic straps, load locks, dunnage bags.",
      "Q5: Reefer: typical temperature range and one example setpoint. A: About −20°F to 65°F; e.g., ice cream −15°F (any correct example).",
      "Q6: Why are reefer rates typically higher than dry van? A: Added complexity/risk and responsibility for temperature control.",
      "Q7: Flatbed: when are permits/escorts required, and why does tarping affect rate? A: When loads exceed standard size/weight; tarping is extra labor/time and protects cargo → higher rate."
    ]
  },
  {
    title: "Section Material",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "No material uploaded yet. When provided, we'll embed PDFs/images/links here.",
      "PDFs inline; images simple gallery; links with short descriptions and what to check."
    ],
    trainerNotes: [
      "We'll follow step-by-step instructions that will arrive with the materials (what to click/verify or which sections to review).",
      "Use the Section Navigation here to go to the Next section or back to the Previous section."
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
      const segments = text.split(/(\*\*.*?\*\*)/g);
      
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
          <strong key={index} className="font-semibold text-gray-900">{part.content}</strong>
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
export default function LoadisticsSection3({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={3}
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
                          {slide.table.headers.map((h, i) => (<th key={i} className="text-left font-semibold px-4 md:px-5 py-3 md:py-4">{h}</th>))}
                        </tr>
                      </thead>
                      <tbody>
                        {slide.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={rIdx % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={`align-top px-4 md:px-5 py-3 md:py-4 ${cIdx === 0 ? "font-semibold text-gray-900" : "text-gray-800"}`} style={{ wordBreak: "break-word" }}>{cell}</td>
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
                        onClick={() => onNavigateToSection(2)} 
                        disabled={3 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 2)
                      </Button>
                      <Button onClick={() => onNavigateToSection(4)} className="rounded-xl">
                        Next Section (Section 4) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 3</div>
    </div>
  );
}
