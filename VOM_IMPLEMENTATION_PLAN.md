# VOM App - Production Implementation Roadmap

---

## Project Overview

| Field | Value |
|-------|-------|
| **Project** | Valley of Mercy Church App |
| **Goal** | Transform from MVP to production-ready with full engagement features |
| **Total Phases** | 4 Phases |
| **Estimated Duration** | 12-14 weeks |
| **Start Date** | ___________ |
| **Current Phase** | Phase 1 |

---

## Phase Summary

| Phase | Name | Duration | Status | Dependencies |
|-------|------|----------|--------|--------------|
| 1 | Foundation & Infrastructure | 2 weeks | 🔵 NOT STARTED | None |
| 2 | Core Ministry Features | 4 weeks | ⚪ BLOCKED | Phase 1 |
| 3 | User Engagement & Social | 3 weeks | ⚪ BLOCKED | Phase 2 |
| 4 | Gamification & Polish | 3 weeks | ⚪ BLOCKED | Phase 3 |

---

# PHASE 1: Foundation & Infrastructure

**Duration:** 2 weeks
**Status:** 🔵 NOT STARTED

---

## 1.1 Error Handling & User Feedback

**Priority:** HIGH
**Status:** ⬜ TODO

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create ErrorBoundary component | ⬜ TODO | `src/components/ErrorBoundary.tsx` |
| 2 | Create ToastProvider context | ⬜ TODO | `src/providers/ToastProvider.tsx` |
| 3 | Create Toast component (success, error, warning, info) | ⬜ TODO | `src/components/UI/Toast.tsx` |
| 4 | Add ToastProvider to Providers.tsx | ⬜ TODO | `src/providers/Providers.tsx` |
| 5 | Create useToast hook | ⬜ TODO | `src/hooks/useToast.ts` |
| 6 | Create errorHandler utility | ⬜ TODO | `src/utils/errorHandler.ts` |
| 7 | Wrap app in ErrorBoundary | ⬜ TODO | `src/app/_layout.tsx` |

### Acceptance Criteria

- [ ] Errors are caught gracefully without crashing the app
- [ ] User sees friendly error message with retry option
- [ ] Toast notifications appear for success/error actions
- [ ] Errors are logged for debugging

---

## 1.2 Network & Offline Support

**Priority:** HIGH
**Status:** ⬜ TODO

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create useNetworkStatus hook | ⬜ TODO | `src/hooks/useNetworkStatus.ts` |
| 2 | Create OfflineBanner component | ⬜ TODO | `src/components/UI/OfflineBanner.tsx` |
| 3 | Add offline detection to root layout | ⬜ TODO | `src/app/_layout.tsx` |
| 4 | Create offline action queue utility | ⬜ TODO | `src/utils/offlineQueue.ts` |
| 5 | Export useNetworkStatus from hooks | ⬜ TODO | `src/hooks/index.ts` |

### Acceptance Criteria

- [ ] App detects when device goes offline
- [ ] Offline banner appears at top of screen
- [ ] Actions are queued when offline
- [ ] Queued actions execute when back online

---

## 1.3 Push Notifications

**Priority:** HIGH
**Status:** ⬜ TODO

### Firestore Collection

```
pushTokens/{odUserId}
  - token: string
  - platform: 'ios' | 'android'
  - createdAt: timestamp
  - updatedAt: timestamp
```

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Enable usePushNotifications hook | ⬜ TODO | `src/hooks/usePushNotifications.ts` |
| 2 | Create notification service index | ⬜ TODO | `src/services/notifications/index.ts` |
| 3 | Create registerPushToken service | ⬜ TODO | `src/services/notifications/registerToken.ts` |
| 4 | Create notificationSlice | ⬜ TODO | `src/store/slices/notificationSlice.ts` |
| 5 | Add notification thunks | ⬜ TODO | `src/store/thunks/notificationThunks.ts` |
| 6 | Export from slices index | ⬜ TODO | `src/store/slices/index.ts` |
| 7 | Request permissions on app start | ⬜ TODO | `src/app/_layout.tsx` |
| 8 | Add notification settings screen | ⬜ TODO | `src/app/(tabs)/more/notification-settings.tsx` |

### Acceptance Criteria

- [ ] App requests notification permission
- [ ] Push token is stored in Firestore
- [ ] User can toggle notification types in settings
- [ ] Notifications navigate to correct screen when tapped

---

## 1.4 Real Notifications Data

**Priority:** MEDIUM
**Status:** ⬜ TODO

### Firestore Collection

