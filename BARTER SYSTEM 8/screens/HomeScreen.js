import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';


export default class HomeScreen extends Component{
  
  constructor(){
    super()
    this.state = {
      requestedItemsList : [],
      userId : firebase.auth().currentUser.email,
    }
  this.requestRef= null
  }

  getRequestedItemsList =()=>{
    
    this.requestRef = db.collection("users")
    .onSnapshot((snapshot)=>{
      var requestedItemsList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedItemsList : requestedItemsList,
       
      });
       console.log(requestedItemsList);
    })
   
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest =(item_name,item_description)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()

    db.collection('cart').add({
        "user_id": userId,
        "item_name":item_name,
        "item_description":item_description,
        
    })
  }

  componentDidMount(){
   
    this.getRequestedItemsList()
    
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    
    return (
      <ListItem
        key={i}
        title={item.first_name}
        subtitle={item.email_id}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        
        rightElement={
            <TouchableOpacity style={styles.button}
             onPress = {() => {
                this.props.navigation.navigate('ChatScreen', { friend_id: item.email_id })
              }}>
              <Text style={{color:'#ffff'}}>Chat </Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Chit Chat" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            
            this.state.requestedItemsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Friends </Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedItemsList}
                renderItem={this.renderItem}
              />
            )
            
          }
  
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#008B8B",
  }
})
