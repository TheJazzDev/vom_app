import { db } from '@/src/config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const verifyPhoneCodeAndSignIn = async (
  verificationCode: string,
): Promise<MemberProfile> => {
  try {
    if (!window.phoneConfirmationResult) {
      throw new Error('No phone verification in progress');
    }

    // Confirm the verification code - this signs the user in
    const userCredential =
      await window.phoneConfirmationResult.confirm(verificationCode);
    const user = userCredential.user;

    // Get member profile using authUid
    const membersRef = collection(db, 'members');
    const q = query(
      membersRef,
      where('phone', 'array-contains', user.phoneNumber),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('Member profile not found');
    }

    const memberProfile = querySnapshot.docs[0].data() as MemberProfile;

    // Clean up
    window.phoneConfirmationResult = undefined;
    if (window.recaptchaVerifier) {
      await window.recaptchaVerifier.clear();
      window.recaptchaVerifier = undefined;
    }

    return memberProfile;
  } catch (error: any) {
    console.error('Phone verification error:', error);

    // Clean up on error
    window.phoneConfirmationResult = undefined;
    if (window.recaptchaVerifier) {
      await window.recaptchaVerifier.clear();
      window.recaptchaVerifier = undefined;
    }

    throw new Error(error.message || 'Phone verification failed');
  }
};

// export const verifyPhoneCode = async (
//   verificationId: string,
//   code: string,
//   memberId: string,
// ): Promise<MemberProfile> => {
//   try {
//     // Create phone auth credential
//     const credential = PhoneAuthProvider.credential(verificationId, code);

//     // Sign in with the credential
//     const userCredential = await signInWithCredential(auth, credential);

//     // Update member record
//     const memberDoc = doc(db, 'members', memberId);
//     await updateDoc(memberDoc, {
//       phoneVerified: true,
//       verified: true,
//     });

//     // Get updated member data
//     const membersRef = collection(db, 'members');
//     const memberQuery = query(membersRef, where('id', '==', memberId));
//     const memberSnapshot = await getDocs(memberQuery);

//     if (!memberSnapshot.empty) {
//       return {
//         ...memberSnapshot.docs[0].data(),
//         id: memberSnapshot.docs[0].id,
//       } as MemberProfile;
//     } else {
//       throw new Error('Member not found');
//     }
//   } catch (error: any) {
//     console.error('Verify phone code error:', error);
//     throw new Error(error.message || 'Phone verification failed');
//   }
// };
