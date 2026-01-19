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

// Collection reference
const testimoniesRef = collection(firestore, 'testimonies');

// Get all testimonies
export const getTestimonies = async (
  options: {
    limitCount?: number;
    category?: TestimonyCategory;
    userId?: string;
    status?: TestimonyStatus;
  } = {},
): Promise<Testimony[]> => {
  try {
    const { limitCount = 20, category, userId, status = 'approved' } = options;

    let q = query(
      testimoniesRef,
      where('status', '==', status),
      orderBy('createdAt', 'desc'),
      limit(limitCount),
    );

    if (category) {
      q = query(
        testimoniesRef,
        where('status', '==', status),
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(limitCount),
      );
    }

    if (userId) {
      q = query(
        testimoniesRef,
        where('authorId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount),
      );
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<Testimony>({
        ...doc.data(),
        id: doc.id,
      }),
    );
  } catch (error) {
    console.error('Get testimonies error:', error);
    throw error;
  }
};

// Get testimony by ID
export const getTestimonyById = async (
  testimonyId: string,
): Promise<Testimony | null> => {
  try {
    const docRef = doc(testimoniesRef, testimonyId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return serializeFirestoreData<Testimony>({
      ...docSnap.data(),
      id: docSnap.id,
    });
  } catch (error) {
    console.error('Get testimony by ID error:', error);
    throw error;
  }
};

// Create testimony
export const createTestimony = async (
  testimony: Omit<
    Testimony,
    'id' | 'likesCount' | 'commentsCount' | 'createdAt' | 'approvedAt'
  >,
): Promise<Testimony> => {
  try {
    const newTestimony = {
      ...testimony,
      likesCount: 0,
      commentsCount: 0,
      status: 'approved', // Auto-approve for now, can be changed to 'pending' for moderation
      createdAt: serverTimestamp(),
      approvedAt: serverTimestamp(),
    };

    const docRef = await addDoc(testimoniesRef, newTestimony);

    return serializeFirestoreData<Testimony>({
      ...newTestimony,
      id: docRef.id,
      createdAt: new Date().toISOString(),
      approvedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Create testimony error:', error);
    throw error;
  }
};

// Update testimony
export const updateTestimony = async (
  testimonyId: string,
  updates: Partial<
    Pick<Testimony, 'title' | 'content' | 'category' | 'mediaUrls'>
  >,
): Promise<void> => {
  try {
    const testimonyRef = doc(testimoniesRef, testimonyId);
    await updateDoc(testimonyRef, updates);
  } catch (error) {
    console.error('Update testimony error:', error);
    throw error;
  }
};

// Delete testimony
export const deleteTestimony = async (testimonyId: string): Promise<void> => {
  try {
    const testimonyRef = doc(testimoniesRef, testimonyId);
    await deleteDoc(testimonyRef);
  } catch (error) {
    console.error('Delete testimony error:', error);
    throw error;
  }
};

// Toggle like
export const toggleTestimonyLike = async (
  testimonyId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const likeRef = doc(
      firestore,
      `testimonies/${testimonyId}/likes/${userId}`,
    );
    const testimonyRef = doc(testimoniesRef, testimonyId);
    const likeSnap = await getDoc(likeRef);

    if (likeSnap.exists()) {
      // Unlike
      await deleteDoc(likeRef);
      await updateDoc(testimonyRef, { likesCount: increment(-1) });
      return false;
    } else {
      // Like
      await setDoc(likeRef, {
        odUserId: userId,
        createdAt: serverTimestamp(),
      });
      await updateDoc(testimonyRef, { likesCount: increment(1) });
      return true;
    }
  } catch (error) {
    console.error('Toggle testimony like error:', error);
    throw error;
  }
};

// Check if user has liked
export const hasUserLikedTestimony = async (
  testimonyId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const likeRef = doc(
      firestore,
      `testimonies/${testimonyId}/likes/${userId}`,
    );
    const likeSnap = await getDoc(likeRef);
    return likeSnap.exists();
  } catch (error) {
    console.error('Check like status error:', error);
    return false;
  }
};

// Get comments
export const getTestimonyComments = async (
  testimonyId: string,
): Promise<TestimonyComment[]> => {
  try {
    const commentsRef = collection(
      firestore,
      `testimonies/${testimonyId}/comments`,
    );
    const q = query(commentsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<TestimonyComment>({
        ...doc.data(),
        id: doc.id,
      }),
    );
  } catch (error) {
    console.error('Get testimony comments error:', error);
    throw error;
  }
};

// Add comment
export const addTestimonyComment = async (
  testimonyId: string,
  comment: Omit<TestimonyComment, 'id' | 'createdAt'>,
): Promise<TestimonyComment> => {
  try {
    const commentsRef = collection(
      firestore,
      `testimonies/${testimonyId}/comments`,
    );
    const testimonyRef = doc(testimoniesRef, testimonyId);

    const newComment = {
      ...comment,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(commentsRef, newComment);
    await updateDoc(testimonyRef, { commentsCount: increment(1) });

    return serializeFirestoreData<TestimonyComment>({
      ...newComment,
      id: docRef.id,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Add testimony comment error:', error);
    throw error;
  }
};

// Delete comment
export const deleteTestimonyComment = async (
  testimonyId: string,
  commentId: string,
): Promise<void> => {
  try {
    const commentRef = doc(
      firestore,
      `testimonies/${testimonyId}/comments/${commentId}`,
    );
    const testimonyRef = doc(testimoniesRef, testimonyId);

    await deleteDoc(commentRef);
    await updateDoc(testimonyRef, { commentsCount: increment(-1) });
  } catch (error) {
    console.error('Delete testimony comment error:', error);
    throw error;
  }
};

// Category display helpers
export const TESTIMONY_CATEGORIES: Record<
  TestimonyCategory,
  { label: string; emoji: string; color: string }
> = {
  healing: { label: 'Healing', emoji: '🏥', color: '#EF4444' },
  provision: { label: 'Provision', emoji: '🎁', color: '#10B981' },
  deliverance: { label: 'Deliverance', emoji: '⛓️', color: '#8B5CF6' },
  salvation: { label: 'Salvation', emoji: '✝️', color: '#F59E0B' },
  restoration: { label: 'Restoration', emoji: '🔄', color: '#3B82F6' },
  breakthrough: { label: 'Breakthrough', emoji: '🚀', color: '#EC4899' },
  protection: { label: 'Protection', emoji: '🛡️', color: '#6366F1' },
  other: { label: 'Other', emoji: '✨', color: '#6B7280' },
};
