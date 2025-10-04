import { Divider, IconSymbol, Text, View } from '@/src/components';
import { DepartmentMemberCard } from '@/src/components/Directory/Department/DepartmentMemberCard';
import { dispatch, useDirectorySlice } from '@/src/store';
import { fetchDepartmentWithMembersThunk } from '@/src/store/thunks/directory';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, Animated } from 'react-native';

const LoadingScreen = () => {
  return (
    <View gradient className="flex-1 items-center justify-center">
      <View className="items-center">
        <ActivityIndicator size="large" className="mb-4" />
        <Text variant="h4" className="mb-4">
          Loading Department
        </Text>
        <Text variant="body">Getting the members...</Text>
      </View>
    </View>
  );
};

const DepartmentDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { department } = useLocalSearchParams<{ department: string }>();
  const { departmentWithMembers, isFetchingDepartmentWithMembers } =
    useDirectorySlice();
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    if (department) {
      dispatch(fetchDepartmentWithMembersThunk(department));
    }
  }, [department]);

  // Organize members by leadership and regular members
  const organizedMembers = useMemo(() => {
    if (!departmentWithMembers?.members) return { leadership: [], members: [] };

    const leadershipRoles = ['Head', 'Assistant', 'Secretary', 'Treasurer'];

    const leadership: UserProfile[] = [];
    const members: UserProfile[] = [];

    departmentWithMembers.members.forEach((member) => {
      const departmentData = member.department?.find(
        (dept) => dept.name === departmentWithMembers.id,
      );

      const role = departmentData?.role || 'Member';

      if (leadershipRoles.includes(role)) {
        leadership.push(member);
      } else {
        members.push(member);
      }
    });

    // Sort leaders by role hierarchy
    const roleOrder: Record<string, number> = {
      Head: 1,
      Assistant: 2,
      Secretary: 3,
      Treasurer: 4,
    };

    leadership.sort((a, b) => {
      const aRole =
        a.departmentKeys?.find(
          (dk) => dk.departmentId === departmentWithMembers.id,
        )?.role || 'Member';
      const bRole =
        b.departmentKeys?.find(
          (dk) => dk.departmentId === departmentWithMembers.id,
        )?.role || 'Member';
      const aOrder = roleOrder[aRole] || 999;
      const bOrder = roleOrder[bRole] || 999;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.firstName.localeCompare(b.firstName);
    });

    members.sort((a, b) => a.firstName.localeCompare(b.firstName));

    return { leadership, members };
  }, [departmentWithMembers]);

  if (isFetchingDepartmentWithMembers) {
    return <LoadingScreen />;
  }

  if (!departmentWithMembers) {
    return (
      <View scrollable gradient>
        <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center mb-6">
          <IconSymbol name="exclamationmark.triangle" size={32} color="white" />
        </View>
        <Text variant="h2" className="font-bold mb-3">
          Oops!
        </Text>
        <Text variant="body" className="text-center">
          This department seems to have vanished into thin air
        </Text>
      </View>
    );
  }

  const totalMembers = departmentWithMembers.members?.length || 0;
  const deptGradient = departmentWithMembers.gradient;

  // Animated header opacity
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View gradient className="flex-1">
      <Animated.View
        style={{ opacity: headerOpacity }}
        className="absolute top-0 left-0 right-0 z-50"
      >
        <View
          style={{ backgroundColor: `${deptGradient[1]}` }}
          className="py-2"
        >
          <View className="flex-row items-center px-4">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: `${deptGradient[1]}` }}
            >
              <IconSymbol
                name={departmentWithMembers.icon1}
                size={20}
                color="white"
              />
            </View>
            <Text variant="h4" className="text-white font-bold">
              {departmentWithMembers.name}
            </Text>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={[...deptGradient, `${deptGradient[1]}80`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingVertical: 16 }}
          className="relative"
        >
          {/* Decorative Background Elements */}
          <View className="absolute top-0 right-0 w-96 h-96 opacity-10">
            <IconSymbol
              name={departmentWithMembers.icon1}
              size={384}
              color="white"
            />
          </View>
          <View className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
            <IconSymbol
              name={departmentWithMembers.icon1 || 'building.2'}
              size={256}
              color="white"
            />
          </View>

          {/* Floating Particles Effect */}
          <View className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <View
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </View>

          <View className="items-center px-6 relative z-10">
            {/* Dual Icon Design */}
            <View className="relative mb-8">
              <View className="w-28 h-28 bg-white/20 rounded-3xl items-center justify-center backdrop-blur-lg">
                <IconSymbol
                  name={departmentWithMembers.icon1}
                  size={48}
                  color="white"
                />
              </View>
              <View className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-xl items-center justify-center shadow-lg">
                <IconSymbol
                  name={departmentWithMembers.icon1 || 'building.2'}
                  size={20}
                  color={deptGradient[0]}
                />
              </View>
            </View>

            {/* Department Info */}
            <Text
              variant="h1"
              className="text-white dark:text-white text-center mb-2 tracking-tight"
            >
              {departmentWithMembers.displayName}
            </Text>

            {/* Stats Row */}
            <View className="flex-row items-center space-x-6 mb-6">
              <View className="items-center">
                <Text
                  variant="h2"
                  className="text-white dark:text-white font-bold"
                >
                  {totalMembers}
                </Text>
                <Text
                  variant="caption"
                  className="text-white/80 dark:text-white/90"
                >
                  Members
                </Text>
              </View>

              {departmentWithMembers.meetingDay && (
                <Divider type="vertical" height={30} className="mx-2" />
              )}

              {departmentWithMembers.meetingDay && (
                <View className="items-center">
                  <Text
                    variant="subtitle1"
                    className="text-white dark:text-white font-semibold"
                  >
                    {departmentWithMembers.meetingDay}
                  </Text>
                  <Text
                    variant="caption"
                    className="text-white/80 dark:text-white/90"
                  >
                    Meetings
                  </Text>
                </View>
              )}
            </View>

            {/* Description */}
            {departmentWithMembers.description && (
              <View className="bg-white/10 backdrop-blur-lg rounded-2xl px-4 py-2 max-w-sm">
                <Text
                  variant="body"
                  className="text-white dark:text-white text-center leading-6"
                >
                  {departmentWithMembers.description}
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>

        {/* Members Section */}
        <View>
          {!totalMembers ? (
            <View className="p-8">
              <LinearGradient
                colors={['#a8edea', '#fed6e3', '#d299c2']}
                className="rounded-3xl p-8"
              >
                <View className="items-center">
                  <View className="w-20 h-20 bg-white/30 rounded-full items-center justify-center mb-4">
                    <IconSymbol name="person.3" size={32} color="white" />
                  </View>
                  <Text variant="h3" className="text-white font-bold mb-2">
                    No Member Yet
                  </Text>
                  <Text variant="body" className="text-white/90 text-center">
                    This department is ready for dedicated members to join the
                    ministry
                  </Text>
                </View>
              </LinearGradient>
            </View>
          ) : (
            <View>
              {/* Leadership Section */}
              {organizedMembers.leadership.length > 0 && (
                <View className="pt-4">
                  {organizedMembers.leadership.map((member) => {
                    const departmentData = member.department?.find(
                      (dept) => dept.name === departmentWithMembers.id,
                    );

                    return (
                      <DepartmentMemberCard
                        member={member}
                        key={member.id}
                        onPress={() =>
                          router.push(
                            `/directory/members/${member.id}` as const,
                          )
                        }
                        role={departmentData?.role as DepartmentRole}
                      />
                    );
                  })}
                </View>
              )}

              {organizedMembers.members.length > 0 && (
                <View>
                  {organizedMembers.members.map((member) => (
                    <DepartmentMemberCard
                      key={member.id}
                      member={member}
                      onPress={() =>
                        router.push(`/directory/members/${member.id}` as const)
                      }
                      role="Member"
                    />
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default DepartmentDetailsScreen;
