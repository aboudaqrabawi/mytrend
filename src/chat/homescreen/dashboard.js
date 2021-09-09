import React, { useState, useEffect } from 'react';
import {View,Text, FlatList, TouchableOpacity ,StyleSheet,  Image } from 'react-native'
import Firebase from '../firebase/firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
function dashboard(props) {
    const [allUsers,setAllUsers] = useState([])

useEffect(async ()=>{
    try {
        await Firebase.database().ref('users').on('value',async (datasnapshot)=>{
            const uuid =  await AsyncStorage.getItem('UID')
          
            let users=[];
            datasnapshot.forEach((child)=>{
                if (child.val().uuid === uuid){

                } else {
         
                    users.push({
                        userName:child.val().name,
                        uuid: child.val().uuid
                    })
                }
            });
            setAllUsers(users)
          
        })

    } catch(err){
        alert(err)
    }

},[])

    return (
        <View style={{flex:1, backgroundColor:'#000'}}>
            {/* <AppHeader title="Messages" /> */}
            <FlatList
            alwaysBounceVertical={false}
            data={allUsers}
            style={{padding:5}}
            keyExtractor={(_,index)=> index.toString()}
            renderItem={({item})=>(
                <TouchableOpacity style={{flexDirection:'row',marginBottom:20,
                marginTop:20}} onPress={()=>
                    props.navigation.navigate('Chat', {userName:item.userName , guestUid:item.uuid})
                }>

                    <View style={{width:'15%', alignItems:'center',justifyContent:'center'}}>
<Image source={require('./profile.png')}
style={{height:50,width:50, borderRadius:25}}
/>

                    </View>
                    <View style={{width:'85%',alignItems:'flex-start',
                justifyContent:'center', marginLeft:10
                }}>
                    <Text  style={{color:'#fff', fontSize:16, fontWeight:'bold'}} 
                    >
{item.userName}
                    </Text>

                    </View>



                </TouchableOpacity>
            )}
            
            />

       </View>
    );
}

export default dashboard;