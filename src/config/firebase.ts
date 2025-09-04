import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDW5TVk4ckeNGDLHDF_n3FRssdaVtnZ60k',
  authDomain: 'vom-app-e20ae.firebaseapp.com',
  projectId: 'vom-app-e20ae',
  storageBucket: 'vom-app-e20ae.firebasestorage.app',
  messagingSenderId: '72770096721',
  appId: '1:72770096721:web:07efaed9acb5debf5a3270',
  measurementId: 'G-DYJVM3XVBK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth (Web SDK automatically uses browser storage on web, memory on native)
const auth = getAuth(app);

// For React Native, we need to handle persistence differently
if (Platform.OS !== 'web') {
  // Firebase Web SDK in React Native will use memory persistence
  // We'll rely on Redux persistence instead
  console.log(
    'Using Firebase Web SDK in React Native - relying on Redux persistence',
  );
}

export const initializePhoneAuth = (): RecaptchaVerifier | null => {
  // RecaptchaVerifier only works on web
  if (Platform.OS === 'web') {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            console.log('reCAPTCHA solved');
          },
        },
      );
    }
    return window.recaptchaVerifier;
  }
  return null;
};

// Initialize other services
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
