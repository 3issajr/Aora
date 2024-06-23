import  {FlatList, Text, View } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'


import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'

import {  searchPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'

const Search = () => {
  const {query} = useLocalSearchParams()
  const {data : posts , refetch} = useAppWrite (
    ()=>searchPosts(query)
  ) 


  useEffect(()=>{refetch()},[query])
  
  return (
    <SafeAreaView className='bg-primary h-full'>

      <FlatList 
       data={posts}
       keyExtractor={(item)=>item.$id}
       renderItem={({item}) => (
       <VideoCard video={item}/>
      )}

      ListHeaderComponent={()=>(
        <View className='my-6 px-4 '>

           <Text className='font-pmedium text-sm text-gray-100'>Search Results</Text>
           <Text className='text-2xl font-psemibold text-white'>{query}</Text>
           
           <View className='mt-6 mb-8'>
            <SearchInput initialQuery={query}/>
           </View>

        </View>
      )}

      ListEmptyComponent={()=>(
        <EmptyState title='No Videos Found' subtitle='No Videos Found for this Search Query'/>
      )}
       
      />
    </SafeAreaView>
  )
}

export default Search

// ListHeaderComponent rendered at the top of all items
// Flastlist show the data in list
// ?? Means that if doesn't exit make empty array 