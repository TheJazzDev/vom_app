import { Card, Text, View } from "../UI";

export const OfficiatingCard = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <Card className={`p-0.5 ${className}`}>
    <View className='p-1 bg-gray-200 dark:bg-gray-800 rounded-md'>
      <Text className='text-center'>{value}</Text>
    </View>
    <Text variant='overline' color='secondary' className='text-center py-1'>
      {label}
    </Text>
  </Card>
);
