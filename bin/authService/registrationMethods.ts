// import { auth, db } from '@/src/config/firebase';
// import { isEmail } from '@/src/utils';
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth';
// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   setDoc,
//   where,
// } from 'firebase/firestore';

// /**
//  * Create new user account (guest)
//  */
// export const createNewUser = async (
//   data: UnifiedRegistrationData & { role: 'guest' },
// ): Promise<{ tempUserId: string }> => {
//   try {
//     // For new users, we'll create a temporary record and complete it after verification
//     const tempUserId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

//     // Store temporary user data
//     const tempUserData = {
//       ...data,
//       id: tempUserId,
//       email:
//         data.contactType === 'email'
//           ? data.emailOrPhone
//           : `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}@guest.com`,
//       phone: data.contactType === 'phone' ? [data.emailOrPhone] : [],
//       primaryContact: data.contactType,
//       emailVerified: false,
//       phoneVerified: false,
//       verified: false,
//       status: 'pending_verification' as const,
//       createdAt: new Date().toISOString(),
//     };

//     // Store in a temporary collection
//     await setDoc(doc(db, 'temp_registrations', tempUserId), tempUserData);

//     return { tempUserId };
//   } catch (error: any) {
//     console.error('Create new user error:', error);
//     throw new Error(error.message || 'Failed to create user');
//   }
// };

// /**
//  * Link existing user with new account
//  */
// export const linkExistingUser = async (
//   data: LinkExistingUserData,
// ): Promise<{ tempUserId: string }> => {
//   try {
//     const tempUserId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

//     // Store temporary linking data
//     const tempLinkData = {
//       ...data,
//       tempUserId,
//       existingUserId: data.existingUserData?.id,
//       status: 'pending_verification',
//       createdAt: new Date().toISOString(),
//     };

//     await setDoc(doc(db, 'temp_registrations', tempUserId), tempLinkData);

//     return { tempUserId };
//   } catch (error: any) {
//     console.error('Link existing user error:', error);
//     throw new Error(error.message || 'Failed to link user');
//   }
// };

// /**
//  * Complete registration with verification
//  */
// export const completeRegistrationWithVerification = async (data: {
//   emailOrPhone: string;
//   verificationCode: string;
//   contactType: ContactType;
//   isExistingUser: boolean;
//   userData?: MemberProfile;
// }): Promise<AuthResponse> => {
//   try {
//     // For development, accept any 6-digit code
//     if (data.verificationCode.length !== 6) {
//       throw new Error('Invalid verification code');
//     }

//     // Get temporary registration data
//     const tempRegsRef = collection(db, 'temp_registrations');
//     const tempQuery = query(
//       tempRegsRef,
//       where('emailOrPhone', '==', data.emailOrPhone),
//     );
//     const tempSnapshot = await getDocs(tempQuery);

//     if (tempSnapshot.empty) {
//       throw new Error('Registration session not found');
//     }

//     const tempData = tempSnapshot.docs[0].data();

//     // Determine email for Firebase Auth
//     let email: string;
//     if (data.contactType === 'email') {
//       email = data.emailOrPhone;
//     } else {
//       // Generate email from existing user data or create one
//       if (data.isExistingUser && data.userData?.email) {
//         email = data.userData.email;
//       } else {
//         email = `${tempData.firstName.toLowerCase()}.${tempData.lastName.toLowerCase()}@phone.user`;
//       }
//     }

//     // Create Firebase Auth account
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       tempData.password,
//     );
//     const user = userCredential.user;

//     // Update display name
//     await updateProfile(user, {
//       displayName: `${tempData.firstName} ${tempData.lastName}`,
//     });

//     // Create or update member profile
//     let memberProfile: MemberProfile;

//     if (data.isExistingUser && data.userData) {
//       // Update existing member with Firebase Auth info
//       memberProfile = {
//         ...data.userData,
//         id: user.uid,
//         email: email,
//         hasPassword: true,
//         verified: true,
//         emailVerified: data.contactType === 'email',
//         phoneVerified: data.contactType === 'phone',
//         primaryContact: data.contactType,
//         status: 'active',
//         // role: data.userData.role || 'member', // Keep existing role or default to member
//       };
//     } else {
//       // Create new guest profile
//       memberProfile = {
//         id: user.uid,
//         firstName: tempData.firstName,
//         lastName: tempData.lastName,
//         email: email,
//         title: '',
//         phone: data.contactType === 'phone' ? [data.emailOrPhone] : [],
//         band: [],
//         // role: 'guest',
//         position: [],
//         rank: 1,
//         avatar: '',
//         address: '',
//         joinDate: new Date().toISOString(),
//         status: 'active',
//         verified: true,
//         gender: '',
//         dob: '',
//         memberSince: new Date().getFullYear().toString(),
//         department: '',
//         hasPassword: true,
//         accountType: 'guest',
//         primaryContact: data.contactType,
//         secondaryContact: data.contactType === 'email' ? undefined : email,
//         emailVerified: data.contactType === 'email',
//         phoneVerified: data.contactType === 'phone',
//       };
//     }

//     // Save member profile to Firestore
//     await setDoc(doc(db, 'members', user.uid), memberProfile);

//     // Clean up temporary registration
//     await setDoc(
//       doc(db, 'temp_registrations', tempSnapshot.docs[0].id),
//       { deleted: true },
//       { merge: true },
//     );

//     const token = await user.getIdToken();

//     return {
//       user: {
//         id: user.uid,
//         email: user.email!,
//         firstName: memberProfile.firstName,
//         lastName: memberProfile.lastName,
//         phone: memberProfile.phone[0] || data.emailOrPhone,
//         role: memberProfile.role,
//       },
//       profile: memberProfile,
//       token,
//     };
//   } catch (error: any) {
//     console.error('Complete registration error:', error);
//     throw new Error(error.message || 'Failed to complete registration');
//   }
// };

// /**
//  * Legacy signup method - redirects to unified registration
//  */
// export const signUp = async (data: any): Promise<any> => {
//   // This maintains backward compatibility
//   // Redirect to the new unified flow
//   const contactType = isEmail(data.email || data.emailOrPhone)
//     ? 'email'
//     : 'phone';
//   const emailOrPhone = data.email || data.emailOrPhone;

//   return createNewUser({
//     firstName: data.firstName,
//     lastName: data.lastName,
//     emailOrPhone,
//     password: data.password,
//     contactType,
//     role: 'guest',
//   });
// };