```
notifications/{notificationId}
  - odUserId: string
  - type: 'announcement' | 'prayer' | 'daily_prayer' | 'testimony' | 'event'
  - title: string
  - message: string
  - actionRoute: string
  - read: boolean
  - priority: 'high' | 'medium' | 'low'
  - createdAt: timestamp
  - metadata: object
```

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create Firestore notifications collection | ⬜ TODO | Firebase Console |
| 2 | Create getNotifications service | ⬜ TODO | `src/services/notifications/getNotifications.ts` |
| 3 | Create markAsRead service | ⬜ TODO | `src/services/notifications/markAsRead.ts` |
| 4 | Create markAllAsRead service | ⬜ TODO | `src/services/notifications/markAllAsRead.ts` |
| 5 | Add notification thunks | ⬜ TODO | `src/store/thunks/notificationThunks.ts` |
| 6 | Update notifications screen to use Redux | ⬜ TODO | `src/app/(tabs)/more/notifications.tsx` |
| 7 | Add real-time listener for new notifications | ⬜ TODO | `src/app/(tabs)/more/notifications.tsx` |
| 8 | Add unread badge to notification icon | ⬜ TODO | `src/components/Dashboard/Navigations/Notifications.tsx` |

### Acceptance Criteria

- [ ] Notifications load from Firestore
- [ ] New notifications appear in real-time
- [ ] Unread count badge shows on notification icon
- [ ] Marking as read updates immediately

---

## 1.5 Performance Optimization

**Priority:** MEDIUM
**Status:** ⬜ TODO

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Install expo-image package | ⬜ TODO | `package.json` |
| 2 | Replace Image with expo-image in key screens | ⬜ TODO | Multiple components |
| 3 | Add getItemLayout to FlatLists | ⬜ TODO | List screens |
| 4 | Add memoization to expensive components | ⬜ TODO | Various |
| 5 | Create skeleton loading components | ⬜ TODO | `src/components/UI/Skeleton.tsx` |
| 6 | Optimize Firebase imports (modular) | ⬜ TODO | `src/config/firebase.ts` |

### Acceptance Criteria

- [ ] Images load progressively with placeholders
- [ ] Lists scroll smoothly (60fps)
- [ ] Skeleton screens show while loading
- [ ] Bundle size reduced by 15%+

---

## Phase 1 Completion Checklist

- [ ] All 1.1 tasks complete
- [ ] All 1.2 tasks complete
- [ ] All 1.3 tasks complete
- [ ] All 1.4 tasks complete
- [ ] All 1.5 tasks complete
- [ ] Manual testing complete
- [ ] Code reviewed and merged
- [ ] **PHASE 1 COMPLETE** ✅

---

# PHASE 2: Core Ministry Features

**Duration:** 4 weeks
**Status:** ⚪ BLOCKED (Waiting for Phase 1)

---

## 2.1 Shared Components (Build First)

**Priority:** HIGH
**Status:** ⬜ TODO

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create LikeButton component | ⬜ TODO | `src/components/Social/LikeButton.tsx` |
| 2 | Create CommentSection component | ⬜ TODO | `src/components/Social/CommentSection.tsx` |
| 3 | Create CommentItem component | ⬜ TODO | `src/components/Social/CommentItem.tsx` |
| 4 | Create CommentInput component | ⬜ TODO | `src/components/Social/CommentInput.tsx` |
| 5 | Create CategoryBadge component | ⬜ TODO | `src/components/UI/CategoryBadge.tsx` |
| 6 | Create UserAvatar component | ⬜ TODO | `src/components/UI/UserAvatar.tsx` |
| 7 | Create MediaUploader component | ⬜ TODO | `src/components/Forms/MediaUploader.tsx` |
| 8 | Create RichTextEditor component | ⬜ TODO | `src/components/Forms/RichTextEditor.tsx` |
| 9 | Export all from Social index | ⬜ TODO | `src/components/Social/index.ts` |

### Acceptance Criteria

- [ ] LikeButton animates on press
- [ ] Comments load with pagination
- [ ] CommentInput has submit functionality
- [ ] Components are reusable across features

---

## 2.2 Daily Prayers (Leader-Managed)

**Priority:** HIGH
**Status:** ⬜ TODO

### Firestore Collections

```
dailyPrayers/{prayerId}
  - id: string
  - title: string
  - content: string
  - scriptureReference: string
  - scriptureText: string
  - date: timestamp
  - authorId: string
  - authorName: string
  - likesCount: number
  - commentsCount: number
  - isActive: boolean
  - createdAt: timestamp

dailyPrayers/{prayerId}/likes/{odUserId}
  - odUserId: string
  - createdAt: timestamp

dailyPrayers/{prayerId}/comments/{commentId}
  - id: string
  - odUserId: string
  - userName: string
  - userAvatar: string
  - content: string
  - createdAt: timestamp
```

