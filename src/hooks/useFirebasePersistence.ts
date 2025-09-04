import { auth } from '@/src/config/firebase';
import { useEffect, useRef } from 'react';
import { dispatch, getMemberByAuthUidThunk, useAuthSlice } from '../store';

export function useFirebasePersistence() {
  const { setCurrentUser, currentUser } = useAuthSlice();
  const appStartTime = useRef(Date.now());

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      const timeSinceStart = Date.now() - appStartTime.current;

      try {
        if (firebaseUser) {
          // Skip if we already have this user in Redux
          if (currentUser && currentUser.uid === firebaseUser.uid) {
            return;
          }

          // Fetch member data with retry logic for activation scenarios
          let retries = 0;
          const maxRetries = 3;

          while (retries < maxRetries) {
            try {
              const resultAction = await dispatch(
                getMemberByAuthUidThunk(firebaseUser.uid),
              );

              if (getMemberByAuthUidThunk.fulfilled.match(resultAction)) {
                return;
              } else {
                retries++;
                if (retries < maxRetries) {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                }
              }
            } catch (error) {
              retries++;
              if (retries < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }
              console.log('Error after retry:', error);
            }
          }

          dispatch(setCurrentUser(null));
        } else {
          // Handle logout scenarios
          if (timeSinceStart < 10000 && currentUser) {
            // Keep persisted user during Firebase initialization
            return;
          } else if (timeSinceStart >= 10000 && currentUser) {
            // Real logout after initialization timeout
            dispatch(setCurrentUser(null));
          }
        }
      } catch (error) {
        console.error('Error in Firebase auth listener:', error);
      }
    });

    return unsubscribe;
  }, [setCurrentUser, currentUser]);
}
