import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserItem from '@/components/search/UserItem'
import { addFriend, searchUsers, unFriend } from '@/services/api/userService'
import { getAllConversations } from '@/services/api/chatService'
import { searchStyles } from '@/styles/searchStyles'
import SearchBar from '@/components/search/SearchBar'
import { FlatList } from 'react-native-gesture-handler'

const search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchData, setSearchData] = useState([])

  const searchUser = async () => {
    const response = await searchUsers(searchQuery);
    setSearchData(response);
  }
  useEffect(() => {
    if(searchQuery.length > 3){
      searchUser();
    }
  }, [searchQuery])

  useEffect(()=>{
    getAllConversations()
  },[]);
  
  const renderUsers=({item}:any) => {
    return <UserItem
    item={item}
    onSendRequests={async()=>{
      await addFriend(item?.id);
      searchUser()
    }}
    onUnfriend={async()=>{
      await unFriend(item?.id);
      searchUser()
    }}
    />
  }
  return (
    <View style={searchStyles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} title='Search'/>
      <FlatList
      data={searchData}
      renderItem={renderUsers}
      keyExtractor={(item:any) => item.id}
      contentContainerStyle={searchStyles.scrollContainer}
      />
    </View>
  )
}

export default search