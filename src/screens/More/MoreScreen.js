import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';

import {NavigationActions, StackActions} from 'react-navigation';

import styles from './styles';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'Login'})],
});

export default class MoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_token: '',
    };
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  UserLogoutFunction = () => {
    this.props.navigation.dispatch(resetAction);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{flexGrow: 1, width: '100%'}}
          contentContainerStyle={{paddingBottom: 10}}>
          <View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitleText}>{strings.personality}</Text>
            </View>

            <TouchableOpacity
              style={styles.card}
              onPress={() => this.props.navigation.navigate('Account')}>
              <Text style={styles.text}>{strings.accountAndPrivacy}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => this.props.navigation.navigate('Blocked')}>
              <Text style={styles.text}>Blocked Users</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => this.props.navigation.navigate('ChangePassword')}>
              <Text style={styles.text}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => this.UserLogoutFunction()}>
              <Text style={styles.text}>{strings.logout}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerTitleView}>
            <Text style={styles.headerTitleText}>{strings.support}</Text>
          </View>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              this.props.navigation.navigate('ReportAProblem');
            }}>
            <Text style={styles.text}>{strings.reportAProblem}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              this.props.navigation.navigate('contactUs');
            }}>
            <Text style={styles.text}>{strings.contactUs}</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleView}>
            <Text style={styles.headerTitleText}>{strings.about}</Text>
          </View>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              this.props.navigation.navigate('aboutUs');
            }}>
            <Text style={styles.text}>{strings.aboutUs}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              this.props.navigation.navigate('privacyPolicy');
            }}>
            <Text style={styles.text}>{strings.privacyPolicy}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              this.props.navigation.navigate('termsAndConditions');
            }}>
            <Text style={styles.text}>{strings.termsAndConditions}</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleView}>
            <Text style={styles.headerTitleText}>{strings.settings}</Text>
          </View>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.text}>{strings.changeLanguage}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
