
"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showBlur?: boolean;
  className?: string;
  containerClassName?: string;
  colorClassName?: string;
}

export function AuroraBackground({
  children,
  className,
  containerClassName,
  colorClassName,
  showBlur = true,
  ...props
}: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden h-full w-full",
        containerClassName
      )}
      style={{
        width: "100%",
        height: "100%",
      }}
      {...props}
    >
      <div
        className={cn(
          "aurora-blur absolute -inset-0 opacity-50",
          {
            "blur-lg": showBlur,
          },
          colorClassName
        )}
        style={{
          position: "absolute",
          inset: "-20px",
          opacity: "0.5",
          backgroundImage: `
            radial-gradient(
              circle at ${(cursorPosition.x / containerSize.width) * 100}% ${
            (cursorPosition.y / containerSize.height) * 100
          }%,
              var(--aurora-color-1),
              var(--aurora-color-2),
              var(--aurora-color-3)
            )
          `,
        }}
      />
      <div className={cn("relative z-10 h-full w-full", className)}>
        {children}
      </div>
    </div>
  );
}
