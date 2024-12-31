import { View, Text, TouchableOpacity, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import UserItem from "@/components/search/UserItem";
import { connectedFriends, unFriend } from "@/services/api/userService";
import { getAllConversations } from "@/services/api/chatService";
import { friendStyles } from "@/styles/friendStyles";
import { searchStyles } from "@/styles/searchStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/ui/CustomText";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList, gestureHandlerRootHOC } from "react-native-gesture-handler";

const contacts = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userData, setUserData] = useState([]);

  const renderUser = ({ item }: any) => {
    return (
      <UserItem
        item={item}
        onUnfriend={async () => {
          await unFriend(item.id);
          fetchConnections();
          await getAllConversations();
        }}
      />
    );
  };
  const fetchConnections = async () => {
    const data = await connectedFriends();
    const updatedConnections = data.map((user: any) => {
      return {
        ...user,
        key: user?.full_name?.charAt(0).toLowerCase() as CharType,
        is_connected: true,
      };
    });
    setUserData(updatedConnections);
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  const refreshHandler = async () => {
    setIsRefreshing(true);
    await fetchConnections();
    setIsRefreshing(false);
  };
  return (
    <View style={friendStyles.container}>
      <View style={searchStyles.titleContainer}>
        <SafeAreaView />
        <View style={searchStyles.flexRowGap2}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons
              name="arrow-back-outline"
              style={searchStyles?.icon}
              color={"#fff"}
              size={RFValue(25)}
            />
          </TouchableOpacity>
          <CustomText variant="h4" style={searchStyles.name}>
            Contacts
          </CustomText>
        </View>
      </View>
      <FlatList
        data={userData}
        renderItem={renderUser}
        keyExtractor={(item: any) => item?.id}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshHandler}
          />
        }
        ListEmptyComponent={
          <CustomText>Noone there! Find some friends.</CustomText>
        }
      />
    </View>
  );
};

export default gestureHandlerRootHOC(contacts);
