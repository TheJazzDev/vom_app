declare global {
  type DirectoryProps = {
    title: string;
    description: string;
    route: RouteValues;
    icon: IconSymbolName;
    count: string;
    gradient: GradientColor;
  };
}

export {};
