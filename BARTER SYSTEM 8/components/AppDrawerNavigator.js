import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';
import ChatScreen  from '../screens/ChatScreen';
import NotificationScreen  from '../screens/NotificationsScreen';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator
    },


  NotificationsScreen : {
    screen : NotificationScreen
  },
  ChatScreen : {
    screen : ChatScreen
  }


},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
