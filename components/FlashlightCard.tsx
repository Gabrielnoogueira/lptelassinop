"use client";

import type { MouseEvent, ReactNode } from "react";

export default function FlashlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div onMouseMove={onMove} className={`flashlight-card ${className}`}>
      {children}
    </div>
  );
}
