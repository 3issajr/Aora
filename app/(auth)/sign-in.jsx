import { Image, ScrollView, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Link , router} from 'expo-router'


import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { signIn } from '../../lib/appwrite'

const SignIn = () => {

  const [isSubmitting, setisSubmitting] = useState(false)
  const [form, setForm] = useState({
    email : '',
    password : ''
  })


  const submit = async () => {
    if(!form.email || !form.password){
      Alert.alert('Error','Please Fill in All the Fields')
    }
    setisSubmitting(true)
    try {
      await signIn(form.email , form.password);
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error',error.message)
    } finally {
      setisSubmitting(false)
    }
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
          
            <Image 
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
            />
            
            <Text className='text-2xl text-white text-semibold mt-10 font-psemibold '>Log in to Aora</Text>

            <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e)=>setForm({...form,email:e})}
            otherStyles="mt-7"
            keyboardType = "email-address"/> 
            {/*  used for Autofilling information */}
            {/* the {...form,email:e} means we destructure the form to get variable from it */}
           
            <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e)=>setForm({...form,password:e})}
            otherStyles="mt-7"/>

            <CustomButton
            title = 'Sign In'
            handlePress = {submit}
            containerStyles ="mt-7"
            isLoading = {isSubmitting}/>

            <View className='justify-center pt-5 flex-row gap-2'>
              <Text className='text-lg text-gray-100 font-pregular'>
               Don't Have an Account
              </Text>
              <Link href='/sign-up' className='text-lg font-psemibold text-secondary'>Sign Up</Link>
            </View>
        
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
