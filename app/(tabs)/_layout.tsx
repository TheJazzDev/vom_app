import { Tabs, useRouter } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/hooks';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
  // const router = useRouter();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarButton: HapticTab,
        headerTitleAlign: 'center',
        headerTintColor: theme.text,
        tabBarActiveTintColor: theme.activeTint,
        tabBarInactiveTintColor: theme.inactiveTint,
        tabBarStyle: {
          height: 90,
          paddingTop: 10,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              // router.push('/notification');
            }}
            style={{ marginRight: 16 }}>
            <IconSymbol size={28} name='bell.fill' color={theme.icon} />
          </TouchableOpacity>
        ),
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
          title: 'Service Order',
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
        name='members/index'
        options={{
          title: 'Members',
          // headerShown: true,
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
