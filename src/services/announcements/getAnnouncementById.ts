import { announcementsRef } from '@/src/config';
import { doc, getDoc } from 'firebase/firestore';

export const getAnnouncementById = async (
  id: string,
): Promise<Announcement | null> => {
  const announcementDoc = doc(announcementsRef, id);
  const snapshot = await getDoc(announcementDoc);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Announcement;
};
