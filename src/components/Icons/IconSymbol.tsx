// Fallback for using MaterialIcons on Android and web.

import { Ionicons } from '@expo/vector-icons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// Allow a partial mapping instead of requiring all SF Symbols
type IconMapping = Partial<
  Record<SymbolViewProps['name'], ComponentProps<typeof Ionicons>['name']>
>;

export type IconSymbolName = keyof typeof MAPPING;
/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: IconMapping = {
  'house.fill': 'home',
  house: 'home-outline',
  'person.fill': 'person',
  person: 'person-outline',
  'gearshape.fill': 'settings',
  gearshape: 'settings-outline',
  'person.3.sequence.fill': 'people',
  'person.3.sequence': 'people-outline',
  'list.bullet.clipboard.fill': 'reader',
  'list.bullet.clipboard': 'reader-outline',
  'bell.fill': 'notifications',
  'envelope.fill': 'mail',
  envelope: 'mail-outline',
  magnifyingglass: 'search-outline',
  lock: 'lock-closed-outline',
  eye: 'eye-outline',
  'eye.slash': 'eye-off-outline',
  'moon.fill': 'moon',
  'sun.max.fill': 'sunny',
  'circle.lefthalf.fill': 'contrast',
  phone: 'call-outline',
  shield: 'shield',
  'shield.checkered': 'shield-checkmark-sharp',
  'phone.fill': 'call',
  'message.badge.fill': 'chatbubble-ellipses',
  'location.circle': 'location-outline',
  'birthday.cake': 'happy',
  'timer.square': 'time-outline',
  'info.bubble.fill': 'information-circle',
  calendar: 'calendar-outline',
  'clock.circle': 'time-outline',
  'megaphone.fill': 'megaphone',
  'book.fill': 'book',
  book: 'book-outline',
  'play.circle.fill': 'play-circle',
  'hand.palm.facing.fill': 'hand-left',
  'hands.clap.fill': 'hand-right',
  'hands.sparkles': 'sparkles',
  'hands.sparkles.fill': 'sparkles',
  menucard: 'menu',
  'sidebar.leading': 'menu-outline',
  'calendar.circle.fill': 'calendar',
  megaphone: 'megaphone-outline',
  'quote.bubble.fill': 'chatbubbles',
  'quote.bubble': 'chatbubbles-outline',
  bell: 'notifications-outline',
  'rectangle.portrait.and.arrow.right': 'log-out-outline',
  'rectangle.portrait.and.arrow.right.fill': 'log-out',
  'info.circle': 'information',
  'arrow.backward': 'arrow-back',
  // 'phone.fill': 'phone-landscape',
} satisfies IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  size?: number;
  name: IconSymbolName;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <Ionicons color={color} size={size} name={MAPPING[name]} style={style} />
  );
}
