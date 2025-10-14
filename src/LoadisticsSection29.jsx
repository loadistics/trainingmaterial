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
    sectionLabel: "Section 29",
    title: "Loadboards Overview and How to Use Them - Part 2",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to Part 2 of Loadboards Overview. This section covers premium load boards and advanced strategies.",
      "We'll explore DAT Load Board (market leader), Truck Stop, and broker-specific load boards.",
      "This is critical information for dispatchers who need comprehensive load board access.",
      "Navigation cue: Use the navigation box to move between sections."
    ]
  },
  {
    title: "DAT Load Board: Market Leader",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "DAT is the premier and biggest load board in the US market",
      "Used for most demonstrations and industry standard",
      "Essential addition to DOT and 123 Load Board accounts",
      "Five different package options available",
      "Required for professional dispatchers and freelancers"
    ],
    trainerNotes: [
      "DAT is the gold standard in the industry - every professional dispatcher needs access.",
      "Emphasize that this is the load board used in most demonstrations throughout the course.",
      "Explain that it's essential for both employed dispatchers and independent contractors.",
      "Mention that employers typically provide this, but freelancers need to purchase it themselves."
    ]
  },
  {
    title: "DAT Load Board Packages",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Package", "Price", "Key Features"],
      rows: [
        ["Truckers Edge Standard", "$45/month", "Basic search, posting, mobile app, load match alarm"],
        ["Truckers Edge Enhanced", "$95/month", "30-day historical data, average lane rates"],
        ["Truckers Edge Professional", "$145/month", "15-day data, call-to-post, Tri-Haul routing"],
        ["Power Office Carrier", "$195/month", "Live load board, MCI, exact match alarms"],
        ["Power Office Carrier Pro", "$295/month", "Multiple searches, lane makers, contract rates"]
      ]
    },
    trainerNotes: [
      "Walk through each package and explain the key differences.",
      "Emphasize that the cheapest package lacks average lane rates - crucial for beginners.",
      "Explain that Tri-Haul helps break long loads into shorter, higher-paying segments.",
      "Mention that Power packages offer live updates and multiple simultaneous searches.",
      "Recommend the middle three packages for independent dispatchers."
    ]
  },
  {
    title: "DAT Account Registration Challenges",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Requires US-based company name and address",
      "Must choose 'Carrier Dispatcher' as authority type",
      "No MC/DOT number required anymore",
      "Two main solutions for independent dispatchers",
      "Most dispatchers use customer accounts initially"
    ],
    trainerNotes: [
      "This is a major hurdle for new dispatchers - explain the challenge clearly.",
      "Emphasize that you can now register as a 'Carrier Dispatcher' without being a licensed carrier.",
      "Explain the two main approaches: using customer accounts or opening your own US company.",
      "Reassure trainees that using customer accounts is completely normal and acceptable practice."
    ]
  },
  {
    title: "Solution 1: Customer Account Strategy",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Request account from one of your customers",
      "Perfectly normal and acceptable practice",
      "Two options: pay yourself or have customer deduct from dispatching fee",
      "Most new dispatchers start this way",
      "Customer provides company name and address"
    ],
    trainerNotes: [
      "This is the most common approach for new dispatchers - emphasize it's completely normal.",
      "Explain both payment options: self-pay or customer deduction from dispatching fees.",
      "Mention that you'll need to find carriers first (covered in Modules 8-9).",
      "Reassure trainees that this is not shameful or unprofessional - it's standard practice."
    ]
  },
  {
    title: "Solution 2: Open US Company",
    layout: "bullets",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Open company in the US remotely",
      "No US residency or citizenship required",
      "No visa needed - completely remote process",
      "Use lawyer or specialized company services",
      "Still need carrier reference for verification"
    ],
    trainerNotes: [
      "This is covered in detail in Module 9 - just give overview here.",
      "Emphasize that it's completely doable remotely without visiting the US.",
      "Mention that even with your own company, you still need carrier references.",
      "Explain that DAT will call the carrier to verify the dispatcher relationship."
    ]
  },
  {
    title: "Truck Stop: DAT's Main Competitor",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Website: truckstop.com",
      "Sometimes has more loads than 123 Load Board",
      "Three packages: Basic ($39), Advanced ($99), Pro ($149)",
      "Excellent for flatbed, step deck, and platform trailers",
      "Same US company requirement as DAT"
    ],
    trainerNotes: [
      "Truck Stop is DAT's main competitor but not always necessary.",
      "Emphasize it's particularly valuable for specialized equipment carriers.",
      "Explain the package structure and pricing.",
      "Mention that it faces the same registration challenges as DAT.",
      "Recommend it for dispatchers working with specialized equipment carriers."
    ]
  },
  {
    title: "Broker Load Boards: Hidden Opportunities",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Large brokers post loads on their own boards first",
      "Carriers get first pick before public posting",
      "Examples: Amazon, Uber Freight, TCL.com",
      "All broker load boards are completely free",
      "Need to set up carrier with broker first"
    ],
    trainerNotes: [
      "This is a hidden gem - many dispatchers don't know about broker load boards.",
      "Emphasize that loads appear here BEFORE they hit public load boards.",
      "Mention Uber Freight as a surprising but major player in freight brokerage.",
      "Explain that you need to establish carrier relationships with brokers first.",
      "Highlight that these are completely free once you have the relationship."
    ]
  },
  {
    title: "Load Board Strategy Summary",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Start with free options: DOT and 123 Load Board",
      "Add DAT Load Board for professional work",
      "Consider Truck Stop for specialized equipment",
      "Set up broker load boards for first-pick access",
      "More load boards = more opportunities for carriers"
    ],
    trainerNotes: [
      "Summarize the complete load board strategy for dispatchers.",
      "Emphasize the progression from free to paid options.",
      "Explain that more load boards mean more opportunities to offer carriers.",
      "Mention that this gives dispatchers a competitive advantage.",
      "Reassure that finding carriers (needed for paid accounts) is covered in later modules."
    ]
  },
  {
    title: "Complete Load Board Reference List",
    layout: "materials",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    pdf: "/trainingmaterial/section29/pdfs/Loadboardlist.pdf",
    trainerNotes: [
      "This PDF contains a comprehensive list of all load boards discussed in this module.",
      "Includes free load boards, paid load boards, and major broker load boards.",
      "Use this as a reference when setting up carriers with different brokers.",
      "The list is organized by type and includes key features and pricing information.",
      "This is your complete toolkit for load board access as a professional dispatcher."
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
export default function LoadisticsSection29({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={29}
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

                {slide.layout === "materials" && slide.pdf && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-4">Complete Load Board Reference List</h3>
                      <p className="text-gray-600 mb-4">Comprehensive list of free, paid, and broker load boards with features and pricing</p>
                    </div>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <iframe
                        src={slide.pdf}
                        className="w-full h-96 md:h-[600px]"
                        title="Load Board List PDF"
                      />
                    </div>
                    <div className="text-center">
                      <Button
                        onClick={() => window.open(slide.pdf, '_blank')}
                        variant="outline"
                        className="rounded-xl"
                      >
                        Open PDF in New Tab
                      </Button>
                    </div>
                  </div>
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slide.isMaterialsSlide) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(28)} 
                        disabled={29 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 28)
                      </Button>
                      <Button onClick={() => onNavigateToSection(30)} className="rounded-xl">
                        Next Section (Section 30) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 29</div>
    </div>
  );
}
