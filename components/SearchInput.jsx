import { TextInput, TouchableOpacity, View , Image, Alert} from 'react-native'
import React  , {useState} from 'react'
import { usePathname , router } from 'expo-router'


import icons from '../constants/icons'

const SearchInput = ({initialQuery}) => {
  
const pathname = usePathname();
const [query, setQuery] = useState(initialQuery || '')

    return (
      
      <View className='flex-row border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center space-x-4'>
       
       <TextInput
            className='text-base mt-0.5 text-white flex-1 font-pregular'
            value={query}
            placeholder='Search for a video Topic'
            placeholderTextColor="#CDCDE0"
            onChangeText={(e)=>setQuery(e)}
       />


      <TouchableOpacity
        onPress={()=>{
        if(!query){
          return Alert.alert('Missing Query',"Please input something to search results across database")
        }
        if(pathname.startsWith('/search')) 
          router.setParams({query})
        else router.push(`/search/${query}`)
      }}>
        <Image 
          source={icons.search}
          className='w-5 h-5'
          resizeMode='contain'
        />
      </TouchableOpacity>

      </View>
  )
}

export default SearchInput

