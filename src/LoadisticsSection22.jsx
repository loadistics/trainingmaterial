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
    sectionLabel: "Section 22",
    title: "How to Set the Right Price and Please the Carrier",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to Section 22: 'How to Set the Right Price and Please the Carrier' - this is an advanced module for professional dispatchers.",
      "Key focus: 'You can already proudly call yourself a dispatcher. Your level of knowledge is quite developed at this point. Now it's time to grow to the title of a professional dispatcher.'",
      "Emphasize: 'A key stage of growth is in-depth knowledge of the freight market and its analysis tools, as well as professional negotiating and networking skills.'",
      "Important note: 'Now, it's especially important to take notes of every insight, every tool and its explanation, so that you can simply open a notebook and repeat what I'm going to teach you today.'"
    ]
  },
  {
    title: "Transportation Company Objectives",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Financial Goals: Calculated in miles and dollars with three main indicators",
      "Total Mileage: Total number of miles traveled by the truck",
      "Gross Rate: Total income the truck generated",
      "Rate per Mile: How much money the truck earned for each mile traveled",
      "Rate per mile determines the margin of the trucking company because each mile costs money (driver's salary, fuel, etc.)",
      "Operational Goals: Areas and states of operation, load length preferences, driver home time, load weight restrictions, commodity restrictions"
    ],
    trainerNotes: [
      "Explain: 'When we talk about planning, we determine that the most important first step to planning is to identify the goals of the transportation company and each individual truck driver.'",
      "Financial goals breakdown: 'They are calculated in miles and dollars, and there are three main indicators: total mileage, gross rate, and rate per mile.'",
      "Rate per mile importance: 'This one determines the margin of the trucking company because each mile costs money - drivers salary, fuel and so on.'",
      "Operational goals examples: 'These can include the areas and states in which the trucking company operates, the length of the load that the driver prefers, drivers home time, load weight restrictions, commodity restrictions.'",
      "Commodity restrictions example: 'Some drivers will not transport pork or alcohol for religious or cultural reasons and so on.'"
    ]
  },
  {
    title: "Weekly Planning Example",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Parameter", "Target"],
      rows: [
        ["Driver", "Jason"],
        ["Truck Number", "550"],
        ["Location", "Chicago, Illinois"],
        ["Availability", "Ready to go anytime, anywhere"],
        ["Weekly Miles", "Above 2,500"],
        ["Weekly Minimum Gross", "$6,500"],
        ["Average Rate per Mile", "Above $2.50"],
        ["Maximum Weight", "44,000 lbs"],
        ["Return Requirement", "Back to Chicago next Monday"]
      ]
    },
    images: ["/trainingmaterial/section22/images/sampleweeklyplan.png"],
    trainerNotes: [
      "Explain the planning process: 'Based on these parameters provided to you by the carrier, at the beginning of the week, a dispatcher sets himself a weekly task for each truck.'",
      "Planning format: 'This task should be quite simple and clear, so you can look at it quickly and refresh your memory when you switch from one truck to another.'",
      "Storage options: 'It can be written out on a sheet of paper, printed out, hung up in your workspace, or stored in an electronic document.'",
      "Route planning: 'Based on this task, a dispatcher will typically build an approximate route plan.'",
      "Flexibility note: 'Of course, as you sit down and start calling on loads, that plan may change because a really nice load might pop up in another unplanned area.'",
      "Sample Plan Image: 'Here's a visual example of what a weekly dispatcher plan looks like in practice. Notice how it's organized with clear parameters for each driver and truck, making it easy to reference throughout the week.'"
    ]
  },
  {
    title: "Understanding the Freight Market",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "America is made up of 50 states, but carriers often say 'I run all 48 states'",
      "Hawaii and Alaska are not part of the trucking area (Hawaii is an island, Alaska requires driving through Canada)",
      "Five key zones: Northeast, Southeast, Midwest, Southwest, and West",
      "Americans have strange geography: Ohio is in the 'Midwest' despite being in the east",
      "Zip zones: 10 zones based on the first digit of 5-digit postal codes",
      "Zip zones are good for general understanding and route plotting"
    ],
    trainerNotes: [
      "Geographic overview: 'In order to start creating a plan, let's start by looking at a map of the United States. America is made up of 50 states, and when a carrier wants to say that he drives all over the country, he often says, I run all 48 states.'",
      "State exclusions: 'That's because Hawaii and Alaska are not part of the tracking area. Hawaii is an island. And to get to Alaska, you first have to drive through all of Canada.'",
      "Zone explanation: 'Apart from states in trucking, we also divide the entire country into zones. There are five key zones that we identify: Northeast, Southeast, Midwest, Southwest and West.'",
      "Geographic quirk: 'Americans are a bit strange with their geography. For instance, Ohio State, which is right here in the east, is actually located in a zone called Midwest. Makes no sense to me, but you'll get used to it pretty quickly.'",
      "Zip zones: 'The United States can also be divided into smaller zip zones. A zip code is a five digit postal code. Each city and town has its own zip code, and the first digit of that zip code is responsible for a wide area.'"
    ]
  },
  {
    title: "Key Market Areas and Transportation Hubs",
    layout: "table",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Category", "Key Locations"],
      rows: [
        ["Major Transportation Hubs", "Boston MA, Cleveland OH, Chicago IL, Minneapolis MN, Kansas City KS, Saint Louis MO, Dallas TX, Houston TX, San Francisco CA"],
        ["Major Logistic Centers", "Phoenix AZ, Denver CO, Oklahoma City OK, Little Rock AR, Nashville TN, Columbus OH, Detroit MI"],
        ["International Ports", "New York NY, New Jersey NJ, Baltimore MD, Norfolk VA, Charleston SC, Savannah GA, Jacksonville FL, Miami FL, Mobile AL, New Orleans LA, Houston TX, Los Angeles CA, Oakland CA, Seattle WA"],
        ["Inland Ports", "Stockton CA, Inland Empire CA, Fort Worth TX, Memphis TN, Saint Louis MO, Kansas City KS, Chicago IL, Columbus OH, Charlotte NC, Atlanta GA"]
      ]
    },
    images: ["/trainingmaterial/section22/images/key-international-ports.png", "/trainingmaterial/section22/images/inland-ports.png"],
    trainerNotes: [
      "Transportation hubs definition: 'These are the junctions of several modes of transportation, such as air, rail and so on, working together to serve, transit, local and urban traffic.'",
      "Logistic centers: 'Major logistic centers, which include the highest number of distribution facilities.'",
      "Port cities importance: 'Cities with key international ports for import and export.'",
      "Inland ports: 'The so called inland ports.'",
      "Key insight: 'The bigger the city, the more it trades with other cities, the more demand it has for trucking. It all makes sense.'",
      "State variation: 'Every state has a certain number of such areas. For example, Texas has a lot of them: Fort Worth, Dallas, Houston, Austin, San Antonio, McAllen, Laredo, El Paso.'",
      "International Ports Image: 'This map shows the key international ports across the United States. These are critical for import and export traffic, and knowing their locations helps you understand freight flow patterns.'",
      "Inland Ports Image: 'Inland ports are distribution hubs that connect major transportation corridors. They're essential for efficient freight movement between different regions of the country.'"
    ]
  },
  {
    title: "Zip Zone Directory Reference",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "10 zip zones based on the first digit of 5-digit postal codes",
      "Each zone covers multiple states or parts of states",
      "Useful for load board searches and route planning",
      "Simplifies geographic targeting when posting trucks",
      "Essential reference tool for dispatchers"
    ],
    pdf: "/trainingmaterial/section22/pdfs/Zip+Zone+Directory-2.pdf",
    trainerNotes: [
      "Zip zone explanation: 'The United States can also be divided into smaller zip zones. A zip code is a five digit postal code. Each city and town has its own zip code, and the first digit of that zip code is responsible for a wide area that may include several states or parts of states at once.'",
      "Practical usage: 'When searching for a load or posting a truck on a load board, you can designate a movement zone using one of the ten zip zones instead of having to write out each individual state.'",
      "Planning benefit: 'The state and zip zones are good for a general understanding of how the truck moves. We can use them to plot a route when we plan the number of miles.'",
      "PDF Reference: 'This comprehensive zip zone directory shows you exactly which areas fall into each zone. This is an essential tool for efficient load board searches and strategic route planning.'",
      "Example usage: 'For example, we can say that we will send our driver from Chicago first down to Georgia, then to New Jersey. From there, we'll take him back to Midwest on the way home to Zone Z four.'"
    ]
  },
  {
    title: "Planning Strategy: State vs. City Level",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "State-level planning is not enough - shipments don't happen all over the state",
      "Some places in a state have easy load access, others require long deadhead drives",
      "Example: East Texas (Dallas, Houston) vs. Central/Western Texas (desert areas like San Angelo)",
      "Key market areas represent major cities and their surrounding economic centers",
      "The bigger the city, the more it trades, the more demand for trucking",
      "Use the rule of thumb: Check if unloading point is near a major city or port"
    ],
    trainerNotes: [
      "State limitation: 'It's not enough to just decide on states. The shipment of goods doesn't happen all over the state.'",
      "Load availability varies: 'At the same time, there are places in a certain state where it's easy to find loads from, and then there are places where freight is scarce and you have to deadhead drive empty for a long time to get to the right load.'",
      "Texas example: 'Take Texas, for example, which is the largest state by area. East of Texas is one of the key transportation areas in the United States. There's the city of Dallas. And just south of that is a major international port in Houston. Sending a truck to one of the cities is usually a good idea.'",
      "Problem areas: 'However, central and western Texas is a desert area. Sending a truck to San Angelo, which is geographically in the heart of Texas, will make it difficult to find loads, and you'll very likely have to move the truck empty for hundreds of miles.'",
      "Rule of thumb: 'Looking at each available load, you will need to go into the map and input the city to which it's headed. The first thing to look is whether the unloading point is near a major city.'"
    ]
  },
  {
    title: "Practical Load Planning Process",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Step 1: Check if unloading point is near a major city",
      "Step 2: If near water, check distance to nearest major port",
      "Step 3: This gives initial idea of difficulty getting out of that city",
      "Step 4: Log back into load board and check for loads coming out of destination city",
      "Step 5: Check demand for your next move using deadhead settings",
      "Step 6: If nothing within 30 miles, increase deadhead to 60 miles to see more options"
    ],
    trainerNotes: [
      "Process explanation: 'When looking for your next load, your next step will, of course, be to log back in to the load board and check for loads coming out of that city - the destination point of your previous load.'",
      "Demand checking: 'A quick check of the demand for your next move. At this point that head settings will come in very handy.'",
      "Deadhead adjustment: 'Perhaps there is nothing within a 30 mile radius, but you see that the major city is only 60 miles away. Well, in that case, increase your deadhead and you'll most likely see many more options.'",
      "Port proximity: 'If the unloading point is close to the water, see how far away the nearest major port is. This will give you an initial idea of how difficult or easy it will be to get out of that city.'",
      "Key insight: 'Memorizing all the key cities in each state is a long and painful task, especially since trucking activity will vary from zone to zone at different times of the year.'"
    ]
  },
  {
    title: "Knowledge Check",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    quiz: {
      questions: [
        "What are the three main financial indicators for transportation companies?",
        "Why is rate per mile the most important financial indicator?",
        "What are the five key transportation zones in the United States?",
        "Why do carriers say they 'run all 48 states' instead of 50?",
        "What is the rule of thumb for checking if a destination city will have good load availability?"
      ],
      answers: [
        "Total mileage, gross rate, and rate per mile",
        "Because it determines the margin of the trucking company - each mile costs money for driver salary, fuel, etc.",
        "Northeast, Southeast, Midwest, Southwest, and West",
        "Because Hawaii and Alaska are not part of the trucking area (Hawaii is an island, Alaska requires driving through Canada)",
        "Check if the unloading point is near a major city, and if near water, check distance to the nearest major port"
      ]
    },
    trainerNotes: [
      "Question 1: Ask for the three financial indicators and explain their importance in planning.",
      "Question 2: Emphasize that rate per mile determines profitability - it's the key metric for carrier success.",
      "Question 3: Review the five zones and mention the geographic quirk about Ohio being in the Midwest.",
      "Question 4: Explain the practical reasons why Hawaii and Alaska are excluded from trucking operations.",
      "Question 5: This is the practical application - how to quickly assess load availability in any destination city."
    ]
  },
  {
    title: "Section Material",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Download the appendix to this lesson for detailed zone maps",
      "State and zip zone division maps for general understanding",
      "Key market areas map showing major cities and economic centers",
      "Transportation corridors and interstate highway system reference",
      "Use these tools to plot routes and plan weekly mileage targets"
    ],
    trainerNotes: [
      "Materials reference: 'The division of these zones can be found by downloading the appendix to this lesson.'",
      "Map usage: 'The state and zip zones are good for a general understanding of how the truck moves. We can use them to plot a route when we plan the number of miles.'",
      "Key market areas map: 'Consider the following map, which is also available for download in the appendix of this lesson. Each US state has key market areas.'",
      "Highway system: 'Key market areas are usually connected between one another by the key transportation corridors of the country, the highway system. This highway system is called interstate.'",
      "Practical application: 'Use these tools to plot routes and plan weekly mileage targets for your drivers.'"
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
export default function LoadisticsSection22({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={22}
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

                {slide.images && slide.images.length > 0 && (
                  <div className="space-y-4">
                    {slide.images.length === 2 ? (
                      <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
                        {slide.images.map((imagePath, index) => (
                          <div key={index} className="flex-1 flex justify-center">
                            <img 
                              src={imagePath} 
                              alt={`Section 22 reference image ${index + 1}`}
                              className="max-w-full h-auto rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                              onClick={() => window.open(imagePath, '_blank')}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      slide.images.map((imagePath, index) => (
                        <div key={index} className="flex justify-center">
                          <img 
                            src={imagePath} 
                            alt={`Section 22 reference image ${index + 1}`}
                            className="max-w-full h-auto rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => window.open(imagePath, '_blank')}
                          />
                        </div>
                      ))
                    )}
                  </div>
                )}

                {slide.pdf && (
                  <div className="mt-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">📄 Reference Document</h4>
                      <p className="text-sm text-gray-600 mb-3">Click to open the PDF in a new tab for detailed reference.</p>
                    </div>
                    <iframe 
                      src={slide.pdf}
                      className="w-full h-96 border border-gray-300 rounded-lg"
                      title="Section 22 PDF Reference"
                    />
                  </div>
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slide.isMaterialsSlide) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(21)} 
                        disabled={22 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 21)
                      </Button>
                      <Button onClick={() => onNavigateToSection(23)} className="rounded-xl">
                        Next Section (Section 23) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 22</div>
    </div>
  );
}
