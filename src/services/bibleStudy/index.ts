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
  Timestamp,
} from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

// Types
export type BibleStudyType = 'topic' | 'book' | 'series' | 'devotional';

export interface BibleStudySession {
  id: string;
  title: string;
  description: string;
  type: BibleStudyType;
  scriptureReference: string;
  content: string;
  videoUrl: string | null;
  audioUrl: string | null;
  pdfUrl: string | null;
  thumbnailUrl: string | null;
  authorId: string;
  authorName: string;
  duration: number; // in minutes
  isActive: boolean;
  scheduledDate: string | null;
  createdAt: string;
}

export interface BibleStudyTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  sessionsCount: number;
  color: string;
}

// Collection reference
const bibleStudyRef = collection(firestore, 'bibleStudy');
const topicsRef = collection(firestore, 'bibleStudyTopics');

// Get all Bible study sessions
export const getBibleStudySessions = async (
  options: {
    limitCount?: number;
    type?: BibleStudyType;
    topicId?: string;
  } = {}
): Promise<BibleStudySession[]> => {
  try {
    const { limitCount = 20, type } = options;

    let q = query(
      bibleStudyRef,
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    if (type) {
      q = query(
        bibleStudyRef,
        where('isActive', '==', true),
        where('type', '==', type),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<BibleStudySession>({
        ...doc.data(),
        id: doc.id,
      })
    );
  } catch (error) {
    console.error('Get Bible study sessions error:', error);
    throw error;
  }
};

// Get Bible study session by ID
export const getBibleStudySessionById = async (
  sessionId: string
): Promise<BibleStudySession | null> => {
  try {
    const docRef = doc(bibleStudyRef, sessionId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return serializeFirestoreData<BibleStudySession>({
      ...docSnap.data(),
      id: docSnap.id,
    });
  } catch (error) {
    console.error('Get Bible study session by ID error:', error);
    throw error;
  }
};

// Get upcoming Bible study sessions
export const getUpcomingBibleStudySessions = async (
  limitCount: number = 5
): Promise<BibleStudySession[]> => {
  try {
    const now = Timestamp.now();
    const q = query(
      bibleStudyRef,
      where('isActive', '==', true),
      where('scheduledDate', '>=', now),
      orderBy('scheduledDate', 'asc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<BibleStudySession>({
        ...doc.data(),
        id: doc.id,
      })
    );
  } catch (error) {
    console.error('Get upcoming Bible study sessions error:', error);
    throw error;
  }
};

// Get Bible study topics
export const getBibleStudyTopics = async (): Promise<BibleStudyTopic[]> => {
  try {
    const snapshot = await getDocs(topicsRef);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<BibleStudyTopic>({
        ...doc.data(),
        id: doc.id,
      })
    );
  } catch (error) {
    console.error('Get Bible study topics error:', error);
    throw error;
  }
};

// Type display helpers
export const BIBLE_STUDY_TYPES: Record<BibleStudyType, { label: string; emoji: string; color: string }> = {
  topic: { label: 'Topic Study', emoji: '📚', color: '#3B82F6' },
  book: { label: 'Book Study', emoji: '📖', color: '#8B5CF6' },
  series: { label: 'Series', emoji: '🎬', color: '#EC4899' },
  devotional: { label: 'Devotional', emoji: '🙏', color: '#F59E0B' },
};

// Default topics for when no data exists
export const DEFAULT_BIBLE_STUDY_TOPICS: BibleStudyTopic[] = [
  {
    id: 'faith',
    title: 'Faith & Trust',
    description: 'Studies on building faith and trusting God',
    icon: '✝️',
    sessionsCount: 0,
    color: '#3B82F6',
  },
  {
    id: 'prayer',
    title: 'Prayer Life',
    description: 'Deepening your prayer and communion with God',
    icon: '🙏',
    sessionsCount: 0,
    color: '#8B5CF6',
  },
  {
    id: 'character',
    title: 'Christian Character',
    description: 'Building godly character and fruit of the Spirit',
    icon: '💎',
    sessionsCount: 0,
    color: '#10B981',
  },
  {
    id: 'relationships',
    title: 'Relationships',
    description: 'Biblical principles for healthy relationships',
    icon: '❤️',
    sessionsCount: 0,
    color: '#EC4899',
  },
  {
    id: 'purpose',
    title: 'Purpose & Calling',
    description: 'Discovering God\'s plan for your life',
    icon: '🎯',
    sessionsCount: 0,
    color: '#F59E0B',
  },
  {
    id: 'spiritual-warfare',
    title: 'Spiritual Warfare',
    description: 'Standing firm against spiritual attacks',
    icon: '⚔️',
    sessionsCount: 0,
    color: '#EF4444',
  },
];
