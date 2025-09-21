import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import {
  HeaderLeft,
  HeaderRight,
} from '@/src/components/ScreenOptions/StackScreen';
import { useTheme } from '@/src/hooks';
import { Platform } from 'react-native';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        headerTitleAlign: 'center',
        headerTintColor: theme.heading,
        tabBarActiveTintColor: theme.body,
        tabBarInactiveTintColor: theme.muted,
        headerStyle: {
          backgroundColor: theme.background,
        },
        tabBarStyle: {
          height: 85,
          paddingTop: 6,
          borderTopWidth: 1,
          backgroundColor: theme.background,
          elevation: 0,
          shadowOpacity: 0,
          borderStyle: 'solid',
          borderColor: theme.border,
        },
        headerLeft: () => <HeaderLeft margin={0} />,
        headerRight: () => <HeaderRight />,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          headerShown: true,
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
        name='directory'
        options={{
          title: 'Directory',
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
        name='ministry'
        options={{
          title: 'Ministry',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={22}
              name={focused ? 'book.fill' : 'book'}
              color={color}
            />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="ministry"
        options={{
          title: 'Ministry',
          tabBarButton: () => null,
        }}
      /> */}
    </Tabs>
  );
}
