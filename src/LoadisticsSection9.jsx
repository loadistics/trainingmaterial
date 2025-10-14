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
    sectionLabel: "Section 9",
    title: "Step 6 — Cargo in Transit: Tracking, Updates, and Detention",
    layout: "title",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Ready to roll. This step covers everything while the load is moving: tracking, quick status updates, and detention. The aim is fewer surprises and faster fixes.",
      "",
      "QUESTIONS:",
      "Quick poll: what do you think brokers care about most mid-transit—exact location, ETA, or silence avoided? Why?",
      "Cold call: name one situation where a proactive update would have saved you time.",
      "",
      "ANSWERS:",
      "Answer: ETA: It lets brokers/customers plan docks/appointments; proactive updates prevent 'silence,' which is the real risk.",
      "Answer: Any delay (traffic, weather, long load time) where a 15–30 min heads-up would have allowed rescheduling and prevented detention/layover.",
      "",
      "Navigation cue: Use the navigation box to move between sections."
    ]
  },
  {
    title: "Why Track Location",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Stakeholders: Broker and customer expect timely location and ETA updates.",
      "Dispatcher Role: Choose a tracking method, monitor progress, communicate changes.",
      "Outcome: Fewer surprises, faster issue resolution, better relationships."
    ],
    trainerNotes: [
      "Brokers and customers want two things while the truck is rolling: where is it, and when will it arrive. We choose the right tracking method, watch progress, and speak up early if anything changes.",
      "",
      "QUESTIONS:",
      "Pair-share: what is your default update cadence on a 600-mile run with no issues?",
      "Group: if an ETA moves by 30 minutes, when do you message, and what do you include?",
      "",
      "ANSWERS:",
      "Answer: Departed pickup → midpoint check (~3–4 hrs) → 1–2 hrs before appointment → arrival; plus any change >15–30 min.",
      "Answer: Immediately; include load ID, current location/time, cause, new ETA, next update time, and any appointment impact."
    ]
  },
  {
    title: "Tracking Methods Overview",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Method", "What it is", "Typical Use", "Watch-outs"],
      rows: [
        ["ELD", "Electronic Logging Device with GPS + HOS data", "Fleet compliance, real-time status", "Access may be limited by carrier"],
        ["MacroPoint (and similar)", "Smartphone-based GPS tracking via app or link", "Broker-initiated shipment tracking", "Get driver consent; time-bounded access"],
        ["Check Calls", "Manual calls or texts at milestones", "Universal fallback", "Must be disciplined and time-stamped"]
      ]
    },
    trainerNotes: [
      "Three paths: ELD portal access when available, MacroPoint-style links when brokers initiate tracking, and disciplined check calls for everything else. We match the method to the carrier and the load.",
      "",
      "QUESTIONS:",
      "Scenario: owner-operator declines sharing ELD access. Which method do you choose and why?",
      "What is one drawback of each method you need to mitigate?",
      "",
      "ANSWERS:",
      "Answer: MacroPoint (time-bounded, consent-based) or structured check calls if driver prefers voice/text; respects privacy and still provides visibility.",
      "Answer: ELD: portal access limits; MacroPoint: consent/battery/signal; Check calls: manual/latency/missed calls—solve with clear cadence and timestamps."
    ]
  },
  {
    title: "ELD: What It Does",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Definition: Records driving time, hours of service, and movement automatically.",
      "Components: Vehicle tracker + fleet software + mobile app.",
      "Requirement: Large commercial vehicles must have ELDs (compliance baseline)."
    ],
    images: ["/training-material/section9/images/ELD.png"],
    trainerNotes: [
      "ELD records movement and hours automatically: driving, on-duty, location pings. If the carrier grants access, we can monitor and forecast ETA from here.",
      "On screen: ELD_Dashboard.png shows what the data looks like in practice.",
      "",
      "QUESTIONS:",
      "Point to one field on the dashboard that helps you predict ETA and explain how you'd use it.",
      "If you do not have portal access, what two questions can you ask the driver to approximate status?",
      "",
      "ANSWERS:",
      "Answer: Drive time remaining / duty status + last location timestamp; use it to project arrival against distance/traffic.",
      "Answer: 'What's your current location/mile marker and time?' 'How much drive time remains before your next break?'"
    ]
  },
  {
    title: "ELD: Access & Expectations",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Access: Not every carrier will grant dispatcher portal access (common with owner-operators).",
      "If No Access: Use MacroPoint or structured check calls to stay informed."
    ],
    trainerNotes: [
      "Not every carrier will grant access, especially owner-operators. No problem: we switch to MacroPoint or a tight check-call schedule.",
      "On screen: ELD_Mobile_App.png so learners recognize what a driver might see.",
      "",
      "QUESTIONS:",
      "Draft a one-sentence request to a driver asking for a quick status without sounding intrusive.",
      "What is a reasonable check-call cadence on an eight-hour linehaul?",
      "",
      "ANSWERS:",
      "Answer: 'Quick check when safe: current city and ETA to [consignee]?'",
      "Answer: Departed PU → mid-run (~4 hrs) → 1–2 hrs from consignee → arrival (plus exceptions if anything changes)."
    ]
  },
  {
    title: "MacroPoint: How It Works",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Process: Broker requests tracking; driver gets link or app request; GPS shares location for a set period.",
      "Consent: Confirm driver agrees before enabling tracking; clarify duration and privacy."
    ],
    images: ["/training-material/section9/images/Macropoint.png"],
    trainerNotes: [
      "Broker sends a link or app request. Driver opts in to share GPS for a defined window. We confirm consent and duration up front.",
      "On screen: MacroPoint_Link_SMS.png and MacroPoint_Tracking_Map.png.",
      "",
      "QUESTIONS:",
      "Role-play: ask for consent in one sentence and state the time window.",
      "What do you say if the driver asks how to turn it off when the load delivers?",
      "",
      "ANSWERS:",
      "Answer: 'Broker requested MacroPoint from pickup to delivery today (~12 hours). OK to enable for this load?'",
      "Answer: End the load in-app or let the link expire; location sharing stops when the window ends."
    ]
  },
  {
    title: "Check Calls: Milestones & Cadence",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Milestone", "What to send", "Why it matters"],
      rows: [
        ["Arrived Pickup", "Arrived PU; gate time; dock ETA", "Establish on-time status"],
        ["Loaded / Departed", "Outgate time; BOL received; ETA to consignee", "Proof of progress"],
        ["Arrived Delivery", "Arrived DEL; dock time; unload start", "Starts free time clock"],
        ["Unloaded / Departed", "Empty; docs submitted", "Triggers billing; plan next load"]
      ]
    },
    trainerNotes: [
      "When we can't automate, we systematize. Milestones: arrived pickup, loaded and outgate, arrived delivery, unloaded and empty. Each touch includes a timestamp and next ETA.",
      "",
      "QUESTIONS:",
      "Write a model text for arrived pickup with gate time and dock ETA in one line.",
      "What do you log after unloading to start billing and why?",
      "",
      "ANSWERS:",
      "Answer: 'Arrived PU 09:05 (gate). Dock ETA 09:20. Will update when loaded.'",
      "Answer: Unload start/finish times, outgate time, 'empty' status, copy of POD/BOL; supports billing and detention claims."
    ]
  },
  {
    title: "Communication Standards",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Proactive Updates: Send ETA changes early; don't wait for problems to escalate.",
      "Format: Short, factual, time-stamped messages (text or email).",
      "Escalation: If late or broken down, notify broker immediately so they can adjust appointments."
    ],
    trainerNotes: [
      "Proactive beats reactive. If ETA slips, we message first. For bigger issues, call first, then send a short summary by text or email so there's a record.",
      "",
      "QUESTIONS:",
      "Rewrite this vague note into a precise update: 'running a bit late.'",
      "What three elements make a status message easy to act on?",
      "",
      "ANSWERS:",
      "Answer: 'Load ABC123: I-40 mile 212 at 10:15. Weather delay, ETA moves from 14:30 to 15:05. Next update 12:00.'",
      "Answer: Load/ref + timestamp/location; cause/impact; new ETA + next update time (and any needed action)."
    ]
  },
  {
    title: "Detention: What It Is",
    layout: "table",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Concept", "Typical Practice", "Notes"],
      rows: [
        ["Free Time", "First 2 hours at shipper/receiver", "Clock starts at on-time arrival"],
        ["Detention Pay", "About 30–100 USD per additional hour", "Not set by law; varies"],
        ["Proof", "Time-stamped in/out + messages", "Needed to collect"]
      ]
    },
    trainerNotes: [
      "Free time is typically two hours at shipper or receiver. After that, detention is hourly and varies. Proof matters: clean in and out times and copies of messages sent at arrival.",
      "",
      "QUESTIONS:",
      "When does the detention clock start, exactly? What counts as proof?",
      "What would you accept as alternative proof if the guard shack is paper-only?",
      "",
      "ANSWERS:",
      "Answer: After free time (typically 2 hours) from on-time arrival; proof = time-stamped in/out (gate/dock) + arrival message + POD/BOL notations.",
      "Answer: Time-stamped photo of sign-in sheet, ELD log screenshots, phone call logs, time-stamped facility photo."
    ]
  },
  {
    title: "Detention: Negotiate Upfront",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Booking Time: Ask broker to confirm detention terms in writing or on the rate confirmation.",
      "Example Term: \"50 USD per hour after first 2 hours, if on-time arrival and broker notified at arrival.\"",
      "Late/Breakdown: Define what happens if truck is late; align expectations in advance."
    ],
    trainerNotes: [
      "Confirm detention terms when booking, not when you're already waiting. Get it on the rate confirmation if possible and clarify exceptions for late arrival or breakdowns.",
      "",
      "QUESTIONS:",
      "Draft one sentence you want written on the rate confirmation for detention terms.",
      "If a breakdown makes you late, what do you ask the broker to document to reduce disputes later?",
      "",
      "ANSWERS:",
      "Answer: 'Detention: $50/hr after first 2 hours from on-time arrival; notify at arrival; paid with supporting timestamps.'",
      "Answer: Written note of breakdown/late exception, revised appointment, and whether detention will apply post-exception."
    ]
  },
  {
    title: "Problems On The Road",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Reality: Breakdowns, weather, and delays happen; silence makes them worse.",
      "Best Action: Call broker early; allow them to call the customer and move the appointment.",
      "Documentation: Keep a log of calls, texts, and times for claims and detention support."
    ],
    trainerNotes: [
      "Breakdowns, weather, missed appointments happen. Silence makes them worse. We call immediately with status and a realistic new ETA, then log the timeline and evidence.",
      "",
      "QUESTIONS:",
      "60-second drill: tire blowout on I-80, ETA slips two hours. List the first three calls or messages you send, in order.",
      "What evidence will you save to support a reschedule or claim?",
      "",
      "ANSWERS:",
      "Answer: (1) Call broker immediately with status/new ETA; (2) Send text/email recap with timestamps; (3) Arrange roadside, then send next update time.",
      "Answer: ELD location/drive logs, tow/repair receipts, photos, weather alerts, call/text logs."
    ]
  },
  {
    title: "Pop Quiz",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    quiz: {
      questions: [
        "Name three ways to track a truck in transit.",
        "When might a carrier deny dispatcher access to ELD, and what's your fallback?",
        "What starts the detention clock, and what proof should you capture?",
        "Why confirm detention terms at booking instead of after a delay?",
        "In case of a breakdown, what is the first communication you make?"
      ],
      answers: [
        "ELD portal, MacroPoint (or similar), structured check calls.",
        "Owner-operator privacy; fallback to MacroPoint or check calls.",
        "On-time arrival at shipper/receiver; capture in/out times and messages.",
        "To avoid disputes; terms vary and aren't fixed by law.",
        "Notify broker immediately with status and revised ETA."
      ]
    },
    trainerNotes: [
      "Quick check to lock it in. You answer first; then I'll reveal model answers in Trainer Mode.",
      "",
      "QUESTIONS:",
      "Ask (students answer aloud): Name three tracking methods we can use.",
      "When does detention start and what proof do we need?",
      "Who do you call first when a breakdown happens and what do you say in ten seconds?",
      "",
      "ANSWERS:",
      "Answer: ELD portal; MacroPoint/app link; structured check calls.",
      "Answer: After free time from on-time arrival; proof = in/out times + arrival message + documents.",
      "Answer: Broker first. 'Heads-up—truck 123 on load ABC had a tire blowout at I-80 MM 212 at 10:10. Driver safe. ETA moves +2h to 16:30. Next update at 11:00.'"
    ]
  },
  {
    title: "Section Material",
    layout: "bullets",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Inline Assets: ELD and MacroPoint screenshots already shown on their slides.",
      "Additional Uploads: Use @FileName.png on content slides where relevant; avoid deferring to end.",
      "Navigation: Use the panel here to go to Next or Previous section."
    ],
    trainerNotes: [
      "We placed the screenshots where they matter so you can link the visuals to the workflow. If you send more PNGs later, we'll slot them on the relevant slides using the file name mentions.",
      "",
      "QUESTIONS:",
      "Which slide would you place an ELD geofence alert screenshot on, and what point would it reinforce?",
      "Thumbs check: which method will you default to next week for an owner-operator who dislikes portal access?",
      "",
      "ANSWERS:",
      "Answer: On the ELD slides to reinforce automated event detection and ETA forecasting (not in a generic materials dump).",
      "Answer: MacroPoint with explicit consent; if declined, disciplined check-call cadence with set times.",
      "",
      "Navigation cue (last slide): Use the navigation box here to jump to the next section or back to the previous one."
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
export default function LoadisticsSection9({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={9}
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

                {/* Image display for slides with images */}
                {slide.images && slide.images.length > 0 && (
                  <div className="mt-6">
                    <div className="grid gap-4">
                      {slide.images.map((imagePath, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                          <img 
                            src={imagePath} 
                            alt={`${slide.title} - Image ${i + 1}`}
                            className="w-full h-auto max-w-2xl mx-auto"
                            onClick={() => window.open(imagePath, '_blank')}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      ))}
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
                        onClick={() => onNavigateToSection(8)} 
                        disabled={9 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 8)
                      </Button>
                      <Button onClick={() => onNavigateToSection(10)} className="rounded-xl">
                        Next Section (Section 10) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 9</div>
    </div>
  );
}
