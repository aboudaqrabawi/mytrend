import React, {useState, useEffect} from 'react';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../assets/Config';

// Import Google Signin

const App = (props) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()

      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId:
        '323299047534-i052gjm1ia5bp7dej74ir4d2uec0ijii.apps.googleusercontent.com',
    });
    // Check if user is already signed in
  }, []);

  const signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      setUserInfo(userInfo);

      try {
        let response = await fetch(config.DOMAIN + 'login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userInfo.user.email,
            password: '123456',
          }),
        });
        let res = await response.json();
        console.log('res', res);
        if (res.status == 400) {
          props.nav.navigate('registergoogle', {
            email: userInfo.user.email,
            name: userInfo.user.name,
          });
        } else {
          await AsyncStorage.setItem('@Trend:token', res.user[0].api_token);
          props.nav.navigate('TrendsScreen');
        }
      } catch (error) {
        console.log('this is the error ', error);
      }
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error.message);
        alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error.message);
        alert('Play Services Not Available or Outdated');
      } else {
        console.log(error);
        console.log(error.message);
        // alert(error.message);
      }
    }
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#0149AF',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        width: 165,
        height: 40,
        bottom: 10,
        left: 10,
      }}
      onPress={signIn}>
      <Text style={{fontSize: 16, color: '#fff'}}>login via google</Text>
    </TouchableOpacity>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});
