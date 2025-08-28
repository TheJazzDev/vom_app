import { auth } from '@/src/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { dispatch, getMemberByAuthUidThunk, useAuthSlice } from '../store';

/**
 * Custom hook to handle Firebase Auth state persistence
 * Call this once in your App component or root layout
 */
export const useAuthPersistence = () => {
  const { setAuthInitialized, setCurrentMember } = useAuthSlice();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, get their member profile
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
        // User is signed out
        dispatch(setCurrentMember(null));
        dispatch(setAuthInitialized());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);
};