### Tasks - Service Layer

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create getDailyPrayers service | ⬜ TODO | `src/services/dailyPrayer/getDailyPrayers.ts` |
| 2 | Create getTodaysPrayer service | ⬜ TODO | `src/services/dailyPrayer/getTodaysPrayer.ts` |
| 3 | Create getDailyPrayerById service | ⬜ TODO | `src/services/dailyPrayer/getDailyPrayerById.ts` |
| 4 | Create toggleLike service | ⬜ TODO | `src/services/dailyPrayer/toggleLike.ts` |
| 5 | Create getComments service | ⬜ TODO | `src/services/dailyPrayer/getComments.ts` |
| 6 | Create addComment service | ⬜ TODO | `src/services/dailyPrayer/addComment.ts` |
| 7 | Create deleteComment service | ⬜ TODO | `src/services/dailyPrayer/deleteComment.ts` |
| 8 | Create createDailyPrayer service (Admin) | ⬜ TODO | `src/services/dailyPrayer/createDailyPrayer.ts` |
| 9 | Create updateDailyPrayer service (Admin) | ⬜ TODO | `src/services/dailyPrayer/updateDailyPrayer.ts` |
| 10 | Create deleteDailyPrayer service (Admin) | ⬜ TODO | `src/services/dailyPrayer/deleteDailyPrayer.ts` |
| 11 | Export from index | ⬜ TODO | `src/services/dailyPrayer/index.ts` |

### Tasks - State Management

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create dailyPrayerSlice | ⬜ TODO | `src/store/slices/dailyPrayerSlice.ts` |
| 2 | Create dailyPrayer thunks | ⬜ TODO | `src/store/thunks/dailyPrayerThunks.ts` |
| 3 | Add slice to store | ⬜ TODO | `src/store/store.ts` |
| 4 | Export from slices index | ⬜ TODO | `src/store/slices/index.ts` |

### Tasks - UI Components

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create PrayerCard component | ⬜ TODO | `src/components/DailyPrayer/PrayerCard.tsx` |
| 2 | Create PrayerDetail component | ⬜ TODO | `src/components/DailyPrayer/PrayerDetail.tsx` |
| 3 | Create PrayerForm component (Admin) | ⬜ TODO | `src/components/DailyPrayer/PrayerForm.tsx` |
| 4 | Create TodaysPrayerWidget (Dashboard) | ⬜ TODO | `src/components/Dashboard/TodaysPrayer.tsx` |
| 5 | Export from index | ⬜ TODO | `src/components/DailyPrayer/index.ts` |

### Tasks - Screens

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create daily prayer list screen | ⬜ TODO | `src/app/(tabs)/ministry/daily-prayer.tsx` |
| 2 | Create prayer detail screen | ⬜ TODO | `src/app/(tabs)/ministry/daily-prayer/[id].tsx` |
| 3 | Create prayer create screen (Admin) | ⬜ TODO | `src/app/(tabs)/ministry/daily-prayer/create.tsx` |
| 4 | Add route to ministry layout | ⬜ TODO | `src/app/(tabs)/ministry/_layout.tsx` |
| 5 | Add routes constant | ⬜ TODO | `src/constants/routes/routes.ts` |
| 6 | Add Today's Prayer to Dashboard | ⬜ TODO | `src/components/Dashboard/index.tsx` |

### Acceptance Criteria

- [ ] Leaders can create daily prayers
- [ ] Today's prayer shows on dashboard
- [ ] Users can like prayers (with animation)
- [ ] Users can comment on prayers
- [ ] Historical prayers are browsable
- [ ] Push notification sent for new daily prayer

---

## 2.3 Prayer Requests

**Priority:** HIGH
**Status:** ⬜ TODO

### Firestore Collections

```
prayerRequests/{requestId}
  - id: string
  - title: string
  - content: string
  - category: 'health' | 'family' | 'work' | 'spiritual' | 'financial' | 'other'
  - isAnonymous: boolean
  - odUserId: string
  - userName: string
  - userAvatar: string | null
  - status: 'active' | 'answered' | 'closed'
  - prayerCount: number
  - commentsCount: number
  - createdAt: timestamp
  - answeredAt: timestamp | null
  - testimonyId: string | null

prayerRequests/{requestId}/prayers/{odUserId}
  - odUserId: string
  - prayedAt: timestamp

prayerRequests/{requestId}/comments/{commentId}
  - id: string
  - odUserId: string
  - userName: string
  - content: string
  - createdAt: timestamp
```

