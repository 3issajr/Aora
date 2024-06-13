import  {FlatList, Text, View } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import React from 'react'

const Home = () => {
  return (
    <SafeAreaView>
      <FlatList 
       data={[{ id:1 },{id:2},{id:3}]}
       keyExtractor={(item)=>item.$id}
       renderItem={({item})=>(
          <Text className='text-3xl'>{item.id}</Text>
      )}
      
      />
    </SafeAreaView>
  )
}

export default Home

