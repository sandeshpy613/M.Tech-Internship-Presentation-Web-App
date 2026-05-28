"use client";

import React, { useState } from "react";
import { Server, Layout, Database, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

type LayerId = "frontend" | "backend" | "database";

interface InteractiveArchitectureProps {
  theme: string;
}

export function InteractiveArchitecture({ theme }: InteractiveArchitectureProps) {
  const [activeLayer, setActiveLayer] = useState<LayerId>("frontend");
  const isLight = theme === "light";

  const layers = [
    {
      id: "frontend" as LayerId,
      title: "1. Presentation Layer (Frontend)",
      tech: "Next.js & React",
      icon: Layout,
      color: "from-blue-500 to-cyan-500",
      accentColor: isLight ? "text-blue-600" : "text-blue-400",
      bgAccent: isLight ? "bg-blue-50/50" : "bg-blue-500/10",
      borderAccent: isLight ? "border-blue-200" : "border-blue-500/30",
      description: "This is the user-facing layer of the website.Done by using Next.js, this layer delivers pages instantly using Server-Side Rendering (SSR).",
      contributions: [
        "Built responsive dashboards and its functionalities for user and admin in learning portal.",
        "Handle API integrations.",
        "Improved performance and enhanced user experience."
      ]
    },
    {
      id: "backend" as LayerId,
      title: "2. Application Layer (Backend)",
      tech: "Python & Django REST API",
      icon: Server,
      color: "from-emerald-500 to-teal-500",
      accentColor: isLight ? "text-emerald-600" : "text-emerald-400",
      bgAccent: isLight ? "bg-emerald-50/50" : "bg-emerald-500/10",
      borderAccent: isLight ? "border-emerald-200" : "border-emerald-500/30",
      description: "This is the backbone of the website. It processes requests, checks rules, and serves data using standard APIs.",
      contributions: [
        "Implemented APIs and integrated with frontend applications.",
        "Performed cleanup and handeled seassion management.",
        "Performed testing using postman and resolved errors ,Also solved the server-port conflicts and much more."
      ]
    },
    {
      id: "database" as LayerId,
      title: "3. Persistence Layer (Database)",
      tech: "PostgreSQL",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      accentColor: isLight ? "text-purple-600" : "text-purple-400",
      bgAccent: isLight ? "bg-purple-50/50" : "bg-purple-500/10",
      borderAccent: isLight ? "border-purple-200" : "border-purple-500/30",
      description: "This is the storage room where all data, progress logs, and user profiles are saved safely.",
      contributions: [
        "Designed a relational layout to link courses, users, and progress.",
        "Ran database updates (migrations) to add tables without losing any data.",
        "Ensured data safety and helped in database connections."
      ]
    }
  ];

  const currentInfo = layers.find((l) => l.id === activeLayer)!;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* 3-Tier Visual Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center relative">
        {layers.map((layer, index) => {
          const IconComponent = layer.icon;
          const isActive = activeLayer === layer.id;

          return (
            <React.Fragment key={layer.id}>
              {/* Layer Card */}
              <button
                onClick={() => setActiveLayer(layer.id)}
                className={`relative flex flex-col items-center justify-center p-6 rounded-xl border text-center transition-all duration-300 cursor-pointer ${isActive
                  ? isLight
                    ? `bg-white shadow-lg border-blue-500 scale-102 ring-1 ring-blue-500/30`
                    : `bg-neutral-900/90 shadow-lg shadow-neutral-950/50 ${layer.borderAccent} scale-102 ring-1 ring-blue-500/30`
                  : isLight
                    ? "bg-neutral-50/50 border-neutral-200 hover:border-neutral-350 hover:bg-neutral-50"
                    : "bg-neutral-950/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/40"
                  }`}
              >
                <div
                  className={`p-4 rounded-full bg-gradient-to-br ${layer.color} text-white mb-3 shadow-md`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className={`font-semibold text-sm tracking-wide ${isLight ? "text-neutral-800" : "text-neutral-200"}`}>
                  {layer.tech}
                </h4>
                <p className={`text-xs mt-1 font-mono ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                  {layer.id.toUpperCase()}
                </p>

                {isActive && (
                  <span className={`absolute -bottom-2 px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-wider font-semibold rounded border ${isLight ? "bg-white text-neutral-600 border-neutral-200" : "bg-neutral-800 text-neutral-300 border-neutral-700"
                    }`}>
                    Active Details
                  </span>
                )}
              </button>

              {/* Connecting arrow for larger screens */}
              {index < 2 && (
                <div className={`hidden md:flex justify-center items-center pointer-events-none ${isLight ? "text-neutral-400" : "text-neutral-600"}`}>
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Interactive Details Panel */}
      <div
        className={`p-6 rounded-xl border transition-all duration-500 ${currentInfo.borderAccent} ${currentInfo.bgAccent}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${isLight ? "bg-white border border-neutral-200 shadow-sm" : "bg-neutral-950/60"} ${currentInfo.accentColor}`}>
            <currentInfo.icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`font-bold text-lg ${isLight ? "text-neutral-900" : "text-neutral-100"}`}>
              {currentInfo.title}
            </h3>
            <span className={`text-xs font-semibold ${currentInfo.accentColor}`}>
              Powered by {currentInfo.tech}
            </span>
          </div>
        </div>

        <p className={`text-sm mb-5 leading-relaxed ${isLight ? "text-neutral-700" : "text-neutral-300"}`}>
          {currentInfo.description}
        </p>

        <div className="space-y-3">
          <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
            <Cpu className="w-3.5 h-3.5" /> Sandesh's Contributions
          </h4>
          <ul className="grid grid-cols-1 gap-2.5">
            {currentInfo.contributions.map((item, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-2.5 text-xs p-2.5 rounded-lg border ${isLight ? "text-neutral-700 bg-white border-neutral-200 shadow-sm" : "text-neutral-300 bg-neutral-950/30 border-neutral-900"
                  }`}
              >
                <ShieldCheck className={`w-4 h-4 shrink-0 mt-0.5 ${currentInfo.accentColor}`} />
                <span className="leading-normal">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
