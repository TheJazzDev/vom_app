import { Card, Text } from '../UI';

const YorubaWatchWord = () => {
  return (
    <Card variant="gradient-soft" style={{ height: 150 }}>
      <Text variant="h4" className="mb-1">
        Akomona 2025
      </Text>
      <Text variant="h6" className="italic flex-1">
        “Notori Oluwa Jehofa yio ran mi lowo: nitorina emi ki yio damu; nitorina
        ni mo se gbe oju me ro bi oluta lile, emi si mo pe oju ki yio ti mi.”
      </Text>
      <Text variant="overline" className="text-right">
        Isaiah 50:7
      </Text>
    </Card>
  );
};

export default YorubaWatchWord;
