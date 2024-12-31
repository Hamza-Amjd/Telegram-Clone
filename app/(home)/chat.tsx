import {Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { chatStyles } from '@/styles/chatStyles'
import ChatHeader from '@/components/chat/ChatHeader'
import Chat from '@/components/chat/Chat'
import SendButton from '@/components/chat/SendButton'
import { usePaginatedChats } from '@/services/api/chatService'
import { useChatStore } from '@/services/chatStore'

const chat = () => {
  const route = useRoute()
  const item:any=route.params;

  const [hieghtofMessageBox, setHieghtofMessageBox] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const { loadMoreChats, loading, hasMoreChats } = usePaginatedChats(item?.conversation_id);
  const {conversations} = useChatStore();
  const currentChat = conversations.find((c:any) => c.conversationId === item?.conversation_id);

  useEffect(() =>{
    if(!loading && hasMoreChats){
      loadMoreChats();
    }
  },[])

  return (
    <View style={chatStyles.container}>
      <ChatHeader item={item}/>
      <Image source={require('@/assets/images/pattern.png')} style={chatStyles.background}/>
      <Chat
      heightOfMessageBox={hieghtofMessageBox}
      loading={loading}
      messages={currentChat?.messages || []}
      onLoadMore={()=>!loading && hasMoreChats && loadMoreChats}
      />
      <SendButton
      setHeightOfMessageBox={setHieghtofMessageBox}
      isTyping={isTyping}
      setIsTyping={setIsTyping}
      item={item}
      />
    </View>
  )
}

export default chat