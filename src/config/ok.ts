// import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  disableNetwork,
  enableNetwork,
  getDocs,
} from 'firebase/firestore';
// import { useEffect } from 'react';
import { db } from './firebase';

// Auth state automatically persists
// useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in and state is automatically restored
//       console.log('User restored from persistence:', user.email);
//     }
//   });
//   return unsubscribe;
// }, []);

// Firestore automatically caches data
export const fetchData = async () => {
  try {
    // This will work offline if data was previously cached
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  } catch (error) {
    console.log('Error (might be offline):', error);
  }
};

// Manually enable/disable network
export const goOffline = () => disableNetwork(db);
export const goOnline = () => enableNetwork(db);
