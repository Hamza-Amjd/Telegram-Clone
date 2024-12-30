import { useState } from "react";
import { useChatStore } from "../chatStore";
import { appAxios } from "./apiIntercepters";
export const getAllConversations = async () => {
  try {
    const apiRes = await appAxios.get("/chat");
    const { setConversations } = useChatStore.getState();
    setConversations(apiRes.data);
  } catch (error) {
    console.log("Get All Conversations", error);
  }
};
