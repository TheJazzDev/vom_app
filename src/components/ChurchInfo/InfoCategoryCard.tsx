import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

const InfoCategoryCard = ({ category }: { category: any }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(category.route as any)}
      className="mb-4"
    >
      <LinearGradient
        colors={category.gradient}
        style={{ padding: 16, borderRadius: 16 }}
        className="relative overflow-hidden"
      >
        {/* Background Icon */}
        <View className="absolute -bottom-4 -right-4 opacity-20">
          <IconSymbol name={category.icon} size={120} color="white" />
        </View>

        <View className="relative z-10">
          <View className="flex-row justify-between items-start mb-4">
            <View className="bg-white/20 p-3 rounded-full">
              <IconSymbol name={category.icon} size={24} color="white" />
            </View>
            <View className="bg-white/20 px-3 py-1 rounded-full">
              <Text variant="caption" className="text-white font-semibold">
                {category.badge}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="w-[70%]">
              <Text variant="h3" className="text-white font-bold mb-2">
                {category.title}
              </Text>
              {/* <Text variant="body" className="text-white/90 dark:text-white/80 leading-5">
                {category.description}
              </Text> */}
            </View>
            <View className="flex-row items-center">
              <Text
                variant="caption"
                className="text-white/90 dark:text-white/80 mr-2 font-semibold"
              >
                View Details
              </Text>
              <IconSymbol
                name="arrow.right.circle.fill"
                size={18}
                color="white"
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default InfoCategoryCard;
