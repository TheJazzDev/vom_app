import { ScrollView } from 'react-native';
import { Text, View } from '../UI';
import DrawerItem from './DrawerItem';

const MainNav = () => {
  return (
    <View className='flex-1'>
      <Text variant='overline' className='font-semibold tracking-wide pb-2'>
        Main Menu
      </Text>

      <ScrollView contentContainerStyle={{ paddingRight: 12 }}>
        <DrawerItem label='Home' iconName='house.fill' route='/' />
        <DrawerItem
          label='Programmes'
          iconName='calendar.circle.fill'
          route='/programme'
        />
        <DrawerItem
          label='Members Directory'
          iconName='person.3.sequence.fill'
          route='/members'
        />
        <DrawerItem
          label='Bible Study'
          iconName='book.fill'
          route='/bible-study'
        />
        <DrawerItem
          label='Prayer Requests'
          iconName='hands.sparkles.fill'
          route='/prayer-requests'
        />
        <DrawerItem
          label='Church Events'
          iconName='megaphone.fill'
          route='/events'
        />
        <DrawerItem
          label='Testimonies'
          iconName='quote.bubble.fill'
          route='/testimonies'
        />
        <DrawerItem
          label='Notifications'
          iconName='bell.fill'
          route='/notification'
        />
      </ScrollView>
    </View>
  );
};

export default MainNav;
