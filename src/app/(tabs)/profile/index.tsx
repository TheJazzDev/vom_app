import { BandBadge } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons';
import { IconSymbolName } from '@/src/components/Icons/IconSymbol';
import { Badge, Card, Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { useAuthSlice } from '@/src/store';
import { getUserInitials } from '@/src/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, View } from 'react-native';

export default function ProfileIndex() {
  const theme = useTheme();
  const router = useRouter();
  const { currentUser } = useAuthSlice();

  const profileOptions = [
    {
      title: 'Edit Profile',
      description: 'Update your personal information',
      route: '/profile/edit',
      icon: 'person.crop.circle.fill',
      color: '#3B82F6',
    },
    {
      title: 'Profile Settings',
      description: 'Manage your account preferences',
      route: '/profile/settings',
      icon: 'gearshape.fill',
      color: '#10B981',
    },
  ];

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

  const OptionCard = ({ option }: { option: any }) => (
    <Pressable
      onPress={() => Alert.alert(`${option.title} is not available yet.`)}
      style={{
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
      }}
      android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
    >
      <View className="flex-row items-center">
        <View
          className="p-3 rounded-full mr-4"
          style={{ backgroundColor: `${option.color}15` }}
        >
          <IconSymbol name={option.icon} size={20} color={option.color} />
        </View>
        <View className="flex-1">
          <Text
            variant="h6"
            className="font-semibold mb-1"
            style={{ color: theme.heading }}
          >
            {option.title}
          </Text>
          <Text variant="subtitle2" style={{ color: theme.muted }}>
            {option.description}
          </Text>
        </View>
        <IconSymbol name="chevron.right" size={16} color={theme.muted} />
      </View>
    </Pressable>
  );

  const verificationStatus = getVerificationStatus();

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      {/* Profile Header */}
      <View className="relative">
        <LinearGradient
          colors={[theme.primary, theme.secondary || theme.primary]}
          style={{
            height: 110,
            justifyContent: 'flex-end',
            padding: 24,
          }}
        >
          {/* Background Pattern */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
            }}
          >
            <View style={{ position: 'absolute', top: 40, right: 40 }}>
              <IconSymbol name="person.3.fill" size={80} color="white" />
            </View>
            <View style={{ position: 'absolute', bottom: 40, left: 40 }}>
              <IconSymbol name="heart.fill" size={60} color="white" />
            </View>
          </View>

          <View
            className="rounded-xl px-2 py-1 w-fit absolute top-3 right-3"
            style={{
              backgroundColor: `${verificationStatus.color}10`,
              borderWidth: 1,
              borderColor: `${verificationStatus.color}30`,
            }}
          >
            <View className="flex-row items-center">
              <IconSymbol
                name={
                  currentUser?.verified
                    ? 'checkmark.seal.fill'
                    : 'exclamationmark.triangle.fill'
                }
                size={20}
                color={verificationStatus.color}
              />
              <Text
                variant="h6"
                className="ml-3 font-semibold"
                style={{ color: verificationStatus.color }}
              >
                {verificationStatus.text}
              </Text>
            </View>
          </View>

          {/* Profile Info */}
          <View className="flex-row items-center relative z-10">
            <View className="relative mr-4">
              <View className="w-20 h-20 rounded-full border-4 border-white overflow-hidden">
                {currentUser?.avatar ? (
                  <Image
                    source={{ uri: currentUser.avatar }}
                    className="w-full h-full"
                  />
                ) : (
                  <View
                    className="w-full h-full items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    <Text variant="h2" className="text-white font-bold">
                      {currentUser?.firstName &&
                        getUserInitials(
                          currentUser.firstName,
                          currentUser.lastName,
                        )}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View className="flex-1">
              <Text variant="h3" className="text-white font-bold">
                {currentUser?.title} {currentUser?.firstName}{' '}
                {currentUser?.lastName}
              </Text>
              <Text variant="body" className="text-white/90 dark:text-white/80">
                {currentUser?.email || 'No email provided'}
              </Text>
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

      {/* Profile Actions */}
      <View className="px-4 mb-6">
        <Text
          variant="h5"
          className="font-semibold mb-2"
          style={{ color: theme.heading }}
        >
          Profile Management
        </Text>
        {profileOptions.map((option, index) => (
          <OptionCard key={option.route} option={option} />
        ))}
      </View>
    </ScrollView>
  );
}
