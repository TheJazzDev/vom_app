# VOM App - Production Implementation Plan

## Overview

This document outlines the implementation strategy for transforming the VOM Church app from its current state to a production-ready application with full feature support.

---

## Phase 1: Foundation & Infrastructure

### 1.1 Push Notifications

**Current State:** Service scaffolded but disabled in `src/services/notification.ts`

**Implementation Steps:**

1. **Enable Expo Notifications**
   - Uncomment and configure `src/hooks/usePushNotifications.ts`
   - Add notification permissions request on app start
   - Configure notification channels for Android

2. **Firebase Cloud Messaging Setup**
   - Store push tokens in Firestore (`users/{uid}/pushToken`)
   - Create Cloud Function to send notifications on events:
     - New announcement published
     - Prayer request updates
     - Daily prayer reminders
     - Event reminders

3. **Notification Types**
   ```typescript
   type NotificationType =
     | 'announcement'
     | 'prayer_request'
     | 'daily_prayer'
     | 'event_reminder'
     | 'testimony'
     | 'comment_reply'
     | 'engagement'  // likes, mentions
   ```

4. **Files to Create/Modify:**
   - `src/hooks/usePushNotifications.ts` - Enable and complete
   - `src/services/notification.ts` - Full implementation
   - `src/store/slices/notificationSlice.ts` - New slice
   - `firebase/functions/notifications.ts` - Cloud Functions

5. **User Preferences**
   - Add notification settings in Profile/Settings
   - Allow users to toggle notification types
   - Store preferences in Firestore

---

### 1.2 Real Data Integration

**Current State:** Mock notifications in `notifications.tsx`

**Implementation Steps:**

1. **Create Firestore Collections:**
   ```
   notifications/{notificationId}
     - userId: string
     - type: NotificationType
     - title: string
     - message: string
     - actionRoute: string
     - read: boolean
     - priority: 'high' | 'medium' | 'low'
     - createdAt: timestamp
     - metadata: object
   ```

2. **Create Notification Service:**
   ```typescript
   // src/services/notifications/
   ├── getNotifications.ts
   ├── markAsRead.ts
   ├── markAllAsRead.ts
   ├── deleteNotification.ts
   └── index.ts
   ```

3. **Create Notification Slice:**
   - State: notifications[], unreadCount, loading states
   - Thunks: fetchNotifications, markAsRead, markAllAsRead
   - Real-time listener for new notifications

4. **Update Notifications Screen:**
   - Replace MOCK_NOTIFICATIONS with Redux state
   - Add real-time updates via Firestore onSnapshot
   - Implement pagination for large lists

---

### 1.3 Error Handling

**Implementation Steps:**

1. **Create Error Boundary Component:**
   ```typescript
   // src/components/ErrorBoundary.tsx
   - Catch React errors gracefully
   - Show user-friendly error screen
   - Provide "Try Again" action
   - Log errors to analytics service
   ```

2. **Create Global Error Handler:**
   ```typescript
   // src/utils/errorHandler.ts
   - Categorize errors (network, auth, validation, server)
   - Map error codes to user messages
   - Handle Firebase-specific errors
   ```

3. **Implement Offline Support:**
   ```typescript
   // src/hooks/useNetworkStatus.ts
   - Monitor network connectivity
   - Queue actions when offline
   - Sync when back online
   - Show offline indicator banner
   ```

4. **Add Toast/Snackbar Notifications:**
   ```typescript
   // src/providers/ToastProvider.tsx
   - Success, error, warning, info toasts
   - Auto-dismiss with configurable duration
   - Action buttons for undo/retry
   ```

5. **Files to Create:**
   - `src/components/ErrorBoundary.tsx`
   - `src/components/OfflineBanner.tsx`
   - `src/providers/ToastProvider.tsx`
   - `src/hooks/useNetworkStatus.ts`
   - `src/utils/errorHandler.ts`

---

### 1.4 Performance Optimization

**Implementation Steps:**

1. **Image Optimization:**
   ```typescript
   // Use expo-image for optimized loading
   - Implement progressive loading
   - Add placeholder/skeleton screens
   - Cache images locally
   - Lazy load images in lists
   ```

2. **List Virtualization:**
   ```typescript
   // Already using FlatList - optimize with:
   - getItemLayout for fixed-height items
   - removeClippedSubviews={true}
   - maxToRenderPerBatch optimization
   - windowSize tuning
   ```

3. **Bundle Size Optimization:**
   ```bash
   # Analyze bundle
   npx expo-analyze-bundle

   # Implement:
   - Tree shaking unused exports
   - Dynamic imports for heavy screens
   - Optimize Firebase imports (modular SDK)
   ```

