import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { searchStyles } from "@/styles/searchStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomText from "@/components/ui/CustomText";
import { registerForPushNotificationsAsync } from "@/utils/NotificationHandler";
import { useAuthStore } from "@/services/authStore";
import { logoutFromApp } from "@/services/api/authService";
import { router } from "expo-router";
import { profileStyles } from "@/styles/profileStyles";
import UserAvatar from "@/components/ui/UserAvatar";

const profile = () => {
  const { user } = useAuthStore();
  const logoutHandler = async () => {
    registerForPushNotificationsAsync()
      .then(async (token) => await logoutFromApp(token ?? ""))
      .catch((error: any) =>
        Alert.alert("You need to be connected to internet")
      );
  };
  return (
    <View style={searchStyles.container}>
      <View style={searchStyles.titleContainer}>
        <SafeAreaView />
        <View style={searchStyles.flexRowGap2}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back-outline"
              style={searchStyles.icon}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <CustomText variant="h4" style={searchStyles.name}>
            Profile
          </CustomText>
        </View>
      </View>
      <View style={profileStyles.center}>
        <UserAvatar user={user} size="large" />
        <CustomText variant="h4" style={profileStyles?.name}>
          {user?.full_name}
        </CustomText>
        <CustomText style={profileStyles?.username}>
          @{user?.username}
        </CustomText>
      </View>
      <TouchableOpacity style={profileStyles?.btn} onPress={logoutHandler}>
        <MaterialIcons name="logout" size={24} color="#fff" />
        <CustomText style={profileStyles?.text}>Logout</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default profile;
