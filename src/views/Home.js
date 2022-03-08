import React, { useEffect,useState } from 'react'
import {  FlatList, StyleSheet, TouchableOpacity, View,Text, Alert } from 'react-native'
import { white } from 'react-native-paper/lib/typescript/styles/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useDispatch, useSelector } from 'react-redux'
import { setTasks,setTaskID } from '../redux/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CheckBox } from 'react-native-elements'

const Home = ({navigation,route}) => {
   // console.log(route.params.done)
    const[done,setDone] =useState()
    const{task} =useSelector((state)=>state.taskReducer)
    const dispatch =useDispatch()

    useEffect(()=>{
        getTask()
    },[])

    const getTask=()=>{
         AsyncStorage.getItem("task")
                 .then(task =>{
                     let object= JSON.parse(task)
                     if(object && typeof object ==="object")
                     {
                      dispatch(setTasks(object))
                     }
                 })
                 .catch(err =>console.log(err))
    }

    const deleteTask =(id)=>{
            const filteredTask = task.filter(task => task.ID !== id)

            AsyncStorage.setItem("task",JSON.stringify(filteredTask))
                               .then(()=>{
                                   dispatch(setTasks(filteredTask))
                                   Alert.alert("delete","task deleted successfully")
                               })
                               .catch(err=>console.log(err))

    }

    const  checkTask =(id,newValue)=>{
        const index =task.findIndex(task =>task.ID === id)
        if(index > -1){
            let newTask=[...task]
            newTask[index]=newValue;
            AsyncStorage.setItem("task",JSON.stringify(newTask))
                then(()=>{
                    dispatch(setTasks(newTask))
                    Alert.alert("success","task state is changed")
                }).catch(err =>console.log(err))
        }
    }
  return (
    
    <View style={styles.body}>
        <FlatList
         data={task}
         renderItem={({item})=>(
             <TouchableOpacity
             style={styles.item}
             onPress={()=>{
                 dispatch(setTaskID(item.ID));
                 navigation.navigate("task",{update:true})
             }}
             >
                <View style={styles.item_row}>
                    <CheckBox 
                     checked={item.Done}
                     onPress={()=>setDone(!item.Done)}
                    />
                 <View style={styles.item_body}>
                 <Text style={styles.title}>
                     {
                         item.Title
                     }
                 </Text>

                 <Text style={styles.desc}>
                     {
                         item.Description
                     }
                 </Text>
                 </View>

                 <TouchableOpacity
                  style={styles.delete}
                  onPress={()=>deleteTask(item.ID)}
                 >
                     <FontAwesome5 
                       name={"trash"}
                       size={20}
                       color={"red"}
                     />
                 </TouchableOpacity>

                </View>
             </TouchableOpacity>
         )}
         keyExtractor={(item,index) => index.toString()}
        />
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{
        dispatch(setTaskID(task.length + 3))
          navigation.navigate('task',{update:false});
         
      }}
      >
          <FontAwesome5 
          name={'plus'}
          color={"white"}
          size={20}
          />
      </TouchableOpacity>
    </View>
  )
}

const styles =StyleSheet.create({
     button:{
         width:60,
         height:60,
         borderRadius:70,
         backgroundColor:"blue",
         alignItems:"center",
         justifyContent:"center",
         position:"absolute",
         bottom:10,
         right:10
         
     },

     body:{
         flex:1
     },
     item:{
         marginHorizontal:10,
         marginVertical:7,
         paddingHorizontal:10,
         backgroundColor:"#ffff",
         justifyContent:"center",
         borderRadius:10,
         elevation:5
     },
     title:{
         color:'#000000',
         fontSize:25,
         margin:5,
         fontWeight:"bold"
     },
     desc:{

        color:'#999999',
        fontSize:20,
        margin:5
     },
     item_row:{
         flexDirection:"row",
         alignItems:"center"
     },

     item_body:{
         flex:1
     },

     delete:{
         width:50,
         height:50,
         alignItems:"center",
         justifyContent:"center",
     }
})

export default Home