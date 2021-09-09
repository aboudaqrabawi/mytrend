import {
  Body,
  Container,
  Header,
  Left,
  Text,
  View,
  Icon,
  Content,
} from 'native-base';
import React, {useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../assets/Config';
import Footer from '../../components/Footer';

import {white} from '../../../assets/colors';
function editbio(props) {
  const [bio, setbio] = useState(props.navigation.getParam('bio'));

  const update = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'user/bio', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({bio: bio}),
    });
    let res = await response.json();
    props.navigation.navigate('UserProfile');
  };

  return (
    <Container>
      <Header style={{backgroundColor: white}} androidStatusBarColor="#0149AF">
        <Left>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{color: '#0149AF'}}>
            <Icon name="arrow-back" size={40} color={'#0149AF'} />
          </TouchableOpacity>
        </Left>
        <Body style={{marginLeft: '10%'}}>
          <Text style={{color: '#0149AF', fontSize: 20}}> UPDATE BIO </Text>
        </Body>
      </Header>

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          height: '100%',
          margin: '5%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 20,
            color: '#0149AF',
          }}>
          Bio
        </Text>

        <View
          style={{
            width: '100%',

            alignItems: 'center',
          }}>
          <TextInput
            style={{
              fontSize: 16,
              marginTop: '5%',
            }}
            placeholder="Edit bio"
            multiline={true}
            onChangeText={(text) => setbio(text)}
            defaultValue={bio}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#0149AF',
            borderWidth: 1,
            borderRadius: 60,
            width: 100,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => update()}>
          <Text
            style={{
              fontWeight: 'bold',
              color: white,
              textAlign: 'center',
            }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>

      <Footer nav={props.navigation} />
    </Container>
  );
}

export default editbio;
