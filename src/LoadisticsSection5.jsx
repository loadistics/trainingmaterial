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

// ===== Section Materials =====
const sectionMaterials = {
  pdfs: [
    {
      title: "Sample Carrier Documents (Full Package)",
      description: "Complete set of carrier documentation including insurance certificates, authority documents, safety ratings, and compliance materials.",
      url: "/trainingmaterial/section5/pdfs/Sample+Carrier+Documents+(Full+Package)-1.pdf",
      filename: "Sample+Carrier+Documents+(Full+Package)-1.pdf"
    }
  ],
  images: [],
  links: []
};

// ===== Slides data =====
const slides = [
  {
    sectionLabel: "Section 5",
    title: "Mandatory Documentation of a Trucking Company",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Today we'll master the **four core documents** every carrier must have ready for broker setups and bookings.",
      "They're simple, but missing or outdated files will **delay or kill** a load."
    ]
  },
  {
    title: "Why These Documents Matter",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Dispatchers must be familiar with a carrier's core documents; they're straightforward and used when booking freight.",
      "Paperwork usually takes **~10%** of a dispatcher's time; most work is market, routing, and negotiation.",
      "You'll revisit contracts/waybills later; this section focuses on the documents every carrier must have ready."
    ],
    trainerNotes: [
      "As dispatchers, we use these whenever we open with a new broker or verify compliance before booking.",
      "Remember: documentation is about **10%** of our time; the heavy lift is market and negotiation.",
      "Later modules will cover contracts/waybills; today is about the carrier's **standing documents**."
    ]
  },
  {
    title: "The \"Big Four\" Documents",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Document", "What it proves / When it's used"],
      rows: [
        ["**FMCSA Operating Authority (MC Authority / Certificate)**", "Federal authority and identifiers (USDOT/MC) to operate interstate; brokers ask for it in setup packets."],
        ["**Certificate of Insurance (COI)**", "Confirms active insurance and limits (auto liability, cargo); brokers verify coverage and dates."],
        ["**W-9**", "Legal name, business type, address, and **EIN** for tax reporting; exchanged during carrier–broker setup."],
        ["**Notice of Assignment (NOA)**", "If factoring is used, instructs broker to remit payment to the factor (not the carrier)."]
      ]
    },
    trainerNotes: [
      "These are: **MC Authority**, **COI**, **W-9**, and **NOA** (if the carrier factors).",
      "Every new broker setup asks for them; keep clean PDFs ready with clear filenames."
    ]
  },
  {
    title: "FMCSA Operating Authority",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Item", "Details / Dispatcher takeaway"],
      rows: [
        ["**What it is**", "Federal certificate showing **MC** authority and **USDOT** ID; proves interstate operating status."],
        ["**Who issues**", "FMCSA (U.S. Dept. of Transportation)."],
        ["**Original vs copies**", "Original held by owner; copies with drivers; dispatcher keeps a clean **e-copy** for broker packets."],
        ["**Check before sending**", "Legal name matches, MC/USDOT visible, active status (dates/authority class). (Sample shown in the PDF.)"]
      ]
    },
    trainerNotes: [
      "This proves interstate authority and shows the **MC** and **USDOT** IDs.",
      "Original stays with the company owner; copies go to drivers; I keep a clean e-copy for broker packets.",
      "When reviewing the PDF sample, point to the **MC certificate** header and identifiers."
    ]
  },
  {
    title: "Certificate of Insurance (COI)",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Item", "Details / Dispatcher takeaway"],
      rows: [
        ["**Purpose**", "Proves insurance in force; shows insurer, insured, policy numbers, effective/expiration dates."],
        ["**Minimums (typical)**", "**$750,000** auto liability and **$100,000** cargo liability cited as baseline expectations."],
        ["**What brokers check**", "Limits, commodities covered, dates valid for the load, additional insured if required."],
        ["**Dispatcher tip**", "Keep the latest PDF; verify dates/limits match load requirements before you quote."]
      ]
    },
    trainerNotes: [
      "COI shows insurer, insured, policy numbers, and **effective/expiration** dates.",
      "Brokers commonly expect **$750k auto liability** and **$100k cargo**; confirm coverage matches the load.",
      "In the sample PDF, let's find the **limits** and **dates** together."
    ]
  },
  {
    title: "W-9",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Field", "What to verify"],
      rows: [
        ["**Legal Name / DBA**", "Line 1 legal entity name; DBA if used must be consistent across docs."],
        ["**Entity Type**", "LLC, corporation, sole proprietor, etc.; must match how the carrier does business."],
        ["**Address**", "Registered business address used on billing/invoices."],
        ["**EIN**", "Employer Identification Number (nine digits) used for tax reporting; main reason the W-9 is exchanged."],
        ["**Dispatcher tip**", "Ensure the W-9 name/EIN matches the name on MC certificate and COI to avoid accounting delays."]
      ]
    },
    trainerNotes: [
      "Purpose: exchange **EIN** and legal name for tax reporting; it's why brokers ask for the W-9 first.",
      "Call out **Line 1 legal name**, **DBA**, **entity type**, **address**, and the **EIN** on the sample.",
      "Cross-check that name/EIN match the COI and MC certificate to avoid pay delays."
    ]
  },
  {
    title: "Factoring & Notice of Assignment (NOA)",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Concept", "What it means / Implication"],
      rows: [
        ["**Standard payment window**", "Brokers often pay **~30 days** after delivery/invoice; creates cash-flow strain to the carrier."],
        ["**Factoring**", "Factor buys receivables, pays carrier quickly, collects later from broker; charges a small % fee."],
        ["**NOA**", "Formal notice to the broker that payments must go to the factor."],
        ["**Dispatcher actions**", "If your carrier factors, include the **NOA** in every new broker setup; verify remittance address/instructions. (Sample language is visible in the PDF.)"]
      ]
    },
    trainerNotes: [
      "Standard broker payments are often **~30 days** after delivery — that's why some carriers use factoring.",
      "**NOA** tells the broker to pay the factor instead of the carrier; we include it in the setup packet.",
      "In the PDF, show where the **remittance** details and 'assignment' language appear."
    ]
  },
  {
    title: "Broker Setup Packet: What You Send",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "**MC Authority certificate** (clear e-copy).",
      "**COI** with current dates/limits; add certificates or insured endorsements as required.",
      "**W-9** with correct legal name/EIN.",
      "**NOA** (if factoring) with precise remittance instructions.",
      "**Pro tip:** Name files clearly: `MC_Authority.pdf`, `COI_YYYY-MM-DD.pdf`, `W9.pdf`, `NOA_factor.pdf`."
    ],
    trainerNotes: [
      "Before I quote or accept a load from a new broker, I send: MC Authority, COI, W-9, and NOA (if applicable).",
      "I verify COI dates/limits and that the W-9 **name/EIN** exactly match the authority and insurance.",
      "Consistent naming saves time: `COI_YYYY-MM-DD.pdf`, `W9.pdf`, etc."
    ]
  },
  {
    title: "Pop Quiz",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "1) What does the **MC Authority** prove and who issues it?",
      "2) Which two **minimum coverages** are commonly expected on a COI?",
      "3) What is the **main purpose** of the W-9 in broker setup?",
      "4) Why do some carriers use **factoring**, and what document tells the broker where to pay?",
      "5) Name the **four** documents you'll keep handy for every new broker packet."
    ],
    quiz: {
      questions: [
        "1) What does the **MC Authority** prove and who issues it?",
        "2) Which two **minimum coverages** are commonly expected on a COI?",
        "3) What is the **main purpose** of the W-9 in broker setup?",
        "4) Why do some carriers use **factoring**, and what document tells the broker where to pay?",
        "5) Name the **four** documents you'll keep handy for every new broker packet."
      ],
      answers: [
        "(1) Federal operating authority/identifiers (USDOT/MC) issued by **FMCSA**.",
        "(2) About **$750,000** auto liability and **$100,000** cargo liability.",
        "(3) To provide the **EIN** and legal name for tax/reporting.",
        "(4) To solve cash-flow gaps from ~30-day terms; the **NOA** instructs broker to pay the factor.",
        "(5) **MC Authority**, **COI**, **W-9**, **NOA** (if factoring)."
      ]
    },
    trainerNotes: [
      "Answer first, then I'll toggle Trainer Mode to show model answers.",
      "If answers are thin, I'll point back to slides 4–7 and the PDF sample pages."
    ]
  },
  {
    title: "Section Material",
    layout: "materials",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    materials: sectionMaterials,
    trainerNotes: [
      "We'll review the **Sample Carrier Documents (Full Package)** PDF together.",
      "**COI:** \"Identify **insurer**, **insured**, **policy #**, **effective/expiration**, and **limits**. Confirm cargo and auto liability are sufficient.\"",
      "**W-9:** \"Locate **legal name/DBA**, **entity type**, **address**, and the **EIN**.\"",
      "**MC Authority:** \"Point out the **MC # / USDOT** and the wording confirming operating authority.\"",
      "**NOA:** \"Find the **factor's pay-to** instructions and the statement that all payments must go to the factor.\"",
      "Wrap-up: The faster we verify these, the faster we book — keep fresh PDFs and check dates before every setup."
    ],
    isMaterialsSlide: true
  }
];

