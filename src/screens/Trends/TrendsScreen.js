import React, {Component, useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  Platform,
  AlertIOS,
  Header,
} from 'react-native';
import styles from './styles';
import Footer from '../../components/Footer';
export const {height} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../assets/Config';
import Videos from './videoplayer';
import Loading from '../../components/LoaderBox';
import user from '../../chat/chatss/user';

const Videoplayer = (props) => {
  const [data, setData] = useState([]);
  const [checker, setchecker] = useState(false);
  const [paused, setpaused] = useState(false);
  const [selected, setSelected] = useState('');
  const [check, setcheck] = useState(true);

  useEffect(() => {
    Alltrends();
  }, []);

  const TrendsbyInterest = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    setchecker(false);
    setcheck(false);
    try {
      let response = await fetch(config.DOMAIN + 'gettrendbyinterestes', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let res = await response.json();

      setData(res.messg);

      await setchecker(true);
    } catch (error) {
      console.log(error);
    }
  };
  const Alltrends = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');

    setcheck(true);

    try {
      let response = await fetch(config.DOMAIN + 'alltrends', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      let res = await response.json();

      setData(res.trends);

      setchecker(true);
    } catch (error) {
      console.log(error);
    }
  };

  const loading = async () => {
    if (checker) {
      return <Loading />;
    }
  };
  // checker ?
  return checker ? (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <Videos data={data} nav={props.navigation} />
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => Alltrends()}>
          <View>
            <Text style={styles.iconTxt}>{strings.Trendings}</Text>
          </View>
        </TouchableOpacity>
        <Text>{'|'}</Text>
        <TouchableOpacity onPress={() => TrendsbyInterest()}>
          <View>
            <Text style={styles.iconTxt}>{strings.MyTrend}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{position: 'absolute'}}>
        <Footer nav={props.navigation} />
      </View>
    </View>
  ) : (
    <Loading />
  );
};

export default Videoplayer;
