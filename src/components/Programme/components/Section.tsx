import { Text, View } from '../../UI';

export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className='mb-6 border-b border-border dark:border-dark-border pb-3'>
    <Text variant='h4' color='heading' className='mb-1'>
      {title}
    </Text>
    {children}
  </View>
);
