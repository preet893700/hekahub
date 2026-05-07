"use client";

import { Brain, Smile, MessageSquare, LayoutList, Shield, BookOpen, User, Lightbulb } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Wk1: Talk to AI",
    date: "Week 1",
    content: "You're the author. AI is your pen. Learn how the right words unlock powerful answers.",
    category: "Basics",
    icon: Brain,
    relatedIds: [],
    status: "completed" as const,
    energy: 20,
    keyConcepts: [
      { term: "Prompt Engineering", definition: "Crafting inputs that reliably guide AI to produce the desired output." },
      { term: "Input → Output", definition: "The fundamental loop: you provide a prompt, AI returns a completion." },
      { term: "Dynamic Prompts", definition: "Prompts built from user inputs so the AI response changes each time." },
    ],
  },
  {
    id: 2,
    title: "Wk2: AI Feels the Vibe",
    date: "Week 2",
    content: "Words carry emotion. AI can read it. Learn how machines detect mood and tone.",
    category: "Sentiment",
    icon: Smile,
    relatedIds: [1],
    status: "completed" as const,
    energy: 35,
    keyConcepts: [
      { term: "Sentiment Analysis", definition: "AI identifying whether text carries positive, negative, or neutral emotion." },
      { term: "Tone Classification", definition: "Detecting stylistic register (formal, sarcastic, warm) from language patterns." },
      { term: "Conditional Rewriting", definition: "Instructing AI to transform text while preserving meaning but shifting tone." },
    ],
  },
  {
    id: 3,
    title: "Wk3: AI Remembers You",
    date: "Week 3",
    content: "What if AI remembered everything you told it? This week you teach AI to hold a personality.",
    category: "Memory",
    icon: MessageSquare,
    relatedIds: [1],
    status: "in-progress" as const,
    energy: 35,
    keyConcepts: [
      { term: "System Prompts", definition: "Hidden instructions that set the AI's persona, rules, and behavior before any user message." },
      { term: "Conversation Context", definition: "Passing prior messages back to the AI so it can reference earlier parts of the chat." },
      { term: "Stateful Chat", definition: "Maintaining the full conversation history so responses build on what came before." },
    ],
  },
  {
    id: 4,
    title: "Wk4: The Brain Organiser",
    date: "Week 4",
    content: "Chaos → clarity. AI doesn't just talk — it thinks in structure.",
    category: "Structure",
    icon: LayoutList,
    relatedIds: [2, 3],
    status: "pending" as const,
    energy: 55,
    keyConcepts: [
      { term: "Structured Output", definition: "Prompting AI to return data in a predictable format (JSON, tables, numbered lists)." },
      { term: "JSON Parsing", definition: "Reading and displaying AI-generated structured data inside the app's UI." },
      { term: "Conditional Logic", definition: "Using user inputs (mode, dates, hours) to shape what the AI is asked to produce." },
    ],
  },
  {
    id: 5,
    title: "Wk5: Lie Detector Mode",
    date: "Week 5",
    content: "Real or fake? Safe or shady? Train AI to judge, classify, and explain its verdict.",
    category: "Classification",
    icon: Shield,
    relatedIds: [4],
    status: "pending" as const,
    energy: 65,
    keyConcepts: [
      { term: "Classification", definition: "AI assigning inputs to predefined categories (real/fake, safe/spam) based on patterns." },
      { term: "Confidence Scoring", definition: "AI expressing how certain it is about a classification, usually as a percentage." },
      { term: "Chain-of-Thought", definition: "Prompting AI to explain its reasoning step by step before giving a final answer." },
    ],
  },
  {
    id: 6,
    title: "Wk6: Born to Storytell",
    date: "Week 6",
    content: "Every hero needs a villain. Every story needs a twist. This week AI becomes your co-author.",
    category: "Creativity",
    icon: BookOpen,
    relatedIds: [1, 5],
    status: "pending" as const,
    energy: 70,
    keyConcepts: [
      { term: "Creative Generation", definition: "Prompting AI to produce original narrative content rather than retrieve facts." },
      { term: "Style Conditioning", definition: "Using genre or tone parameters to steer creative output in a consistent direction." },
      { term: "Multimodal Output", definition: "Combining text generation with image generation to produce richer media." },
    ],
  },
  {
    id: 7,
    title: "Wk7: Your Story, Your Stage",
    date: "Week 7",
    content: "You've done incredible things. Now let AI say it beautifully. Build a bio and resume the world can actually see.",
    category: "Publishing",
    icon: User,
    relatedIds: [4, 6],
    status: "pending" as const,
    energy: 75,
    keyConcepts: [
      { term: "Persona Generation", definition: "Using personal data to have AI craft a coherent professional identity narrative." },
      { term: "Multi-format Output", definition: "Generating the same content repurposed into different layouts (bio, resume, fun facts)." },
      { term: "Publishing & Sharing", definition: "Deploying AI-generated content to the web for others to view." },
    ],
  },
  {
    id: 8,
    title: "Wk8: Think Like Founders",
    date: "Week 8",
    content: "Notice a problem. AI helps you name it, pitch it, price it, and present it like a founder.",
    category: "Capstone",
    icon: Lightbulb,
    relatedIds: [6, 7],
    status: "pending" as const,
    energy: 85,
    keyConcepts: [
      { term: "Problem Framing", definition: "Using a real-world observation as the seed prompt for AI to build structured business ideas." },
      { term: "Structured Idea Gen", definition: "AI producing multi-section output (name, model, risks) from a single open-ended input." },
      { term: "End-to-End Workflow", definition: "Combining prompting, structured output, and polished UI — all skills from prior weeks." },
    ],
  },
];

export function RadialOrbitalTimelineDemo() {
  return (
    <div className="w-full flex justify-center bg-[#0a0a0a]">
      <RadialOrbitalTimeline timelineData={timelineData} />
    </div>
  );
}

export default RadialOrbitalTimelineDemo;
