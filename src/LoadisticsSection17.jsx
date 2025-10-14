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
    sectionLabel: "Section 17",
    title: "Step 8 — Invoicing: How to Create and Submit an Invoice",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to the practical side of invoicing - this is where we put payment method knowledge into action.",
      "Tell students: 'We've learned about the three payment methods, now let's see how to actually send an invoice regardless of which method you choose.'",
      "Emphasize: 'This process is the same whether you're using standard pay, quickpay, or factoring - the documents and steps remain consistent.'",
      "Set expectations: 'By the end of this section, you'll be able to create and submit professional invoices in under 5 minutes.'",
      "Point out: 'This is a skill that adds real value to your dispatcher services and can justify higher rates.'"
    ]
  },
  {
    title: "Required Documents for Invoicing",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Rate Confirmation: Signed copy with all load details and payment terms",
      "Bill of Lading: Signed POD (Proof of Delivery) from consignee",
      "Lumper Fee Receipts: Photos or scans of any lumper payment checks (if applicable)",
      "Invoice Document: Professional invoice template with all required information",
      "Voided Check: For direct deposit setup (if not already on file with broker)"
    ],
    trainerNotes: [
      "Start by asking: 'What documents do you think we need to get paid for a completed load?'",
      "Explain each requirement: 'The rate confirmation proves the agreed terms, the BOL proves delivery was completed.'",
      "Emphasize lumper fees: 'If the driver paid for a lumper, ask him to send you a photo or scan of the check - this is reimbursable.'",
      "Point out: 'The invoice itself ties everything together and formally requests payment.'",
      "Mention voided check: 'This contains all the banking information needed for direct deposit setup.'"
    ]
  },
  {
    title: "Finding Invoice Submission Instructions",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Check Rate Confirmation: Look at the bottom section for 'Freight Payment' instructions",
      "Email Address: Usually found as 'payables@brokercompany.com' or similar",
      "Payment Terms: Standard pay timeline (7-30 days) clearly stated",
      "Special Instructions: Quickpay options, direct deposit requirements, document format preferences",
      "Contact Information: Phone number for payment department if questions arise"
    ],
    trainerNotes: [
      "Tell students: 'The rate confirmation is your roadmap - everything you need to know about payment is usually at the bottom.'",
      "Use the sample: 'Let's look at this Three Rivers Logistics rate confirmation I found in my email.'",
      "Point out: 'See here - they want invoices sent to payables@threeriverlogistics.com.'",
      "Highlight good terms: 'This broker pays in 7 days via direct deposit - that's fantastic! Not 30 days like many others.'",
      "Emphasize: 'Always read the payment section carefully - each broker has different requirements.'"
    ]
  },
  {
    title: "Sample Rate Confirmation Analysis",
    layout: "bullets",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    pdf: "/trainingmaterial/section17/pdfs/Sample+Rate+Con+for+Invoice-1.pdf",
    bullets: [
      "Header Information: Three Rivers Logistics contact details and load number 218142",
      "Route Details: Elizabeth, New Jersey to Bolingbrook, Illinois",
      "Payment Amount: $1,400 total invoice amount clearly stated",
      "Delivery Date: January 22nd, 2021 - this becomes our invoice submission date",
      "Payment Instructions: Email bills to payables@threeriverlogistics.com with 7-day payment terms"
    ],
    trainerNotes: [
      "Walk through the PDF systematically: 'Let's examine this real rate confirmation step by step.'",
      "Point to header: 'Here's the broker name, Three Rivers Logistics, and load number 218142.'",
      "Trace the route: 'Pickup in Elizabeth, NJ, delivery in Bolingbrook, IL - standard freight lane.'",
      "Highlight payment: 'Most important - $1,400 total, and look at these excellent 7-day payment terms.'",
      "Explain timing: 'Delivery was January 22nd, so that's when I would submit the invoice.'",
      "Read payment section aloud: 'Email bills and invoice along with any unloading receipts to payables...'",
      "Emphasize direct deposit: 'They pay via direct deposit in 7 days - no fees! This is a great broker to work with.'"
    ]
  },
  {
    title: "Creating the Invoice - Company Information",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Your Company Section: Name of the carrier you're working with (not your dispatcher company)",
      "Carrier Details: Full legal business name, address, phone number, and tax ID if required",
      "Example: 'Dmitri Logistics' when working with that customer, different name for next customer",
      "Professional Appearance: Clean formatting and complete information builds credibility",
      "Consistency: Use the same format and information for all invoices from that carrier"
    ],
    trainerNotes: [
      "Clarify the relationship: 'You put the name of the carrier you're dispatching for, not your own dispatcher business.'",
      "Use examples: 'If I'm working with my customer Dmitri Logistics, that's what goes on the invoice.'",
      "Explain why: 'The broker has a contract with the carrier, not with you as the dispatcher.'",
      "Emphasize completeness: 'Fill out the address and phone number - incomplete information looks unprofessional.'",
      "Point out flexibility: 'When I work with my next customer, I'll put their company name instead.'"
    ]
  },
  {
    title: "Invoice Header and Reference Information",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Invoice Submitted Date: Use the delivery date from the rate confirmation (January 22, 2021)",
      "Bill To Information: Broker company name, dispatcher name (if available), full address",
      "Invoice Number: Check with carrier - some use sequential (1,2,3), others use load number (218142)",
      "Load Reference: Include the load number multiple times - it's okay to repeat this information",
      "Due Date Calculation: Add payment terms to invoice date (7 days = January 29, 2021)"
    ],
    trainerNotes: [
      "Walk through each field: 'Let's fill out this invoice using our Three Rivers Logistics example.'",
      "Explain date logic: 'Delivery was January 22nd, so that's our invoice submission date.'",
      "Point to broker info: 'Houston Daniels is the dispatcher for the brokerage - he's our contact.'",
      "Clarify dispatcher roles: 'He's a dispatcher for the brokerage, you're a dispatcher for the carrier - you work together.'",
      "Discuss numbering: 'Some carriers number invoices 1, 2, 3, 4... others use the load number. Ask your carrier what they prefer.'",
      "Calculate due date: 'Invoice date January 22nd plus 7 days equals due date January 29th.'"
    ]
  },
  {
    title: "Invoice Line Items and Calculations",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Description Field: Load number and brief route description for easy reference",
      "Quantity: Always '1' for one completed load (can combine multiple loads if preferred)",
      "Unit Price: Enter the total load amount ($1,400 from our example)",
      "Formula Calculation: Template automatically calculates total price (Qty × Unit Price)",
      "Additional Charges: Detention, layover, lumper fees can be added as separate line items"
    ],
    trainerNotes: [
      "Show the process: 'Description gets the load number 218142 - this helps their accountant locate the file.'",
      "Explain quantity: 'We moved one load for them, so quantity is 1.'",
      "Demonstrate pricing: 'Unit price is $1,400 - the full amount from the rate confirmation.'",
      "Point out automation: 'The template has formulas, so it calculates the total automatically.'",
      "Mention extras: 'If there was detention, layover, or lumper fees, we add those in additional charges section.'",
      "Emphasize accuracy: 'Double-check all numbers against the rate confirmation - mistakes delay payment.'"
    ]
  },
  {
    title: "Invoice Template and Spreadsheet",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    pdf: "/trainingmaterial/section17/pdfs/Invoice-spreadsheet.pdf",
    bullets: [
      "Professional Template: Clean, simple invoice format that works with any carrier",
      "Automated Calculations: Built-in formulas calculate totals automatically",
      "Customizable Fields: Easy to modify for different carriers and load types",
      "Multiple Load Support: Can combine several loads on one invoice if preferred",
      "Professional Appearance: Builds credibility with brokers and speeds payment processing"
    ],
    trainerNotes: [
      "Show the invoice template: 'Here's the actual invoice template I use - it's simple but professional.'",
      "Point out simplicity: 'As I mentioned, it's as simple as it gets.'",
      "Emphasize functionality: 'This one works just fine and has formulas built in for automatic calculations.'",
      "Highlight customization: 'You can modify this for different carriers - just change the company information section.'",
      "Mention alternatives: 'Honestly, you can get any other invoice template if you want, but this covers all the basics.'",
      "Connect to efficiency: 'The key is having a consistent template so you can fill invoices quickly and professionally.'"
    ]
  },
  {
    title: "Understanding Voided Checks for Direct Deposit",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    images: ["/trainingmaterial/section17/images/Sample+Void+Check.jpg"],
    bullets: [
      "Purpose: Contains all banking information needed for direct deposit setup",
      "Routing Number: Bank's unique identifier (bottom left - 9 digits)",
      "Account Number: Carrier's specific account number (middle section)",
      "Check Number: Individual check identifier (bottom right)",
      "Voiding Process: Write 'VOID' across the check so it cannot be used for payment"
    ],
    trainerNotes: [
      "Show the sample check image: 'Here's what a voided check looks like and why brokers need it.'",
      "Point to routing number: 'This 9-digit number identifies the bank - every bank has a unique routing number.'",
      "Indicate account number: 'This middle section is the carrier's specific account number at that bank.'",
      "Explain check number: 'This identifies the individual check, but it's not needed for direct deposit.'",
      "Emphasize security: 'Writing VOID across it prevents anyone from using this check to steal money.'",
      "Clarify efficiency: 'Instead of asking for all this banking information separately, brokers just say send a voided check.'",
      "Connect to payment: 'With this information, they can deposit payments directly into the carrier's bank account.'"
    ]
  },
  {
    title: "Email Submission Best Practices",
    layout: "bullets",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Subject Line: 'Invoice for Load Number 218142 from Dmitri Logistics' - specific and clear",
      "Email Body: Brief, professional message confirming invoice submission",
      "Attachments: Rate confirmation, signed BOL, invoice, and voided check (if needed)",
      "File Naming: Use descriptive names like 'Load_218142_Invoice.pdf' for easy identification",
      "Follow-up: Keep records of when invoices were sent and payment due dates"
    ],
    trainerNotes: [
      "Emphasize subject line: 'Make it easy for their accountant - include the load number and carrier name.'",
      "Keep email simple: 'Professional but brief - they just need the documents.'",
      "List attachments: 'Rate confirmation proves the deal, BOL proves delivery, invoice requests payment.'",
      "Mention voided check: 'Only needed if they don't have the carrier's banking information on file.'",
      "Recommend tracking: 'I suggest creating a simple spreadsheet to track when invoices were sent and when payment is expected.'",
      "Time estimate: 'Once you have the system down, this whole process takes less than 5 minutes.'"
    ]
  },
  {
    title: "Payment Method Variations",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Standard Pay: Follow the exact process we just covered - submit and wait for payment terms",
      "Quickpay: Contact broker's payables department to inquire about accelerated payment options",
      "Factoring: Submit documents to factoring company portal or email instead of broker",
      "Special Instructions: Each company has different processes - always follow their specific requirements",
      "Documentation: Same documents required regardless of payment method chosen"
    ],
    trainerNotes: [
      "Clarify variations: 'The invoicing process is basically the same, but submission destinations may differ.'",
      "Standard pay example: 'For Three Rivers Logistics, we'd send everything to payables@threeriverlogistics.com.'",
      "Quickpay process: 'If we wanted faster payment, we'd email them asking about quickpay options and rates.'",
      "Factoring difference: 'With factoring, documents go to the factoring company, not the broker.'",
      "Emphasize consistency: 'The documents and invoice format remain the same - only the destination changes.'",
      "Stress instructions: 'Always read and follow each company's specific requirements - they're all slightly different.'"
    ]
  },
  {
    title: "Tracking and Record Keeping",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Invoice Tracking Spreadsheet: Record submission date, load number, amount, and expected payment date",
      "Payment Status: Track when payments are received and flag any overdue invoices",
      "Document Storage: Keep copies of all submitted invoices and supporting documents",
      "Follow-up Schedule: Contact brokers about overdue payments after grace period expires",
      "Client Reporting: Provide regular payment status updates to your carrier clients"
    ],
    trainerNotes: [
      "Recommend organization: 'If you're providing invoicing services for carriers, stay organized with a simple tracking system.'",
      "Show the value: 'This tracking helps you spot problems early and follow up on late payments.'",
      "Explain timing: 'Three Rivers promised 7 days, so if we don't see payment by January 29th, we follow up.'",
      "Emphasize service: 'Your carriers will love getting regular updates on their payment status.'",
      "Professional advantage: 'This level of service sets professional dispatchers apart from the competition.'"
    ]
  },
  {
    title: "Summary and Next Steps",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Process Mastery: You now understand the complete invoicing workflow from documents to submission",
      "Payment Methods: Same process works for standard pay, quickpay, and factoring arrangements",
      "Time Efficiency: Experienced dispatchers complete this process in under 5 minutes per load",
      "Professional Skill: Invoicing expertise makes you more valuable to carriers and employers",
      "Service Addition: This capability can justify higher dispatcher rates and build stronger client relationships"
    ],
    trainerNotes: [
      "Congratulate progress: 'You now have the complete payment picture - from choosing methods to submitting invoices.'",
      "Reinforce universality: 'These skills work with any broker, any carrier, any payment method.'",
      "Set realistic expectations: 'It might take 15-20 minutes at first, but with practice you'll be doing this in 5 minutes.'",
      "Emphasize career value: 'You can now safely add invoicing and payment management to your resume and service offerings.'",
      "Connect to business: 'This complete skill set - payment methods plus invoicing - makes you a full-service dispatcher.'",
      "Preview future: 'Next, we'll cover what happens after you submit the invoice and how to handle payment issues.'"
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
export default function LoadisticsSection17({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={17}
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

                {/* Images display */}
                {slide.images && slide.images.length > 0 && (
                  <div className="mt-6">
                    <div className="text-lg font-semibold mb-3">Sample Voided Check</div>
                    <div className="grid gap-4">
                      {slide.images.map((imgSrc, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                          <img 
                            src={imgSrc} 
                            alt={`Sample Voided Check`}
                            className="w-full max-w-2xl mx-auto cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => window.open(imgSrc, '_blank')}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      Click image to view larger version. Note the routing number, account number, and check number locations.
                    </p>
                  </div>
                )}

                {/* PDF display */}
                {slide.pdf && (
                  <div className="mt-6">
                    <div className="text-lg font-semibold mb-3">Sample Rate Confirmation for Invoicing</div>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <iframe 
                        src={slide.pdf}
                        className="w-full"
                        style={{ height: '600px', minHeight: '400px' }}
                        title="Sample Rate Confirmation for Invoicing"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      Review this rate confirmation to understand where to find payment instructions and load details
                    </p>
                  </div>
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slide.isMaterialsSlide) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(16)} 
                        disabled={17 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 16)
                      </Button>
                      <Button onClick={() => onNavigateToSection(18)} className="rounded-xl">
                        Next Section (Section 18) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 17</div>
    </div>
  );
}
