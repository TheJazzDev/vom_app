// import { useTheme } from '@/src/hooks';
// import { Ionicons } from '@expo/vector-icons';
// import BottomSheet, {
//   BottomSheetBackdrop,
//   BottomSheetScrollView,
// } from '@gorhom/bottom-sheet';
// import { useCallback, useMemo } from 'react';
// import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
// import Badge from '../Badge';
// import { BandBadge } from '../BandBadge';
// import { Text } from '../themed-ui';
// import { IconSymbol } from '../ui/IconSymbol';
// import ContactInfo from './ContactInfo';

// interface BottomSheetProps {
//   selectedMember: any;
//   bottomSheetRef: any;
//   setSelectedMember: any;
// }

// const MemberBottomSheet: React.FC<BottomSheetProps> = ({
//   selectedMember,
//   bottomSheetRef,
//   setSelectedMember,
// }) => {
//   const theme = useTheme();

//   const handleSheetChanges = useCallback((index: number) => {
//     if (index === -1) {
//       setSelectedMember(null);
//     }
//   }, []);

//   if (!selectedMember) return null;

//   return (
//     <BottomSheet
//       index={-1}
//       ref={bottomSheetRef}
//       enableDynamicSizing
//       onChange={handleSheetChanges}
//       enablePanDownToClose
//       keyboardBehavior="extend"
//       backdropComponent={(props) => (
//         <BottomSheetBackdrop
//           {...props}
//           appearsOnIndex={0}
//           disappearsOnIndex={-1}
//           pressBehavior="close"
//           opacity={0.9}
//           style={[{ backgroundColor: 'black' }]}
//         />
//       )}
//       backgroundStyle={{
//         backgroundColor: theme.card,
//         borderTopLeftRadius: 48,
//         borderTopRightRadius: 48,
//       }}
//       handleIndicatorStyle={styles.bottomSheetHandle}
//     >
//       <BottomSheetScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator
//       >
//         {/* Profile */}
//         <View className="py-4 px-6">
//           <Image
//             source={{ uri: selectedMember.image }}
//             className="w-32 h-32 rounded-md mx-auto"
//           />
//           <Text variant="h3" className="text-center my-4">
//             {selectedMember.title} {selectedMember.firstName}{' '}
//             {selectedMember.lastName}
//           </Text>

//           {/* Roles */}
//           <View className="mb-4">
//             <View className="flex-row items-center gap-4">
//               <IconSymbol name="shield.checkered" size={20} color="#6B7280" />
//               <Text variant="h5">Roles</Text>
//             </View>
//             <View className="flex-row gap-2 mt-2 flex-wrap">
//               {selectedMember.roles.map((role: string) => (
//                 <Badge key={role} size="sm" variant="secondary">
//                   {role}
//                 </Badge>
//               ))}
//             </View>
//           </View>

//           {/* Bands */}
//           <View className="mb-4">
//             <View className="flex-row items-center gap-4">
//               <IconSymbol name="shield.checkered" size={20} color="#6B7280" />
//               <Text variant="h5">Bands</Text>
//             </View>
//             <View className="flex-row gap-2 mt-2 flex-wrap">
//               {selectedMember.band.map((band: string) => (
//                 <BandBadge key={band} band={band} />
//               ))}
//             </View>
//           </View>

//           {/* Contact Info */}
//           <View className="mb-4">
//             <View className="flex-row items-center gap-4">
//               <IconSymbol name="shield.checkered" size={20} color="#6B7280" />
//               <Text variant="h5">Contact Information</Text>
//             </View>
//             <ContactInfo member={selectedMember} />
//           </View>

//           {/* Buttons */}
//           <View style={styles.actionButtons}>
//             <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
//               <Ionicons name="call" size={20} color="#fff" />
//               <Text style={styles.callButtonText}>Call</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.actionButton, styles.messageButton]}
//             >
//               <Ionicons name="chatbubble" size={20} color="#8B5CF6" />
//               <Text style={styles.messageButtonText}>Message</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </BottomSheetScrollView>
//     </BottomSheet>
//   );
// };

// export default MemberBottomSheet;

// const styles = StyleSheet.create({
//   bottomSheetHandle: { backgroundColor: '#D1D5DB', width: 100 },
//   scrollContent: {
//     paddingBottom: 40,
//   },
//   actionButtons: { flexDirection: 'row', gap: 12, marginTop: 20 },
//   actionButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 14,
//     borderRadius: 12,
//     gap: 9,
//   },
//   callButton: { backgroundColor: '#8B5CF6' },
//   callButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
//   messageButton: {
//     backgroundColor: '#F3F4F6',
//   },
//   messageButtonText: {
//     color: '#8B5CF6',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