4. **State Optimization:**
   ```typescript
   // Memoization
   - useMemo for expensive computations
   - useCallback for event handlers
   - React.memo for pure components

   // Redux
   - Selective state subscriptions
   - Normalized data structures
   ```

5. **Files to Modify:**
   - All list screens (add virtualization props)
   - Image-heavy components (use expo-image)
   - Heavy computation components (add memoization)

---

## Phase 2: Core Features - Coming Soon Pages

### 2.1 Daily Prayers (Leader-Managed)

**Firestore Structure:**
```
dailyPrayers/{prayerId}
  - id: string
  - title: string
  - content: string
  - scriptureReference: string
  - scriptureText: string
  - date: timestamp (the day this prayer is for)
  - authorId: string
  - authorName: string
  - authorRole: string
  - createdAt: timestamp
  - updatedAt: timestamp
  - likesCount: number
  - commentsCount: number
  - isActive: boolean

dailyPrayers/{prayerId}/likes/{odUserId}
  - odUserId: string
  - createdAt: timestamp

dailyPrayers/{prayerId}/comments/{commentId}
  - id: string
  - userId: string
  - userName: string
  - userAvatar: string
  - content: string
  - createdAt: timestamp
  - updatedAt: timestamp
  - likesCount: number
  - isEdited: boolean
```

**Files to Create:**
```
src/services/dailyPrayer/
├── getDailyPrayers.ts
├── getDailyPrayerById.ts
├── getTodaysPrayer.ts
├── createDailyPrayer.ts      # Admin only
├── updateDailyPrayer.ts      # Admin only
├── deleteDailyPrayer.ts      # Admin only
├── toggleLike.ts
├── getComments.ts
├── addComment.ts
├── deleteComment.ts
└── index.ts

src/store/slices/dailyPrayerSlice.ts
src/store/thunks/dailyPrayerThunks.ts

src/app/(tabs)/ministry/daily-prayer.tsx
src/app/(tabs)/ministry/daily-prayer/[id].tsx
src/app/(tabs)/ministry/daily-prayer/create.tsx  # Admin

src/components/DailyPrayer/
├── PrayerCard.tsx
├── PrayerDetail.tsx
├── PrayerForm.tsx           # Admin
├── LikeButton.tsx
├── CommentSection.tsx
├── CommentItem.tsx
└── CommentInput.tsx
```

**Features:**
- Today's prayer highlighted on dashboard
- Historical prayers list with pagination
- Like with animation feedback
- Threaded comments
- Admin: Create, edit, schedule prayers
- Push notification for daily prayer

---

### 2.2 Prayer Requests

**Firestore Structure:**
```
prayerRequests/{requestId}
  - id: string
  - title: string
  - content: string
  - category: 'health' | 'family' | 'work' | 'spiritual' | 'financial' | 'other'
  - isAnonymous: boolean
  - userId: string
  - userName: string (or "Anonymous")
  - userAvatar: string (or null if anonymous)
  - status: 'active' | 'answered' | 'closed'
  - prayerCount: number  # How many people prayed
  - commentsCount: number
  - createdAt: timestamp
  - updatedAt: timestamp
  - answeredAt: timestamp | null
  - testimonyId: string | null  # Link to testimony if answered

prayerRequests/{requestId}/prayers/{odUserId}
  - odUserId: string
  - prayedAt: timestamp

prayerRequests/{requestId}/comments/{commentId}
  - id: string
  - userId: string
  - userName: string
  - content: string  # Encouragement messages
  - createdAt: timestamp
```

**Files to Create:**
```
src/services/prayerRequest/
├── getPrayerRequests.ts
├── getPrayerRequestById.ts
├── createPrayerRequest.ts
├── updatePrayerRequest.ts
├── deletePrayerRequest.ts
├── markAsPrayed.ts
├── markAsAnswered.ts
├── getComments.ts
├── addComment.ts
└── index.ts

src/store/slices/prayerRequestSlice.ts

src/app/(tabs)/ministry/prayer-request.tsx        # List
src/app/(tabs)/ministry/prayer-request/[id].tsx   # Detail
src/app/(tabs)/ministry/prayer-request/create.tsx # Submit

src/components/PrayerRequest/
├── PrayerRequestCard.tsx
├── PrayerRequestDetail.tsx
├── PrayerRequestForm.tsx
├── PrayButton.tsx
├── CategoryBadge.tsx
└── AnonymousToggle.tsx
```

