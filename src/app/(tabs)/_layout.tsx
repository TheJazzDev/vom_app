import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { useAndroidNavigationBar, useTheme } from '@/src/hooks';
import { Platform } from 'react-native';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const theme = useTheme();

  // Don't apply bottom safe area edges
  // The tab bar already handles safe area internally with its height and padding
  // Adding SafeAreaView bottom edge creates excessive spacing
  const edges: Edges = [];

  return (
    <SafeAreaView
      edges={edges}
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          headerTitleAlign: 'center',
          headerTintColor: theme.brand,
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
            borderColor: theme.border,
          },
          // Use 'fade' animation for smooth transitions without black screens
          // 'shift' animation on iOS can cause black screen flashes
          animation: 'fade',
          // Keep tabs mounted to prevent blank screens during transitions
          lazy: false,
          // Don't freeze content when blurred to prevent render issues
          freezeOnBlur: false,
          // Optimize for performance
          unmountOnBlur: false,
        }}
      >
        <Tabs.Screen
          name="index"
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
          name="programme"
          options={{
            title: 'Programme',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol
                size={22}
                name={
                  focused
                    ? 'list.bullet.clipboard.fill'
                    : 'list.bullet.clipboard'
                }
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="directory"
          options={{
            title: 'Directory',
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
          name="ministry"
          options={{
            title: 'Ministry',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol
                size={22}
                name={focused ? 'book.fill' : 'book'}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="more"
          options={{
            title: 'More',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <IconSymbol
                size={22}
                name={focused ? 'info.circle.fill' : 'info.circle'}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        {/* <Tabs.Screen
          name="home"
          options={{
            href: null,
            headerShown: false,
          }}
        /> */}
        <Tabs.Screen
          name="notifications"
          options={{
            href: null,
            headerShown: false,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
