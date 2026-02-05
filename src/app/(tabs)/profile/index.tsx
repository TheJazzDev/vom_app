import { BandBadge } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons';
import { IconSymbolName } from '@/src/components/Icons/IconSymbol';
import { Badge, Card, Text } from '@/src/components/UI';
import { LevelIndicator } from '@/src/components/Gamification';
import { useTheme } from '@/src/hooks';
import { dispatch, logoutThunk, useAuthSlice, useGamificationSlice } from '@/src/store';
import { fetchUserEngagementThunk } from '@/src/store/thunks';
import { getUserInitials } from '@/src/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState, useEffect } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  View,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';
import { useRouter } from 'expo-router';

export default function ProfileIndex() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggingOut } = useAuthSlice();
  const { engagement } = useGamificationSlice();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserEngagementThunk(user.id));
    }
  }, [dispatch, user?.id]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (user?.id) {
        await dispatch(fetchUserEngagementThunk(user.id));
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error refreshing profile:', error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, user?.id]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      router.replace('/auth');
    } catch (error: any) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
      console.error('Logout error:', error);
    }
  };

  const confirmLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: handleLogout,
      },
    ]);
  };

  const getVerificationStatus = () => {
    if (user?.verified) return { text: 'Verified', color: '#10B981' };
    if (user?.emailVerified || user?.phoneVerified)
      return { text: 'Partially Verified', color: '#F59E0B' };
    return { text: 'Unverified', color: '#EF4444' };
  };

  const quickStats = [
    {
      label: 'Join Date',
      value: user?.joinDate,
      icon: 'calendar' as IconSymbolName,
    },
    {
      label: 'Status',
      value: user?.status,
      icon: 'checkmark.circle' as IconSymbolName,
    },
    {
      label: 'Member ID',
      value: user?.id,
      icon: 'number.circle' as IconSymbolName,
    },
  ];

  const verificationStatus = getVerificationStatus();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.primary}
          colors={[theme.primary]}
        />
      }
    >
      {/* Enhanced Profile Header */}
      <View className="relative">
        <LinearGradient
          colors={
            isDark
              ? ['#1E293B', '#334155'] // Subtle dark gradient for dark mode
              : [theme.primary, theme.secondary || theme.primary] // Original gradient for light mode
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: 24,
            paddingBottom: 40,
            paddingHorizontal: 24,
          }}
        >
          {/* Decorative background */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: isDark ? 0.05 : 0.08,
            }}
          >
            <View style={{ position: 'absolute', top: 20, right: 30 }}>
              <IconSymbol name="person.3.fill" size={100} color="white" />
            </View>
            <View style={{ position: 'absolute', bottom: 30, left: 30 }}>
              <IconSymbol name="heart.fill" size={80} color="white" />
            </View>
            <View style={{ position: 'absolute', top: 80, left: 60 }}>
              <IconSymbol name="star.fill" size={40} color="white" />
            </View>
          </View>

          {/* Header Actions */}
          <View className="absolute top-6 right-6 flex-row gap-2">
            {/* Logout Button */}
            <Pressable
              onPress={confirmLogout}
              disabled={isLoggingOut}
              className="rounded-full p-2.5"
              style={{
                backgroundColor: isDark ? '#EF4444' : 'rgba(239,68,68,0.95)',
                borderWidth: 1.5,
                borderColor: '#DC2626',
                opacity: isLoggingOut ? 0.5 : 1,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 4,
              }}
              android_ripple={{ color: 'rgba(185,28,28,0.5)' }}
            >
              {isLoggingOut ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <IconSymbol
                  name="rectangle.portrait.and.arrow.right"
                  size={20}
                  color="white"
                />
              )}
            </Pressable>

            {/* Edit Profile Button */}
            <Pressable
              onPress={() => router.push('/profile/edit')}
              className="rounded-full p-2.5"
              style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                borderWidth: 1.5,
                borderColor: 'rgba(255,255,255,0.4)',
              }}
              android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
            >
              <IconSymbol name="pencil" size={20} color="white" />
            </Pressable>
          </View>

          <View
            className="rounded-full px-4 py-2 self-start mb-4"
            style={{
              backgroundColor: `${verificationStatus.color}20`,
              borderWidth: 1.5,
              borderColor: verificationStatus.color,
            }}
          >
            <View className="flex-row items-center">
              <IconSymbol
                name={
                  user?.verified
                    ? 'checkmark.seal.fill'
                    : 'exclamationmark.triangle.fill'
                }
                size={18}
                color={verificationStatus.color}
              />
              <Text
                variant="caption"
                className="ml-2 font-bold"
                style={{ color: verificationStatus.color }}
              >
                {verificationStatus.text}
              </Text>
            </View>
          </View>

          {/* Profile Info - Centered */}
          <View className="items-center relative z-10">
            <View className="relative mb-4">
              <View
                className="w-28 h-28 rounded-full overflow-hidden"
                style={{
                  borderWidth: 5,
                  borderColor: 'rgba(255,255,255,0.3)',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                {user?.avatar ? (
                  <Image
                    source={{ uri: user.avatar }}
                    className="w-full h-full"
                  />
                ) : (
                  <View
                    className="w-full h-full items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
                  >
                    <Text variant="h1" className="text-white font-bold">
                      {user?.firstName &&
                        getUserInitials(user.firstName, user.lastName)}
                    </Text>
                  </View>
                )}
              </View>
              {user?.verified && (
                <View
                  className="absolute bottom-1 right-1 w-8 h-8 rounded-full items-center justify-center"
                  style={{
                    backgroundColor: '#10B981',
                    borderWidth: 3,
                    borderColor: 'white',
                  }}
                >
                  <IconSymbol name="checkmark" size={16} color="white" />
                </View>
              )}
            </View>

            <View className="items-center">
              <Text
                variant="h2"
                className="text-white font-bold text-center mb-1"
              >
                {user?.title} {user?.firstName} {user?.lastName}
              </Text>
              <View className="flex-row items-center mb-2">
                <IconSymbol
                  name="envelope.fill"
                  size={14}
                  color="rgba(255,255,255,0.8)"
                />
                <Text variant="body" className="text-white/80 ml-2">
                  {user?.email || 'No email provided'}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Quick Stats */}
      <Card variant="outlined" className="px-4 mt-4 relative z-10 mb-6 mx-4">
        <View className="flex-row justify-between">
          {quickStats.map((stat, index) => (
            <View key={index} className="flex-1 items-center">
              <IconSymbol name={stat.icon} size={20} color={theme.primary} />
              <Text
                variant="h6"
                className={`font-bold mt-2 ${stat.label === 'Status' ? 'capitalize' : ''}`}
                style={{ color: theme.heading }}
              >
                {stat.value}
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Level Progress */}
      {engagement && (
        <View className="px-4 mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text
              variant="h5"
              className="font-semibold"
              style={{ color: theme.heading }}
            >
              Your Journey
            </Text>
            <Pressable onPress={() => router.push('/profile/achievements')}>
              <View className="flex-row items-center gap-1">
                <Text variant="caption" style={{ color: theme.primary }}>
                  View All
                </Text>
                <IconSymbol
                  name="chevron.right"
                  size={14}
                  color={theme.primary}
                />
              </View>
            </Pressable>
          </View>
          <Card variant="gradient-soft" className="rounded-xl p-4">
            <LevelIndicator
              points={engagement.points}
              showProgress={true}
              showName={true}
              size="md"
            />
            <View
              className="flex-row items-center justify-between mt-4 pt-4"
              style={[styles.statsRow, { borderTopColor: theme.border }]}
            >
              <View className="flex-1 items-center">
                <View className="flex-row items-center gap-1">
                  <IconSymbol name="star.fill" size={16} color="#F59E0B" />
                  <Text
                    variant="h6"
                    className="font-bold"
                    style={{ color: theme.heading }}
                  >
                    {engagement.points}
                  </Text>
                </View>
                <Text variant="caption" style={{ color: theme.muted }}>
                  Points
                </Text>
              </View>
              <View
                style={[styles.divider, { backgroundColor: theme.border }]}
              />
              <View className="flex-1 items-center">
                <View className="flex-row items-center gap-1">
                  <IconSymbol name="flame.fill" size={16} color="#EF4444" />
                  <Text
                    variant="h6"
                    className="font-bold"
                    style={{ color: theme.heading }}
                  >
                    {engagement.streakDays}
                  </Text>
                </View>
                <Text variant="caption" style={{ color: theme.muted }}>
                  Day Streak
                </Text>
              </View>
            </View>
          </Card>
        </View>
      )}

      {/* Contact Information */}
      <View className="px-4 mb-6">
        <Text
          variant="h5"
          className="font-semibold mb-2"
          style={{ color: theme.heading }}
        >
          Contact Information
        </Text>
        <Card variant="gradient-soft" className="rounded-xl p-4">
          {user?.email && (
            <View className="flex-row items-center mb-3">
              <IconSymbol
                name="envelope.fill"
                size={18}
                color={theme.primary}
              />
              <Text
                variant="subtitle2"
                className="ml-3"
                style={{ color: theme.text }}
              >
                {user.email}
              </Text>
            </View>
          )}
          {user?.primaryPhone && (
            <View className="flex-row items-center mb-3">
              <IconSymbol name="phone.fill" size={18} color={theme.primary} />
              <Text
                variant="subtitle2"
                className="ml-3"
                style={{ color: theme.text }}
              >
                {user.primaryPhone}
              </Text>
            </View>
          )}
          {user?.secondaryPhone && (
            <View className="flex-row items-center mb-3">
              <IconSymbol
                name="phone.badge.plus"
                size={18}
                color={theme.primary}
              />
              <Text
                variant="subtitle2"
                className="ml-3"
                style={{ color: theme.text }}
              >
                {user.secondaryPhone}
              </Text>
            </View>
          )}
          {user?.address && (
            <View className="flex-row items-start">
              <IconSymbol
                name="location.fill"
                size={18}
                color={theme.primary}
              />
              <Text
                variant="subtitle2"
                className="ml-3 flex-1"
                style={{ color: theme.text }}
              >
                {user.address}
              </Text>
            </View>
          )}
        </Card>
      </View>

      {/* Personal Information */}
      <View className="px-4 mb-6">
        <Text
          variant="h5"
          className="font-semibold mb-2"
          style={{ color: theme.heading }}
        >
          Personal Information
        </Text>
        <Card variant="gradient-soft" className="rounded-xl p-4">
          <View className="flex-row justify-between mb-3">
            <Text variant="body" style={{ color: theme.muted }}>
              Date of Birth
            </Text>
            <Text variant="body" style={{ color: theme.text }}>
              {user?.dob || 'Not provided'}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text variant="body" style={{ color: theme.muted }}>
              Gender
            </Text>
            <Text
              variant="body"
              className="capitalize"
              style={{ color: theme.text }}
            >
              {user?.gender || 'Not specified'}
            </Text>
          </View>
        </Card>
      </View>

      {/* BandData & Position Information */}
      {(user?.band?.length ||
        user?.position?.length ||
        user?.department?.length) && (
        <View className="px-4 mb-6">
          <Text
            variant="h5"
            className="font-semibold mb-2"
            style={{ color: theme.heading }}
          >
            Church Involvement
          </Text>
          <Card variant="gradient-soft">
            {user?.position && user.position.length > 0 && (
              <View className="mb-4">
                <Text
                  variant="body"
                  className="mb-2 font-semibold"
                  style={{ color: theme.muted }}
                >
                  Positions:
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {user.position.map((pos, index) => (
                    <Badge key={index}>{pos}</Badge>
                  ))}
                </View>
              </View>
            )}
            {user?.band && user.band.length > 0 && (
              <View className="mb-4">
                <Text
                  variant="body"
                  className="mb-2 font-semibold"
                  style={{ color: theme.muted }}
                >
                  Bands
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {user.bandKeys.map((band: BandKeys, index) => (
                    <BandBadge key={index} band={band} />
                  ))}
                </View>
              </View>
            )}
            {user?.department && user.department.length > 0 && (
              <View className="mb-4">
                <Text
                  variant="body"
                  className="mb-2 font-semibold"
                  style={{ color: theme.muted }}
                >
                  Departments
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {user.departmentKeys.map((dept, index) => (
                    <Badge key={index}>{dept}</Badge>
                  ))}
                </View>
              </View>
            )}
          </Card>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    borderTopWidth: 1,
  },
  divider: {
    width: 1,
    height: 40,
  },
});
