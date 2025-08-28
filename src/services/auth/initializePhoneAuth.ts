import { auth } from '@/src/config/firebase';
import { RecaptchaVerifier } from 'firebase/auth';

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
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = undefined;
          }
        },
      },
    );
  }
  return window.recaptchaVerifier;
};
