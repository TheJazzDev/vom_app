import { Tabs, useNavigation, useRouter } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { useTheme } from '@/src/hooks';
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Platform, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const theme = useTheme();
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
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
          paddingTop: 10,
          // borderTopColor: theme.tertiary,
          borderTopWidth: 1,
          backgroundColor: theme.background,
          elevation: 0,
          shadowOpacity: 0,
          borderStyle: 'solid',
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 12 }}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Feather name='align-left' size={24} color={theme.muted} />
          </TouchableOpacity>
        ),
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
      
    </Tabs>
  );
}
