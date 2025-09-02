export const getProgrammeTimes = () => ({
  sunday: {
    start: 7 * 60, // 9:00 AM
    end: 13 * 60, // 12:00 PM
  },
  shilo: {
    start: 9 * 60, // 6:00 PM
    end: 13 * 60, // 8:00 PM
  },
  vigil: {
    start: 23 * 60, // 10:00 PM
    end: 5 * 60 + 24 * 60, // 2:00 AM next day
  },
});
