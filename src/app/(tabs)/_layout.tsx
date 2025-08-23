import { Tabs, useRouter } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { useTheme } from '@/src/hooks';
import { Platform, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarButton: HapticTab,
        headerTitleAlign: 'center',
        headerTintColor: theme.brand,
        tabBarActiveTintColor: theme.brand,
        tabBarInactiveTintColor: theme.muted,
        headerStyle: {
          // height: 90,
          backgroundColor: theme.background2,
        },
        tabBarStyle: {
          height: 85,
          paddingTop: 10,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          backgroundColor: theme.background2,
          elevation: 0,
          shadowOpacity: 0,
          borderStyle: 'solid',
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              router.push('/notification');
            }}
            style={{ marginRight: 12 }}>
            <IconSymbol size={24} name='bell.fill' color={theme.muted} />
          </TouchableOpacity>
        ),
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={22}
              name={focused ? 'house.fill' : 'house'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='programme'
        options={{
          title: 'Programme',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={22}
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
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={Platform.OS === 'ios' ? 32 : 22}
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
              size={22}
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
              size={22}
              name={focused ? 'gearshape.fill' : 'gearshape'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
