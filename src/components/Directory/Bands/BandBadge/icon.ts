import { BandKeysEnum } from '@/src/enum';

export const getBandIcon = (band: string) => {
  switch (band) {
    case BandKeysEnum.CHOIR:
      return '🎵';
    case BandKeysEnum.LOVE_DIVINE:
      return '💚';
    case BandKeysEnum.DEBORAH:
      return '🌸';
    case BandKeysEnum.DANIEL:
      return '⚡';
    case BandKeysEnum.QUEEN_ESTHER:
      return '👑';
    case BandKeysEnum.GOOD_WOMEN:
      return '🤲';
    case BandKeysEnum.WARDEN:
      return '🛡️';
    case BandKeysEnum.JOHN_BELOVED:
      return '💛';
    case BandKeysEnum.HOLY_MARY:
      return '🙏';
    case BandKeysEnum.FAITH:
      return '✝️';
    default:
      return '⭐';
  }
};
