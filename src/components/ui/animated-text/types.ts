
export interface AnimatedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
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

export interface UseAnimatedTextProps {
  text: string;
  reveal?: AnimatedTextProps['reveal'];
  elementRef: React.RefObject<HTMLSpanElement>;
}
