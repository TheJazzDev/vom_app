import React from 'react';
import { Image, View } from 'react-native';
import { Badge, Card, Text } from '../UI';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <Card variant='outlined' className='flex flex-row py-4 px-3 mb-3 rounded-lg'>
      <Image
        source={{ uri: member?.image }}
        className='w-12 h-12 rounded-full mr-4'
      />

      <View className='flex-1'>
        <Text variant='h4' color='heading' className='mb-1'>
          {member?.title.slice(0, 3)} {member?.firstName} {member?.lastName}
        </Text>
        <View className='flex-row items-center gap-2'>
          <Badge size='md'>{member?.roles[0]}</Badge>
          {member?.roles.length > 1 && (
            <Text>+{member.roles.length - 1} more</Text>
          )}
        </View>
      </View>

      <View>
        <View className='flex flex-row items-center gap-1'>
          <View
            className={`w-3 h-3 rounded-full ${member.gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'}`}
          />
          <Text variant='overline'>{member.gender}</Text>
        </View>
        {/* <ThemedTexted
            style={member.active ? styles.activeBadge : styles.inactiveBadge}>
            {member.active ? 'Active' : 'Inactive'}
          </ThemedTexted> */}
        {/* <TouchableOpacity style={styles.iconButton}>
            <IconSymbol name='phone' size={20} color='#6B7280' />
          </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.iconButton}>
            <Ionicons name='mail-outline' size={20} color='#6B7280' />
          </TouchableOpacity> */}
      </View>
    </Card>
  );
};

export default MemberCard;
