import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedCard, ThemedText } from '../themed-ui';
import { IconSymbol } from '../ui/IconSymbol';

interface MemberCardProps {
  item: Member;
  handleMemberPress: (member: Member) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ item, handleMemberPress }) => {
  return (
    <ThemedCard shadow borderRadius={8} marginBottom={12}>
      <TouchableOpacity
        onPress={() => handleMemberPress(item)}
        style={styles.memberContent}
        activeOpacity={0.7}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item?.image }} style={styles.avatar} />
        </View>

        <View style={styles.memberInfo}>
          <ThemedText style={styles.memberName}>{item?.name}</ThemedText>
          {item?.roles.slice(0, 2).map((role, index) => (
            <ThemedText
              key={index}
              type='defaultSemiBold'
              style={[styles.memberPosition]}>
              {role}
            </ThemedText>
          ))}
        </View>

        <View>
          {/* <ThemedText
            style={item.active ? styles.activeBadge : styles.inactiveBadge}>
            {item.active ? 'Active' : 'Inactive'}
          </ThemedText> */}
          <TouchableOpacity style={styles.iconButton}>
            <IconSymbol name='phone' size={20} color='#6B7280' />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.iconButton}>
            <Ionicons name='mail-outline' size={20} color='#6B7280' />
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    </ThemedCard>
  );
};

export default MemberCard;

const styles = StyleSheet.create({
  memberContent: {
    flexDirection: 'row',
    padding: 8,
    height: 80,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  memberPosition: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  iconButton: {
    padding: 8,
  },
  activeBadge: {
    backgroundColor: '#ecf7f9',
    color: '#008f51',
    paddingHorizontal: 8,
    fontSize: 12,
    borderRadius: 4,
  },
  inactiveBadge: {
    backgroundColor: '#faf4f4',
    color: '#911812',
    paddingHorizontal: 8,
    fontSize: 12,
    borderRadius: 4,
  },
});
