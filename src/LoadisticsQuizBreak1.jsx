import React, { useMemo, useState, useEffect } from "react";
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
function Switch({ checked, onCheckedChange }) {
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <span className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={e => onCheckedChange?.(e.target.checked)} />
        <span className={`block h-6 w-10 rounded-full transition ${checked ? "bg-[#C8102E]" : "bg-gray-300"}`}></span>
        <span className={`dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${checked ? "translate-x-4" : ""}`}></span>
      </span>
    </label>
  );
}

// ===== Inline icons (simple SVG) =====
const Icon = {
  CheckCircle: (props) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="currentColor" d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm-1 15l-5-5 1.414-1.414L11 13.172l5.586-5.586L18 9l-7 8Z"/>
    </svg>
  ),
  ExternalLink: (props) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
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
    sectionLabel: "Quiz Break",
    title: "🎯 Quiz Time! Sections 1-5 Recap",
    layout: "title",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    quizImage: "/trainingmaterial/misc/QUIZTIME.jpeg",
    trainerNotes: [
      "Congratulations! Students have completed Sections 1-5 and it's time to test their knowledge.",
      "This quiz covers all the foundational material: dispatcher roles, industry players, equipment types, and documentation.",
      "Set a specific time limit (suggest 15-20 minutes) and encourage students to discuss questions with colleagues.",
      "Remind students to ask questions immediately if they're unsure about anything.",
      "This is a great opportunity to reinforce key concepts before moving to advanced topics."
    ]
  },
  {
    title: "Quiz Instructions",
    layout: "bullets",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Coverage: This quiz recaps everything you've learned in Sections 1-5",
      "Time Limit: You will have a specific time limit set by the trainer",
      "Questions: Answer all questions, then review your work using the provided correct answers",
      "Help Available: If you're unsure about any answers, ask the trainer right away",
      "Collaboration: You're encouraged to discuss questions and reasoning with your colleagues"
    ],
    trainerNotes: [
      "Explain the quiz format: 'This quiz covers Sections 1-5: dispatcher responsibilities, industry players, equipment types, and documentation.'",
      "Set time expectations: 'I'm setting a [X-minute] time limit. This should be plenty of time if you've been following along.'",
      "Encourage participation: 'Don't struggle in silence - raise your hand if you need clarification on any question.'",
      "Promote discussion: 'Feel free to discuss the reasoning behind answers with your colleagues - learning together is encouraged.'",
      "Build confidence: 'This quiz reinforces what you already know. Trust your training and think through each question carefully.'"
    ]
  },
  {
    title: "Let's Take the Quiz!",
    layout: "quiz-link",
    icon: <Icon.ExternalLink className="w-12 h-12" style={{ color: brand.red }} />,
    quizImage: "/trainingmaterial/misc/QUIZTIME.jpeg",
    quizLink: "https://forms.gle/7fdDJfdxRu1ix2C26",
    bullets: [
      "Click the button below to access the Google Forms quiz",
      "Sign in to Google to save your progress if desired",
      "Complete all questions before submitting",
      "Return here when finished for the answer review"
    ],
    trainerNotes: [
      "Direct students to the quiz: 'Click the quiz button to access the Google Forms. Sign in to Google if you want to save your progress.'",
      "Monitor progress: 'I'll be walking around to help with any technical issues or clarification questions.'",
      "Time management: 'Keep an eye on the time - you have [X] minutes total.'",
      "Technical support: 'If you have any issues accessing the form, let me know immediately.'",
      "Completion check: 'Make sure to submit your answers before returning to this presentation for the review.'"
    ]
  },
  {
    title: "Great Job! Ready for Advanced Topics",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Congratulations: You've successfully completed the foundational training sections!",
      "Knowledge Check: This quiz confirmed your understanding of core dispatching concepts",
      "Next Phase: You're now ready to move on to advanced dispatching topics",
      "Confidence Building: You have the foundation needed for professional success",
      "Continuous Learning: Keep this foundational knowledge sharp as you advance"
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

// ===== Main App =====
export default function LoadisticsQuizBreak1({ onNavigateToSection, sectionDropdown }) {
  const [slideIndex, setSlideIndex] = useState(0);
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);

  const slide = slides[slideIndex];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
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
                </div>
              </div>

              <div className="space-y-6">
                {slide.layout === "title" && (
                  <div className="space-y-6">
                    <div className="text-gray-700"><p className="text-lg md:text-xl">Loadistics LLC Training – Quiz Break</p></div>
                    {/* Three Quiz Images Side by Side on Title Slide */}
                    {slide.quizImage && (
                      <div className="flex justify-center gap-4">
                        <img 
                          src={slide.quizImage} 
                          alt="Quiz Time" 
                          className="max-w-xs h-auto rounded-xl shadow-lg"
                        />
                        <img 
                          src={slide.quizImage} 
                          alt="Quiz Time" 
                          className="max-w-xs h-auto rounded-xl shadow-lg"
                        />
                        <img 
                          src={slide.quizImage} 
                          alt="Quiz Time" 
                          className="max-w-xs h-auto rounded-xl shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                )}

                {slide.layout === "bullets" && slide.bullets && (
                  <ul className="list-disc pl-6 text-lg md:text-xl leading-8">
                    {slide.bullets.map((t, i) => (<li key={i} className="mb-3"><EmphasisText text={t} /></li>))}
                  </ul>
                )}

                {slide.layout === "quiz-link" && (
                  <div className="space-y-6">
                    {/* Quiz Instructions */}
                    <ul className="list-disc pl-6 text-lg md:text-xl leading-8">
                      {slide.bullets.map((t, i) => (<li key={i} className="mb-3"><EmphasisText text={t} /></li>))}
                    </ul>

                    {/* Quiz Link Button */}
                    <div className="flex justify-center">
                      <Button
                        onClick={() => window.open(slide.quizLink, '_blank')}
                        className="text-xl px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        <Icon.ExternalLink className="w-6 h-6 mr-3" />
                        Take the Quiz Now!
                      </Button>
                    </div>
                  </div>
                )}

                {slide.layout === "answer-key" && (
                  <div className="space-y-6">
                    <ul className="list-disc pl-6 text-lg md:text-xl leading-8">
                      {slide.bullets.map((t, i) => (<li key={i} className="mb-3"><EmphasisText text={t} /></li>))}
                    </ul>

                    {/* Answer Key - Only visible in trainer mode */}
                    {trainerMode && slide.answerKey && (
                      <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 text-amber-800">📋 Complete Answer Key (Trainer Only)</h3>
                        <div className="space-y-6">
                          {slide.answerKey.map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg border border-amber-100">
                              <h4 className="font-semibold text-gray-900 mb-2">{item.question}</h4>
                              <div className="text-sm text-gray-600 mb-2">
                                <strong>Options:</strong>
                                <ul className="list-disc pl-5 mt-1">
                                  {item.options.map((option, optIndex) => (
                                    <li key={optIndex}>{option}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="text-sm mb-2">
                                <strong className="text-green-700">Correct Answer:</strong> <span className="text-green-800 font-medium">{item.correctAnswer}</span>
                              </div>
                              <div className="text-sm">
                                <strong className="text-blue-700">Explanation:</strong> <span className="text-blue-800">{item.explanation}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slide.isMaterialsSlide) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(5)} 
                        className="rounded-xl"
                      >
                        ← Back to Section 5
                      </Button>
                      <Button onClick={() => onNavigateToSection(6)} className="rounded-xl">
                        Continue to Section 6 →
                      </Button>
                    </div>
                  </div>
                )}

                {/* Trainer-facing panels when Trainer Mode is ON */}
                {trainerMode && slide.trainerNotes && slide.trainerNotes.length > 0 && (
                  <div className="p-4 rounded-2xl border bg-amber-50/60" style={{ borderColor: "#F3F4F6" }}>
                    <div className="text-sm font-semibold mb-1">Trainer Notes (Slide {slideIndex + 1})</div>
                    <ul className="list-disc pl-5 text-base md:text-lg space-y-1 font-bold">
                      {slide.trainerNotes.map((n, i) => (<li key={i}>{n}</li>))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <Button variant="outline" onClick={prev} disabled={slideIndex === 0} className="rounded-xl">Prev</Button>
                <div className="text-xs text-gray-500">Slide {slideIndex + 1} / {slides.length}</div>
                <Button onClick={next} disabled={slides.length === 0} className="rounded-xl">Next</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Quiz Break</div>
    </div>
  );
}
