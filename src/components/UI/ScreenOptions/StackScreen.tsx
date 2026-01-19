import { View } from '@/src/components';
import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack, useRouter } from 'expo-router';
import { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { ProfileHeader } from '../../Dashboard/Navigations/ProfileHeader';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { CardStyleInterpolators } from "@react-navigation/stack";

export const HeaderLeft = ({ margin = -14 }: { margin?: number }) => {
  const theme = useTheme();

  return (
    <View style={{ marginLeft: margin }}>
      <DrawerToggleButton tintColor={theme.muted} />
    </View>
  );
};

export const HeaderRight = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(ROUTES.NOTIFICATIONS)}
      style={{ marginRight: 0 }}
    >
      <Ionicons size={24} name="notifications" color={theme.muted} />
    </TouchableOpacity>
  );
};

export const StackWrapper = ({
  children,
  headerRight = true,
}: {
  children?: ReactNode;
  headerRight?: boolean;
}) => {
  const theme = useTheme();

  return (
    // <SafeAreaView
    //   edges={[]}
    //   style={{ flex: 1, backgroundColor: theme.background, padding: 0 }}
    // >
    <Stack
      screenOptions={{
        // headerTitle: isParentIndex ? 'VOM' : undefined ,
        // headerTitle: 'VOM',
        // headerBackTitle: 'Back',
        headerTitleAlign: 'center',
        headerTintColor: theme.muted,
        headerTitleStyle: { color: theme.brand },
        // headerLeft: isParentIndex ? () => <HeaderLeft /> : undefined,
        headerRight: () => (
          <>
            <ProfileHeader />
            <HeaderRight />
          </>
        ),
        headerStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      {children}
    </Stack>
    // </SafeAreaView>
  );
};