### Tasks - Service Layer

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create getPrayerRequests service | ⬜ TODO | `src/services/prayerRequest/getPrayerRequests.ts` |
| 2 | Create getPrayerRequestById service | ⬜ TODO | `src/services/prayerRequest/getPrayerRequestById.ts` |
| 3 | Create createPrayerRequest service | ⬜ TODO | `src/services/prayerRequest/createPrayerRequest.ts` |
| 4 | Create updatePrayerRequest service | ⬜ TODO | `src/services/prayerRequest/updatePrayerRequest.ts` |
| 5 | Create deletePrayerRequest service | ⬜ TODO | `src/services/prayerRequest/deletePrayerRequest.ts` |
| 6 | Create markAsPrayed service | ⬜ TODO | `src/services/prayerRequest/markAsPrayed.ts` |
| 7 | Create markAsAnswered service | ⬜ TODO | `src/services/prayerRequest/markAsAnswered.ts` |
| 8 | Create getComments service | ⬜ TODO | `src/services/prayerRequest/getComments.ts` |
| 9 | Create addComment service | ⬜ TODO | `src/services/prayerRequest/addComment.ts` |
| 10 | Export from index | ⬜ TODO | `src/services/prayerRequest/index.ts` |

### Tasks - State Management

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create prayerRequestSlice | ⬜ TODO | `src/store/slices/prayerRequestSlice.ts` |
| 2 | Create prayerRequest thunks | ⬜ TODO | `src/store/thunks/prayerRequestThunks.ts` |
| 3 | Add slice to store | ⬜ TODO | `src/store/store.ts` |

### Tasks - UI Components

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create PrayerRequestCard component | ⬜ TODO | `src/components/PrayerRequest/PrayerRequestCard.tsx` |
| 2 | Create PrayerRequestDetail component | ⬜ TODO | `src/components/PrayerRequest/PrayerRequestDetail.tsx` |
| 3 | Create PrayerRequestForm component | ⬜ TODO | `src/components/PrayerRequest/PrayerRequestForm.tsx` |
| 4 | Create PrayButton component | ⬜ TODO | `src/components/PrayerRequest/PrayButton.tsx` |
| 5 | Create AnonymousToggle component | ⬜ TODO | `src/components/PrayerRequest/AnonymousToggle.tsx` |

### Tasks - Screens

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Replace Coming Soon with list screen | ⬜ TODO | `src/app/(tabs)/ministry/prayer-request.tsx` |
| 2 | Create prayer request detail screen | ⬜ TODO | `src/app/(tabs)/ministry/prayer-request/[id].tsx` |
| 3 | Create submit prayer request screen | ⬜ TODO | `src/app/(tabs)/ministry/prayer-request/create.tsx` |
| 4 | Add routes to ministry layout | ⬜ TODO | `src/app/(tabs)/ministry/_layout.tsx` |

### Acceptance Criteria

- [ ] Users can submit prayer requests
- [ ] Anonymous option works correctly
- [ ] "I Prayed" button increments counter
- [ ] Users can add encouraging comments
- [ ] Status can be changed to "answered"
- [ ] Answered prayers can link to testimony

---

## 2.4 Testimonies

**Priority:** MEDIUM
**Status:** ⬜ TODO

### Firestore Collections

```
testimonies/{testimonyId}
  - id: string
  - title: string
  - content: string
  - category: 'healing' | 'provision' | 'deliverance' | 'breakthrough' | 'salvation' | 'other'
  - odUserId: string
  - userName: string
  - userAvatar: string
  - isApproved: boolean
  - isFeatured: boolean
  - linkedPrayerRequestId: string | null
  - mediaUrls: string[]
  - likesCount: number
  - commentsCount: number
  - createdAt: timestamp
  - approvedAt: timestamp | null
  - approvedBy: string | null

testimonies/{testimonyId}/likes/{odUserId}
testimonies/{testimonyId}/comments/{commentId}
```

### Tasks - Service Layer

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create getTestimonies service | ⬜ TODO | `src/services/testimony/getTestimonies.ts` |
| 2 | Create getTestimonyById service | ⬜ TODO | `src/services/testimony/getTestimonyById.ts` |
| 3 | Create submitTestimony service | ⬜ TODO | `src/services/testimony/submitTestimony.ts` |
| 4 | Create approveTestimony service (Admin) | ⬜ TODO | `src/services/testimony/approveTestimony.ts` |
| 5 | Create featureTestimony service (Admin) | ⬜ TODO | `src/services/testimony/featureTestimony.ts` |
| 6 | Create toggleLike service | ⬜ TODO | `src/services/testimony/toggleLike.ts` |
| 7 | Create addComment service | ⬜ TODO | `src/services/testimony/addComment.ts` |
| 8 | Export from index | ⬜ TODO | `src/services/testimony/index.ts` |

