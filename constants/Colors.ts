/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Brand-based color variables
const brandColor = '#0780f2';
const backgroundLight = '#F9FAFB';
const backgroundDark = '#010101';
const textLight = '#11181C';
const textDark = '#C9D2D9';
const iconLight = '#4B5563';
const iconDark = '#9CA3AF';
const secondaryBackgroundLight = '#FFFFFF';
const secondaryBackgroundDark = '#161B21';
const inactiveTintLight = '#6B7280';
const inactiveTintDark = '#9E9E9E';
const logoBackgroundLight = '#A1CEDC';
const logoBackgroundDark = '#1D3D47';

// Colors object using variables
export const Colors = {
  light: {
    border: textLight,
    card: secondaryBackgroundLight,
    text: textLight,
    background: backgroundLight,
    icon: iconLight,
    activeTint: brandColor,
    uiBackground: backgroundLight,
    inactiveTint: inactiveTintLight,
    navBackground: secondaryBackgroundLight,
    logoBackground: logoBackgroundLight,
  },
  dark: {
    border: textDark,
    card: secondaryBackgroundDark,
    text: textDark,
    background: backgroundDark,
    icon: iconDark,
    activeTint: brandColor,
    uiBackground: backgroundDark,
    inactiveTint: inactiveTintDark,
    navBackground: secondaryBackgroundDark,
    logoBackground: logoBackgroundDark,
  },
};
