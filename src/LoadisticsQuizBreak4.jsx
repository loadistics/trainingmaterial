import React, { useState, useEffect } from "react";
import { SlideNavigation } from "./components/ui/SlideNavigation";

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

// ===== Brand palette =====
const brand = { red: "#C8102E", black: "#0F1115", gray: "#4A4A4A", lightGray: "#F3F4F6" };

// ===== Slides data =====
const slides = [
  {
    sectionLabel: "Quiz Break #4",
    title: "🎯 Quiz Time! Sections 22-27 Recap",
    layout: "title",
    quizImage: "/trainingmaterial/misc/QUIZTIME.jpeg",
    trainerNotes: [
      "Welcome to Quiz Break #4 covering Sections 22-27: Market Analysis, Strategic Load Selection, and Negotiation Skills.",
      "This quiz tests practical application of market analysis tools, strategic load selection approaches, and negotiation techniques.",
      "Focus on real-world scenarios that dispatchers face daily in their professional work.",
      "Navigation cue: Use the navigation box to move between sections."
    ]
  },
  {
    title: "Quiz Instructions",
    layout: "bullets",
    bullets: [
      "This quiz covers Sections 22-27: Market Analysis and Strategic Load Selection",
      "Questions focus on practical application of market analysis tools and negotiation skills",
      "Use Google Maps for mileage calculations when needed",
      "Think strategically about load selection and route planning",
      "Apply negotiation techniques from the sample conversations",
      "Complete the quiz at your own pace and review answers with trainer"
    ],
    trainerNotes: [
      "Quiz focus: This quiz tests practical application of market analysis tools, strategic load selection approaches, and negotiation techniques from Sections 22-27.",
      "Instructions: Students should complete the quiz individually, using Google Maps for mileage calculations and applying strategic thinking.",
      "Review process: After completion, review answers together and discuss the reasoning behind each correct answer.",
      "Practical application: Emphasize how these concepts apply to real-world dispatching scenarios."
    ]
  },
  {
    title: "Take the Quiz",
    layout: "quiz-link",
    quizLink: "https://forms.gle/6w4cao8zYgzAHRut5",
    trainerNotes: [
      "Quiz link: Students should complete the Google Forms quiz covering Sections 22-27 content.",
      "Time allocation: Allow 15-20 minutes for quiz completion.",
      "Support: Be available to answer questions about navigation or technical issues.",
      "Monitoring: Walk around to ensure students are progressing through the quiz appropriately."
    ]
  }
];

// ===== Main App =====
export default function LoadisticsQuizBreak4({ onNavigateToSection, sectionDropdown }) {
  const [slideIndex, setSlideIndex] = useState(0);
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  const slide = slides[slideIndex];

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

  function handlePrevious() { prev(); }
  function handleNext() { next(); }

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
              <div className="text-sm uppercase tracking-wide text-gray-500">Quiz Break #4</div>
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
                    {slide.title}
                  </h1>
                  <div className="text-xs text-gray-500">Slide {slideIndex + 1} of {slides.length}</div>
               
                  <SlideNavigation 
                    currentSlide={slideIndex} 
                    totalSlides={slides.length} 
                    onSlideChange={setSlideIndex}
                    sectionNumber="quiz-break-4"
                  /> </div>
              </div>

              <div className="space-y-6">
                {slide.layout === "title" && (
                  <div className="text-center">
                    <p className="text-lg md:text-xl text-gray-700 mb-6">Loadistics LLC Training – Quiz Break</p>
                    {slide.quizImage && (
                      <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
                        <img src={slide.quizImage} alt="Quiz Time" className="max-w-xs h-auto" />
                        <img src={slide.quizImage} alt="Quiz Time" className="max-w-xs h-auto" />
                        <img src={slide.quizImage} alt="Quiz Time" className="max-w-xs h-auto" />
                      </div>
                    )}
                  </div>
                )}

                {slide.layout === "bullets" && slide.bullets && (
                  <ul className="list-disc pl-6 text-lg md:text-xl leading-8">
                    {slide.bullets.map((bullet, i) => (<li key={i} className="mb-3">{bullet}</li>))}
                  </ul>
                )}

                {slide.layout === "quiz-link" && slide.quizLink && (
                  <div className="text-center">
                    <p className="text-lg md:text-xl text-gray-700 mb-6">Click the button below to access the quiz:</p>
                    <Button 
                      onClick={() => window.open(slide.quizLink, '_blank')} 
                      className="text-lg px-8 py-4 rounded-xl"
                    >
                      Take Quiz Break #4 →
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">Opens in a new tab</p>
                  </div>
                )}

                {slide.layout === "answer-key" && trainerMode && slide.answerKey && (
                  <div className="space-y-6">
                    <div className="text-lg font-semibold mb-4">Answer Key (Trainer Only)</div>
                    {slide.answerKey.map((item, i) => (
                      <div key={i} className="p-4 border border-gray-200 rounded-xl">
                        <div className="font-semibold mb-2">Question {i + 1}:</div>
                        <div className="mb-3 text-gray-700">{item.question}</div>
                        <div className="font-semibold mb-2">Answer:</div>
                        <div className="mb-3 text-gray-700">{item.answer}</div>
                        <div className="font-semibold mb-2">Explanation:</div>
                        <div className="text-gray-700">{item.explanation}</div>
                      </div>
                    ))}
                  </div>
                )}

                {slide.layout === "answer-key" && !trainerMode && (
                  <div className="text-center">
                    <p className="text-lg text-gray-700">Answer key is only visible to trainers.</p>
                    <p className="text-sm text-gray-500 mt-2">Enable Trainer Mode to view answers.</p>
                  </div>
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slide.isMaterialsSlide) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(27)} 
                        className="rounded-xl"
                      >
                        ← Back to Section 27
                      </Button>
                      <Button onClick={() => onNavigateToSection(28)} className="rounded-xl">
                        Continue to Section 28 →
                      </Button>
                    </div>
                  </div>
                )}

                {/* Trainer-facing panels when Trainer Mode is ON */}
                
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <Button variant="outline" onClick={handlePrevious} disabled={slideIndex === 0} className="rounded-xl">Prev</Button>
                <div className="text-xs text-gray-500">Slide {slideIndex + 1} / {slides.length}</div>
                <Button onClick={handleNext} disabled={slides.length === 0} className="rounded-xl">Next</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Quiz Break #4</div>
    </div>
  );
}
