import { useTheme } from '@/src/hooks';
import { SERVICE_CONFIG, useProgrammeLogic } from '@/src/hooks/programme';
import { useProgrammeSlice } from '@/src/store';
import { formatDate } from '@/src/utils';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { IconSymbol } from '../Icons';
import { Button, Card, Countdown, Text, View } from '../UI';

const NextService = () => {
  const theme = useTheme();
  const router = useRouter();
  const { isUpcomingProgrammesLoading } = useProgrammeSlice();
  const { currentProgramme, nextProgramme } = useProgrammeLogic();

  // Show current programme if active, otherwise show next programme
  const displayProgramme = currentProgramme || nextProgramme;
  const isCurrentService = !!currentProgramme;

  const getServiceTime = () => {
    if (!displayProgramme?.date) return '';

    const config =
      SERVICE_CONFIG[
        displayProgramme.type.toLowerCase() as keyof typeof SERVICE_CONFIG
      ];
    if (!config) return '';

    const startTime = new Date(displayProgramme.date);
    startTime.setHours(config.startHour, config.startMinute, 0, 0);

    return startTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getCountdownTarget = () => {
    if (isCurrentService && displayProgramme?.date) {
      // For current service, countdown to end time
      const programmeDate = new Date(displayProgramme.date);
      const config =
        SERVICE_CONFIG[
          displayProgramme.type.toLowerCase() as keyof typeof SERVICE_CONFIG
        ];

      if (config) {
        const endTime = new Date(programmeDate);
        endTime.setHours(
          endTime.getHours() + Math.floor(config.durationHours),
          endTime.getMinutes() + (config.durationHours % 1) * 60,
          0,
          0,
        );
        return endTime.toISOString();
      }
    } else if (!isCurrentService && displayProgramme?.date) {
      return displayProgramme.date;
    }
    return '';
  };

  const handleViewProgramme = () => {
    if (!displayProgramme) return;

    if (isCurrentService) {
      router.push('/programme/current');
    } else {
      router.push(`/programme/upcoming`);
    }
  };

  if (isUpcomingProgrammesLoading) {
    return (
      <Card variant="ghost" className="relative overflow-hidden">
        <LinearGradient
          colors={[`${theme.primary}10`, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <View className="relative z-10">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: `${theme.muted}20` }}
              >
                <IconSymbol
                  name="building.2.fill"
                  size={20}
                  color={theme.muted}
                />
              </View>
              <View>
                <View
                  className="h-5 rounded mb-2"
                  style={{ backgroundColor: `${theme.muted}20`, width: 100 }}
                />
                <View
                  className="h-4 rounded"
                  style={{ backgroundColor: `${theme.muted}15`, width: 140 }}
                />
              </View>
            </View>

            <View className="items-end">
              <View
                className="h-3 rounded mb-1"
                style={{ backgroundColor: `${theme.muted}15`, width: 80 }}
              />
              <View
                className="h-5 rounded"
                style={{ backgroundColor: `${theme.muted}20`, width: 60 }}
              />
            </View>
          </View>

          <View className="flex-row justify-between mb-4">
            <View
              className="h-4 rounded"
              style={{ backgroundColor: `${theme.muted}15`, width: 80 }}
            />
            <View
              className="h-4 rounded"
              style={{ backgroundColor: `${theme.muted}15`, width: 100 }}
            />
          </View>

          <View
            className="rounded-lg p-3 mb-4"
            style={{ backgroundColor: `${theme.muted}08` }}
          >
            <View
              className="h-4 rounded"
              style={{ backgroundColor: `${theme.muted}15`, width: 200 }}
            />
          </View>

          <View
            className="w-full h-12 rounded-lg"
            style={{ backgroundColor: `${theme.muted}20` }}
          />
        </View>
      </Card>
    );
  }

  if (!displayProgramme) {
    return (
      <Card variant="ghost" className="mb-6 relative overflow-hidden">
        <LinearGradient
          colors={[`${theme.muted}08`, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <View className="relative z-10 items-center">
          <View
            className="w-16 h-16 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: `${theme.muted}15` }}
          >
            <IconSymbol
              name="calendar.badge.clock"
              size={32}
              color={theme.muted}
            />
          </View>

          <Text
            variant="h4"
            className="font-semibold mb-2 text-center"
            style={{ color: theme.heading }}
          >
            No Upcoming Services
          </Text>

          <Text
            variant="body"
            className="text-center mb-4 px-4"
            style={{ color: theme.muted }}
          >
            Check back soon for the next scheduled programme
          </Text>

          <Button
            variant="outline"
            onPress={() => router.push('/programme/upcoming')}
            className="mt-2"
          >
            <Text variant="button" style={{ color: theme.primary }}>
              View All Programmes
            </Text>
          </Button>
        </View>
      </Card>
    );
  }

  return (
    <Card variant="ghost" className="mb-6 relative overflow-hidden">
      <LinearGradient
        colors={[
          isCurrentService ? `${theme.success}15` : `${theme.primary}10`,
          'transparent',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <View className="relative z-10">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-3"
              style={{
                backgroundColor: isCurrentService
                  ? `${theme.success}20`
                  : `${theme.primary}20`,
              }}
            >
              <IconSymbol
                name={isCurrentService ? 'play.circle.fill' : 'building.2.fill'}
                size={20}
                color={isCurrentService ? theme.success : theme.primary}
              />
            </View>
            <View>
              <Text variant="h4" color="heading" className="font-bold">
                {isCurrentService ? 'Current Service' : 'Next Service'}
              </Text>
              <Text
                variant="body"
                className="font-medium capitalize"
                style={{
                  color: isCurrentService ? theme.success : theme.primary,
                }}
              >
                {displayProgramme.type} Programme
              </Text>
              {isCurrentService && (
                <View className="flex-row items-center mt-1">
                  <View
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: theme.success }}
                  />
                  <Text
                    variant="caption"
                    className="font-semibold"
                    style={{ color: theme.success }}
                  >
                    LIVE
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View className="items-end">
            <Text
              variant="caption"
              style={{ color: theme.muted }}
              className="mb-1"
            >
              {isCurrentService ? 'Time remaining' : 'Time until service'}
            </Text>
            <Countdown targetDate={getCountdownTarget()} />
          </View>
        </View>

        <View className="flex-row justify-between mb-4">
          <View className="flex-row items-center">
            <MaterialIcons name="access-time" size={16} color={theme.muted} />
            <Text variant="body" className="ml-2">
              {getServiceTime()}
            </Text>
          </View>
          <View className="flex-row items-center">
            <IconSymbol name="calendar" size={16} color={theme.muted} />
            <Text variant="body" className="ml-2">
              {formatDate(displayProgramme.date)}
            </Text>
          </View>
        </View>

        {displayProgramme.theme && (
          <View
            className="rounded-lg p-3 mb-4"
            style={{
              backgroundColor: isCurrentService
                ? `${theme.gradient1}08`
                : `${theme.primary}08`,
            }}
          >
            <View className="flex-row items-center">
              <IconSymbol
                name="book.fill"
                size={16}
                color={isCurrentService ? theme.success : theme.primary}
              />
              <Text
                variant="body"
                className="ml-2 font-semibold"
                style={{
                  color: isCurrentService ? theme.success : theme.primary,
                }}
              >
                Theme: {displayProgramme.theme}
              </Text>
            </View>
          </View>
        )}

        <Button
          className="w-full"
          variant={isCurrentService ? 'success' : 'primary'}
          onPress={handleViewProgramme}
        >
          <Text variant="button" color="neutral" className="font-semibold">
            {isCurrentService
              ? 'Join Live Service'
              : 'View Full Order of Service'}
          </Text>
        </Button>
      </View>
    </Card>
  );
};

export default NextService;
