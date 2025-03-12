
"use client";

import * as React from "react";
import { UseAnimatedTextProps } from "./types";

export function useAnimatedText({ text, reveal, elementRef }: UseAnimatedTextProps) {
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
  }, [reveal?.noRepeat, reveal?.startOn, elementRef]);

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
          threshold: reveal?.threshold || 0.1,
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
  }, [reveal?.noRepeat, reveal?.startOn, reveal?.threshold, elementRef]);

  return { textArray, isVisible };
}
