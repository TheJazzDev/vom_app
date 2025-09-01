import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { auth } from '../config/firebase';
import { dispatch, getMemberByAuthUidThunk, useAuthSlice } from '../store';

export function useAuthPersistence() {
  const {
    setAuthInitialized,
    setCurrentMember,
    currentMember,
    isAuthenticated,
    isInitialized,
  } = useAuthSlice();

  const lastFetchTime = useRef<number>(0);
  const CACHE_DURATION = 5 * 60 * 1000;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const now = Date.now();
          const shouldFetchFromDB =
            !currentMember ||
            currentMember.authUid !== user.uid ||
            !isAuthenticated ||
            now - lastFetchTime.current > CACHE_DURATION;

          if (shouldFetchFromDB) {
            console.log('Fetching fresh member data from database...');
            lastFetchTime.current = now;

            const resultAction = await dispatch(
              getMemberByAuthUidThunk(user.uid),
            );

            if (getMemberByAuthUidThunk.fulfilled.match(resultAction)) {
              console.log(
                'Member data updated:',
                resultAction.payload?.firstName,
              );
            } else {
              console.warn('No member profile found for authenticated user');
              dispatch(setCurrentMember(null));
            }
          } else {
            console.log('Using cached member data:', currentMember.firstName);
          }
        } else {
          // User logged out
          dispatch(setCurrentMember(null));
          lastFetchTime.current = 0;
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        dispatch(setCurrentMember(null));
      } finally {
        if (!isInitialized) {
          dispatch(setAuthInitialized());
        }
      }
    });

    return () => unsubscribe();
  }, [
    setCurrentMember,
    setAuthInitialized,
    currentMember,
    isAuthenticated,
    isInitialized,
  ]);
}

// Alternative: Manual refresh function for when you need fresh data
export function useRefreshMemberData() {
  const { currentMember } = useAuthSlice();

  const refreshMemberData = async () => {
    if (currentMember) {
      console.log('Manually refreshing member data...');
      const resultAction = await dispatch(
        getMemberByAuthUidThunk(currentMember.authUid),
      );

      if (getMemberByAuthUidThunk.fulfilled.match(resultAction)) {
        console.log('Member data refreshed successfully');
        return resultAction.payload;
      }
    }
    return null;
  };

  return refreshMemberData;
}
