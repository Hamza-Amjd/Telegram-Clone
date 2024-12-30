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
