import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import loadisticsLogo from "./assets/Loadistics-Logo.jpg";
import { SlideNavigation } from "./components/ui/SlideNavigation";

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


const brand = {
  red: "#C8102E",
  black: "#1A1A1A"
};

const slides = [
  {
    title: "🎯 Quiz Time! Sections 11-19 Recap",
    layout: "title",
    icon: <span className="text-4xl">🎯</span>,
    sectionLabel: "Quiz Break #2",
    quizImage: "/trainingmaterial/misc/QUIZTIME.jpeg"
  },
  {
    title: "Quiz Instructions",
    layout: "bullets",
    icon: <span className="text-3xl">📋</span>,
    bullets: [
      "Complete the Google Forms quiz covering Sections 11-19",
      "Topics include: Finding Loads, Dispatcher Calls, Booking Loads, Rate Confirmations, Invoicing, Accounting, and Dispatch Cycle",
      "Take your time to review the material before answering",
      "Use the trainer notes for guidance if needed"
    ]
  },
  {
    title: "Ready to Take the Quiz?",
    layout: "quiz-link",
    icon: <span className="text-3xl">🔗</span>,
    quizLink: "https://forms.gle/gMUa2ag1Uc4ZmbJk6"
  },
  {
    title: "Answer Key (Trainer Only)",
    layout: "answer-key",
    icon: <span className="text-3xl">🔑</span>,
    answerKey: [
      {
        question: "Your truck with a reefer trailer is expected to unload on Thursday in Atlanta, Georgia. The driver needs to be back home in Nashville, Tennessee by Friday. The minimum weekly income target for this truck is $8,000 a week. As of Thursday, the result is $6800. Calculate the Rate per Mile you need to ask for on this load to meet the minimum weekly target. Load Details: Atlanta GA - Nashville TN, 43,000 lbs fresh watermelon, Temp: 45F, 250 total miles",
        answer: "$4.8",
        explanation: "9000 - 7800 = $1200 left to meet the target. $1200 / 250 miles = $4.8"
      },
      {
        question: "Using the data provided, derive the Total Mileage of the given load. Load Details: Load Weight: 30,000 lbs, Commodity: frozen chicken, Rate: $2800, Rate per Mile: $3.2",
        answer: "875 miles",
        explanation: "$2800 / $3.2 per mile = 875 miles"
      }
    ]
  },
  {
    title: "Quiz Complete!",
    layout: "bullets",
    icon: <span className="text-3xl">🎉</span>,
    bullets: [
      "Great job completing the quiz!",
      "Review any questions you missed with your trainer",
      "Ready to continue with Section 20: ELD Mandate and Hours of Service",
      "Keep up the excellent work!"
    ]
  }
];

export default function LoadisticsQuizBreak2({ onNavigateToSection }) {
  const [slideIndex, setSlideIndex] = useState(0);
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const slide = slides[slideIndex];

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
      if (slideIndex === slides.length - 2) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  };

  const handlePrevious = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const handleQuizLink = () => {
    window.open(slide.quizLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {showConfetti && <Confetti width={dimensions.width} height={dimensions.height} />}
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Section info */}
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold" style={{ color: brand.red }}>Quiz Break #2</div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-6">
              {/* Navigation buttons */}
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrevious} disabled={slideIndex === 0}>
                  ← Previous
                </Button>
                <Button onClick={handleNext} disabled={slideIndex === slides.length - 1}>
                  Next →
                </Button>
              </div>
              
              {/* Trainer mode toggle */}
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={trainerMode} onCheckedChange={setTrainerMode} />
                <span className="font-medium">Trainer Mode</span>
              </label>
              
              {/* Logo */}
              <div className="hidden md:block">
                <img src={loadisticsLogo} alt="Loadistics Logo" className="h-12 opacity-80" />
              </div>
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
                    sectionNumber="quiz-break-2"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {slide.layout === "title" && slide.quizImage && (
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

                {slide.layout === "bullets" && slide.bullets && (
                  <ul className="list-disc pl-6 text-lg md:text-xl leading-8">
                    {slide.bullets.map((bullet, i) => (
                      <li key={i} className="mb-3">{bullet}</li>
                    ))}
                  </ul>
                )}

                {slide.layout === "quiz-link" && slide.quizLink && (
                  <div className="text-center space-y-6">
                    <p className="text-lg md:text-xl text-gray-700 mb-6">
                      Click the button below to open the quiz in a new tab
                    </p>
                    <Button 
                      onClick={handleQuizLink}
                      className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      🎯 Take Quiz #2
                    </Button>
                    <p className="text-sm text-gray-500">
                      The quiz will open in a new tab. Complete it and return here when finished.
                    </p>
                  </div>
                )}

                {slide.layout === "answer-key" && trainerMode && slide.answerKey && (
                  <div className="space-y-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Trainer Notes</h3>
                      <p className="text-yellow-700">These answers are only visible in Trainer Mode</p>
                    </div>
                    {slide.answerKey.map((item, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Question {index + 1}:</h4>
                        <p className="text-gray-700 mb-4 text-sm">{item.question}</p>
                        <div className="bg-green-50 border border-green-200 rounded p-4">
                          <p className="font-semibold text-green-800 mb-2">Answer:</p>
                          <p className="text-green-700 font-bold text-lg">{item.answer}</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded p-4 mt-3">
                          <p className="font-semibold text-blue-800 mb-2">Explanation:</p>
                          <p className="text-blue-700">{item.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {slide.layout === "answer-key" && !trainerMode && (
                  <div className="text-center py-8">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">🔒 Answer Key Hidden</h3>
                      <p className="text-gray-600">Enable Trainer Mode to view the answer key</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Section Navigation - show on first and last slides */}
              {(slideIndex === 0 || slideIndex === slides.length - 1) && onNavigateToSection && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                  <div className="text-sm font-semibold mb-3">Section Navigation</div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => onNavigateToSection(19)} 
                      className="rounded-xl"
                    >
                      ← Back to Section 19
                    </Button>
                    <Button onClick={() => onNavigateToSection(20)} className="rounded-xl">
                      Continue to Section 20 →
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                <Button variant="outline" onClick={handlePrevious} disabled={slideIndex === 0} className="rounded-xl">Prev</Button>
                <div className="text-xs text-gray-500">Slide {slideIndex + 1} / {slides.length}</div>
                <Button onClick={handleNext} disabled={slideIndex === slides.length - 1} className="rounded-xl">Next</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
