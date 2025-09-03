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
  // Existing mappings
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
  checkmark: 'checkmark',

  // Icons used in onboarding, coming soon, and activation pages
  'building.2': 'business-outline',
  'bell.badge': 'notifications-outline',
  heart: 'heart-outline',
  'person.badge.key': 'key-outline',
  'person.circle': 'person-circle-outline',
  'envelope.badge.fill': 'mail',
  'paperplane.fill': 'send',
  'checkmark.circle.fill': 'checkmark-circle',
  sparkles: 'sparkles-outline',
  'xmark.circle.fill': 'close-circle',
  'person.2.slash': 'people-outline',
  'quote.opening': 'chatbubble-outline',
  'calendar.badge.clock': 'time',
  gear: 'settings-outline',
  'person.2': 'people-outline',
  'moon.stars': 'moon',
  'sun.max': 'sunny-outline',
  'chevron.left': 'chevron-back',
  'chevron.right': 'chevron-forward',
  'square.grid.2x2': 'grid-outline',
  'list.bullet': 'list-outline',
  'music.note': 'musical-note-outline',
  key: 'key-outline',

  // Church-specific icons you'll likely need (commented out until needed)
  // 'cross.fill': 'add-circle', // Cross/religious symbol
  // 'music.note.list': 'list-outline', // Hymn lists
  // 'doc.text.fill': 'document-text', // Sermon notes
  // 'video.fill': 'videocam', // Live streaming
  // 'mic.fill': 'mic', // Audio/sermons
  // 'heart.fill': 'heart', // Favorites/liked
  // 'star.fill': 'star', // Featured content
  // 'bookmark.fill': 'bookmark', // Saved items
  // 'share': 'share-outline', // Share functionality
  // 'download': 'download-outline', // Download sermons/content
  // 'headphones': 'headset-outline', // Audio content
  // 'tv': 'tv-outline', // Video content
  // 'wifi': 'wifi-outline', // Connectivity
  // 'cloud.fill': 'cloud', // Cloud storage
  // 'folder.fill': 'folder', // File organization
  // 'tag.fill': 'pricetag', // Categories/tags
  // 'clock.arrow.circlepath': 'refresh-circle-outline', // Refresh/sync
  // 'arrow.up.arrow.down': 'swap-vertical-outline', // Sort/reorder
  // 'slider.horizontal.3': 'options-outline', // Filters/settings
  // 'plus.circle.fill': 'add-circle', // Add new content
  // 'minus.circle.fill': 'remove-circle', // Remove content
  // 'pencil': 'create-outline', // Edit functionality
  // 'trash.fill': 'trash', // Delete functionality
  // 'arrow.clockwise': 'refresh-outline', // Refresh
  // 'arrow.counterclockwise': 'reload-outline', // Undo
  // 'exclamationmark.triangle': 'warning-outline', // Warnings
  // 'questionmark.circle': 'help-circle-outline', // Help/FAQ
  // 'dollarsign.circle': 'card-outline', // Donations/giving
  // 'creditcard.fill': 'card', // Payment methods
  // 'gift.fill': 'gift-outline', // Special offerings
  // 'camera.fill': 'camera', // Photo features
  // 'photo.fill': 'image', // Gallery/photos
  // 'map': 'map-outline', // Location/directions
  // 'car.fill': 'car', // Transportation
  // 'house.and.flag.fill': 'flag', // Church location
  // 'graduationcap.fill': 'school-outline', // Education/classes
  // 'books.vertical.fill': 'library-outline', // Resources
  // 'newspaper.fill': 'newspaper-outline', // News/announcements
  // 'megaphone.fill': 'megaphone', // Announcements
  // 'speaker.wave.2.fill': 'volume-medium', // Audio controls
  // 'speaker.slash.fill': 'volume-mute', // Mute
  // 'pause.fill': 'pause', // Media controls
  // 'stop.fill': 'stop', // Media controls
  // 'forward.fill': 'play-forward', // Media controls
  // 'backward.fill': 'play-back', // Media controls
  // 'goforward.15': 'play-forward-outline', // Skip forward
  // 'gobackward.15': 'play-back-outline', // Skip backward
} satisfies IconMapping;

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
