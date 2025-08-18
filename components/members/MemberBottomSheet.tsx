import { useTheme } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed-ui';
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
        borderTopColor: theme.activeTint,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
      handleIndicatorStyle={styles.bottomSheetHandle}>
      <BottomSheetView style={styles.bottomSheetContent}>
        {selectedMember && (
          <>
            <View style={styles.container}>
              <Image
                source={{ uri: selectedMember.image }}
                style={styles.avatar}
              />
              <ThemedText type='subtitle' style={styles.name}>
                {selectedMember.name}
              </ThemedText>

              <View style={styles.section}>
                <ThemedText style={styles.label}>Role(s):</ThemedText>
                <ThemedText>{selectedMember.roles.join(', ')}</ThemedText>
              </View>

              <View style={styles.section}>
                <ThemedText style={styles.label}>Band(s):</ThemedText>
                <ThemedText>{selectedMember.band.join(', ')}</ThemedText>
              </View>

              {/* Contact Information */}
              <View style={styles.modalInfoGrid}>
                <View style={styles.modalInfoItem}>
                  <Ionicons name='call' size={16} color='#6B7280' />
                  <ThemedText style={styles.modalInfoText}>
                    {selectedMember.phone}
                  </ThemedText>
                </View>

                <View style={styles.modalInfoItem}>
                  <IconSymbol name='mail.fill' size={16} color='#6B7280' />
                  <ThemedText style={styles.modalInfoText}>
                    {selectedMember.email}
                  </ThemedText>
                </View>

                <View style={styles.modalInfoItem}>
                  <Ionicons name='location' size={16} color='#6B7280' />
                  <ThemedText style={styles.modalInfoText}>
                    {selectedMember.address}
                  </ThemedText>
                </View>

                <View style={styles.modalInfoItem}>
                  <Ionicons name='calendar' size={16} color='#6B7280' />
                  <ThemedText style={styles.modalInfoText}>
                    Joined {formatJoinDate(selectedMember.joinDate)}
                  </ThemedText>
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
  bottomSheetContent: { paddingHorizontal: 24 },
  container: {
    paddingVertical: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 12,
  },
  name: {
    textAlign: 'center',
  },
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
