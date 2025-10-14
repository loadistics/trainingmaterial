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
      title: "Post Search Reference Guide",
      description: "Comprehensive reference guide for specialized equipment including step deck, conestoga, RGN, car hauler, and box truck specifications and dispatch considerations.",
      url: "/trainingmaterial/section4/pdfs/postsearchreference.pdf",
      filename: "postsearchreference.pdf"
    }
  ],
  images: [
    {
      title: "Step Deck vs Flatbed Height Comparison",
      description: "Visual comparison showing height advantages of step deck trailers",
      url: "/trainingmaterial/section4/images/step-deck-comparison.jpg"
    },
    {
      title: "Conestoga Tarp System",
      description: "Roll-up tarp system showing side-loading capability",
      url: "/trainingmaterial/section4/images/conestoga-system.jpg"
    },
    {
      title: "RGN Loading Process",
      description: "Removable gooseneck showing drive-on ramp configuration",
      url: "/trainingmaterial/section4/images/rgn-loading.jpg"
    }
  ],
  links: [
    {
      title: "FMCSA Oversize/Overweight Permit Requirements",
      description: "Federal Highway Administration guide for oversize/overweight load permits including state contacts and federal weight limits",
      url: "https://ops.fhwa.dot.gov/freight/sw/permit_report/index.htm",
      checkInstructions: "Review federal weight limits (80,000 lbs GVW), permit requirements for loads over standard limits, and state-specific permit contacts"
    },
    {
      title: "Box Truck CDL Requirements by FMCSA and DOT",
      description: "FMCSA requirements for Commercial Driver's License including vehicle weight thresholds and hazardous materials regulations",
      url: "https://ai.fmcsa.dot.gov/NewEntrant/MC/Content.aspx?nav=License#:~:text=A%20CDL%20is%20required%20for%20drivers%20of,Materials%20(see%2049CFR%20part%20172%20subpart%20F)",
      checkInstructions: "Verify CDL requirements for vehicles over 26,000 lbs GVWR and hazardous materials endorsement requirements"
    }
  ]
};

