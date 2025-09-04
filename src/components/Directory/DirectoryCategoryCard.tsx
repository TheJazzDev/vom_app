import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useProtectedNavigation } from '@/src/hooks/useProtectedNavigation';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, View } from 'react-native';

export const DirectoryCategoryCard = ({
  category,
}: {
  category: DirectoryProps;
}) => {
  const { navigateTo, canAccess } = useProtectedNavigation();

  const handlePress = () => {
    navigateTo(category.route);
  };

  const hasAccess = canAccess(category.route);

  return (
    <Pressable
      onPress={handlePress}
      className="mb-4"
      android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
    >
      <LinearGradient
        colors={category.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 12,
          padding: 20,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <View
          style={{ position: 'absolute', top: -4, right: -4, opacity: 0.2 }}
        >
          <IconSymbol name={category.icon} size={100} color="white" />
        </View>

        <View style={{ position: 'relative', zIndex: 10 }}>
          <View className="flex-row justify-between items-start mb-3">
            <View className="bg-white/20 p-3 rounded-full">
              <IconSymbol name={category.icon} size={24} color="white" />
            </View>

            {!hasAccess ? (
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
            ) : (
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Text variant="caption" className="text-white font-semibold">
                  {category.count}
                </Text>
              </View>
            )}
          </View>

          <Text variant="h3" className="text-white font-bold mb-2">
            {category.title}
          </Text>
          <Text variant="body" className="text-white/90 leading-5 mb-4">
            {category.description}
          </Text>

          <View className="flex-row items-center">
            <Text
              variant="caption"
              className="text-white/90 mr-2 font-semibold"
            >
              {hasAccess ? 'View Directory' : 'Members Only'}
            </Text>
            <IconSymbol
              name={hasAccess ? 'arrow.right' : 'lock'}
              size={16}
              color="white"
            />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};
