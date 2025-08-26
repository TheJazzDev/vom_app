import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Badge } from './Badge';

type CountdownProps = {
  targetDate: string; // The program date
};

function formatTimeUnit(value: number, unit: string) {
  if (value <= 0) return '';
  return `${value} ${value === 1 ? unit : unit + 's'}`;
}

function formatTimeUnitWithPadding(value: number, unit: string) {
  // Pad seconds with leading zero, keep others as is
  const displayValue =
    unit === 'sec'
      ? Math.max(0, value).toString().padStart(2, '0')
      : Math.max(0, value);
  const pluralUnit = Math.max(0, value) === 1 ? unit : unit + 's';
  return `${displayValue} ${pluralUnit}`;
}

// Function to calculate accurate date differences
function getAccurateDateDifference(now: Date, target: Date) {
  let years = target.getFullYear() - now.getFullYear();
  let months = target.getMonth() - now.getMonth();
  let days = target.getDate() - now.getDate();
  let hours = target.getHours() - now.getHours();
  let minutes = target.getMinutes() - now.getMinutes();
  let seconds = target.getSeconds() - now.getSeconds();

  // Handle negative values by borrowing from higher units
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    // Borrow from previous month
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds };
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ text: string; type: string }>({
    text: '',
    type: '',
  });

  useEffect(() => {
    const date = new Date(targetDate);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = date.getTime() - now.getTime();

      if (diff < 0) {
        setTimeLeft({ text: 'Started', type: 'started' });
        clearInterval(interval);
        return;
      }

      const { years, months, days, hours, minutes, seconds } =
        getAccurateDateDifference(now, date);

      let display = '';
      let displayType = '';

      if (years > 0 || months > 0) {
        // Show months and days: "1 month 14 days" or "2 years 3 months"
        if (years > 0) {
          display = `${formatTimeUnit(years, 'year')} ${formatTimeUnit(months, 'month')}`;
          displayType = 'years';
        } else {
          display = `${formatTimeUnit(months, 'month')} ${formatTimeUnit(days, 'day')}`;
          displayType = 'months';
        }
      } else if (days > 0) {
        // Show days and hours: "3 days 9 hours"
        display = `${formatTimeUnit(days, 'day')} ${formatTimeUnit(hours, 'hour')}`;
        displayType = 'days';
      } else if (hours > 0) {
        // Show hours and minutes: "8 hours 3 mins"
        display = `${formatTimeUnit(hours, 'hour')} ${formatTimeUnit(minutes, 'min')}`;
        displayType = 'hours';
      } else {
        // Show minutes and seconds: "58 minutes 43 secs"
        // Always show seconds with padding, and always show both minutes and seconds
        const minutesPart = formatTimeUnit(minutes, 'minute');
        const secondsPart = formatTimeUnitWithPadding(seconds, 'sec');

        if (minutes > 0) {
          display = `${minutesPart} ${secondsPart}`;
        } else if (seconds > 0) {
          // When no minutes left but seconds remain, show "0 minutes XX secs"
          display = `0 minutes ${secondsPart}`;
        } else {
          // When both minutes and seconds are 0, show "0 minutes 00 secs"
          display = '0 minutes 00 secs';
        }
        displayType = 'minutes';
      }

      setTimeLeft({ text: display.trim(), type: displayType });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get width based on scenario type
  const getWidthForType = (type: string) => {
    switch (type) {
      case 'years':
        return 140; // "34 years 12 months"
      case 'months':
        return 130; // "12 months 30 days"
      case 'days':
        return 120; // "30 days 23 hours"
      case 'hours':
        return 115; // "23 hours 59 mins"
      case 'minutes':
        return 150; // "0 minutes 00 secs" (slightly wider for padding)
      case 'started':
        return 60; // "Started"
      default:
        return 120;
    }
  };

  return (
    <Badge variant="default">
      <Text
        style={{
          width: getWidthForType(timeLeft.type),
          textAlign: 'center',
          fontVariant: ['tabular-nums'], // Use monospace numbers for consistent spacing
        }}
      >
        {timeLeft.text}
      </Text>
    </Badge>
  );
};
