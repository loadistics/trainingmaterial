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
    sectionLabel: "Section 20",
    title: "ELD Mandate and Hours of Service: Introduction and Brief Description",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to Module 4 - this marks the transition from basic dispatching to advanced professional skills.",
      "Tell the class: 'You already started the process of loading a truck and can call yourself a dispatcher.'",
      "Set expectations: 'It's time to move on to more advanced information - not just how to book loads, but what loads to book.'",
      "Preview upcoming content: 'In the next module, we'll dive into analyzing the freight market to maximize carrier profits.'",
      "Introduce today's focus: 'But first, we need to cover another equally important factor in choosing freight - proper driver scheduling.'"
    ]
  },
  {
    title: "What is Hours of Service (HOS)?",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Legal Framework: Series of laws and regulations governing driver work time",
      "Maximum Limits: Explains maximum time drivers are allowed to be on the job",
      "Driving vs. Working: Includes both driving time and other work-related activities",
      "Rest Requirements: Indicates number and length of mandatory rest periods",
      "Safety Purpose: Ensures drivers are awake and alert for safe operation"
    ],
    trainerNotes: [
      "Define HOS clearly: 'Hours of Service, or HOS for short, is a series of laws and regulations.'",
      "Explain scope: 'These explain the maximum amount of time drivers are allowed to be on the job, including driving time.'",
      "Emphasize safety: 'They indicate the number and length of rest periods to ensure drivers are awake and alert.'",
      "Connect to dispatching: 'As company dispatchers, understanding HOS is crucial for proper load planning.'",
      "Set the tone: 'This isn't optional knowledge - it's fundamental to professional dispatching.'"
    ]
  },
  {
    title: "Critical Importance: Rules, Not Recommendations",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Legal Requirements: HOS are mandatory rules, not tips or recommendations",
      "Carrier Compliance: All carriers are required to comply with these regulations",
      "Inspection Reality: Every transportation company undergoes inspection sooner or later",
      "Severe Penalties: Violations can result in hefty fines and complete company closure",
      "Dispatcher Responsibility: Your load planning decisions directly impact compliance"
    ],
    trainerNotes: [
      "Emphasize seriousness: 'I want to emphasize that Hours of Service is not a list of tips or recommendations, but rather a set of rules.'",
      "Stress compliance: 'Carriers are required to comply with these rules - there's no flexibility here.'",
      "Share consequences: 'Every transportation company undergoes inspection sooner or later.'",
      "Detail penalties: 'If these rules have not been followed, penalties can be severe, up to complete closure and hefty fines.'",
      "Connect to role: 'As dispatchers, your load planning decisions can make or break compliance.'"
    ]
  },
  {
    title: "Dispatcher Involvement Levels",
    layout: "table",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Work Environment", "Access Level", "Responsibilities"],
      rows: [
        [
          "Owner-Operators",
          "Limited access to detailed truck movement statistics",
          "Know HOS basics, consult with drivers, book loads accordingly"
        ],
        [
          "Large Companies",
          "Full access to ELD systems and detailed tracking",
          "Monitor compliance, prevent violations, manage multiple drivers"
        ],
        [
          "Company Dispatchers",
          "Company-provided ELD platforms and reporting tools",
          "Proactive compliance management, violation prevention, load optimization"
        ]
      ]
    },
    trainerNotes: [
      "Explain variability: 'Depending on what responsibilities the carrier has assigned you, your HOS involvement will vary.'",
      "Detail owner-operator scenario: 'Working with owner-operators, dispatchers rarely have access to detailed truck statistics.'",
      "Explain basic role: 'In this case, you just need to know HOS basics and consult with drivers about remaining hours.'",
      "Contrast with companies: 'Working for a large company, your responsibility may be wider - you'll monitor and prevent violations.'",
      "Reassure completeness: 'Either way, this module gives you enough knowledge for any situation.'"
    ]
  },
  {
    title: "The Golden Rules of Hours of Service",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Daily Limit: Driver allowed to work 14 consecutive hours per day",
      "Driving Limit: Only 11 hours of the 14 can be spent driving",
      "Distance Capability: 600-700 miles average per single working period",
      "Mandatory Rest: 10 consecutive hours of rest required after 14-hour period",
      "No Pausing: Once work starts, the 14-hour clock cannot be paused or extended"
    ],
    trainerNotes: [
      "Introduce the cheat sheet: 'Before detailed analysis, I've prepared a short set of rules - like a cheat sheet.'",
      "Suggest practical use: 'You can write this out or print it and put it somewhere visible when you work.'",
      "Present the golden rules: 'These are the golden rules of Hours of Service. Let's go.'",
      "Detail the 14/11 rule: 'A driver is allowed to work 14 consecutive hours per day, of which only 11 hours may be spent driving.'",
      "Connect to distance: 'Speed limits are 65-75 mph, so with 11 hours driving, a truck can cover 600-700 miles average.'"
    ]
  },
  {
    title: "Daily Distance and Time Management",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Speed Limits: US highways typically 65-75 mph maximum",
      "Theoretical Maximum: 700 miles in ideal conditions with 11-hour driving window",
      "Practical Reality: 600 miles per day is more realistic target",
      "Traffic Factors: Account for delays, fuel stops, and other interruptions",
      "Driver Consultation: Always confirm delivery capability with individual drivers"
    ],
    trainerNotes: [
      "Explain the math: 'Speed limits on US highways are 65 to 75 mph.'",
      "Show calculation: 'Given an 11-hour driving window, a truck can drive 600-700 miles average in a single working period.'",
      "Emphasize realism: 'That's the maximum based on speed limits and physical driver abilities.'",
      "Factor in reality: 'If you factor in traffic delays, stops for gas and so on, it's better to aim for around 600 miles.'",
      "Best practice: 'Even better, consult with the driver regarding his ability to deliver a load on time.'"
    ]
  },
  {
    title: "Rest Requirements and Work Clock Rules",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "10-Hour Rest: Must rest 10 consecutive hours after 14-hour work period",
      "No Truck Use: Cannot use truck for work during the 10-hour rest period",
      "Clock Activation: Once driver starts truck in work mode, 14-hour clock begins",
      "No Pausing: The 14-hour period cannot be paused or extended once started",
      "Revenue Focus: Dispatcher's job is ensuring most time is spent driving and generating revenue"
    ],
    trainerNotes: [
      "Explain rest requirement: 'After the 14-hour work period ends, the driver must rest for 10 consecutive hours.'",
      "Clarify restrictions: 'This means he may not use the truck for work for 10 hours straight.'",
      "Emphasize finality: 'Once the driver has started his truck and turned on work mode, he cannot pause it.'",
      "Stress urgency: 'His 14 hours start now and cannot be prolonged.'",
      "Define dispatcher role: 'Your job is to make sure he spends most time driving and generating revenue.'"
    ]
  },
  {
    title: "Weekly Limits and Reset Options",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Weekly Limit: Cannot work more than 70 hours within 8 consecutive days",
      "34-Hour Reset: Option to fully reset weekly schedule with 34 consecutive hours off",
      "Reset Restrictions: Cannot drive truck for work or do any transportation-related work",
      "Personal Use Exception: Driver may use truck for personal needs (finding parking, restaurants)",
      "Work Prohibition: Cannot approach pickups or deliveries without available working hours"
    ],
    trainerNotes: [
      "Introduce weekly limits: 'On top of the daily 14-hour limit, there is a weekly limit as well.'",
      "Explain the rule: 'Drivers cannot work more than 70 hours within a period of 8 consecutive days.'",
      "Detail reset option: 'To fully reset the weekly schedule, the driver may choose to do a 34-hour reset.'",
      "Clarify reset rules: 'This means he cannot drive the truck for work or do any other transportation work for 34 consecutive hours.'",
      "Important exception: 'The driver may use the truck for personal needs at any time, regardless of working hours.'"
    ]
  },
  {
    title: "Practical Load Planning Example #1",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Scenario: 1000-mile load pickup on Monday morning",
      "Day 1: Drive 500 miles Monday during the day",
      "Rest Period: Sleep and rest for 10 hours Monday night",
      "Day 2: Wake Tuesday morning, drive remaining 500 miles",
      "Delivery: Ready to deliver Wednesday morning or Tuesday evening at earliest"
    ],
    trainerNotes: [
      "Set up example: 'This should give you basic understanding on how to plan load deliveries.'",
      "Present scenario: 'If your driver is picking up a 1000-mile load on Monday morning, you know it will take him two days.'",
      "Walk through timeline: 'You can expect him to be ready to deliver Wednesday morning or Tuesday evening earliest.'",
      "Detail Day 1: 'He can drive 500 miles on Monday during the day, then sleep and rest for 10 hours.'",
      "Complete Day 2: 'Then wake up Tuesday morning and drive another 500 miles until Tuesday evening.'"
    ]
  },
  {
    title: "Practical Load Planning Example #2",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Scenario: 800-mile load booked Monday morning",
      "Timeline Issue: Should not expect Tuesday morning delivery",
      "Tuesday Reality: Driver wakes with 100-200 miles remaining",
      "Clock Management: Tuesday work clock starts when driver begins work",
      "Efficiency Problem: Most work time used for loading/unloading, minimal driving time"
    ],
    trainerNotes: [
      "Present challenging scenario: 'Say you're trying to book a load of 800 miles on Monday morning.'",
      "Identify problem: 'You shouldn't expect it to be delivered on Tuesday morning. He won't make it in time.'",
      "Analyze Tuesday afternoon: 'Even if delivery is Tuesday afternoon and driver can make it on time, consider this:'",
      "Explain clock issue: 'He'll wake up Tuesday with 100-200 miles left, and his work clock starts Tuesday morning.'",
      "Show inefficiency: 'Most of his work time will be used loading and unloading, driving only a small number of hours.'"
    ]
  },
  {
    title: "Why Dispatchers Avoid Inefficient Scheduling",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Time Waste: Work clock ticks during loading, unloading, and positioning",
      "Limited Driving: Very little actual driving time remains after logistics",
      "Lost Revenue: Partial day lost due to poor scheduling decisions",
      "Driver Frustration: Drivers prefer efficient use of their available hours",
      "Professional Standards: Good dispatchers maximize productive driving time"
    ],
    trainerNotes: [
      "Continue the example: 'By the time he's loaded with his next load, he will have very limited working time left.'",
      "Show the waste: 'So most of his work time will be used up loading and unloading.'",
      "Quantify loss: 'He will drive a small number of hours on Tuesday and part of that day will be lost.'",
      "Emphasize avoidance: 'This is usually something a dispatcher tries to avoid.'",
      "Connect to professionalism: 'Efficient scheduling is what separates good dispatchers from average ones.'"
    ]
  },
  {
    title: "Assessment and Next Steps",
    layout: "bullets",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Core Understanding: 14 total hours, 11 driving hours, no pausing allowed",
      "Distance Planning: Maximum 700 miles per day, 600 miles more realistic",
      "Consultation Practice: Always verify delivery capability with drivers",
      "Learning Process: HOS scheduling takes time to master initially",
      "Detailed Study: Next lesson covers regulations in greater depth"
    ],
    trainerNotes: [
      "Check understanding: 'If this all seems clear and understandable to you, congratulations, you can move on to the next lesson.'",
      "Offer reassurance: 'If you're still confused, move on to the next lesson anyway.'",
      "Explain progression: 'We will talk about the same thing, but in more detail.'",
      "Suggest review: 'Once you're through the second lesson, go back to this one and go through it again.'",
      "Normalize learning curve: 'HOS and driver scheduling is not difficult, but it takes time to get the gist of it initially.'"
    ]
  },
  {
    title: "HOS Golden Rules Quick Reference",
    layout: "table",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Rule", "Time/Distance", "Key Points"],
      rows: [
        [
          "Daily Work Limit",
          "14 consecutive hours",
          "Cannot be paused or extended once started"
        ],
        [
          "Daily Driving Limit",
          "11 hours maximum",
          "Within the 14-hour work period"
        ],
        [
          "Daily Distance",
          "600-700 miles",
          "600 miles is more realistic target"
        ],
        [
          "Mandatory Rest",
          "10 consecutive hours",
          "Required after each 14-hour work period"
        ],
        [
          "Weekly Limit",
          "70 hours in 8 days",
          "Can reset with 34 consecutive hours off"
        ]
      ]
    },
    trainerNotes: [
      "Summarize key points: 'In fact, just with this golden rule in your arsenal, you can already safely book loads.'",
      "Reinforce fundamentals: 'The main thing to understand is that once the driver has started work, he has 14 hours total and 11 hours of driving.'",
      "Emphasize finality: 'There is no way he can pause those hours.'",
      "Reiterate distance: 'Also, he can drive a maximum of 700 miles in a day before he has to take a 10-hour break.'",
      "Encourage reference use: 'Keep this reference handy - you'll use it constantly in your dispatching work.'"
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
export default function LoadisticsSection20({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={20}
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
                        onClick={() => onNavigateToSection(19)} 
                        disabled={20 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 19)
                      </Button>
                      <Button onClick={() => onNavigateToSection(21)} className="rounded-xl">
                        Next Section (Section 21) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 20</div>
    </div>
  );
}
