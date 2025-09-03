import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

export const CategoryCard = ({ category }: { category: DirectoryProps }) => {
  const router = useRouter();
  
  return (
    <Pressable
      onPress={() => router.push(category.route as any)}
      className="mb-4"
    >
      <LinearGradient
        colors={category.gradient}
        className="rounded-xl p-6 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <View className="absolute -top-4 -right-4 opacity-20">
          <IconSymbol name={category.icon} size={100} color="white" />
        </View>

        <View className="relative z-10">
          <View className="flex-row justify-between items-start mb-3">
            <View className="bg-white/20 p-3 rounded-full">
              <IconSymbol name={category.icon} size={24} color="white" />
            </View>
            <View className="bg-white/20 px-3 py-1 rounded-full">
              <Text variant="caption" className="text-white font-semibold">
                {category.count}
              </Text>
            </View>
          </View>

          <Text variant="h3" className="text-white font-bold mb-2">
            {category.title}
          </Text>
          <Text variant="body" className="text-white/90 leading-5">
            {category.description}
          </Text>

          <View className="flex-row items-center mt-4">
            <Text variant="caption" className="text-white/90 mr-2">
              View Directory
            </Text>
            <IconSymbol name="arrow.right" size={16} color="white" />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};
