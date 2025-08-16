import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/hooks';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarInactiveTintColor: theme.iconColor,
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            paddingTop: 10,
            height: 90,
          },
        }),
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol name={focused ? 'house.fill' : 'house'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='order-of-service'
        options={{
          title: 'Order of Service',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              name={
                focused ? 'list.bullet.clipboard.fill' : 'list.bullet.clipboard'
              }
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='members'
        options={{
          title: 'Members',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              name={focused ? 'person.3.sequence.fill' : 'person.3.sequence'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              name={focused ? 'person.fill' : 'person'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              name={focused ? 'gearshape.fill' : 'gearshape'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
