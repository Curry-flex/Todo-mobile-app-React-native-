import React, { useEffect } from 'react'
import { StyleSheet, View,Image, Text } from 'react-native'
import PushNotification from "react-native-push-notification";

const Splash = ({navigation}) => {
  
    useEffect(()=>{
        createChannles()
    },[])

    useEffect(()=>{
     
        setTimeout(()=>{
          navigation.navigate("Task-home")
        },2000)
    },[])

    const createChannles=()=>{
        PushNotification.createChannel({
            channelId:"task-channel",
            channelName:"task channel"
        })
    }
  return (
    
    <View style={styles.body}>
     <Image
     style={styles.logo}
      source={require('../assets/splash.jpeg')}
     />

     <Text style={styles.text}>CurryFlex Todo</Text>
    </View>
  )
}

const styles=StyleSheet.create({
    body:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white",
    },

    logo:{
        width:150,
        height:150,
        margin:20
    },

    text:{
        fontSize:30,
        marginBottom:20,
        color:"blue",
        fontWeight:"700"
    }
})

export default Splash