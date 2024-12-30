import { View, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useEffect } from 'react'
import { homeStyles } from '@/styles/homeStyles'
import CustomText from '../ui/CustomText'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { router } from 'expo-router'
import { useUserStore } from '@/services/userStore'
import { getAllFriendRequests } from '@/services/api/userService'
import { useAuthStore } from '@/services/authStore'

const HomeHeader = () => {
    const auth=useAuthStore();
    const { requests } = useUserStore()



    const fetchIncomingRequests = async () => {
        await getAllFriendRequests()
    }

    useEffect(() => {
        fetchIncomingRequests()
    }, [])

    return (
        <View style={homeStyles.headerContainer}>
            <SafeAreaView />
            <View style={homeStyles.flexRowBetween}>
                <View style={homeStyles.flexRowGap}>
                    <TouchableOpacity onPress={()=>router.navigate('/(home)/profile')} >
                        <Image source={{uri:auth?.user?.profile_picture}} style={{height:30,width:30,borderRadius:30}}/>
                    </TouchableOpacity>
                    <CustomText style={homeStyles.title} variant='h5'>Telegram</CustomText>
                </View>

                <View style={homeStyles.flexRowGap}>
                    <TouchableOpacity onPress={() => router.navigate('/(home)/notification')}>
                        <Ionicons name="notifications" size={RFValue(20)} color="#fff" />
                        {requests?.length > 0 && (
                            <View style={homeStyles.requestDot} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.navigate('/(home)/search')}>
                        <Ionicons name="search" size={RFValue(20)} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default HomeHeader