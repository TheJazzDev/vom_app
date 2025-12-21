import { firestore } from '@/src/config/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  increment,
  serverTimestamp,
  Timestamp,
  setDoc,
} from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

// Types
export interface DailyPrayer {
  id: string;
  title: string;
  content: string;
  scriptureReference: string;
  scriptureText: string;
  date: string;
  authorId: string;
  authorName: string;
  likesCount: number;
  commentsCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface DailyPrayerComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string | null;
  content: string;
  createdAt: string;
}

// Collection reference
const dailyPrayersRef = collection(firestore, 'dailyPrayers');

// Get all daily prayers
export const getDailyPrayers = async (
  limitCount: number = 20,
): Promise<DailyPrayer[]> => {
  try {
    const q = query(
      dailyPrayersRef,
      where('isActive', '==', true),
      orderBy('date', 'desc'),
      limit(limitCount),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<DailyPrayer>({
        ...doc.data(),
        id: doc.id,
      }),
    );
  } catch (error) {
    console.error('Get daily prayers error:', error);
    throw error;
  }
};

// Get today's prayer
export const getTodaysPrayer = async (): Promise<DailyPrayer | null> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowTimestamp = Timestamp.fromDate(tomorrow);

    const q = query(
      dailyPrayersRef,
      where('isActive', '==', true),
      where('date', '>=', todayTimestamp),
      where('date', '<', tomorrowTimestamp),
      limit(1),
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Fall back to most recent prayer
      const fallbackQ = query(
        dailyPrayersRef,
        where('isActive', '==', true),
        orderBy('date', 'desc'),
        limit(1),
      );
      const fallbackSnapshot = await getDocs(fallbackQ);

      if (fallbackSnapshot.empty) return null;

      return serializeFirestoreData<DailyPrayer>({
        ...fallbackSnapshot.docs[0].data(),
        id: fallbackSnapshot.docs[0].id,
      });
    }

    return serializeFirestoreData<DailyPrayer>({
      ...snapshot.docs[0].data(),
      id: snapshot.docs[0].id,
    });
  } catch (error) {
    console.error('Get today\'s prayer error:', error);
    throw error;
  }
};

// Get prayer by ID
export const getDailyPrayerById = async (
  prayerId: string,
): Promise<DailyPrayer | null> => {
  try {
    const docRef = doc(dailyPrayersRef, prayerId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return serializeFirestoreData<DailyPrayer>({
      ...docSnap.data(),
      id: docSnap.id,
    });
  } catch (error) {
    console.error('Get daily prayer by ID error:', error);
    throw error;
  }
};

// Toggle like on prayer
export const toggleDailyPrayerLike = async (
  prayerId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const likeRef = doc(firestore, `dailyPrayers/${prayerId}/likes/${userId}`);
    const prayerRef = doc(dailyPrayersRef, prayerId);
    const likeSnap = await getDoc(likeRef);

    if (likeSnap.exists()) {
      // Unlike
      await deleteDoc(likeRef);
      await updateDoc(prayerRef, { likesCount: increment(-1) });
      return false;
    } else {
      // Like
      await setDoc(likeRef, {
        odUserId: userId,
        createdAt: serverTimestamp(),
      });
      await updateDoc(prayerRef, { likesCount: increment(1) });
      return true;
    }
  } catch (error) {
    console.error('Toggle prayer like error:', error);
    throw error;
  }
};

// Check if user has liked
export const hasUserLikedPrayer = async (
  prayerId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const likeRef = doc(firestore, `dailyPrayers/${prayerId}/likes/${userId}`);
    const likeSnap = await getDoc(likeRef);
    return likeSnap.exists();
  } catch (error) {
    console.error('Check like status error:', error);
    return false;
  }
};

// Get comments
export const getDailyPrayerComments = async (
  prayerId: string,
): Promise<DailyPrayerComment[]> => {
  try {
    const commentsRef = collection(
      firestore,
      `dailyPrayers/${prayerId}/comments`,
    );
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<DailyPrayerComment>({
        ...doc.data(),
        id: doc.id,
      }),
    );
  } catch (error) {
    console.error('Get prayer comments error:', error);
    throw error;
  }
};

// Add comment
export const addDailyPrayerComment = async (
  prayerId: string,
  comment: Omit<DailyPrayerComment, 'id' | 'createdAt'>,
): Promise<DailyPrayerComment> => {
  try {
    const commentsRef = collection(
      firestore,
      `dailyPrayers/${prayerId}/comments`,
    );
    const prayerRef = doc(dailyPrayersRef, prayerId);

    const newComment = {
      ...comment,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(commentsRef, newComment);
    await updateDoc(prayerRef, { commentsCount: increment(1) });

    return serializeFirestoreData<DailyPrayerComment>({
      ...newComment,
      id: docRef.id,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Add prayer comment error:', error);
    throw error;
  }
};

// Delete comment
export const deleteDailyPrayerComment = async (
  prayerId: string,
  commentId: string,
): Promise<void> => {
  try {
    const commentRef = doc(
      firestore,
      `dailyPrayers/${prayerId}/comments/${commentId}`,
    );
    const prayerRef = doc(dailyPrayersRef, prayerId);

    await deleteDoc(commentRef);
    await updateDoc(prayerRef, { commentsCount: increment(-1) });
  } catch (error) {
    console.error('Delete prayer comment error:', error);
    throw error;
  }
};

// Admin: Create daily prayer
export const createDailyPrayer = async (
  prayer: Omit<DailyPrayer, 'id' | 'likesCount' | 'commentsCount' | 'createdAt'>,
): Promise<DailyPrayer> => {
  try {
    const newPrayer = {
      ...prayer,
      likesCount: 0,
      commentsCount: 0,
      createdAt: serverTimestamp(),
      date: Timestamp.fromDate(new Date(prayer.date)),
    };

    const docRef = await addDoc(dailyPrayersRef, newPrayer);

    return serializeFirestoreData<DailyPrayer>({
      ...newPrayer,
      id: docRef.id,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Create daily prayer error:', error);
    throw error;
  }
};

// Admin: Update daily prayer
export const updateDailyPrayer = async (
  prayerId: string,
  updates: Partial<DailyPrayer>,
): Promise<void> => {
  try {
    const prayerRef = doc(dailyPrayersRef, prayerId);

    const updateData: any = { ...updates };
    if (updates.date) {
      updateData.date = Timestamp.fromDate(new Date(updates.date));
    }

    await updateDoc(prayerRef, updateData);
  } catch (error) {
    console.error('Update daily prayer error:', error);
    throw error;
  }
};

// Admin: Delete daily prayer
export const deleteDailyPrayer = async (prayerId: string): Promise<void> => {
  try {
    const prayerRef = doc(dailyPrayersRef, prayerId);
    await deleteDoc(prayerRef);
  } catch (error) {
    console.error('Delete daily prayer error:', error);
    throw error;
  }
};
