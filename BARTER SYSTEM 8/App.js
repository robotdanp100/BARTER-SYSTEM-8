import React from 'react';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import ChatScreen from './screens/ChatScreen';
import { AppDrawerNavigator } from './components/AppDrawerNavigator'


export default function App() {
  return (
    <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  ChatScreen:{screen: ChatScreen},
  Drawer:{screen: AppDrawerNavigator}
})

const AppContainer =  createAppContainer(switchNavigator);