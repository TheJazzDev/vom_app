import { useTheme } from '@/src/hooks';
import { IconSymbol } from '../Icons';
import { Card } from './Card';
import { Text } from './Text';
import { View } from './View';

export function PrayerOfTheDay() {
  const theme = useTheme();

  return (
    <Card className='mb-5 rounded-2xl shadow-lg bg-gradient-to-br from-[#FFF7E6] to-[#FFE9C5] dark:from-[#1B263B] dark:to-[#0D1B2A]'>
      <View className='flex-row items-center mb-3'>
        <IconSymbol name='hands.sparkles' size={20} color={theme.muted} />
        <Text className='ml-2 text-xl font-semibold text-[#0D1B2A] dark:text-white'>
          Prayer of the Day
        </Text>
      </View>
      <Text variant='body' color='heading'>
        “Lord, guide my steps today. Fill me with Your wisdom, strength, and
        peace. Help me to walk in love and be a light to others.”
      </Text>
      <Text variant='overline' className='text-right'>
        Amen
      </Text>
    </Card>
  );
}
