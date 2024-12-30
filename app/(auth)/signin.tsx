import CustomSafeAreaView from "@/components/ui/CustomSafeAreaView";
import CustomText from "@/components/ui/CustomText";
import { sigInWithGoogle } from "@/services/api/authService";
import { siginStyles } from "@/styles/signinStyles";
import LottieView from "lottie-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function signin() {
  return (
    <CustomSafeAreaView style={siginStyles.container}>
      <LottieView style={siginStyles.animation} source={require('@/assets/animations/telegram.json')} autoPlay loop speed={3000}/>
      <CustomText variant="h3" style={siginStyles.title}>Welcome to Telegram!</CustomText>
      <CustomText style={siginStyles.message}>Messages are highly encrypted and data is secured.</CustomText>
      <TouchableOpacity style={siginStyles.loginBtn} onPress={()=>sigInWithGoogle()}>
        <Image source={require('@/assets/icons/google.png')} style={siginStyles.googleIcon}/>
        <Text style={siginStyles.loginBtnText}>Sign in with Google</Text>
      </TouchableOpacity>
    </CustomSafeAreaView>
  );
}
