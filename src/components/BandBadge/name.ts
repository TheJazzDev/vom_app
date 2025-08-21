import { Bands } from "@/src/enum";

export const getBandDisplayName = (band: string) => {
    switch (band) {
      case Bands.Choir:
        return 'Choir';
      case Bands.LoveDevine:
        return 'Love Divine';
      case Bands.YouthFellowship:
        return 'Youth Fellowship';
      case Bands.Deborah:
        return 'Deborah';
      case Bands.Daniel:
        return 'Daniel';
      case Bands.QueenEsther:
        return 'Esther';
      case Bands.GoodWomen:
        return 'Good Women';
      case Bands.Warden:
        return 'Warden';
      case Bands.JohnBeloved:
        return 'John Beloved';
      case Bands.HolyMary:
        return 'Holy Mary'
      default:
        return band;
    }
  };