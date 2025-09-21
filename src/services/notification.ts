// import Constants from 'expo-constants';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import { doc, setDoc } from 'firebase/firestore';
// import { Platform } from 'react-native';
// import { membersRef } from '../config';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

// export async function registerForPushNotificationsAsync(userId: string) {
//   // Skip on simulators
//   if (!Device.isDevice) return;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== 'granted') {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== 'granted') {
//     console.log('Notification permission not granted!');
//     return;
//   }

//   const pushToken = (
//     await Notifications.getExpoPushTokenAsync({
//       projectId:
//         Constants?.expoConfig?.extra?.eas?.projectId ??
//         Constants?.easConfig?.projectId,
//     })
//   ).data;

//   console.log('Push token:', pushToken);

//   // Save token to Firestore
//   await setDoc(
//     doc(membersRef, userId),
//     {
//       expoPushToken: pushToken,
//       updatedAt: new Date(),
//     },
//     { merge: true },
//   );

//   return pushToken;
// }
