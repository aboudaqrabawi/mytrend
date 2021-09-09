import React, {Component, useState, useEffect} from 'react';
import {
  Container,
  Header,
  Button,
  Title,
  Body,
  Right,
  Icon,
  Content,
  List,
  ListItem,
  Form,
  Item,
  Input,
  Left,
} from 'native-base';

import {
  View,
  Image,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  Platform,
  AlertIOS,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../assets/Config';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {BoldFont} from '../../../assets/fonts';
import {white} from '../../../assets/colors';
const editUser = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [state, setState] = useState({uploadedImg: []});

  useEffect(() => {
    getUserProfile();
  }, []);
  const getUserProfile = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'getuserprofile', {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    let res = await response.json();

    let data = await res.user;
    setUserInfo(data);
  };

  async function uploadImg() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setState({
        uploadedImg: image.path,
      });
      setUserInfo({
        ...userInfo,
        image: image.data,
        ext: 'jpeg',
      });
    });
  }

  const update = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    await fetch(config.DOMAIN + 'updateprofile', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    props.navigation.navigate('UserProfile');
  };

  return (
    <Container>
      <Header style={{backgroundColor: '#0149AF'}}>
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.navigate('UserProfile')}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>update profile</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <View>
          <TouchableOpacity onPress={() => uploadImg()}>
            {state.uploadedImg != 'data:undefined;base64,undefined' ? (
              <Image source={require('./profile.png')} style={styles.proImg} />
            ) : (
              <Image
                source={{uri: config.IMG_DOMAIN + userInfo.image}}
                style={styles.proImg}
              />
            )}
          </TouchableOpacity>
        </View>
        <Form>
          <Item>
            <Input
              defaultValue={userInfo.name}
              placeholder="name"
              onChangeText={(text) => setUserInfo({...userInfo, name: text})}
            />
          </Item>

          <Item>
            <Input
              defaultValue={userInfo.phone}
              placeholder="phone"
              onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
            />
          </Item>
        </Form>
      </Content>

      <Button block onPress={update} style={{backgroundColor: '#0149AF'}}>
        <Text style={{color: white}}>Update</Text>
      </Button>
    </Container>
  );
};

export default editUser;
