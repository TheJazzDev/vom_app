import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { useProtectedNavigation } from '@/src/hooks/useProtectedNavigation';
import { Pressable, View } from 'react-native';

export const ProgrammeCard = ({ programme }: { programme: any }) => {
  const theme = useTheme();
  const { navigateTo, canAccess } = useProtectedNavigation();

  const hasAccess = canAccess(programme.route);

  return (
    <Pressable
      onPress={() => navigateTo(programme.route as any)}
      className="mb-4 rounded-xl overflow-hidden"
      style={{
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.border,
      }}
      android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
    >
      <View className="p-4">
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <View
              className="p-3 rounded-full mr-4"
              style={{ backgroundColor: `${programme.color}15` }}
            >
              <IconSymbol
                name={programme.icon}
                size={24}
                color={programme.color}
              />
            </View>
            <View className="flex-1">
              <Text
                variant="h4"
                className="font-semibold mb-1"
                style={{ color: theme.heading }}
              >
                {programme.title}
              </Text>
              <Text
                variant="subtitle2"
                style={{ color: theme.muted }}
                numberOfLines={2}
              >
                {programme.description}
              </Text>
            </View>
          </View>

          <View
            className="px-3 py-1 rounded-full ml-2"
            style={{ backgroundColor: `${programme.color}15` }}
          >
            <Text
              variant="caption"
              className="font-semibold"
              style={{ color: programme.color }}
            >
              {programme.status}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Text
              variant="caption"
              className="mr-2"
              style={{ color: theme.muted }}
            >
              Tap to view
            </Text>
            <IconSymbol name="arrow.right" size={14} color={theme.muted} />
          </View>
          {!hasAccess && (
            <View
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: '#EF4444' }}
            >
              <View className="flex-row items-center">
                <IconSymbol name="lock" size={12} color="white" />
                <Text variant="caption" className="text-white font-bold ml-1">
                  LOCKED
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};
