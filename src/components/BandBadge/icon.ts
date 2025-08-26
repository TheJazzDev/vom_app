import { Bands } from '@/src/enum';

export const getBandIcon = (band: string) => {
  switch (band) {
    case Bands.Choir:
      return '🎵'; // ✅ Choir = Music
    case Bands.LoveDevine:
      return '💚'; // ✅ Love = Heart works
    case Bands.YouthFellowship:
      return '✨'; // ✅ Youth = Energy, Sparkle works
    case Bands.Deborah:
      return '🌸'; // ✅ Changed: flower (🌹) → blossom (🌸) to reflect feminine leadership
    case Bands.Daniel:
      return '⚡'; // ✅ Daniel = Power, boldness
    case Bands.QueenEsther:
      return '👑'; // ✅ Esther = Queen, crown works
    case Bands.GoodWomen:
      return '🤲'; // ✅ Changed: (🌟) → (🤲) symbolizing care, nurturing women
    case Bands.Warden:
      return '🛡️'; // ✅ Warden = Protection, shield works
    case Bands.JohnBeloved:
      return '❤️'; // ✅ Changed: (🛡️) → (❤️) John the beloved = love
    case Bands.HolyMary:
      return '🙏'; // ✅ Changed: (🛡️) → (🙏) Holy Mary = devotion, prayer
    default:
      return '⭐'; // fallback
  }
};
