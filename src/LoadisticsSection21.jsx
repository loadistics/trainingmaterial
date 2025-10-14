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
    sectionLabel: "Section 21",
    title: "Advanced Information on Hours of Service and Regulations",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to the detailed dive into Hours of Service regulations - this builds on our introduction.",
      "Tell the class: 'In this lesson, we continue learning HOS regulations in detail, referring to rules set forth by the Federal Motor Carrier Safety Administration.'",
      "Set the approach: 'Let's start reviewing this topic from the very beginning, like we didn't even go over it in the previous lesson.'",
      "Emphasize authority: 'These aren't company policies - these are federal regulations with serious legal consequences.'",
      "Prepare for complexity: 'This lesson covers the four critical limits that every professional dispatcher must master completely.'"
    ]
  },
  {
    title: "HOS Provisions: Federal Framework",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Federal Authority: Rules set forth by the Federal Motor Carrier Safety Administration (FMCSA)",
      "Driver Focus: Provisions focus on when and how long a driver is allowed to be on the job",
      "Specific Limits: Set specific limits on truck operation time and total job hours",
      "Prohibition Rules: Define when drivers are prohibited from using commercial vehicles",
      "Professional Requirement: Must always follow the four critical limits without exception"
    ],
    trainerNotes: [
      "Establish authority: 'The Hours of Service provisions focus on when and how long a driver is allowed to be on the job.'",
      "Explain scope: 'By setting specific limits on the amount of time a driver can operate a truck and total hours on the job.'",
      "Emphasize prohibition: 'These rules define when drivers are prohibited from using the commercial vehicle.'",
      "Introduce the four limits: 'You must always follow the four limits - no exceptions, no flexibility.'",
      "Preview content: 'We'll break down each limit separately with detailed examples and practical applications.'"
    ]
  },
  {
    title: "The Four Critical HOS Limits",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "14-Hour Work Window: Maximum consecutive hours allowed for work-related activities",
      "11-Hour Driving Limit: Maximum driving time within the 14-hour work window",
      "30-Minute Break Requirement: Mandatory rest break after 8 hours of continuous driving",
      "Weekly Limits: 60 hours per 7 days OR 70 hours per 8 days maximum",
      "Rolling Calculation: All limits use rolling periods, not calendar-based calculations"
    ],
    trainerNotes: [
      "List the four limits clearly: '14-hour work window, 11-hour driving limit, 30-minute break requirement, and weekly work limits.'",
      "Explain the structure: 'These are the 60 hour per seven day or 70 hour per eight day work limits.'",
      "Emphasize interconnection: 'All four limits work together - violating any one puts the driver and carrier at risk.'",
      "Stress importance: 'Let's break down each limit separately with detailed explanations and examples.'",
      "Set expectations: 'By the end of this section, you'll understand exactly how to calculate and apply each limit.'"
    ]
  },
  {
    title: "14-Hour Work Window: Detailed Rules",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Daily Restriction: 14 consecutive hours maximum for any work-related activities",
      "Vehicle Operation: Driver allowed to operate vehicle and do job-related activities",
      "Mandatory Rest: Must rest 10 consecutive hours before starting new work period",
      "No Extensions: Nothing can prolong this period once work begins",
      "Clock Continues: 14 hours tick continuously, even during breaks, lunch, or naps"
    ],
    trainerNotes: [
      "Define the window: 'This window is generally considered a daily restriction - 14 consecutive hours.'",
      "Explain activities: 'A driver is allowed to operate the vehicle and do any other job-related activities.'",
      "Clarify rest requirement: 'After 14 consecutive hours, a driver may not work until he or she has rested for 10 consecutive hours.'",
      "Emphasize no pausing: 'Driving is limited to the 14-hour period, even if the driver has time off like lunch or naps.'",
      "Stress finality: 'Nothing can prolong this period if the driver has started his working hours.'"
    ]
  },
  {
    title: "14-Hour Work Window: Practical Example",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Scenario: Driver has 10 continuous hours of rest and starts work at 6:00 AM",
      "Work Period: Can work until 8:00 PM that evening (14 hours after start)",
      "Driving Cutoff: Cannot drive truck after 8:00 PM, regardless of actual driving time",
      "Non-Driving Activities: Can do other non-truck activities after 8:00 PM",
      "Next Work Period: Cannot drive truck again until after 10 consecutive hours of rest"
    ],
    trainerNotes: [
      "Walk through example: 'The driver had 10 continuous hours of rest and started work at 6 AM.'",
      "Show calculation: 'He can no longer drive his truck after 8 PM that evening, which is 14 hours after he started work.'",
      "Clarify activities: 'He can do other things that don't involve using his truck after 8 PM.'",
      "Explain limitations: 'No one can really stop him from that, but he can no longer drive the truck.'",
      "Emphasize rest requirement: 'He cannot drive again until he has rested for another 10 consecutive hours.'"
    ]
  },
  {
    title: "11-Hour Driving Limit: Detailed Rules",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Maximum Driving: No more than 11 hours of driving within the 14-hour work window",
      "8-Hour Rule: Cannot drive more than 8 hours without taking a break",
      "30-Minute Break: Required break after 8 hours of continuous driving",
      "Driving vs. Working: Can do other work activities after 11 hours of driving",
      "Commercial Vehicle: Prohibition applies to commercial vehicle use on public roads"
    ],
    trainerNotes: [
      "Define the limit: 'During the 14 consecutive hours mentioned above, a driver is allowed to drive for no more than 11 hours.'",
      "Explain distribution: 'The driver may spend a total of 11 hours driving during the 14-hour period.'",
      "Introduce 8-hour rule: 'However, he's not allowed to drive for more than 8 hours without a break.'",
      "Detail break requirement: 'After 8 hours of continuous driving, the driver is required to take a break for at least 30 minutes.'",
      "Clarify scope: 'This applies to commercial vehicle use on public roads for work purposes.'"
    ]
  },
  {
    title: "11-Hour Driving Limit: Practical Example",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Start: Driver rested 10 consecutive hours, arrived at work at 6:00 AM",
      "First Driving Period: Drove from 7:00 AM to 3:00 PM (8 hours behind the wheel)",
      "Mandatory Break: Took required 30-minute break at 3:00 PM",
      "Second Driving Period: Can drive another 3 hours until 6:30 PM",
      "Total: 11 hours driving + 30 minutes break = 11.5 hours of 14-hour window used"
    ],
    trainerNotes: [
      "Set up example: 'The driver has been resting for 10 consecutive hours.'",
      "Walk through timeline: 'He arrived at work at 6 AM and drove from 7 AM to 3 PM. That's 8 hours behind the wheel.'",
      "Show break compliance: 'He then took a 30-minute break as required and then can drive another 3 hours until 6:30 PM.'",
      "Calculate totals: 'That's a total of 11 hours driving, plus 30 minutes of break time.'",
      "Explain remaining time: 'He can do other work after 6:30 PM because he still hasn't used all 14 working hours.'"
    ]
  },
  {
    title: "30-Minute Break Requirement: Rules and Flexibility",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Trigger Point: Required after 8 hours of continuous driving time",
      "Minimum Duration: At least 30 minutes of break time required",
      "Reset Effect: After break, driver gets another 8 hours of continuous driving",
      "Flexible Timing: Driver can take breaks earlier and more frequently if desired",
      "Multiple Breaks: Can take as many breaks as wanted throughout the day"
    ],
    trainerNotes: [
      "Define requirement: 'HOS regulations require that once 8 hours have elapsed since the start of continuous driving, the driver must take at least 30 minutes break.'",
      "Clarify timing: 'It doesn't mean the driver must wait 8 hours before taking a break.'",
      "Explain maximum: 'The rule simply suggests that 8 hours is maximum driving time without a single break.'",
      "Show flexibility: 'The driver may take as many breaks as he wants.'",
      "Give example: 'If he drives for 1 hour and takes a 30-minute break, he then has another 8 hours of driving before requiring another break.'"
    ]
  },
  {
    title: "Weekly Limits: 60/70 Hour Rules",
    layout: "table",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Schedule Type", "Hour Limit", "Day Period", "Typical Use"],
      rows: [
        [
          "60-Hour Schedule",
          "60 hours maximum",
          "7 consecutive days",
          "Drivers who don't operate vehicles every day"
        ],
        [
          "70-Hour Schedule",
          "70 hours maximum",
          "8 consecutive days",
          "Most common - drivers operating daily"
        ],
        [
          "Rolling Period",
          "Based on floating days",
          "Not calendar weeks",
          "Hours from oldest day drop off each new day"
        ]
      ]
    },
    trainerNotes: [
      "Introduce complexity: 'Pay attention. This one is a little bit tricky.'",
      "Explain additional limits: 'In addition to the limits described above, there is a 60 or 70 hour limit.'",
      "Define period: 'This limit is based on a 7 or 8 day period, starting at the time specified by a motor carrier.'",
      "Clarify not calendar-based: 'This limit is called a weekly limit. However, it's not based on a set week like Monday through Sunday.'",
      "Explain rolling nature: 'The limit is based on a rolling or floating 7 or 8 day period.'"
    ]
  },
  {
    title: "Rolling Period Calculation: How It Works",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Floating Period: Based on rolling 7 or 8 day period, not calendar weeks",
      "Daily Reset: Hours from oldest day are deducted at the end of each new day",
      "70/8 Example: When new day begins, hours from 9 days ago are excluded",
      "Continuous Tracking: Must track hours for the specified number of consecutive days",
      "Compliance Check: Total hours must stay within 60/7 or 70/8 limits"
    ],
    trainerNotes: [
      "Explain rolling concept: 'The hours of the oldest day in the floating period are deducted at the end of each new day.'",
      "Give specific example: 'If a driver works on a schedule of 70 hours per 8 days, when a new day begins, the current day would be the newest day.'",
      "Show exclusion: 'The hours the driver worked 9 days ago are excluded from the calculation.'",
      "Emphasize rolling nature: 'This is exactly what I mean when I say it's a rolling cycle.'",
      "Clarify basis: 'It's based on the past 8 days from today.'"
    ]
  },
  {
    title: "Rolling Period Example: Driver Schedule Analysis",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Date", "Hours Worked", "Running Total", "Status"],
      rows: [
        ["Sept 1 (Day 1)", "14 hours", "14", "Within limits"],
        ["Sept 2 (Day 2)", "6 hours", "20", "Within limits"],
        ["Sept 3 (Day 3)", "12 hours", "32", "Within limits"],
        ["Sept 4-8 (Days 4-8)", "58 hours total", "70", "At limit"],
        ["Sept 9 (Day 9)", "14 hours (Sept 1 drops off)", "70", "Still compliant"]
      ]
    },
    trainerNotes: [
      "Present scenario: 'Let's look at an example of a driver schedule.'",
      "Show accumulation: 'The driver has accumulated a total of 70 work hours over an 8-day period.'",
      "Confirm compliance: 'Considering this driver works under the 70 hours per 8 day schedule, he is currently in full compliance.'",
      "Explain transition: 'When the driver goes into the next day of the cycle, Thursday, September 9th.'",
      "Show calculation: 'The hours from day one are deleted and the driver calculates hours from day two to day nine.'"
    ]
  },
  {
    title: "Rolling Period Challenge Question",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Question: Can the driver work another 14 hours on September 10th?",
      "Analysis: Only 6 hours from September 2nd will be deducted",
      "Calculation: Current 70 hours - 6 hours + 14 new hours = 78 hours",
      "Result: 78 hours exceeds the 70-hour limit",
      "Answer: No, the driver cannot work 14 hours without violating HOS regulations"
    ],
    trainerNotes: [
      "Pose the question: 'Can the driver work another 14 hours the next day, September 10th?'",
      "Encourage thinking: 'Pause the video for a moment and give it a little thought.'",
      "Reveal answer: 'If you said he can't, you were correct.'",
      "Explain reasoning: 'As you can see, he only worked 6 hours on September 2nd.'",
      "Show violation: 'If he drives another 14 hours on September 10th, he will go over the allowed 70-hour limit and be in violation.'"
    ]
  },
  {
    title: "34-Hour Reset: Clean Slate Option",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Purpose: Allows restart of 60-hour or 70-hour cycle",
      "Requirement: Driver must spend 34 or more consecutive hours free from work",
      "Reset Effect: Hours restart from zero, full 60 or 70 hours available again",
      "Optional Rule: 34-hour restart is optional, not mandatory",
      "Typical Timing: Usually taken on weekends for practical scheduling"
    ],
    trainerNotes: [
      "Introduce solution: 'The driver is already at the limit of his weekly working hours. It would be nice to reset those hours.'",
      "Present option: 'Luckily, such an option exists. It's called a 34-hour reset.'",
      "Explain mechanism: 'HOS regulations allow a carrier to restart the 60 or 70 hour cycle by having the driver spend 34 or more consecutive hours free from work.'",
      "Show benefit: 'After the driver has done a 34-hour reset, his hours are restarted from zero.'",
      "Clarify nature: 'The 34-hour restart is an optional, not a mandatory regulatory provision.'"
    ]
  },
  {
    title: "34-Hour Reset: Practical Example",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Scenario: Carrier operates on 70 hours per 8 days, driver works 14 hours daily for 5 days",
      "Problem: Driver has worked 70 hours and cannot drive until hours fall below limit",
      "Solution: Driver takes advantage of 34-hour reset option",
      "Result: Can get behind the wheel immediately after 34-hour break from work",
      "Weekend Strategy: Friday delivery → pickup load → 34-hour reset → Monday delivery"
    ],
    trainerNotes: [
      "Set up scenario: 'If your carrier operates on the 70 hour, 8 day limit and the driver works 14 hours a day for 5 consecutive days, he has worked 70 hours.'",
      "Show problem: 'He won't be able to drive again until his total work hours fall below the 70-hour mark.'",
      "Present solution: 'However, if he decides to take advantage of the 34-hour reset, he will be able to get behind the wheel immediately.'",
      "Detail weekend strategy: 'Typically, drivers take a 34-hour reset on the weekends.'",
      "Walk through example: 'Driver delivers Friday, dispatcher finds short load with Friday pickup and Monday delivery, driver does 34-hour reset.'"
    ]
  },
  {
    title: "Dispatcher's Role and Responsibilities",
    layout: "bullets",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Knowledge Requirement: Dispatcher must know all HOS rules for load booking and scheduling",
      "Driver Responsibility: Driver bears the responsibility for following Hours of Service",
      "Practical Application: Simply call driver to ask about remaining hours",
      "Professional Preparation: Learn all rules to be prepared for any work scenario",
      "No Manual Calculation: Never have to calculate working hours on paper in real work"
    ],
    trainerNotes: [
      "Acknowledge complexity: 'This seems like a lot of information.'",
      "Offer review suggestion: 'If you're still uncertain, I suggest watching this whole module again on the second try.'",
      "Clarify dispatcher role: 'All of this is provided for your understanding - a dispatcher must know these rules.'",
      "Define responsibility: 'But he's not the one following them. The driver bears the responsibility for following HOS.'",
      "Show practical reality: 'You will simply call the driver and ask, Hey, how many hours do you have left today?'"
    ]
  },
  {
    title: "Real-World Application and Professional Standards",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Simple Communication: 'How many hours do you have left today?'",
      "Load Planning: 'Do we have enough hours for another short load this week?'",
      "Professional Goal: Become a true professional prepared for any work scenario",
      "Complete Understanding: Learn all rules before proceeding to advanced topics",
      "Practical Confidence: Knowledge gives you confidence in load planning decisions"
    ],
    trainerNotes: [
      "Show simplicity: 'In most cases, you will simply call the driver and ask questions like these.'",
      "Give examples: 'Hey, how many hours do you have left today? Or, Do we have enough time for another short load this week?'",
      "Emphasize simplicity: 'See, it's very simple, but you're here to become a true professional.'",
      "Connect to preparation: 'Get prepared for any work scenario.'",
      "Final instruction: 'So make sure you learn all these rules before you proceed.'",
      "Encourage mastery: 'This knowledge foundation will serve you throughout your entire dispatching career.'"
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
export default function LoadisticsSection21({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={21}
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
                        onClick={() => onNavigateToSection(20)} 
                        disabled={21 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 20)
                      </Button>
                      
                      {/* Quiz Break #3 Button - only show on last slide */}
                      {slide.isMaterialsSlide && (
                        <Button 
                          onClick={() => onNavigateToSection("quiz-break-3")} 
                          className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                          🎯 Quiz Break #3
                        </Button>
                      )}
                      
                      <Button onClick={() => onNavigateToSection(22)} className="rounded-xl">
                        Next Section (Section 22) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 21</div>
    </div>
  );
}
