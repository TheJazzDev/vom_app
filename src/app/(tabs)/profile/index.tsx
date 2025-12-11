import { BandBadge } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons';
import { IconSymbolName } from '@/src/components/Icons/IconSymbol';
import { Badge, Card, Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { useAuthSlice } from '@/src/store';
import { getUserInitials } from '@/src/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { Image, RefreshControl, ScrollView, View } from 'react-native';

export default function ProfileIndex() {
  const theme = useTheme();
  const { currentUser } = useAuthSlice();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // TODO: Fetch updated user data when API is available
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error refreshing profile:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // const getStatusColor = (status: string | undefined) => {
  //   return status === 'active' ? '#10B981' : '#F59E0B';
  // };

  const getVerificationStatus = () => {
    if (currentUser?.verified) return { text: 'Verified', color: '#10B981' };
    if (currentUser?.emailVerified || currentUser?.phoneVerified)
      return { text: 'Partially Verified', color: '#F59E0B' };
    return { text: 'Unverified', color: '#EF4444' };
  };

  const quickStats = [
    {
      label: 'Join Date',
      value: currentUser?.joinDate,
      icon: 'calendar' as IconSymbolName,
    },
    {
      label: 'Status',
      value: currentUser?.status,
      icon: 'checkmark.circle' as IconSymbolName,
    },
    {
      label: 'Member ID',
      value: currentUser?.id,
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
          colors={[theme.primary, theme.secondary || theme.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: 24,
            paddingBottom: 80,
            paddingHorizontal: 24,
          }}
        >
          {/* Background Pattern - Enhanced */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.08,
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

          {/* Verification Badge - Improved */}
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
                  currentUser?.verified
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
                {currentUser?.avatar ? (
                  <Image
                    source={{ uri: currentUser.avatar }}
                    className="w-full h-full"
                  />
                ) : (
                  <View
                    className="w-full h-full items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
                  >
                    <Text variant="h1" className="text-white font-bold">
                      {currentUser?.firstName &&
                        getUserInitials(
                          currentUser.firstName,
                          currentUser.lastName,
                        )}
                    </Text>
                  </View>
                )}
              </View>
              {/* Online/Verified Indicator */}
              {currentUser?.verified && (
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
                {currentUser?.title} {currentUser?.firstName}{' '}
                {currentUser?.lastName}
              </Text>
              <View className="flex-row items-center mb-2">
                <IconSymbol
                  name="envelope.fill"
                  size={14}
                  color="rgba(255,255,255,0.8)"
                />
                <Text variant="body" className="text-white/80 ml-2">
                  {currentUser?.email || 'No email provided'}
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
          {currentUser?.email && (
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
                {currentUser.email}
              </Text>
            </View>
          )}
          {currentUser?.primaryPhone && (
            <View className="flex-row items-center mb-3">
              <IconSymbol name="phone.fill" size={18} color={theme.primary} />
              <Text
                variant="subtitle2"
                className="ml-3"
                style={{ color: theme.text }}
              >
                {currentUser.primaryPhone}
              </Text>
            </View>
          )}
          {currentUser?.secondaryPhone && (
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
                {currentUser.secondaryPhone}
              </Text>
            </View>
          )}
          {currentUser?.address && (
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
                {currentUser.address}
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
              {currentUser?.dob || 'Not provided'}
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
              {currentUser?.gender || 'Not specified'}
            </Text>
          </View>
        </Card>
      </View>

      {/* BandData & Position Information */}
      {(currentUser?.band?.length ||
        currentUser?.position?.length ||
        currentUser?.department?.length) && (
        <View className="px-4 mb-6">
          <Text
            variant="h5"
            className="font-semibold mb-2"
            style={{ color: theme.heading }}
          >
            Church Involvement
          </Text>
          <Card
            variant="gradient-soft"
            className="rounded-xl p-4 "
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            {currentUser?.position && currentUser.position.length > 0 && (
              <View className="mb-4">
                <Text
                  variant="body"
                  className="mb-2 font-semibold"
                  style={{ color: theme.muted }}
                >
                  Positions:
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {currentUser.position.map((pos, index) => (
                    <Badge key={index}>{pos}</Badge>
                  ))}
                </View>
              </View>
            )}
            {currentUser?.band && currentUser.band.length > 0 && (
              <View className="mb-4">
                <Text
                  variant="body"
                  className="mb-2 font-semibold"
                  style={{ color: theme.muted }}
                >
                  Bands
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {currentUser.bandKeys.map((band: BandKeys, index) => (
                    <BandBadge key={index} band={band} />
                  ))}
                </View>
              </View>
            )}
            {currentUser?.department && currentUser.department.length > 0 && (
              <View className="mb-4">
                <Text
                  variant="body"
                  className="mb-2 font-semibold"
                  style={{ color: theme.muted }}
                >
                  Departments
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {currentUser.departmentKeys.map((dept, index) => (
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
