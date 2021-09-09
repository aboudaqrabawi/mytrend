import React, {Component, Fragment} from 'react';
// import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigation from './src/screens/AppNavigation';

export default class App extends Component {
  render() {
    return <AppNavigation />;
  }
}