// ===== Material Display Components =====
function MaterialsDisplay({ sectionNumber, materials }) {
  if (!materials || (!materials.pdfs?.length && !materials.images?.length && !materials.links?.length)) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p className="text-lg mb-2">No materials uploaded yet for Section {sectionNumber}.</p>
        <p className="text-sm">Materials will appear here when provided.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* PDFs */}
      {materials.pdfs && materials.pdfs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">📄 PDF Documents</h3>
          <div className="space-y-4">
            {materials.pdfs.map((pdf, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{pdf.title}</h4>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => window.open(pdf.url, '_blank')}
                        className="text-sm"
                      >
                        Open in New Tab
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = pdf.url;
                          link.download = pdf.filename || 'document.pdf';
                          link.click();
                        }}
                        className="text-sm"
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                  {pdf.description && (
                    <p className="text-sm text-gray-600 mt-2">{pdf.description}</p>
                  )}
                </div>
                <div className="bg-white">
                  <iframe
                    src={pdf.url}
                    className="w-full h-96 border-0"
                    title={pdf.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Images */}
      {materials.images && materials.images.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">🖼️ Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.images.map((image, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => window.open(image.url, '_blank')}
                />
                <div className="p-3">
                  <h4 className="font-medium text-gray-900 text-sm">{image.title}</h4>
                  {image.description && (
                    <p className="text-xs text-gray-600 mt-1">{image.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      {materials.links && materials.links.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">🔗 External Links</h3>
          <div className="space-y-3">
            {materials.links.map((link, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-700 hover:underline"
                      >
                        {link.title}
                      </a>
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{link.description}</p>
                    {link.checkInstructions && (
                      <p className="text-xs text-gray-500 italic">
                        <strong>What to check:</strong> {link.checkInstructions}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => window.open(link.url, '_blank')}
                    className="text-sm ml-4"
                  >
                    Visit →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
export default function LoadisticsSection5({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={5}
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

                {slide.layout === "materials" && (
                  <MaterialsDisplay sectionNumber={5} materials={slide.materials} />
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slide.isMaterialsSlide) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3 flex-wrap">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(4)} 
                        disabled={5 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 4)
                      </Button>
                      
                      {/* Quiz Break Button - only show on last slide */}
                      {slide.isMaterialsSlide && (
                        <Button 
                          onClick={() => onNavigateToSection("quiz-break")} 
                          className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                          🎯 Quiz Break #1
                        </Button>
                      )}
                      
                      <Button onClick={() => onNavigateToSection(6)} className="rounded-xl">
                        Next Section (Section 6) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 5</div>
    </div>
  );
}
