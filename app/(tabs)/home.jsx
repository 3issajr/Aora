import  {FlatList, Image, RefreshControl, Text, View } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import React, { useState } from 'react'

import {images} from '../../constants'

import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'

import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'

import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {
   
  const {user , setUser , setIsLoggedIn} = useGlobalContext()
  const {data : posts , refetch} = useAppWrite(getAllPosts) // Related to Normal Video
  const {data : latestPosts } = useAppWrite(getLatestPosts) // Related to Trending Videos
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false)
  }

  
  return (

    <SafeAreaView className='bg-primary h-full'>

      <FlatList 
        data={posts}
        keyExtractor={( item ) => item.$id}
        renderItem={ ({ item }) => ( <VideoCard video={item}/> ) }

      ListHeaderComponent={()=>(
        <View className='my-6 px-4 space-y-6'>

          <View className='justify-between items-start flex-row mb-6'>

            <View>
              <Text className='font-pmedium text-sm text-gray-100'>Welcome Back,</Text>
              <Text className='text-2xl font-psemibold text-white'>{user?.username}</Text>
            </View>

            <View className='mt-1.5'>
              <Image
               source = {images.logoSmall} 
               className='w-9 h-10'
               resizeMode='contain'>
              </Image>
            </View>

          </View>

          <SearchInput/>

          <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg text-pregular mb-3'> Latest Videos </Text>
              <Trending posts={latestPosts ?? []}/>
          </View>

        </View>
      )}

      ListEmptyComponent={()=>(
        <EmptyState title='No Videos Found' subtitle='Be the fiest one to upload a video'/>
      )}

      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      
      />
    </SafeAreaView>
  )
}

export default Home

// ListHeaderComponent rendered at the top of all items
// Flastlist show the data in list
// ?? Means that if doesn't exit make empty array 