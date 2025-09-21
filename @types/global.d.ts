declare global {
  type TextVariant =
    | 'text'
    | 'paragraph'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'caption'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
    | 'body'
    | 'body2'
    | 'button'
    | 'label';

  type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'info';

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

  export type TitleCategory =
    | 'Pro'
    | 'Pst'
    | 'S/M/I/I'
    | 'M/I/I'
    | 'Ald'
    | 'Bro'
    | 'Sis';

  export interface GroupedMembers {
    title: TitleCategory;
    members: UserProfile[];
    count: number;
  }
}

export {};
