import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Badge } from './Badge';

type CountdownProps = {
  targetDate: string;
  compact?: boolean;
};

function formatTimeUnit(value: number, unit: string) {
  if (value <= 0) return '';
  return `${value} ${value === 1 ? unit : unit + 's'}`;
}

function formatTimeUnitWithPadding(value: number, unit: string) {
  const displayValue =
    unit === 'sec'
      ? Math.max(0, value).toString().padStart(2, '0')
      : Math.max(0, value);
  const pluralUnit = Math.max(0, value) === 1 ? unit : unit + 's';
  return `${displayValue} ${pluralUnit}`;
}

// Function to calculate accurate date differences
function getAccurateDateDifference(now: Date, target: Date) {
  const isPast = target.getTime() < now.getTime();

  // Swap dates if target is in the past for calculation
  const earlier = isPast ? target : now;
  const later = isPast ? now : target;

  let years = later.getFullYear() - earlier.getFullYear();
  let months = later.getMonth() - earlier.getMonth();
  let days = later.getDate() - earlier.getDate();
  let hours = later.getHours() - earlier.getHours();
  let minutes = later.getMinutes() - earlier.getMinutes();
  let seconds = later.getSeconds() - earlier.getSeconds();

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
    const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds, isPast };
}

// Default service end times
// const SERVICE_END_TIMES = {
//   sunday: { hour: 14, minute: 0 }, // 2:00 PM
//   shiloh: { hour: 13, minute: 30 }, // 1:30 PM
//   vigil: { hour: 5, minute: 0 }, // 5:00 AM (next day)
// };

// function getServiceEndTime(programmeDate: Date, programmeType: string): Date {
//   const endTime = new Date(programmeDate);
//   const serviceEnd =
//     SERVICE_END_TIMES[
//       programmeType.toLowerCase() as keyof typeof SERVICE_END_TIMES
//     ];

//   if (serviceEnd) {
//     endTime.setHours(serviceEnd.hour, serviceEnd.minute, 0, 0);

//     // For vigil services, if end time is early morning, it's next day
//     if (programmeType.toLowerCase() === 'vigil' && serviceEnd.hour < 12) {
//       endTime.setDate(endTime.getDate() + 1);
//     }
//   } else {
//     // Default to 2 hours after programme start
//     endTime.setHours(endTime.getHours() + 2);
//   }

//   return endTime;
// }

export const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  compact = false,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    text: string;
    type: string;
    isInitialized: boolean;
  }>({
    text: '',
    type: '',
    isInitialized: false,
  });

  useEffect(() => {
    const date = new Date(targetDate);

    // Calculate initial state immediately to avoid flash
    const calculateTime = () => {
      const now = new Date();
      const { years, months, days, hours, minutes, seconds, isPast } =
        getAccurateDateDifference(now, date);

      let display = '';
      let displayType = '';

      if (isPast) {
        // Show time that has passed since the event
        if (years > 0 || months > 0) {
          if (years > 0) {
            display = `${formatTimeUnit(years, 'year')} ${formatTimeUnit(months, 'month')} ago`;
            displayType = 'years-past';
          } else {
            display = `${formatTimeUnit(months, 'month')} ${formatTimeUnit(days, 'day')} ago`;
            displayType = 'months-past';
          }
        } else if (days > 0) {
          display = `${formatTimeUnit(days, 'day')} ${formatTimeUnit(hours, 'hour')} ago`;
          displayType = 'days-past';
        } else if (hours > 0) {
          display = `${formatTimeUnit(hours, 'hour')} ${formatTimeUnit(minutes, 'min')} ago`;
          displayType = 'hours-past';
        } else if (minutes > 0) {
          display = `${formatTimeUnit(minutes, 'min')} ago`;
          displayType = 'minutes-past';
        } else {
          display = 'Just started';
          displayType = 'just-started';
        }
      } else {
        // Future event - same logic as before
        if (years > 0 || months > 0) {
          if (years > 0) {
            display = `${formatTimeUnit(years, 'year')} ${formatTimeUnit(months, 'month')}`;
            displayType = 'years';
          } else {
            display = `${formatTimeUnit(months, 'month')} ${formatTimeUnit(days, 'day')}`;
            displayType = 'months';
          }
        } else if (days > 0) {
          display = `${formatTimeUnit(days, 'day')} ${formatTimeUnit(hours, 'hour')}`;
          displayType = 'days';
        } else if (hours > 0) {
          display = `${formatTimeUnit(hours, 'hour')} ${formatTimeUnit(minutes, 'min')}`;
          displayType = 'hours';
        } else {
          const minutesPart = formatTimeUnit(minutes, 'minute');
          const secondsPart = formatTimeUnitWithPadding(seconds, 'sec');

          if (minutes > 0) {
            display = `${minutesPart} ${secondsPart}`;
          } else if (seconds > 0) {
            display = `0 minutes ${secondsPart}`;
          } else {
            display = '0 minutes 00 secs';
          }
          displayType = 'minutes';
        }
      }

      return { text: display.trim(), type: displayType, isInitialized: true };
    };

    // Set initial state immediately
    setTimeLeft(calculateTime());

    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Get width based on scenario type
  const getWidthForType = (type: string) => {
    if (compact) {
      return type.includes('past') || type === 'just-started' ? 80 : 60;
    }

    switch (type) {
      case 'years':
      case 'years-past':
        return 140;
      case 'months':
      case 'months-past':
        return 130;
      case 'days':
      case 'days-past':
        return 120;
      case 'hours':
      case 'hours-past':
        return 115;
      case 'minutes':
      case 'minutes-past':
        return 150;
      case 'just-started':
        return 80;
      default:
        return 120;
    }
  };

  // Get badge variant based on state
  const getBadgeVariant = (type: string) => {
    if (type.includes('past') || type === 'just-started') {
      return 'outline'; // Different style for past events
    }
    return 'default';
  };

  // Don't render anything until initialized to prevent flash
  if (!timeLeft.isInitialized) {
    return null;
  }

  return (
    <Badge variant={getBadgeVariant(timeLeft.type)}>
      <Text
        style={{
          width: getWidthForType(timeLeft.type),
          textAlign: 'center',
          fontVariant: ['tabular-nums'],
          fontSize: compact ? 10 : 12,
        }}
      >
        {timeLeft.text}
      </Text>
    </Badge>
  );
};
