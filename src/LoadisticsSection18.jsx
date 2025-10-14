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
    sectionLabel: "Section 18",
    title: "Step 9 — Accounting: Record Keeping for Professional Dispatchers",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to one of the most important professional skills - record keeping and accounting for dispatchers.",
      "Tell the class: 'We're getting really close to the end of this training module, and this lesson will set you up for long-term success.'",
      "Reassure them: 'Don't worry - this is not an introductory course for accountants. You don't need to be good with numbers.'",
      "Emphasize career importance: 'Whether you're just starting your dispatcher career or you're experienced, record keeping is vital for your professional growth.'",
      "Set expectations: 'As company dispatchers, this skill will make you invaluable to our operations and your own career development.'"
    ]
  },
  {
    title: "Why Record Keeping Matters for Company Dispatchers",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Professional Growth: Dispatchers who track data grow many times faster than those who don't",
      "Company Value: Accurate records help the company make better business decisions",
      "Performance Analysis: Data helps you identify what works and what doesn't",
      "Career Advancement: Managers notice dispatchers who can provide detailed performance reports",
      "Problem Solving: Historical data helps resolve disputes and optimize operations"
    ],
    trainerNotes: [
      "Start with a question: 'What's the purpose of keeping records? It seems like a silly question, but many of us neglect numbers.'",
      "Share reality: 'Many people don't keep track of personal finances or do taxes until the last day - don't let this be you professionally.'",
      "Emphasize company perspective: 'As company dispatchers, your record keeping directly impacts our ability to serve carriers better.'",
      "Personal growth angle: 'I realized that without giving employees the task of tracking their own performance, they wouldn't grow professionally.'",
      "Set the standard: 'I want to make sure you avoid this mistake and get on the right track from day one.'"
    ]
  },
  {
    title: "What Records Do Professional Dispatchers Track?",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Load Information: Complete details for every load dispatched for each carrier",
      "Broker Contacts: Database of broker relationships for future cooperation and reference",
      "Performance Metrics: Total miles, gross rates, rate per mile for each truck and carrier",
      "Financial Tracking: Dispatch fees, payment status, and invoice timing",
      "Operational Data: Detention, layovers, delivery performance, and special requirements"
    ],
    trainerNotes: [
      "Explain the scope: 'The main goals of having an accounting system in place are comprehensive load tracking.'",
      "Break down each category: 'Load information means every detail - pickup, delivery, rates, special instructions.'",
      "Emphasize broker relationships: 'Keep contacts of brokers for future cooperation - this builds our company's network.'",
      "Highlight metrics: 'Calculate basic truck performance indicators - this helps carriers understand their business.'",
      "Connect to service: 'Store additional information depending on what each carrier needs - this is customer service.'"
    ]
  },
  {
    title: "The Personal Office System",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Company Standard: We use a comprehensive system in our company operations",
      "Simplified Version: Beginner-friendly template covers all essential tracking needs",
      "User Friendly: Extremely easy to use, even for those new to spreadsheets",
      "Scalable Design: Grows with you as you handle more carriers and loads",
      "Professional Reports: Enables detailed reporting to carriers and management"
    ],
    trainerNotes: [
      "Introduce the system: 'For those who don't want to spend extra time creating their own system, we have a solution.'",
      "Explain company connection: 'We call it a Personal Office. We use a similar but much more complex system in our company.'",
      "Emphasize accessibility: 'I have simplified it to the bare minimum for beginner dispatchers joining our team.'",
      "Address experience levels: 'If you have Excel experience, you can fine-tune this tool or adjust it to your needs.'",
      "Focus on practicality: 'For those who want to focus on dispatching rather than spreadsheet design, this tool is perfect.'"
    ]
  },
  {
    title: "Personal Office Template Features",
    layout: "table",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Feature", "Purpose", "Benefit"],
      rows: [
        [
          "Load Tracking",
          "Record every load detail by carrier",
          "Complete historical record for analysis"
        ],
        [
          "Broker Database",
          "Maintain contact information and notes",
          "Build relationships and improve cooperation"
        ],
        [
          "Performance Metrics",
          "Calculate miles, rates, and efficiency",
          "Identify top performers and improvement areas"
        ],
        [
          "Financial Records",
          "Track dispatch fees and payment status",
          "Ensure accurate billing and cash flow"
        ],
        [
          "Custom Fields",
          "Add carrier-specific information",
          "Provide personalized service to each client"
        ]
      ]
    },
    trainerNotes: [
      "Walk through each feature systematically: 'Let's look at what this Personal Office template can do for you.'",
      "Emphasize completeness: 'Load tracking means every single load gets recorded - no exceptions.'",
      "Highlight relationship building: 'The broker database helps our company build stronger industry relationships.'",
      "Connect to performance: 'Performance metrics help you become a better dispatcher and help carriers succeed.'",
      "Show financial responsibility: 'Financial tracking ensures accurate billing and helps with cash flow management.'",
      "Stress customization: 'Custom fields let you provide the personalized service that sets our company apart.'"
    ]
  },
  {
    title: "Personal Office Guide Walkthrough",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    pdf: "/training-material/section20/pdfs/personal-office.pdf",
    bullets: [
      "Download Access: Personal Office guide available for immediate download and use",
      "Comprehensive Guide: Step-by-step instructions for setting up your record keeping system",
      "Professional Examples: Real-world samples showing proper data entry and organization",
      "Multiple Formats: Covers different approaches for various carrier types and business sizes",
      "Implementation Tips: Practical advice for making record keeping part of your daily routine"
    ],
    trainerNotes: [
      "Direct them to the guide: 'After finishing this training module, download the Personal Office guide and take time to study it.'",
      "Emphasize comprehensiveness: 'This guide walks you through everything - from basic setup to advanced tracking techniques.'",
      "Show practical benefits: 'Following this guide will help you build a professional record keeping system from day one.'",
      "Connect to growth: 'The examples and templates in this guide will help you continually develop as you gain experience.'",
      "Encourage implementation: 'Don't just read it - use the examples to build your own system immediately.'"
    ]
  },
  {
    title: "How to Use Your Personal Office Effectively",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Daily Updates: Enter load information immediately after booking and completion",
      "Regular Reviews: Check your records weekly to identify patterns and trends",
      "Comparative Analysis: Compare performance between different carriers and equipment types",
      "Seasonal Tracking: Monitor performance changes by season, month, and around holidays",
      "Continuous Improvement: Use data to identify areas for operational enhancement"
    ],
    trainerNotes: [
      "Establish habits: 'Check your Personal Office on a regular basis - make it part of your daily routine.'",
      "Encourage analysis: 'Compare figures between different carriers based on their equipment types and operating areas.'",
      "Highlight patterns: 'Compare performance by season of the year and months - you'll see interesting trends.'",
      "Point out timing factors: 'Observe changes in performance in the run-up to holidays and weekends.'",
      "Share experience: 'From my own experience, dispatchers who keep records in this format grow professionally many times faster.'"
    ]
  },
  {
    title: "The Professional Growth Impact",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Data-Driven Decisions: Make informed choices based on actual performance data",
      "Career Advancement: Demonstrate professional competence through detailed tracking",
      "Problem Resolution: Use historical data to resolve disputes and optimize processes",
      "Client Relationships: Provide carriers with valuable insights about their operations",
      "Company Value: Contribute to overall business intelligence and strategic planning"
    ],
    trainerNotes: [
      "Make the connection clear: 'A dispatcher who kept records and regularly analyzed data will grow professionally many times more.'",
      "Contrast with alternatives: 'Compare this to a dispatcher who didn't track data and just wrote random notes on paper.'",
      "Emphasize career impact: 'This level of professionalism sets you apart and makes you invaluable to our company.'",
      "Connect to service: 'Carriers will notice and appreciate the detailed insights you can provide about their operations.'",
      "Show company benefit: 'Your data contributes to our company's ability to make better strategic decisions.'"
    ]
  },
  {
    title: "Common Record Keeping Mistakes to Avoid",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Inconsistent Updates: Waiting days or weeks to enter data leads to forgotten details",
      "Incomplete Information: Missing key details makes historical analysis impossible",
      "No Backup System: Losing data due to computer problems or file corruption",
      "Ignoring the Data: Collecting information but never analyzing it for insights",
      "Random Note Taking: Using scraps of paper instead of organized digital systems"
    ],
    trainerNotes: [
      "Address common problems: 'Let me share the most common mistakes I see dispatchers make with record keeping.'",
      "Emphasize timing: 'The longer you wait to enter data, the more details you'll forget - enter information immediately.'",
      "Stress completeness: 'Incomplete records are almost useless for analysis - capture everything important.'",
      "Highlight protection: 'Always have a backup system - cloud storage or regular file copies prevent data loss.'",
      "Connect to growth: 'Data collection without analysis is wasted effort - regularly review your information for insights.'",
      "Discourage bad habits: 'Random notes on paper might seem easier, but they prevent you from growing professionally.'"
    ]
  },
  {
    title: "Integration with Company Operations",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Reporting Standards: Your records feed into company-wide performance reporting",
      "Team Collaboration: Share insights with other dispatchers to improve overall performance",
      "Management Communication: Provide detailed updates to supervisors and company leadership",
      "Carrier Relations: Use data to strengthen relationships with our carrier partners",
      "Business Development: Historical performance data supports new carrier acquisition"
    ],
    trainerNotes: [
      "Connect to bigger picture: 'Your Personal Office doesn't exist in isolation - it's part of our company's overall operations.'",
      "Explain reporting flow: 'Your detailed records help us create comprehensive company performance reports.'",
      "Encourage collaboration: 'Share insights with fellow dispatchers - we all benefit when the team improves.'",
      "Emphasize communication: 'Management values dispatchers who can provide detailed, data-backed updates.'",
      "Show business impact: 'Your performance data helps us demonstrate value to existing carriers and attract new ones.'",
      "Connect to growth: 'Good record keeping contributes to our company's ability to grow and serve more carriers.'"
    ]
  },
  {
    title: "Getting Started with Your Personal Office",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Download Guide: Get the Personal Office guide immediately after this training",
      "Initial Setup: Use the guide to customize your record keeping system for your assigned carriers",
      "Daily Practice: Start recording every load from your first day on the job",
      "Weekly Reviews: Schedule regular time to analyze your data and identify trends",
      "Continuous Improvement: Refine your system as you gain experience and handle more carriers"
    ],
    trainerNotes: [
      "Provide clear next steps: 'Here's exactly how to get started with your Personal Office system.'",
      "Emphasize immediacy: 'Download the guide as soon as this training is complete - don't wait.'",
      "Guide setup: 'Use the guide to help you set up your record keeping system for the specific carriers you'll be handling.'",
      "Establish habits: 'From your very first load, start recording everything - make it an automatic habit.'",
      "Schedule analysis: 'Block out time each week to review your data - this is where the real learning happens.'",
      "Encourage growth: 'Your system will evolve as you gain experience - that's normal and healthy professional development.'"
    ]
  },
  {
    title: "Summary and Professional Commitment",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Professional Standard: Record keeping is a fundamental skill for successful dispatchers",
      "Career Investment: Time spent on data tracking pays dividends in professional growth",
      "Company Value: Your organized records contribute to overall business success",
      "Competitive Advantage: Data-driven dispatchers outperform those who work without records",
      "Long-term Success: Consistent record keeping builds expertise that lasts throughout your career"
    ],
    trainerNotes: [
      "Wrap up with commitment: 'Record keeping isn't optional for professional dispatchers - it's a fundamental requirement.'",
      "Frame as investment: 'The time you spend tracking data is an investment in your own career growth.'",
      "Connect to company success: 'Your organized approach to record keeping contributes to our company's reputation and success.'",
      "Emphasize advantage: 'Dispatchers who use data consistently outperform those who rely on memory and intuition alone.'",
      "Close with long-term view: 'The habits you build now with record keeping will serve you throughout your entire career.'",
      "Final encouragement: 'Start using the Personal Office guide immediately - your future professional self will thank you.'"
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
export default function LoadisticsSection18({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={18}
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

                {/* PDF display */}
                {slide.pdf && (
                  <div className="mt-6">
                    <div className="text-lg font-semibold mb-3">Personal Office Guide</div>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <iframe 
                        src={slide.pdf}
                        className="w-full"
                        style={{ height: '600px', minHeight: '400px' }}
                        title="Personal Office Guide"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      Download this comprehensive guide after training to build your professional record keeping system
                    </p>
                  </div>
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slide.isMaterialsSlide) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(17)} 
                        disabled={18 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 17)
                      </Button>
                      <Button onClick={() => onNavigateToSection(19)} className="rounded-xl">
                        Next Section (Section 19) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 18</div>
    </div>
  );
}
