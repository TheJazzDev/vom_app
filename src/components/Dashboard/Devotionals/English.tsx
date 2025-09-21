import { Card, Text } from '../..';

const EnglishWatchWord = () => {
  return (
    <Card variant="gradient-secondary" style={{ height: 150 }}>
      <Text variant="h4" className="mb-1">
        2025 Watchword
      </Text>
      <Text variant="h6" className="italic flex-1">
        &quot;For the Lord GOD will help me; therefore shall I not be
        confounded: therefore have I set my face like a flint, and I know that I
        shall not be ashamed.&quot;
      </Text>
      <Text variant="overline" className="text-right">
        Isaiah 50:7
      </Text>
    </Card>
  );
};

export default EnglishWatchWord;
