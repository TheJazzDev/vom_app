import { useTheme } from '@/src/hooks';
import { capitalizeFirstLetter, formatDate } from '@/src/utils';
import { useRouter } from 'expo-router';
import React from 'react';
import { IconSymbol } from '../../Icons';
import { Button, Card, Countdown, Text, View } from '../../UI';

interface UpcomingCardProps {
  programmes: UpcomingProgramme;
}

const UpcomimgCard: React.FC<UpcomingCardProps> = ({ programmes }) => {
  const { id, topic, date, type, time } = programmes;

  const theme = useTheme();
  const router = useRouter();

  return (
    <Card variant='default' className='p-4 mb-3'>
      <View className='flex-row items-start justify-between mb-4'>
        <View>
          <Text variant='h4' color='heading'>
            {capitalizeFirstLetter(type)} Service
          </Text>

          <View className='flex-row items-center gap-2 my-1'>
            <View className='flex-row items-center gap-2'>
              <IconSymbol size={16} name='calendar' color={theme.muted} />
              <Text variant='subtitle2'>{formatDate(date)}</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <IconSymbol size={16} name='clock.circle' color={theme.muted} />
              <Text variant='subtitle2'>{time}</Text>
            </View>
          </View>

          <Text variant='h6' color='heading2'>
            "{topic}"
          </Text>
        </View>
        <Countdown targetDate={date} />
      </View>
      <Button variant='outline' onPress={() => router.push(`/programme/${id}`)}>
        View Full Programme
      </Button>
    </Card>
  );
};

export default UpcomimgCard;
