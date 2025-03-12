
export const textAnimationKeyframes = {
  "text-slide-up-fade": {
    "0%": {
      opacity: "0",
      transform: "translateY(2rem)",
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
  "text-slide-down-fade": {
    "0%": {
      opacity: "0",
      transform: "translateY(-2rem)",
    },
    "100%": {
      opacity: "1",
      transform: "translateY(0)",
    },
  },
  "text-slide-left-fade": {
    "0%": {
      opacity: "0",
      transform: "translateX(2rem)",
    },
    "100%": {
      opacity: "1",
      transform: "translateX(0)",
    },
  },
  "text-slide-right-fade": {
    "0%": {
      opacity: "0",
      transform: "translateX(-2rem)",
    },
    "100%": {
      opacity: "1",
      transform: "translateX(0)",
    },
  },
  aurora: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export const textAnimations = {
  "text-slide-up-fade": "text-slide-up-fade 0.5s ease forwards",
  "text-slide-down-fade": "text-slide-down-fade 0.5s ease forwards",
  "text-slide-left-fade": "text-slide-left-fade 0.5s ease forwards",
  "text-slide-right-fade": "text-slide-right-fade 0.5s ease forwards",
  aurora: "aurora 20s linear infinite",
};
