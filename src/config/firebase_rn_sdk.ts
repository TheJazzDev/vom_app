// config/firebase.ts - Using React Native Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// React Native Firebase automatically handles persistence
// No need to configure AsyncStorage manually

export { auth, firestore as db, storage };

// Phone auth helper (if needed)
export const initializePhoneAuth = () => {
  // React Native Firebase handles phone auth differently
  // You'll use auth().signInWithPhoneNumber() directly
  console.log('Phone auth initialized');
};