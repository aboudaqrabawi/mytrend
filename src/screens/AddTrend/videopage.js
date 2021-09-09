import { Icon } from 'native-base';
import React, { useState } from 'react';
import { View  , StyleSheet,  TouchableOpacity,Image} from 'react-native';
import Video from 'react-native-video'
function videopage(props) {
    const [result , setResult ]= useState( props.navigation.getParam('result'))
    return (
     <View   style={{  height:'100%',
     
        backgroundColor: '#000' }}>

        
        <Video
                   style={StyleSheet.absoluteFill}
                source={{
                     uri:
                     props.navigation.getParam('videoUrl'),
                   }}
                                         resizeMode="contain"
               
                 
                                  />
	


<TouchableOpacity     style={{position: 'absolute' , top:'5%' ,right:'5%'}}  
onPress={()=>    props.navigation.navigate('AddTrendScreen',{result:result})}
>
<Image style ={{width:50 , height:50 }}  source= {require('../../../assets/images/arrow.png')}/>

</TouchableOpacity>
        



     </View>
    );
}

export default videopage;