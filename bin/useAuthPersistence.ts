// import { onAuthStateChanged } from 'firebase/auth';
// import { useEffect, useRef } from 'react';
// import { auth } from '../config/firebase';
// import { dispatch, getMemberByAuthUidThunk, useAuthSlice } from '../store';

// export function useAuthPersistence() {
//   const {
//     setAuthInitialized,
//     setCurrentUser,
//     currentUser,
//     isAuthenticated,
//     isInitialized,
//   } = useAuthSlice();

//   const lastFetchTime = useRef<number>(0);
//   const CACHE_DURATION = 5 * 60 * 1000;

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       try {
//         if (user) {
//           const now = Date.now();
//           const shouldFetchFromDB =
//             !currentUser ||
//             currentUser.uid !== user.uid ||
//             !isAuthenticated ||
//             now - lastFetchTime.current > CACHE_DURATION;

//           if (shouldFetchFromDB) {
//             console.log('Fetching fresh member data from database...');
//             lastFetchTime.current = now;

//             const resultAction = await dispatch(
//               getMemberByAuthUidThunk(user.uid),
//             );

//             if (getMemberByAuthUidThunk.fulfilled.match(resultAction)) {
//               console.log(
//                 'Member data updated:',
//                 resultAction.payload?.firstName,
//               );
//             } else {
//               console.warn('No member profile found for authenticated user');
//               dispatch(setCurrentUser(null));
//             }
//           } else {
//             console.log('Using cached member data:', currentUser.firstName);
//           }
//         } else {
//           // User logged out
//           dispatch(setCurrentUser(null));
//           lastFetchTime.current = 0;
//         }
//       } catch (error) {
//         console.error('Error in auth state change:', error);
//         dispatch(setCurrentUser(null));
//       } finally {
//         if (!isInitialized) {
//           dispatch(setAuthInitialized());
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [
//     setCurrentUser,
//     setAuthInitialized,
//     currentUser,
//     isAuthenticated,
//     isInitialized,
//     CACHE_DURATION,
//   ]);
// }

// // Alternative: Manual refresh function for when you need fresh data
// export function useRefreshMemberData() {
//   const { currentUser } = useAuthSlice();

//   const refreshMemberData = async () => {
//     if (currentUser) {
//       console.log('Manually refreshing member data...');
//       const resultAction = await dispatch(
//         getMemberByAuthUidThunk(currentUser.uid),
//       );

//       if (getMemberByAuthUidThunk.fulfilled.match(resultAction)) {
//         console.log('Member data refreshed successfully');
//         return resultAction.payload;
//       }
//     }
//     return null;
//   };

//   return refreshMemberData;
// }
