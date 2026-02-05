import { auth, db } from '@/src/config/firebase';
import { updateMemberAvatar } from '@/src/services/storage/avatarService';
import { doc, updateDoc } from 'firebase/firestore';

interface UpdateProfileData {
  primaryPhone?: string;
  secondaryPhone?: string;
  address?: string;
  occupation?: string;
  maritalStatus?: string;
  avatar?: string;
  avatarUri?: string;
  oldAvatarUrl?: string;
}

export async function updateUserProfile(data: UpdateProfileData) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No authenticated user found');
    }

    let avatarUrl = data.avatar;

    // If avatarUri is provided, upload the new avatar
    if (data.avatarUri) {
      avatarUrl = await updateMemberAvatar(
        data.avatarUri,
        data.oldAvatarUrl,
        user.uid,
      );
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date().toISOString(),
    };

    if (data.primaryPhone !== undefined)
      updateData.primaryPhone = data.primaryPhone;
    if (data.secondaryPhone !== undefined)
      updateData.secondaryPhone = data.secondaryPhone;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.occupation !== undefined) updateData.occupation = data.occupation;
    if (data.maritalStatus !== undefined)
      updateData.maritalStatus = data.maritalStatus;
    if (avatarUrl !== undefined) updateData.avatar = avatarUrl;

    // Update member document in Firestore
    const memberRef = doc(db, 'members', user.uid);

    await updateDoc(memberRef, updateData);

    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}
