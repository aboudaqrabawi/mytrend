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
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import LoaderBox from '../../components/LoaderBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
      email: '',
      password: '',
      userInfo: {},
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '323299047534-i052gjm1ia5bp7dej74ir4d2uec0ijii.apps.googleusercontent.com',
    });
  }

  renderLoading() {
    if (this.state.showProgress) {
      return <LoaderBox />;
    }
  }

  logoutWithFacebook = () => {
    LoginManager.logOut();
    this.setState({userInfo: {}});
  };

  getInfoFromToken = async (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      async (error, user) => {
        this.setState({userInfo: user});

        try {
          let response = await fetch(config.DOMAIN + 'login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              password: '123456',
            }),
          });
          let res = await response.json();

          if (res.status === '400') {
            this.props.navigation.navigate('RegisterFb', {
              user: this.state.userInfo,
            });
          } else {
            await AsyncStorage.setItem('@Trend:token', res.user[0].api_token);
            await AsyncStorage.setItem(
              '@Trend:id',
              JSON.stringify(res.user[0].id),
            );
            this.props.navigation.navigate('TrendsScreen');
          }
          this.setState({showProgress: false});
        } catch (error) {
          console.log('this is the error ', error);
          this.setState({showProgress: false});
        }
      },
    );

    new GraphRequestManager().addRequest(profileRequest).start();
  };

  signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      this.setState({userInfo: userInfo});

      try {
        let response = await fetch(config.DOMAIN + 'login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.userInfo.user.email,
            password: '123456',
          }),
        });
        let res = await response.json();

        if (res.status === '400') {
          this.props.navigation.navigate('registergoogle', {
            email: this.state.userInfo.user.email,
            name: this.state.userInfo.user.name,
          });
        } else {
          await AsyncStorage.setItem('@Trend:token', res.user[0].api_token);
          this.props.navigation.navigate('TrendsScreen');
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

  loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (login) => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();

            this.getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  async Login() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (this.state.password != '' && this.state.email != '') {
      this.setState({showProgress: true});
      try {
        let response = await fetch(config.DOMAIN + 'login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            fcm_token: fcmToken,
          }),
        });
        let res = await response.json();

        if (res.status == 400) {
          this.error(res.messg);
        } else {
          await AsyncStorage.setItem('@Trend:token', res.user[0].api_token);
          await AsyncStorage.setItem(
            '@Trend:id',
            JSON.stringify(res.user[0].id),
          );
          this.props.navigation.navigate('TrendsScreen');
        }
        this.setState({showProgress: false});
      } catch (error) {
        console.log('this is the error ', error);
        this.setState({showProgress: false});
      }
    } else {
      this.error(strings.errorTxt);
    }
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
            placeholder={strings.userName}
            placeholderTextColor={gray}
            onChangeText={(text) => this.setState({email: text})}
            defaultValue={this.state.email}
            returnKeyType="next"
          />
          <TextInput
            style={styles.textInput}
            placeholderTextColor={gray}
            placeholder={strings.Password}
            onChangeText={(text) => this.setState({password: text})}
            defaultValue={this.state.password}
            returnKeyType="go"
            secureTextEntry={true}
          />
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('ForgotPassword')}>
            <View style={{alignItems: 'flex-end'}}>
              <Text>Forgot Password?</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.buttonsView}>
            <TouchableOpacity onPress={() => this.Login()}>
              <View style={[styles.btnView, {backgroundColor: '#0149AF'}]}>
                <Text style={styles.txt}>{strings.login}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <View style={[styles.btnView, {backgroundColor: '#0149AF'}]}>
                <Text style={styles.txt}>{strings.create}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonsView, {bottom: 35}]}>
            <TouchableOpacity onPress={this.loginWithFacebook}>
              <View style={[styles.btnView, {backgroundColor: '#0149AF'}]}>
                <Text style={styles.txt}>login via facebook</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.signIn}>
              <View style={[styles.btnView, {backgroundColor: '#0149AF'}]}>
                <Text style={styles.txt}>Login via google</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
