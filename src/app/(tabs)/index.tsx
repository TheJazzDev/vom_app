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
import { useTheme } from '@/src/hooks';
import { useAuthSlice } from '@/src/store';
import { truncateText } from '@/src/utils';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';

export default function ChurchDashboard() {
  const theme = useTheme();
  const { currentMember } = useAuthSlice();

  return (
    <View gradient scrollable>
      <Devotionals />

      <View className="flex-row gap-2 items-center">
        <Text variant="h2" color="heading">
          Welcome, {currentMember?.firstName}
        </Text>
        <HelloWave />
      </View>

      <Text className="mb-5">Stay connected with church activities.</Text>

      <View className="flex-row justify-between mb-5">
        {[
          { label: 'View Service' },
          { label: 'Prayer Request' },
          { label: 'Donate' },
        ].map((btn, idx) => (
          <Button variant="secondary" key={idx} className="flex-1 mx-1">
            <Text variant="body" color="heading">
              {btn.label}
            </Text>
          </Button>
        ))}
      </View>

      {/* Next Service */}
      <Card variant="ghost" className="mb-6">
        <Text variant="h4" color="heading" className="tracking-wide">
          Next Service
        </Text>
        <Text variant="label" color="body" className="mb-4">
          Sunday Service
        </Text>
        <View className="flex-row gap-2 items-center">
          <MaterialIcons name="access-time" size={16} color={theme.muted} />
          <Text variant="body2">Time: 10:00 AM</Text>
        </View>
        <View className="flex-row gap-2 items-center my-0.5">
          <IconSymbol name="calendar" size={16} color={theme.muted} />
          <Text variant="body2">Date: 15 Auguest, 2025</Text>
        </View>
        <View className="flex-row gap-2 items-center mb-4">
          <IconSymbol name="book" size={16} color={theme.muted} />
          <Text variant="body2">Theme: More Than Conquerors</Text>
        </View>

        <Button>View Full Order of Service</Button>
      </Card>

      {/* Announcements */}
      <Card variant="outlined" className="mb-5">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row gap-2 items-center">
            <IconSymbol name="megaphone.fill" size={20} color={theme.muted} />
            <Text variant="h5" color="heading">
              Announcements
            </Text>
          </View>
          <Link
            href="/announcement"
            className="underline tracking-wide text-body dark:text-dark-body text-sm"
          >
            View all
          </Link>
        </View>

        <View className="p-4 rounded-lg flex-row items-center mb-2 gap-6 border-s-4 bg-surfaceStrong dark:bg-dark-surfaceStrong border-secondary dark:border-dark-border-secondary">
          <Text color="heading" className="flex-1">
            {truncateText(
              'The light version feels a bit “washed-out” compared to the richness of your dark brand set. To fix that, we can derive lighter tints directly from your brand color #0D1B2A.',
              110,
            )}
          </Text>
          <Badge>High</Badge>
        </View>
        <View className="p-4 rounded-lg flex-row items-center mb-2 gap-6 border-s-4 bg-surfaceStrong dark:bg-dark-surfaceStrong border-secondary dark:border-dark-border-secondary">
          <Text color="heading" className="flex-1">
            {truncateText(
              'The light version feels a bit “washed-out” compared to the richness of your dark brand set. To fix that, we can derive lighter tints directly from your brand color #0D1B2A.',
              110,
            )}
          </Text>
          <Badge>Medium</Badge>
        </View>
      </Card>

      {/* Recent Sermons */}
      <Card variant="outlined" className="mb-5">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row gap-2 items-center">
            <IconSymbol name="book.fill" size={20} color={theme.muted} />
            <Text variant="h5" color="heading">
              Recent Sermons
            </Text>
          </View>
          <Link
            href="/ministry/recent-sermons"
            className="underline tracking-wide text-body dark:text-dark-body text-sm"
          >
            View all
          </Link>
        </View>
        <Card className="flex-row items-center gap-3 border border-secondary">
          <IconSymbol name="play.circle.fill" size={30} color={theme.muted} />
          <View>
            <Text color="heading">More Than Conquerors</Text>
            <Text variant="body2">Pastor John Smith · 30 min</Text>
          </View>
        </Card>
        <Card className="flex-row items-center gap-3 border border-secondary">
          <IconSymbol name="play.circle.fill" size={30} color={theme.muted} />
          <View>
            <Text color="heading">The Power of Love</Text>
            <Text variant="body2">Elder Michael Brown · 25 min</Text>
          </View>
        </Card>
      </Card>

      {/* Prayer Requests */}
      <Card variant="outlined" className="mb-5">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row gap-2 items-center">
            <IconSymbol
              name="hand.palm.facing.fill"
              size={20}
              color={theme.muted}
            />
            <Text variant="h5" color="heading">
              Prayer Requests
            </Text>
          </View>
          <Link
            href="/ministry/prayer-request"
            className="underline tracking-wide text-body dark:text-dark-body text-sm"
          >
            View all
          </Link>
        </View>

        <Card className="border border-secondary">
          <Text color="heading">Prayer for wellbeing</Text>
          <Text variant="body2">- Sis Bola Are</Text>
        </Card>
        <Card className="border border-secondary">
          <Text color="heading">Prayer for journey mercy</Text>
          <Text variant="body2">- Bro Seun Ojo</Text>
        </Card>
      </Card>
    </View>
  );
}
