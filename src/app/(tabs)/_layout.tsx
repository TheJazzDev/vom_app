import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { useAndroidNavigationBar, useTheme } from '@/src/hooks';
import { Platform } from 'react-native';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const theme = useTheme();
  const { shouldApplyBottomSafeArea } = useAndroidNavigationBar();

  const edges = shouldApplyBottomSafeArea ? ['bottom'] : [];

  return (
    <SafeAreaView
      edges={edges as Edges}
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
          animation: Platform.OS === 'ios' ? 'shift' : 'fade',
          // Keep tabs mounted to prevent blank screens during transitions
          lazy: false,
          // Don't freeze content when blurred to prevent render issues
          freezeOnBlur: false,
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
