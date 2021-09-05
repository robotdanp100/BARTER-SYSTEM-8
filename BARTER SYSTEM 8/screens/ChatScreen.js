import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Icon,
  Header
  } from 'react-native';
import { ListItem } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class ChatScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      feedback_text:"",
      allRequests : [],
      friend_id :" ",
    }
   
  }

 

 getAllRequests =()=>{
    this.requestRef = db.collection("messages")
    var friend = this.props.navigation.getParam('friend_id')
     console.log("friend "+friend);
    console.log("state"+this.state.friend_id);
    if(friend){
      this.setState({friend_id:friend})
      console.log("friend "+friend);
      console.log("state"+this.state.friend_id);
      db.collection('messages').where('friend_id','==',friend).get()
          .then(snapshot=>{
            var allRequests = [];
            snapshot.forEach(doc => {
                allRequests.push(doc.data())
          })
          this.setState({allRequests:allRequests})
        })
    }

 }



  sendNotification(){

    var userId = this.state.userId
    var friend_id = this.state.friend_id
    var message = "Your friend " + userId + " has sent you a message"
         db.collection("all_notifications").add({
           "message": message,
           "user_id":userId,
           "friend_id":friend_id,
           "notification_status" : "unread",
           "date"                : firebase.firestore.FieldValue.serverTimestamp()
         })
  }

 createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

  addRequest =(feedback_text)=>{
    var userId = this.state.userId
    var friend_id = this.state.friend_id
    var randomRequestId = this.createUniqueId()
    db.collection('messages').add({
        "user_id": userId,
        "feedback_text":feedback_text,
        "friend_id": friend_id
    })

    this.setState({
        feedback_text : '',
        friend_id:friend_id
    })
    this.getAllRequests()
    this.sendNotification();
    return Alert.alert("Message Sent Successfully");
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
  
    return (
      <ListItem
        key={i}
        title={item.feedback_text}
        titleStyle={{ color: 'black', fontSize:20, }}
        bottomDivider
      />
    )
  }

 

componentDidMount(){
  
    this.getAllRequests() 
  }

  render(){
    return(
      
        <View style={{flex:1}}>
      
          
          <MyHeader title="Chat" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
             <View style={{flex:1}}>
          {
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allRequests}
                renderItem={this.renderItem}
              />
          }
        </View>
                <TextInput
                style ={styles.formTextInput}
                placeholder={"Write here.."}
                onChangeText={(text)=>{
                    this.setState({
                        feedback_text:text,
                        friend_id:this.props.navigation.getParam('friend_id'),
                    })
                }}
                value={this.state.feedback_text}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{
                  this.addRequest(this.state.feedback_text)}}
                >
                <Text>Send Message</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>         
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#008B8B',
    borderRadius:10,
    borderWidth:1,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#008B8B",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
    
  }
)
