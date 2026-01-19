import { storage } from '@/src/config/firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

/**
 * Uploads a member avatar to Firebase Storage
 * @param uri - Local file URI from image picker
 * @param memberId - Member ID (usually auth UID)
 * @returns Download URL of uploaded image
 */
export async function uploadMemberAvatar(
  uri: string,
  memberId?: string,
): Promise<string> {
  try {
    // Fetch the image from local URI
    const response = await fetch(uri);
    const blob = await response.blob();

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = memberId
      ? `${memberId}_${timestamp}.jpg`
      : `temp_${timestamp}.jpg`;

    // Create storage reference
    const storageRef = ref(storage, `members/avatars/${fileName}`);

    // Upload file
    const snapshot = await uploadBytes(storageRef, blob, {
      contentType: 'image/jpeg',
    });

    // Get download URL
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw new Error('Failed to upload avatar');
  }
}

/**
 * Deletes a member avatar from Firebase Storage
 * @param avatarUrl - Full download URL of the avatar
 */
export async function deleteMemberAvatar(avatarUrl: string): Promise<void> {
  try {
    if (!avatarUrl) return;

    // Extract path from URL
    const urlObj = new URL(avatarUrl);
    const pathMatch = urlObj.pathname.match(/\/o\/(.+)\?/);

    if (!pathMatch) {
      console.warn('Could not extract path from avatar URL');
      return;
    }

    const path = decodeURIComponent(pathMatch[1]);
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting avatar:', error);
    // Don't throw - deletion errors shouldn't block the flow
  }
}

/**
 * Updates member avatar by deleting old one and uploading new one
 * @param newUri - Local file URI of new image
 * @param oldAvatarUrl - Download URL of existing avatar (optional)
 * @param memberId - Member ID
 * @returns Download URL of new avatar
 */
export async function updateMemberAvatar(
  newUri: string,
  oldAvatarUrl?: string,
  memberId?: string,
): Promise<string> {
  try {
    // Delete old avatar if exists
    if (oldAvatarUrl) {
      await deleteMemberAvatar(oldAvatarUrl);
    }

    // Upload new avatar
    const newAvatarUrl = await uploadMemberAvatar(newUri, memberId);
    return newAvatarUrl;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw new Error('Failed to update avatar');
  }
}
