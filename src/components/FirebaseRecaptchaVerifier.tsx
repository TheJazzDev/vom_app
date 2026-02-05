import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '@/src/config/firebase';

interface FirebaseRecaptchaVerifierProps {
  firebaseConfig?: any;
  attemptInvisibleVerification?: boolean;
}

export interface RecaptchaVerifierHandle {
  verify: () => Promise<string>;
}

/**
 * Firebase reCAPTCHA Verifier Component
 *
 * This component creates a reCAPTCHA verifier for Firebase Authentication
 * phone number verification. It uses Firebase's RecaptchaVerifier which
 * automatically renders an invisible or visible reCAPTCHA widget.
 *
 * Note: This is a replacement for expo-firebase-recaptcha which is not
 * compatible with Expo SDK 54+.
 */
const FirebaseRecaptchaVerifier = forwardRef<
  RecaptchaVerifier | null,
  FirebaseRecaptchaVerifierProps
>((props, ref) => {
  const { attemptInvisibleVerification = true } = props;
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a container div for reCAPTCHA if it doesn't exist
    if (typeof window !== 'undefined' && !containerRef.current) {
      const container = document.createElement('div');
      container.id = 'recaptcha-container';
      container.style.position = 'absolute';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      document.body.appendChild(container);
      containerRef.current = container;

      // Initialize RecaptchaVerifier
      try {
        recaptchaVerifierRef.current = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: attemptInvisibleVerification ? 'invisible' : 'normal',
            callback: () => {
              // reCAPTCHA solved
              console.log('reCAPTCHA verified successfully');
            },
            'expired-callback': () => {
              // Response expired
              console.log('reCAPTCHA expired');
            },
          },
        );
      } catch (error) {
        console.error('Error initializing RecaptchaVerifier:', error);
      }
    }

    // Cleanup on unmount
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
      if (containerRef.current && document.body.contains(containerRef.current)) {
        document.body.removeChild(containerRef.current);
        containerRef.current = null;
      }
    };
  }, [attemptInvisibleVerification]);

  // Expose the verifier through ref
  useImperativeHandle(ref, () => recaptchaVerifierRef.current, []);

  // This component doesn't render anything visible
  return null;
});

FirebaseRecaptchaVerifier.displayName = 'FirebaseRecaptchaVerifier';

export default FirebaseRecaptchaVerifier;
