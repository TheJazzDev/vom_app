// // hooks/usePushNotifications.ts
// import Constants from "expo-constants";
// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import { useEffect, useState } from "react";
// import { Platform } from "react-native";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });

// export function usePushNotifications() {
//   const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
//   const [notification, setNotification] = useState<
//     Notifications.Notification | null
//   >(null);

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(setExpoPushToken);

//     const notificationListener =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });

//     const responseListener =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log("Notification response:", response);
//       });

//     return () => {
//       notificationListener.remove();
//       responseListener.remove();
//     };
//   }, []);

//   return { expoPushToken, notification };
// }

// async function registerForPushNotificationsAsync() {
//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   if (!Device.isDevice) {
//     console.warn("Must use physical device for push notifications");
//     return null;
//   }

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;
//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }
//   if (finalStatus !== "granted") {
//     console.warn("Permission not granted for push notifications");
//     return null;
//   }

//   const projectId =
//     Constants?.expoConfig?.extra?.eas?.projectId ??
//     Constants?.easConfig?.projectId;

//   if (!projectId) {
//     console.error("No Expo project ID found!");
//     return null;
//   }

//   const pushToken = (await Notifications.getExpoPushTokenAsync({ projectId }))
//     .data;
//   return pushToken;
// }
