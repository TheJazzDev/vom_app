import { auth, firestore } from '@/src/config';
import { generateUserId } from '@/src/utils';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function createGuestAccount(
  data: RegistrationProps,
): Promise<GuestRegistrationResult> {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  );

  await updateProfile(userCredential.user, {
    displayName: `${data.firstName} ${data.lastName}`,
  });

  await auth.signOut();

  const id = generateUserId('guest');
  const uid = userCredential.user.uid;

  const newGuest: UserProfile = {
    uid,
    id,
    firstName: data.firstName,
    middleName: '',
    lastName: data.lastName,
    email: data.email,
    title: '',
    primaryPhone: '',
    secondaryPhone: '',
    position: [],
    occupation: '',
    maritalStatus: '',
    role: 'user',
    avatar: '',
    address: '',
    joinDate: '',
    band: [],
    bandKeys: [],
    departmentKeys: [],
    createdAt: new Date().toISOString(),
    status: 'active',
    verified: true,
    gender: '',
    dob: '',
    department: [],
    hasPassword: true,
    accountType: 'guest',
    authType: 'email',
    emailVerified: true,
    phoneVerified: false,
  };

  await setDoc(doc(firestore, 'guests', id), newGuest);

  return {
    guest: newGuest,
    isExistingMember: false,
    requiresEmailVerification: true,
  };
}
