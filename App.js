/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { AsyncStorage, LogBox } from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
 import { createDrawerNavigator } from '@react-navigation/drawer';
//import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import React,{useState,useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage1 from '@react-native-async-storage/async-storage'
import PushNotification from "react-native-push-notification";
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Button,
  Modal,
  Platform,
  Linking,
  RefreshControl,
  FlatList,
  TextInput,
  Pressable,
  Image

} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import fav from './fav.jpeg'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Home from './src/views/Home';
import Splash from './src/views/Splash';
import Done from './src/views/Done';
import Task from './src/views/Task';




const Tab = createBottomTabNavigator()


const App = () => {
  const HomeTab=()=>{
    return(
      <Tab.Navigator
      screenOptions={({route})=>({
        tabBarIcon:({focused,size,color})=>{
          let iconName;

          if(route.name === "home")
          {
            iconName="clipboard-list"
            size=focused ? 25 :20
          }
          else if(route.name === "done")
          {
            iconName="clipboard-check"
            size=focused ? 25 :20
          }

          return(
            <FontAwesome5 
            name={iconName}
            size={size}
            color="blue"
            />
          )
        }
      })}

      tabBarOptions={{
        activeTintColor:'#0080ff',
        inactiveTintColor:'#777777',
        labelStyle:{
          fontSize:15,
          fontWeight:"bold"
        }
      }}
      >
        <Tab.Screen 
          name="home"
          component={Home}
        />

        <Tab.Screen 
        name="done"
        component={Done}
        />
      </Tab.Navigator>
    )
  }

  const Stack = createStackNavigator()
  return (
  
    <Provider store={Store}>
          <NavigationContainer>
      <Stack.Navigator
      initialRouteName='splash'
      >
       
        <Stack.Screen 
        options={{
          header:()=>null
        }}
        name="splash"
        component={Splash}
        />

        <Stack.Screen 

        name="Task-home"
        component={HomeTab}
        />

       <Stack.Screen 
        name="task"
        component={Task}
        />
      </Stack.Navigator>
    </NavigationContainer>

    </Provider>
     
  )
}

export default App

