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
    sectionLabel: "Section 19",
    title: "Step 10 — Repeat! Mastering the Dispatch Cycle and Professional Excellence",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to the final step in the dispatch process - and it's the most important one for long-term success.",
      "Tell the class: 'Hey, look at us! Step by step, we've learned the mechanics of the truck loading process.'",
      "Set the stage: 'This section is about turning what you've learned into a professional, repeatable system.'",
      "Emphasize mastery: 'The 10th step isn't really a step - it's about mastering the entire cycle through repetition.'",
      "Connect to career growth: 'This is where you transform from someone who knows the steps to a true professional dispatcher.'"
    ]
  },
  {
    title: "The Complete Dispatch Process: Steps 1-9 Review",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Step 1 — Planning: Analyze carrier goals, prepare route options, check driver availability",
      "Step 2 — Posting Trucks: Log into load boards and notify brokers of truck availability",
      "Step 3 — Load Search: Sort through options, call brokers, negotiate rates",
      "Step 4 — Booking: Secure loads verbally, complete documentation and finalize details",
      "Step 5 — Rate Confirmation: Obtain confirmation and send driver instructions",
      "Step 6 — Transit Management: Monitor location and provide broker status updates",
      "Step 7 — Delivery: Driver delivers load and obtains proof of delivery",
      "Step 8 — Invoicing: Submit invoices on behalf of carrier",
      "Step 9 — Record Keeping: Track shipments and maintain commission records"
    ],
    trainerNotes: [
      "Walk through each step systematically: 'Let's summarize and recall the whole structure we've learned.'",
      "Emphasize progression: 'Step one - Planning. We analyze the carrier's goals and preferences, prepare route options.'",
      "Continue methodically: 'Step two - Posting the truck. We log in to load boards and let brokers know we have availability.'",
      "Build momentum: 'Step three - Searching for loads. We sort through options, call brokers, and negotiate rates.'",
      "Show completion: 'Each step builds on the previous one, creating a complete professional process.'",
      "Ask the class: 'But what is the 10th step?' Wait for responses before revealing the answer."
    ]
  },
  {
    title: "Step 10: The Power of Repetition",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Continuous Cycle: After completing work for one truck, start from scratch for the next",
      "Multiple Opportunities: Look for next loads for trucks you just finished loading",
      "Customer Expansion: Apply the same process to new customers and carriers",
      "Never Boring: Despite repetition, dispatchers are never bored due to constant variety",
      "Skill Development: Repetition builds the expertise needed to handle multiple trucks simultaneously"
    ],
    trainerNotes: [
      "Reveal the answer: 'Well, actually, it's just repetition. After you've done all the work for one truck, you start from scratch.'",
      "Explain the cycle: 'You do the same for the next truck, or the next customer, or look for the next load for the truck you just finished.'",
      "Address concerns: 'It sounds kind of repetitive, but trust me, dispatchers are never bored at work.'",
      "Connect to growth: 'To work with five or more trucks simultaneously, you need to develop important skills.'",
      "List key skills: 'Stress resistance, multitasking, and most importantly, excellent time management.'"
    ]
  },
  {
    title: "Essential Skills for Multi-Truck Operations",
    layout: "table",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Skill", "Description", "Why It Matters"],
      rows: [
        [
          "Rapid Task Switching",
          "Perform completely unrelated actions in short time periods",
          "Essential for managing multiple trucks with different needs"
        ],
        [
          "Stress Resistance",
          "Maintain composure under pressure and tight deadlines",
          "Keeps decision-making clear when handling urgent situations"
        ],
        [
          "Multitasking",
          "Handle several processes simultaneously without losing focus",
          "Allows efficient management of 5+ trucks at the same time"
        ],
        [
          "Time Management",
          "Prioritize tasks and optimize workflow for maximum efficiency",
          "Most important skill - determines overall success and earnings"
        ],
        [
          "Experience Integration",
          "Apply lessons learned to improve future performance",
          "Accelerates professional growth and reduces mistakes"
        ]
      ]
    },
    trainerNotes: [
      "Explain skill development: 'Such a list of skills comes only with experience, but why not speed up the process?'",
      "Share methodology: 'When creating this lesson, I gathered my best employees and spoke with successful colleagues.'",
      "Pose the key question: 'I asked them all one simple question: How do you get things done?'",
      "Build anticipation: 'Here's a list of answers and recommendations from the best dispatchers in the industry.'",
      "Emphasize value: 'These are tricks and secrets from experienced dispatchers that can accelerate your learning.'"
    ]
  },
  {
    title: "Professional Tip #1: Strategic Time Management",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Planning Outside Hours: Do all planning and analysis outside of working hours",
      "Peak Hour Focus: When 8 AM strikes, all focus goes to brokers and booking loads",
      "Strategic Call Timing: Move long calls with clients and drivers to end of day",
      "Broker Priority: Prime business hours are reserved exclusively for broker interactions",
      "Preparation Advantage: Pre-work preparation maximizes productive business hours"
    ],
    trainerNotes: [
      "Quote the expert: 'I do all the planning and analysis outside of working hours.'",
      "Explain the strategy: 'I try my best to move long calls with clients and drivers to the end of the day.'",
      "Emphasize focus: 'When the clock strikes 8 AM, all my focus is on brokers and booking loads.'",
      "Connect to success: 'This time management strategy maximizes your most productive hours.'",
      "Ask the class: 'Why do you think focusing on brokers during peak hours is so important?'"
    ]
  },
  {
    title: "Professional Tip #2: Memory Management System",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Write Everything Down: Never keep anything in your head - use a notebook system",
      "Immediate Capture: Every note, task, and important detail goes into the notebook instantly",
      "Task Management: If you can't start a new task immediately, write it down first",
      "High Volume Handling: Sometimes accomplish 100+ tasks per day through systematic tracking",
      "Mental Clarity: Writing everything down prevents mental overload and missed details"
    ],
    trainerNotes: [
      "Quote directly: 'I don't keep anything in my head. Every little note, every task, every important detail goes into my notebook.'",
      "Explain the process: 'If a new task comes up and I don't immediately get started on it, it goes straight into my notebook.'",
      "Share the volume: 'Sometimes I have to write out and accomplish a hundred tasks in a day.'",
      "Emphasize necessity: 'Unless absolutely everything is written down, my head explodes.'",
      "Connect to reliability: 'This system ensures nothing gets forgotten and clients can count on you.'"
    ]
  },
  {
    title: "Professional Tip #3: Strategic Load Board Management",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Morning Routine: Post updates for all trucks and email brokers about availability",
      "Network Leverage: Build broker relationships that send good offers proactively",
      "Contact Strategy: Today's trucks get phone numbers, future trucks get email only",
      "Distraction Control: Email-only contact for future loads prevents unnecessary interruptions",
      "Systematic Processing: Handle today's trucks first, then process emails, then post tomorrow's trucks"
    ],
    trainerNotes: [
      "Share the routine: 'In the morning, I post updates for all trucks on load boards and send emails to brokers.'",
      "Explain scale: 'Sometimes I have 12-13 trucks for one day, so it's impossible to search for each one individually.'",
      "Highlight network value: 'I cover most trucks with incoming offers because I have a broker network that knows me well.'",
      "Detail the strategy: 'Trucks leaving today get phone numbers, ones leaving tomorrow get email only.'",
      "Explain reasoning: 'Otherwise I get a lot of distractions when I need to focus on immediate priorities.'"
    ]
  },
  {
    title: "Professional Tip #4: Load Research and Timing",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Detailed Notes: Keep separate notes for each load to avoid duplicate calls",
      "Load Marking: Mark loads you don't like and remove them from your list",
      "Pickup Time Tracking: Always mark pickup times to monitor load aging",
      "Timing Strategy: Check how much time brokers have left to close loads",
      "Rate Leverage: Less time remaining means brokers are more willing to pay higher rates"
    ],
    trainerNotes: [
      "Explain documentation: 'When I call on loads, I always keep a separate note for each load.'",
      "Show efficiency: 'There might be a lot of calls, so I save information so I don't call the same broker many times.'",
      "Share board features: 'On most boards you can mark loads you don't like and remove them from the list.'",
      "Emphasize timing: 'Always mark the pickup time - if it hangs on the board for a long time, check how much time the broker has left.'",
      "Reveal strategy: 'The less time they have, the more they're willing to pay. This is valuable leverage.'"
    ]
  },
  {
    title: "Professional Tip #5: Client Communication and Planning",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Upfront Discussion: Discuss timing preferences with clients before searching",
      "Goal Alignment: Understand how much money the client wants to make",
      "Expectation Setting: Clarify client goals and timeline preferences early",
      "Time Efficiency: Good communication prevents wasted search time",
      "Strategic Planning: Book 1-2 loads in advance when possible for better long-term earnings"
    ],
    trainerNotes: [
      "Share the problem: 'Sometimes you sit around all morning looking for loads and then the client says, Let's wait until evening.'",
      "Emphasize waste: 'Maybe prices will go up. It's a waste of time.'",
      "Provide solution: 'It's better to call right away and say I'm looking for loads and discuss goals.'",
      "Show benefits: 'Good communication saves a lot of time and prevents misunderstandings.'",
      "Add strategy: 'If possible, I book at least 1-2 loads in advance. Carriers who work this way always earn more long-term.'"
    ]
  },
  {
    title: "Professional Tip #6: The Power of the Last Hour",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Key to Success: Make the last hour of work count - it's crucial for success",
      "Mindset Shift: Many people relax in the last hour, but professionals stay focused",
      "Tomorrow's Advantage: Use end-of-day time to secure tomorrow's loads",
      "Broker Alignment: Connect with brokers who are also interested in closing tomorrow's shipping",
      "Relationship Building: Develop daily end-of-day calling partnerships with key brokers"
    ],
    trainerNotes: [
      "Emphasize importance: 'I always make the last hour of work count. It's the key to success.'",
      "Contrast approaches: 'Many people think the last hour is time to relax. They think, Oh, I have a truck for tomorrow, whatever.'",
      "Share strategy: 'Me, I sit there at 6 PM calling for tomorrow's loads.'",
      "Explain advantage: 'I run into brokers who are also interested in closing tomorrow's shipping.'",
      "Show relationships: 'There are guys I regularly call every day at the end of the day, and together we look for opportunities.'"
    ]
  },
  {
    title: "Implementing Professional Excellence",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Monthly Review: Make notes and review this training a month after starting work",
      "Continuous Improvement: Regular review guarantees useful insights and work quality improvement",
      "Foundation Complete: This module completes the first introductory part of the course",
      "Advanced Learning: Next modules contain information needed to become a real professional",
      "Homework Completion: Complete assignments to earn points and reinforce learning"
    ],
    trainerNotes: [
      "Provide actionable advice: 'I recommend making a note to yourself and reviewing this class a month after you start working.'",
      "Promise results: 'I guarantee that you will recapture useful insights and improve the quality of your work.'",
      "Mark milestone: 'We're finishing up this module and the first introductory part of the course.'",
      "Set expectations: 'The next four modules are the advanced part with information to become a real professional.'",
      "Give instructions: 'Be sure to complete homework assignments to earn points and absorb the information.'"
    ]
  },
  {
    title: "Your Journey to Professional Dispatcher Excellence",
    layout: "bullets",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Mastery Through Repetition: Excellence comes from consistently applying the 10-step process",
      "Professional Skills: Develop stress resistance, multitasking, and time management through practice",
      "Industry Secrets: Apply tips from the best dispatchers to accelerate your learning curve",
      "Systematic Approach: Use proven strategies for planning, communication, and load management",
      "Continuous Growth: Regular review and improvement ensure long-term career success"
    ],
    trainerNotes: [
      "Wrap up the journey: 'You now have the complete framework for professional dispatching success.'",
      "Emphasize practice: 'Remember, mastery comes through repetition and consistent application of these principles.'",
      "Highlight advantage: 'You have industry secrets that many dispatchers learn only through years of trial and error.'",
      "Encourage implementation: 'Start applying these professional tips from day one of your dispatcher career.'",
      "Close with confidence: 'With this foundation and these professional strategies, you're ready to excel as a company dispatcher.'",
      "Final message: 'Take a couple of days to rest and absorb this information. See you in the advanced modules!'"
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
export default function LoadisticsSection19({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={19}
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
                    <div className="flex gap-3 flex-wrap">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(18)} 
                        disabled={19 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 18)
                      </Button>
                      
                      {/* Quiz Break #2 Button - only show on last slide */}
                      {slide.isMaterialsSlide && (
                        <Button 
                          onClick={() => onNavigateToSection("quiz-break-2")} 
                          className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                          🎯 Quiz Break #2
                        </Button>
                      )}
                      
                      <Button onClick={() => onNavigateToSection(20)} className="rounded-xl">
                        Next Section (Section 20) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 19</div>
    </div>
  );
}
