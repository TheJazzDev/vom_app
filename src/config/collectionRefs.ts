import { collection } from 'firebase/firestore';
import { firestore } from './firebase';

export const bandsRef = collection(firestore, 'bands');
export const guestsRef = collection(firestore, 'guests');
export const membersRef = collection(firestore, 'members');
export const childrenRef = collection(firestore, 'children');
export const programmesRef = collection(firestore, 'programmes');
export const departmentsRef = collection(firestore, 'departments');
export const announcementsRef = collection(firestore, 'announcements');
export const notificationsRef = collection(firestore, 'notifications');
