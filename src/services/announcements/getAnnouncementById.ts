import { announcementsRef } from '@/src/config';
import { doc, getDoc } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

export const getAnnouncementById = async (
  id: string,
): Promise<Announcement | null> => {
  const announcementDoc = doc(announcementsRef, id);
  const snapshot = await getDoc(announcementDoc);

  if (!snapshot.exists()) {
    return null;
  }

  return serializeFirestoreData<Announcement>({
    id: snapshot.id,
    ...snapshot.data(),
  });
};
