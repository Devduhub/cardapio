"use client";

import React, { useState } from "react";
import { Cake } from "lucide-react";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "light", className = "" }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`relative flex items-center gap-3 select-none ${className}`}>
      {!imgError ? (
        <img
          src="/logo-transparent.png"
          alt="Jeny Confeitaria Gourmet"
          onError={() => setImgError(true)}
          className="h-10 md:h-12 w-auto object-contain transition-transform duration-200 hover:scale-105"
        />
      ) : (
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FBF59C] via-[#E8D777] to-[#B89726] p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#011D4D] rounded-[10px] flex items-center justify-center text-[#E8D777]">
              <Cake size={20} className="stroke-[2.2]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-extrabold tracking-wider text-xl leading-none ${
              variant === "light" ? "text-white" : "text-[#011D4D]"
            }`}>
              JENY
            </span>
            <span className={`text-[9px] font-bold tracking-[0.22em] uppercase mt-0.5 ${
              variant === "light" ? "text-[#E8D777]" : "text-[#B89726]"
            }`}>
              Confeitaria Gourmet
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
