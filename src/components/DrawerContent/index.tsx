import { ROUTES } from '@/src/constants';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Divider, Text, View } from '../UI';
import DrawerItem from './DrawerItem';
import MainNav from './MainNav';
import UserProfile from './UserProfile';

export const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View className="flex-col flex-1 px-2 pt-4">
        <UserProfile />
        <Divider spacing={12} />
        <MainNav />
        <Divider spacing={12} />

        <View>
          <Text variant="overline" className="font-semibold tracking-wide py-2">
            Quick Access
          </Text>
          <DrawerItem
            label="About Our Church"
            iconName="info.bubble.fill"
            route={ROUTES.ABOUT}
          />
          <DrawerItem
            label="Contact Us"
            iconName="phone.fill"
            route={ROUTES.CONTACT}
          />
        </View>

        <Divider spacing={12} />

        <View>
          <Text variant="overline" className="font-semibold tracking-wide py-2">
            Settings & Logout
          </Text>
          <DrawerItem
            label="Settings"
            iconName="gearshape.fill"
            route={ROUTES.SETTINGS}
          />
          <DrawerItem
            label="Logout"
            iconName="rectangle.portrait.and.arrow.right"
            route="/logout"
          />

          <Divider spacing={6} />
          <View className="px-4 ">
            <Text variant="overline" className="text-center">
              VOM v1.0.0
            </Text>
            <Text variant="caption" className="text-center">
              © 2025 CSMC Velley of Mercy
            </Text>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
