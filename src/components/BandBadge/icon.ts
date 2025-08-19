import { Bands } from "@/src/enum";

export const getBandIcon = (band: string) => {
  switch (band) {
    case Bands.Choir:
      return '🎵';
    case Bands.LoveDevine:
      return '💚';
    case Bands.YouthFellowship:
      return '✨';
    case Bands.Deborah:
      return '🌹';
    case Bands.Daniel:
      return '⚡';
    case Bands.Esther:
      return '👑';
    case Bands.GoodWomen:
      return '🌟';
    case Bands.Warden:
      return '🛡️';
    default:
      return '⭐';
  }
};