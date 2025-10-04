import { ROUTES } from '@/src/constants';
import { dispatch, logoutThunk, useAuthSlice } from '@/src/store';
import { getUserInitials, stripLeadingSlash } from '@/src/utils';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { IconSymbol } from '../Icons';
import { Divider, Text, View } from '../UI';
import DrawerItem from './DrawerItem';

export const DrawerContent = (props: any) => {
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuthSlice();

  const handleLogout = async () => {
    await dispatch(logoutThunk()).unwrap();
    props.navigation.navigate(stripLeadingSlash(ROUTES.AUTH));
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View className="flex-col flex-1 px-2 pt-4">
        <TouchableOpacity
          onPress={() =>
            isAuthenticated
              ? router.push(ROUTES.PROFILE)
              : props.navigation.navigate(stripLeadingSlash(ROUTES.AUTH))
          }
        >
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-primary/20 dark:bg-primary/20 rounded-full items-center justify-center mr-3">
              {currentUser?.avatar ? (
                <Image
                  source={{ uri: currentUser.avatar }}
                  className="w-16 h-16 rounded-full"
                />
              ) : currentUser?.firstName ? (
                <Text variant="h3">
                  {getUserInitials(currentUser.firstName, currentUser.lastName)}
                </Text>
              ) : (
                <IconSymbol name="person" size={20} color="#0084ff" />
              )}
            </View>
            <View className="flex-1">
              {currentUser ? (
                <Text variant="h5">{currentUser?.title} {currentUser?.firstName}</Text>
              ) : (
                <Text variant="h5">Log In</Text>
              )}
              {currentUser && (
                <>
                  <Text className="text-blue-100 text-sm">
                    Join Date {currentUser?.joinDate}
                  </Text>
                  {/* <Text className="text-gray-600 text-xs underline">
                    View Profile
                  </Text> */}
                </>
              )}
            </View>
          </View>
        </TouchableOpacity>
        <Divider spacing={12} />
        {/* Main Nav */}
        <View className="flex-1">
          <View>
            <Text
              variant="overline"
              className="font-semibold tracking-wide pb-2"
            >
              Main Menu
            </Text>
            <ScrollView
              contentContainerStyle={{ paddingRight: 12 }}
              showsVerticalScrollIndicator={true}
            >
              <DrawerItem
                props={props}
                label="Home"
                iconName="house.fill"
                route={ROUTES.HOME}
              />
              <DrawerItem
                props={props}
                label="Programmes"
                iconName="calendar.circle.fill"
                route={ROUTES.PROGRAMME}
              />
              <DrawerItem
                props={props}
                label="Directory"
                iconName="person.3.sequence.fill"
                route={ROUTES.DIRECTORY}
              />
              <DrawerItem
                props={props}
                label="Ministry"
                iconName="book.fill"
                route={ROUTES.MINISTRY}
              />
              <DrawerItem
                props={props}
                label="Church Info"
                iconName="info.circle.fill"
                route={ROUTES.INFO}
              />
            </ScrollView>
          </View>
          <Divider spacing={12} />
          <View>
            <Text
              variant="overline"
              className="font-semibold tracking-wide py-2"
            >
              Quick Access
            </Text>
            <DrawerItem
              props={props}
              label="About Our Church"
              iconName="info.bubble.fill"
              route={ROUTES.ABOUT}
            />
            <DrawerItem
              props={props}
              label="Contact Us"
              iconName="phone.fill"
              route={ROUTES.CONTACT}
            />
            <DrawerItem
              props={props}
              label="Settings"
              iconName="gearshape.fill"
              route={ROUTES.SETTINGS}
            />
          </View>
          <Divider spacing={12} />
        </View>
        {/* Logout */}
        <View>
          {isAuthenticated && (
            <Pressable
              onPress={handleLogout}
              className="py-3 border border-error rounded-md mb-4"
            >
              <View className="flex-row gap-2 mx-auto">
                <IconSymbol
                  name="rectangle.portrait.and.arrow.right"
                  color="red"
                  size={Platform.OS === 'ios' ? 20 : 18}
                />
                <Text className="text-red-500 dark:text-red-600 font-semibold">
                  Logout
                </Text>
              </View>
            </Pressable>
          )}
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
