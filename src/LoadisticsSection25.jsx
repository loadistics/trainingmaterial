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
    sectionLabel: "Section 25",
    title: "Strategic Load Selection Approaches",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to Section 25: 'Strategic Load Selection Approaches' - this is Part 3 of our market analysis series, focusing on practical load selection strategies.",
      "Key focus: 'These are all the analysis tools you will need in your work once you've taken time to analyze the market.'",
      "Process overview: 'Your next step is pretty straightforward. You log in to a load board, search for loads, call brokers, compare prices, negotiate and book.'",
      "Professional approach: 'Analysis is needed for working with carriers who give you the freedom to choose their own routes and who rely on you being a professional who knows how to use the available tools.'"
    ]
  },
  {
    title: "From Analysis to Action - The Dispatching Process",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Log in to load board and search for available loads",
      "Call brokers to discuss rates and availability",
      "Compare prices across multiple brokers and lanes",
      "Negotiate rates based on market analysis and urgency",
      "Book loads that maximize profitability and efficiency",
      "Apply strategic approaches based on market conditions"
    ],
    trainerNotes: [
      "Process introduction: 'These are all the analysis tools you will need in your work once you've taken time to analyze the market. Your next step is pretty straightforward.'",
      "Action steps: 'You log in to a load board, search for loads, call brokers, compare prices, negotiate and book.'",
      "Complexity acknowledgment: 'If all of this seemed a bit complicated at the first glance, do not be alarmed.'",
      "Carrier types: 'In reality, many carriers will give you very specific parameters on where they want their trucks to go.'",
      "Professional requirement: 'Analysis is needed for working with carriers who give you the freedom to choose their own routes and who rely on you being a professional who knows how to use the available tools.'"
    ]
  },
  {
    title: "Four Strategic Load Selection Approaches",
    layout: "table",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Approach", "Strategy", "Best For", "Risk Level"],
      rows: [
        ["Hot Loads", "Last-minute urgent loads with premium rates", "Owner operators, flexible carriers", "High"],
        ["Dedicated Lanes", "Recurring routes with consistent pricing", "Home-based drivers, regular schedules", "Low"],
        ["Double Load (2-1)", "Book high-paying load first, then connecting load", "Bad zone positioning", "Medium"],
        ["Partial Load Consolidation", "Multiple loads in one trip for higher earnings", "Experienced dispatchers", "High"]
      ]
    },
    trainerNotes: [
      "Approach introduction: 'Now let's consider several approaches to load selection. This is a new topic if you're taking notes, start a new chapter.'",
      "Strategy overview: 'The first approach is booking hot loads. The second approach is looking for dedicated lanes. The third approach we will consider is called double load or two one. And the last approach I would like to talk to you about is partial load consolidation.'",
      "Professional development: 'If at any point of your career you are confused and don't know where to send your truck to make the highest profit, or you're worried about sending a truck somewhere and not being able to get it out of there, Go back to your notes from this module and you'll find all the answers.'",
      "Strategic thinking: 'Each approach has specific applications and risk levels that must be carefully considered.'"
    ]
  },
  {
    title: "Approach 1: Hot Loads - Last-Minute Premium Rates",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Look for last-minute loads with urgent pickup times",
      "Brokers become desperate when loads aren't covered",
      "Call broker to find pickup appointment time",
      "Monitor load board to see which loads remain unbooked",
      "When broker runs out of time, you have huge bargaining advantage",
      "Can potentially make excellent money on urgent shipments"
    ],
    trainerNotes: [
      "Hot load definition: 'The first approach is booking hot loads. This approach entails looking for last minute loads and getting a top rate because of the urgency.'",
      "Broker perspective: 'Brokers, just like dispatchers, work all day long to make sure that cargo is shipped and that they make money from it. Their goals are much the same as those of the dispatcher.'",
      "Market dynamics: 'Although we're on the opposite teams of the game, the broker needs to sell the load as cheap as possible and the dispatcher needs to get the highest possible price.'",
      "Urgency factor: 'If the broker fails to sell the load and time is running out. Or maybe if somebody booked his load and then cancelled at the last minute, the load becomes hot.'",
      "Identification process: 'How do you determine a hot load? It's very simple. Call the broker and find out the pickup appointment time. Do this with multiple loads, write down appointment times and monitor the board to see which of those have not been removed from the board.'"
    ]
  },
  {
    title: "Hot Loads - Advantages and Disadvantages",
    layout: "table",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Advantages", "Disadvantages", "Best Carriers", "Strategic Notes"],
      rows: [
        ["High rates due to urgency", "No guarantee of finding hot loads", "Owner operators with flexibility", "Use with caution"],
        ["Significant bargaining power", "Don't build broker relationships", "Small carriers with time", "Risk of being left with nothing"],
        ["Good money potential", "Take advantage of broker desperation", "Carriers who can wait", "Carrier must be on board"],
        ["Perfect for flexible drivers", "Relationship damage potential", "No hurry carriers", "Monitor market carefully"]
      ]
    },
    trainerNotes: [
      "Target carriers: 'A lot of smaller carriers use this approach, especially owner operators who have nowhere to hurry. They're willing to sit and wait for a good opportunity.'",
      "Profit potential: 'In single cases, you can make good money on this, but companies who rely on this method too much often lose out sooner or later.'",
      "Relationship concerns: 'They don't build close relationships with brokers but take advantage of their difficult situation.'",
      "Risk factor: 'Moreover, having waited until late, there is always a chance of not finding such a hot load and being left with nothing.'",
      "Strategic advice: 'Use this approach with care and only if your carrier is on board to play this game.'"
    ]
  },
  {
    title: "Approach 2: Dedicated Lanes - Consistent Recurring Routes",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Similar to contract freight with recurring shipments",
      "Identify broker with regular lane needs (weekly, monthly)",
      "Negotiate prices in advance for multiple weeks",
      "Book shipments weeks or months in advance",
      "No additional contracts required - just rate confirmations",
      "Perfect for bringing drivers home weekly or starting from home"
    ],
    trainerNotes: [
      "Definition: 'The second approach is looking for dedicated lanes. In essence, dedicated lanes are similar to contract freight.'",
      "Process: 'In this case, you identify a broker who has a lane that needs to be shipped repetitively at a certain interval. For example, once a week we negotiate prices with the broker in advance and then book the shipment for several weeks in advance.'",
      "Documentation: 'Usually no additional contracts are required for this. The broker just provides rate confirmations for all of our loads.'",
      "Driver benefits: 'This approach is especially helpful when you need to bring the driver home every weekend, or maybe get him out of his home every Monday in order to find a dedicated lane.'",
      "Communication strategy: 'You just need to communicate with the broker after a successful delivery and ask them about the possibility of booking the same load upfront for the next couple of weeks, months, or even for the whole season.'"
    ]
  },
  {
    title: "Dedicated Lanes - Real-World Example",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Carrier wanted only Los Angeles, CA to Portland, OR routes",
      "There and back every week consistently",
      "Developed Monday LA to Portland dedicated lane",
      "Developed Wednesday Portland to LA dedicated lane",
      "Whole week booked at stable price for months",
      "Minimal work required - just commission for organizing schedule"
    ],
    trainerNotes: [
      "Real example: 'For example, I had a carrier that only wanted to move from Los Angeles, California to Portland, Oregon. There and back every week.'",
      "Development process: 'After a while of working with this carrier, I was able to pre-book a dedicated lane that left from Los Angeles to Portland every Monday and another lane that left from Portland to Los Angeles every Wednesday.'",
      "Result: 'This way I had the whole week booked for the carrier at a stable price for months.'",
      "Efficiency: 'I barely had to do any work for this carrier and simply made my commission for organizing the schedule.'",
      "Strategic value: 'This demonstrates the power of building relationships and creating predictable revenue streams.'"
    ]
  },
  {
    title: "Approach 3: Double Load (2-1) - Bad Zone Strategy",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Used when truck is in bad zone with low rates everywhere",
      "First: Find high-paying load in another zone for later date",
      "Second: Find connecting load to get closer to high-paying load",
      "Book both loads simultaneously - hence 'double load'",
      "Book second load first, then first load - hence '2-1'",
      "Strategy: Accept low rate now to reach high-paying zone"
    ],
    trainerNotes: [
      "Problem identification: 'The third approach we will consider is called double load or two one. This method is often used when the truck is in a bad zone, and no matter where we go, we still get a low rate.'",
      "Strategy: 'In this case, we first find a second high paying load from another zone for another day and then find a load that will bring us as close to that second one as possible.'",
      "Process: 'So in this way we're booking two loads at once. Double load. We first booked the second load and then the first one, hence the name two one.'",
      "Strategic thinking: 'This approach requires forward planning and understanding of market dynamics across different zones.'",
      "Risk management: 'The key is ensuring the high-paying load is actually available and worth the investment in the connecting load.'"
    ]
  },
  {
    title: "Approach 4: Partial Load Consolidation - Maximizing Earnings",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Consolidate several partial loads in one trip",
      "Found on load boards - choose 'partial' or 'both' options",
      "High professionalism required - potential for increased earnings per mile",
      "Can lead to serious scheduling difficulties if not managed properly",
      "Requires careful planning of loading/unloading order",
      "Must consider weight, space, and driver hours of service"
    ],
    trainerNotes: [
      "Definition: 'And the last approach I would like to talk to you about is partial load consolidation. Consolidation of several loads in one trip.'",
      "Availability: 'Partial loads can be found in the same way as regular full truck loads on any load board. While searching for loads, we can choose from three options full, partial or both.'",
      "Requirements: 'Consolidating partial loads requires high professionalism and it has the potential to increase your earnings per mile, but it can also lead to serious scheduling difficulties.'",
      "Planning importance: 'Here are a few rules to keep in mind. The order of loading and unloading is important.'",
      "Equipment considerations: 'Well, if we're talking about flatbeds, it's easier. You can load and unload the cargo from either side of the trailer and it doesn't affect anything.'"
    ]
  },
  {
    title: "Partial Load Consolidation - Critical Rules",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Rule", "Equipment Type", "Application", "Key Consideration"],
      rows: [
        ["Loading Order", "Dry Van/Reefer", "First load = last unload", "Can't unload middle cargo"],
        ["Loading Order", "Flatbed", "Flexible loading/unloading", "Length/width limits"],
        ["Driver Hours", "All Types", "Monitor HOS closely", "Multiple stops affect schedule"],
        ["Weight & Space", "All Types", "Count pallets, estimate space", "Consider total capacity"],
        ["Teamwork", "Flatbed", "Work with driver closely", "Skill and ingenuity required"]
      ]
    },
    trainerNotes: [
      "Dry van/reefer rules: 'However, in the case of dry vans, reefers box trucks, the first load that has been loaded into the trailer must be unloaded last because no one will bother unloading the whole trailer, taking the part they need and then loading the rest of the product back.'",
      "Strategic loading: 'Therefore, the longest load should be loaded first so that it can be unloaded last. This will give you the opportunity to pick up and unload other cargo along the way.'",
      "HOS management: 'You have to keep a very close eye on the drivers work schedule. A large number of pick ups and drop offs can greatly affect the hours.'",
      "Scheduling risk: 'If pickup and delivery appointments don't combine well, you could lose an extra day due to this partial load consolidation.'",
      "Capacity planning: 'It's important to count not only the weight but also the space the load takes up. If all the goods are on pallets, it's a little easier.'"
    ]
  },
  {
    title: "Strategic Load Selection - Decision Framework",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Use market analysis tools: average rates, trends, load-to-truck ratios",
      "Determine general direction for highest profit potential",
      "Apply appropriate strategy based on market conditions",
      "Hot loads: When urgent pickup and driver is close by",
      "Dedicated lanes: After successful delivery, ask about recurring opportunities",
      "Double load: When in bad zone with no good options",
      "Partial consolidation: When experienced and can handle complexity"
    ],
    trainerNotes: [
      "Tool integration: 'Okay, let's recap everything we learned so far. In order to make informed load decisions and build route plans, we can utilize multiple tools available to us.'",
      "Analysis foundation: 'Checking average rates. Market trends, load to truck ratios. All of this will give us a general idea of what direction to bring the highest profit to our truck.'",
      "Real-world application: 'After analyzing the market, we log in to our load board and start looking at the real picture. How much are they really paying for the lanes we're looking for?'",
      "Strategy selection: 'If you find a hot load and your driver is close enough to make it to the pickup, request a high rate.'",
      "Bad zone strategy: 'If you're in a bad zone, use the double load technique book a high paying load in another zone, and then use any available load to bring the truck closer to that load.'",
      "Relationship building: 'After a successful delivery of a good load, be sure to ask the broker about dedicated lane opportunities and to maximize the profitability of the truck.'"
    ]
  },
  {
    title: "Knowledge Check",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    quiz: {
      questions: [
        "What are the four strategic load selection approaches discussed?",
        "How do you identify a 'hot load' and what advantage does it provide?",
        "What makes dedicated lanes attractive for certain types of carriers?",
        "When should you use the double load (2-1) strategy?",
        "What are the key considerations when consolidating partial loads?"
      ],
      answers: [
        "Hot Loads, Dedicated Lanes, Double Load (2-1), and Partial Load Consolidation",
        "Monitor pickup appointment times and watch for loads that remain unbooked as time runs out - provides huge bargaining advantage and premium rates",
        "Dedicated lanes offer consistent recurring routes, stable pricing, and are perfect for carriers who need to come home weekly or start from home regularly",
        "Use double load strategy when truck is in a bad zone with low rates everywhere - book high-paying load in another zone first, then connecting load",
        "Loading/unloading order (first in, last out for dry vans), driver hours of service, weight and space calculations, and close teamwork with driver"
      ]
    },
    trainerNotes: [
      "Question 1: Review all four approaches and their specific applications in different market conditions.",
      "Question 2: Emphasize the monitoring process and timing sensitivity of hot loads.",
      "Question 3: Highlight the relationship-building aspect and predictability benefits of dedicated lanes.",
      "Question 4: This strategy requires forward planning and understanding of market dynamics across zones.",
      "Question 5: Partial load consolidation is the most complex approach requiring high professionalism and careful planning."
    ]
  },
  {
    title: "Section Materials",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Market analysis tools: Average rates, trends, load-to-truck ratios",
      "Strategic approaches: Hot loads, dedicated lanes, double load, partial consolidation",
      "Decision framework for load selection based on market conditions",
      "Risk assessment for each approach and carrier compatibility",
      "Relationship building strategies for long-term success",
      "Advanced dispatching techniques for maximum profitability"
    ],
    trainerNotes: [
      "Tool integration: 'In order to make informed load decisions and build route plans, we can utilize multiple tools available to us.'",
      "Strategic application: 'Look for opportunities to consolidate multiple partial loads.'",
      "Professional development: 'If at any point of your career you are confused and don't know where to send your truck to make the highest profit, or you're worried about sending a truck somewhere and not being able to get it out of there, Go back to your notes from this module and you'll find all the answers.'",
      "Continuous learning: 'These strategic approaches provide the foundation for professional dispatching success.'",
      "Practical application: 'Apply these strategies based on market conditions, carrier preferences, and risk tolerance.'"
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
export default function LoadisticsSection25({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={25}
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
                        onClick={() => onNavigateToSection(24)} 
                        disabled={25 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 24)
                      </Button>
                      <Button onClick={() => onNavigateToSection(26)} className="rounded-xl">
                        Next Section (Section 26) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 25</div>
    </div>
  );
}