**Features:**
- Submit prayer request (anonymous option)
- "I Prayed" button with counter
- Filter by category, status
- Mark as answered → prompt for testimony
- Encouragement comments
- Privacy controls

---

### 2.3 Bible Study

**Firestore Structure:**
```
bibleStudies/{studyId}
  - id: string
  - title: string
  - description: string
  - topic: string
  - bookOfBible: string
  - chapters: string
  - content: string (rich text/markdown)
  - videoUrl: string | null
  - audioUrl: string | null
  - pdfUrl: string | null
  - authorId: string
  - authorName: string
  - studyDate: timestamp
  - duration: string  # "45 mins"
  - difficulty: 'beginner' | 'intermediate' | 'advanced'
  - viewsCount: number
  - completionsCount: number
  - createdAt: timestamp

bibleStudies/{studyId}/notes/{odUserId}
  - odUserId: string
  - content: string  # User's personal notes
  - highlights: string[]  # Highlighted verses
  - createdAt: timestamp
  - updatedAt: timestamp

bibleStudies/{studyId}/questions/{questionId}
  - id: string
  - question: string
  - userId: string
  - userName: string
  - answeredBy: string | null
  - answer: string | null
  - createdAt: timestamp

userProgress/bibleStudy/{odUserId}
  - odUserId: string
  - completedStudies: string[]
  - currentStudyId: string
  - totalTimeSpent: number
  - streakDays: number
  - lastStudyDate: timestamp
```

**Files to Create:**
```
src/services/bibleStudy/
├── getBibleStudies.ts
├── getBibleStudyById.ts
├── markAsComplete.ts
├── saveNotes.ts
├── getUserProgress.ts
├── askQuestion.ts
└── index.ts

src/store/slices/bibleStudySlice.ts

src/app/(tabs)/ministry/bible-study.tsx           # List
src/app/(tabs)/ministry/bible-study/[id].tsx      # Study detail
src/app/(tabs)/ministry/bible-study/notes.tsx     # My notes

src/components/BibleStudy/
├── StudyCard.tsx
├── StudyContent.tsx
├── StudyProgress.tsx
├── NotesEditor.tsx
├── QuestionForm.tsx
└── StreakBadge.tsx
```

**Features:**
- Browse studies by topic/book
- Track reading progress
- Personal notes with highlights
- Study streaks tracking
- Q&A with leaders
- Audio/video support
- PDF downloads

---

### 2.4 Testimonies

**Firestore Structure:**
```
testimonies/{testimonyId}
  - id: string
  - title: string
  - content: string
  - category: 'healing' | 'provision' | 'deliverance' | 'breakthrough' | 'salvation' | 'other'
  - userId: string
  - userName: string
  - userAvatar: string
  - isApproved: boolean  # Requires admin approval
  - isFeatured: boolean
  - linkedPrayerRequestId: string | null
  - mediaUrls: string[]  # Photos/videos
  - likesCount: number
  - commentsCount: number
  - sharesCount: number
  - createdAt: timestamp
  - approvedAt: timestamp | null
  - approvedBy: string | null

testimonies/{testimonyId}/likes/{odUserId}
testimonies/{testimonyId}/comments/{commentId}
```

**Files to Create:**
```
src/services/testimony/
├── getTestimonies.ts
├── getTestimonyById.ts
├── submitTestimony.ts
├── approveTestimony.ts      # Admin
├── featureTestimony.ts      # Admin
├── toggleLike.ts
├── addComment.ts
└── index.ts

src/store/slices/testimonySlice.ts

src/app/(tabs)/ministry/testimonies.tsx           # List
src/app/(tabs)/ministry/testimonies/[id].tsx      # Detail
src/app/(tabs)/ministry/testimonies/submit.tsx    # Submit
src/app/(tabs)/ministry/testimonies/pending.tsx   # Admin

src/components/Testimony/
├── TestimonyCard.tsx
├── TestimonyDetail.tsx
├── TestimonyForm.tsx
├── CategorySelector.tsx
├── MediaUploader.tsx
└── ApprovalBadge.tsx
```

**Features:**
- Submit testimony with media
- Admin approval workflow
- Featured testimonies carousel
- Filter by category
- Like and comment
- Link to answered prayer request
- Share externally

---

### 2.5 Recent Sermons

**Firestore Structure:**
```
sermons/{sermonId}
  - id: string
  - title: string
  - preacher: string
  - preacherTitle: string
  - date: timestamp
  - duration: string
  - description: string
  - scriptureReferences: string[]
  - series: string | null
  - videoUrl: string
  - audioUrl: string
  - thumbnailUrl: string
  - transcriptUrl: string | null
  - viewsCount: number
  - likesCount: number
  - downloadCount: number
  - tags: string[]
  - createdAt: timestamp

sermons/{sermonId}/notes/{odUserId}
  - odUserId: string
  - content: string
  - timestamps: { time: number, note: string }[]
  - createdAt: timestamp
```

