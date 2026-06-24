import React from "react";

export function Logo({ className = "", showText = true }: { className?: string, showText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(79,70,229,0.5)]">
          <defs>
            <linearGradient id="logo-blue-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="logo-indigo-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="logo-purple-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
          </defs>
          
          {/* Ribbon 1: Top Right */}
          <path 
            d="M 50 15 C 75 15, 85 25, 85 50 C 85 45, 75 35, 55 35 L 40 35 C 35 35, 30 30, 30 25 C 30 15, 40 15, 50 15 Z" 
            fill="url(#logo-blue-cyan)"
            className="origin-center rotate-[0deg]"
          />
          <circle cx="85" cy="50" r="7" fill="url(#logo-blue-cyan)" className="origin-center rotate-[0deg]" />

          {/* Ribbon 2: Bottom / Left */}
          <path 
            d="M 50 15 C 75 15, 85 25, 85 50 C 85 45, 75 35, 55 35 L 40 35 C 35 35, 30 30, 30 25 C 30 15, 40 15, 50 15 Z" 
            fill="url(#logo-indigo-blue)"
            className="origin-center rotate-[120deg]"
          />
          <circle cx="85" cy="50" r="7" fill="url(#logo-indigo-blue)" className="origin-center rotate-[120deg]" />

          {/* Ribbon 3: Top Left */}
          <path 
            d="M 50 15 C 75 15, 85 25, 85 50 C 85 45, 75 35, 55 35 L 40 35 C 35 35, 30 30, 30 25 C 30 15, 40 15, 50 15 Z" 
            fill="url(#logo-purple-indigo)"
            className="origin-center rotate-[240deg]"
          />
          <circle cx="85" cy="50" r="7" fill="url(#logo-purple-indigo)" className="origin-center rotate-[240deg]" />

        </svg>
      </div>
      {showText && (
        <div className="flex flex-col justify-center">
          <span className="text-[28px] font-bold text-white leading-none tracking-wide">DELVARO</span>
          <span className="text-[10px] font-bold text-indigo-400 tracking-[0.15em] uppercase mt-1 leading-none">
            Lead Generation AI Agency
          </span>
        </div>
      )}
    </div>
  );
}
