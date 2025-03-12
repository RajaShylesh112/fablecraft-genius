
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GlowEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  position?: "center" | "top" | "bottom" | "left" | "right";
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  intensity?: "low" | "medium" | "high";
  containerClassName?: string;
  children: React.ReactNode;
}

export function GlowEffect({
  className,
  position = "center",
  size = "md",
  color = "hsl(var(--primary))",
  intensity = "medium",
  containerClassName,
  children,
  ...props
}: GlowEffectProps) {
  const positionStyles = {
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    top: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/4",
    bottom: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/4",
    left: "left-0 top-1/2 -translate-x-1/4 -translate-y-1/2",
    right: "right-0 top-1/2 translate-x-1/4 -translate-y-1/2",
  };

  const sizeStyles = {
    sm: "h-32 w-32",
    md: "h-64 w-64",
    lg: "h-96 w-96",
    xl: "h-[32rem] w-[32rem]",
  };

  const intensityStyles = {
    low: "opacity-30 blur-2xl",
    medium: "opacity-50 blur-3xl",
    high: "opacity-70 blur-[64px]",
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <div
        className={cn(
          "pointer-events-none absolute",
          positionStyles[position],
          sizeStyles[size],
          intensityStyles[intensity],
          "rounded-full",
          className
        )}
        style={{
          background: color,
          transform: positionStyles[position]
            ? `translate(${positionStyles[position]
                .match(/-translate-x-(\d+\/\d+|-\d+\/\d+)/)?.[0] || "0"}, 
               ${positionStyles[position]
                .match(/-translate-y-(\d+\/\d+|-\d+\/\d+)/)?.[0] || "0"})`
            : "none",
          willChange: "transform opacity",
        }}
        {...props}
      />
      {children}
    </div>
  );
}