**Files to Create:**
```
src/services/sermon/
├── getSermons.ts
├── getSermonById.ts
├── getSermonsBySeries.ts
├── saveNote.ts
├── incrementView.ts
└── index.ts

src/store/slices/sermonSlice.ts

src/app/(tabs)/ministry/recent-sermons.tsx
src/app/(tabs)/ministry/recent-sermons/[id].tsx

src/components/Sermon/
├── SermonCard.tsx
├── SermonPlayer.tsx
├── SermonNotes.tsx
├── SeriesCard.tsx
└── DownloadButton.tsx
```

**Features:**
- Video/audio player
- Sermon series grouping
- Personal notes with timestamps
- Download for offline
- Share sermon clips
- Related sermons

---

## Phase 3: Gamification & Engagement

### 3.1 User Engagement Tracking

**Firestore Structure:**
```
userEngagement/{odUserId}
  - odUserId: string
  - points: number
  - level: number
  - streakDays: number
  - longestStreak: number
  - lastActiveDate: timestamp
  - badges: string[]
  - achievements: Achievement[]

  # Activity Counts
  - prayerRequestsSubmitted: number
  - prayerRequestsPrayedFor: number
  - testimoniesShared: number
  - bibleStudiesCompleted: number
  - sermonsWatched: number
  - commentsPosted: number
  - dailyPrayersRead: number

userEngagement/{odUserId}/activityLog/{logId}
  - type: ActivityType
  - points: number
  - description: string
  - createdAt: timestamp
```

**Points System:**
```typescript
const POINTS = {
  DAILY_LOGIN: 5,
  DAILY_PRAYER_READ: 10,
  PRAYER_REQUEST_SUBMIT: 20,
  PRAY_FOR_SOMEONE: 5,
  BIBLE_STUDY_COMPLETE: 30,
  SERMON_WATCH: 15,
  TESTIMONY_SUBMIT: 50,
  COMMENT_POST: 3,
  PROFILE_COMPLETE: 25,
  STREAK_7_DAYS: 50,
  STREAK_30_DAYS: 200,
}
```

**Levels:**
```typescript
const LEVELS = [
  { level: 1, name: 'Seedling', minPoints: 0 },
  { level: 2, name: 'Sprout', minPoints: 100 },
  { level: 3, name: 'Sapling', minPoints: 300 },
  { level: 4, name: 'Growing Tree', minPoints: 600 },
  { level: 5, name: 'Fruitful Tree', minPoints: 1000 },
  { level: 6, name: 'Mighty Oak', minPoints: 2000 },
  { level: 7, name: 'Forest Guardian', minPoints: 5000 },
]
```

---

### 3.2 Leaderboard

**Firestore Structure:**
```
leaderboards/weekly
  - weekStart: timestamp
  - weekEnd: timestamp
  - entries: LeaderboardEntry[]
  - updatedAt: timestamp

leaderboards/monthly
  - monthStart: timestamp
  - monthEnd: timestamp
  - entries: LeaderboardEntry[]
  - updatedAt: timestamp

leaderboards/allTime
  - entries: LeaderboardEntry[]
  - updatedAt: timestamp

interface LeaderboardEntry {
  odUserId: string;
  userName: string;
  userAvatar: string;
  points: number;
  level: number;
  rank: number;
}
```

**Files to Create:**
```
src/services/gamification/
├── getUserEngagement.ts
├── awardPoints.ts
├── checkAchievements.ts
├── getLeaderboard.ts
├── getBadges.ts
└── index.ts

src/store/slices/gamificationSlice.ts

src/app/(tabs)/more/leaderboard.tsx
src/app/(tabs)/profile/achievements.tsx

src/components/Gamification/
├── PointsBadge.tsx
├── LevelIndicator.tsx
├── StreakCounter.tsx
├── LeaderboardList.tsx
├── LeaderboardItem.tsx
├── AchievementCard.tsx
├── BadgeGrid.tsx
└── PointsAnimation.tsx
```

**Features:**
- Weekly/monthly/all-time leaderboards
- Current user rank highlighted
- Level progression bar
- Streak tracking with fire emoji
- Badge collection
- Points animation on earning
- Achievement notifications

---

### 3.3 Badges & Achievements

