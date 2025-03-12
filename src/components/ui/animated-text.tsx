
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  reverse?: boolean;
  delay?: number;
  duration?: number;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  // Options for text reveal
  reveal?: {
    type?: "characters" | "words" | "lines";
    delay?: number;
    duration?: number;
    threshold?: number;
    noRepeat?: boolean;
    stagger?: number;
    startOn?: "hover" | "mount" | "scroll";
  };
}

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
    const textArray = React.useMemo(() => {
      return reveal?.type === "words" 
        ? text.split(" ").map(word => word + " ")
        : reveal?.type === "lines"
        ? text.split("\n")
        : reveal?.type === "characters"
        ? text.split("")
        : [text];
    }, [text, reveal?.type]);

    const [isVisible, setIsVisible] = React.useState(
      reveal?.startOn === "mount" || !reveal?.startOn
    );
    const elementRef = React.useRef<HTMLSpanElement>(null);
    const finalRef = ref || elementRef;

    // Handle visibility on hover
    React.useEffect(() => {
      if (reveal?.startOn === "hover") {
        const element = elementRef.current;
        if (!element) return;

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => !reveal.noRepeat && setIsVisible(false);

        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }, [reveal?.noRepeat, reveal?.startOn]);

    // Handle visibility on scroll
    React.useEffect(() => {
      if (reveal?.startOn === "scroll") {
        const observer = new IntersectionObserver(
          (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (reveal.noRepeat) {
                observer.disconnect();
              }
            } else if (!reveal.noRepeat) {
              setIsVisible(false);
            }
          },
          {
            threshold: reveal.threshold || 0.1,
          }
        );

        const element = elementRef.current;
        if (element) {
          observer.observe(element);
        }

        return () => {
          if (element) {
            observer.unobserve(element);
          }
        };
      }
    }, [reveal?.noRepeat, reveal?.startOn, reveal?.threshold]);

    const getAnimationClasses = (index: number) => {
      const stagger = reveal?.stagger ?? 0.1;
      const baseDelay = delay + (reveal?.delay || 0);
      const staggerDelay = stagger * index;
      const totalDelay = baseDelay + staggerDelay;

      const baseClasses = "opacity-0 inline-block";
      
      if (!isVisible) return baseClasses;

      const directionClasses = {
        up: "animate-text-slide-up-fade",
        down: "animate-text-slide-down-fade",
        left: "animate-text-slide-left-fade",
        right: "animate-text-slide-right-fade",
      };

      const animationClass = directionClasses[direction];
      
      const style = {
        animationDelay: `${totalDelay}s`,
        animationDuration: `${reveal?.duration || duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
        animationFillMode: "forwards",
      };

      return cn(baseClasses, animationClass, { "opacity-100": isVisible });
    };

    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    };

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
                className={getAnimationClasses(i)}
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
