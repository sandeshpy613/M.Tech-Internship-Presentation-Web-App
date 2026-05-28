"use client";

import React, { useState, useEffect, useRef } from "react";
import { slides } from "./slides";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  BookOpen,
  Timer,
  X,
  Menu,
  Sparkles,
  Download
} from "lucide-react";

type Theme = "light";

export function PresentationDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState<Theme>("light"); // Defaulting to Light Theme
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed] = useState(6000); // 6 seconds per slide
  const [showNotes, setShowNotes] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Presenter timing state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "Space":
          e.preventDefault();
          nextSlide();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevSlide();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
        case "Escape":
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
        case "n":
        case "N":
          setShowNotes((prev) => !prev);
          break;
        case "s":
        case "S":
          setIsSidebarOpen((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= slides.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, playSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playSpeed]);

  // Presenter Mode Timer
  useEffect(() => {
    if (showNotes) {
      setTimerSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [showNotes]);

  // Screen size full screen change listener
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToSlide = (idx: number) => {
    if (idx >= 0 && idx < slides.length) {
      setCurrentIndex(idx);
      setIsSidebarOpen(false);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!deckRef.current) return;

    if (!document.fullscreenElement) {
      deckRef.current.requestFullscreen().catch((err) => {
        console.error("Fullscreen error", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Mobile touch gestures
  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  const currentSlide = slides[currentIndex];

  // Theme styles classes
  const getThemeClasses = () => {
    return {
      container: "bg-neutral-50 text-neutral-900 font-sans border-neutral-200",
      card: "bg-white border border-neutral-200 shadow-xl",
      header: "border-b border-neutral-250 bg-white/95 text-neutral-800 shadow-sm",
      accent: "text-blue-600 bg-blue-50 border-blue-200 border",
      controlBtn: "hover:bg-neutral-100 hover:text-neutral-900 text-neutral-600 border-neutral-200",
      progressFill: "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md",
      slideBg: "relative overflow-hidden before:absolute before:inset-0 before:bg-[linear-gradient(to_right,#e5e7eb40_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb40_1px,transparent_1px)] before:bg-[size:4rem_4rem]"
    };
  };

  const currentTheme = getThemeClasses();

  return (
    <div
      ref={deckRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-screen flex flex-col transition-colors duration-500 overflow-hidden ${currentTheme.container} ${currentTheme.slideBg}`}
    >
      {/* TOP HEADER */}
      <header className={`w-full py-3.5 px-6 flex items-center justify-between z-10 shadow-sm ${currentTheme.header}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-lg border cursor-pointer transition-colors ${theme === "light"
                ? "border-neutral-200 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900"
                : "border-neutral-800/85 hover:bg-neutral-900/60 text-neutral-400 hover:text-white"
              }`}
            title="Toggle slide outline (S)"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-neutral-500">M.Tech Internship</span>
            <span className={`text-xs font-semibold truncate max-w-[250px] sm:max-w-md ${theme === "light" ? "text-neutral-800" : "text-neutral-200"}`}>
              Full-Stack & AI Integration
            </span>
          </div>
        </div>

        {/* Header toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-3 relative">

          {/* Speaker Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-2 rounded-lg border flex items-center gap-1 text-xs cursor-pointer ${showNotes
                ? theme === "light"
                  ? "border-blue-300 text-blue-600 bg-blue-50"
                  : "border-blue-500/40 text-blue-400 bg-blue-500/5"
                : theme === "light"
                  ? "border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  : "text-neutral-400 hover:text-white border-neutral-800/80 hover:bg-neutral-900/60"
              }`}
            title="Toggle presenter notes (N)"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline font-semibold">Notes</span>
          </button>

          {/* Download PowerPoint Slide Deck (.pptx) */}
          <a
            href="/presentation/internship_presentation.pptx"
            download="internship_presentation.pptx"
            className={`p-2 rounded-lg border flex items-center gap-1 text-xs cursor-pointer transition-colors ${theme === "light"
                ? "border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900"
                : "border-neutral-800/80 bg-neutral-900/30 text-neutral-400 hover:text-white hover:bg-neutral-900/60"
              }`}
            title="Download editable PowerPoint PPTX file"
          >
            <Download className="w-4 h-4 text-blue-500" />
            <span className="hidden md:inline font-semibold">Download PPT</span>
          </a>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className={`p-2 rounded-lg border cursor-pointer ${theme === "light"
                ? "border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                : "border-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-900/60"
              }`}
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* COLLAPSIBLE SIDEBAR */}
      <div
        className={`absolute top-[60px] bottom-0 left-0 w-72 border-r z-30 transition-transform duration-300 shadow-2xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${theme === "light" ? "bg-white border-neutral-200" : "bg-neutral-950 border-neutral-900"}`}
      >
        <div className={`p-4 flex items-center justify-between border-b ${theme === "light" ? "border-neutral-200" : "border-neutral-900"}`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${theme === "light" ? "text-neutral-500" : "text-neutral-400"}`}>Slide Index</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className={`p-1 rounded cursor-pointer ${theme === "light" ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800" : "bg-neutral-900 hover:bg-neutral-800 text-neutral-500 hover:text-white"}`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="p-2 overflow-y-auto h-[calc(100%-60px)] space-y-1">
          {slides.map((s, idx) => {
            const SlideIcon = s.icon;
            const isCurrent = currentIndex === idx;

            return (
              <button
                key={s.id}
                onClick={() => goToSlide(idx)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors cursor-pointer text-xs ${isCurrent
                    ? theme === "light"
                      ? "bg-neutral-100 text-neutral-900 font-bold border border-neutral-200"
                      : "bg-neutral-900 text-white font-medium border border-neutral-850"
                    : theme === "light"
                      ? "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                      : "text-neutral-400 hover:bg-neutral-900/40 hover:text-neutral-200"
                  }`}
              >
                <div
                  className={`p-1.5 rounded ${isCurrent
                      ? theme === "light"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-blue-500/20 text-blue-400"
                      : theme === "light"
                        ? "bg-neutral-100 text-neutral-400"
                        : "bg-neutral-900 text-neutral-500"
                    }`}
                >
                  <SlideIcon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-sans">{s.title}</p>
                  <p className="text-[10px] text-neutral-500 font-mono">Slide {idx + 1}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN SLIDE AREA & PRESENTER GRID */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
        {/* Core Slide Viewer */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          <div
            className={`w-full max-w-5xl aspect-video min-h-[380px] sm:min-h-[480px] p-6 sm:p-10 rounded-2xl transition-all duration-500 flex flex-col justify-between shadow-2xl ${currentTheme.card}`}
          >
            {/* Category / Icon tag */}
            <div className={`flex items-center justify-between border-b pb-3.5 ${theme === "light" ? "border-neutral-200" : "border-neutral-900"}`}>
              <div className="flex items-center gap-2 text-neutral-400">
                {currentIndex === 0 && (
                  <>
                    {React.createElement(currentSlide.icon, { className: "w-4 h-4 text-neutral-500" })}
                    <span className={`text-[10px] uppercase font-mono tracking-widest font-bold ${theme === "light" ? "text-neutral-550" : "text-neutral-400"}`}>
                      {currentSlide.category}
                    </span>
                  </>
                )}
              </div>
              <span className="text-[10px] text-neutral-500 font-mono tracking-wider">
                {currentIndex + 1} / {slides.length}
              </span>
            </div>

            {/* Content Slot rendering themed content dynamically */}
            <div className={`flex-1 flex flex-col justify-center py-4 ${theme === "light" ? "text-neutral-800" : "text-neutral-200"}`}>
              {currentSlide.content(theme)}
            </div>

            {/* Presentation Footer */}
            <div className={`flex items-center justify-between border-t pt-3.5 text-[10px] font-mono tracking-wide ${theme === "light" ? "border-neutral-200 text-neutral-500" : "border-neutral-900/60 text-neutral-500"
              }`}>
              <span>SANDESH P Y • MASTER OF TECHNOLOGY</span>
              <span>VIDYAVARDHAKA COLLEGE OF ENGINEERING</span>
            </div>
          </div>
        </div>

        {/* PRESENTER SPEAKER NOTES PANEL */}
        {showNotes && (
          <div className={`w-full md:w-80 border-t md:border-t-0 md:border-l flex flex-col z-20 shadow-xl shrink-0 ${theme === "light" ? "bg-neutral-50 border-neutral-200" : "bg-neutral-950 border-neutral-900"
            }`}>
            {/* Presenter Header */}
            <div className={`p-4 border-b flex items-center justify-between ${theme === "light" ? "border-neutral-200" : "border-neutral-900"}`}>
              <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${theme === "light" ? "text-neutral-600 font-sans" : "text-neutral-400"}`}>
                <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Presenter Dashboard
              </span>
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono ${theme === "light" ? "bg-white border border-neutral-200 text-neutral-700" : "bg-neutral-900 text-neutral-300"
                }`}>
                <Timer className="w-3.5 h-3.5 text-blue-500" />
                <span>{formatTime(timerSeconds)}</span>
              </div>
            </div>

            {/* Note text container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs leading-relaxed">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Speaker Notes</span>
                <p className={`border p-3 rounded-lg whitespace-pre-line leading-relaxed ${theme === "light" ? "bg-white border-neutral-200 text-neutral-700" : "bg-neutral-900/40 border-neutral-900 text-neutral-300"
                  }`}>
                  {currentSlide.notes}
                </p>
              </div>

              {/* Next Slide Preview */}
              {currentIndex < slides.length - 1 && (
                <div className={`p-3 rounded-lg border space-y-1 ${theme === "light" ? "bg-white border-neutral-200" : "bg-neutral-900/20 border-neutral-900"
                  }`}>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Up Next</span>
                  <div className="flex items-center gap-2">
                    {React.createElement(slides[currentIndex + 1].icon, { className: "w-3.5 h-3.5 text-neutral-500" })}
                    <p className={`font-semibold truncate text-[11px] ${theme === "light" ? "text-neutral-800" : "text-neutral-250"}`}>
                      {slides[currentIndex + 1].title}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* BOTTOM CONTROL BAR */}
      <footer className={`w-full py-4 px-6 border-t z-10 flex flex-col sm:flex-row items-center gap-3 justify-between ${theme === "light" ? "bg-white border-neutral-200" : "bg-neutral-950 border-neutral-900"
        }`}>
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors ${currentTheme.controlBtn} disabled:opacity-30 disabled:cursor-not-allowed`}
            title="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className={`px-3 py-2 rounded-lg border text-xs cursor-pointer flex items-center gap-1.5 transition-colors ${currentTheme.controlBtn}`}
            title={isPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-semibold">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span className="font-semibold">Play</span>
              </>
            )}
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === slides.length - 1}
            className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors ${currentTheme.controlBtn} disabled:opacity-30 disabled:cursor-not-allowed`}
            title="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Tracker dots */}
        <div className="hidden md:flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-350 cursor-pointer ${currentIndex === idx
                  ? "bg-blue-600 scale-120 ring-4 ring-blue-500/10"
                  : theme === "light"
                    ? "bg-neutral-200 hover:bg-neutral-300"
                    : "bg-neutral-800 hover:bg-neutral-700"
                }`}
              title={`Go to Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className={`w-full sm:w-48 rounded-full h-1.5 overflow-hidden ${theme === "light" ? "bg-neutral-200" : "bg-neutral-900"}`}>
          <div
            className={`h-full transition-all duration-350 ${currentTheme.progressFill}`}
            style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
          />
        </div>
      </footer>
    </div>
  );
}