**Badge Categories:**
```typescript
const BADGES = {
  // Prayer Badges
  PRAYER_WARRIOR: {
    name: 'Prayer Warrior',
    description: 'Prayed for 100 requests',
    icon: '🙏',
    requirement: { type: 'PRAY_COUNT', count: 100 }
  },
  INTERCESSOR: {
    name: 'Intercessor',
    description: 'Submitted 10 prayer requests',
    icon: '✨',
    requirement: { type: 'PRAYER_REQUEST_COUNT', count: 10 }
  },

  // Study Badges
  SCHOLAR: {
    name: 'Bible Scholar',
    description: 'Completed 20 Bible studies',
    icon: '📚',
    requirement: { type: 'STUDY_COUNT', count: 20 }
  },

  // Engagement Badges
  FAITHFUL: {
    name: 'Faithful',
    description: '30-day login streak',
    icon: '🔥',
    requirement: { type: 'STREAK', count: 30 }
  },

  // Testimony Badges
  WITNESS: {
    name: 'Witness',
    description: 'Shared 5 testimonies',
    icon: '🌟',
    requirement: { type: 'TESTIMONY_COUNT', count: 5 }
  },
}
```

---

## Phase 4: Admin Features

### 4.1 Leader/Admin Dashboard

**Files to Create:**
```
src/app/(tabs)/admin/              # Admin-only routes
├── _layout.tsx
├── index.tsx                      # Dashboard overview
├── daily-prayers/
│   ├── index.tsx                  # Manage prayers
│   └── create.tsx                 # Create/edit prayer
├── testimonies/
│   └── pending.tsx                # Approval queue
├── announcements/
│   └── create.tsx                 # Create announcement
├── analytics/
│   └── index.tsx                  # Engagement stats
└── users/
    └── index.tsx                  # User management
```

**Admin Capabilities:**
- Create/edit/delete daily prayers
- Approve/reject testimonies
- Create announcements
- View engagement analytics
- Manage user roles
- Send push notifications
- View prayer request statistics

---

## Implementation Priority Order

### Sprint 1 (Weeks 1-2): Foundation
1. Error Handling & Toast system
2. Offline support detection
3. Push notifications infrastructure
4. Real notifications data

### Sprint 2 (Weeks 3-4): Daily Prayers
1. Firestore structure
2. Service layer
3. Redux slice
4. Daily prayer screen
5. Like/comment system
6. Admin create/manage

### Sprint 3 (Weeks 5-6): Prayer Requests
1. Submit prayer request
2. "I Prayed" functionality
3. Comments/encouragements
4. Mark as answered
5. Link to testimony

### Sprint 4 (Weeks 7-8): Testimonies
1. Submit testimony
2. Admin approval flow
3. Like/comment
4. Featured testimonies
5. Media upload

### Sprint 5 (Weeks 9-10): Bible Study & Sermons
1. Bible study list/detail
2. Progress tracking
3. Personal notes
4. Sermon player
5. Sermon notes

### Sprint 6 (Weeks 11-12): Gamification
1. Points system
2. Engagement tracking
3. Leaderboards
4. Badges/achievements
5. Level progression

### Sprint 7 (Weeks 13-14): Polish & Launch
1. Performance optimization
2. Bug fixes
3. Analytics integration
4. Beta testing
5. Production deployment

---

## Technical Considerations

### Security Rules (Firestore)
```javascript
// Example rules structure
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /userEngagement/{odUserId} {
      allow read: if request.auth.uid == odUserId;
      allow write: if false; // Server-only writes
    }

    // Admin-only content creation
    match /dailyPrayers/{prayerId} {
      allow read: if request.auth != null;
      allow write: if get(/databases/$(database)/documents/members/$(request.auth.uid)).data.role == 'admin';
    }

    // User-generated content
    match /prayerRequests/{requestId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

### Cloud Functions Needed
1. `onNewPrayerRequest` - Send notification to intercessors
2. `onTestimonySubmitted` - Notify admins for approval
3. `onDailyPrayerCreated` - Schedule notification for all users
4. `updateLeaderboard` - Scheduled function (daily)
5. `awardPoints` - Trigger on various actions
6. `checkAchievements` - Called after point awards

---

## Success Metrics

1. **Engagement:**
   - Daily active users
   - Average session duration
   - Feature adoption rates

2. **Content:**
   - Prayer requests submitted/day
   - Testimonies shared/week
   - Bible studies completed

3. **Community:**
   - Comments per post
   - Prayers given
   - User retention rate

4. **Performance:**
   - App load time < 2s
   - API response time < 500ms
   - Crash rate < 0.1%

---

*Document Version: 1.0*
*Last Updated: December 2025*
