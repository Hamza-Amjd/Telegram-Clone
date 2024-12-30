import { tokenStorage } from "@/services/storage";
import { splashStyles } from "@/styles/splashStyles";
import { resetAndNavigate } from "@/utils/LibraryHelpers";
import { jwtDecode } from "jwt-decode";
import { Alert, Image, View } from "react-native";
import { useEffect } from "react";
import { refresh_tokens } from "@/services/api/apiIntercepters";

interface DecodedToken {
  exp: number;
}
export default function Index() {
  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString("accessToken") as string;
    const refreshToken = tokenStorage.getString("refreshToken") as string;
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      const currentTime = Date.now() / 1000;
      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate("/(auth)/signin");
        Alert.alert("Session Expired, please login again");
        return false;
      }
      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_tokens()
          } catch (error) {
          console.log(error)
          Alert.alert("There was an error")
          return false
          }
      }
      resetAndNavigate("/(home)/home");
      return true;
    }
    resetAndNavigate("/(auth)/signin");
    return false;
  };

  useEffect(() => {
    const timeoutId=setTimeout(tokenCheck, 1000);
    return () => clearTimeout(timeoutId); 
  }, []);

  return (
    <View style={splashStyles.container}>
      <Image
        style={splashStyles.logo}
        source={require("@/assets/images/adaptive-icon.png")}
      />
    </View>
  );
}
