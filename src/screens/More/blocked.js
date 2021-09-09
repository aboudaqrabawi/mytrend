import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../assets/Config';

function blocked(props) {
  const [users, setusers] = useState('');
  const [check, setcheck] = useState(false);
  useEffect(() => {
    getBlocked();
  });

  const block = async (id) => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'blockuser', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        user_blocked_id: id,
      }),
    });
    let res = await response.json();
    setcheck(!check);
    let response2 = await fetch(config.DOMAIN + 'addfollow', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        user_id: id,
      }),
    });
    let res2 = await response2.json();
  };

  const onOpen = () => {
    setcheck(!check);
  };
  const getBlocked = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');

    let response = await fetch(config.DOMAIN + 'blacklist', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    let res = await response.json();

    setusers(res.comments);
  };

  const renderItems = ({item, index}) => {
    console.log(item);
    return (
      <View
        style={{
          flexDirection: 'row',
          margin: '5%',

          backgroundColor: '#fff',
          borderRadius: 60,

          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          alignItems: 'flex-start',
          height: 50,
          shadowColor: '#000',
          shadowOpacity: 0.7,
          shadowRadius: 5,
          elevation: 2,
        }}>
        <Image
          source={{uri: config.IMG_DOMAIN + item.user_blocked.image}}
          style={{
            width: 40,
            height: 40,
            borderRadius: 50,
            marginLeft: 20,
            marginTop: 5,
          }}
        />
        <Text style={{fontWeight: 'bold', left: '10%', top: '3%'}}>
          {item.user_blocked.name}
        </Text>
        <TouchableOpacity
          style={{left: '100%', top: '3%'}}
          onPress={() => onOpen()}>
          <Image
            source={require('../../../assets/images/menu.png')}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>

        <Modal animationType={'fade'} transparent={true} visible={check}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000AA',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                width: '100%',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                paddingHorizontal: 20,
                maxHeight: 200,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => onOpen()}>
                  <Text style={{marginLeft: '90%', fontSize: 12}}>close </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 50,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => block(item.user_blocked_id)}>
                  <Text>Block</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={users}
        renderItem={renderItems}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default blocked;
