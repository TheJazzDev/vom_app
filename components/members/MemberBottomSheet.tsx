
import { useTheme } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed-ui';

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
  const snapPoints = useMemo(() => ['80%'], []);

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
        borderTopColor: '#ffffff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
      handleIndicatorStyle={styles.bottomSheetHandle}>
      <BottomSheetView style={styles.bottomSheetContent}>
        {selectedMember && (
          <>
            <View style={styles.modalMemberInfo}>
              <Image
                source={{ uri: selectedMember.image }}
                style={styles.modalAvatar}
              />
              <View style={styles.modalMemberDetails}>
                <ThemedText style={styles.modalMemberName}>
                  {selectedMember.name}
                </ThemedText>
                <ThemedText style={styles.modalMemberBio}>
                  {selectedMember.bio}
                </ThemedText>
              </View>
            </View>

            {/* Contact Information */}
            <View style={styles.modalInfoGrid}>
              <View style={styles.modalInfoItem}>
                <Ionicons name='call' size={20} color='#6B7280' />
                <ThemedText style={styles.modalInfoText}>
                  {selectedMember.phone}
                </ThemedText>
              </View>

              <View style={styles.modalInfoItem}>
                <Ionicons name='mail' size={20} color='#6B7280' />
                <ThemedText style={styles.modalInfoText}>
                  {selectedMember.email}
                </ThemedText>
              </View>

              <View style={styles.modalInfoItem}>
                <Ionicons name='location' size={20} color='#6B7280' />
                <ThemedText style={styles.modalInfoText}>
                  {selectedMember.address}
                </ThemedText>
              </View>

              <View style={styles.modalInfoItem}>
                <Ionicons name='calendar' size={20} color='#6B7280' />
                <ThemedText style={styles.modalInfoText}>
                  Joined {formatJoinDate(selectedMember.joinDate)}
                </ThemedText>
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
  bottomSheetHandle: { backgroundColor: '#D1D5DB' },
  bottomSheetContent: { flex: 1, paddingHorizontal: 24, paddingBottom: 40 },
  modalMemberInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  modalMemberDetails: { flex: 1 },
  modalMemberName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  modalMemberPosition: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalMemberBio: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  modalInfoGrid: { marginBottom: 24 },
  modalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalInfoText: { marginLeft: 16, flex: 1 },
  actionButtons: { flexDirection: 'row', gap: 12 },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
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
