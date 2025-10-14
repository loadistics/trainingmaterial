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
    sectionLabel: "Quiz Break #3",
    title: "🎯 Quiz Time! Sections 20-21 Recap",
    layout: "title",
    quizImage: "/training-material/misc/QUIZTIME.jpeg",
    trainerNotes: [
      "Welcome to Quiz Break #3 covering Sections 20-21: ELD Mandate and Hours of Service regulations.",
      "This quiz tests understanding of HOS rules, compliance requirements, and practical application scenarios.",
      "Focus on the critical importance of HOS compliance for both drivers and dispatchers.",
      "Navigation cue: Use the navigation box to move between sections."
    ]
  },
  {
    title: "Quiz Instructions",
    layout: "bullets",
    icon: <span className="text-3xl">📋</span>,
    bullets: [
      "Complete the Google Forms quiz covering Sections 20-21",
      "Topics include: ELD Mandate, Hours of Service (HOS), FMCSA Regulations, and Advanced HOS Information",
      "Take your time to review the material before answering",
      "Use the trainer notes for guidance if needed"
    ]
  },
  {
    title: "Ready to Take the Quiz?",
    layout: "quiz-link",
    icon: <span className="text-3xl">🔗</span>,
    quizLink: "https://forms.gle/25hYibeyrGnUL1ju5"
  },
  {
    title: "Answer Key (Trainer Only)",
    layout: "answer-key",
    icon: <span className="text-3xl">🔑</span>,
    answerKey: [
      {
        question: "How many hours of driving are allowed within the 14-hour work window?",
        answer: "11 hours",
        explanation: "Drivers are allowed a maximum of 11 hours of driving within a 14-hour work window, after which they must take a 10-hour break."
      },
      {
        question: "A work limit can be based on a 7-day or 8-day work week. How many hours of work are given to the driver in each option?",
        answer: "60 hours in 7 days or 70 hours in 8 days",
        explanation: "The 7-day work week allows 60 hours of work, while the 8-day work week allows 70 hours of work before requiring a 34-hour reset."
      },
      {
        question: "Your driver's work hours started at 9:00 am. He spent 4 hours loading and started driving at 1:00 pm. He drove continuously for 5.5 hours, then took a 30-minute break for dinner and started driving again at 7:00 pm. How many hours of continuous driving time does the driver have left before he has to take a 10-hour break?",
        answer: "4 hours",
        explanation: "During the working hours, the driver drove only 5.5 hours, so he has another 5.5 hours allowed for driving. However, the driver started work at 9 am, so his 14-hour work window ends at 11 pm. After leaving at 7pm, the driver has 5.5 hours of driving time left, but only 4 working hours, so he can only drive 4 hours before taking a 10-hour break."
      }
    ]
  },
  {
    title: "Quiz Complete!",
    layout: "bullets",
    icon: <span className="text-3xl">🎉</span>,
    bullets: [
      "Excellent work completing the HOS quiz!",
      "You've demonstrated understanding of critical Hours of Service regulations",
      "Ready to continue with advanced dispatching topics",
      "Keep up the outstanding progress!"
    ]
  }
];

// ===== Main App =====
export default function LoadisticsQuizBreak3({ onNavigateToSection, sectionDropdown }) {
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
                    {slide.title}
                  </h1>
                  <div className="text-xs text-gray-500">Slide {slideIndex + 1} of {slides.length}</div>
               
                  <SlideNavigation 
                    currentSlide={slideIndex} 
                    totalSlides={slides.length} 
                    onSlideChange={setSlideIndex}
                    sectionNumber="quiz-break-3"
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
                      Take Quiz Break #3 →
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
                {(slideIndex === 0 || slideIndex === slides.length - 1) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(21)} 
                        className="rounded-xl"
                      >
                        ← Back to Section 21
                      </Button>
                      <Button onClick={() => onNavigateToSection(22)} className="rounded-xl">
                        Continue to Section 22 →
                      </Button>
                    </div>
                  </div>
                )}

                {/* Trainer-facing panels when Trainer Mode is ON */}
                {trainerMode && slide.trainerNotes && slide.trainerNotes.length > 0 && (
                  <div className="p-4 rounded-2xl border bg-amber-50/60" style={{ borderColor: "#F3F4F6" }}>
                    <div className="text-sm font-semibold mb-1">Trainer Notes (Slide {slideIndex + 1})</div>
                    <ul className="list-disc pl-5 text-base md:text-lg space-y-1 font-bold">
                      {slide.trainerNotes.map((note, i) => (<li key={i}>{note}</li>))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <Button variant="outline" onClick={handlePrevious} disabled={slideIndex === 0} className="rounded-xl">Prev</Button>
                <div className="text-xs text-gray-500">Slide {slideIndex + 1} / {slides.length}</div>
                <Button onClick={handleNext} disabled={slideIndex === slides.length - 1} className="rounded-xl">Next</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Quiz Break #3</div>
    </div>
  );
}
