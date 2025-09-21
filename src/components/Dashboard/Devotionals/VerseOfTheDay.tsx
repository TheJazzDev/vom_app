import { Card, Text } from '../..';

export function VerseOfTheDay() {
  return (
    <Card variant="gradient-ocean" style={{ height: 150 }}>
      <Text variant="h5" className="mb-1 font-semibold">
        Verse of the Day
      </Text>
      <Text variant="h6" className="italic flex-1">
        “The Lord is my shepherd; I shall not want.”
      </Text>
      <Text variant="overline" className="text-right">
        Psalm 23:1
      </Text>
    </Card>
  );
}
