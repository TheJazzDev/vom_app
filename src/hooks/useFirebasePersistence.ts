import { auth } from '@/src/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { dispatch, getMemberByAuthUidThunk, useAuthSlice } from '../store';

export function useFirebasePersistence() {
  const { setCurrentUser, currentUser } = useAuthSlice();
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
          if (currentUser && currentUser.uid === firebaseUser.uid) {
            console.log(
              '✅ Firebase confirms persisted Redux user:',
              currentUser.firstName,
            );
            return;
          }

          // Add delay for database consistency during activation
          console.log('🌐 Fetching member data from database');

          // Retry logic for activation scenarios
          let retries = 0;
          const maxRetries = 3;

          while (retries < maxRetries) {
            try {
              const resultAction = await dispatch(
                getMemberByAuthUidThunk(firebaseUser.uid),
              );

              if (getMemberByAuthUidThunk.fulfilled.match(resultAction)) {
                console.log(
                  '✅ Member data loaded from DB:',
                  resultAction.payload?.firstName,
                );
                return;
              } else {
                retries++;
                if (retries < maxRetries) {
                  console.log(
                    `🔄 Retrying member fetch (${retries}/${maxRetries})`,
                  );
                  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s before retry
                }
              }
            } catch (error) {
              retries++;
              console.warn(`❌ Member fetch attempt ${retries} failed:`, error);
              if (retries < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }
            }
          }

          console.warn('❌ No member found after retries');
          dispatch(setCurrentUser(null));
        } else {
          // Rest of your existing logic...
          if (timeSinceStart < 10000 && currentUser) {
            console.log(
              `🔄 Firebase not ready (${timeSinceStart}ms), keeping persisted user:`,
              currentUser.firstName,
            );
          } else if (timeSinceStart >= 10000 && currentUser) {
            console.log(
              '⏰ Firebase initialization timeout, might be real logout',
            );
            dispatch(setCurrentUser(null));
          } else {
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
  }, [setCurrentUser, currentUser]);
}
