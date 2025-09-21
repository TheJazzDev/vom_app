import { useTheme } from '@/src/hooks';
import { useRouter } from 'expo-router';
import { Platform, Pressable, Text, View } from 'react-native';
import { IconSymbol } from '../Icons';

export const MinistryCard = ({
  title,
  description,
  route,
  icon,
}: MinistryCardProps) => {
  const theme = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push(route as any);
  };

  return (
    <Pressable
      onPress={handlePress}
      android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
      className="bg-card dark:bg-dark-card rounded-lg p-4 border border-border dark:border-dark-border mb-2"
      style={({ pressed }) => [
        {
          backgroundColor:
            pressed && Platform.OS === 'ios'
              ? theme.secondary
              : theme.background,
        },
      ]}
    >
      <View className="flex-row items-center space-x-4">
        <View className="bg-primary/10 p-3 rounded-full mr-4">
          <IconSymbol name={icon} size={24} color={theme.primary} />
        </View>

        <View className="flex-1">
          <Text
            className="text-lg font-semibold mb-1"
            style={{ color: theme.heading }}
          >
            {title}
          </Text>
          <Text className="text-sm leading-5" style={{ color: theme.muted }}>
            {description}
          </Text>
        </View>

        <IconSymbol name="chevron.right" size={16} color={theme.muted} />
      </View>
    </Pressable>
  );
};
