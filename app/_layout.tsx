import { Colors } from "@/utils/Constants";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return<GestureHandlerRootView style={{flex:1}}>
   <Stack screenOptions={{headerShown:false,statusBarBackgroundColor:Colors.tertiary}}>
    <Stack.Screen name="(auth)" />
    <Stack.Screen name="(home)" />
  </Stack>
  </GestureHandlerRootView>
}
