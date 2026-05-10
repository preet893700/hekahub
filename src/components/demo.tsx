"use client";

import { Brain, Smile, MessageSquare, LayoutList, Shield, BookOpen, User, Lightbulb } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Mod 1: AI Foundations",
    date: "Module 1",
    content: "Master the art of prompting. Learn how the right language architecture unlocks professional-grade AI answers.",
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
    title: "Mod 2: Sentiment Dynamics",
    date: "Module 2",
    content: "Analyze the emotional intelligence of AI. Learn how machines detect nuanced mood, tone, and intent.",
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
    title: "Mod 3: Stateful Personas",
    date: "Module 3",
    content: "Architect AI memory. Teach models to maintain consistent personalities and complex conversation contexts.",
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
    title: "Mod 4: Data Architect",
    date: "Module 4",
    content: "From chaos to structure. Engineer AI to process and return complex data in professional JSON formats.",
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
    title: "Mod 5: Logic & Reason",
    date: "Module 5",
    content: "Build chain-of-thought reasoning models. Train AI to judge, classify, and defend its conclusions.",
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
    title: "Mod 6: Multimodal Synthesis",
    date: "Module 6",
    content: "Fusing text and vision. Partner with AI to generate sophisticated narratives and visual assets.",
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
    title: "Mod 7: Identity Branding",
    date: "Module 7",
    content: "Automate your professional presence. Deploy AI-generated portfolios and bios that command attention.",
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
    title: "Mod 8: Startup Mindset",
    date: "Module 8",
    content: "Launch your AI product. Architect a complete end-to-end solution from problem framing to deployment.",
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
