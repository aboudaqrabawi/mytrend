import React, {Component} from 'react';
import {
  View,
  Image,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import {white, gray} from '../../../assets/colors/index';
import config from '../../../assets/Config';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import LoaderBox from '../../components/LoaderBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
      newChange: '',
      newpassword:'',
      password:'',

      
    };
  }
  renderLoading() {
    if (this.state.showProgress) {
      return <LoaderBox />;
    }
  }

  async resetPassword() {
    const userId = await AsyncStorage.getItem('@Trend:token');

    let response = await fetch(config.DOMAIN + 'chingPassword', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
              password:this.state.password,
              new_password:this.state.newpassword,
      })
      })
      let res = await response.json();
    
   

  }

  error(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      AlertIOS.alert(msg);
    }
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: white}}>
        <StatusBar barStyle="light-content" backgroundColor={gray} />
        {this.renderLoading()}
        <View style={styles.loginView}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../../../assets/images/login.png')}
              style={{width: 400, height: 400}}
            />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder= 'Current Password'
            placeholderTextColor={gray}
            onChangeText={(text) => this.setState({password: text})}
            defaultValue={this.state.password}
            returnKeyType="next"
          />
            <TextInput
            style={styles.textInput}
            placeholder='New Password'
            placeholderTextColor={gray}
            onChangeText={(text) => this.setState({newpassword: text})}
            defaultValue={this.state.newpassword}
            returnKeyType="next"
          />
     




          <View style={styles.buttonsView}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <View style={[styles.btnView, {backgroundColor: '#0149AF'}]}>
                <Text style={styles.txt}>Back</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.resetPassword()}>
              <View style={[styles.btnView, {backgroundColor: '#0149AF'}]}>
                <Text style={styles.txt}>Submit  </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
