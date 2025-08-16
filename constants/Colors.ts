/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Brand-based color variables
const brandColor = '#0780f2';
const backgroundLight = '#F9FAFB';
const backgroundDark = '#121318';
const textLight = '#11181C';
const textDark = '#ECEDEE';
const iconLight = '#4B5563';
const iconDark = '#9CA3AF';
const tabIconDefaultLight = '#9CA3AF';
const tabIconDefaultDark = '#6B7280';
// const navBackgroundLight = '#FFFFFF';
// const navBackgroundDark = '#201e2b';
const iconSecondaryLight = '#6B7280';
const iconSecondaryDark = '#86838F';
const logoBackgroundLight = '#A1CEDC';
const logoBackgroundDark = '#1D3D47';

// Colors object using variables
export const Colors = {
  light: {
    text: textLight,
    background: backgroundLight,
    tint: brandColor,
    icon: iconLight,
    tabIconDefault: tabIconDefaultLight,
    tabIconSelected: brandColor,
    iconColorFocused: brandColor,
    // navBackground: navBackgroundLight,
    iconColor: iconSecondaryLight,
    logoBackground: logoBackgroundLight,
    uiBackground: backgroundLight,
  },
  dark: {
    text: textDark,
    background: backgroundDark,
    tint: brandColor,
    icon: iconDark,
    tabIconDefault: tabIconDefaultDark,
    tabIconSelected: brandColor,
    iconColorFocused: brandColor,
    // navBackground: navBackgroundDark,
    iconColor: iconSecondaryDark,
    logoBackground: logoBackgroundDark,
    uiBackground: backgroundDark,
  },
};
