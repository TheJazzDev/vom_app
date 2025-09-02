// hooks/useFirebasePersistence.ts - NON-BLOCKING VERSION
import { auth } from '@/src/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { dispatch, getMemberByAuthUidThunk, useAuthSlice } from '../store';

export function useFirebasePersistence() {
  const { setCurrentMember, currentMember } = useAuthSlice();
  const appStartTime = useRef(Date.now());

  useEffect(() => {
    console.log('🔥 Starting Firebase auth listener (non-blocking)');

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const timeSinceStart = Date.now() - appStartTime.current;
      console.log(
        '🔥 Firebase auth state changed:',
        !!firebaseUser,
        `(${timeSinceStart}ms since start)`,
      );

      try {
        if (firebaseUser) {
          // Firebase user exists
          if (currentMember && currentMember.uid === firebaseUser.uid) {
            console.log(
              '✅ Firebase confirms persisted Redux user:',
              currentMember.firstName,
            );
            return;
          }

          // User exists in Firebase but not in Redux - fetch from DB
          console.log('🌐 Fetching member data from database');
          const resultAction = await dispatch(
            getMemberByAuthUidThunk(firebaseUser.uid),
          );

          if (getMemberByAuthUidThunk.fulfilled.match(resultAction)) {
            console.log(
              '✅ Member data loaded from DB:',
              resultAction.payload?.firstName,
            );
          } else {
            console.warn('❌ No member found in DB');
            dispatch(setCurrentMember(null));
          }
        } else {
          // No Firebase user
          if (timeSinceStart < 10000 && currentMember) {
            // Within protection window - keep persisted user
            console.log(
              `🔄 Firebase not ready (${timeSinceStart}ms), keeping persisted user:`,
              currentMember.firstName,
            );
          } else if (timeSinceStart >= 10000 && currentMember) {
            // Protection window expired - might be real logout
            console.log(
              '⏰ Firebase initialization timeout, might be real logout',
            );
            dispatch(setCurrentMember(null));
          } else {
            // No persisted user anyway
            console.log('🚪 No persisted user, staying logged out');
          }
        }
      } catch (error) {
        console.error('❌ Error in Firebase auth listener:', error);
      }
    });

    return () => {
      console.log('🔥 Cleaning up Firebase auth listener');
      unsubscribe();
    };
  }, [setCurrentMember, currentMember]);
}
