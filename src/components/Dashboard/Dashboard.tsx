import {
  Badge,
  Button,
  Card,
  HelloWave,
  IconSymbol,
  Text,
  View,
} from '@/src/components';
import Devotionals from '@/src/components/Devotionals';
import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { useAuthSlice } from '@/src/store';
import { truncateText } from '@/src/utils';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView } from 'react-native';

export default function ChurchDashboard() {
  const theme = useTheme();
  const router = useRouter();
  const { currentUser } = useAuthSlice();
  const [timeUntilService, setTimeUntilService] = useState('');

  // Calculate time until next service
  useEffect(() => {
    const calculateTimeUntilService = () => {
      const now = new Date();
      const nextSunday = new Date();
      nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7));
      nextSunday.setHours(10, 0, 0, 0);

      const timeDiff = nextSunday.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );

      if (days > 0) {
        setTimeUntilService(`${days}d ${hours}h`);
      } else {
        setTimeUntilService(`${hours}h`);
      }
    };

    calculateTimeUntilService();
    const interval = setInterval(calculateTimeUntilService, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      {/* Hero Section */}
      <LinearGradient
        colors={[theme.primary, theme.secondary || theme.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: 20, height: 100 }}
      >
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <Text variant="h2" className="text-white font-bold mr-2">
              Welcome, {currentUser ? currentUser.firstName : 'Guest'}
            </Text>
            <HelloWave />
          </View>
          <Text variant="body" className="text-white/90">
            Stay connected with church activities
          </Text>
        </View>
      </LinearGradient>

      <Devotionals />

      <View style={{ padding: 10, marginTop: -4 }}>
        {/* Next Service - Enhanced */}
        <Card variant="ghost" className="mb-6 relative overflow-hidden">
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
                  style={{ backgroundColor: `${theme.primary}20` }}
                >
                  <IconSymbol
                    name="building.2.fill"
                    size={20}
                    color={theme.primary}
                  />
                </View>
                <View>
                  <Text variant="h4" color="heading" className="font-bold">
                    Next Service
                  </Text>
                  <Text
                    variant="body"
                    className="font-medium"
                    style={{ color: theme.primary }}
                  >
                    Sunday Worship Service
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text variant="caption" style={{ color: theme.muted }}>
                  Time until service
                </Text>
                <Text
                  variant="h4"
                  className="font-bold"
                  style={{ color: theme.primary }}
                >
                  {timeUntilService}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between mb-4">
              <View className="flex-row items-center">
                <MaterialIcons
                  name="access-time"
                  size={16}
                  color={theme.muted}
                />
                <Text variant="body" className="ml-2">
                  10:00 AM
                </Text>
              </View>
              <View className="flex-row items-center">
                <IconSymbol name="calendar" size={16} color={theme.muted} />
                <Text variant="body" className="ml-2">
                  15 March, 2025
                </Text>
              </View>
            </View>

            <View className="bg-primary/5 rounded-lg p-3 mb-4">
              <View className="flex-row items-center">
                <IconSymbol name="book.fill" size={16} color={theme.primary} />
                <Text
                  variant="body"
                  className="ml-2 font-semibold"
                  style={{ color: theme.primary }}
                >
                  Theme: &quot;More Than Conquerors&quot;
                </Text>
              </View>
            </View>

            <Button className="w-full">
              <Text variant="button" className="text-white font-semibold">
                View Full Order of Service
              </Text>
            </Button>
          </View>
        </Card>

        {/* Announcements - Enhanced */}
        <Card variant="outlined" className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: '#EF444415' }}
              >
                <IconSymbol name="megaphone.fill" size={18} color="#EF4444" />
              </View>
              <Text variant="h4" color="heading" className="font-bold">
                Announcements
              </Text>
            </View>
            <Link href={ROUTES.ANNOUNCEMENT}>
              <Text variant="body" style={{ color: theme.primary }}>
                View all
              </Text>
            </Link>
          </View>

          <Pressable
            onPress={() => router.push('/info/announcements/1' as any)}
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              borderLeftWidth: 4,
              borderLeftColor: '#EF4444',
            }}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1 mr-3">
                <Text color="heading" className="font-semibold mb-2">
                  Church Revival: 7 Days of Glory
                </Text>
                <Text variant="body" style={{ color: theme.muted }}>
                  {truncateText(
                    'Join us for a powerful 7-day revival program starting March 15th. Special guest minister...',
                    80,
                  )}
                </Text>
              </View>
              <Badge>High</Badge>
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.push('/info/announcements/2' as any)}
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 12,
              padding: 16,
              borderLeftWidth: 4,
              borderLeftColor: '#F59E0B',
            }}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1 mr-3">
                <Text color="heading" className="font-semibold mb-2">
                  Youth Camp Registration Open
                </Text>
                <Text variant="body" style={{ color: theme.muted }}>
                  {truncateText(
                    'Annual youth camp "Ignite 2024" registration is now open. Early bird discount...',
                    80,
                  )}
                </Text>
              </View>
              <Badge>Medium</Badge>
            </View>
          </Pressable>
        </Card>

        {/* Recent Sermons - Enhanced */}
        <Card variant="outlined" className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: '#10B98115' }}
              >
                <IconSymbol name="book.fill" size={18} color="#10B981" />
              </View>
              <Text variant="h4" color="heading" className="font-bold">
                Recent Sermons
              </Text>
            </View>
            <Link href={ROUTES.RECENT_SERMONS}>
              <Text variant="body" style={{ color: theme.primary }}>
                View all
              </Text>
            </Link>
          </View>

          <Pressable
            onPress={() => router.push('/ministry/recent-sermons/1' as any)}
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
            }}
          >
            <View className="flex-row items-center">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: '#3B82F615' }}
              >
                <IconSymbol name="play.circle.fill" size={24} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text color="heading" className="font-semibold mb-1">
                  More Than Conquerors
                </Text>
                <Text variant="body" style={{ color: theme.muted }}>
                  Pastor David Johnson • 30 min
                </Text>
                <Text variant="caption" style={{ color: theme.primary }}>
                  March 10, 2025 • 1.2k views
                </Text>
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.push('/ministry/recent-sermons/2' as any)}
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <View className="flex-row items-center">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: '#10B98115' }}
              >
                <IconSymbol name="play.circle.fill" size={24} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text color="heading" className="font-semibold mb-1">
                  The Power of Love
                </Text>
                <Text variant="body" style={{ color: theme.muted }}>
                  Elder Michael Brown • 25 min
                </Text>
                <Text variant="caption" style={{ color: theme.primary }}>
                  March 8, 2025 • 890 views
                </Text>
              </View>
            </View>
          </Pressable>
        </Card>

        {/* Prayer Requests - Enhanced */}
        <Card variant="outlined" className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: '#8B5CF615' }}
              >
                <IconSymbol
                  name="hands.sparkles.fill"
                  size={18}
                  color="#8B5CF6"
                />
              </View>
              <Text variant="h4" color="heading" className="font-bold">
                Prayer Requests
              </Text>
            </View>
            <Link href="/ministry/prayer-request">
              <Text variant="body" style={{ color: theme.primary }}>
                View all
              </Text>
            </Link>
          </View>

          <View
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text color="heading" className="font-semibold mb-1">
                  Prayer for healing and restoration
                </Text>
                <Text variant="body" style={{ color: theme.muted }}>
                  Sister Grace A. • 2 hours ago
                </Text>
              </View>
              <Text variant="caption" style={{ color: theme.primary }}>
                12 prayers
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 12,
              padding: 16,
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text color="heading" className="font-semibold mb-1">
                  Safe travels and journey mercies
                </Text>
                <Text variant="body" style={{ color: theme.muted }}>
                  Brother Samuel O. • 4 hours ago
                </Text>
              </View>
              <Text variant="caption" style={{ color: theme.primary }}>
                8 prayers
              </Text>
            </View>
          </View>
        </Card>

        {/* Quick Navigation */}
        <Card variant="outlined" className="mb-6">
          <Text variant="h4" color="heading" className="font-bold mb-4">
            Quick Access
          </Text>
          <View className="flex-row justify-between">
            <Pressable
              onPress={() => router.push('/directory' as any)}
              className="items-center flex-1"
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <IconSymbol
                  name="person.3.fill"
                  size={20}
                  color={theme.primary}
                />
              </View>
              <Text
                variant="caption"
                className="text-center font-semibold"
                style={{ color: theme.text }}
              >
                Directory
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/ministry' as any)}
              className="items-center flex-1"
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: '#10B98115' }}
              >
                <IconSymbol name="cross.fill" size={20} color="#10B981" />
              </View>
              <Text
                variant="caption"
                className="text-center font-semibold"
                style={{ color: theme.text }}
              >
                Ministry
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/programme' as any)}
              className="items-center flex-1"
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: '#3B82F615' }}
              >
                <IconSymbol
                  name="calendar.badge.plus"
                  size={20}
                  color="#3B82F6"
                />
              </View>
              <Text
                variant="caption"
                className="text-center font-semibold"
                style={{ color: theme.text }}
              >
                Programmes
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/info' as any)}
              className="items-center flex-1"
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: '#F59E0B15' }}
              >
                <IconSymbol name="info.circle.fill" size={20} color="#F59E0B" />
              </View>
              <Text
                variant="caption"
                className="text-center font-semibold"
                style={{ color: theme.text }}
              >
                Church Info
              </Text>
            </Pressable>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
