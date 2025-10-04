import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

const DepartmentCard = ({ department }: { department: Department }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() =>
        router.push(`/directory/departments/${department.id}` as any)
      }
      className="mb-4 rounded-xl overflow-hidden"
      android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
    >
      <LinearGradient
        colors={department.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 10,
          position: 'relative',
        }}
      >
        {/* Background Icon */}
        <View
          style={{ position: 'absolute', top: -20, right: -20, opacity: 0.15 }}
        >
          <IconSymbol name={department.icon1} size={120} color="white" />
        </View>

        <View style={{ position: 'relative', zIndex: 10 }}>
          {/* Header */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center flex-1">
              <View className="bg-white/20 p-2 rounded-full mr-3">
                <IconSymbol name={department.icon1} size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text
                  variant="h3"
                  className="text-white dark:text-gray-200 font-bold"
                >
                  {department.name}
                </Text>
                <Text
                  variant="caption"
                  className="text-white/80 dark:text-gray-200"
                >
                  {department.memberCount} members
                </Text>
              </View>
            </View>
            <IconSymbol name="chevron.right" size={20} color="white" />
          </View>

          {/* Description */}
          <Text
            variant="body"
            className="text-white/90 dark:text-white/80 mb-4 leading-5"
          >
            {department.description}
          </Text>

          {/* Meeting Info */}
          <View className="bg-white/20 rounded-lg p-3 mb-3">
            <View className="flex-row items-center">
              <IconSymbol name="calendar" size={16} color="white" />
              <Text
                variant="caption"
                className="text-white dark:text-gray-200 ml-2 font-semibold"
              >
                {department.meetingDay}
              </Text>
            </View>
          </View>

          {/* Leadership */}
          <View>
            <Text
              variant="caption"
              className="text-white/80 dark:text-gray-100 font-semibold mb-2"
            >
              LEADERSHIP
            </Text>
            <View className="flex-row justify-between">
              {/* Head */}
              <View className="flex-1 mr-3">
                <View className="flex-row items-center">
                  {/* <Image
                    source={{ uri: department.leadership?.head }}
                    className="w-6 h-6 rounded-full mr-2"
                  /> */}
                  <View>
                    <Text
                      variant="caption"
                      className="text-white/60 dark:text-gray-100"
                    >
                      Head
                    </Text>
                    <Text
                      variant="caption"
                      className="text-white dark:text-gray-200 font-semibold"
                      numberOfLines={1}
                    >
                      {department?.leadership.head || 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Assistant */}
              <View className="flex-1">
                <View className="flex-row items-center">
                  {/* <Image
                    source={{ uri: department?.assistant?.avatar }}
                    className="w-6 h-6 rounded-full mr-2"
                  /> */}
                  <View>
                    <Text
                      variant="caption"
                      className="text-white/60 dark:text-gray-100"
                    >
                      Assistant
                    </Text>
                    <Text
                      variant="caption"
                      className="text-white dark:text-gray-200 font-semibold"
                      numberOfLines={1}
                    >
                      {department?.leadership.assistant || 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-1">
                <View className="flex-row items-center">
                  {/* <Image
                    source={{ uri: department?.assistant?.avatar }}
                    className="w-6 h-6 rounded-full mr-2"
                  /> */}
                  <View>
                    <Text
                      variant="caption"
                      className="text-white/60 dark:text-gray-100"
                    >
                      Secretary
                    </Text>
                    <Text
                      variant="caption"
                      className="text-white dark:text-gray-200 font-semibold"
                      numberOfLines={1}
                    >
                      {department?.leadership.secretary || 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default DepartmentCard;
