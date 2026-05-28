"use client";

import React from "react";
import { InteractiveArchitecture } from "./interactive-architecture";
import { InteractiveRag } from "./interactive-rag";
import { PerformanceCharts } from "./performance-charts";
import { BookOpen, Briefcase, GraduationCap, Code2, BrainCircuit, Milestone, Landmark, CheckSquare2 } from "lucide-react";
import slideContent from "./slide-content.json";

export interface SlideData {
  id: number;
  title: string;
  category: string;
  icon: any;
  notes: string; // Speaker notes
  content: (theme: string) => React.ReactNode;
}

const contentData = slideContent as any;
const info = contentData.presentation_info;
const sData = contentData.slides;

// Map the slide array using sData from JSON, with JSX rendering functions
export const slides: SlideData[] = [
  // SLIDE 1: Title / Cover
  {
    id: 0,
    title: sData[0].title,
    category: sData[0].category,
    icon: GraduationCap,
    notes: sData[0].notes,
    content: (theme: string) => {
      const isLight = theme === "light";
      return (
        <div className="flex flex-col items-center justify-center text-center h-full max-w-3xl mx-auto px-4 py-8">
          <img src="/logo.jpg" alt="VVCE Logo" className="w-full max-w-2xl h-auto object-contain mb-5 rounded shadow-md border border-neutral-100 bg-white p-1" />
          <span className={`px-3 py-1 text-xs uppercase font-mono tracking-widest rounded-full mb-6 ${isLight ? "bg-blue-50 text-blue-600 border border-blue-200" : "bg-blue-500/10 text-blue-400 border border-blue-500/25"
            }`}>
            {info.subtitle}
          </span>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 ${isLight
            ? "text-neutral-900 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700"
            : "text-white bg-clip-text text-transparent bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-400"
            }`}>
            {info.title}
          </h1>

          <p className={`text-sm sm:text-base mb-10 max-w-xl ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
            An internship project focusing on enterprise three-tier web systems and grounded AI assistants to enforce engineering standards.
          </p>

          {/* Presenter info grids */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 w-full border-t pt-8 text-left text-xs sm:text-sm ${isLight ? "border-neutral-200" : "border-neutral-900"}`}>
            <div className={`p-4 rounded-xl border ${isLight ? "bg-neutral-50 border-neutral-200 shadow-sm" : "bg-neutral-950/40 border-neutral-900/60"
              }`}>
              <span className={`text-[10px] uppercase font-bold tracking-wider block mb-2 ${isLight ? "text-neutral-500" : "text-neutral-550"}`}>Presented By</span>
              <div>
                <p className={`font-bold ${isLight ? "text-neutral-800" : "text-neutral-100"}`}>{info.presenter.name}</p>
                <p className={`text-xs font-mono ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>Reg No: {info.presenter.reg_no}</p>
                <p className={`text-xs mt-1 ${isLight ? "text-neutral-650" : "text-neutral-400"}`}>{info.presenter.department}</p>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${isLight ? "bg-neutral-50 border-neutral-200 shadow-sm" : "bg-neutral-950/40 border-neutral-900/60"
              }`}>
              <span className={`text-[10px] uppercase font-bold tracking-wider block mb-2 ${isLight ? "text-neutral-500" : "text-neutral-550"}`}>Under Guidance Of</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className={`font-semibold ${isLight ? "text-neutral-800" : "text-neutral-200"}`}>{info.guide.name}</p>
                  <p className={`text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>{info.guide.designation}</p>
                  <p className={`text-[10px] ${isLight ? "text-neutral-650" : "text-neutral-500"}`}>{info.guide.institution}</p>
                </div>
                <div>
                  <p className={`font-semibold ${isLight ? "text-neutral-800" : "text-neutral-200"}`}>{info.external_guide.name}</p>
                  <p className={`text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>{info.external_guide.designation}</p>
                  <p className={`text-[10px] ${isLight ? "text-neutral-650" : "text-neutral-500"}`}>{info.external_guide.company}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`mt-8 text-[11px] font-mono ${isLight ? "text-neutral-555" : "text-neutral-500"}`}>
            {info.presenter.department.toUpperCase()} • {info.presenter.college.toUpperCase()}
          </div>
        </div>
      );
    }
  },

  // SLIDE 2: Executive Summary
  {
    id: 1,
    title: sData[1].title,
    category: sData[1].category,
    icon: BookOpen,
    notes: sData[1].notes,
    content: (theme: string) => {
      const isLight = theme === "light";
      return (
        <div className="flex flex-col justify-center h-full max-w-4xl mx-auto px-4 py-4">
          <h2 className={`text-2xl font-bold mb-2 ${isLight ? "text-neutral-900" : "text-white"}`}>{sData[1].title}</h2>
          <p className={`text-sm mb-6 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
            In this internship I have learned about enterprise systems, web architecture and to build AI powered tools.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className={`p-5 rounded-xl border flex flex-col justify-between ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/50 border-neutral-800"
              }`}>
              <div>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${isLight ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-blue-500/10 text-blue-400"}`}>
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-sm mb-2 ${isLight ? "text-neutral-800" : "text-neutral-200"}`}>1. Enterprise Learning Portal</h3>
                <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-650" : "text-neutral-300"}`}>
                  {sData[1].bullets?.[0] || ""}
                </p>
              </div>
              <div className={`mt-4 pt-3 border-t text-[10px] font-mono ${isLight ? "border-neutral-200 text-neutral-500" : "border-neutral-900 text-neutral-500"}`}>
                Focus: Scalability, Clean Code & Documentation
              </div>
            </div>

            <div className={`p-5 rounded-xl border flex flex-col justify-between ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/50 border-neutral-800"
              }`}>
              <div>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${isLight ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-emerald-500/10 text-emerald-400"}`}>
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h3 className={`font-bold text-sm mb-2 ${isLight ? "text-neutral-800" : "text-neutral-200"}`}>2. AI-Driven Knowledge System</h3>
                <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-650" : "text-neutral-300"}`}>
                  {sData[1].bullets?.[1] || ""}
                </p>
              </div>
              <div className={`mt-4 pt-3 border-t text-[10px] font-mono ${isLight ? "border-neutral-200 text-neutral-500" : "border-neutral-900 text-neutral-500"}`}>
                Focus: Lowering AI Hallucinations
              </div>
            </div>
          </div>

          <div className={`mt-6 p-3.5 rounded-lg border text-xs text-center ${isLight ? "bg-neutral-50 border-neutral-200 text-neutral-700" : "bg-neutral-900/60 border-neutral-850 text-neutral-300"
            }`}>
            <strong>Key Objective:</strong> Develop and optimize enterprise-level solutions including the Learning Portal for digital learning and the CAD RAG knowledge system for intelligent engineering standards retrieval, document extraction, and AI-assisted workflow automation.
          </div>
        </div>
      );
    }
  },

  // SLIDE 3: Organizational Context
  {
    id: 2,
    title: sData[2].title,
    category: sData[2].category,
    icon: Landmark,
    notes: sData[2].notes,
    content: (theme: string) => {
      const isLight = theme === "light";
      return (
        <div className="flex flex-col justify-center h-full max-w-4xl mx-auto px-4 py-4">
          <h2 className={`text-2xl font-bold mb-2 ${isLight ? "text-neutral-900" : "text-white"}`}>{sData[2].title}</h2>
          <p className={`text-sm mb-6 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
            Overview of the organization, Raashi Digital LLP.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/20 border-neutral-850"}`}>
              <h3 className={`font-bold text-xs mb-2 uppercase tracking-wide ${isLight ? "text-blue-600" : "text-blue-400"}`}>
                Who They Are
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                {sData[2].bullets?.[0] || ""}
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/20 border-neutral-850"}`}>
              <h3 className={`font-bold text-xs mb-2 uppercase tracking-wide ${isLight ? "text-emerald-600" : "text-emerald-400"}`}>
                Core Expertise
              </h3>
              <ul className={`text-xs space-y-1.5 list-disc pl-4 leading-normal ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                <li>{sData[2].bullets?.[1] || ""}</li>
                <li>Model-Based Enterprise (MBE) methodologies.</li>
              </ul>
            </div>

            <div className={`p-4 rounded-xl border ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/20 border-neutral-850"}`}>
              <h3 className={`font-bold text-xs mb-2 uppercase tracking-wide ${isLight ? "text-purple-600" : "text-purple-400"}`}>
                Specialized Tools
              </h3>
              <p className={`text-xs leading-relaxed mb-2 ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                {sData[2].bullets?.[2] || ""}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className={`px-2 py-0.5 text-[9px] font-mono rounded border ${isLight ? "bg-neutral-50 border-neutral-200 text-neutral-600" : "bg-neutral-900 border-neutral-850 text-neutral-400"
                  }`}>
                  RdCADAM Manager
                </span>
                <span className={`px-2 py-0.5 text-[9px] font-mono rounded border ${isLight ? "bg-neutral-50 border-neutral-200 text-neutral-600" : "bg-neutral-900 border-neutral-850 text-neutral-400"
                  }`}>
                  RdPDI Importer
                </span>
              </div>
            </div>
          </div>

          <div className={`mt-6 flex items-center justify-between p-4 rounded-xl border text-xs ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/60 border-neutral-800"
            }`}>
            <div className="space-y-1">
              <span className={`font-semibold ${isLight ? "text-neutral-800" : "text-neutral-200"}`}>Consulting Program</span>
              <p className={`text-[11px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>{sData[2].bullets?.[3] || ""}</p>
            </div>
            <span className={`px-3 py-1 rounded border font-bold shrink-0 hidden sm:inline text-[10px] ${isLight ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-blue-500/10 text-blue-400 border-blue-500/20"
              }`}>
              MBE MATURITY EVALUATION
            </span>
          </div>
        </div>
      );
    }
  },

  // SLIDE 4: Training Program
  {
    id: 3,
    title: sData[3].title,
    category: sData[3].category,
    icon: Briefcase,
    notes: sData[3].notes,
    content: (theme: string) => {
      const isLight = theme === "light";
      const d1 = sData[3].domain_1;
      const d2 = sData[3].domain_2;
      return (
        <div className="flex flex-col justify-center h-full max-w-4xl mx-auto px-4 py-4">
          <h2 className={`text-2xl font-bold mb-2 ${isLight ? "text-neutral-900" : "text-white"}`}>Training Domains</h2>
          <p className={`text-sm mb-6 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
            My training was undergone in two domains, structured as follows:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Domain 1 */}
            <div className={`p-5 rounded-xl border relative overflow-hidden group ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/40 border-neutral-800"
              }`}>
              <div className="absolute top-0 right-0 p-3 text-neutral-800">
                <Code2 className={`w-16 h-16 opacity-10 ${isLight ? "text-neutral-300" : "text-neutral-800"}`} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? "text-blue-600" : "text-blue-400"}`}>Domain 1</span>
              <h3 className={`text-base font-bold mt-1 mb-3 ${isLight ? "text-neutral-800" : "text-neutral-100"}`}>{d1.title}</h3>
              <ul className={`space-y-2 text-xs ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                {d1.bullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Domain 2 */}
            <div className={`p-5 rounded-xl border relative overflow-hidden group ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/40 border-neutral-800"
              }`}>
              <div className="absolute top-0 right-0 p-3 text-neutral-800">
                <BrainCircuit className={`w-16 h-16 opacity-10 ${isLight ? "text-neutral-300" : "text-neutral-800"}`} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? "text-emerald-600" : "text-emerald-400"}`}>Domain 2</span>
              <h3 className={`text-base font-bold mt-1 mb-3 ${isLight ? "text-neutral-800" : "text-neutral-100"}`}>{d2.title}</h3>
              <ul className={`space-y-2 text-xs ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                {d2.bullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  },

  // SLIDE 5: Learning Experiences (ASME, GD&T, Git, Config)
  {
    id: 4,
    title: sData[4].title,
    category: sData[4].category,
    icon: CheckSquare2,
    notes: sData[4].notes,
    content: (theme: string) => {
      const isLight = theme === "light";
      const th = sData[4].theory;
      const pr = sData[4].practical;
      return (
        <div className="flex flex-col justify-center h-full max-w-4xl mx-auto px-4 py-4">
          <h2 className={`text-2xl font-bold mb-2 ${isLight ? "text-neutral-900" : "text-white"}`}>{sData[4].title}</h2>
          <p className={`text-sm mb-6 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
            Key theoretical knowledge and practical software engineering skills acquired.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Theory */}
            <div className="space-y-4">
              <h3 className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>{th.heading}</h3>

              <div className={`p-4 rounded-xl border ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/20 border-neutral-900"}`}>
                <h4 className={`text-xs font-bold mb-1.5 ${isLight ? "text-neutral-800" : "text-neutral-200"}`}>{th.items[0].title}</h4>
                <p className={`text-xs leading-normal ${isLight ? "text-neutral-650" : "text-neutral-300"}`}>
                  {th.items[0].desc}
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/20 border-neutral-900"}`}>
                <h4 className={`text-xs font-bold mb-1.5 ${isLight ? "text-neutral-800" : "text-neutral-200"}`}>{th.items[1].title}</h4>
                <p className={`text-xs leading-normal ${isLight ? "text-neutral-650" : "text-neutral-300"}`}>
                  {th.items[1].desc}
                </p>
              </div>
            </div>

            {/* Practical */}
            <div className="space-y-4">
              <h3 className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>{pr.heading}</h3>

              <div className={`p-4 rounded-xl border space-y-2.5 ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/20 border-neutral-900"}`}>
                {pr.items.map((item: string, i: number) => (
                  <div key={i} className={`flex items-start gap-2.5 text-xs ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                    <span className="text-blue-500 font-mono font-bold mt-0.5">[{i + 1}]</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  },

  // SLIDE 6: Project 1 - Learning Platform & Architecture
  {
    id: 5,
    title: sData[5].title,
    category: sData[5].category,
    icon: Code2,
    notes: sData[5].notes,
    content: (theme: string) => {
      const isLight = theme === "light";
      return (
        <div className="flex flex-col justify-center h-full max-w-4xl mx-auto px-4 py-2">
          <h2 className={`text-xl sm:text-2xl font-bold mb-1 ${isLight ? "text-neutral-900" : "text-white"}`}>{sData[5].title}</h2>
          <p className={`text-xs mb-4 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
            A three-tier web application built to deliver endusers for digital learning & to gain there knowledge.
          </p>

          {/* Dynamic Interactive Component */}
          <InteractiveArchitecture theme={theme} />
        </div>
      );
    }
  },

  // SLIDE 7: Project 2 - AI Knowledge System (RAG Ingestion)
  {
    id: 6,
    title: sData[6].title,
    category: sData[6].category,
    icon: BrainCircuit,
    notes: sData[6].notes,
    content: (theme: string) => {
      const isLight = theme === "light";
      return (
        <div className="flex flex-col justify-center h-full max-w-4xl mx-auto px-4 py-2">
          <h2 className={`text-xl sm:text-2xl font-bold mb-1 ${isLight ? "text-neutral-900" : "text-white"}`}>{sData[6].title}</h2>
          <p className={`text-xs mb-4 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
            Retrieval-Augmented Generation (RAG) assistant for designers to query or look out for mechanical design standards.
          </p>

          {/* Dynamic Interactive RAG component */}
          <InteractiveRag theme={theme} />
        </div>
      );
    }
  },

  // SLIDE 8: Project 2 - Dual Database & Grounding
  {
    id: 7,
    title: sData[7].title,
    category: sData[7].category,
    icon: CheckSquare2,
    notes: sData[7].notes,
    content: (theme: string) => {
      const isLight = theme === "light";
      const pr = sData[7].priority;
      const gr = sData[7].grounding;
      return (
        <div className="flex flex-col justify-center h-full max-w-4xl mx-auto px-4 py-4">
          <h2 className={`text-2xl font-bold mb-2 ${isLight ? "text-neutral-900" : "text-white"}`}>{sData[7].title}</h2>
          <p className={`text-sm mb-6 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
            The architectural safeguards built to guarantee accuracy and prioritize company-specific rules.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-4 rounded-xl border space-y-3 ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/20 border-neutral-900"}`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-amber-600" : "text-amber-400"}`}>{pr.heading}</h3>
              <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                {pr.desc}
              </p>
              <div className={`p-3 rounded border text-[11px] ${isLight ? "bg-neutral-50 border-neutral-200 text-neutral-600" : "bg-neutral-950 border-neutral-900 text-neutral-400"
                }`}>
                <strong>Priority Weighting:</strong> {pr.highlight}
              </div>
            </div>

            <div className={`p-4 rounded-xl border space-y-3 ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/20 border-neutral-900"}`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-emerald-600" : "text-emerald-400"}`}>{gr.heading}</h3>
              <p className={`text-xs leading-relaxed ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                {gr.desc}
              </p>
              <ul className={`text-xs space-y-1.5 list-disc pl-4 ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
                {gr.items.map((item: string, i: number) => (
                  <li key={i}><strong>{item.split(":")[0]}:</strong>{item.split(":")[1]}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
  },

  // SLIDE 9: Conclusion
  {
    id: 8,
    title: sData[8].title,
    category: sData[8].category,
    icon: Milestone,
    notes: sData[8].notes,
    content: (theme: string) => {
      const isLight = theme === "light";
      const cap = sData[8].capstone;
      const fnd = sData[8].foundation;
      const fut = sData[8].future;
      return (
        <div className="flex flex-col justify-center h-full max-w-4xl mx-auto px-4 py-4">
          <h2 className={`text-2xl font-bold mb-2 ${isLight ? "text-neutral-900" : "text-white"}`}>{sData[8].title}</h2>
          <p className={`text-sm mb-6 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
            Summary of learning outcomes, capstone achievements, and future pathways.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border space-y-2 ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/40 border-neutral-900"}`}>
              <span className={`text-[10px] uppercase font-bold font-mono ${isLight ? "text-blue-600" : "text-blue-400"}`}>1. {cap.title}</span>
              <h4 className={`font-semibold text-xs ${isLight ? "text-neutral-850" : "text-neutral-200"}`}>{cap.subtitle}</h4>
              <p className={`text-[11px] leading-relaxed ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                {cap.desc}
              </p>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/40 border-neutral-900"}`}>
              <span className={`text-[10px] uppercase font-bold font-mono ${isLight ? "text-emerald-600" : "text-emerald-400"}`}>2. {fnd.title}</span>
              <h4 className={`font-semibold text-xs ${isLight ? "text-neutral-850" : "text-neutral-200"}`}>{fnd.subtitle}</h4>
              <p className={`text-[11px] leading-relaxed ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                {fnd.desc}
              </p>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/40 border-neutral-900"}`}>
              <span className={`text-[10px] uppercase font-bold font-mono ${isLight ? "text-purple-600" : "text-purple-400"}`}>3. {fut.title}</span>
              <h4 className={`font-semibold text-xs ${isLight ? "text-neutral-850" : "text-neutral-200"}`}>{fut.subtitle}</h4>
              <p className={`text-[11px] leading-relaxed ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                {fut.desc}
              </p>
            </div>
          </div>

          <div className={`mt-8 text-center p-4 border rounded-xl max-w-xl mx-auto ${isLight ? "bg-neutral-50 border-neutral-200" : "bg-neutral-950/60 border-neutral-900"
            }`}>
            <h3 className={`text-sm font-bold mb-1 ${isLight ? "text-neutral-850" : "text-white"}`}>Thank You!</h3>
            <p className={`text-xs ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>Questions & Discussion</p>
          </div>
        </div>
      );
    }
  }
];
