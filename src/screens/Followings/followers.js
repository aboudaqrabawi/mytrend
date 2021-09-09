import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import config from '../../../assets/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {white} from '../../../assets/colors';
export const {width, height} = Dimensions.get('window');

function followers(props) {
  //  console.log('props',props.navigation.state.params.followers)
  const [Allusers, setAllusers] = useState([]);
  const [Filtered, setFiltered] = useState([]);

  useEffect(async () => {
    await users();
  });

  const users = async () => {
    const following = await props.navigation.state.params.followers.map(
      (e) => e.user_Id_followed,
    );
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'users', {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      let data = await res.json();

      const newborn = data.users.filter((e, key) => following.includes(e.id));
      setAllusers(newborn);
    });
  };

  const renderItems = ({item, index}) => {
    return (
      <View
        key={index}
        style={{backgroundColor: white, marginBottom: 20, flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            height: 80,
            width: '100%',
            padding: 20,
            alignItems: 'center',
            borderColor: '#fff',

            borderWidth: 1.5,
          }}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('followerscreen', {
                token: item.api_token,
              })
            }
            style={{flexDirection: 'row', borderWidth: 1, borderColor: '#fff'}}>
            <Image
              style={{
                width: 40,
                height: 40,

                padding: 20,
                borderRadius: 60,
                borderWidth: 3,
              }}
              source={{uri: config.IMG_DOMAIN + item.image}}
            />

            <Text style={{marginTop: '10%', marginLeft: '10%'}}>
              {' '}
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, marginTop: 10}}>
      <View style={{flex: 1, height: height}}>
        <FlatList
          data={Allusers}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default followers;
