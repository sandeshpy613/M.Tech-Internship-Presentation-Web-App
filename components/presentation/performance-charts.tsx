"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Clock, CheckSquare, Sparkles } from "lucide-react";

interface PerformanceChartsProps {
  theme: string;
}

export function PerformanceCharts({ theme }: PerformanceChartsProps) {
  const [mounted, setMounted] = useState(false);
  const isLight = theme === "light";

  useEffect(() => {
    setMounted(true);
  }, []);

  const timeData = [
    { name: "Manual PDF Scan", seconds: 540, label: "9 minutes", color: isLight ? "#ef4444" : "#f87171" },
    { name: "AI Semantic Search", seconds: 2.5, label: "2.5 seconds", color: "#10b981" }
  ];

  const accuracyData = [
    { name: "Standard LLM", accuracy: 65, label: "65% (Hallucinations)", color: isLight ? "#d97706" : "#f59e0b" },
    { name: "Grounded RAG", accuracy: 100, label: "100% (Accurate)", color: "#10b981" }
  ];

  if (!mounted) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-neutral-500 font-mono">
        Bootstrapping data visualizers...
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`border p-2.5 rounded shadow-lg text-xs ${
          isLight ? "bg-white border-neutral-200 text-neutral-800" : "bg-neutral-900 border-neutral-800 text-neutral-200"
        }`}>
          <p className="font-semibold">{data.name}</p>
          <p className={`${isLight ? "text-neutral-500" : "text-neutral-400"} mt-0.5`}>
            {data.seconds !== undefined ? `Time: ${data.label}` : `Accuracy: ${data.label}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Time Optimization Chart */}
      <div className={`flex flex-col p-5 rounded-xl border ${
        isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/40 border-neutral-800"
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <div className={`p-1.5 rounded ${isLight ? "bg-red-50 text-red-500 border border-red-100" : "bg-red-500/10 text-red-400"}`}>
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-sm font-bold ${isLight ? "text-neutral-850" : "text-neutral-200"}`}>Information Lookup Time</h4>
            <p className={`text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>Average time to locate one engineering standard rule</p>
          </div>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="name"
                stroke={isLight ? "#4b5563" : "#6b7280"}
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={isLight ? "#4b5563" : "#6b7280"}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                label={{ value: "Seconds", angle: -90, position: "insideLeft", fill: isLight ? "#4b5563" : "#6b7280", offset: 10 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.03)' }} />
              <Bar dataKey="seconds" radius={[6, 6, 0, 0]} maxBarSize={60}>
                {timeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`mt-4 p-3 rounded-lg border text-xs flex items-start gap-2 ${
          isLight ? "bg-neutral-50 border-neutral-200 text-neutral-700" : "bg-neutral-950 border-neutral-900 text-neutral-300"
        }`}>
          <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>
            Moving from manual documentation lookup to <strong>semantic AI search</strong> reduces wait times by <strong>99.5%</strong>.
          </span>
        </div>
      </div>

      {/* Accuracy Grounding Chart */}
      <div className={`flex flex-col p-5 rounded-xl border ${
        isLight ? "bg-white border-neutral-200 shadow-sm" : "bg-neutral-950/40 border-neutral-800"
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <div className={`p-1.5 rounded ${isLight ? "bg-emerald-50 text-emerald-500 border border-emerald-100" : "bg-emerald-500/10 text-emerald-400"}`}>
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-sm font-bold ${isLight ? "text-neutral-850" : "text-neutral-200"}`}>Compliance Response Accuracy</h4>
            <p className={`text-[10px] ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>Percentage of factual, hallucination-free answers</p>
          </div>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="name"
                stroke={isLight ? "#4b5563" : "#6b7280"}
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={isLight ? "#4b5563" : "#6b7280"}
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                label={{ value: "% Accuracy", angle: -90, position: "insideLeft", fill: isLight ? "#4b5563" : "#6b7280", offset: 10 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.03)' }} />
              <Bar dataKey="accuracy" radius={[6, 6, 0, 0]} maxBarSize={60}>
                {accuracyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`mt-4 p-3 rounded-lg border text-xs flex items-start gap-2 ${
          isLight ? "bg-neutral-50 border-neutral-200 text-neutral-700" : "bg-neutral-950 border-neutral-900 text-neutral-300"
        }`}>
          <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>
            Standard LLMs invent numbers when reading dense standards. <strong>Retrieval-Augmented Generation (RAG)</strong> ensures <strong>100% grounding</strong>.
          </span>
        </div>
      </div>
    </div>
  );
}
