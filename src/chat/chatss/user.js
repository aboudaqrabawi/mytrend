import  {View,Text, TextInput, Button} from 'react-native'
import React ,{useState} from 'react';
import {SignUp} from '../firebase/signup'
import Firebase from '../firebase/firebaseConfig'
import {AddUser} from '../firebase/users'
function user(props) {
    const [state,setState] = useState({email:'', password:'', name:'',

})
const signupFirebase = async ()=>{
     SignUp(state.email,state.password).then((res)=>{
      
        var userUID = Firebase.auth().currentUser.uid
        AddUser(state.name,state.email,userUID).then((res)=>{

            
        })
  
    })
}

    return (
       <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
           <TextInput placeholder ='enter name' 
           onChangeText={(text)=> setState({...state, name:text})}/>
         <TextInput placeholder ='enter email' 
           onChangeText={(text)=> setState({...state, email:text})}/>
            <TextInput placeholder ='enter password' 
           onChangeText={(text)=> setState({...state, password:text})}/>
           <Button title='sign up'
           onPress={()=> {signupFirebase()}} />

          
       </View>
    );
}

export default user;