import { Divider, Text, View } from '../../UI';

export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className='mb-2'>
    <Divider type='horizontal' height={1} spacing={10} />
    <Text variant='h4' color='heading' className='pb-1'>
      {title}
    </Text>
    {children}
  </View>
);
