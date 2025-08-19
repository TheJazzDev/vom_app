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
      case Bands.Esther:
        return 'Esther';
      case Bands.GoodWomen:
        return 'Good Women';
      case Bands.Warden:
        return 'Warden';
      default:
        return band;
    }
  };