import { useTheme } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Badge from '../Badge';
import { BandBadge } from '../BandBadge';
import { Text } from '../themed-ui';
import { IconSymbol } from '../ui/IconSymbol';

interface BottomSheetProps {
  selectedMember: any;
  bottomSheetRef: any;
  setSelectedMember: any;
}
const MemberBottomSheet: React.FC<BottomSheetProps> = ({
  selectedMember,
  bottomSheetRef,
  setSelectedMember,
}) => {
  const theme = useTheme();
  const snapPoints = useMemo(() => ['70%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setSelectedMember(null);
    }
  }, []);

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{
        backgroundColor: theme.card,
        borderTopColor: theme.activeTint,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
      handleIndicatorStyle={styles.bottomSheetHandle}>
      <BottomSheetView className='px-6'>
        {selectedMember && (
          <>
            <View className='py-4'>
              <Image
                source={{ uri: selectedMember.image }}
                className='w-32 h-32 rounded-md mx-auto'
              />
              <Text variant='h3' className='text-center my-4'>
                {selectedMember.title} {selectedMember.firstName}{' '}
                {selectedMember.lastName}
              </Text>

              <View className='mb-4'>
                <View className='flex-row items-center gap-4'>
                  <IconSymbol
                    name='shield.checkered'
                    size={20}
                    color='#6B7280'
                  />
                  <Text variant='h5'>Roles</Text>
                </View>
                <View className='flex-row gap-2 mt-2'>
                  {selectedMember.roles.map((role: string) => (
                    <Badge key={role} size='sm' variant='secondary'>
                      {role}
                    </Badge>
                  ))}
                </View>
              </View>

              <View className='mb-4'>
                <View className='flex-row items-center gap-4'>
                  <IconSymbol
                    name='shield.checkered'
                    size={20}
                    color='#6B7280'
                  />
                  <Text variant='h5'>Bands</Text>
                </View>
                <View className='flex-row gap-2 mt-2'>
                  {selectedMember.band.map((band: string) => (
                    <BandBadge key={band} band={band} />
                  ))}
                </View>
              </View>

              {/* Contact Information */}
              <View style={styles.modalInfoGrid}>
                <View style={styles.modalInfoItem}>
                  <Ionicons name='call' size={16} color='#6B7280' />
                  <Text style={styles.modalInfoText}>
                    {selectedMember.phone}
                  </Text>
                </View>

                <View style={styles.modalInfoItem}>
                  <IconSymbol name='mail.fill' size={16} color='#6B7280' />
                  <Text style={styles.modalInfoText}>
                    {selectedMember.email}
                  </Text>
                </View>

                <View style={styles.modalInfoItem}>
                  <Ionicons name='location' size={16} color='#6B7280' />
                  <Text style={styles.modalInfoText}>
                    {selectedMember.address}
                  </Text>
                </View>

                <View style={styles.modalInfoItem}>
                  <Ionicons name='calendar' size={16} color='#6B7280' />
                  <Text style={styles.modalInfoText}>
                    Joined {formatJoinDate(selectedMember.joinDate)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.callButton]}>
                <Ionicons name='call' size={20} color='#fff' />
                <Text style={styles.callButtonText}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.messageButton]}>
                <Ionicons name='chatbubble' size={20} color='#8B5CF6' />
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default MemberBottomSheet;

const styles = StyleSheet.create({
  bottomSheetHandle: { backgroundColor: '#D1D5DB', width: 100 },

  section: {
    marginBottom: 12,
  },
  label: {
    fontWeight: '500',
  },
  modalInfoGrid: { display: 'contents' },
  modalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    gap: 10,
  },
  modalInfoText: { fontSize: 14 },
  actionButtons: { flexDirection: 'row', gap: 12 },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 9,
  },
  callButton: { backgroundColor: '#8B5CF6' },
  callButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  messageButton: {
    backgroundColor: '#F3F4F6',
  },
  messageButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
  },
});
