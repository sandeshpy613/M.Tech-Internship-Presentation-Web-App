"use client";

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Search, CheckCircle2, ChevronRight, FileText, Database, ShieldAlert, Cpu } from "lucide-react";

interface Step {
  title: string;
  desc: string;
  icon: any;
  color: string;
}

interface InteractiveRagProps {
  theme: string;
}

export function InteractiveRag({ theme }: InteractiveRagProps) {
  const [selectedQuery, setSelectedQuery] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isLight = theme === "light";

  const sampleQueries = [
    {
      id: 0,
      query: "What is the standard for 3D digital annotations?",
      retrievedDocs: [
        { source: "ASME Y14.41 Standard", text: "ASME Y14.41 outlines methods for displaying annotations directly on 3D CAD models, replacing 2D drawings." }
      ],
      response: "According to the ASME Y14.41 standard, engineers can annotate dimensions and text notes directly onto a 3D digital CAD model. This model acts as the single source of truth, removing the need for traditional 2D paper drawings.",
      citation: "ASME Y14.41 (Section 3, Page 6)"
    },
    {
      id: 1,
      query: "Are company rules more important than general rules?",
      retrievedDocs: [
        { source: "Raashi Co. Guidelines", text: "Company internal guidelines supersede general ASME rules for specific automotive CAD packages." }
      ],
      response: "Yes. The system's dual-database retrieval logic prioritizes company-specific rules over general industry standards. If a company-internal rule matches the context, it is weighted higher and displayed first.",
      citation: "Raashi Internal Rules (Rule Ref #302, Page 2)"
    }
  ];

  const steps: Step[] = [
    {
      title: "1. Query Processing",
      desc: "Convert search request into a mathematical vector embedding.",
      icon: Search,
      color: isLight ? "text-blue-600" : "text-blue-400"
    },
    {
      title: "2. Dual-DB Search",
      desc: "Search Vector DB for standard rules and company rules.",
      icon: Database,
      color: isLight ? "text-amber-600" : "text-amber-400"
    },
    {
      title: "3. Priority Logic & Re-ranking",
      desc: "Order company rules first and run re-ranking.",
      icon: ChevronRight,
      color: isLight ? "text-emerald-600" : "text-emerald-400"
    },
    {
      title: "4. LLM Grounding",
      desc: "Lock the AI to ONLY use the retrieved chunks.",
      icon: ShieldAlert,
      color: isLight ? "text-rose-600" : "text-rose-400"
    },
    {
      title: "5. Safe Output",
      desc: "Provide the user with a fact-checked response and citations.",
      icon: Cpu,
      color: isLight ? "text-purple-600" : "text-purple-400"
    }
  ];

  const startSimulation = (queryId: number) => {
    setSelectedQuery(queryId);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying || currentStep === -1 || currentStep >= steps.length) {
      if (currentStep >= steps.length) {
        setIsPlaying(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 1800); // Step duration

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  const activeQuery = selectedQuery !== null ? sampleQueries[selectedQuery] : null;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Left Column: Input Selection */}
      <div className="flex flex-col gap-4 w-full md:w-1/3">
        <h3 className={`text-sm font-bold uppercase tracking-wider ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
          Select a Query to Test
        </h3>
        <div className="flex flex-col gap-3">
          {sampleQueries.map((q) => (
            <button
              key={q.id}
              onClick={() => startSimulation(q.id)}
              disabled={isPlaying}
              className={`p-3 text-left rounded-lg border text-xs transition-all ${
                selectedQuery === q.id
                  ? isLight
                    ? "bg-neutral-100 border-neutral-300 font-semibold text-neutral-900 shadow-sm"
                    : "bg-neutral-900 border-neutral-700 font-medium text-neutral-100"
                  : isLight
                  ? "bg-white border-neutral-200 hover:border-neutral-300 text-neutral-600 hover:text-neutral-800"
                  : "bg-neutral-950/40 border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200"
              } ${isPlaying ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              "{q.query}"
            </button>
          ))}
        </div>

        {selectedQuery !== null && (
          <button
            onClick={() => {
              setSelectedQuery(null);
              setCurrentStep(-1);
              setIsPlaying(false);
            }}
            disabled={isPlaying}
            className={`flex items-center justify-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer disabled:opacity-50 ${
              isLight
                ? "border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-neutral-800"
                : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Simulator
          </button>
        )}
      </div>

      {/* Right Column: Execution Flow */}
      <div className={`flex-1 p-5 rounded-xl border min-h-[350px] flex flex-col ${
        isLight ? "border-neutral-200 bg-neutral-50/50 shadow-inner" : "border-neutral-800 bg-neutral-950/60"
      }`}>
        {selectedQuery === null ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className={`p-3 rounded-full border mb-3 ${isLight ? "bg-white border-neutral-200 text-neutral-400" : "bg-neutral-900 border-neutral-800 text-neutral-500"}`}>
              <Play className="w-6 h-6 animate-pulse" />
            </div>
            <p className={`text-sm ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
              Click on a query on the left to start the step-by-step AI search simulation.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-4">
            {/* Steps Timeline */}
            <div className={`flex flex-wrap gap-2 justify-between border-b pb-4 ${isLight ? "border-neutral-200" : "border-neutral-900"}`}>
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isPassed = currentStep > idx;
                const isActive = currentStep === idx;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-1.5 transition-all duration-300 ${
                      isActive
                        ? "opacity-100 scale-102 font-medium"
                        : isPassed
                        ? "opacity-80"
                        : "opacity-40"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded border ${
                        isPassed
                          ? isLight
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : isActive
                          ? isLight
                            ? "bg-blue-50 text-blue-600 border-blue-200"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                          : isLight
                          ? "bg-white text-neutral-400 border-neutral-200"
                          : "bg-neutral-900 text-neutral-600 border border-neutral-800"
                      }`}
                    >
                      <StepIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className={`text-[10px] hidden sm:inline ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                      {step.title.split(". ")[1]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Current Active Step details */}
            {currentStep >= 0 && currentStep < steps.length && (
              <div className={`p-4 rounded-lg border animate-fadeIn ${
                isLight ? "bg-white border-neutral-250 shadow-sm" : "bg-neutral-900/60 border-neutral-800"
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold ${steps[currentStep].color}`}>
                    {steps[currentStep].title}
                  </span>
                </div>
                <p className={`text-xs ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>{steps[currentStep].desc}</p>
              </div>
            )}

            {/* Database / Retrieval Simulation visual block */}
            {currentStep >= 2 && activeQuery && (
              <div className={`flex flex-col gap-2 p-3.5 rounded-lg border animate-fadeIn text-xs ${
                isLight ? "bg-white/80 border-neutral-200 shadow-sm" : "bg-neutral-900/40 border-neutral-900"
              }`}>
                <div className={`flex items-center gap-2 font-semibold uppercase tracking-wider text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                  <FileText className="w-3 h-3 text-amber-500" /> Grounded Context Chunks Retrieved
                </div>
                {activeQuery.retrievedDocs.map((doc, idx) => (
                  <div key={idx} className={`p-2 rounded border ${isLight ? "bg-neutral-50 border-neutral-200" : "bg-neutral-950 border-neutral-900"}`}>
                    <div className={`text-[10px] font-semibold mb-1 ${isLight ? "text-amber-700" : "text-amber-500"}`}>
                      {doc.source}
                    </div>
                    <p className={`text-[11px] italic ${isLight ? "text-neutral-800" : "text-neutral-300"}`}>"{doc.text}"</p>
                  </div>
                ))}
              </div>
            )}

            {/* Simulation Complete: Final Response */}
            {currentStep >= 5 && activeQuery && (
              <div className={`mt-auto p-4 rounded-lg border animate-fadeIn flex flex-col gap-2 ${
                isLight ? "bg-emerald-50/50 border-emerald-200 shadow-sm" : "bg-emerald-500/5 border-emerald-500/20"
              }`}>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Grounded Answer Generated Successfully
                </div>
                <p className={`text-xs leading-relaxed p-2.5 rounded border ${
                  isLight ? "bg-white border-emerald-100 text-neutral-800" : "bg-neutral-950/40 border-neutral-900 text-neutral-200"
                }`}>
                  {activeQuery.response}
                </p>
                <div className={`text-[10px] flex items-center gap-1 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                  <span className="font-semibold text-emerald-600">Source Citation:</span>
                  <span className={`font-mono px-1.5 py-0.5 rounded border ${
                    isLight ? "bg-neutral-100 border-neutral-200 text-neutral-700" : "bg-neutral-900 border-neutral-800 text-neutral-300"
                  }`}>
                    {activeQuery.citation}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
