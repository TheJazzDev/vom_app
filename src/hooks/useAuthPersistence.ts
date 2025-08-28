import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../config/firebase';
import { dispatch, getMemberByAuthUidThunk, useAuthSlice } from '../store';

export function useAuthPersistence() {
  const { setAuthInitialized, setCurrentMember } = useAuthSlice();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('user from auth listener', user.uid);
        try {
          const resultAction = await dispatch(
            getMemberByAuthUidThunk(user.uid),
          );

          if (getMemberByAuthUidThunk.fulfilled.match(resultAction)) {
            // Member found and set in Redux
            console.log(
              'Auth restored for user:',
              resultAction.payload?.firstName,
            );
          } else {
            // Member not found, clear auth state
            dispatch(setCurrentMember(null));
            console.warn('No member profile found for authenticated user');
          }
        } catch (error) {
          console.error('Error restoring auth state:', error);
          dispatch(setCurrentMember(null));
        }
      } else {
        dispatch(setCurrentMember(null));
        dispatch(setAuthInitialized());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setCurrentMember, setAuthInitialized]);
}
