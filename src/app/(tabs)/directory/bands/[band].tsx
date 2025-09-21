import { BandMemberCard, IconSymbol, Text, View } from '@/src/components';
import { dispatch, useDirectorySlice } from '@/src/store';
import { fetchBandWithMembersThunk } from '@/src/store/thunks/directory';
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
          Loading Band
        </Text>
        <Text variant="body">Getting the members...</Text>
      </View>
    </View>
  );
};

const BandDetailsScreen: React.FC = () => {
  const router = useRouter();
  const { band } = useLocalSearchParams<{ band: string }>();
  const { bandWithMembers, isFetchingBandWithMembers } = useDirectorySlice();
  const scrollY = new Animated.Value(0);
  console.log([bandWithMembers]);

  useEffect(() => {
    if (band) {
      dispatch(fetchBandWithMembersThunk(band));
    }
  }, [band]);

  // Organize members by leadership and regular members
  const organizedMembers = useMemo(() => {
    if (!bandWithMembers?.members) return { leadership: [], members: [] };

    const leadershipRoles = [
      'Captain',
      'Choir Master',
      'Vice Captain',
      'Assistant Choir Master',
      'Secretary',
    ];

    const leadership: UserProfile[] = [];
    const members: UserProfile[] = [];

    bandWithMembers.members.forEach((member) => {
      const role =
        member.bandKeys?.find(
          (bandKey) => bandKey.bandId === bandWithMembers.id,
        )?.role || 'Member';

      if (leadershipRoles.includes(role)) {
        leadership.push(member);
      } else {
        members.push(member);
      }
    });

    // Sort leaders by role hierarchy
    const roleOrder: Record<string, number> = {
      Captain: 1,
      'Choir Master': 2,
      'Vice Captain': 3,
      'Assistant Choir Master': 4,
      Secretary: 5,
    };

    leadership.sort((a, b) => {
      const aRole =
        a.bandKeys?.find((bk) => bk.bandId === bandWithMembers.id)?.role ||
        'Member';
      const bRole =
        b.bandKeys?.find((bk) => bk.bandId === bandWithMembers.id)?.role ||
        'Member';
      const aOrder = roleOrder[aRole] || 999;
      const bOrder = roleOrder[bRole] || 999;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.firstName.localeCompare(b.firstName);
    });

    members.sort((a, b) => a.firstName.localeCompare(b.firstName));

    return { leadership, members };
  }, [bandWithMembers]);

  if (isFetchingBandWithMembers) {
    return <LoadingScreen />;
  }

  if (!bandWithMembers) {
    return (
      <View scrollable gradient>
        <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center mb-6">
          <IconSymbol name="exclamationmark.triangle" size={32} color="white" />
        </View>
        <Text variant="h2" className="font-bold mb-3">
          Oops!
        </Text>
        <Text variant="body" className="text-center">
          This band seems to have vanished into thin air
        </Text>
      </View>
    );
  }

  const totalMembers = bandWithMembers.members?.length || 0;
  const bandGradient = bandWithMembers.gradient;

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
          style={{ backgroundColor: `${bandGradient[1]}` }}
          className="py-2"
        >
          <View className="flex-row items-center px-4">
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: `${bandGradient[1]}` }}
            >
              <IconSymbol
                name={bandWithMembers.icon1}
                size={20}
                color="white"
              />
            </View>
            <Text variant="h4" className="text-white font-bold">
              {bandWithMembers.name}
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
          colors={[...bandGradient, `${bandGradient[1]}80`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingVertical: 16 }}
          className="relative"
        >
          {/* Decorative Background Elements */}
          <View className="absolute top-0 right-0 w-96 h-96 opacity-10">
            <IconSymbol name={bandWithMembers.icon1} size={384} color="white" />
          </View>
          <View className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
            <IconSymbol
              name={bandWithMembers.icon1 || 'music.note'}
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
                  name={bandWithMembers.icon1}
                  size={48}
                  color="white"
                />
              </View>
              <View className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-xl items-center justify-center shadow-lg">
                <IconSymbol
                  name={bandWithMembers.icon1 || 'music.note'}
                  size={20}
                  color={bandGradient[0]}
                />
              </View>
            </View>

            {/* Band Info */}
            <Text
              variant="h1"
              className="text-white dark:text-white text-center mb-2 tracking-tight"
            >
              {bandWithMembers.displayName}
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

              {bandWithMembers.meetingDay && (
                <View className="w-px h-8 bg-white/30" />
              )}

              {bandWithMembers.meetingDay && (
                <View className="items-center">
                  <Text
                    variant="subtitle1"
                    className="text-white dark:text-white font-semibold"
                  >
                    {bandWithMembers.meetingDay}
                  </Text>
                  <Text
                    variant="caption"
                    className="text-white/80 dark:text-white/90"
                  >
                    {bandWithMembers.meetingTime}
                  </Text>
                </View>
              )}
            </View>

            {/* Description */}
            {bandWithMembers.description && (
              <View className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-w-sm">
                <Text
                  variant="body"
                  className="text-white dark:text-white text-center leading-6"
                >
                  {bandWithMembers.description}
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>

        {/* Members Section */}
        <View className="bg-gray-50 dark:bg-gray-900">
          {!totalMembers ? (
            <View className="p-8">
              <LinearGradient
                colors={['#ff9a9e', '#fecfef', '#fecfef']}
                className="rounded-3xl p-8"
              >
                <View className="items-center">
                  <View className="w-20 h-20 bg-white/30 rounded-full items-center justify-center mb-4">
                    <IconSymbol name="person.3" size={32} color="white" />
                  </View>
                  <Text variant="h3" className="text-white font-bold mb-2">
                    Empty Stage
                  </Text>
                  <Text variant="body" className="text-white/90 text-center">
                    This band is waiting for its first members to join the
                    harmony
                  </Text>
                </View>
              </LinearGradient>
            </View>
          ) : (
            <View>
              {/* Leadership Section */}
              {organizedMembers.leadership.length > 0 && (
                <View>
                  <LinearGradient
                    colors={['#ffeaa7', '#fdcb6e', '#e17055']}
                    className="p-6"
                  >
                    <View className="flex-row items-center">
                      <View className="w-3 h-8 bg-white/50 rounded-full mr-4" />
                      <Text
                        variant="h2"
                        className="text-white font-black flex-1"
                      >
                        Leadership
                      </Text>
                      <View className="bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full">
                        <Text variant="h4" className="text-white font-bold">
                          {organizedMembers.leadership.length}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>

                  {/* Leaders Cards */}
                  {organizedMembers.leadership.map((member, index) => {
                    const role =
                      member.bandKeys?.find(
                        (bandKey) => bandKey.bandId === bandWithMembers.id,
                      )?.role || 'Member';

                    return (
                      <View
                        key={member.id}
                        className="mx-4 my-2"
                        style={{
                          transform: [
                            { translateX: index % 2 === 0 ? -10 : 10 },
                          ],
                        }}
                      >
                        <LinearGradient
                          colors={['#fff', '#f8f9fa']}
                          className="rounded-2xl p-1"
                        >
                          <View className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
                            <BandMemberCard
                              member={member}
                              onPress={() =>
                                router.push(
                                  `/directory/members/${member.id}` as const,
                                )
                              }
                              role={role as BandRole}
                            />
                          </View>
                        </LinearGradient>
                      </View>
                    );
                  })}
                </View>
              )}

              {organizedMembers.members.length > 0 && (
                <View className="py-4 pt-4">
                  {organizedMembers.members.map((member, index) => (
                    <View key={member.id}>
                      <BandMemberCard
                        member={member}
                        onPress={() =>
                          router.push(
                            `/directory/members/${member.id}` as const,
                          )
                        }
                        role="Member"
                      />
                    </View>
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

export default BandDetailsScreen;
