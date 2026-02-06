declare global {
  type DayOfWeek =
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';

  type WeekOfMonth = 'First' | 'Second' | 'Third' | 'Fourth' | 'Last';

  interface WeeklyActivity {
    id: string;
    title: string;
    description?: string;
    dayOfWeek: DayOfWeek;
    dayOfWeekIndex: number;
    time: string;
    location?: string;
    isActive: boolean;
  }

  interface MonthlyActivity {
    id: string;
    title: string;
    description?: string;
    weekOfMonth: WeekOfMonth;
    weekOfMonthIndex: number;
    dayOfWeek: DayOfWeek;
    dayOfWeekIndex: number;
    time: string;
    location?: string;
    isActive: boolean;
  }
}

export {};