### Tasks - State Management

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create testimonySlice | ⬜ TODO | `src/store/slices/testimonySlice.ts` |
| 2 | Create testimony thunks | ⬜ TODO | `src/store/thunks/testimonyThunks.ts` |
| 3 | Add slice to store | ⬜ TODO | `src/store/store.ts` |

### Tasks - UI Components

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create TestimonyCard component | ⬜ TODO | `src/components/Testimony/TestimonyCard.tsx` |
| 2 | Create TestimonyDetail component | ⬜ TODO | `src/components/Testimony/TestimonyDetail.tsx` |
| 3 | Create TestimonyForm component | ⬜ TODO | `src/components/Testimony/TestimonyForm.tsx` |
| 4 | Create FeaturedTestimonies carousel | ⬜ TODO | `src/components/Testimony/FeaturedCarousel.tsx` |
| 5 | Create ApprovalBadge component | ⬜ TODO | `src/components/Testimony/ApprovalBadge.tsx` |

### Tasks - Screens

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Replace Coming Soon with list screen | ⬜ TODO | `src/app/(tabs)/ministry/testimonies.tsx` |
| 2 | Create testimony detail screen | ⬜ TODO | `src/app/(tabs)/ministry/testimonies/[id].tsx` |
| 3 | Create submit testimony screen | ⬜ TODO | `src/app/(tabs)/ministry/testimonies/submit.tsx` |
| 4 | Create pending testimonies screen (Admin) | ⬜ TODO | `src/app/(tabs)/ministry/testimonies/pending.tsx` |

### Acceptance Criteria

- [ ] Users can submit testimonies with media
- [ ] Admin approval workflow works
- [ ] Featured testimonies show in carousel
- [ ] Categories are filterable
- [ ] Like and comment functionality works
- [ ] Can link to answered prayer request

---

## 2.5 Bible Study

**Priority:** MEDIUM
**Status:** ⬜ TODO

### Firestore Collections

```
bibleStudies/{studyId}
  - id: string
  - title: string
  - description: string
  - topic: string
  - bookOfBible: string
  - chapters: string
  - content: string
  - videoUrl: string | null
  - audioUrl: string | null
  - pdfUrl: string | null
  - authorId: string
  - authorName: string
  - studyDate: timestamp
  - duration: string
  - difficulty: 'beginner' | 'intermediate' | 'advanced'
  - viewsCount: number
  - completionsCount: number
  - createdAt: timestamp

bibleStudies/{studyId}/notes/{odUserId}
  - content: string
  - highlights: string[]
  - createdAt: timestamp
  - updatedAt: timestamp

userProgress/bibleStudy/{odUserId}
  - completedStudies: string[]
  - currentStudyId: string
  - totalTimeSpent: number
  - streakDays: number
  - lastStudyDate: timestamp
```

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create getBibleStudies service | ⬜ TODO | `src/services/bibleStudy/getBibleStudies.ts` |
| 2 | Create getBibleStudyById service | ⬜ TODO | `src/services/bibleStudy/getBibleStudyById.ts` |
| 3 | Create markAsComplete service | ⬜ TODO | `src/services/bibleStudy/markAsComplete.ts` |
| 4 | Create saveNotes service | ⬜ TODO | `src/services/bibleStudy/saveNotes.ts` |
| 5 | Create getUserProgress service | ⬜ TODO | `src/services/bibleStudy/getUserProgress.ts` |
| 6 | Create bibleStudySlice | ⬜ TODO | `src/store/slices/bibleStudySlice.ts` |
| 7 | Create StudyCard component | ⬜ TODO | `src/components/BibleStudy/StudyCard.tsx` |
| 8 | Create StudyContent component | ⬜ TODO | `src/components/BibleStudy/StudyContent.tsx` |
| 9 | Create StudyProgress component | ⬜ TODO | `src/components/BibleStudy/StudyProgress.tsx` |
| 10 | Create NotesEditor component | ⬜ TODO | `src/components/BibleStudy/NotesEditor.tsx` |
| 11 | Create StreakBadge component | ⬜ TODO | `src/components/BibleStudy/StreakBadge.tsx` |
| 12 | Replace Coming Soon with list screen | ⬜ TODO | `src/app/(tabs)/ministry/bible-study.tsx` |
| 13 | Create study detail screen | ⬜ TODO | `src/app/(tabs)/ministry/bible-study/[id].tsx` |
| 14 | Create my notes screen | ⬜ TODO | `src/app/(tabs)/ministry/bible-study/notes.tsx` |

### Acceptance Criteria

- [ ] Browse studies by topic/book
- [ ] Track completion progress
- [ ] Personal notes with highlights
- [ ] Study streaks tracked
- [ ] Audio/video playback works

