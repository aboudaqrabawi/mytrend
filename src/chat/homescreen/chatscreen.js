import  {View,Text, TextInput, Button, TouchableOpacity, FlatList ,Dimensions} from 'react-native'
import React ,{useEffect, useState} from 'react';
import {loginUser} from '../firebase/loginuser'
import Firebase from '../firebase/firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from 'native-base';
import Icons from 'react-native-vector-icons/MaterialIcons'
import {SendMessage, RecieveMessage} from './message'


function chatscreen(props) {
    const [state,setState] = useState({message:'',currentUid:'',
    guestUid:'',

})
const [allMessages,setAllMessages] = useState('')

useEffect(async ()=>{
    const currentUid =  await AsyncStorage.getItem('UID')
    const guestUid = props.navigation.getParam('guestUid')
    setState({...state,guestUid:guestUid,currentUid:currentUid })
    try{
        Firebase.database().ref('messages')
        .child(currentUid)
        .child(guestUid)
        .on("value",(dataSnapshot)=>{
            let message=[]
            dataSnapshot.forEach((data)=>{
          
                message.push({
                    sendBy:data.val().sender,
                    recieveBy:data.val().reciever,
                    msg:data.val().message
                })
         
            })
            setAllMessages(message)
        
        })   

    }
    
    catch{}
},[])


const sendMessage = async () =>{
    if (state.message){
        SendMessage(state.currentUid,state.guestUid,state.message).then(()=>{
            setState({...state, message:''})

        }).catch((err)=>{
            alert (err)
        })

        RecieveMessage(state.currentUid,state.guestUid,state.message).then(()=>{
            setState({...state, message:''})

        }).catch((err)=>{
            alert (err)
        })
    }
}

    return (
       <View style={{flex:1, backgroundColor:'#000'}}>
         <FlatList
         data={allMessages}
         keyExtractor={(index)=> index.toString()}
         renderItem={({ item })=>(
                <View style={{maxWidth:Dimensions.get('window').width/2+10
                ,alignSelf: state.currentUid === item.sendBy ?'flex-start': 'flex-end'
                }}>
                 <View style={{
                    borderRadius:20,
                    backgroundColor: state.currentUid === item.sendBy ?'#fff': '#ccc'}}>
                <Text style={{padding:10,fontSize:16,fontWeight:'bold'}}>
                    {item.msg}
                </Text>

</View>

                    </View>


         )}
         
         />



       <View style={{bottom:0, height:50, width:'100%', position:'absolute',
    flexDirection:'row'}}>
        <View style={{width:'70%',justifyContent:'center'}}>
        <TextInput placeholder='enter message' placeholderTextColor='#000'
        style={{height:40, borderRadius:20, backgroundColor:'#ccc'}}
        onChangeText={(text)=>setState({...state,message:text})}
           />
        </View>
        <TouchableOpacity style={{width:'10%', marginLeft:5, justifyContent:'center',alignItems:'center'}}
        onPress={()=>sendMessage()}
        >
       <Icons name ='send' size= {25} color='#fff'/>
       </TouchableOpacity>
          
       </View>
      
      
          
       </View>
    );
}

export default chatscreen;