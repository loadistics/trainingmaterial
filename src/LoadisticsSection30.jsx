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
    sectionLabel: "Section 30",
    title: "Building Relationships with Brokers",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to Section 30 - Building Relationships with Brokers. This is a critical skill for professional dispatchers.",
      "Most dispatcher training focuses on load boards and negotiation, but rarely covers relationship building.",
      "This section provides practical tools to build lasting business relationships from day one.",
      "Navigation cue: Use the navigation box to move between sections."
    ]
  },
  {
    title: "The Importance of Broker Relationships",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Most important skill: making people feel comfortable and building lasting relationships",
      "Most training focuses on load boards and negotiation, not relationship building",
      "Experienced dispatchers spend 45% less time searching for loads",
      "Experienced dispatchers spend 42% less time on load boards",
      "They take loads directly through established contacts"
    ],
    trainerNotes: [
      "Emphasize that relationship building is often overlooked in dispatcher training.",
      "Share the statistics: 45% less time searching, 42% less time on load boards.",
      "Explain that experienced dispatchers have established customers and know what works.",
      "This is the key to professional success - building relationships from day one."
    ]
  },
  {
    title: "The Broker-Carrier Relationship",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Brokers and carriers work together to move freight",
      "Personal relationships often influence load assignments",
      "Brokers prefer working with familiar, reliable dispatchers",
      "Building trust leads to better loads and rates",
      "Long-term relationships benefit both parties"
    ],
    images: [
      {
        src: "/training-material/section30/images/carrier.png",
        alt: "Carrier and Broker Relationship",
        caption: "The partnership between carriers and brokers is built on trust and communication"
      }
    ],
    trainerNotes: [
      "Explain the symbiotic relationship between brokers and carriers.",
      "Emphasize that personal relationships matter in business decisions.",
      "Show the carrier.png image to illustrate the partnership concept.",
      "Explain that trust and reliability are key factors in load assignments."
    ]
  },
  {
    title: "Tool 1: Keep a List of Brokers",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Over 50% of dispatchers don't keep a broker contact list",
      "This is a critical mistake that limits opportunities",
      "Record: broker name, company, phone number, extension",
      "Track: carrier setups, preferred zones, load history",
      "Example: Dave (reefer loads Jacksonville-Orlando), Cindy (frozen produce Winter Haven)"
    ],
    trainerNotes: [
      "Emphasize that most dispatchers don't keep proper contact lists - this is a competitive advantage.",
      "Explain the importance of tracking broker specializations and zones.",
      "Share the example of Dave and Cindy working for the same company but different clients.",
      "Stress that this simple tool can transform a dispatcher's career."
    ]
  },
  {
    title: "Tool 2: Be Respectful and Friendly",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "People want to work with those they like personally",
      "Personal relationships influence load assignments",
      "Always greet brokers professionally and warmly",
      "Show genuine interest in their business",
      "Remember: brokers are people too, not just business contacts"
    ],
    trainerNotes: [
      "Emphasize that personal relationships matter in business decisions.",
      "Explain that brokers prefer working with friendly, respectful dispatchers.",
      "Share examples of how a simple greeting can make a difference.",
      "Stress that being professional doesn't mean being cold or impersonal."
    ]
  },
  {
    title: "Tool 3: Use Names and Build Personal Connection",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Add brokers to your phone book immediately",
      "Call them by name when they call: 'Hey Dave, how are you doing?'",
      "Dale Carnegie: 'A person's name is the sweetest sound to them'",
      "This simple trick builds instant rapport",
      "They'll remember you and call you by name too"
    ],
    trainerNotes: [
      "Share the Dale Carnegie quote about names being important.",
      "Explain how this simple technique builds instant rapport.",
      "Emphasize that people remember those who remember their names.",
      "This is a small gesture that has huge impact on relationships."
    ]
  },
  {
    title: "Tool 4: Provide Active Communication During Transit",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Brokers love dispatchers who communicate actively",
      "Send updates on arrival, departure, and daily location",
      "Even with GPS tracking, send personal emails",
      "Don't worry about being 'annoying' - more updates = better service",
      "This sets you apart from other dispatchers"
    ],
    trainerNotes: [
      "Explain that brokers need to keep their customers informed.",
      "Emphasize that active communication shows professionalism.",
      "Share that this is what brokers want but rarely get.",
      "This is a simple way to stand out from the competition."
    ]
  },
  {
    title: "Tool 5: Send Proof of Delivery Immediately",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Brokers need PODs quickly for their customers",
      "Some customers charge brokers for late PODs",
      "Help brokers improve their image with customers",
      "Make agreements with drivers in advance",
      "Explain the importance to your carriers"
    ],
    trainerNotes: [
      "Explain the broker's pain point with late PODs.",
      "Emphasize how this helps brokers maintain customer relationships.",
      "Share strategies for getting drivers to cooperate.",
      "This simple act builds tremendous goodwill with brokers."
    ]
  },
  {
    title: "Tool 6: Thank Brokers After Delivery",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Prepare a thank you template for after delivery",
      "Express gratitude and desire to continue working together",
      "Attach the signed BOL to the same email",
      "This costs nothing but makes a huge impression",
      "Can also be done via phone call"
    ],
    images: [
      {
        src: "/training-material/section30/images/email-message-example.png",
        alt: "Thank You Email Example",
        caption: "Example of a professional thank you email to brokers after delivery"
      }
    ],
    trainerNotes: [
      "Show the email example image to demonstrate proper format.",
      "Emphasize that this simple gesture sets you apart from other dispatchers.",
      "Explain that gratitude goes a long way in business relationships.",
      "This is a small investment that pays huge dividends in relationship building."
    ]
  },
  {
    title: "Tool 7: Build Working Relationships",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Ask about regular loads after successful deliveries",
      "Tell brokers about your trucks and operating zones",
      "Share your regular load needs and patterns",
      "Help brokers understand how you can be useful",
      "Find common ground for mutual benefit"
    ],
    trainerNotes: [
      "Explain how to transition from one-time loads to regular relationships.",
      "Emphasize the importance of sharing information about your operations.",
      "Share how brokers look for reliable dispatchers in their zones.",
      "This is where relationships become profitable for both parties."
    ]
  },
  {
    title: "Tool 8: Request Load Lists from Brokers",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Ask brokers for their load lists",
      "Some send daily/weekly emails to all contacts",
      "VIP dispatchers get exclusive loads before public posting",
      "These loads often have better rates and terms",
      "Example: 12-truck carrier loads 50% of trucks from one broker contact"
    ],
    trainerNotes: [
      "Explain the concept of VIP load lists and exclusive access.",
      "Share the example of the 12-truck carrier success story.",
      "Emphasize that these relationships take time to build but are extremely valuable.",
      "This is the ultimate goal - exclusive access to high-paying loads."
    ]
  },
  {
    title: "The Handshake of Success",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Building relationships takes time and consistent effort",
      "Use all tools from day one of your career",
      "Results will come after a few months of consistent application",
      "For every equipment type, state, and season, you'll have contacts",
      "This is the path to professional success as a dispatcher"
    ],
    images: [
      {
        src: "/training-material/section30/images/broker+hand+in+dispatcher+hand.jpg",
        alt: "Broker and Dispatcher Handshake",
        caption: "The successful partnership between brokers and dispatchers built on trust and mutual respect"
      }
    ],
    trainerNotes: [
      "Show the handshake image to symbolize successful partnerships.",
      "Emphasize that relationship building is a long-term investment.",
      "Explain that consistency is key - use these tools every day.",
      "This concludes the module on finding loads and building relationships."
    ]
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
export default function LoadisticsSection30({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={30}
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
                    {slide.images.map((image, index) => (
                      <div key={index} className="text-center">
                        <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-auto max-h-96 object-contain cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => window.open(image.src, '_blank')}
                          />
                        </div>
                        {image.caption && (
                          <p className="text-sm text-gray-600 italic">{image.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slide.isMaterialsSlide) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(29)} 
                        disabled={30 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 29)
                      </Button>
                      <Button onClick={() => onNavigateToSection(31)} className="rounded-xl">
                        Next Section (Section 31) →
                      </Button>
                    </div>
                  </div>
                )}

                {/* Quiz Break Button - show on last slide */}
                {slide.isMaterialsSlide && onNavigateToSection && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-sm font-semibold mb-3 text-blue-800">Ready for a Quiz?</div>
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => onNavigateToSection("quiz-break-5")} 
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        🎯 Take Quiz Break #5 (Sections 28-30) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 30</div>
    </div>
  );
}
