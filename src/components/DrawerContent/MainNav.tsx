import { ROUTES } from '@/src/constants';
import { ScrollView } from 'react-native';
import { Text, View } from '../UI';
import DrawerItem from './DrawerItem';

const MainNav = () => {
  return (
    <View className="flex-1">
      <Text variant="overline" className="font-semibold tracking-wide pb-2">
        Main Menu
      </Text>

      <ScrollView
        contentContainerStyle={{ paddingRight: 12 }}
        showsVerticalScrollIndicator={true}
      >
        <DrawerItem label="Home" iconName="house.fill" route={ROUTES.HOME} />
        <DrawerItem
          label="Programmes"
          iconName="calendar.circle.fill"
          route={ROUTES.PROGRAMME}
        />
        <DrawerItem
          label="Directory"
          iconName="person.3.sequence.fill"
          route={ROUTES.DIRECTORY}
        />
        <DrawerItem
          label="Ministry"
          iconName="cross.fill"
          route={ROUTES.MINISTRY}
        />
        <DrawerItem
          label="Church Info"
          iconName="info.circle.fill"
          route={ROUTES.INFO}
        />
      </ScrollView>
    </View>
  );
};

export default MainNav;
