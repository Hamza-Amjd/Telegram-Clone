import { WSProvider } from "@/services/sockets/WSProvider";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";
import { registerForPushNotificationsAsync } from "@/utils/NotificationHandler";
import { registerDeviceToken } from "@/services/api/authService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  const notificationListener=useRef<Notifications.EventSubscription>();
  const responseListener=useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(async(token)=>{registerDeviceToken(token??"")}).catch((error) =>console.error(error));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification:any) => {console.log(notification)});
    responseListener.current = Notifications.addNotificationResponseReceivedListener((notification:any) => {console.log(notification)});

    return () => {
      notificationListener.current &&
      Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  },[]);
  return <WSProvider>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="home"/>
        <Stack.Screen name="chat"/>
        <Stack.Screen name="contacts"/>
        <Stack.Screen name="notification"/>
        <Stack.Screen name="profile"/>
        <Stack.Screen name="search"/>
    </Stack>
  </WSProvider>;
}
