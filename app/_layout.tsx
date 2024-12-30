import { Colors } from "@/utils/Constants";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{headerShown:false,statusBarBackgroundColor:Colors.tertiary}}>
    <Stack.Screen name="(auth)" />
    <Stack.Screen name="(home)" />
  </Stack>;
}
