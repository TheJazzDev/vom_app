import { membersRef } from '@/src/config';
import { getDocs } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

export async function getAllMembers(): Promise<UserProfile[]> {
  const snapshot = await getDocs(membersRef);

  return snapshot.docs.map((doc) =>
    serializeFirestoreData<UserProfile>({
      ...(doc.data() as UserProfile),
      uid: doc.id,
    }),
  );
}

// Return all bands and their members
// export const getAllBandsWithMembers = async (): Promise<
//   Band[]
// > => {
//   const bandsArray: Band[] = [];

//   for (const [bandKey, config] of Object.entries(BAND_CONFIG)) {
//     if (bandKey === BandKeys.UNASSIGNED) continue;

//     const q = query(
//       membersRef,
//       where('bandKeys', 'array-contains', bandKey as BandKeys),
//     );
//     const snapshot = await getDocs(q);
//     const members = snapshot.docs.map((doc) => doc.data() as UserProfile);

//     bandsArray.push({
//       ...config,
//       memberCount: members.length,
//       members,
//     });
//   }

//   // Handle UNASSIGNED members (bandKeys == [])
//   const qUnassigned = query(membersRef, where('bandKeys', '==', []));
//   const snapshotUnassigned = await getDocs(qUnassigned);
//   const unassignedMembers = snapshotUnassigned.docs.map(
//     (doc) => doc.data() as UserProfile,
//   );

//   bandsArray.push({
//     ...BAND_CONFIG[BandKeys.UNASSIGNED],
//     memberCount: unassignedMembers.length,
//     members: unassignedMembers,
//   });

//   return bandsArray;
// };
