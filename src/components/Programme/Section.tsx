import { Text, View } from '../UI';

export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className='mb-6 border-b border-border-primary dark:border-border-dark-primary pb-3'>
    <Text variant='h4' color='success'>
      {title}
    </Text>
    {children}
  </View>
);
