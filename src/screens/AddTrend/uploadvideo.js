import React, { Component } from 'react';
import {Text , View } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';


class recordvideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
         result :'',
         videoUrl:'',

        };
      }

 move (){
if (this.state.result.length > 0 ){
    return this.props.navigation.navigate('AddTrendScreen',{result:this.state.result  , 
        
        
        
        videoUrl: this.state.videoUrl  })

}

 else{
    this.uploadVideo()
 }



}

async uploadVideo() {
		try {
			const file = await DocumentPicker.pick({
				type: [ DocumentPicker.types.video ]
			});
	
			let result1 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
		await 	this.setState({
                    result:result1,
                    videoUrl:file.uri
                })
		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
			} else {
				throw err;
			}
		}
	}




    render() {
        return (
          <View>

{this.move ()}
          </View>
        );
    }
}

export default recordvideo;




