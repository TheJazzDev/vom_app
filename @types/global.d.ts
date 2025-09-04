declare global {
  type GradientColor = [ColorValue, ColorValue, ...ColorValue[]];

  export interface OnboardingSlide {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    iconColor: string;
    backgroundColor: string;
    accentColor: string;
  }
}

export {};
