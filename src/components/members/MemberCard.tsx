import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Badge from '../Badge';
import { Card, Text } from '../UI';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const router = useRouter();

  return (
    <Card className='mb-3 rounded-lg'>
      <TouchableOpacity
        onPress={() => router.push(`/members/${member.id}`)}
        className='flex flex-row p-4'
        activeOpacity={0.7}>
        <View className='mr-4'>
          <Image
            source={{ uri: member?.image }}
            className='w-12 h-12 rounded-full'
          />
        </View>

        <View className='flex-1'>
          <Text variant='h4' className='mb-1'>
            {member?.title.slice(0, 3)} {member?.firstName} {member?.lastName}
          </Text>
          <View className='flex-row items-center gap-2'>
            <Badge size='md' variant='default'>
              {member?.roles[0]}
            </Badge>
            {member?.roles.length > 1 && (
              <Text>+{member.roles.length - 1} more</Text>
            )}
          </View>
        </View>

        <View>
          <View className='flex flex-col items-center gap-1'>
            <View
              className={`w-3 h-3 rounded-full ${member.gender === 'Male' ? 'bg-blue-500' : 'bg-pink-500'}`}
            />
            <Text>{member.gender}</Text>
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
      </TouchableOpacity>
    </Card>
  );
};

export default MemberCard;
