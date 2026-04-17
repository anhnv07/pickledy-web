export interface DesignSystemColors {
  palette: {
    bgPrimaryCore: string;
    bgTertiaryCore: string;

    bgPrimaryLuxe: string;
    bgPrimaryPlus: string;

    textPrimary: string;
    textFocused: string;
    textSecondary: string;
    textDisabled: string;
    textLinkDisabled: string;
    textLegal: string;

    textError: string;
    textErrorHover: string;

    surfacePrimary: string;
    surfaceSecondary: string;
    borderDefault: string;
  };

  semantic: {
    bg: string;
    surface: string;
    surfaceMuted: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
    accentPressed: string;
    danger: string;
  };
}

export interface DesignSystemSpacing {
  2: string;
  3: string;
  4: string;
  6: string;
  8: string;
  10: string;
  11: string;
  12: string;
  15: string;
  16: string;
  22: string;
  24: string;
  32: string;
}

export interface DesignSystemRadii {
  subtle: string;
  standard: string;
  badge: string;
  card: string;
  large: string;
  full: string;
  circle: string;
}

export interface DesignSystemShadows {
  card: string;
  hover: string;
}

export interface DesignSystemTypography {
  fontFamilySans: string;
  fontWeights: {
    medium: number;
    semibold: number;
    bold: number;
  };
  fontSizes: {
    sectionHeading: string;
    cardHeading: string;
    subheading: string;
    featureTitle: string;
    ui: string;
    body: string;
    small: string;
    tag: string;
    badge: string;
    micro: string;
  };
  lineHeights: {
    sectionHeading: number;
    cardHeading: number;
    featureTitle: number;
    ui: number;
    body: number;
    bodyMedium: number;
    small: number;
    tag: number;
    badge: number;
    micro: number;
  };
  letterSpacing: {
    headingTight: string;
    heading: string;
    microUppercase: string;
  };
}

export interface DesignSystemMotion {
  easeStandard: string;
  durationFast: string;
  durationMedium: string;
  focusScale: number;
}

export interface DesignSystemTokens {
  colors: DesignSystemColors;
  spacing: DesignSystemSpacing;
  radii: DesignSystemRadii;
  shadows: DesignSystemShadows;
  typography: DesignSystemTypography;
  motion: DesignSystemMotion;
}

