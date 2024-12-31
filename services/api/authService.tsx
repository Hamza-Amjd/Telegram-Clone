import axios from "axios";
import { BASE_URL } from "../config";
import { tokenStorage } from "../storage";
import { useAuthStore } from "../authStore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { resetAndNavigate } from "@/utils/LibraryHelpers";
import { appAxios } from "./apiIntercepters";
import { useChatStore } from "../chatStore";
import { useUserStore } from "../userStore";

GoogleSignin.configure({
  webClientId:
    "126720712499-fv5d4dvinjbqgbcg0rvqbsqs0n3ohj76.apps.googleusercontent.com",
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId: "",
});

export const sigInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const res = await GoogleSignin.signIn();
    const apiRes = await axios.post(`${BASE_URL}/oauth/login`, {
      id_token: res.data?.idToken,
    });
    const { tokens, user } = apiRes.data;
    tokenStorage.set("accessToken", tokens?.access_token);
    tokenStorage.set("refreshToken", tokens?.refresh_token);
    const { setUser } = useAuthStore.getState();
    setUser(user);
    resetAndNavigate("/(home)/home");
  } catch (error: any) {
    console.log(error.response.status);
    if (error.response.status == 400) {
      resetAndNavigate("/(auth)/signup");
    }
  }
};

export const signUpWithGoogle = async (data: any) => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const res = await GoogleSignin.signIn();
    const apiRes = await axios.post(`${BASE_URL}/oauth/login`, {
      id_token: res.data?.idToken,
      ...data,
    });
    const { tokens, user } = apiRes.data;
    tokenStorage.set("accessToken", tokens?.access_token);
    tokenStorage.set("refreshToken", tokens?.refresh_token);
    const { setUser } = useAuthStore.getState();
    setUser(user);
    resetAndNavigate("/(home)/home");
  } catch (error: any) {
    console.log("SignUP Error", error.response.status);
  }
};
export const checkUsername = async (username: string) => {
  try {
    const apiRes = await axios.post(`${BASE_URL}/oauth/check-username`, {
      username,
    });
    return apiRes.data?.available;
  } catch (error) {
    console.log("checkUsername", error);
    return false;
  }
};

export const registerDeviceToken = async (device_token: string) => {
  const { deviceTokenAdded, setDeviceTokenStatus } = useAuthStore.getState();
  if (deviceTokenAdded) {
    return;
  }
  try {
    const apiRes = await appAxios.post("/device-token/register", {
      device_token,
    });
    setDeviceTokenStatus(true);
    console.log("ADDED DEVICE TOKEN");
  } catch (error:any) {
    setDeviceTokenStatus(false);
    console.log("Device Token", error.message);
  }
};

export const logoutFromApp = async (device_token: string) => {
  try {
    const apiRes = await appAxios.post("/device-token/remove", {
      device_token,
    });
    const { logout } = useAuthStore.getState();
    const { clearAllChats } = useChatStore.getState();
    const { clearUserStore } = useUserStore.getState();
    logout();
    clearUserStore();
    clearAllChats();
    tokenStorage.clearAll();
    resetAndNavigate("/(auth)/signin");
    console.log("REMOVED DEVICE TOKEN");
  } catch (error) {
    console.log("Logout", error);
  }
};