---

## 2.6 Recent Sermons

**Priority:** MEDIUM
**Status:** ⬜ TODO

### Firestore Collections

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
  - viewsCount: number
  - likesCount: number
  - createdAt: timestamp

sermons/{sermonId}/notes/{odUserId}
  - content: string
  - timestamps: { time: number, note: string }[]
  - createdAt: timestamp
```

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create getSermons service | ⬜ TODO | `src/services/sermon/getSermons.ts` |
| 2 | Create getSermonById service | ⬜ TODO | `src/services/sermon/getSermonById.ts` |
| 3 | Create getSermonsBySeries service | ⬜ TODO | `src/services/sermon/getSermonsBySeries.ts` |
| 4 | Create saveNote service | ⬜ TODO | `src/services/sermon/saveNote.ts` |
| 5 | Create incrementView service | ⬜ TODO | `src/services/sermon/incrementView.ts` |
| 6 | Create sermonSlice | ⬜ TODO | `src/store/slices/sermonSlice.ts` |
| 7 | Create SermonCard component | ⬜ TODO | `src/components/Sermon/SermonCard.tsx` |
| 8 | Create SermonPlayer component | ⬜ TODO | `src/components/Sermon/SermonPlayer.tsx` |
| 9 | Create SermonNotes component | ⬜ TODO | `src/components/Sermon/SermonNotes.tsx` |
| 10 | Create SeriesCard component | ⬜ TODO | `src/components/Sermon/SeriesCard.tsx` |
| 11 | Replace Coming Soon with list screen | ⬜ TODO | `src/app/(tabs)/ministry/recent-sermons.tsx` |
| 12 | Create sermon detail/player screen | ⬜ TODO | `src/app/(tabs)/ministry/recent-sermons/[id].tsx` |

### Acceptance Criteria

- [ ] Video/audio player works
- [ ] Sermon series grouping
- [ ] Personal notes with timestamps
- [ ] View count increments
- [ ] Related sermons shown

---

## Phase 2 Completion Checklist

- [ ] All 2.1 Shared Components complete
- [ ] All 2.2 Daily Prayers complete
- [ ] All 2.3 Prayer Requests complete
- [ ] All 2.4 Testimonies complete
- [ ] All 2.5 Bible Study complete
- [ ] All 2.6 Recent Sermons complete
- [ ] All features manually tested
- [ ] Code reviewed and merged
- [ ] **PHASE 2 COMPLETE** ✅

---

# PHASE 3: User Engagement & Social

**Duration:** 3 weeks
**Status:** ⚪ BLOCKED (Waiting for Phase 2)

---

## 3.1 User Engagement Tracking

**Priority:** HIGH
**Status:** ⬜ TODO

### Firestore Collections

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

### Points Configuration

| Action | Points |
|--------|--------|
| DAILY_LOGIN | 5 |
| DAILY_PRAYER_READ | 10 |
| PRAYER_REQUEST_SUBMIT | 20 |
| PRAY_FOR_SOMEONE | 5 |
| BIBLE_STUDY_COMPLETE | 30 |
| SERMON_WATCH | 15 |
| TESTIMONY_SUBMIT | 50 |
| COMMENT_POST | 3 |
| PROFILE_COMPLETE | 25 |
| STREAK_7_DAYS | 50 |
| STREAK_30_DAYS | 200 |

### Level Progression

| Level | Name | Min Points |
|-------|------|------------|
| 1 | Seedling | 0 |
| 2 | Sprout | 100 |
| 3 | Sapling | 300 |
| 4 | Growing Tree | 600 |
| 5 | Fruitful Tree | 1000 |
| 6 | Mighty Oak | 2000 |
| 7 | Forest Guardian | 5000 |

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create getUserEngagement service | ⬜ TODO | `src/services/gamification/getUserEngagement.ts` |
| 2 | Create awardPoints service | ⬜ TODO | `src/services/gamification/awardPoints.ts` |
| 3 | Create checkAchievements service | ⬜ TODO | `src/services/gamification/checkAchievements.ts` |
| 4 | Create gamificationSlice | ⬜ TODO | `src/store/slices/gamificationSlice.ts` |
| 5 | Create PointsBadge component | ⬜ TODO | `src/components/Gamification/PointsBadge.tsx` |
| 6 | Create LevelIndicator component | ⬜ TODO | `src/components/Gamification/LevelIndicator.tsx` |
| 7 | Create StreakCounter component | ⬜ TODO | `src/components/Gamification/StreakCounter.tsx` |
| 8 | Create PointsAnimation component | ⬜ TODO | `src/components/Gamification/PointsAnimation.tsx` |
| 9 | Integrate points awarding into all features | ⬜ TODO | Multiple files |

### Acceptance Criteria

- [ ] Points awarded for all tracked actions
- [ ] Streak tracking works correctly
- [ ] Level progression updates
- [ ] Points animation shows on earning

---

## 3.2 Leaderboard

**Priority:** HIGH
**Status:** ⬜ TODO

### Firestore Collections

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
```

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create getLeaderboard service | ⬜ TODO | `src/services/gamification/getLeaderboard.ts` |
| 2 | Create LeaderboardList component | ⬜ TODO | `src/components/Gamification/LeaderboardList.tsx` |
| 3 | Create LeaderboardItem component | ⬜ TODO | `src/components/Gamification/LeaderboardItem.tsx` |
| 4 | Create leaderboard screen | ⬜ TODO | `src/app/(tabs)/more/leaderboard.tsx` |
| 5 | Add route to more layout | ⬜ TODO | `src/app/(tabs)/more/_layout.tsx` |
| 6 | Add leaderboard link to more index | ⬜ TODO | `src/app/(tabs)/more/index.tsx` |

