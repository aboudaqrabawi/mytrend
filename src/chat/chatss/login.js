import  {View,Text, TextInput, Button} from 'react-native'
import React ,{useState} from 'react';
import {loginUser} from '../firebase/loginuser'
import Firebase from '../firebase/firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';


function login(props) {
    const [state,setState] = useState({email:'', password:'',

})
const loginfirebase = async ()=>{
        loginUser(state.email,state.password).then((res)=>{
            const uid = Firebase.auth().currentUser.uid
      AsyncStorage.setItem('UID',uid)
            props.navigation.navigate('Dashboard')
        }).catch((err)=>{
            alert(err)
        })
}


    return (
       <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
         
         <TextInput placeholder ='enter email' 
           onChangeText={(text)=> setState({...state, email:text})}/>
            <TextInput placeholder ='enter password' 
           onChangeText={(text)=> setState({...state, password:text})}/>
           <Button title='sign in'
           onPress={()=> {loginfirebase()}} />

          
       </View>
    );
}

export default login;