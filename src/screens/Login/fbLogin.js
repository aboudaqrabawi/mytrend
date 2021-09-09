import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../assets/Config';

import {View, Text, TouchableOpacity} from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

export default class Facebook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
    };
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
        console.log(user);
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

          if (res.status == 400) {
            this.props.nav.navigate('RegisterFb', {
              user: this.state.userInfo,
            });
          } else {
            await AsyncStorage.setItem('@Trend:token', res.user[0].api_token);
            await AsyncStorage.setItem(
              '@Trend:id',
              JSON.stringify(res.user[0].id),
            );
            this.props.nav.navigate('TrendsScreen');
          }
          this.setState({showProgress: false});
        } catch (error) {
          console.log('this is the error ', error);
          this.setState({showProgress: false});
        }
        // this.props.navigation.navigate('Register', {user: user})
      },
    );

    new GraphRequestManager().addRequest(profileRequest).start();
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

  render() {
    return <View style={{flex: 1}}></View>;
  }
}
