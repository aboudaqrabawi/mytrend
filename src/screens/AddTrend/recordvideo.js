import React, {Component} from 'react';
import {Text, View} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';

class recordvideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      videoUrl: '',
    };
  }

  move() {
    if (this.state.result.length > 0) {
      return this.props.navigation.navigate('AddTrendScreen', {
        result: this.state.result,

        videoUrl: this.state.videoUrl,
      });
    } else {
      this.uploadVideo();
    }
  }

  async uploadVideo() {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(async (image) => {
      const result = await RNFetchBlob.fs.readFile(image.path, 'base64');
      await this.setState({
        result: result,
        videoUrl: 'mp4',
      });
    });
  }

  render() {
    return <View>{this.move()}</View>;
  }
}

export default recordvideo;
