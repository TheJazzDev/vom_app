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
} from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

// Collection reference
const sermonsRef = collection(firestore, 'sermons');
const seriesRef = collection(firestore, 'sermonSeries');

// Get all sermons
export const getSermons = async (
  options: {
    limitCount?: number;
    category?: SermonCategory;
    seriesId?: string;
  } = {},
): Promise<Sermon[]> => {
  try {
    const { limitCount = 20, category } = options;

    let q = query(
      sermonsRef,
      where('isActive', '==', true),
      orderBy('sermonDate', 'desc'),
      limit(limitCount),
    );

    if (category) {
      q = query(
        sermonsRef,
        where('isActive', '==', true),
        where('category', '==', category),
        orderBy('sermonDate', 'desc'),
        limit(limitCount),
      );
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<Sermon>({
        ...doc.data(),
        id: doc.id,
      }),
    );
  } catch (error) {
    console.error('Get sermons error:', error);
    throw error;
  }
};

// Get sermon by ID
export const getSermonById = async (
  sermonId: string,
): Promise<Sermon | null> => {
  try {
    const docRef = doc(sermonsRef, sermonId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return serializeFirestoreData<Sermon>({
      ...docSnap.data(),
      id: docSnap.id,
    });
  } catch (error) {
    console.error('Get sermon by ID error:', error);
    throw error;
  }
};

// Get featured sermons (most viewed)
export const getFeaturedSermons = async (
  limitCount: number = 5,
): Promise<Sermon[]> => {
  try {
    const q = query(
      sermonsRef,
      where('isActive', '==', true),
      orderBy('viewCount', 'desc'),
      limit(limitCount),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<Sermon>({
        ...doc.data(),
        id: doc.id,
      }),
    );
  } catch (error) {
    console.error('Get featured sermons error:', error);
    throw error;
  }
};

// Get sermon series
export const getSermonSeries = async (): Promise<SermonSeries[]> => {
  try {
    const snapshot = await getDocs(seriesRef);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<SermonSeries>({
        ...doc.data(),
        id: doc.id,
      }),
    );
  } catch (error) {
    console.error('Get sermon series error:', error);
    throw error;
  }
};

// Category display helpers
export const SERMON_CATEGORIES: Record<
  SermonCategory,
  { label: string; emoji: string; color: string }
> = {
  sunday: { label: 'Sunday Service', emoji: '⛪', color: '#3B82F6' },
  midweek: { label: 'Mid-Week', emoji: '📖', color: '#8B5CF6' },
  special: { label: 'Special Program', emoji: '✨', color: '#EC4899' },
  conference: { label: 'Conference', emoji: '🎤', color: '#F59E0B' },
  revival: { label: 'Revival', emoji: '🔥', color: '#EF4444' },
};

// Format duration
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins} min`;
};
