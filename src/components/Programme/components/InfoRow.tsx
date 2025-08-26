import { Text, View } from '../../UI';

export const InfoRow = ({
  label,
  value,
  name,
  variant = 'h6',
  className,
}: {
  name?: boolean;
  label: string;
  variant?: any;
  className?: string;
  value: string | number;
}) => (
  <View className={`flex-row items-start gap-2 mb-0.5 ${className}`}>
    <Text variant={variant} className="flex-shrink-0">
      {label}:
    </Text>
    <Text
      variant={variant}
      className={`flex-1 flex-shrink ${name ? 'italic font-extrabold' : ''}`}
    >
      {value}
    </Text>
  </View>
);
