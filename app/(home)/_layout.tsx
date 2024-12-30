import { WSProvider } from "@/services/sockets/WSProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
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
