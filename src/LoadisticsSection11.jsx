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
    sectionLabel: "Section 11",
    title: "Step 3 — Finding Loads on the Loadboard: Active Search, Parameters, and Rate Analysis",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "We're moving from passive to active dispatching. No more waiting by the phone.",
      "This is where real dispatchers separate themselves from beginners.",
      "We'll use Derek in Chicago as our example - he's unloading today and needs his next load.",
      "By the end of this section, you'll search loadboards like a professional.",
      "QUESTIONS: Quick poll: How many of you have actually used a loadboard search function? What's the difference between posting a truck and searching for loads?",
      "ANSWERS: Answer: Posting = passive (waiting for calls), Searching = active (you make the calls). Answer: Most successful dispatchers do both simultaneously"
    ]
  },
  {
    title: "From Posting to Searching",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Previous Step: We posted our truck on the loadboard for brokers to see",
      "Real World Reality: We can't just sit around waiting for calls",
      "Active Approach: Pick up the phone and start making calls ourselves",
      "Today's Focus: Using our second driver Derek in Chicago as an example",
      "Goal: Learn systematic load searching and evaluation techniques"
    ],
    trainerNotes: [
      "Remember our 10-step process? We posted Derek's truck, got some calls, found a decent load.",
      "But we can't just sit around drinking coffee waiting for the phone to ring.",
      "Professional dispatchers are proactive - they hunt for the best opportunities.",
      "Derek's in Chicago, which gives us a perfect example of market analysis.",
      "QUESTIONS: Why can't we just wait for brokers to call us? What happens if we only rely on incoming calls?",
      "ANSWERS: Answer: You miss better opportunities and limit your options. Answer: Other dispatchers are actively calling on the same loads"
    ]
  },
  {
    title: "Check the Market Before You Search",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "National Load Counts: Always check in/out ratios for your state",
      "Illinois Example: 984 loads coming in, 620 loads going out",
      "Market Assessment: Not a hot state - more trucks than loads available",
      "Rate Expectations: Shouldn't expect crazy high rates from Illinois",
      "Strategic Thinking: Still 600+ loads available - plenty of opportunities"
    ],
    trainerNotes: [
      "Before we start searching, we need to understand our market position.",
      "Illinois: 984 loads in, 620 loads out - that's not a hot market.",
      "More trucks than loads usually means lower rates, but 600+ loads is still plenty.",
      "Smart dispatchers check these numbers before setting rate expectations.",
      "QUESTIONS: What does 984 in, 620 out tell us about Illinois? Should we avoid markets with poor in/out ratios?",
      "ANSWERS: Answer: More freight coming in than going out - not ideal for outbound rates. Answer: No, just adjust expectations and negotiate accordingly"
    ]
  },
  {
    title: "Setting Up Your Load Search",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Menu Selection: Choose 'Search Loads' instead of 'My Trucks'",
      "Origin Point: Enter where your truck is currently located",
      "Deadhead to Origin: Radius truck will travel empty to pickup",
      "Standard Practice: 75 miles = about 1 hour drive in any direction",
      "Destination: Can specify city/state or leave blank for all options"
    ],
    trainerNotes: [
      "Now we switch from 'My Trucks' to 'Search Loads' - completely different mindset.",
      "Origin is Derek's current location - Chicago, Illinois.",
      "Deadhead to Origin: How far will Derek drive empty to pickup? 75 miles = 1 hour.",
      "Destination can be specific or blank - blank gives us all options.",
      "QUESTIONS: Why do we limit deadhead distance? What's the cost of deadhead miles?",
      "ANSWERS: Answer: Empty miles cost money (fuel, driver time, wear) without revenue. Answer: Reduces overall rate per mile and profit margin"
    ]
  },
  {
    title: "Key Search Parameters",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Equipment Type: Match your trailer (Van Standard, Reefer, Flatbed)",
      "Date Range: Today only for immediate loads, or expand for planning",
      "Load Requirements: Full loads, partial loads, or both",
      "Length and Weight: 53ft standard, maximum legal weight 45,000 lbs",
      "Filter Strategy: Start broad, then narrow down based on results"
    ],
    trainerNotes: [
      "Equipment type must match exactly - Derek has a standard dry van.",
      "Date range: today only if he needs to move now, or expand for planning.",
      "Load requirements: full, partial, or both - affects how you pack the trailer.",
      "Weight limits: know your driver's preferences and legal maximums.",
      "QUESTIONS: Why would a driver refuse certain weights? What's the difference between full and partial loads?",
      "ANSWERS: Answer: Driver comfort, truck capability, or company policy. Answer: Full = entire trailer space, Partial = can add more freight"
    ]
  },
  {
    title: "Refining Your Search",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Search Back: Filter by posting age (1 hour = fresh loads only)",
      "Company Preferences: Block specific brokers (premium feature)",
      "Private Loads: Special loads for selected carriers",
      "Book and Bid: Loads you can book instantly without calling",
      "Reality Check: Only 3 out of 400+ loads typically bookable instantly"
    ],
    trainerNotes: [
      "Search back by age: fresh loads (1 hour) vs older postings.",
      "Older loads might still be available if broker forgot to remove them.",
      "Book and bid loads: instant booking, but very rare - only 3 out of 400+.",
      "Most loads require phone calls and negotiation.",
      "QUESTIONS: Should we only look at fresh loads? Why are so few loads instantly bookable?",
      "ANSWERS: Answer: No, older loads might have less competition. Answer: Brokers want to negotiate rates and vet carriers personally"
    ]
  },
  {
    title: "Reading Load Board Results",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Age: How long ago the load was posted (auto-updating)",
      "Rate: Posted rate (not always shown, always negotiable)",
      "Trip Miles: Distance from pickup to delivery only",
      "Deadhead Indicator: Shows empty miles from your location",
      "Total Calculation: Trip miles + deadhead = total mileage for rate calculation"
    ],
    trainerNotes: [
      "Age shows when posted - board updates automatically with new loads.",
      "Rate isn't always shown, but when it is, it's still negotiable.",
      "Trip miles is pickup to delivery only - doesn't include your deadhead.",
      "Deadhead indicator shows empty miles from your current location.",
      "QUESTIONS: How do you calculate total mileage for rate analysis? Why don't all brokers post rates?",
      "ANSWERS: Answer: Trip miles + deadhead miles = total mileage. Answer: They want carriers to call so they can negotiate lower rates"
    ]
  },
  {
    title: "Analyzing Individual Loads",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Click for Details: Full description popup with complete information",
      "Weight and Commodity: Understand what you're hauling",
      "Full vs Partial: Affects loading/unloading and additional freight",
      "Company Information: Broker name, location, contact method",
      "Credit Information: Reviews, credit score, days to pay average"
    ],
    trainerNotes: [
      "Always click for full details - short descriptions miss important information.",
      "Weight and commodity tell you what you're really hauling.",
      "Company information shows broker reputation and payment history.",
      "Credit scores and days to pay help you assess risk.",
      "QUESTIONS: What's the most important detail to check first? Why does broker credit score matter?",
      "ANSWERS: Answer: Weight, pickup/delivery times, and any special requirements. Answer: Indicates reliability for getting paid on time"
    ]
  },
  {
    title: "Organizing Your Search Results",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Sort by Age: See freshest loads first (default)",
      "Sort by Rate: Highest paying loads first (when rates posted)",
      "Sort by Trip: Longest or shortest loads based on your needs",
      "Sort by Deadhead: Closest pickups first",
      "Strategic Note: New loads constantly appear and may not sort automatically"
    ],
    trainerNotes: [
      "Default sort by age shows freshest loads first.",
      "Sort by rate when you want highest paying loads (but many don't show rates).",
      "Sort by trip for long hauls vs short runs based on driver preference.",
      "New loads pop up constantly and may not follow your sort order.",
      "QUESTIONS: When would you sort by trip distance? What's the advantage of sorting by deadhead?",
      "ANSWERS: Answer: When driver wants long hauls or prefers shorter runs. Answer: Find closest pickups to minimize empty miles"
    ]
  },
  {
    title: "Using Spot Rate Information",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Broker-to-Carrier Spot: Historical average for specific lane",
      "Rate Ranges: Minimum and maximum recent rates",
      "Market Context: Compare with trend line data for current conditions",
      "Negotiation Foundation: Use as starting point, not final answer",
      "Remember: Posted rates are always negotiable"
    ],
    trainerNotes: [
      "Spot rates show historical averages for specific lanes.",
      "Use as negotiation foundation, not final answer.",
      "Compare with market trend data to understand current conditions.",
      "Remember: every load is negotiable regardless of posted information.",
      "QUESTIONS: How reliable are spot rate averages? Should you always ask for rates above the average?",
      "ANSWERS: Answer: Good baseline, but market conditions change daily. Answer: Depends on market conditions, urgency, and your negotiation skills"
    ]
  },
  {
    title: "Understanding Equipment Requirements",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Team Drivers: VM (Van with Team) for urgent deliveries",
      "Multi-Equipment: Van OR Flatbed options",
      "Dedicated Lanes: Regular recurring shipments",
      "Contract Freight: Long-term arrangements vs spot market",
      "Hot Loads: Last-minute, higher-paying urgent freight"
    ],
    trainerNotes: [
      "Team loads (VM) require two drivers for faster delivery.",
      "Multi-equipment loads can use different trailer types.",
      "Dedicated lanes are recurring shipments - great for relationship building.",
      "Hot loads are urgent and typically pay premium rates.",
      "QUESTIONS: Why do team loads pay more? What's the benefit of dedicated lanes?",
      "ANSWERS: Answer: Faster delivery, continuous driving, higher operational costs. Answer: Predictable income, stronger broker relationships, less searching"
    ]
  },
  {
    title: "Professional Load Search Approach",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Start Broad: Use wide parameters to see full market",
      "Analyze Patterns: Identify common lanes and rates",
      "Narrow Focus: Refine search based on carrier preferences",
      "Call Strategy: Contact brokers on most promising loads first",
      "Documentation: Keep notes on loads called and broker responses"
    ],
    trainerNotes: [
      "Start with broad parameters to see the full market landscape.",
      "Look for patterns in rates, lanes, and broker activity.",
      "Narrow your focus based on what your carrier actually wants.",
      "Call the most promising loads first - they won't wait.",
      "QUESTIONS: Why start broad instead of narrow? How do you prioritize which loads to call first?",
      "ANSWERS: Answer: Get full market picture before making decisions. Answer: Best rates, shortest deadhead, preferred lanes, broker reputation"
    ]
  },
  {
    title: "Section 11 Resources",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Practice Exercise: Search loads for different equipment types",
      "Rate Comparison: Compare spot rates across multiple lanes",
      "Search Templates: Parameter checklists for different scenarios",
      "Broker Contact: Log template for tracking calls and responses",
      "Next Step: Sample dispatcher call and negotiation techniques"
    ],
    trainerNotes: [
      "Practice with different equipment types to understand market variations.",
      "Compare rates across multiple lanes to identify hot and cold markets.",
      "Use our templates to stay organized and track your progress.",
      "Next up: we'll listen to an actual dispatcher call and negotiation."
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
export default function LoadisticsSection11({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={11}
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
                        onClick={() => onNavigateToSection(10)} 
                        disabled={false}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 10)
                      </Button>
                      <Button onClick={() => onNavigateToSection(12)} className="rounded-xl">
                        Next Section (Section 12) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 11</div>
    </div>
  );
}
