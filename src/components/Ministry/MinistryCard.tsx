import { useTheme } from '@/src/hooks';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { IconSymbol } from '../Icons';
import { Text } from '../UI';

export const MinistryCard = ({ ministry }: { ministry: MinistryCardProps }) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(ministry.route as any)}
      className="mb-3 rounded-2xl overflow-hidden border"
      style={{
        backgroundColor: `${ministry.gradient[0]}08`,
        borderWidth: 1,
        borderColor: `${ministry.gradient[0]}20`,
      }}
    >
      <View className="flex-row">
        {/* Colored Side Accent */}
        <View
          className="w-1.5"
          style={{ backgroundColor: ministry.gradient[0] }}
        />

        <View className="flex-1 p-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            <View
              className="w-12 h-12 rounded-2xl items-center justify-center"
              style={{ backgroundColor: `${ministry.gradient[0]}15` }}
            >
              <IconSymbol
                name={ministry.icon}
                size={22}
                color={ministry.gradient[0]}
              />
            </View>

            <View className="flex-1">
              <Text
                variant="h4"
                className="font-bold mb-1"
                style={{ color: theme.heading }}
              >
                {ministry.title}
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                {ministry.description}
              </Text>
            </View>
          </View>

          <View className="items-end gap-2">
            <View
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: `${ministry.gradient[0]}15` }}
            >
              {/* <Text
                    variant="caption"
                    className="font-semibold"
                    style={{ color: ministry.gradient[0] }}
                  >
                    {ministry.badge}
                  </Text> */}
            </View>
            <IconSymbol name="chevron.right" size={18} color={theme.muted} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
