
import { cn } from "@/lib/utils";
import { AnimatedTextProps } from "./types";

export const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

export function getAnimationClasses(
  index: number,
  isVisible: boolean,
  direction: AnimatedTextProps['direction'],
  reveal?: AnimatedTextProps['reveal'],
  delay: number = 0,
  duration: number = 0.5,
  reverse: boolean = false
) {
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

  const animationClass = directionClasses[direction || 'up'];
  
  return cn(baseClasses, animationClass, { "opacity-100": isVisible });
}
