import { useUserStore } from "../userStore";
import { appAxios } from "./apiIntercepters";

export const getAllFriendRequests = async () => {
  try {
    const apiRes = await appAxios.get(`/request/list`);
    const { setRequests } = useUserStore.getState();
    setRequests(apiRes.data);
  } catch (error) {
    console.log("Get All Conversations", error);
  }
};
export const searchUsers = async (searchQuery: string) => {
  try {
    const apiRes = await appAxios.get(`/user/search/${searchQuery}`);
    return apiRes.data;
  } catch (error) {
    console.log("Get All Conversations", error);
    return [];
  }
};

export const addFriend = async (receiverId: string) => {
  try {
    const apiRes = await appAxios.post("/request/send", {
      receiverId: receiverId,
    });
  } catch (error) {
    console.log("Add Friend", error);
    throw error;
  }
};

export const unFriend = async (friendId: string) => {
  try {
    const apiRes = await appAxios.post("/request/unfriend", {
      friendId,
    });
  } catch (error) {}
};

export const connectedFriends = async () => {
  try {
    const apiRes = await appAxios.get("/user/connected");
    return apiRes.data;
  } catch (error) {
    console.log("connected Friends", error);
    return [];
  }
};
export const onHandleRequest = async (
  requestId: string,
  action: "ACCEPT" | "REJECT"
) => {
  try {
    const apiRes = await appAxios.post("/request/handle", {
      requestId,
      action,
    });
  } catch (error) {
    console.log("Remove Friend", error);
    throw error;
  }
};
