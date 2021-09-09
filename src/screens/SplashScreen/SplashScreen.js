import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  StatusBar,
  View,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {white} from '../../../assets/colors/index';

export default class SplashScreen extends Component {
  async UNSAFE_componentWillMount() {
    this.loginInterval = setInterval(() => {
      this.renderLoading();
    }, 1000);
  }

  async renderLoading() {
    const userId = await AsyncStorage.getItem('@Trend:token');

    if (userId == null) {
      redirectID = 'Login';
    } else {
      redirectID = 'TrendsScreen';
    }
    clearInterval(this.loginInterval);
    this.props.navigation.navigate(redirectID);
  }

  render() {
    return (
      <View style={{backgroundColor: white, flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor={white} />
        <Image
          source={require('../../../assets/images/login.png')}
          style={styles.logo}
        />

        <View
          style={{
            position: 'absolute',
            top: height * 0.9,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              padding: 10,
              fontSize: 18,
              color: '#000',
              //   fontFamily: RegularFont,
            }}>
            {'All Rights Reserved © Next Stage Jo'}
          </Text>
        </View>
      </View>
    );
  }
}
const {width: width, height: height} = Dimensions.get('window');
const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    marginTop: width * 0.3,
    width: 400, height: 400
  },
});
