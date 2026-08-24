"use client";

import { useRef, type ElementType, type MouseEvent, type ReactNode } from "react";

type SpotlightTag = "div" | "article" | "section" | "aside";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  as?: SpotlightTag;
}

/**
 * Card with a cursor-tracking radial highlight (CSS custom properties
 * --spot-x / --spot-y consumed by the .spotlight-card styles in globals.css).
 */
export function SpotlightCard({ children, className, as = "div" }: SpotlightCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Component = as as ElementType;

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <Component ref={ref} onMouseMove={handleMouseMove} className={`spotlight-card ${className ?? ""}`}>
      {children}
    </Component>
  );
}