// ===== Slides data =====
const slides = [
  {
    sectionLabel: "Section 4",
    title: "Specialized Equipment: Beyond Dry Van, Reefer, and Flatbed",
    layout: "title",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Today we go beyond the big three. We'll identify **when** specialized equipment is required and **what** that means for dispatch decisions.",
      "Objective: spot equipment fit quickly so we don't waste time on mismatched loads."
    ]
  },
  {
    title: "Overview & Scope",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "We've covered the main trailers (dry van, reefer, flatbed). Now, the specialized gear many lanes require.",
      "Goal: recognize when height, loading method, or commodity demands different equipment.",
      "Today's focus: Step Deck, Conestoga, Removable Gooseneck (RGN), Car Hauler, and Box Truck."
    ],
    trainerNotes: [
      "We already know dry van, reefer, and flatbed. Now we'll cover the trailers you'll see regularly in specialty lanes.",
      "As we go, think: 'What detail tells me this is **not** a standard flatbed/van/reefer job?'"
    ]
  },
  {
    title: "Step Deck",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Attribute", "Details / Dispatch Implication"],
      rows: [
        ["What it is", "Subcategory of flatbed with a lower deck to fit taller loads."],
        ["Height Advantage", "Flatbed max freight height ≈ 8 ft 6 in; step deck increases maximum by ~20 in (≈ 10 ft 2 in)."],
        ["Use Cases", "Tractors, agroindustrial equipment, drilling rigs, pressure tanks, compressor units — anything too tall for a flatbed."],
        ["Loading", "Similar versatility to flatbed (side/top)."],
        ["Implication", "Choose a step deck when height exceeds flatbed limits."]
      ]
    },
    trainerNotes: [
      "Flatbed max freight height is about **8'6\". If we're higher, use a **step deck**.",
      "Same loading flexibility as flatbed; the **lower main deck** is the key.",
      "Dispatch takeaway: get accurate **height** during the first call. If >8'6\", quote as step deck."
    ]
  },
  {
    title: "Conestoga",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Attribute", "Details / Dispatch Implication"],
      rows: [
        ["What it is", "Flatbed equipped with a roll-up tarp (curtain) system for weather protection."],
        ["Key Advantage", "Tarp can be rolled/tilted back to allow side loading/unloading."],
        ["Protection", "Keeps freight covered without losing flatbed loading flexibility."],
        ["Implication", "Specify \"Conestoga\" when a shipper needs side-loading plus weather cover."]
      ]
    },
    trainerNotes: [
      "Think of a **flatbed with a roll-up 'curtain' tarp**. Protection plus side loading.",
      "If shipper needs side access **and** weather cover, this is the ask: **Conestoga**.",
      "Dispatch takeaway: confirm if **side-loading** is required and whether standard tarps would suffice."
    ]
  },
  {
    title: "Removable Gooseneck (RGN)",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Attribute", "Details / Dispatch Implication"],
      rows: [
        ["What it is", "Trailer with a removable front (gooseneck) so the deck can drop to the ground and form a ramp."],
        ["Purpose", "Great for tall or long loads; drive-on/drive-off capability."],
        ["Capacity", "Can carry very heavy loads (up to ~150,000 lb)."],
        ["Permits", "Requires special permits above the 80,000 lb U.S. road GVW limit."],
        ["Implication", "Confirm permits, routing, and exact specs before booking; this is specialized work."]
      ]
    },
    trainerNotes: [
      "The front detaches so the deck drops to the ground; equipment can **drive on**.",
      "Used for **tall/long** pieces; supports **very heavy** loads (up to ~150k lb).",
      "Dispatch takeaway: over **80k GVW** requires permits. Confirm routing, escorts, and timing."
    ]
  },
  {
    title: "Car Hauler",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Attribute", "Details / Dispatch Implication"],
      rows: [
        ["What it is", "Trailers for transporting cars; open or enclosed variants."],
        ["Features", "Built-in ramps; hydraulic systems to raise/lower decks for autonomous accessibility."],
        ["Capacity", "~2 to 10 vehicles depending on configuration."],
        ["Dispatch Reality", "To fully load a trailer, coordinate multiple pickups from multiple locations."],
        ["Market Niche", "Different brokers, clients, and load platforms than general freight."],
        ["Implication", "Expect multi-pick planning, tight timing, and niche marketplaces."]
      ]
    },
    trainerNotes: [
      "Trailers can be **open or enclosed**, with **ramps** and **hydraulics**.",
      "You must coordinate **multiple cars** from **multiple locations** to fill it profitably.",
      "Dispatch takeaway: use the **right marketplaces** and plan a sequence that minimizes empty miles and time."
    ]
  },
  {
    title: "Box Truck",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Attribute", "Details / Dispatch Implication"],
      rows: [
        ["Why it's here", "Shortage of tractors/trailers + lower purchase cost has more carriers investing in box trucks."],
        ["What it is", "\"Straight truck\" with a separate freight compartment behind the cab; may have a sleeper or storage."],
        ["Lengths", "~12–32 ft; most common is 26 ft."],
        ["Weight Limits", "Max gross ≈ 26,000 lb (over this requires CDL)."],
        ["Typical Work", "LTL: parcel/mail delivery, furniture, perishables; household goods; appliances."],
        ["Trending Use", "Increasingly carries similar goods to 53' dry van, but in smaller quantities."],
        ["Capacity Example", "A typical 26' box truck: up to 12 pallets and ~10,000 lb of product."],
        ["Interstate", "Many run interstate; you can find loads similarly to 53' dry van."],
        ["Implication", "Target LTL/short-haul markets; confirm dock access and pallet/jack needs."]
      ]
    },
    trainerNotes: [
      "Because tractors/trailers are scarce and expensive, many carriers use **box trucks**.",
      "Typical: **26 ft** length, up to **12 pallets** and ~**10,000 lb** product; gross limit **26,000 lb** (no CDL).",
      "Dispatch takeaway: target **LTL** and short-haul lanes; confirm dock/forklift and pallet-jack needs."
    ]
  },
  {
    title: "Pop Quiz",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "1) When do you choose a **Step Deck** instead of a flatbed?",
      "2) What makes a **Conestoga** different from a standard flatbed?",
      "3) Why is an **RGN** suited for certain tall/long loads, and what's the permit implication?",
      "4) Name two dispatch challenges unique to a **Car Hauler**.",
      "5) Give two reasons **Box Trucks** are popular right now.",
      "6) What's a typical pallet and weight capability for a **26' Box Truck**?"
    ],
    quiz: {
      questions: [
        "1) When do you choose a **Step Deck** instead of a flatbed?",
        "2) What makes a **Conestoga** different from a standard flatbed?",
        "3) Why is an **RGN** suited for certain tall/long loads, and what's the permit implication?",
        "4) Name two dispatch challenges unique to a **Car Hauler**.",
        "5) Give two reasons **Box Trucks** are popular right now.",
        "6) What's a typical pallet and weight capability for a **26' Box Truck**?"
      ],
      answers: [
        "(1) When height exceeds the flatbed limit (~8'6\"); step deck adds ~20\" of clearance.",
        "(2) Roll-up tarp system provides weather protection while allowing side loading/unloading.",
        "(3) Drive-on ramp (removable gooseneck) accommodates tall/long; over 80,000 lb requires special permits.",
        "(4) Multi-pick coordination; niche brokers/clients/platforms; timing to fill all slots.",
        "(5) Tractor/trailer shortages; lower purchase cost than tractor+trailer; viable LTL opportunities.",
        "(6) ~12 pallets and ~10,000 lb."
      ]
    },
    trainerNotes: [
      "Answer first—then we'll reveal the model answers.",
      "If answers are thin, revisit the Step Deck/Conestoga/RGN tables quickly."
    ]
  },
  {
    title: "Section Material",
    layout: "materials",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    materials: sectionMaterials,
    trainerNotes: [
      "**Post Search Reference Guide**: Walk through this comprehensive reference covering all specialized equipment types. Focus on the specifications and dispatch decision criteria.",
      "**Images**: Use the visual comparisons to reinforce height differences and equipment features. Point out key identifying characteristics for each equipment type.",
      "**FHWA Permit Requirements**: Review the federal weight limits (80,000 lbs GVW) and permit requirements. Show students the state contact list for oversize/overweight permits.",
      "**CDL Requirements**: Emphasize the 26,000 lbs GVWR threshold for CDL requirements. Discuss hazardous materials endorsements for certain loads.",
      "**Discussion**: Ask students to identify which equipment type they'd choose for specific scenarios (tall machinery, weather-sensitive side-loading, heavy equipment, etc.).",
      "Use the navigation panel here to move to the **next** or **previous** section."
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
export default function LoadisticsSection4({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={4}
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
                  <MaterialsDisplay sectionNumber={4} materials={slide.materials} />
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slide.isMaterialsSlide) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(3)} 
                        disabled={4 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 3)
                      </Button>
                      <Button onClick={() => onNavigateToSection(5)} className="rounded-xl">
                        Next Section (Section 5) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 4</div>
    </div>
  );
}
