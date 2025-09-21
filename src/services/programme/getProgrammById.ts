import { programmesRef } from '@/src/config';
import { doc, getDoc } from 'firebase/firestore';

export interface ProgrammeStats {
  total: number;
  upcoming: number;
  past: number;
  drafts: number;
  thisMonth: number;
}

export const getProgrammeById = async (id: string): Promise<AllProgrammes> => {
  try {
    const docRef = doc(programmesRef, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as AllProgrammes;
    } else {
      throw new Error('Programme not found');
    }
  } catch (error) {
    console.error('Error getting programme:', error);
    throw new Error('Failed to get programme');
  }
};
