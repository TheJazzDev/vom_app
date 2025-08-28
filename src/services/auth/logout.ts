import { auth } from '@/src/config/firebase';
import { signOut } from 'firebase/auth';

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error(error.message || 'Logout failed');
  }
};
