
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedTextProps } from "./types";
import { useAnimatedText } from "./use-animated-text";
import { getAnimationClasses, sizeClasses } from "./utils";

export const AnimatedText = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      text,
      className,
      direction = "up",
      reverse = false,
      delay = 0,
      duration = 0.5,
      size = "md",
      reveal,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const elementRef = React.useRef<HTMLSpanElement>(null);
    const finalRef = ref || elementRef;

    const { textArray, isVisible } = useAnimatedText({
      text,
      reveal,
      elementRef: finalRef as React.RefObject<HTMLSpanElement>,
    });

    return (
      <span
        ref={finalRef}
        className={cn("inline-block", sizeClasses[size], className)}
        {...props}
      >
        {reveal?.type ? (
          <span className="inline-block">
            {textArray.map((item, i) => (
              <span
                key={`${id}-${i}`}
                className={getAnimationClasses(i, isVisible, direction, reveal, delay, duration, reverse)}
                style={{
                  animationDelay: `${delay + ((reveal?.stagger || 0.1) * i)}s`,
                  animationDuration: `${reveal?.duration || duration}s`,
                  animationFillMode: "forwards",
                }}
              >
                {item}
              </span>
            ))}
          </span>
        ) : (
          <span
            className={cn(
              "inline-block",
              {
                "animate-text-slide-up-fade": direction === "up" && isVisible,
                "animate-text-slide-down-fade": direction === "down" && isVisible,
                "animate-text-slide-left-fade": direction === "left" && isVisible,
                "animate-text-slide-right-fade": direction === "right" && isVisible,
                "opacity-0": !isVisible,
                "opacity-100": isVisible,
              }
            )}
            style={{
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              animationDirection: reverse ? "reverse" : "normal",
              animationFillMode: "forwards",
            }}
          >
            {text}
          </span>
        )}
      </span>
    );
  }
);

AnimatedText.displayName = "AnimatedText";
