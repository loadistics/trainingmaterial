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
    sectionLabel: "Section 16",
    title: "Step 8 — Invoicing: The 3 Most Common Payment Methods",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to Step 8 - one of the most important business skills for dispatchers.",
      "This section covers payment methods and invoicing - a critical skill that sets professional dispatchers apart.",
      "Students will learn the three main payment options and their trade-offs in detail.",
      "Emphasize that understanding payment methods helps dispatchers make better load decisions.",
      "Focus on helping carriers choose the right payment method for their specific situation.",
      "Payment method choice directly affects cash flow, profitability, and business sustainability.",
      "This knowledge makes you more valuable as a dispatcher and can justify higher service rates."
    ]
  },
  {
    title: "Additional Service Opportunity",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Value-Added Service: Invoicing and payment management as additional dispatcher service",
      "Career Advancement: Prove yourself to employers with comprehensive skills",
      "Client Retention: Offer complete dispatch package including financial management",
      "Revenue Stream: Additional income source for independent dispatchers",
      "Professional Growth: Understanding all aspects of carrier operations"
    ],
    trainerNotes: [
      "Start by asking: 'How many of you have experience with invoicing and payment management?'",
      "Explain that many dispatchers only handle load booking - this skill sets you apart from the competition.",
      "Tell students: 'Carriers often struggle with invoicing and payment tracking - this is where you can add real value.'",
      "Emphasize: 'This skill makes you more valuable to employers and can justify higher rates for independent dispatchers.'",
      "Point out: 'Understanding payment flows helps you make better load decisions - you'll know which brokers pay fast vs slow.'",
      "Stress the business impact: 'A complete service offering builds stronger, longer-lasting client relationships.'",
      "Ask the class: 'Who wants to be just another dispatcher, versus the dispatcher who handles everything?'"
    ]
  },
  {
    title: "Payment Method #1: Standard Pay",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Direct Invoicing: Send invoice directly to broker for deferred payment",
      "Payment Timeline: Brokers typically pay within 30 days of invoice submission",
      "Contract Terms: Grace period outlined in broker-carrier agreement",
      "Capital Requirements: Only works for carriers with sufficient cash reserves",
      "Cash Flow Challenge: Many small trucking companies cannot wait 30 days"
    ],
    trainerNotes: [
      "Introduce standard pay: 'This is the traditional method - you invoice the broker and wait for payment.'",
      "Explain the timeline: 'Brokers typically pay within 30 days, but this can vary - some pay in 15 days, others take 45.'",
      "Use an example: 'Let's say you deliver a $2000 load today. With standard pay, you won't see that money for 30 days.'",
      "Ask the class: 'How many of you could personally wait 30 days for your paycheck?' Wait for responses.",
      "Explain the cash flow challenge: 'New carriers have spent money on truck payments, insurance, fuel - they can't wait 30 days.'",
      "Point out: 'Variable costs like fuel, repairs, and driver wages need to be paid immediately, not in 30 days.'",
      "Emphasize: 'Only established carriers with good cash reserves can use standard pay effectively.'",
      "Ask: 'What type of carrier would benefit most from standard pay?' Answer: Established carriers with cash reserves."
    ]
  },
  {
    title: "Payment Method #2: Quickpay Programs",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Accelerated Payment: Broker pays faster for additional commission fee",
      "Fee Structure: Typically 1-5% of load value depending on payment speed",
      "Timeline: Money deposited within 1-7 business days depending on broker",
      "Cash Flow Solution: Creates enough liquidity to cover immediate expenses",
      "Selective Use: Can choose quickpay per load, not required for all loads"
    ],
    trainerNotes: [
      "Introduce quickpay: 'Quickpay is the middle ground between standard pay and factoring.'",
      "Explain the concept: 'The broker pays you faster, but charges an additional fee for this service.'",
      "Give specific examples: 'Fee varies by broker and speed - maybe 1% for 7-day payment, 5% for next-day payment.'",
      "Use a calculation: 'On a $2000 load, 3% quickpay fee costs $60, but you get paid in 2 days instead of 30.'",
      "Emphasize flexibility: 'Great feature - you can choose quickpay per load, not required for all loads.'",
      "Explain the benefit: 'Perfect for carriers who need occasional fast payment but don't want factoring contracts.'",
      "Ask the class: 'When might a carrier choose quickpay over standard pay?'",
      "Answer guide: 'When they have a cash flow gap, emergency repair, or seasonal cash crunch.'"
    ]
  },
  {
    title: "Quickpay Advantages and Disadvantages",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Advantages", "Disadvantages"],
      rows: [
        [
          "Fast payment directly from broker (1-7 days)",
          "Not all brokers offer quickpay programs"
        ],
        [
          "Low fees compared to factoring (1-5%)",
          "May have additional surcharges ($20-30 for online payments)"
        ],
        [
          "Selective use - choose per load basis",
          "Extra administrative time tracking different broker terms"
        ],
        [
          "No exclusive contracts required",
          "Each broker has different quickpay processes and requirements"
        ],
        [
          "Immediate cash flow for variable costs",
          "Different billing processes for each broker relationship"
        ]
      ]
    },
    trainerNotes: [
      "Walk through the table systematically: 'Let's look at the pros and cons of quickpay programs.'",
      "Start with advantages: 'First major advantage - fast payment directly from the broker, usually 1-7 days.'",
      "Explain fees: 'Low fees compared to factoring - typically 1-5% versus factoring's ongoing monthly fees.'",
      "Emphasize flexibility: 'Key advantage - you choose per load. Need fast payment this week? Use quickpay. Cash flow good next week? Use standard pay.'",
      "Point out no contracts: 'No exclusive contracts required - you're not locked into anything long-term.'",
      "Now cover disadvantages: 'Not all brokers offer quickpay - limits your options sometimes.'",
      "Mention hidden costs: 'Watch for additional surcharges - some brokers charge $20-30 extra for online payments.'",
      "Explain administrative burden: 'Each broker has different quickpay processes - more work to track.'",
      "Ask checkpoint question: 'When would quickpay be the best choice for a carrier?'",
      "Guide to answer: 'When they need occasional fast payment but want to avoid factoring contracts and fees on every load.'"
    ]
  },
  {
    title: "Payment Method #3: Factoring Companies",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Account Receivable Purchase: Factoring company buys invoices and pays upfront",
      "Commission Structure: Additional fee for immediate payment service",
      "Payment Speed: Next day or same day payments via direct deposit",
      "Comprehensive Service: Handle all invoicing and collection activities",
      "Additional Benefits: Often provide fuel cards, tire discounts, other services"
    ],
    trainerNotes: [
      "Introduce factoring: 'Factoring companies essentially buy your invoices at a discount for immediate payment.'",
      "Explain the process: 'You deliver the load, submit paperwork to factoring company, they pay you next day.'",
      "Clarify the service: 'They handle all broker relationships, invoicing, and collection activities for you.'",
      "Point out comprehensiveness: 'This is the most comprehensive solution - they do everything payment-related.'",
      "Mention popularity: 'Very popular with new carriers who need consistent, predictable cash flow.'",
      "Highlight additional benefits: 'Most factoring companies provide extra services - fuel cards, tire discounts, road assistance.'",
      "Set up next slide: 'But like everything in business, there are trade-offs. Let's look at the pros and cons.'"
    ]
  },
  {
    title: "Factoring Advantages and Disadvantages",
    layout: "table",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Advantages", "Disadvantages"],
      rows: [
        [
          "Quick next day or same day payments by direct deposit",
          "Usually require exclusive contracts - all loads must be factored"
        ],
        [
          "Low commissions for instant payments (2-3% typically)",
          "Carrier often bears risk if broker doesn't pay"
        ],
        [
          "Convenient invoicing through online platforms and apps",
          "Factoring company can deduct unpaid amounts from future payments"
        ],
        [
          "No need to track individual broker payment terms",
          "Non-recourse factoring (no risk) costs significantly more"
        ],
        [
          "Additional benefits: fuel cards, tire discounts, road services",
          "Credit limits per broker may restrict load opportunities"
        ],
        [
          "One company handles all paperwork for all shipments",
          "May refuse to factor invoices with certain brokers"
        ]
      ]
    },
    trainerNotes: [
      "Go through each row systematically: 'Let's examine the factoring trade-offs carefully.'",
      "Start with speed: 'Major advantage - quick next day or same day payments by direct deposit.'",
      "Explain the contract issue: 'Big disadvantage - usually require exclusive contracts. ALL your loads must go through them.'",
      "Cover commission rates: 'Low commissions for instant payments, typically 2-3%. Sounds good, right?'",
      "Introduce risk factor: 'Here's the catch - carrier often bears the risk if broker doesn't pay.'",
      "Explain recourse vs non-recourse: 'Recourse means if broker doesn't pay, you still owe the factoring company.'",
      "Detail the convenience: 'Convenient invoicing through online platforms and mobile apps.'",
      "Warn about deductions: 'If a broker doesn't pay, they can deduct that amount from your future payments.'",
      "Explain credit limits: 'Credit limits per broker may restrict your load opportunities.'",
      "Mention broker restrictions: 'Some factoring companies refuse to work with certain brokers entirely.'",
      "Ask checkpoint question: 'What's the difference between recourse and non-recourse factoring?'",
      "Guide answer: 'Recourse means carrier is responsible if broker doesn't pay. Non-recourse means factoring company absorbs the loss but charges much higher fees.'"
    ]
  },
  {
    title: "Factoring Contract Considerations",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Exclusive Requirements: Most factoring companies require all invoices go through them",
      "Risk Distribution: Recourse vs non-recourse factoring affects who bears payment risk",
      "Credit Limits: Factoring companies set limits per broker based on their risk assessment",
      "Broker Restrictions: Some brokers may be excluded from factoring programs",
      "Contract Terms: Carefully read all terms regarding fees, minimums, and penalties"
    ],
    trainerNotes: [
      "Emphasize contract importance: 'Before signing with any factoring company, understand these key contract terms.'",
      "Explain exclusivity: 'Most factoring contracts are exclusive - you can't pick and choose which loads to factor.'",
      "Break down risk types: 'Recourse factoring is cheaper but you pay if broker defaults. Non-recourse costs more but they absorb bad debt.'",
      "Use credit limit example: 'If they set a $10,000 limit with Broker A, you can't take more loads from that broker until they pay.'",
      "Warn about broker blacklists: 'Some factoring companies won't work with certain brokers due to poor payment history.'",
      "Stress due diligence: 'Read ALL contract terms carefully - look for fees, minimums, early termination penalties.'",
      "Ask the class: 'What questions should you ask before recommending a factoring company to a carrier?'"
    ]
  },
  {
    title: "Choosing the Right Payment Method",
    layout: "table",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Carrier Situation", "Recommended Method", "Reasoning"],
      rows: [
        [
          "Established carrier with good cash reserves",
          "Standard Pay",
          "No fees, can wait 30 days for payment"
        ],
        [
          "New carrier needing consistent fast payment",
          "Factoring",
          "Predictable cash flow, handles all administration"
        ],
        [
          "Seasonal carrier with occasional cash needs",
          "Quickpay",
          "Flexibility to use only when needed"
        ],
        [
          "High-volume carrier wanting lowest costs",
          "Mix of Standard + Quickpay",
          "Use standard when possible, quickpay when needed"
        ],
        [
          "Owner-operator with irregular income",
          "Non-recourse Factoring",
          "Eliminates payment risk, predictable costs"
        ]
      ]
    },
    trainerNotes: [
      "Introduce the decision matrix: 'There's no one-size-fits-all solution. Let's match payment methods to carrier situations.'",
      "Go through each scenario: 'Established carrier with good cash reserves should use standard pay - no fees, can wait 30 days.'",
      "Explain new carrier needs: 'New carrier needing consistent fast payment should use factoring - predictable cash flow, handles administration.'",
      "Describe seasonal situations: 'Seasonal carriers benefit from quickpay flexibility - use it only when cash flow is tight.'",
      "Detail high-volume strategy: 'High-volume carriers can mix methods - standard pay when possible, quickpay when needed.'",
      "Address risk concerns: 'Owner-operators with irregular income should consider non-recourse factoring - eliminates payment risk.'",
      "Emphasize assessment: 'As a dispatcher, your job is to understand your carrier's cash position and risk tolerance.'",
      "Point out evolution: 'Many carriers start with factoring, then graduate to standard pay as they grow and build cash reserves.'",
      "Ask the class: 'How would you advise a brand new carrier with their first truck?'"
    ]
  },
  {
    title: "Administrative Considerations",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Tracking Complexity: Multiple brokers mean different payment terms and processes",
      "Documentation Requirements: Each payment method has specific paperwork needs",
      "Dispatcher Responsibility: Payment tracking often falls to dispatcher",
      "System Integration: Factoring companies provide better tracking tools",
      "Time Investment: Quickpay requires more administrative time per load"
    ],
    trainerNotes: [
      "Address the hidden cost: 'Administrative burden is often overlooked but it's significant - let me explain.'",
      "Explain tracking complexity: 'With quickpay, you're tracking different fees, different processes, different timelines for each broker.'",
      "Compare to factoring: 'Factoring simplifies this - one system, one process, one company for everything.'",
      "Point out dispatcher role: 'As dispatchers, you often become the de facto accounts receivable manager for your carriers.'",
      "Quantify time cost: 'Consider the time cost when calculating the true cost of each payment method.'",
      "Give example: 'Spending 2 hours per week tracking quickpay from 5 different brokers - that's 100+ hours per year.'",
      "Ask the class: 'How much is your time worth per hour? Factor that into payment method decisions.'"
    ]
  },
  {
    title: "Broker Credit Assessment",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Credit Worthiness: Factoring companies provide broker credit check systems",
      "Risk Management: Online platforms show broker payment history and limits",
      "Due Diligence: Research broker reliability before booking loads",
      "Payment History: Track which brokers pay on time vs those who are slow",
      "Credit Limits: Understand factoring company limits per broker relationship"
    ],
    trainerNotes: [
      "Introduce the intelligence advantage: 'Here's a valuable benefit of factoring companies - they maintain broker databases.'",
      "Explain credit checks: 'Factoring companies provide broker credit check systems - you can research broker reliability before booking.'",
      "Detail the information: 'Online platforms show broker payment history, credit limits, and risk ratings.'",
      "Emphasize due diligence: 'Use this to avoid brokers with poor payment history - protect your carrier's cash flow.'",
      "Explain exclusions: 'Some brokers are excluded entirely from factoring programs due to non-payment issues.'",
      "Point out limits: 'Credit limits prevent over-exposure to any single broker - risk management.'",
      "Highlight broader value: 'This intelligence is valuable even if you're not using factoring - helps with load selection decisions.'",
      "Ask the class: 'How could broker credit information help you make better dispatch decisions?'"
    ]
  },
  {
    title: "Best Practices and Recommendations",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Assess Carrier Needs: Understand cash flow requirements and risk tolerance",
      "Start Conservative: New carriers should prioritize cash flow over cost savings",
      "Plan for Growth: Payment method may change as carrier becomes established",
      "Monitor Performance: Track actual costs and benefits of chosen method",
      "Stay Flexible: Be ready to adapt payment strategy as business evolves"
    ],
    trainerNotes: [
      "Wrap up with key takeaways: 'Let me give you the most important best practices for payment method advice.'",
      "Emphasize assessment: 'First, always assess your carrier's specific needs - cash flow requirements and risk tolerance.'",
      "Advise conservatively: 'For new carriers, prioritize cash flow over cost savings - a failed business saves no money.'",
      "Plan for growth: 'Remember, payment methods can change as the carrier becomes more established.'",
      "Track performance: 'Monitor the actual costs and benefits of whatever method you choose.'",
      "Stay flexible: 'Be ready to adapt payment strategy as the business evolves and grows.'",
      "Emphasize survival: 'Cash flow problems can kill a trucking business faster than low-profit loads.'",
      "Describe typical progression: 'Many carriers start with factoring for predictability, then transition to standard pay as they build reserves.'",
      "Remind about total cost: 'Always track total cost including time and administrative burden - not just the obvious fees.'",
      "Preview next content: 'In our next section, we'll cover the actual invoicing process and documentation requirements.'",
      "Final question: 'What's the most important factor when choosing a payment method?' Answer: 'The carrier's cash flow situation and ability to wait for payment.'"
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
export default function LoadisticsSection16({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={16}
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
                        onClick={() => onNavigateToSection(15)} 
                        disabled={false}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 15)
                      </Button>
                      <Button onClick={() => onNavigateToSection(17)} className="rounded-xl">
                        Next Section (Section 17) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 16</div>
    </div>
  );
}
