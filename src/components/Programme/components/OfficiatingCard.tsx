import { Card, Text } from '../../UI';

export const OfficiatingCard = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <Card variant='default' className={`p-1.5 ${className}`}>
    <Text color='heading' className='text-center'>
      {value}
    </Text>
    <Text variant='overline' color='body' className='text-center py-1'>
      {label}
    </Text>
  </Card>
);
