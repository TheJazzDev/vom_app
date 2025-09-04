declare global {
  type ChurchInfoProps = {
    title: string;
    description: string;
    route: RouteValues;
    icon: IconSymbolName;
    badge: string;
    gradient: GradientColor;
  };

  type QuickInfoProps = {
    title: string;
    items: string[];
    icon: IconSymbolName;
  };
}

export {};
