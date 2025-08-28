import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
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

export const initializePhoneAuth = (): RecaptchaVerifier => {
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
};

// Initialize services
// Initialize Auth with AsyncStorage persistence
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
