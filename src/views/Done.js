import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { setTasks,setTaskID } from '../redux/action'
import AsyncStorage from '@react-native-async-storage/async-storage'



const Done = () => {

    const{task} =useSelector((state)=>state.taskReducer)
    const dispatch =useDispatch()
    const doneTask =task.filter(task => task.Done ===true)
    console.log(doneTask)

    const deleteTask =(id)=>{
        const filteredTask = task.filter(task => task.ID !== id)

        AsyncStorage.setItem("task",JSON.stringify(filteredTask))
                           .then(()=>{
                               dispatch(setTasks(filteredTask))
                               Alert.alert("delete","task deleted successfully")
                           })
                           .catch(err=>console.log(err))

}

  return (
    
    <View>
      <FlatList 
      data={doneTask}

      renderItem={({item})=>(
        <TouchableOpacity
        style={styles.item}
        >
           <View style={styles.item_row}>
             
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
      />
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

export default Done