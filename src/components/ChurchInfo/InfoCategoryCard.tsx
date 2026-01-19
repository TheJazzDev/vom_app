import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

export const InfoCategoryCard = ({ category }: { category: any }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(category.route as any)}
      className="mb-2"
    >
      <LinearGradient
        colors={category.gradient}
        style={{ padding: 16, borderRadius: 16 }}
        className="relative overflow-hidden"
      >
        {/* Background Icon */}
        <View className="absolute -bottom-4 -right-4 opacity-20">
          <IconSymbol name={category.icon} size={100} color="white" />
        </View>

        <View className="relative z-10">
          <View className="flex-row justify-between items-start mb-2">
            <View className="bg-white/20 p-3 rounded-full">
              <IconSymbol name={category.icon} size={16} color="white" />
            </View>
            <View className="bg-white/20 px-3 py-1 rounded-full">
              <Text
                variant="caption"
                className="text-white dark:text-white/90 font-semibold"
              >
                {category.badge}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="w-[70%]">
              <Text
                variant="h5"
                className="text-white dark:text-white/90 font-bold mb-2"
              >
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

export const InfoCategoryCardCompact = ({ category }: { category: any }) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => router.push(category.route as any)}
      className="mb-2 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: `${category.gradient[0]}08`,
        borderWidth: 1,
        borderColor: `${category.gradient[0]}20`,
      }}
    >
      <View className="p-3 flex-row items-center justify-between">
        <View className="flex-row items-center gap-3 flex-1">
          <View
            className="w-10 h-10 rounded-xl items-center justify-center"
            style={{ backgroundColor: category.gradient[0] }}
          >
            <IconSymbol name={category.icon} size={20} color="white" />
          </View>

          <View className="flex-1">
            <Text
              variant="body"
              className="font-bold mb-0.5"
              style={{ color: theme.heading }}
            >
              {category.title}
            </Text>
            <View
              className="px-2 py-0.5 rounded-full self-start"
              style={{ backgroundColor: `${category.gradient[0]}20` }}
            >
              <Text
                variant="caption"
                className="font-semibold"
                style={{ color: category.gradient[0] }}
              >
                {category.badge}
              </Text>
            </View>
          </View>
        </View>

        <IconSymbol name="chevron.right" size={18} color={theme.muted} />
      </View>
    </Pressable>
  );
};

export const InfoCategoryCardTopBar = ({ category }: { category: any }) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => router.push(category.route as any)}
      className="mb-3 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.border,
      }}
    >
      {/* Top Colored Bar */}
      <View
        className="h-1.5"
        style={{ backgroundColor: category.gradient[0] }}
      />

      <View className="p-4">
        <View className="flex-row items-start justify-between mb-3">
          <View
            className="w-14 h-14 rounded-2xl items-center justify-center"
            style={{ backgroundColor: `${category.gradient[0]}15` }}
          >
            <IconSymbol
              name={category.icon}
              size={26}
              color={category.gradient[0]}
            />
          </View>

          <View
            className="px-3 py-1.5 rounded-full"
            style={{ backgroundColor: `${category.gradient[0]}15` }}
          >
            <Text
              variant="caption"
              className="font-semibold"
              style={{ color: category.gradient[0] }}
            >
              {category.badge}
            </Text>
          </View>
        </View>

        <View>
          <Text
            variant="h4"
            className="font-bold mb-1"
            style={{ color: theme.heading }}
          >
            {category.title}
          </Text>
          <Text
            variant="body"
            className="leading-5 mb-3"
            style={{ color: theme.muted }}
          >
            {category.description}
          </Text>

          <View className="flex-row items-center gap-1">
            <Text
              variant="caption"
              className="font-semibold"
              style={{ color: category.gradient[0] }}
            >
              View Details
            </Text>
            <IconSymbol
              name="arrow.right"
              size={16}
              color={category.gradient[0]}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
