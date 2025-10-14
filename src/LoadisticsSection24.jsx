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
    sectionLabel: "Section 24",
    title: "Advanced Load Board Tools and Analysis",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to Section 24: 'Advanced Load Board Tools and Analysis' - this is Part 2 of our market analysis series.",
      "Key focus: 'After looking at the trend lines, I logged back into the load board. Actually, you will notice that this one looks a little bit different.'",
      "Tool progression: 'For previous demonstrations, I was using data trackers edge and now I'm using data power and this subscription is slightly more expensive, but I'm just going to use it because it has more tools.'",
      "Professional development: 'I want to show you all the set of tools that data has to offer.'"
    ]
  },
  {
    title: "DAT Power vs. DAT Edge - Subscription Levels",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "DAT Power: More expensive subscription with advanced tools",
      "DAT Edge: Basic subscription with essential load board features",
      "Tool availability depends on subscription level and monthly cost",
      "Some tools available to all, others require premium subscriptions",
      "Choose subscription based on your dispatching needs and budget"
    ],
    trainerNotes: [
      "Subscription explanation: 'Actually, you will notice that this one looks a little bit different. For previous demonstrations, I was using data trackers edge and now I'm using data power and this subscription is slightly more expensive, but I'm just going to use it because it has more tools.'",
      "Tool availability: 'Some of these tools will be available for you, some not, depending on what subscription you buy and how much money you'll be paying monthly for the load boards.'",
      "Professional choice: 'I want to show you all the set of tools that data has to offer.'",
      "Budget consideration: 'Choose your subscription level based on your needs and what you can afford as a dispatcher.'",
      "Tool progression: 'We'll start with basic search features and move to advanced analysis tools.'"
    ]
  },
  {
    title: "Broker-to-Carrier Spot Rate Analysis",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Click on any load to see historical rate data",
      "Shows average rate based on past 30-90 days of data",
      "Displays minimum and maximum rates for the lane",
      "Example: Lane paying $2.21/mile (min $2.09, max $2.39)",
      "Use with trend lines to adjust for current market conditions"
    ],
    trainerNotes: [
      "Rate discovery: 'We can click on the load and we get the broker to carry a spot. So this is a spot rate or an average rate based on historical statistics for the past 30 days, I believe.'",
      "Historical data: 'I'm not sure it could be 90 days actually. But historically this lane has been paying $2.21 per mile.'",
      "Rate range: 'And even here we can see that it should be paying a minimum of $2.09 and a maximum of $2.39 per mile.'",
      "Practical application: 'So already inside of the load board, while you're looking for loads, you can use this broker to carry a spot to get a general idea of how much this load should be paying.'",
      "Market adjustment: 'Of course, this statistics is taken from historical value, so if in the past months they've been paying $2.21, it doesn't mean that today they're going to be paying $2.21.'"
    ]
  },
  {
    title: "Combining Historical Data with Market Trends",
    layout: "table",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Historical Rate", "Market Trend", "Adjusted Rate Strategy", "Negotiation Approach"],
      rows: [
        ["$2.21/mile", "Market decreased", "Aim for lower rate", "Accept below historical average"],
        ["$2.21/mile", "Market increased", "Aim for $2.39+", "Negotiate above historical average"],
        ["$2.21/mile", "Market stable", "Aim for $2.21", "Use historical as baseline"],
        ["Key Insight", "Check trend lines weekly", "Adjust expectations", "Data-driven negotiations"]
      ]
    },
    trainerNotes: [
      "Integration strategy: 'Actually, it's very good to pair this with the trend lines. If you go see here and see, the average rate has been $2.21, you can go back to trend lines, see that percentage change over the week or over the month.'",
      "Market decrease scenario: 'And understand, okay, so they've been paying $2.21, but the market has actually decreased and it means I might be looking at a lower rate.'",
      "Market increase scenario: 'Or on the contrary, they've been paying $2.21, but the market has increased. So actually I should be asking for more than $2.21 I should probably be asking somewhere in the higher range of $2.39 per mile or more.'",
      "Strategic approach: 'This is very good to use this broker to carry your spot while looking at the trend lines, to see some trends and to understand how close to this value you should be aiming for.'",
      "Universal application: 'This is available in any load search, any load that I look for. I can always check out the broker to carry a spot for any line.'"
    ]
  },
  {
    title: "DAT Power Tools Overview",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Lane Makers: Identify top brokers by location and equipment type",
      "Market Conditions: Load-to-truck ratio maps by state and equipment",
      "Quick Rate Search: Fast lane rate lookup without full search",
      "Trend Lines: Weekly market analysis and rate trends",
      "DAT Directory: Search companies by name, number, or phone",
      "Truck Search: Compare load vs. truck availability statistics"
    ],
    trainerNotes: [
      "Tools introduction: 'So I have this little briefcase here and this is called Tools. And this is these are the tools available with paid subscriptions of it. So I'll go through each one of these.'",
      "Lane Makers: 'First one is line makers. Let's click on it. This is a very interesting tool, especially when you're just starting to work with a carrier.'",
      "Market Conditions: 'Next one is market conditions. Let's click on this. And Market condition index is pretty much just an index for a load to track ratio.'",
      "Quick Rate Search: 'Here's a quick rate search. This is actually a very, very simple tool.'",
      "Tool variety: 'So all of the tools are not really important to us and my subscription allows me to search for trucks so I can actually go and search for loads and then go and search for trucks.'"
    ]
  },
  {
    title: "Lane Makers - Broker Identification Tool",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Broker", "Load Postings", "Market Share", "Strategic Priority"],
      rows: [
        ["DML Transport", "22,000", "Market Leader", "Primary relationship focus"],
        ["Total Quality Logistics", "2,700", "Secondary", "Important secondary broker"],
        ["King of Freight LLC", "Variable", "Tertiary", "Additional option"],
        ["Tennessee Steel Haulers", "Variable", "Specialized", "Steel-specific loads"],
        ["Key Insight", "Location matters", "Volume = opportunity", "Build relationships strategically"]
      ]
    },
    trainerNotes: [
      "Tool purpose: 'This is a great tool, especially when you're just starting to work with a carrier. And actually it allows you to see what brokers have the most amounts of loads for your carrier.'",
      "Richmond example: 'So let's say I got a new carrier. He is a flatbed, for example, and he's based in, let's say, Richmond, Virginia. So I got this carrier, his relatively new he wants some loads from Richmond, Virginia.'",
      "Broker identification: 'I can go and click search here. And this will actually show me the brokers that have the most load postings out of Richmond, Virginia, in the past months.'",
      "DML dominance: 'So as you can see, the biggest one is transfer 22,000 load postings for flatbed out of Richmond, Virginia, in the past month. So that already gives me a clear understanding.'",
      "Strategic relationships: 'The first broker I have to set up is DML transport, and I'm probably going to book a lot of loads with them, so I better make good relationship with them for that carrier.'"
    ]
  },
  {
    title: "Market Conditions Index - Load-to-Truck Ratios",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Red areas: High load-to-truck ratio (tight capacity, hot markets)",
      "Blue areas: Low load-to-truck ratio (excess capacity, cold markets)",
      "Filter by equipment type: Van, Flatbed, or Reefer",
      "Filter by timeframe: Current, 7-day forecast, or 30-day history",
      "Use for strategic positioning and rate negotiation"
    ],
    trainerNotes: [
      "Index explanation: 'Market condition index is pretty much let me just click somewhere. Market condition index is pretty much just an index for a load to track ratio.'",
      "Color coding: 'So once again, tight capacity hot, it will be shown in red. Those are the areas with the highest low to track ratio. And then on the contrary, the blue ones are the areas with the least load to try with the smallest load to track ratio.'",
      "Equipment filtering: 'So we can choose buy equipment, van flat or reefer. And here it's given us by the key market area.'",
      "Timeframe options: 'But we can actually just choose, let's say by state and we can even use the timeframe prior business days current even has a seven day forecast or prior seven days prior 30 days.'",
      "Strategic application: 'You know, if my truck is in Georgia and I want to go to a cold state like Nebraska, they're going to be paying me a very high rate.'"
    ]
  },
  {
    title: "Regional Market Analysis Examples",
    layout: "table",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Region", "Market Condition", "Rate Expectation", "Strategic Note"],
      rows: [
        ["Georgia (Hot)", "High load-to-truck ratio", "Below market average", "Outbound loads pay less"],
        ["Nebraska (Cold)", "Low load-to-truck ratio", "Above market average", "Inbound loads pay more"],
        ["Texas East (Dallas/Houston)", "Hot zones", "Competitive rates", "Major economic centers"],
        ["Texas West (Desert)", "Cold zones", "Limited loads", "Avoid if possible"],
        ["Key Insight", "Hot to Cold = High rates", "Cold to Hot = Low rates", "Position strategically"]
      ]
    },
    trainerNotes: [
      "Rate implications: 'You know, if my truck is in Georgia and I want to go to a cold state like Nebraska, they're going to be paying me a very high rate.'",
      "Reverse scenario: 'And on the contrary, if I'm going from a cold state to a hot state from Nebraska to Georgia, I can expect a rate that's below general market average.'",
      "Texas example: 'Look at Texas. So Texas has cold zones. East of Texas is always hot. This is Dallas area. This is Houston area, the always hot.'",
      "Desert areas: 'And then other areas like this big one is a desert. So there's usually no loads here. And this this is shown to us by the market index.'",
      "Strategic positioning: 'So you can play around with this. You can you can see by area by market. Area market area is actually very interesting.'"
    ]
  },
  {
    title: "123 Load Board - Beginner-Friendly Alternative",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Easiest load board to get for beginner dispatchers",
      "Similar tools to DAT but more accessible",
      "Density List: Inbound/outbound load ratios by state",
      "Density Map: Load-to-truck ratio visualization",
      "Load Planner: Automated route planning tool",
      "Rate Check: Quick lane rate lookup",
      "Profit Calculator: Calculate carrier profitability"
    ],
    trainerNotes: [
      "Accessibility: 'But what I do want to show you today is 1 to 3 load boards and the tools it provides because it's the easiest load board to get for a beginner dispatcher.'",
      "Likely access: 'It's most likely you will have a one, two, three load board account even before you have a data account. So you'll most likely have access to it.'",
      "Similar functionality: 'This is essentially the exact same thing as load search on data. You'll be able to use it. No problem.'",
      "Density tools: 'I have load availability here, so it's called a density list. This is actually the exact same thing we saw on the data trackers edge, if you remember the in and out ratio.'",
      "Unique features: 'Another thing I want to show you is the load planner over here. This is something unique to the one, two, three load board.'"
    ]
  },
  {
    title: "Load Planner - Automated Route Planning",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Add truck with equipment type and fuel consumption",
      "Set origin, destination, and timeframe",
      "Choose load preferences: size, weight, posting age",
      "Set deadhead limits and load mile ranges",
      "Generates optimal route with 7 loads, 2,541 miles",
      "Shows daily revenue, fuel costs, tolls, and profit",
      "Provides broker contact information for each load"
    ],
    trainerNotes: [
      "Tool setup: 'So actually here I can add a truck and I can choose my equipment. Van, reefer, flatbed. Let's just go with Van and I can enter miles per gallon so I can enter the fuel consumption of the truck.'",
      "Route planning: 'And this is actually going to build a route plan for me. So this is a great tool for beginners and let's see how it works.'",
      "Indianapolis example: 'Where is your truck located? So I can put in a date. Let's just say like today Origin Point and let's say Indianapolis, for example.'",
      "Results analysis: 'This trip has seven loads. Mileage 2541 miles. The total deadhead is 411 418 revenue per day, $1,192 Costs fuel costs per day, $455.'",
      "Profit calculation: 'So the profit per day is $725. It's actually not so bad.'",
      "Broker contacts: 'So this actually did pretty well. Obviously, it hasn't booked these loads for me, but it provided me the company. So the brokers that have these loads and now I can call these brokers.'"
    ]
  },
  {
    title: "Additional 123 Load Board Tools",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Tool", "Function", "Value to Dispatcher", "Carrier Benefit"],
      rows: [
        ["Rate Check", "Quick lane rate lookup", "Fast rate research", "Accurate pricing"],
        ["Profit Calculator", "Calculate profitability", "Show carrier value", "Transparent costs"],
        ["Mileage Calculator", "Truck-specific routing", "Accurate distances", "Toll calculations"],
        ["Load Planner", "Automated routing", "Time-saving planning", "Optimized routes"],
        ["Density Maps", "Market visualization", "Strategic positioning", "Better rates"]
      ]
    },
    trainerNotes: [
      "Rate Check: 'My loads post tracks, rate check rate check is going to be the same as the quick rate lookup we just saw on that. So I can just input the pickup location, delivery location. It will give me average rates.'",
      "Profit Calculator: 'Profit calculator. Once again, I can input the mileage how much I get per gallon, total cost. Even dispatch fee is available here.'",
      "Value proposition: 'So you can really use this 1 to 3 load board to provide some additional value for your carrier. You can when you start working with a new customer, you can tell them, hey, not only do dispatching, but I'll also calculate your profitability.'",
      "Mileage Calculator: 'And then we have a mileage calculator. So that's also a very good tool. If you're not satisfied with Google Maps or you can double check your your maps, you can go here and actually input an exact address.'",
      "Truck-specific routing: 'The reason you can double check this because it uses Google map for interactive maps, but it also uses PC Mailer, which is a GPS, a map that's made specifically for truckers.'"
    ]
  },
  {
    title: "Knowledge Check",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    quiz: {
      questions: [
        "What is the main difference between DAT Power and DAT Edge subscriptions?",
        "How should you combine historical rate data with market trend analysis?",
        "What does the Lane Makers tool help dispatchers identify?",
        "What do red and blue areas represent on the Market Conditions Index?",
        "What makes 123 Load Board particularly suitable for beginner dispatchers?"
      ],
      answers: [
        "DAT Power offers more advanced tools and analysis features, while DAT Edge provides basic load board functionality",
        "Use historical rates as baseline, then adjust based on current market trends from trend lines to determine negotiation strategy",
        "Lane Makers identifies which brokers have the most loads in specific locations and equipment types, helping build strategic relationships",
        "Red areas indicate high load-to-truck ratios (tight capacity, hot markets), blue areas indicate low ratios (excess capacity, cold markets)",
        "123 Load Board is the easiest to access for beginners, offers similar tools to DAT, and includes unique features like automated load planning"
      ]
    },
    trainerNotes: [
      "Question 1: Emphasize that tool availability depends on subscription level and budget considerations.",
      "Question 2: This is the key integration skill - combining historical data with real-time market trends for better negotiations.",
      "Question 3: Lane Makers is crucial for new carriers who need to identify which brokers to prioritize for relationship building.",
      "Question 4: Understanding market conditions helps with strategic positioning and rate expectations.",
      "Question 5: 123 Load Board provides an accessible entry point while still offering professional-grade tools."
    ]
  },
  {
    title: "Section Materials",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "DAT Power subscription with advanced analysis tools",
      "123 Load Board for beginner-friendly access",
      "Load Planner for automated route optimization",
      "Market analysis tools for strategic positioning",
      "Broker identification tools for relationship building",
      "Next module: How to get subscriptions to all load boards"
    ],
    trainerNotes: [
      "Tool progression: 'After looking at the trend lines, I logged back into the load board. Actually, you will notice that this one looks a little bit different.'",
      "Subscription levels: 'Some of these tools will be available for you, some not, depending on what subscription you buy and how much money you'll be paying monthly for the load boards.'",
      "123 Load Board advantage: 'It's most likely you will have a one, two, three load board account even before you have a data account.'",
      "Professional development: 'The tools are fantastic, and in the next module, I'll show you how to get subscriptions to all these load boards.'",
      "Strategic application: 'If I were you, I would play around with it a little bit, see how to use it to the full potential and utilize it in my day to day operations.'"
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
export default function LoadisticsSection24({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={24}
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
                        onClick={() => onNavigateToSection(23)} 
                        disabled={24 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 23)
                      </Button>
                      <Button onClick={() => onNavigateToSection(25)} className="rounded-xl">
                        Next Section (Section 25) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 24</div>
    </div>
  );
}
