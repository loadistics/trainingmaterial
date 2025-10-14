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
    sectionLabel: "Section 14",
    title: "Step 4 — Booking Loads and Filling Out Documents",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "This section covers the critical transition from negotiation to booking.",
      "Students will learn the complete documentation process for new broker relationships.",
      "Focus on speed and accuracy - brokers won't wait for slow paperwork.",
      "Emphasize the difference between existing relationships vs. new setups."
    ]
  },
  {
    title: "Verbal Booking Process",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Verbal Confirmation: 'All right, let's book it' or 'Okay, let's go for it'",
      "MC Number Verification: Broker checks carrier in database for compliance",
      "Database Check: Operating history, violations, reviews, license status",
      "Broker Requirements: Some work only with 6+ months experience, 5+ trucks, etc.",
      "Green Light: If approved, proceed to documentation phase"
    ],
    trainerNotes: [
      "Verbal booking is the commitment point - both parties are now obligated.",
      "MC number check is automatic - broker must verify carrier legitimacy.",
      "Database shows: months/years operating, violations, bad reviews, license status.",
      "Each broker has different requirements - some very strict on experience.",
      "If rejected, find another broker - negotiation rarely works at this stage."
    ]
  },
  {
    title: "Two Documentation Scenarios",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Scenario", "Process", "Documents Needed"],
      rows: [
        [
          "Existing Relationship",
          "Carrier already worked with broker previously",
          "Rate Confirmation only - agreement already signed"
        ],
        [
          "New Relationship Setup",
          "First time working with this broker",
          "Complete setup packet: Agreement, W-9, Insurance, Authority"
        ]
      ]
    },
    trainerNotes: [
      "Existing relationships are fast - just rate confirmation sent immediately.",
      "New setups require full documentation exchange before any loads can move.",
      "Setup process can take 30 minutes to several hours depending on broker.",
      "Always ask: 'Do we need to get set up?' to clarify the situation.",
      "",
      "QUESTIONS:",
      "What's the difference between these two scenarios in terms of time?",
      "",
      "ANSWERS:",
      "Answer: Existing relationship = 5 minutes; New setup = 30 minutes to 2 hours."
    ]
  },
  {
    title: "Setup Packet Request Process",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Broker Request: 'We need to get set up. Let me send you a setup packet. What's your email?'",
      "Information Exchange: Provide email address and get broker's direct contact",
      "Contact Details: Get broker name, direct phone line, or extension number",
      "Avoid Auto-Attendant: Direct contact prevents future delays and confusion",
      "Time Sensitivity: Setup packets must be completed quickly to secure load"
    ],
    trainerNotes: [
      "Setup packet = document package sent via email for completion.",
      "Always get broker's direct contact - avoid main switchboard delays.",
      "Extension numbers let you reach the same person directly.",
      "Time is critical - other dispatchers are competing for the same load.",
      "Professional approach: organized, responsive, complete documentation."
    ]
  },
  {
    title: "Setup Packet Formats and Tools",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Online Packets: Software-based forms (broker subscription service)",
      "PDF Documents: Single file attachment requiring PDF editor",
      "Recommended Tools: Free PDF editors or paid options like Adobe",
      "Digital Signatures: Electronic signatures accepted in US - no printing needed",
      "Efficiency Focus: Complete forms digitally for speed and professionalism"
    ],
    trainerNotes: [
      "Online packets are faster but less common - usually larger brokers.",
      "PDF packets are standard - most brokers use this format.",
      "Never print and handwrite - looks unprofessional and wastes time.",
      "Digital signatures are legally binding in the US transportation industry.",
      "Speed matters - slow paperwork loses loads to competitors."
    ]
  },
  {
    title: "Sample Setup Packet Analysis - Broker Credentials",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "TIA Membership: Transportation Intermediary Association certificate",
      "NASTC Affiliation: National Association of Small Trucking Companies",
      "Broker Information: Legal name, address, DOT number, Federal ID (EIN)",
      "Operating History: Established date showing market experience",
      "Credit References: Partner companies for verification"
    ],
    trainerNotes: [
      "First pages are broker marketing - showing legitimacy and credentials.",
      "TIA and NASTC memberships indicate professional standing.",
      "Look for: company legal name, full address, DOT number, EIN number.",
      "Established date shows how long they've been in business.",
      "Credit references can be called if you have concerns about payment.",
      "These pages require no action from you - just review for legitimacy."
    ]
  },
  {
    title: "Payment Options - Quickpay Programs",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Standard Terms: Typical 30-day payment from brokers",
      "Quickpay Option: Faster payment for percentage fee (usually 2-3%)",
      "Example Terms: 3 business days payment for 3% of gross freight bill",
      "Selective Use: Can choose quickpay per load, not all loads",
      "Carrier Decision: Check with carrier owner before agreeing to fees"
    ],
    trainerNotes: [
      "Standard broker payment is NET 30 days from delivery.",
      "Quickpay is alternative to factoring companies for faster cash flow.",
      "Typical quickpay: 2-3% fee for payment in 2-5 business days.",
      "Advantage: Can select quickpay per load when carrier needs fast cash.",
      "Always confirm with carrier before agreeing to quickpay fees.",
      "",
      "QUESTIONS:",
      "When would a carrier choose quickpay over standard terms?",
      "",
      "ANSWERS:",
      "Answer: Cash flow problems, immediate expenses, or avoiding factoring company fees."
    ]
  },
  {
    title: "Insurance and License Verification",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Broker Insurance: Certificate showing active coverage and policy dates",
      "License Verification: Active broker authority from FMCSA database",
      "FMCSA Extract: Government database information proving legitimacy",
      "Due Diligence: Verify broker has proper authority and insurance",
      "Red Flags: Expired policies, inactive licenses, missing documentation"
    ],
    trainerNotes: [
      "Always verify broker insurance is current - check policy dates.",
      "Broker license must be active in FMCSA database.",
      "Some brokers include FMCSA extract to prove their information is accurate.",
      "This verification protects carrier from working with illegal brokers.",
      "If documents are expired or missing, question the broker's legitimacy."
    ]
  },
  {
    title: "Broker-Carrier Agreement Key Terms",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Section", "Carrier Responsibilities", "Broker Responsibilities"],
      rows: [
        [
          "Authority & Compliance",
          "Licensed motor carrier, no re-brokering, maintain compliance",
          "Licensed broker, maintain surety bond, notify of authority changes"
        ],
        [
          "Equipment & Personnel",
          "Provide equipment and qualified drivers",
          "Arrange transportation (not perform it)"
        ],
        [
          "Insurance & Liability",
          "Carry proper insurance, liable for cargo damage/loss",
          "Maintain broker insurance, not liable for transportation"
        ],
        [
          "Payment Terms",
          "Cannot bill shipper directly, only collect from broker",
          "Sole party responsible for carrier payment"
        ]
      ]
    },
    trainerNotes: [
      "This is the core legal document governing the relationship.",
      "Carrier cannot re-broker loads - must transport under own authority.",
      "Carrier is responsible for cargo damage/loss - insurance must cover this.",
      "Payment flows: Shipper → Broker → Carrier (never direct to carrier).",
      "Broker maintains surety bond to protect carriers from non-payment.",
      "",
      "QUESTIONS:",
      "Why can't carriers bill shippers directly?",
      "",
      "ANSWERS:",
      "Answer: Broker is the contracting party with shipper and legally responsible for payment to carrier."
    ]
  },
  {
    title: "Agreement Completion Process",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Header Information: Fill in current date, carrier company name, DOT number",
      "Signature Requirements: Electronic signature acceptable in US",
      "Authority Levels: Dispatcher may sign or forward to carrier owner",
      "Required Documents: Completed agreement, W-9 form, insurance certificate",
      "Submission Timeline: Complete and return within 30 minutes maximum"
    ],
    trainerNotes: [
      "Fill header with: today's date, exact legal company name, DOT number.",
      "Some agreements ask for MC number instead of DOT - both are acceptable.",
      "Check with carrier: can dispatcher sign or must owner/manager sign?",
      "Electronic signatures are legally binding - no wet signatures needed.",
      "Speed is critical - brokers will give load to faster competitors.",
      "Double-check all information before submitting - errors cause delays."
    ]
  },
  {
    title: "Required Supporting Documents",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Motor Carrier Authority: MC certificate showing active authority",
      "Certificate of Insurance: Current policy with proper coverage limits",
      "W-9 Tax Form: IRS form with carrier's EIN number",
      "Notice of Assignment: If using factoring company for payments",
      "Document Organization: Send all documents in single email for efficiency"
    ],
    trainerNotes: [
      "These are standard documents every carrier must maintain.",
      "Insurance must show: General Liability, Auto Liability, Cargo coverage.",
      "W-9 provides carrier's tax ID (EIN) for broker's 1099 reporting.",
      "Notice of Assignment redirects payments to factoring company if applicable.",
      "Organize documents professionally - shows competence and attention to detail."
    ]
  },
  {
    title: "Sample Carrier Documents Package",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Complete Package: All required documents in professional format",
      "Document Review: Each page serves specific legal and business purpose",
      "Quality Standards: Clean, current, properly formatted documentation",
      "Submission Process: Organized email with clear subject line and attachments"
    ],
    pdf: "/trainingmaterial/section14/pdfs/Sample+Carrier+Packet-2.pdf",
    trainerNotes: [
      "Show the PDF to demonstrate professional document package.",
      "Walk through each document explaining its purpose and importance.",
      "Point out formatting standards and attention to detail.",
      "Emphasize that sloppy documentation reflects poorly on carrier.",
      "Professional presentation builds broker confidence and trust."
    ]
  },
  {
    title: "Speed vs. Accuracy Balance",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Time Pressure: Brokers won't wait hours for documentation",
      "Competitive Reality: Other dispatchers are completing packets faster",
      "Legal Understanding: Dispatcher is not a lawyer - focus on key terms",
      "Efficiency Priority: Complete accurately but quickly to secure loads",
      "Quality Control: Double-check critical information before submission"
    ],
    trainerNotes: [
      "This is the reality of dispatching - speed matters for load securing.",
      "Don't spend hours analyzing every contract clause - not your job.",
      "Focus on: legitimate broker, active licenses, standard terms.",
      "If carrier has special contract requirements, they'll tell you.",
      "Balance: thorough enough to avoid problems, fast enough to win loads.",
      "",
      "QUESTIONS:",
      "What's the maximum time you should spend on a setup packet?",
      "",
      "ANSWERS:",
      "Answer: 30 minutes maximum from receipt to submission - faster is better."
    ]
  },
  {
    title: "Next Steps and Best Practices",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Follow-Up Process: Confirm broker received complete packet",
      "Rate Confirmation: Request immediate rate confirmation after setup approval",
      "Relationship Building: Professional, efficient service builds repeat business",
      "Documentation Storage: Keep copies of all agreements for future reference",
      "Continuous Improvement: Learn from each setup to increase speed and accuracy"
    ],
    trainerNotes: [
      "Always confirm broker received and approved the setup packet.",
      "Request rate confirmation immediately after setup approval.",
      "First impression matters - efficient setup leads to more loads from that broker.",
      "Maintain organized files of all broker agreements for quick reference.",
      "Each setup makes you faster and more professional for the next one.",
      "Goal: Build reputation as reliable, fast, professional dispatcher.",
      "Next section: We'll cover rate confirmations and driver instructions."
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
export default function LoadisticsSection14({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={14}
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

                {/* PDF display for slides with pdf property */}
                {slide.pdf && (
                  <div className="mt-6">
                    <div className="text-lg font-semibold mb-3">Sample Carrier Documents Package</div>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <iframe 
                        src={slide.pdf}
                        className="w-full"
                        style={{ height: '600px', minHeight: '400px' }}
                        title="Sample Carrier Documents Package"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      Review this complete package to understand professional document standards
                    </p>
                  </div>
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
                        onClick={() => onNavigateToSection(13)} 
                        disabled={false}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 13)
                      </Button>
                      <Button onClick={() => onNavigateToSection(15)} className="rounded-xl">
                        Next Section (Section 15) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 14</div>
    </div>
  );
}
