import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setTasks,setTaskID } from '../redux/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CheckBox } from 'react-native-elements'
import { Checkbox } from 'react-native-paper'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import PushNotification from "react-native-push-notification";
import taskReducer from '../redux/reducers'

export default function Task({navigation,route}) {
    
    const update = route.params.update
    const[updateTask,setUpdate] =useState(update)
    const[title,setTitle] =useState('')
    const[desc,setDesc] =useState('')
    const[done,setDone] =useState(false)
    const[modal,setModal] =useState(false)
    const[bellTime,setBellTime] =useState('1')
    const {task,taskID} =useSelector(state=>state.taskReducer)
    const dispatch =useDispatch()

     useEffect(()=>{
         getTask()
     },[])
     
     const getTask=()=>{
      const tasks =task.find(task=>task.ID === taskID)
      if(tasks){
          setTitle(tasks.Title)
          setDesc(tasks.Description)
          setDone(tasks.Done)
      }
     }

    const setTask=()=>{
        if(title.length == 0){
            Alert.alert("Error","enter title")
        }
        else{

            try {
                var Task = {
                    ID:taskID,
                    Title:title,
                    Description:desc,
                    Done:done
                }
    
                //let newTask =[...task,Task]
                const index =task.findIndex(task =>task.ID ===taskID)
                let newTask=[]
                if(index > -1)
                {
                     newTask=[...task]
                     newTask[index] =Task
                     Alert.alert("update","task updated successfully")
                }
                else{
                    newTask=[...task,Task]
                }
                AsyncStorage.setItem("task",JSON.stringify(newTask))
                           .then(()=>{
                               dispatch(setTasks(newTask))
                               Alert.alert("success","task added successfully")
                               navigation.navigate('Task-home', {done:true})
                           })
            } catch (error) {
               console.log(error) 
            }

        }
       
    }

    const setNotification =()=>{
    PushNotification.localNotificationSchedule({
        channelId:"task-channel",
        title:title,
        message:desc,
        date:new Date(Date.now() + parseInt(bellTime) *60*1000),
        allowWhileIdle:false

    })
    }
  return (
    <View style={styles.body}>
     <Modal
      visible={modal}
      transparent
      onRequestClose={()=>setModal(false)}
      animationType="slide"
     >
         <View style={styles.center_modal}>
             <View style={styles.bell_modal}>
               
               <View style={styles.bell_body}>
                <Text style={{color:"black",fontSize:20,fontWeight:"400"}}>Remind me after</Text>
                 <TextInput 
                 style={styles.bell_input}
                 keyboardType="numeric"
                 value={bellTime}
                 onChangeText={(value)=>setBellTime(value)}
                 />
                 <Text  style={{color:"black",fontSize:20,fontWeight:"400"}}>minutes</Text>
               </View>

               
               <View style={styles.bell_buttons}>

                   <TouchableOpacity
                   style={styles.cancel_button}
                   onPress={()=>setModal(false)}
                   >
                    <Text  style={{color:"black",fontSize:20,fontWeight:"400"}}>Cancel</Text>
                   </TouchableOpacity>

                   <TouchableOpacity
                   style={styles.ok_button}
                   onPress={()=>{
                       setModal(false);
                       setNotification()
                   }}
                   >
                    <Text  style={{color:"black",fontSize:20,fontWeight:"400"}}>ok</Text>
                   </TouchableOpacity>

               </View>

             </View>

         </View>

      </Modal>   
      <TextInput 
        value={title}
       style={styles.input}
       placeholder="Enter title"
       placeholderTextColor={"black"}
       onChangeText={(value)=>setTitle(value)}
      />

     <TextInput
       value={desc} 
       style={styles.input}
       placeholder="Enter Description"
       placeholderTextColor={"black"}
       multiline
       onChangeText={(value) =>setDesc(value)}
      />
          <View style={styles.CheckBox}>
          
           <CheckBox
           checked={done}
            value={done}
           onPress={()=>setDone(!done)}
          />
        
          
          <Text style={{fontSize:20,color:"black",margin:0}}>Is done</Text>
          </View>

         <View style={styles.reminder}>
          <TouchableOpacity
          style={styles.remindButton}
          onPress={()=>setModal(true)}
          >
              <FontAwesome5
              name={"bell"}
              size={20}
              color={"#fff"}
              />

          </TouchableOpacity>
      </View>   
      
      <View style={styles.reminder}>
          <TouchableOpacity
            style={styles.remindButton}
            onPress={setTask}
          >
              <Text style={{fontSize:20,fontWeight:"bold"}}>{updateTask ? "update task" : "save task"}</Text>
          </TouchableOpacity>
          
      </View>

    

    </View>
  )
}

const styles = StyleSheet.create({
  body: {
      flex: 1,
      alignItems:"center",
      padding:10
  },
  input: {
      width:"100%",
      borderWidth:1,
      backgroundColor:"white",
      borderRadius:10,
      color:"black",
      fontSize:20,
     
      padding:10,
      margin:10
  },

  button: {
      width:"100%",
     borderRadius:10
  },

  CheckBox:{
      flexDirection:"row",
      alignItems:"center",
      margin:5
  },

  reminder:{
      flexDirection:"row",
      marginVertical:10
  },

  remindButton:{
      flex:1,
      height:50,
      backgroundColor:"#0080ff",
      borderRadius:10,
      marginHorizontal:5,
      justifyContent:"center",
      alignItems:"center"
  },
  center_modal:{
      flex:1,
      backgroundColor:"#00000099",
      justifyContent:"center",
      alignItems:"center"
  },
  bell_modal:{
      width:300,
      height:200,
      backgroundColor:"#ffffff",
      borderRadius:20,
      borderWidth:1,
      borderColor:"#000000"

  },
  bell_body:{
      height:150,
      justifyContent:"center",
      alignItems:"center"
  },
  bell_buttons:{
      flexDirection:"row",
      height:50
  },

  bell_input:{
      width:50,
      borderWidth:1,
      borderColor:"#555555",
      borderRadius:10,
      backgroundColor:"#ffffff",
      textAlign:"center",
      fontSize:20,
      margin:10,
      color:"black"

  },
  cancel_button:{
      flex:1,
      borderWidth:1,
      borderColor:"#000000",
      borderBottomLeftRadius:20,
      justifyContent:"center",
      alignItems:"center",

  },

  ok_button:{
    flex:1,
    borderWidth:1,
    borderColor:"#000000",
    borderBottomRightRadius:20,
    justifyContent:"center",
    alignItems:"center",

}
})