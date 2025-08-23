import { Card } from './Card';
import { Text } from './Text';

export function VerseOfTheDay() {
  return (
    <Card className='my-3 rounded-2xl shadow-lg bg-gradient-to-br from-[#E6F0FF] to-[#C5D4E3] dark:from-[#0D0D2B] dark:to-[#1B263B]'>
      <Text className='text-xl font-semibold text-[#0D1B2A] dark:text-white mb-1'>
        Verse of the Day
      </Text>
      <Text variant='h5' className='italic'>
        “The Lord is my shepherd; I shall not want.”
      </Text>
      <Text variant='overline' className='text-right'>
        Psalm 23:1
      </Text>
    </Card>
  );
}
