import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';



export const AppTabNavigator = createBottomTabNavigator({
  HomeScreen : {
    screen: HomeScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/home-icon.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Home",
    }
  },
 
 
 
});
