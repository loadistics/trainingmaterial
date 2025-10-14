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
    sectionLabel: "Section 31",
    title: "Principles of Problem Solving",
    layout: "title",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    trainerNotes: [
      "Welcome to Section 31 - Principles of Problem Solving. This is your last module related to professional dispatching skills.",
      "You are at the finish line! There is one last push before we move on to monetizing your knowledge.",
      "This module will free you from stress and help you find the best way out of difficult situations at work.",
      "We'll break down complex problems into manageable processes with clear, step-by-step solutions."
    ]
  },
  {
    title: "Why Problem Solving Matters",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "**Professional problem solving** involves two key processes: creativity and decisiveness",
      "**Creativity** - generating options and possible solutions",
      "**Decisiveness** - choosing the best solution from available options",
      "Essential skill for any successful dispatcher and business professional",
      "Prevents panic when facing rare or complex problems"
    ],
    trainerNotes: [
      "Opening statement: 'Problem solving is one of the greatest skills not only for a dispatcher but for any successful business.'",
      "Explain the two-part process: 'Professional problem solving involves two very different, perhaps even contradictory thought processes - creativity and decisiveness.'",
      "Break down each part: 'The first part creativity is about generating options and possible solutions. And the second part decisiveness is about choosing the best one.'",
      "Emphasize the practical benefit: 'Even when faced with a rare problem, a dispatcher doesn't begin to panic. He or she acts according to a familiar set of practices and easily finds a way out of any situation.'"
    ]
  },
  {
    title: "Three-Step Problem Solving Process",
    layout: "table",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Step", "Description", "Key Focus"],
      rows: [
        ["Step 1", "Identifying the real issue", "Get to the root cause using Five Whys technique"],
        ["Step 2", "Generating possible solutions", "Use brainstorming, mind maps, and decision trees"],
        ["Step 3", "Selecting and implementing optimal solution", "Evaluate with five key questions"]
      ]
    },
    trainerNotes: [
      "Introduce the framework: 'We will now break down the problem solving process into three key steps.'",
      "Step 1 explanation: 'This step, which is often overlooked, revolves around the idea that you have to correctly identify the causes of any problem.'",
      "Step 2 explanation: 'The most well known and effective process of generating ideas is brainstorming.'",
      "Step 3 explanation: 'Selecting the right solution is obviously a key step in solving any problem.'",
      "Emphasize the systematic approach: 'With this approach, even when faced with a rare problem, a dispatcher doesn't begin to panic.'"
    ]
  },
  {
    title: "Step 1: Identifying the Real Issue - The Process",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "**Step 1A**: Recognize that problems often have surface symptoms vs. root causes",
      "**Step 1B**: Resist the temptation to fix only what's immediately visible",
      "**Step 1C**: Use systematic questioning to dig deeper into underlying issues",
      "**Step 1D**: Apply the Five Whys technique to reach the core problem",
      "**Step 1E**: Document the real cause to prevent future recurrence"
    ],
    trainerNotes: [
      "Explain the importance: 'This step, which is often overlooked, revolves around the idea that you have to correctly identify the causes of any problem.'",
      "Highlight the complexity: 'Sometimes the cause of the problem can be much more complex than what's visible on the surface, and you need to get to the root of it.'",
      "Emphasize the systematic approach: 'The key is to resist the natural tendency to fix surface symptoms and instead dig deeper to find the real underlying cause.'",
      "Connect to practical application: 'This systematic approach prevents problems from recurring because you're addressing the actual source, not just the symptoms.'",
      "Set up the Five Whys: 'There is a technique for this known as the Five Whys that we'll explore next.'"
    ]
  },
  {
    title: "Step 1: The Five Whys Technique",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "**Purpose**: Get to the real root cause of problems",
      "**Method**: Ask 'why' up to five times until you reach the core issue",
      "**Problem**: Surface symptoms often hide deeper underlying causes",
      "**Solution**: Dig deeper to prevent recurring problems"
    ],
    trainerNotes: [
      "Introduce the concept: 'There is a technique for this known as the Five Whys. The idea is that you ask the question why up to five times until you get to the real root of the problem.'",
      "Explain why it's needed: 'Sometimes the cause of the problem can be much more complex than what's visible on the surface, and you need to get to the root of it.'",
      "Set up the example: 'Here's an example from a recent recording I listened to of a conversation between one of my dispatchers and his driver.'",
      "Transition to the story: 'The driver didn't arrive in time to pick up a load at 6 a.m. and didn't answer his phone until lunchtime.'"
    ]
  },
  {
    title: "Five Whys Example: Driver No-Show",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Why Question", "Driver's Response", "Deeper Issue Revealed"],
      rows: [
        ["Why didn't you come to pickup?", "Had stomach problems, sitting on toilet", "Surface symptom - illness"],
        ["Why didn't you pick up the phone?", "I'm sick of this, can't miss pickup once", "Frustration and stress"],
        ["Why are you so frustrated?", "Been driving 3 months straight, sleep in truck", "Burnout and isolation"],
        ["Why don't you go home?", "Need quarterly bonus for daughter's private school", "Financial pressure"],
        ["Why is money so critical?", "Daughter Juanita's education depends on it", "Root cause: Family financial need"]
      ]
    },
    trainerNotes: [
      "Walk through each 'why' question: 'So the dispatcher picks up the phone and goes, Alejandro, I'm not calling you to scold you. Let's just have a chat. Tell me, why didn't you come to the pickup?'",
      "First response: 'The driver responds, Everything is fine. No one will die because I didn't pick up a load. I had stomach problems and I've been sitting on the toilet all day long.'",
      "Second why: 'The dispatcher goes, No problem. I'll solve the issue with the broker. But I'm worried about you. Tell me, why didn't you pick up the phone?'",
      "Third why: 'The dispatcher answers. Okay, but why? I feel there is more to it. Talk to me.'",
      "Fourth why: 'The dispatcher answers, Okay, why don't you finish this load and then go home?'",
      "Reveal the solution: 'So at this point, the dispatcher, having already understood the essence of the problem, says, okay, let me talk to the boss.'"
    ]
  },
  {
    title: "The Five Whys in Action",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    image: {
      src: "/training-material/section31/images/fivewhys.png",
      alt: "Five Whys Method - ask the question 'why' up to five times to get to the real root of the problem",
      caption: "The Five Whys Method - A systematic approach to root cause analysis"
    },
    bullets: [
      "**Surface Problem**: Driver missed pickup due to stomach issues",
      "**Real Problem**: Driver is burned out from 3 months of non-stop work",
      "**Root Cause**: Financial pressure for daughter's private school tuition",
      "**Solution**: Owner provided paid time off and paid the quarterly bonus anyway",
      "**Result**: Problem solved permanently, not just temporarily"
    ],
    trainerNotes: [
      "Show the Five Whys image: 'Here's what the Five Whys method looks like visually.'",
      "Analyze the conversation: 'I don't know if you noticed, but during this conversation the dispatcher asked the question why four times and only then understood how to solve the problem.'",
      "Contrast with bad management: 'A bad manager finds it easier to fix a problem superficially rather than digging deeper and finding out if it's something more serious.'",
      "Emphasize the importance: 'But in order to solve a problem, you need to get to its root, because otherwise it will keep happening again and again.'",
      "Explain the outcome: 'The dispatcher call the owner of the company. And made it clear that the driver was burned out and he urgently needed a vacation. Then the owner or the CEO of the company gave the driver some paid time off and decided to pay him the bonus he deserved.'"
    ]
  },
  {
    title: "The 80/20 Principle (Pareto Principle)",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    image: {
      src: "/training-material/section31/images/pareto-principle.png",
      alt: "Pareto Principle visualization showing 80/20 distribution",
      caption: "The Pareto Principle - 80% of effects come from 20% of causes"
    },
    bullets: [
      "**Vilfredo Pareto** observed that 80% of land in Italy belonged to 20% of people",
      "**Logistics Application**: 80% of dispatch time is used to load 20% of trucks",
      "**Problem Solving**: 80% of problems come from 20% of underlying causes",
      "**Focus Strategy**: Fix 20% of problems to save 80% of time and money",
      "**Best Use**: Apply to complex, recurring problems rather than one-time issues"
    ],
    trainerNotes: [
      "Show the Pareto Principle image: 'Here's what the 80/20 principle looks like visually.'",
      "Introduce Pareto: 'A big name in the world of problem solving experts is Vilfredo Pareto. I believe many of you have heard about the 80 over 20 principle, also known as the Pareto Principle.'",
      "Explain the origin: 'Which began with the observation that 80% of the land in Italy belonged to 20% of the people.'",
      "Apply to logistics: 'This 8020 rule also applies to the logistics industry. For example, according to statistics, 80% of time spent working dispatch is used to load 20% of their truck.'",
      "Connect to problem solving: 'And 80% of all your problems will usually come from 20% of underlying reasons. In other words, there are only a few underlying causes that create most of your problems.'",
      "Explain the strategy: 'If you focus on fixing just 20% of your problems, you will save 80% of the cost and 80% of your time and money.'"
    ]
  },
  {
    title: "Using Pareto Principle for Issue Identification",
    layout: "bullets",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "**Step 1**: List all problems you're experiencing in your dispatch operations",
      "**Step 2**: Categorize problems by frequency (how often they occur)",
      "**Step 3**: Identify the 20% of problems that cause 80% of your headaches",
      "**Step 4**: Focus your Five Whys analysis on these high-impact problems first",
      "**Step 5**: Apply solutions to the root causes of these critical issues"
    ],
    trainerNotes: [
      "Explain the application: 'The Pareto Principle is especially useful when you have multiple problems and need to prioritize which ones to tackle first.'",
      "Walk through the process: 'Start by making a comprehensive list of all the problems you're experiencing in your dispatch operations.'",
      "Explain categorization: 'Then categorize these problems by how frequently they occur and how much time or money they cost you.'",
      "Focus on the critical few: 'You'll likely find that about 20% of your problems are causing 80% of your stress and inefficiency.'",
      "Prioritize analysis: 'Use the Five Whys technique on these high-impact problems first, as solving them will give you the biggest return on your time investment.'",
      "Connect to practical results: 'This approach ensures you're not wasting time on minor issues while major problems continue to drain your resources.'"
    ]
  },
  {
    title: "Pareto Principle Real Example",
    layout: "table",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    table: {
      headers: ["Client Analysis", "Income Contribution", "Time Investment", "Action Taken"],
      rows: [
        ["Top 3 Clients", "80% of total income", "Minimum time required", "Kept and focused on"],
        ["Problematic Clients", "Very little income", "Maximum time spent", "Dropped these clients"],
        ["Result", "More time for training", "Better income efficiency", "Started dispatching company"]
      ]
    },
    trainerNotes: [
      "Share personal experience: 'For example, when I was an independent dispatcher, at some point I had too much work and realized that I could no longer cope. Because of this, the quality of my work began to suffer and I began to make mistakes.'",
      "Analyze the situation: 'I analyzed my earnings over the past months and realized that out of all my clients, I had three who brought me the majority of my income and I spent a minimum amount of time loading them.'",
      "Identify the problem clients: 'Also, I found out that I had some clients whom I spent a lot of time loading but earned very little from them. They constantly refused all my loads and I spent my whole day trying to find a load that will satisfy their needs.'",
      "Explain the financial impact: 'As a result, they end up taking their own loads and I don't charge them for that, so I don't get paid.'",
      "Describe the solution: 'Having carefully thought about everything, I dropped some of my clients and began to devote my free time to training. One of my good friends who eventually became a key player in starting my dispatching company.'"
    ]
  },
  {
    title: "Step 2: Brainstorming - The Foundation",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    image: {
      src: "/training-material/section31/images/brainstorm.png",
      alt: "Brainstorming concept with lightbulb, multiple hands pointing, and idea generation elements",
      caption: "Brainstorming - Generate maximum ideas without immediate evaluation"
    },
    bullets: [
      "**Goal**: Generate maximum number of ideas for solving the problem",
      "**Include**: Wild and crazy ideas - no judgment during generation phase",
      "**Process**: Write down ALL ideas first, then evaluate later",
      "**Avoid**: Evaluating ideas as they emerge - resist this temptation",
      "**Why it works**: Brain automatically jumps from bad ideas to good ones"
    ],
    trainerNotes: [
      "Show the brainstorming image: 'This is what effective brainstorming looks like.'",
      "Define the method: 'The method of brainstorming is basically just generating a maximum number of ideas for solving the problem, including the most wild and crazy ideas you may have.'",
      "Emphasize effectiveness: 'One thing I can say about brainstorming sessions is that they are extremely effective for both a team and for a sole professional.'",
      "Warn about common mistakes: 'But most people conduct brainstorming sessions incorrectly instead of writing down a big list of ideas As they emerge, people begin to evaluate and pick at every idea that is thrown into the list.'",
      "Explain the correct way: 'The correct way to do it is to create a list and then move on to evaluate every idea. It's just human nature to evaluate every idea as it comes up. But it's key to resist this temptation.'",
      "Explain why it works: 'The reason this works is because our brains are set to automatically jump from a stupid idea to an ingenious one by elimination.'"
    ]
  },
  {
    title: "Mind Maps - Visual Problem Solving",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    image: {
      src: "/training-material/section31/images/mindmap.png",
      alt: "Mind map template with central topic, subtopics, and related ideas branching out",
      caption: "Mind Maps - Visual representation of interconnected ideas and solutions"
    },
    bullets: [
      "**Advantage**: Natural to human brain - reflects how we actually think",
      "**Visual**: Makes problems visual and easier to understand",
      "**Brain Integration**: Involves both left and right sides of the brain",
      "**Flexible**: Quick to draw, add elements in any order as they come to mind",
      "**Expandable**: Always room for additional bubbles as you expand outward"
    ],
    trainerNotes: [
      "Show the mind map image: 'This is what a mind map looks like.'",
      "Explain the natural appeal: 'The second tool that I always go through with my coworkers is called Mind Maps. There is something about them that seems natural to the human brain and they help me think.'",
      "Compare to lists: 'They work much better than regular lists.'",
      "Explain the benefits: 'And the best thing about them is that they actually reflect the way we think. They make a problem visual. They involve both the left and the right side of the brain.'",
      "Highlight flexibility: 'They are quick to draw and you can add any elements in any order as soon as they come to mind.'",
      "Explain expandability: 'Also, because the diagram starts in the Middle. As you expand it, there's always room for additional bubbles.'",
      "Recommend hand-drawing: 'There are special applications and programs that help you draw a mind map, but I would recommend you to simply do it by hand on paper.'"
    ]
  },
  {
    title: "Decision Trees - Sequential Analysis",
    layout: "bullets",
    icon: <Icon.ListChecks className="w-12 h-12" style={{ color: brand.red }} />,
    image: {
      src: "/training-material/section31/images/decisiontree.png",
      alt: "Decision Tree diagram showing root node, decision nodes, and leaf nodes with branching structure",
      caption: "Decision Tree Structure - Visualizing sequential choices and outcomes"
    },
    bullets: [
      "**Purpose**: Analyze sequences of possible events and outcomes",
      "**Structure**: Contains time axis unlike mind maps - shows sequential decision flow",
      "**Components**: Root Node (starting point) → Decision Nodes (choices) → Leaf Nodes (final outcomes)",
      "**Analogy**: Like unfolding a chess game - each move leads to new possibilities",
      "**Application**: Perfect when you have multiple solutions but can't decide which is best",
      "**Real Use**: Some dispatchers use this for driver route planning and load selection"
    ],
    trainerNotes: [
      "Show the Decision Tree image: 'Here's what a decision tree looks like visually - you can see the hierarchical structure with nodes and branches.'",
      "Introduce decision trees: 'A step further from the mind map is a decision tree.'",
      "Explain the key difference: 'The essence of a decision tree is that it contains a time axis. Unlike mind maps, decision, trees represent a sequence of possible events like the unfolding of a chess game.'",
      "Point out components: 'Looking at the diagram, you can see the Root Node at the top - this is your starting point. Then you have Decision Nodes in the middle where you make choices, and finally Leaf Nodes at the bottom which are your final outcomes.'",
      "Use chess analogy: 'If we do one action, move one piece, then three possible scenarios can happen in the first scenario happens. Then we can do either A or B, and if we choose option A, the two more options can occur and so on. It all grows into a big tree.'",
      "Explain when to use: 'This tool is especially effective when you have multiple possible solutions to a problem, but you can't decide which one will lead to the best result.'",
      "Share practical application: 'Some dispatchers in my company even use this method when they plan the route of their drivers. I highly recommend giving it a try.'",
      "Emphasize effectiveness: 'Believe me, I'm not just talking about these tools for the sake of appearing clever or giving you extra homework. There is a direct correlation between the incorporation of these tools into the workflow and the effectiveness of problem solving.'"
    ]
  },
  {
    title: "Decision Tree Success Story",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "**Scenario**: Dispatcher comes to office saying 'I have a problem. I don't know what to do.'",
      "**Response**: 'Go make a decision tree and then come back and we can discuss it.'",
      "**Result**: Dispatcher never comes back - finds the solution himself",
      "**Lesson**: The process of creating the tree often reveals the answer",
      "**Application**: Use decision trees for complex routing and scheduling problems"
    ],
    trainerNotes: [
      "Share the real story: 'Here is a real life scenario for you. A dispatcher comes to my office and says, I have a problem. I don't know what to do.'",
      "Explain the response: 'I haven't even heard of his problem yet. I just say, Go make a decision tree and then come back and we can discuss it.'",
      "Reveal the outcome: 'Guess what? The dispatcher never comes back. He finds the solution himself.'",
      "Explain why it works: 'The process of creating the decision tree forces you to think through all the possible outcomes and consequences of each choice.'",
      "Encourage practical use: 'At work, it's impossible for everything to go according to plan. And in order to be good at your job, you need to be able to solve problems effectively.'",
      "Transition to final step: 'Moving on to the third stage, selecting and implementing the optimal solution.'"
    ]
  },
  {
    title: "Step 3: Five Key Questions for Decision Making",
    layout: "table",
    icon: <Icon.Users className="w-12 h-12" style={{ color: brand.red }} />,
    image: {
      src: "/training-material/section31/images/5-key-question-method.png",
      alt: "5 Key Question Method showing the four main questions for decision making",
      caption: "The 5 Key Question Method - A systematic approach to evaluating solutions"
    },
    table: {
      headers: ["Question", "Purpose", "Example Application"],
      rows: [
        ["Will my decision satisfy all parties?", "Check stakeholder impact", "Broker relationship preservation"],
        ["Can it be implemented in acceptable time?", "Feasibility assessment", "Pickup deadline considerations"],
        ["Is it cost-effective and realistic?", "Financial viability", "Rate vs. cost analysis"],
        ["Is result comparable to risks?", "Risk-benefit analysis", "Cancellation consequences"],
        ["Does it align with professional ethics?", "Moral compass check", "Industry standards compliance"]
      ]
    },
    trainerNotes: [
      "Show the 5 Key Question Method image: 'Here's the visual representation of the Five Key Question Method that we use for decision making.'",
      "Introduce the final step: 'Selecting the right solution is obviously a key step in solving any problem. For this stage, unfortunately, there are no magical tools.'",
      "Explain the process: 'The whole idea is that previous two stages, given that they performed well, will lead you to a well balanced solution to get the desired result.'",
      "Introduce the five questions: 'The only thing I can suggest at this stage is to go over your final decision with the five key questions. As you can see in the image, there are four main questions shown, plus a fifth one we'll discuss.'",
      "Reference the image: 'Looking at the image, you can see the four key questions that form the foundation of this method. These questions act as a systematic filter to ensure your solution is optimal.'",
      "Set up the example: 'For example, let's imagine I decided to cancel a newly booked load because I unexpectedly received a call from a different broker who offered a better paying load.'",
      "Explain the methodology: 'Before taking this decision, I'll check myself by asking these questions, using the framework shown in the image.'"
    ]
  },
  {
    title: "Five Questions Example: Load Cancellation Decision",
    layout: "bullets",
    icon: <Icon.Truck className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "**Question 1**: Will my decision satisfy all parties involved? → Broker won't be happy, but plenty of time to find replacement",
      "**Question 2**: Can it be implemented in acceptable time? → Yes, load just booked, can cancel immediately",
      "**Question 3**: Is it cost-effective and realistic? → Yes, higher rate means more money for company and commission",
      "**Question 4**: Is result comparable to risks? → Minimal risk since load just booked, broker has time to find alternative",
      "**Question 5**: Does it align with professional ethics? → Acceptable within first 30 minutes, unprofessional if last-minute"
    ],
    trainerNotes: [
      "Reference the previous slide: 'Now let's apply the Five Key Question Method we just saw in the image to our load cancellation example.'",
      "Walk through each question with the load cancellation example:",
      "Question 1: 'First one, will my decision satisfy all parties involved in the conflict? Well, in principle, yes. The broker with whom I canceled the shipment certainly will not be happy. But since I just booked it, there's still plenty of time before the load needs to be picked up.'",
      "Question 2: 'Number two, can it be implemented within an acceptable time frame? Well, yes, I can do it right now because I just booked the load.'",
      "Question 3: 'Number three, is it cost effective, reliable and realistic? Well, yes, because I will earn more money for my company and a higher commission for myself.'",
      "Question 4: 'Next one is the result comparable to the possible risks? I believe so. The only serious risk I identified was that the broker could possibly get mad at me.'",
      "Question 5: 'And finally, is the decision comparable to the principles of my professional ethics? Well, I do not support dispatchers and brokers who cancel loads at the last moment.'",
      "Conclude: 'There you go. I've double checked my decision with the five key questions methodology. I discarded all possible doubts and I'm ready to confidently proceed to implementation.'",
      "Emphasize the systematic approach: 'This example shows how the visual framework from the previous slide guides you through a logical decision-making process.'"
    ]
  },
  {
    title: "Knowledge Check - Problem Solving Principles",
    layout: "bullets",
    icon: <Icon.CheckCircle className="w-12 h-12" style={{ color: brand.red }} />,
    quiz: {
      questions: [
        "What are the two key thought processes involved in professional problem solving?",
        "What are the five steps in identifying the real issue (Step 1A through 1E)?",
        "How many times should you ask 'why' to get to the root cause of a problem?",
        "According to the Pareto Principle, what percentage of problems come from what percentage of causes?",
        "What is the key rule to remember when conducting a brainstorming session?",
        "What are the five key questions to ask before implementing a solution?"
      ],
      answers: [
        "Creativity (generating options) and decisiveness (choosing the best solution)",
        "1A: Recognize surface vs root causes, 1B: Resist fixing only visible issues, 1C: Use systematic questioning, 1D: Apply Five Whys technique, 1E: Document real cause",
        "Up to five times - the Five Whys technique helps identify root causes",
        "80% of problems come from 20% of underlying causes",
        "Write down ALL ideas first without evaluating them, then evaluate later",
        "Will it satisfy all parties? Can it be implemented in time? Is it cost-effective? Is result worth the risks? Does it align with ethics?"
      ]
    },
    trainerNotes: [
      "Ask each question and get volunteer answers before revealing model answers.",
      "Emphasize practical application: 'These principles aren't just theory - they're tools you'll use daily as dispatchers.'",
      "Encourage discussion: 'Let's discuss how you might apply these techniques in real dispatch scenarios.'",
      "Connect to next section: 'In the next lesson, we'll focus on real examples and practical applications of these principles.'"
    ]
  },
  {
    title: "Section Summary & Next Steps",
    layout: "bullets",
    icon: <Icon.BookOpen className="w-12 h-12" style={{ color: brand.red }} />,
    bullets: [
      "**Theory Complete**: You now understand the systematic approach to problem solving",
      "**Three-Step Process**: Identify real issue → Generate solutions → Select and implement optimal solution",
      "**Tools Mastered**: Five Whys, Pareto Principle, Brainstorming, Mind Maps, Decision Trees, Five Questions",
      "**Next Section**: Real-world examples and practical applications",
      "**Your Journey**: You're at the finish line of professional dispatching skills!"
    ],
    trainerNotes: [
      "Summarize the learning: 'I hope I didn't torture you too much with the theory. It's important to me that you understand these basics so that your brain begins to think in the right direction.'",
      "Emphasize the completion: 'You are at the finish line! Very soon you will be applying for jobs or looking for customers, selling your professional services and earning well deserved income with your newly acquired skills.'",
      "Encourage continued learning: 'I recommend not to take a long break and immediately proceed to the next lesson so that practical knowledge from lesson two is combined with the theory of lesson one.'",
      "Build excitement: 'I'm excited for you. You've learned systematic problem solving that will free you from stress and help you find the best way out of difficult situations at work.'",
      "Navigation cue: 'Use the navigation box to proceed to Section 32 for practical examples, or go back to review any previous sections.'"
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
export default function LoadisticsSection31({ onNavigateToSection, sectionDropdown }) {
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
                    sectionNumber={31}
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

                {/* Image Display */}
                {slide.image && (
                  <div className="mt-6">
                    <div className="text-center">
                      <div className="border border-gray-200 rounded-xl overflow-hidden mb-3">
                        <img
                          src={slide.image.src}
                          alt={slide.image.alt}
                          className="w-full h-auto max-h-96 object-contain cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(slide.image.src, '_blank')}
                        />
                      </div>
                      {slide.image.caption && (
                        <p className="text-sm text-gray-600 italic">{slide.image.caption}</p>
                      )}
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
                        onClick={() => onNavigateToSection(30)} 
                        disabled={31 === 1}
                        className="rounded-xl"
                      >
                        ← Previous Section (Section 30)
                      </Button>
                      <Button onClick={() => onNavigateToSection(32)} className="rounded-xl">
                        Next Section (Section 32) →
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

      <div className="p-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} Loadistics LLC — Section 31</div>
    </div>
  );
}
