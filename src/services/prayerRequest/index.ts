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
  setDoc,
} from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

// Types
export type PrayerRequestCategory =
  | 'health'
  | 'family'
  | 'finances'
  | 'spiritual'
  | 'relationships'
  | 'work'
  | 'other';

export type PrayerRequestStatus = 'active' | 'answered' | 'closed';

export interface PrayerRequest {
  id: string;
  title: string;
  content: string;
  category: PrayerRequestCategory;
  status: PrayerRequestStatus;
  isAnonymous: boolean;
  authorId: string;
  authorName: string;
  authorAvatar: string | null;
  prayerCount: number;
  commentsCount: number;
  isUrgent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PrayerRequestComment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string | null;
  content: string;
  createdAt: string;
}

// Collection reference
const prayerRequestsRef = collection(firestore, 'prayerRequests');

// Get all prayer requests
export const getPrayerRequests = async (
  options: {
    limitCount?: number;
    category?: PrayerRequestCategory;
    status?: PrayerRequestStatus;
    userId?: string;
  } = {},
): Promise<PrayerRequest[]> => {
  try {
    const { limitCount = 20, category, status = 'active', userId } = options;

    let q = query(
      prayerRequestsRef,
      where('status', '==', status),
      orderBy('createdAt', 'desc'),
      limit(limitCount),
    );

    if (category) {
      q = query(
        prayerRequestsRef,
        where('status', '==', status),
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(limitCount),
      );
    }

    if (userId) {
      q = query(
        prayerRequestsRef,
        where('authorId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount),
      );
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<PrayerRequest>({
        ...doc.data(),
        id: doc.id,
      }),
    );
  } catch (error) {
    console.error('Get prayer requests error:', error);
    throw error;
  }
};

// Get prayer request by ID
export const getPrayerRequestById = async (
  requestId: string,
): Promise<PrayerRequest | null> => {
  try {
    const docRef = doc(prayerRequestsRef, requestId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return serializeFirestoreData<PrayerRequest>({
      ...docSnap.data(),
      id: docSnap.id,
    });
  } catch (error) {
    console.error('Get prayer request by ID error:', error);
    throw error;
  }
};

// Create prayer request
export const createPrayerRequest = async (
  request: Omit<
    PrayerRequest,
    'id' | 'prayerCount' | 'commentsCount' | 'createdAt' | 'updatedAt'
  >,
): Promise<PrayerRequest> => {
  try {
    const newRequest = {
      ...request,
      prayerCount: 0,
      commentsCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(prayerRequestsRef, newRequest);

    return serializeFirestoreData<PrayerRequest>({
      ...newRequest,
      id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Create prayer request error:', error);
    throw error;
  }
};

// Update prayer request
export const updatePrayerRequest = async (
  requestId: string,
  updates: Partial<
    Pick<
      PrayerRequest,
      'title' | 'content' | 'category' | 'status' | 'isUrgent'
    >
  >,
): Promise<void> => {
  try {
    const requestRef = doc(prayerRequestsRef, requestId);
    await updateDoc(requestRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Update prayer request error:', error);
    throw error;
  }
};

// Delete prayer request
export const deletePrayerRequest = async (requestId: string): Promise<void> => {
  try {
    const requestRef = doc(prayerRequestsRef, requestId);
    await deleteDoc(requestRef);
  } catch (error) {
    console.error('Delete prayer request error:', error);
    throw error;
  }
};

// Mark as prayed
export const markAsPrayed = async (
  requestId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const prayedRef = doc(
      firestore,
      `prayerRequests/${requestId}/prayed/${userId}`,
    );
    const requestRef = doc(prayerRequestsRef, requestId);
    const prayedSnap = await getDoc(prayedRef);

    if (prayedSnap.exists()) {
      // Already prayed - remove
      await deleteDoc(prayedRef);
      await updateDoc(requestRef, { prayerCount: increment(-1) });
      return false;
    } else {
      // Add prayer
      await setDoc(prayedRef, {
        odUserId: userId,
        createdAt: serverTimestamp(),
      });
      await updateDoc(requestRef, { prayerCount: increment(1) });
      return true;
    }
  } catch (error) {
    console.error('Mark as prayed error:', error);
    throw error;
  }
};

// Check if user has prayed
export const hasUserPrayed = async (
  requestId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const prayedRef = doc(
      firestore,
      `prayerRequests/${requestId}/prayed/${userId}`,
    );
    const prayedSnap = await getDoc(prayedRef);
    return prayedSnap.exists();
  } catch (error) {
    console.error('Check prayed status error:', error);
    return false;
  }
};

// Get comments
export const getPrayerRequestComments = async (
  requestId: string,
): Promise<PrayerRequestComment[]> => {
  try {
    const commentsRef = collection(
      firestore,
      `prayerRequests/${requestId}/comments`,
    );
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<PrayerRequestComment>({
        ...doc.data(),
        id: doc.id,
      }),
    );
  } catch (error) {
    console.error('Get prayer request comments error:', error);
    throw error;
  }
};

// Add comment
export const addPrayerRequestComment = async (
  requestId: string,
  comment: Omit<PrayerRequestComment, 'id' | 'createdAt'>,
): Promise<PrayerRequestComment> => {
  try {
    const commentsRef = collection(
      firestore,
      `prayerRequests/${requestId}/comments`,
    );
    const requestRef = doc(prayerRequestsRef, requestId);

    const newComment = {
      ...comment,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(commentsRef, newComment);
    await updateDoc(requestRef, { commentsCount: increment(1) });

    return serializeFirestoreData<PrayerRequestComment>({
      ...newComment,
      id: docRef.id,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Add prayer request comment error:', error);
    throw error;
  }
};

// Delete comment
export const deletePrayerRequestComment = async (
  requestId: string,
  commentId: string,
): Promise<void> => {
  try {
    const commentRef = doc(
      firestore,
      `prayerRequests/${requestId}/comments/${commentId}`,
    );
    const requestRef = doc(prayerRequestsRef, requestId);

    await deleteDoc(commentRef);
    await updateDoc(requestRef, { commentsCount: increment(-1) });
  } catch (error) {
    console.error('Delete prayer request comment error:', error);
    throw error;
  }
};

// Mark request as answered
export const markAsAnswered = async (requestId: string): Promise<void> => {
  try {
    const requestRef = doc(prayerRequestsRef, requestId);
    await updateDoc(requestRef, {
      status: 'answered',
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Mark as answered error:', error);
    throw error;
  }
};

// Category display helpers
export const PRAYER_CATEGORIES: Record<
  PrayerRequestCategory,
  { label: string; emoji: string; color: string }
> = {
  health: { label: 'Health', emoji: '🏥', color: '#EF4444' },
  family: { label: 'Family', emoji: '👨‍👩‍👧‍👦', color: '#F59E0B' },
  finances: { label: 'Finances', emoji: '💰', color: '#10B981' },
  spiritual: { label: 'Spiritual', emoji: '🙏', color: '#8B5CF6' },
  relationships: { label: 'Relationships', emoji: '❤️', color: '#EC4899' },
  work: { label: 'Work', emoji: '💼', color: '#3B82F6' },
  other: { label: 'Other', emoji: '✨', color: '#6B7280' },
};
