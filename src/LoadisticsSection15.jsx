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
    sectionLabel: "Section 15",
    title: "Step 5 — Rate Confirmation and Driver Instructions",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "This is the moment every dispatcher enjoys - receiving the rate confirmation email.",
      "Students will learn to review, verify, and process rate confirmations properly.",
      "Focus on accuracy and attention to detail - mistakes here affect the entire load.",
      "Emphasize the legal binding nature of rate confirmations."
    ]
  },
  {
    title: "The Rate Confirmation Moment",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "The Reward: Email arrives with subject line 'Rate Confirmation'",
      "Serotonin Release: Every dispatcher's favorite moment - the load is secured",
      "Legal Document: Rate confirmation is legally binding between broker and carrier",
      "Work Continues: Receiving the confirmation is just the beginning",
      "Next Steps: Review, verify, sign, and coordinate with driver"
    ],
    trainerNotes: [
      "This is the payoff moment - all the negotiation work has paid off.",
      "Rate confirmation = legally binding contract confirming agreed terms.",
      "Never celebrate too early - careful review is critical before signing.",
      "One mistake in the rate confirmation can cost thousands of dollars.",
      "Professional dispatchers treat this as a critical checkpoint, not just paperwork."
    ]
  },
  {
    title: "Rate Confirmation Components",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Load Description: Complete details of cargo being transported",
      "Timing Information: Loading and unloading dates and appointment times",
      "Location Details: Exact pickup and delivery addresses with contact info",
      "Special Instructions: Temperature, handling, or delivery requirements",
      "Financial Terms: Agreed upon rate and payment instructions"
    ],
    trainerNotes: [
      "Each component must be verified against your negotiation notes.",
      "Load description should match what was discussed during booking.",
      "Timing is critical - any discrepancies must be resolved immediately.",
      "Location details provide exact addresses not available during initial negotiation.",
      "Financial terms must match exactly what was agreed verbally."
    ]
  },
  {
    title: "Sample Rate Confirmation Analysis - Header Information",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Broker Information: Steam Logistics International with full contact details",
      "Load Number: 132061 for tracking and reference purposes",
      "Date Format: US format (MM/DD/YYYY) - September 14, 2021",
      "Equipment Type: Specified truck requirements and BOL number space",
      "Motor Carrier: Space for carrier name and dispatcher contact information"
    ],
    pdf: "/training-material/section15/pdfs/Sample+Rate+Confirmation.pdf",
    trainerNotes: [
      "Show the PDF and point out the header section at the top.",
      "Broker contact info is critical - save this for future communication.",
      "Load number becomes your reference for all communications about this shipment.",
      "US date format can be confusing - always double-check month/day order.",
      "Motor carrier section should show your company name and contact details."
    ]
  },
  {
    title: "Pickup Location Details",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Field", "Sample Data", "Purpose"],
      rows: [
        [
          "Facility Name",
          "K1486K1486 NSD DC",
          "Warehouse identifier - may have unusual naming"
        ],
        [
          "Location",
          "Rialto, California",
          "City and state for navigation"
        ],
        [
          "Full Address",
          "1686 West Baseline Road, Rialto, CA 92376",
          "Exact GPS coordinates for driver"
        ],
        [
          "Expected Date",
          "09/15/2021",
          "Pickup date in US format"
        ],
        [
          "Appointment Time",
          "14:15 (2:15 PM)",
          "Strict appointment time - must be on time"
        ]
      ]
    },
    trainerNotes: [
      "Reference the PDF pickup section while explaining each field.",
      "Facility names can be strange - K1486K1486 NSD DC is typical warehouse naming.",
      "Full address is what driver needs for GPS navigation.",
      "Expected date vs appointment time - both are critical for planning.",
      "Military time format (14:15) is common - ensure driver understands.",
      "",
      "QUESTIONS:",
      "Why don't brokers provide exact addresses during initial negotiation?",
      "",
      "ANSWERS:",
      "Answer: Security and competitive reasons - prevents rate shopping with exact details."
    ]
  },
  {
    title: "Reference Numbers and Instructions",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Shipper Reference Numbers: Multiple tracking numbers for facility identification",
      "Pickup/Delivery Numbers: Additional identifiers for load matching",
      "Driver Usage: Driver shows these numbers to facility managers",
      "Load Identification: Numbers tell facility exactly what product to load",
      "Critical Information: Must be included in all driver instructions"
    ],
    trainerNotes: [
      "Point to the reference numbers section in the PDF sample.",
      "These numbers are the 'keys' that unlock the right product at facilities.",
      "Driver arrives and shows these numbers - facility knows exactly what to do.",
      "Without proper reference numbers, driver may be turned away or delayed.",
      "Screenshot option: Some drivers prefer screenshots of this section for convenience."
    ]
  },
  {
    title: "Delivery Location and Special Instructions",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Consignee Information: Unified Western Rock Commerce Distribution",
      "Delivery Date: Next day (09/16/2021) with 16:30 (4:30 PM) appointment",
      "Special Instructions: 'Arrive 30 minutes early, keep doors sealed'",
      "Confirmation Numbers: Long reference numbers for delivery verification",
      "Multiple References: Shipper and delivery numbers for both locations"
    ],
    trainerNotes: [
      "Show the delivery section in the PDF - notice the detailed instructions.",
      "'Arrive 30 minutes early' - this is critical for appointment compliance.",
      "'Keep doors sealed' - security requirement that driver must follow.",
      "Confirmation numbers are different from pickup numbers - don't mix them up.",
      "Special instructions can include temperature, security, or timing requirements."
    ]
  },
  {
    title: "Shipment and Financial Information",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Category", "Details", "Dispatcher Notes"],
      rows: [
        [
          "Total Weight",
          "26,438 lbs",
          "Exact weight for load planning and legal compliance"
        ],
        [
          "Commodity",
          "Snack Foods",
          "General description - driver gets details on BOL"
        ],
        [
          "Net Freight Charges",
          "$750",
          "Agreed rate - matches negotiation"
        ],
        [
          "Distance",
          "50 miles (Rialto to Commerce, CA)",
          "Short haul = high rate per mile ($15/mile)"
        ]
      ]
    },
    trainerNotes: [
      "Reference the shipment information section in the PDF.",
      "Weight is exact - important for legal compliance and route planning.",
      "Commodity description is basic - full details come with Bill of Lading.",
      "Rate verification: $750 for 50 miles = $15/mile (excellent short haul rate).",
      "Short loads often pay higher per-mile rates because they take full days.",
      "",
      "QUESTIONS:",
      "Why do short loads typically pay higher rates per mile?",
      "",
      "ANSWERS:",
      "Answer: Driver's time is committed for full day regardless of distance - minimum daily rate applies."
    ]
  },
  {
    title: "Additional Terms and Payment Instructions",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Broker Agreement: All shipments subject to signed broker-carrier agreement",
      "No Double Brokering: Cannot resell or re-broker this load to others",
      "Invoice Address: AP@steamlogistics.com for standard payment processing",
      "POD Requirement: Invoices not processed without Proof of Delivery",
      "Quickpay Option: Different email address for expedited payment processing"
    ],
    trainerNotes: [
      "Show the bottom section of the PDF with additional terms.",
      "No double brokering - you must transport with your own equipment/authority.",
      "Invoice address is critical - wrong address delays payment by weeks.",
      "POD = Proof of Delivery = signed Bill of Lading from consignee.",
      "Quickpay typically costs 2-3% but provides faster payment (2-5 days vs 30 days)."
    ]
  },
  {
    title: "Rate Confirmation Review Process",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Verification Step: Compare all details against negotiation notes",
      "Rate Accuracy: Confirm dollar amount matches verbal agreement",
      "Date Verification: Check pickup and delivery dates for accuracy",
      "Address Confirmation: Verify locations match discussed route",
      "Special Requirements: Ensure all negotiated terms are documented"
    ],
    trainerNotes: [
      "This is critical - never sign without thorough verification.",
      "Rate discrepancies must be resolved before signing - call broker immediately.",
      "Date errors can cause missed appointments and detention charges.",
      "Address verification prevents driver from going to wrong locations.",
      "Missing special requirements (temperature, detention terms) must be added."
    ]
  },
  {
    title: "Signing and Returning Process",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Signature Required: All rate confirmations must be signed before load execution",
      "Signature Location: Use any available blank space if no designated signature line",
      "Electronic Signature: Digital signatures acceptable for email return",
      "Return Method: Email signed copy back to broker for official booking",
      "Load Status: Load officially booked only after signed confirmation returned"
    ],
    trainerNotes: [
      "Some rate confirmations don't have signature lines - use any blank space.",
      "Electronic signatures are legally binding in transportation industry.",
      "Return to same email address that sent the original confirmation.",
      "Load is NOT officially booked until broker receives signed confirmation.",
      "Keep copy of signed rate confirmation for your records and invoicing."
    ]
  },
  {
    title: "Driver Instruction Scenarios",
    layout: "table",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Driver Type", "Information Shared", "Reason"],
      rows: [
        [
          "Owner-Operator",
          "Complete rate confirmation",
          "They own the business and need full financial details"
        ],
        [
          "Company Driver",
          "Instructions only (no rate/broker info)",
          "Owner doesn't want driver to see rate or broker name"
        ]
      ]
    },
    trainerNotes: [
      "Two completely different approaches based on driver relationship.",
      "Owner-operators get everything - they're business partners.",
      "Company drivers get filtered information - protect company's competitive data.",
      "Company owners often don't want drivers to know: 1) How much load pays, 2) Which broker it came from.",
      "",
      "QUESTIONS:",
      "Why don't company owners want drivers to see the load rate?",
      "",
      "ANSWERS:",
      "Answer: Prevents drivers from negotiating higher pay or contacting brokers directly."
    ]
  },
  {
    title: "Driver Instructions Template",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Essential Information: Time and place of loading and unloading",
      "Cargo Details: Type and weight of cargo being transported",
      "Reference Numbers: All shipper and delivery reference numbers",
      "Special Instructions: Temperature, handling, arrival requirements",
      "Contact Information: Dispatcher contact for questions or issues"
    ],
    trainerNotes: [
      "Driver instructions contain everything EXCEPT rate and broker name.",
      "Include all reference numbers - driver needs these for facility access.",
      "Special instructions are critical - 'arrive 30 minutes early', temperature settings.",
      "Always include your contact info for driver questions or problems.",
      "Ask driver preferred format: email, text, screenshot - accommodate their preference.",
      "Template flexibility: No single format required - adapt to driver needs."
    ]
  },
  {
    title: "Communication and Coordination",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Immediate Action: Send driver instructions as soon as rate confirmation is signed",
      "Driver Preference: Ask driver preferred format for receiving instructions",
      "Screenshot Option: Some drivers prefer screenshots of key sections",
      "Confirmation Receipt: Ensure driver confirms receipt and understanding",
      "Availability Check: Verify driver can make pickup and delivery appointments"
    ],
    trainerNotes: [
      "Speed matters - driver needs time to plan route and schedule.",
      "Different drivers prefer different formats - accommodate their needs.",
      "Screenshots work well for reference numbers and special instructions.",
      "Always get confirmation that driver received and understood instructions.",
      "Verify driver availability for both pickup AND delivery appointments.",
      "Next section: We'll cover tracking and managing loads in transit."
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
export default function LoadisticsSection15({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={15}
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
                    <div className="text-lg font-semibold mb-3">Sample Rate Confirmation Document</div>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <iframe 
                        src={slide.pdf}
                        className="w-full"
                        style={{ height: '600px', minHeight: '400px' }}
                        title="Sample Rate Confirmation"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      Reference this document while reviewing the header information and contact details
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
                        onClick={() => onNavigateToSection(14)} 
                        disabled={false}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 14)
                      </Button>
                      <Button onClick={() => onNavigateToSection(16)} className="rounded-xl">
                        Next Section (Section 16) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 15</div>
    </div>
  );
}