### Acceptance Criteria

- [ ] Weekly/monthly/all-time tabs work
- [ ] Current user's rank highlighted
- [ ] Top 3 have special styling
- [ ] Pull to refresh updates leaderboard

---

## 3.3 Badges & Achievements

**Priority:** MEDIUM
**Status:** ⬜ TODO

### Badge Definitions

| Badge ID | Name | Icon | Requirement |
|----------|------|------|-------------|
| PRAYER_WARRIOR | Prayer Warrior | 🙏 | Pray for 100 requests |
| INTERCESSOR | Intercessor | ✨ | Submit 10 prayer requests |
| SCHOLAR | Bible Scholar | 📚 | Complete 20 Bible studies |
| FAITHFUL | Faithful | 🔥 | 30-day login streak |
| WITNESS | Witness | 🌟 | Share 5 testimonies |
| ENCOURAGER | Encourager | 💬 | Post 50 comments |
| DEVOTED | Devoted | 📖 | Watch 25 sermons |

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create getBadges service | ⬜ TODO | `src/services/gamification/getBadges.ts` |
| 2 | Create AchievementCard component | ⬜ TODO | `src/components/Gamification/AchievementCard.tsx` |
| 3 | Create BadgeGrid component | ⬜ TODO | `src/components/Gamification/BadgeGrid.tsx` |
| 4 | Create achievements screen | ⬜ TODO | `src/app/(tabs)/profile/achievements.tsx` |
| 5 | Add route to profile layout | ⬜ TODO | `src/app/(tabs)/profile/_layout.tsx` |
| 6 | Add achievements section to profile | ⬜ TODO | `src/app/(tabs)/profile/index.tsx` |

### Acceptance Criteria

- [ ] Earned badges display on profile
- [ ] Unearned badges show as locked
- [ ] Achievement notifications show when earned
- [ ] Progress shown toward next badge

---

## Phase 3 Completion Checklist

- [ ] All 3.1 Engagement Tracking complete
- [ ] All 3.2 Leaderboard complete
- [ ] All 3.3 Badges complete
- [ ] All features manually tested
- [ ] Code reviewed and merged
- [ ] **PHASE 3 COMPLETE** ✅

---

# PHASE 4: Admin & Polish

**Duration:** 3 weeks
**Status:** ⚪ BLOCKED (Waiting for Phase 3)

---

## 4.1 Admin Dashboard

**Priority:** HIGH
**Status:** ⬜ TODO

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create admin layout | ⬜ TODO | `src/app/(tabs)/admin/_layout.tsx` |
| 2 | Create admin dashboard | ⬜ TODO | `src/app/(tabs)/admin/index.tsx` |
| 3 | Create daily prayers management | ⬜ TODO | `src/app/(tabs)/admin/daily-prayers/index.tsx` |
| 4 | Create daily prayer create/edit | ⬜ TODO | `src/app/(tabs)/admin/daily-prayers/create.tsx` |
| 5 | Create testimony approval queue | ⬜ TODO | `src/app/(tabs)/admin/testimonies/pending.tsx` |
| 6 | Create engagement analytics | ⬜ TODO | `src/app/(tabs)/admin/analytics/index.tsx` |
| 7 | Add admin check to protected routes | ⬜ TODO | `src/constants/routes/config.ts` |

### Acceptance Criteria

- [ ] Only admins can access admin screens
- [ ] Admin can create/edit daily prayers
- [ ] Admin can approve/reject testimonies
- [ ] Analytics dashboard shows key metrics

---

## 4.2 Cloud Functions

