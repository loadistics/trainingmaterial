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
    sectionLabel: "Section 23",
    title: "Market Analysis: How to Load Customers at Top Prices",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to Section 23: 'Market Analysis: How to Load Customers at Top Prices' - this is where we dive into macro analysis tools for professional dispatching.",
      "Key focus: 'We're starting to analyze the market and the first thing we will touch upon are the tools of macro analysis.'",
      "Strategic importance: 'Before we go on one of the load boards and start looking for available freight, we can check the Bureau of Transportation and Statistics and look at freight flows by state.'",
      "Professional development: 'This knowledge will give you a significant advantage in negotiations and rate setting.'"
    ]
  },
  {
    title: "Macro Analysis Tools Overview",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Bureau of Transportation Statistics - Freight Flows by State",
      "DAT Trendlines - Weekly market snapshots and demand/supply analysis",
      "These tools help determine optimal routing before hitting load boards",
      "Understanding freight flows shows which states trade most with each other",
      "Market analysis gives insight into pricing trends and negotiation power"
    ],
    trainerNotes: [
      "Tool introduction: 'We already know that in order to be certain that we'll be able to get a truck out of an area within a state, we should pick areas as close as possible to major cities, ports and transportation hubs.'",
      "Strategic approach: 'However, when we have a truck to load, we need to decide on an overall direction. That is to choose the state to which we will send those trucks.'",
      "BTS website: 'Before we go on one of the load boards and start looking for available freight, we can check the Bureau of Transportation and Statistics and look at freight flows by state.'",
      "DAT tool: 'Another great free tool for understanding the market is trend lines. Data is a major player in the market.'",
      "Professional advantage: 'If you follow the statistics, you'll have a better understanding of the market.'"
    ]
  },
  {
    title: "Bureau of Transportation Statistics - Freight Flows",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Free government tool showing state-to-state freight trade volumes",
      "Select any state to see inbound and outbound shipment statistics",
      "Darker colors indicate higher trade volumes between states",
      "Helps identify which states have the most freight demand",
      "Essential for strategic routing and load planning decisions"
    ],
    links: [
      {
        title: "Bureau of Transportation Statistics - Freight Flows by State",
        url: "https://www.bts.gov/browse-statistical-products-and-data/state-transportation-statistics/freight-flows-state",
        description: "Government database showing freight trade volumes between states - essential for understanding market demand"
      }
    ],
    trainerNotes: [
      "Website navigation: 'Follow the link attached to this lesson to the.gov website to the freight flow by state page. Here we can select the state we're interested in and look at the statistics of inbound and outbound shipments.'",
      "Practical application: 'This way we will know how much each state trades with the other states, which will give us an idea of which states will be the easiest to get the truck out at a good price.'",
      "Parameter explanation: 'When you log in, all the parameters are already put in for you. So we have the state, by default, it's choosing the state of Alabama, but we'll be choosing different states.'",
      "Data interpretation: 'So the darker the color, the more, um, the state of Alabama trades with the state. So we see the darkest one is Georgia.'",
      "Strategic insight: 'If we have a truck in Alabama, it's most likely that you will be able to find a higher number of loads going out to those states.'"
    ]
  },
  {
    title: "Freight Flow Analysis Example",
    layout: "table",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["State Example", "Primary Trading Partners", "Strategic Insight"],
      rows: [
        ["Alabama", "Georgia (highest), Florida, Mississippi, Tennessee, Texas, California", "Bordering states plus major economic centers"],
        ["Colorado", "California, Texas, Illinois, Wyoming, Utah, Nebraska, Kansas", "Strong trade with West Coast and Midwest"],
        ["General Pattern", "Bordering states + major economic centers", "Distance matters, but economic activity matters more"]
      ]
    },
    trainerNotes: [
      "Alabama example: 'So Georgia is trading the most with Alabama and we also see Florida, Mississippi, Tennessee. So, I mean, it makes sense that the bordering states are the ones that Alabama trades with the most.'",
      "Extended reach: 'But if we move a little bit further, we can see that also Alabama trades a lot with Texas and with California. So that gives us an idea.'",
      "Colorado example: 'Let's go for Colorado, for example. As you can see, the map changed. So now we're here in Colorado, and Colorado does trade a lot with its bordering states.'",
      "Economic centers: 'It trades a lot with Wyoming as well as Utah, Nebraska and Kansas. But it actually trades the most with California, Texas, and it trades a lot with Illinois.'",
      "Strategic application: 'This data helps you choose the best destination states before you even start looking at specific loads.'"
    ]
  },
  {
    title: "DAT Trendlines - Market Intelligence",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Weekly snapshot of demand and supply changes in transportation",
      "Load-to-truck ratios by equipment type (dry van, flatbed, reefer)",
      "National spot rates averages updated monthly",
      "Fuel price trends and their impact on rates",
      "Demand and capacity maps showing regional market conditions"
    ],
    links: [
      {
        title: "DAT Trendlines - Weekly Market Analysis",
        url: "https://www.dat.com/trendlines",
        description: "Weekly market snapshots, load-to-truck ratios, and rate trends for all equipment types"
      }
    ],
    trainerNotes: [
      "DAT overview: 'Another great free tool for understanding the market is trend lines. The link is attached to this lesson. Data is a major player in the market.'",
      "Company background: 'The company earns money not only from the load board but also from other logistics related products. One of them is collecting and selling data from market analysis.'",
      "Free tools: 'You can buy a whole range of analysis tools from data that vary in price, but a novice dispatcher doesn't need to spend too much money on these products. What will present in this lesson will be sufficient.'",
      "Weekly snapshots: 'Here we are on the Data Trend Lines website. We're on the main page and the first thing we see here is a weekly snapshot by the numbers.'",
      "Key metrics: 'So these are percentage changes in demand and supply for transportation over periods of time. And we have the weekly period of time, monthly period of time and a yearly period of time.'"
    ]
  },
  {
    title: "Understanding Load-to-Truck Ratios",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Equipment Type", "Load Posts Change", "Truck Posts Change", "Load-to-Truck Ratio", "Rate Impact"],
      rows: [
        ["Dry Van", "+29.4%", "+8.6%", "+31.8%", "Prices expected to increase"],
        ["Flatbed", "Variable", "Variable", "-2.1%", "Prices stable/declining"],
        ["Reefer", "Variable", "Variable", "+34.2%", "Prices expected to increase"],
        ["Key Insight", "More loads than trucks", "Supply vs. demand imbalance", "Higher ratio = higher rates", "Negotiate accordingly"]
      ]
    },
    trainerNotes: [
      "Ratio explanation: 'So load to truck ratio is essentially the ratio of demand. And the demand for transportation went up by pretty much 30, almost 32% for driving.'",
      "Supply vs. demand: 'So actually the number of trucks available also increased, but the number of loads increased by 30%, the number of trucks increased by 9%, which indicates that actually the demand for transportation grew faster than the supply.'",
      "Rate implications: 'So these statistics usually means that the rates, the prices for transportation have increased between the between the months of April and the months of May, just because of the increase of the demand.'",
      "Time lag: 'Usually it takes a bit of time for the prices to adjust to the changes in demand and supply. So it would be expected that the prices would grow over time if this number of demand remains higher than the supply.'",
      "Equipment differences: 'And we have the same for the flatbed. So actually for the flatbed, the load to truck ratio didn't increase. It went down a little bit.'"
    ]
  },
  {
    title: "National Spot Rates by Equipment Type",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Equipment Type", "Average Rate per Mile (June 2023)", "Market Position", "Strategic Notes"],
      rows: [
        ["Dry Van", "$2.09", "Lowest rates", "High volume, competitive market"],
        ["Flatbed", "$2.66", "Highest rates", "Specialized equipment, higher margins"],
        ["Reefer", "$2.48", "Middle rates", "Temperature control premium"],
        ["Fuel Impact", "All equipment affected", "Rate correlation", "Fuel up = rates up, fuel down = rates down"]
      ]
    },
    trainerNotes: [
      "National averages: 'So these are actually nationwide countrywide averages for each of the three key types of equipment.'",
      "Rate breakdown: 'So in June 2023, the average rate for a driven is $2.09. So this is a rate per mile. So for each mile traveled, truckers have gotten $2.09 on average.'",
      "Equipment comparison: 'For flatbeds, it's $2.66 per mile. And for reefers it's $2.48 per mile.'",
      "Update frequency: 'Once again, this statistics updates monthly, so you should be going on trend lines and you should be checking the statistics just to understand where the market is at right now.'",
      "Fuel correlation: 'When fuel prices go up, the rates go up slightly. And when they go down, the rates also go down.'"
    ]
  },
  {
    title: "Regional Demand and Capacity Analysis",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Demand and capacity maps show load-to-truck ratios by state",
      "Darker colors indicate higher demand for specific equipment types",
      "Flatbed hotspots: Southeast (LA, MS, AL, AR, OK), Idaho, Oregon, Maine",
      "These states pay above-market-average rates for equipment",
      "Use maps to identify optimal positioning for higher rates"
    ],
    trainerNotes: [
      "Map explanation: 'So this is again, low to track ratio. Low to track ratio is a very important indicator. It explains how much demand there is for transportation and it explains how the pricing for transportation is formed.'",
      "Visual interpretation: 'So on this map, we have all our states and the darker the color gets, the higher load to truck ratio, there is meaning higher demand for transportation with this specific type of equipment, flatbed.'",
      "Flatbed hotspots: 'So we can see the darkest colors on this map are here on the southeast Louisiana, Mississippi, Alabama, Arkansas, Oklahoma. All of these states will pay a rate above market average coming out of this state.'",
      "Regional opportunities: 'Also, South Carolina and a few other states in the north, Idaho, Oregon, there's not enough flatbed trucks in this area.'",
      "Strategic positioning: 'So if you have a truck in Oregon or Idaho, you can expect a higher than average rate and also Maine.'"
    ]
  },
  {
    title: "Negotiation Strategy with Market Data",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Monitor weekly statistics to understand market trends",
      "Use load-to-truck ratio spikes to negotiate higher rates",
      "Example: Same lane usually $1,000, but high demand spike = ask for $1,200-$1,300",
      "Brokers must pay higher rates when truck supply is limited",
      "Regular monitoring gives you negotiation power and market awareness"
    ],
    trainerNotes: [
      "Weekly monitoring: 'You can check out the statistics and follow it weekly. If you log in to TRENDLines every week, you'll be able to check the weekly statistics, which will give you an understanding of how much you can negotiate with brokers.'",
      "Practical example: 'So let's say you're always running the same lane and you usually, you know, your driver usually runs it for $1,000, but then you see a very big spike in the number of load posts and a very big spike in load to track ratio.'",
      "Negotiation opportunity: 'And this could mean for you that for the next week you can try and negotiate a higher rate with the brokers for the same lane.'",
      "Rate increase: 'So maybe instead of a thousand, you ask them for 1200 or 1300 and most likely they will have to provide it to you just because there's not so many other trucks that can take this load for the same price.'",
      "Market advantage: 'So if you follow the statistics, you'll have a better understanding of the market.'"
    ]
  },
  {
    title: "Knowledge Check",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    quiz: {
      questions: [
        "What are the two main macro analysis tools discussed in this section?",
        "What does a higher load-to-truck ratio typically indicate about rates?",
        "Which equipment type had the highest average rate per mile in June 2023?",
        "How can market analysis data help with broker negotiations?",
        "What does the Bureau of Transportation Statistics show about state freight flows?"
      ],
      answers: [
        "Bureau of Transportation Statistics (Freight Flows by State) and DAT Trendlines",
        "Higher load-to-truck ratio indicates higher demand relative to supply, typically leading to rate increases",
        "Flatbed at $2.66 per mile, followed by reefer at $2.48, then dry van at $2.09",
        "Market data helps identify when to negotiate higher rates based on demand spikes and supply shortages",
        "It shows which states trade most with each other, helping identify optimal routing and high-demand destinations"
      ]
    },
    trainerNotes: [
      "Question 1: Review both tools and their specific purposes - BTS for state trade analysis, DAT for market trends.",
      "Question 2: Emphasize the supply and demand relationship - more loads than trucks = higher rates.",
      "Question 3: Point out that flatbed commands premium rates due to specialized equipment and lower supply.",
      "Question 4: This is the practical application - using data to negotiate better rates with brokers.",
      "Question 5: Connect back to strategic routing decisions and understanding freight flow patterns."
    ]
  },
  {
    title: "Section Materials",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Bureau of Transportation Statistics - Freight Flows by State",
      "DAT Trendlines - Weekly market analysis and trend data",
      "Use these tools weekly to stay informed about market conditions",
      "Apply market data to improve negotiation outcomes and rate setting",
      "Strategic advantage: Knowledge of market trends gives you pricing power"
    ],
    links: [
      {
        title: "Bureau of Transportation Statistics - Freight Flows by State",
        url: "https://www.bts.gov/browse-statistical-products-and-data/state-transportation-statistics/freight-flows-state",
        description: "Government database showing freight trade volumes between states - essential for understanding market demand"
      },
      {
        title: "DAT Trendlines - Weekly Market Analysis",
        url: "https://www.dat.com/trendlines",
        description: "Weekly market snapshots, load-to-truck ratios, and rate trends for all equipment types"
      }
    ],
    trainerNotes: [
      "Tool integration: 'Follow the link attached to this lesson to the.gov website to the freight flow by state page.'",
      "Regular usage: 'You should be going on trend lines and you should be checking the statistics just to understand where the market is at right now.'",
      "Strategic application: 'If you follow the statistics, you'll have a better understanding of the market.'",
      "Professional development: 'What will present in this lesson will be sufficient' for novice dispatchers, but these tools provide ongoing market intelligence.",
      "Competitive advantage: Regular use of these tools will significantly improve your ability to negotiate rates and make strategic routing decisions."
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
export default function LoadisticsSection23({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={23}
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

                {slide.links && slide.links.length > 0 && (
                  <div className="mt-6 space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-3">🔗 Reference Links</h4>
                      <div className="space-y-3">
                        {slide.links.map((link, index) => (
                          <div key={index} className="bg-white border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-gray-900 mb-1">{link.title}</h5>
                                <p className="text-sm text-gray-600 mb-2">{link.description}</p>
                                <a 
                                  href={link.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  Visit Website
                                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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
                        onClick={() => onNavigateToSection(22)} 
                        disabled={23 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 22)
                      </Button>
                      <Button onClick={() => onNavigateToSection(24)} className="rounded-xl">
                        Next Section (Section 24) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 23</div>
    </div>
  );
}
