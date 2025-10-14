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
    sectionLabel: "Section 27",
    title: "Everything is Negotiable - Sample Conversations",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to Section 27: 'Everything is Negotiable - Sample Conversations' - this section provides real-world negotiation examples with video demonstrations.",
      "Key focus: 'This situation was very typical. A simple standard load. One pick up, one delivery, morning pickup time, morning delivery time.'",
      "Learning objective: 'If there was a test book for dispatchers, this conversation would be in it.'",
      "Professional development: 'Good negotiation goes a long way.'"
    ]
  },
  {
    title: "Negotiation Fundamentals - The Art of Rate Discussion",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Everything is negotiable in freight transportation",
      "Brokers and dispatchers have opposing goals but need each other",
      "Brokers want to sell loads as cheaply as possible",
      "Dispatchers want to get the highest possible price",
      "The load must be picked up at the appointment time regardless",
      "Successful negotiation requires understanding both perspectives"
    ],
    trainerNotes: [
      "Negotiation reality: 'Brokers, just like dispatchers, work all day long to make sure that cargo is shipped and that they make money from it. Their goals are much the same as those of the dispatcher.'",
      "Opposing positions: 'Although we're on the opposite teams of the game, the broker needs to sell the load as cheap as possible and the dispatcher needs to get the highest possible price.'",
      "Common ground: 'This is the main difference between us. But no matter who wins the game and gets the desired rate, the load must be picked up at the appointment time.'",
      "Professional approach: 'Understanding both perspectives is essential for successful negotiations.'",
      "Strategic thinking: 'The key is finding the balance between what the broker can pay and what the dispatcher needs to earn.'"
    ]
  },
  {
    title: "Conversation 1: Standard Reefer Load - Atlanta to Louisville",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Load: Atlanta, GA to Louisville, KY - 420 miles",
      "Equipment: Reefer, 15,000 lbs fresh salad greens, 45°F",
      "Timing: Pickup 9am-2pm today, delivery 9am tomorrow",
      "Broker starts: $1,200 (already covered 2 loads at this rate)",
      "Dispatcher asks: $1,600",
      "Broker counters: $1,300",
      "Dispatcher counters: $1,500",
      "Broker checks with boss: $1,350 maximum",
      "Final agreement: $1,400 (dispatcher gets extra $50)"
    ],
    video: "https://www.youtube.com/embed/Ymlgp_KHxqk",
    trainerNotes: [
      "Video introduction: 'Now we'll watch the first conversation - a standard reefer load from Atlanta to Louisville. This is a perfect example of professional negotiation.'",
      "Load details: 'Pick up today in Atlanta anytime between 9 a.m. and 2 p.m. deliveries tomorrow in Louisville at 9 a.m., £15,000 of fresh salad greens, 45 degrees from the reefer. And I got $1,200 on this one.'",
      "Dispatcher strategy: 'Watch how the dispatcher starts at $1,600 - higher than his target rate. This gives him room to negotiate down while still achieving his goal.'",
      "Broker reinforcement: 'Notice how the broker reinforces his position by saying he already covered two of these for $1,200. This is a common tactic to establish market rate.'",
      "Negotiation process: 'The dispatcher doesn't accept the first counter-offer. He pushes for $1,500, showing he's serious about getting a fair rate.'",
      "Final result: 'The broker checks with his boss and comes back with $1,350. But the dispatcher pushes for $1,400 and gets it - that's an extra $50 through persistence.'",
      "Key lesson: 'This conversation demonstrates the importance of not accepting the first offer and knowing when to push for more.'"
    ]
  },
  {
    title: "Conversation 1 Analysis - Why This Negotiation Succeeded",
    layout: "table",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Element", "Broker Action", "Dispatcher Response", "Strategic Value"],
      rows: [
        ["Load Quality", "Standard load, good timing", "Recognized opportunity", "Perfect for day's work"],
        ["Market Knowledge", "Already sold 2 at $1,200", "Knew market rate $1,300-$1,500", "Used market data effectively"],
        ["Negotiation Style", "Reinforced position with data", "Pushed beyond broker's comfort zone", "Got extra $50 through persistence"],
        ["Timing", "Urgent pickup needed", "Offered immediate availability", "Created urgency advantage"],
        ["Final Result", "Agreed to $1,400", "Secured 17% above broker's initial offer", "Professional negotiation success"]
      ]
    },
    trainerNotes: [
      "Load assessment: 'This situation was very typical. A simple standard load. One pick up, one delivery, morning pickup time, morning delivery time. Not heavy, not low temperature. Absolutely nothing bad about this load.'",
      "Distance analysis: 'The route is about 420 miles. Perfect for a days load.'",
      "Market knowledge: 'Broker started in 1200. The dispatcher started at 1600. Early in the conversation, the broker reinforced his position by saying that he had already sold several of the same loads for 1200.'",
      "Strategic persistence: 'However, that didn't stop the dispatcher. He knew that the market price was somewhere around 1300 to $1500.'",
      "Final success: 'At this point, the dispatcher could have just agreed, but he went a bit further and got that extra 50 bucks for a final rate of $1,400.'",
      "Professional standard: 'Great simple negotiation. If there was a test book for dispatchers, this conversation would be in it.'"
    ]
  },
  {
    title: "Conversation 2: Complex Load - Los Angeles to Portland",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Load: Los Angeles, CA to Portland, OR - 1,000 miles",
      "Equipment: Dry van, 42,500 lbs canned food on pallets",
      "Timing: Pickup Wednesday 11am, delivery Friday 9pm",
      "Broker rate: $4,000",
      "Dispatcher asks: $6,000 (due to late Friday delivery)",
      "Broker maximum: $4,500",
      "Dispatcher minimum: $5,500",
      "Result: No deal - dispatcher walked away professionally"
    ],
    video: "https://www.youtube.com/embed/CDYQ9vCz0Vs",
    trainerNotes: [
      "Video introduction: 'Now we'll watch the second conversation - a complex load from Los Angeles to Portland. This shows a different negotiation scenario where the dispatcher walks away.'",
      "Load identification: 'The first thing the broker asked was a load posting number at the big brokerage companies. All the loads posted are assigned a unique number that makes it easier for them to find the load in their system.'",
      "Location clarification: 'The load was posted as Los Angeles to Portland, but when the broker started giving the information, he said that the pickup city was Riverside, California.'",
      "Distance calculation: 'So Riverside to Portland, distance is about 1000 miles. As we already know, this is the ideal distance for a two day load.'",
      "Timing concern: 'By picking it up on a Wednesday morning, the driver could deliver it on Friday morning and have time to pick up another load on Friday. But in this situation the shipment cannot be delivered until 9 p.m.'",
      "Strategic decision: 'The dispatcher specifically asked if it was possible to deliver in the morning since there is no such possibility. It puts the dispatcher in a difficult position.'",
      "Risk assessment: 'It's unlikely that he'll find another load on Friday night and he'll have to risk looking for a load that picks up on the weekend depending on the dispatchers goals and objectives.'",
      "Professional exit: 'Because there was too much difference, the dispatcher decided to stop negotiating. He said openly and honestly that he wanted to look at other options.'"
    ]
  },
  {
    title: "Conversation 2 Analysis - Strategic Walking Away",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Challenge", "Dispatcher Strategy", "Broker Response", "Outcome"],
      rows: [
        ["Late Friday Delivery", "Asked for $6,000 premium", "Offered $4,500 maximum", "Recognized weekend risk"],
        ["Weekend Risk", "Explained stuck in Portland", "Understood but limited budget", "Professional explanation"],
        ["Market Position", "Knew LA-Portland demand high", "Had limited options", "Leveraged market knowledge"],
        ["Negotiation Power", "Set $5,500 minimum", "Couldn't meet minimum", "Maintained position"],
        ["Professional Exit", "Left door open for callback", "May call back with higher offer", "Strategic patience"]
      ]
    },
    trainerNotes: [
      "Strategic approach: 'In this case, the dispatcher thought it was worth it to try to get a great price and immediately asked for $6,000, stipulating that his truck would not just lose a whole day, but could get stuck for the whole weekend.'",
      "Broker limitations: 'The broker was willing to pay extra, but not at the level that the dispatcher wanted. The dispatchers minimum offer was $5,500 and the broker's maximum offer was $4,500.'",
      "Professional decision: 'Because there was too much difference, the dispatcher decided to stop negotiating. He said openly and honestly that he wanted to look at other options.'",
      "Strategic patience: 'The dispatcher may well expect a call back from the broker with a new higher offer. After all, the broker already knows that he can get that truck for his not so comfortable load.'",
      "Market knowledge: 'Knowing the Los Angeles to Portland Lane, the dispatcher knows that demand exceeds supply, while the dispatcher still has plenty of load options for the broker.'",
      "Negotiation power: 'If the broker calls back, the dispatcher is negotiating. Power will be very high.'"
    ]
  },
  {
    title: "Conversation 3: New Carrier Setup - Saint Louis to Mobile",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Load: Saint Louis, MO to Mobile, AL - flatbed",
      "Equipment: 35,000 lbs car parts, requires 4-foot tarp",
      "Timing: Pickup today anytime before 5pm, delivery tomorrow 8am-8pm",
      "Dispatcher rate: $2,500",
      "Broker concern: New carrier, needs reliable service",
      "Dispatcher strategy: Emphasize professionalism and experience",
      "Result: Broker took risk, agreed to $2,500"
    ],
    video: "https://www.youtube.com/embed/4eadmfiXNsI",
    trainerNotes: [
      "Video introduction: 'Now we'll watch the third conversation - a new carrier setup from Saint Louis to Mobile. This demonstrates how to build trust with new brokers.'",
      "Load details: 'Pick up today in Saint Louis at any time. First come, first serve before 5 p.m.. It needs to be delivered at any time tomorrow. The facility is open from 8 a.m. until 8 p.m. It's £35,000 of car parts requires at four feet tarp.'",
      "Rate proposal: 'Great. We can do that for $2,500.'",
      "Broker concern: 'That's fine. What number is 76504? Yeah. I don't think I can put you on this low. We're not set up, and I need a reliable carrier on this one. This is an important load for my customer, sir.'",
      "Professional response: 'You're looking for a reliable carrier. You got one right here. Our company is over a year old, and I can provide references of our partner brokers with whom we've been working closely for months without a single issue.'",
      "Driver credentials: 'My driver has been working with a flatbed for over ten years. He's unloaded now and ready to start moving at any time.'",
      "Trust building: 'Give me a chance on this one and you will have another reliable carrier in your contact list.'",
      "Success factor: 'In this case, the broker was convinced it doesn't happen every time, but you should definitely try. Good negotiation goes a long way.'"
    ]
  },
  {
    title: "Conversation 3 Analysis - Building Trust with New Brokers",
    layout: "table",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Broker Concern", "Dispatcher Response", "Trust Building Element", "Result"],
      rows: [
        ["New carrier risk", "Company over 1 year old", "Established business", "Credibility"],
        ["Need reliability", "References from partner brokers", "Third-party validation", "Trust"],
        ["Important customer", "10+ years driver experience", "Professional expertise", "Confidence"],
        ["Setup required", "Ready to move immediately", "Operational readiness", "Efficiency"],
        ["Risk management", "Give me a chance", "Partnership opportunity", "Agreement"]
      ]
    },
    trainerNotes: [
      "Broker pressure: 'Another typical situation. The broker has an important load on his hands, and he has no right to screw up. He's probably already had problems with this shipper, and if he makes another mistake, it could result in the loss of the customer.'",
      "Rate strategy: 'When he finished giving information about the shipment, the broker didn't name his rate, so the dispatcher took the initiative and named his desired price $2,400.'",
      "Broker priority: 'The broker for whom making money was not a priority at the moment immediately agreed it was more important for him to give the load to a responsible carrier than to make an extra couple of hundred bucks.'",
      "Database check: 'He immediately checked the number of the carrier in his database so that he hadn't worked with the company before and was about to give up.'",
      "Professional persuasion: 'The dispatcher on his part realized that this was the perfect load for him and began to emphasize the professionalism of his company, his driver and himself.'",
      "Success factor: 'In this case, the broker was convinced it doesn't happen every time, but you should definitely try. Good negotiation goes a long way.'"
    ]
  },
  {
    title: "Key Negotiation Strategies - What Works",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Know your market rates before calling",
      "Start higher than your target rate",
      "Use broker's own data to reinforce your position",
      "Explain the reasoning behind your rate requests",
      "Be prepared to walk away if the gap is too large",
      "Emphasize professionalism and reliability for new relationships",
      "Leave the door open for future negotiations",
      "Always maintain professional courtesy"
    ],
    trainerNotes: [
      "Market knowledge: 'He knew that the market price was somewhere around 1300 to $1500.'",
      "Strategic positioning: 'The dispatcher started at 1600.'",
      "Data reinforcement: 'Early in the conversation, the broker reinforced his position by saying that he had already sold several of the same loads for 1200.'",
      "Reasoning explanation: 'The rate you're offering for this load is absolutely fine. But the delivery is late at night on Friday. You know that I will not be able to find another load so late and might get stuck in Portland for the whole weekend.'",
      "Professional walking away: 'All right. No problem. I think I will pass on this one and explore other options. I will give you another call later if it's meant to be.'",
      "Trust building: 'Give me a chance on this one and you will have another reliable carrier in your contact list.'"
    ]
  },
  {
    title: "Common Negotiation Mistakes to Avoid",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Mistake", "Impact", "Better Approach", "Result"],
      rows: [
        ["Accepting first offer", "Leaves money on table", "Always counter-negotiate", "Higher rates"],
        ["Not knowing market rates", "Weak negotiating position", "Research before calling", "Confident negotiations"],
        ["Being too aggressive", "Damages relationships", "Professional persistence", "Long-term partnerships"],
        ["Not explaining reasoning", "Broker doesn't understand", "Explain your position", "Better understanding"],
        ["Burning bridges", "Lost future opportunities", "Leave door open", "Future callbacks"]
      ]
    },
    trainerNotes: [
      "Persistence vs. aggression: 'However, that didn't stop the dispatcher. He knew that the market price was somewhere around 1300 to $1500.'",
      "Professional explanation: 'The rate you're offering for this load is absolutely fine. But the delivery is late at night on Friday.'",
      "Strategic patience: 'The dispatcher may well expect a call back from the broker with a new higher offer.'",
      "Relationship building: 'Give me a chance on this one and you will have another reliable carrier in your contact list.'",
      "Professional courtesy: 'Sounds good, man. Have a good day.'",
      "Long-term thinking: 'Good negotiation goes a long way.'"
    ]
  },
  {
    title: "Advanced Negotiation Techniques",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Use load posting numbers for credibility and efficiency",
      "Ask for zip codes to verify actual pickup locations",
      "Calculate real distances using Google Maps",
      "Identify timing issues that affect driver productivity",
      "Explain weekend risks and lost opportunity costs",
      "Emphasize driver experience and equipment readiness",
      "Provide references from other broker partnerships",
      "Know when to stop and when to continue negotiating"
    ],
    trainerNotes: [
      "Load identification: 'The first thing the broker asked was a load posting number at the big brokerage companies. All the loads posted are assigned a unique number that makes it easier for them to find the load in their system.'",
      "Location verification: 'This number, if available, can be found in the post information on the load board. The load was posted as Los Angeles to Portland, but when the broker started giving the information, he said that the pickup city was Riverside, California.'",
      "Distance calculation: 'All the dispatcher has to do is ask for the zip code of the city and type it into Google Maps, then quickly calculate the correct number of miles.'",
      "Timing analysis: 'Going forward. So Riverside to Portland, distance is about 1000 miles. As we already know, this is the ideal distance for a two day load.'",
      "Risk assessment: 'It's unlikely that he'll find another load on Friday night and he'll have to risk looking for a load that picks up on the weekend.'",
      "Professional decision: 'A professional and informed decision on the part of the dispatcher.'"
    ]
  },
  {
    title: "Knowledge Check",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    quiz: {
      questions: [
        "What are the key elements of successful rate negotiation?",
        "How should you handle a broker who offers a rate significantly below market?",
        "What information should you gather before calling a broker about a load?",
        "When is it appropriate to walk away from a negotiation?",
        "How can you build trust with a new broker who is hesitant to work with you?"
      ],
      answers: [
        "Know market rates, start higher than target, explain reasoning, use broker's data, be professional, know when to walk away",
        "Explain your market knowledge, provide reasoning for higher rate, be prepared to walk away if gap is too large, leave door open for future negotiations",
        "Load posting number, actual pickup location (zip code), real distance, timing constraints, market rates, driver availability and experience",
        "When the gap between your minimum and broker's maximum is too large, when the load doesn't fit your operational needs, or when the broker is unreasonable",
        "Emphasize company experience, provide references from other brokers, highlight driver qualifications, demonstrate operational readiness, offer to start with smaller loads"
      ]
    },
    trainerNotes: [
      "Question 1: Review the successful negotiation elements from all three conversations.",
      "Question 2: Use the LA-Portland example where dispatcher walked away professionally.",
      "Question 3: Reference the importance of load posting numbers and zip code verification.",
      "Question 4: Emphasize the strategic value of walking away when conditions aren't right.",
      "Question 5: Use the Saint Louis-Mobile example of building trust with new brokers."
    ]
  },
  {
    title: "Section Materials",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "Three real-world negotiation conversation videos with analysis",
      "Standard load negotiation: Atlanta to Louisville",
      "Complex load negotiation: Los Angeles to Portland",
      "New broker relationship: Saint Louis to Mobile",
      "Key negotiation strategies and techniques",
      "Common mistakes to avoid and better approaches",
      "Advanced techniques for professional dispatchers"
    ],
    trainerNotes: [
      "Learning foundation: 'If there was a test book for dispatchers, this conversation would be in it.'",
      "Professional standard: 'Great simple negotiation.'",
      "Strategic thinking: 'A professional and informed decision on the part of the dispatcher.'",
      "Market knowledge: 'Knowing the Los Angeles to Portland Lane, the dispatcher knows that demand exceeds supply, while the dispatcher still has plenty of load options for the broker.'",
      "Negotiation power: 'If the broker calls back, the dispatcher is negotiating. Power will be very high.'",
      "Long-term success: 'Good negotiation goes a long way.'"
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
export default function LoadisticsSection27({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={27}
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

                {/* Video Display */}
                {slide.video && (
                  <div className="mt-6">
                    <div className="text-sm font-semibold mb-3 text-gray-700">Video Demonstration</div>
                    <div className="relative w-full max-w-4xl mx-auto" style={{ paddingBottom: "56.25%", height: 0 }}>
                      <iframe
                        src={slide.video}
                        className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                        style={{ border: "none" }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Negotiation Video Demonstration"
                      />
                    </div>
                  </div>
                )}

                {/* Section Navigation - show on first and last slides */}
                {(slideIndex === 0 || slide.isMaterialsSlide) && onNavigateToSection && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl border">
                    <div className="text-sm font-semibold mb-3">Section Navigation</div>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => onNavigateToSection(26)} 
                        disabled={27 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 26)
                      </Button>
                      <Button 
                        onClick={() => onNavigateToSection("quiz-break-4")} 
                        className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      >
                        🎯 Quiz Break #4 →
                      </Button>
                      <Button onClick={() => onNavigateToSection(28)} className="rounded-xl">
                        Next Section (Section 28) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 27</div>
    </div>
  );
}