**Priority:** HIGH
**Status:** ⬜ TODO

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Create onNewPrayerRequest function | ⬜ TODO | `firebase/functions/notifications.ts` |
| 2 | Create onTestimonySubmitted function | ⬜ TODO | `firebase/functions/notifications.ts` |
| 3 | Create onDailyPrayerCreated function | ⬜ TODO | `firebase/functions/notifications.ts` |
| 4 | Create updateLeaderboard scheduled function | ⬜ TODO | `firebase/functions/leaderboard.ts` |
| 5 | Create awardPoints trigger function | ⬜ TODO | `firebase/functions/gamification.ts` |
| 6 | Deploy functions | ⬜ TODO | Firebase Console |

### Acceptance Criteria

- [ ] Notifications sent automatically
- [ ] Leaderboard updates daily
- [ ] Points awarded reliably

---

## 4.3 Security & Testing

**Priority:** HIGH
**Status:** ⬜ TODO

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Write Firestore security rules | ⬜ TODO | `firestore.rules` |
| 2 | Test all security rules | ⬜ TODO | Manual testing |
| 3 | Add input validation to all forms | ⬜ TODO | Multiple files |
| 4 | Add rate limiting to sensitive actions | ⬜ TODO | Cloud Functions |
| 5 | Performance testing | ⬜ TODO | Manual testing |

### Acceptance Criteria

- [ ] Users cannot access others' private data
- [ ] Admins can access admin functions only
- [ ] All inputs validated and sanitized
- [ ] App performs well under load

---

## 4.4 Final Polish

**Priority:** MEDIUM
**Status:** ⬜ TODO

### Tasks

| # | Task | Status | File Path |
|---|------|--------|-----------|
| 1 | Fix any remaining bugs | ⬜ TODO | Various |
| 2 | Optimize images and assets | ⬜ TODO | Assets folder |
| 3 | Update app icons and splash | ⬜ TODO | `app.json` |
| 4 | Write release notes | ⬜ TODO | External doc |
| 5 | Beta testing with users | ⬜ TODO | TestFlight/Play Console |
| 6 | Address beta feedback | ⬜ TODO | Various |
| 7 | Production deployment | ⬜ TODO | App stores |

### Acceptance Criteria

- [ ] No critical bugs
- [ ] App loads in < 2 seconds
- [ ] Crash rate < 0.1%
- [ ] Beta users approve
- [ ] App store approved

---

## Phase 4 Completion Checklist

- [ ] All 4.1 Admin Dashboard complete
- [ ] All 4.2 Cloud Functions complete
- [ ] All 4.3 Security complete
- [ ] All 4.4 Polish complete
- [ ] **PHASE 4 COMPLETE** ✅
- [ ] **APP READY FOR PRODUCTION** 🚀

---

# Progress Tracker

## Weekly Status Updates

| Week | Phase | Focus | Status | Notes |
|------|-------|-------|--------|-------|
| 1 | 1 | Error Handling, Offline | ⬜ | |
| 2 | 1 | Push Notifications, Performance | ⬜ | |
| 3 | 2 | Shared Components, Daily Prayers | ⬜ | |
| 4 | 2 | Daily Prayers (cont), Prayer Requests | ⬜ | |
| 5 | 2 | Prayer Requests (cont), Testimonies | ⬜ | |
| 6 | 2 | Bible Study, Sermons | ⬜ | |
| 7 | 3 | Engagement Tracking | ⬜ | |
| 8 | 3 | Leaderboard, Badges | ⬜ | |
| 9 | 3 | Badges (cont), Integration | ⬜ | |
| 10 | 4 | Admin Dashboard | ⬜ | |
| 11 | 4 | Cloud Functions, Security | ⬜ | |
| 12 | 4 | Testing, Polish | ⬜ | |
| 13 | 4 | Beta Testing | ⬜ | |
| 14 | 4 | Production Release | ⬜ | |

---

# Implementation Notes

## Getting Started

1. Download this file
2. Import into your project management tool (Notion, Google Docs, etc.)
3. Update status markers as you complete tasks:
   - ⬜ TODO
   - 🔄 IN PROGRESS
   - ✅ COMPLETE
4. Check off acceptance criteria as you verify them
5. Update weekly status in the Progress Tracker

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ⬜ | TODO - Not started |
| 🔄 | IN PROGRESS - Currently working |
| ✅ | COMPLETE - Done and tested |
| ⚪ | BLOCKED - Waiting on dependency |
| 🔵 | NOT STARTED - Phase not begun |

---

*Document Version: 1.0*
*Created: December 2025*
*Last Updated: ___________*
*Current Phase: ___________*
*Next Milestone: ___________*
