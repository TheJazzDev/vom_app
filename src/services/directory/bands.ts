import { bandsRef, firestore, membersRef } from '@/src/config';
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

export const getAllBands = async (): Promise<Band[]> => {
  try {
    const bandsSnapshot = await getDocs(bandsRef);

    return bandsSnapshot.docs.map((doc) =>
      serializeFirestoreData<Band>({
        id: doc.id,
        ...doc.data(),
      }),
    );
  } catch (error) {
    console.error('Error fetching bands:', error);
    throw new Error('Failed to fetch bands');
  }
};

export const getBandById = async (bandId: string): Promise<Band | null> => {
  try {
    const bandDoc = await getDoc(doc(firestore, 'bands', bandId));

    if (!bandDoc.exists()) {
      return null;
    }

    return serializeFirestoreData<Band>({
      id: bandDoc.id,
      ...bandDoc.data(),
    });
  } catch (error) {
    console.error('Error fetching band:', error);
    throw new Error('Failed to fetch band');
  }
};

export const getBandWithMembers = async (
  bandId: BandKeys,
): Promise<BandWithMembers | null> => {
  try {
    const band = await getBandById(bandId);

    if (!band) return null;

    let members: UserProfile[] = [];

    if (band.id === 'UNASSIGNED') {
      // Get members with empty or no bandKeys
      const unassignedQuery = query(
        membersRef,
        where('bandKeys', 'in', [[], null]),
      );
      const unassignedSnapshot = await getDocs(unassignedQuery);
      members = unassignedSnapshot.docs.map((doc) =>
        serializeFirestoreData<UserProfile>({
          id: doc.id,
          ...doc.data(),
        }),
      );
    } else {
      // Get members that have this bandId in their bandKeys array
      const membersQuery = query(
        membersRef,
        where('bandKeys', 'array-contains', band.id),
      );
      const membersSnapshot = await getDocs(membersQuery);

      members = membersSnapshot.docs.map((doc) =>
        serializeFirestoreData<UserProfile>({
          id: doc.id,
          ...doc.data(),
        }),
      );
    }

    return {
      ...band,
      members,
    };
  } catch (error) {
    console.error('Error fetching band with members:', error);
    throw new Error('Failed to fetch band with members');
  }
};
