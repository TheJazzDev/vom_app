import { Ionicons } from '@expo/vector-icons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Partial<
  Record<SymbolViewProps['name'], ComponentProps<typeof Ionicons>['name']>
>;

export type IconSymbolName = keyof typeof MAPPING;

const MAPPING: IconMapping = {
  // Basic interface icons
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
  bell: 'notifications-outline',
  'envelope.fill': 'mail',
  envelope: 'mail-outline',
  magnifyingglass: 'search-outline',
  lock: 'lock-closed-outline',
  eye: 'eye-outline',
  'eye.slash': 'eye-off-outline',
  'moon.fill': 'moon',
  'sun.max.fill': 'sunny',
  'sun.max': 'sunny-outline',
  'circle.lefthalf.fill': 'contrast',
  phone: 'call-outline',
  'phone.fill': 'call',
  shield: 'shield-outline',
  'shield.checkered': 'shield-checkmark',
  'shield.lefthalf.filled': 'shield-half',
  'message.badge.fill': 'chatbubble-ellipses',
  'location.circle': 'location-outline',
  location: 'location-outline',
  'location.fill': 'location',
  'birthday.cake': 'happy',
  'timer.square': 'time-outline',
  'info.bubble.fill': 'information-circle',
  'info.circle': 'information-circle-outline',
  'info.circle.fill': 'information-circle',
  calendar: 'calendar-outline',
  'calendar.circle.fill': 'calendar',
  'calendar.badge.plus': 'calendar',
  'calendar.badge.clock': 'time',
  'calendar.badge.exclamationmark': 'calendar',
  'clock.circle': 'time-outline',
  clock: 'time-outline',
  'clock.fill': 'time',
  'clock.badge.checkmark': 'checkmark-circle',
  'clock.arrow.circlepath': 'refresh-circle-outline',
  checkmark: 'checkmark',
  'checkmark.circle': 'checkmark-circle-outline',
  'checkmark.circle.fill': 'checkmark-circle',
  'checkmark.seal.fill': 'checkmark-done-circle',
  'xmark.circle.fill': 'close-circle',
  'chevron.left': 'chevron-back',
  'chevron.right': 'chevron-forward',
  'chevron.up': 'chevron-up',
  'chevron.down': 'chevron-down',
  'arrow.left': 'arrow-back',
  'arrow.right': 'arrow-forward',
  'arrow.up': 'arrow-up',
  'arrow.down': 'arrow-down',
  'arrow.backward': 'arrow-back',
  'arrow.clockwise': 'refresh-outline',
  'arrow.counterclockwise': 'reload-outline',
  'arrow.right.circle.fill': 'arrow-forward-circle',
  plus: 'add-outline',
  'plus.circle.fill': 'add-circle',
  'minus.circle.fill': 'remove-circle',

  // Church and ministry specific icons
  'cross.fill': 'add-outline',
  'megaphone.fill': 'megaphone',
  megaphone: 'megaphone-outline',
  'book.fill': 'book',
  book: 'book-outline',
  'books.vertical.fill': 'library',
  'music.note': 'musical-note-outline',
  'music.note.list': 'list',
  'play.circle.fill': 'play-circle',
  'pause.fill': 'pause',
  'stop.fill': 'stop',
  'forward.fill': 'play-forward',
  'backward.fill': 'play-back',
  'hand.palm.facing.fill': 'hand-left',
  'hands.clap.fill': 'hand-right',
  'hands.sparkles': 'sparkles',
  'hands.sparkles.fill': 'sparkles',
  'quote.bubble.fill': 'chatbubbles',
  'quote.bubble': 'chatbubbles-outline',
  'heart.fill': 'heart',
  heart: 'heart-outline',
  'star.fill': 'star',
  star: 'star-outline',
  'star.circle.fill': 'star-half',
  'crown.fill': 'rose',
  sparkles: 'sparkles-outline',
  'trophy.fill': 'trophy',
  'shield.fill': 'shield',
  'person.fill.questionmark.ar': 'person-remove',

  // People and community icons
  'person.2': 'people-outline',
  'person.2.fill': 'people',
  'person.3.fill': 'people',
  'person.badge.plus': 'person-add',
  'person.circle': 'person-circle-outline',
  'person.crop.circle.fill': 'person-circle',
  'person.fill.checkmark': 'person-add',
  'figure.wave': 'hand-right',
  'figure.2.and.child.holdinghands': 'people-circle',
  'graduationcap.fill': 'school',

  // Media and content icons
  'camera.fill': 'camera',
  'photo.fill': 'image',
  'video.fill': 'videocam',
  'mic.fill': 'mic',
  headphones: 'headset-outline',
  tv: 'tv-outline',
  'speaker.wave.2.fill': 'volume-medium',
  'speaker.wave.3.fill': 'volume-high',
  'speaker.slash.fill': 'volume-mute',

  // Building and location icons
  'building.2': 'business-outline',
  'building.2.fill': 'business',
  'house.and.flag.fill': 'flag',
  map: 'map-outline',
  'car.fill': 'car',

  // Communication and notification icons
  'bubble.left.and.bubble.right.fill': 'chatbubbles',
  'newspaper.fill': 'newspaper',
  'bell.badge': 'notifications',

  // Action and utility icons
  menucard: 'menu',
  'sidebar.leading': 'menu-outline',
  'rectangle.portrait.and.arrow.right': 'log-out-outline',
  'rectangle.portrait.and.arrow.right.fill': 'log-out',
  'square.grid.2x2': 'grid-outline',
  'list.bullet': 'list-outline',
  'list.bullet.rectangle': 'reader',
  gear: 'settings-outline',
  key: 'key-outline',
  'person.badge.key': 'key',
  'envelope.badge.fill': 'mail',
  'paperplane.fill': 'send',
  'folder.fill': 'folder',
  'tag.fill': 'pricetag',
  'bookmark.fill': 'bookmark',
  'slider.horizontal.3': 'options-outline',
  pencil: 'create-outline',
  'trash.fill': 'trash',
  'doc.text.fill': 'document-text',

  // Status and warning icons
  'exclamationmark.triangle': 'warning-outline',
  'exclamationmark.triangle.fill': 'warning',
  'questionmark.circle': 'help-circle-outline',
  wifi: 'wifi-outline',
  'cloud.fill': 'cloud',

  // Financial icons
  'dollarsign.circle': 'card-outline',
  'dollarsign.circle.fill': 'card',
  'creditcard.fill': 'card',
  'gift.fill': 'gift',

  // Special icons used in designs
  'theatermasks.fill': 'happy-outline',
  desktopcomputer: 'desktop-outline',
  'sun.and.horizon.fill': 'sunny',
  'heart.text.square.fill': 'heart',
  'chart.bar': 'bar-chart-outline',
  'number.circle': 'radio-button-on-outline',
  'phone.badge.plus': 'call',
  'person.2.slash': 'people-outline',
  'moon.stars': 'moon',
  'arrow.up.arrow.down': 'swap-vertical-outline',
  'goforward.15': 'play-forward-outline',
  'gobackward.15': 'play-back-outline',
  'x.circle': 'close-outline',
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
