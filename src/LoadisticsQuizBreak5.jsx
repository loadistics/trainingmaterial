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


// ===== Brand palette =====
const brand = { red: "#C8102E", black: "#0F1115", gray: "#4A4A4A", lightGray: "#F3F4F6" };

// ===== Slides data =====
const slides = [
  {
    sectionLabel: "Quiz Break #5",
    title: "🎯 Quiz Time! Sections 28-30 Recap",
    layout: "title",
    icon: "🎯",
    quizImage: "/trainingmaterial/quiz-break/images/QUIZTIME.jpeg",
    trainerNotes: [
      "Welcome to Quiz Break #5 - Loadboards and Broker Relationships Recap.",
      "This quiz covers Sections 28-30: Loadboards Overview Parts 1 & 2, and Building Relationships with Brokers.",
      "Students will practice load board usage and start building their broker contact database.",
      "The quiz includes practical assignments for Atlanta, GA load searches and broker contact collection.",
      "Navigation cue: Use the navigation box to move between sections."
    ]
  },
  {
    title: "Quiz Instructions",
    layout: "bullets",
    icon: "📋",
    bullets: [
      "Answer all questions completely and accurately",
      "Review your work using the provided correct answers",
      "You have a specific time limit set by the trainer",
      "Ask the trainer immediately if you're unsure about any answers",
      "Discuss questions and reasoning with your colleagues",
      "Sign in to Google to save your progress"
    ],
    trainerNotes: [
      "Review the quiz instructions with the class before they begin.",
      "Emphasize the importance of asking questions if they're unsure.",
      "Encourage collaboration and discussion among students.",
      "Set a reasonable time limit based on the complexity of the assignments."
    ]
  },
  {
    title: "Assignment Overview",
    layout: "bullets",
    icon: "📝",
    bullets: [
      "Get access to one or more load boards from the lesson",
      "Create a load search from Atlanta, GA with 100-mile deadhead radius",
      "Find routes that bring trucks close to Key Market Areas",
      "Find 1 option of a 1-day load for Dry Van equipment",
      "Find 1 option of a 2-day load for Dry Van equipment",
      "Create a list of 15 brokers with company names and phone numbers"
    ],
    trainerNotes: [
      "Walk through each assignment requirement with the students.",
      "Explain the importance of the 100-mile deadhead radius around Atlanta.",
      "Emphasize the goal of finding routes to Key Market Areas for better opportunities.",
      "This practical exercise will help them build their broker contact database."
    ]
  },
  {
    title: "Take the Quiz",
    layout: "quiz-link",
    icon: "🔗",
    quizLink: "https://forms.gle/Pu3egQ9AzsJQGejG7",
    quizLinkText: "Open Quiz in New Tab",
    trainerNotes: [
      "Direct students to the Google Forms quiz link.",
      "Monitor their progress and be available for questions.",
      "The quiz includes practical load board exercises and broker contact collection.",
      "This is a hands-on assessment of their load board and relationship building skills."
    ]
  },
  {mounted && showConfetti && (
        <div className="fixed inset-0 pointer-events-none grid place-items-center text-6xl animate-bounce">🎉</div>
      )}

      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur p-3">
        <div className="max-w-6xl mx-auto flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded grid place-items-center text-white font-bold" style={{ backgroundColor: brand.red }}>L</div>
            <div className="leading-tight">
              <div className="text-sm uppercase tracking-wide text-gray-500">{slides[0].sectionLabel || "Quiz Break"}</div>
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
                    <span style={{ width: 48, height: 48 }} className="grid place-items-center text-4xl">{slide.icon}</span>
                    {slide.title}
                  </h1>
                  <div className="text-xs text-gray-500">Slide {slideIndex + 1} of {slides.length}</div>
               
                  <SlideNavigation 
                    currentSlide={slideIndex} 
                    totalSlides={slides.length} 
                    onSlideChange={setSlideIndex}
                    sectionNumber="quiz-break-5"
                  /> </div>
              </div>

              <div className="space-y-6">
                {slide.layout === "title" && (
                  <div className="text-center space-y-6">
                    <div className="text-gray-700">
                      <p className="text-lg md:text-xl">Loadistics LLC Training – Presentation Version</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <img src={slide.quizImage} alt="Quiz Time" className="h-32 w-auto object-contain" />
                      <img src={slide.quizImage} alt="Quiz Time" className="h-32 w-auto object-contain" />
                      <img src={slide.quizImage} alt="Quiz Time" className="h-32 w-auto object-contain" />
                    </div>
                  </div>
                )}

                {slide.layout === "bullets" && slide.bullets && (
                  <ul className="list-disc pl-6 text-lg md:text-xl leading-8">
                    {slide.bullets.map((bullet, i) => (
                      <li key={i} className="mb-3">{bullet}</li>
                    ))}
                  </ul>
                )}

                {slide.layout === "quiz-link" && slide.quizLink && (
                  <div className="text-center space-y-6">
                    <div className="text-gray-700">
                      <p className="text-lg md:text-xl mb-4">Click the button below to open the quiz in a new tab</p>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => window.open(slide.quizLink, '_blank')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg"
                      >
                        {slide.quizLinkText || "Open Quiz in New Tab"}
                      </Button>
                    </div>
                  </div>
                )}

                {slide.layout === "answer-key" && slide.answerKey && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Answer Key (Trainer Only)</h3>
                    <ol className="list-decimal pl-6 text-base md:text-lg space-y-3">
                      {slide.answerKey.map((answer, i) => (
                        <li key={i} className="mb-2">{answer}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slideIndex === slides.length - 1) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(30)} 
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 30)
                      </Button>
                      <Button onClick={() => onNavigateToSection(31)} className="rounded-xl">
                        Next Section (Section 31) →
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
        </div>
      </div>

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Quiz Break #5</div>
    </div>
  );
}
