import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { launchGallery } from "@/utils/LibraryHelpers";
import CustomSafeAreaView from "@/components/ui/CustomSafeAreaView";
import { signupStyles } from "@/styles/signupStyles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "@/components/ui/CustomText";
import { uploadFile } from "@/services/api/fileService";
import { checkUsername, signUpWithGoogle } from "@/services/api/authService";
import CustomInput from "@/components/ui/CustomInput";

export default function signup() {
  const [firstName, setFirstName] = useState("");
  const [profilePic, setProfilePic] = useState<any>();
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const handleImagePick = async () => {
    const res = await launchGallery();
    if (res) {
      setProfilePic(res);
    }
  };

  const createAccount = async () => {
    if (!username || !firstName || !lastName || !profilePic) {
      Alert.alert("Error", "Please fill all details");
      return;
    }
    setLoading(true);
    try {
      const mediaUrl = await uploadFile(profilePic);
      await signUpWithGoogle({
        username: username,
        first_name: firstName,
        last_name: lastName,
        profile_picture: mediaUrl,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const validateUsername = async (name: string) => {
    if (name.length > 4) {
      const isValid = await checkUsername(name);
      return isValid;
    }
    return false;
  };
  return (
    <CustomSafeAreaView style={signupStyles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={RFValue(24)} color={"#fff"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleImagePick}
        style={signupStyles.cameraIcon}
      >
        {profilePic ? (
          <Image source={profilePic} style={signupStyles.image} />
        ) : (
          <MaterialCommunityIcons
            name="camera-plus"
            size={RFValue(30)}
            color={"#fff"}
          />
        )}
      </TouchableOpacity>
      <CustomText variant="h4" style={signupStyles.profileText}>
        Profile Info
      </CustomText>
      <CustomText style={signupStyles.instructions}>
        Enter your Unique username, name and your profile photo.
      </CustomText>
      <CustomInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        showValidationIcon
        validationFunction={validateUsername}
      />
      <CustomInput
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <CustomInput
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
    <View style={signupStyles.footer}>
        <CustomText style={signupStyles.termsText}>By signing up you agree to terms and conditions.</CustomText>
      <TouchableOpacity
        style={signupStyles.submitButton}
        onPress={createAccount}
        disabled={loading}>
          <Ionicons name="arrow-forward" size={RFValue(25)}/>
        </TouchableOpacity>
          </View>
    </CustomSafeAreaView>
  );
}
