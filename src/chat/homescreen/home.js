import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Button,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  Text,
  View,
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Icon,
  Title,
} from 'native-base';
import config from '../../../assets/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/LoaderBox';
import {white} from '../../../assets/colors';
import Footer from '../../components/Footer';

export const {height, width} = Dimensions.get('window');
function home(props) {
  const [convoUser, setconvoUser] = useState(false);
  const [userInfo, setuserInfo] = useState(false);
  const [checker, setchecker] = useState(false);

  useEffect(async () => {
    conversation();
  }, [convoUser]);

  useEffect(async () => {
    users();
  });

  const conversation = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    try {
      let response = await fetch(config.DOMAIN + 'chat/conversations', {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let res = await response.json();
      if (!convoUser) {
        setconvoUser(res.conversations.map((e) => e.receiver));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const users = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    try {
      let response = await fetch(config.DOMAIN + 'users', {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let res = await response.json();
      if (!userInfo && convoUser) {
        await setuserInfo(
          res.users.filter((e, key) => convoUser.includes(e.id)),
        );
        await setchecker(true);
      }
    } catch (error) {
      console.log(error);
    }
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
        <Body style={{marginLeft: '25%'}}>
          <Text
            style={{
              color: '#000',
              fontSize: 25,
              textAlign: 'center',
            }}>
            Chat
          </Text>
        </Body>
      </Header>
      <Content contentContainerStyle={{marginTop: '5%'}}>
        <FlatList
          alwaysBounceVertical={false}
          data={userInfo}
          style={{padding: 5}}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <View
              style={{
                borderWidth: 0.2,
                borderRadius: 20,
                flexDirection: 'row',
                backgroundColor: '#fff',
                width: '100%',
                textAlign: 'center',
                color: '#0149AF',
                shadowColor: '#000',
                shadowOpacity: 0.7,
                marginBottom: '5%',
              }}>
              <View
                style={{
                  width: '15%',
                }}>
                {item.image == '' ? (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('ChatssScreen', {
                        id: item.id,
                        name: item.name,
                        image: item.image,
                      });
                    }}>
                    <Image
                      source={{
                        uri: config.IMG_DOMAIN + item.image,
                      }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        borderColor: '#FAB159',

                        borderWidth: 2,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('ChatssScreen', {
                        id: item.id,
                        name: item.name,
                        image: item.image,
                      });
                    }}>
                    <Image
                      source={{
                        uri: config.IMG_DOMAIN + item.image,
                      }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        borderColor: '#FAB159',

                        borderWidth: 2,
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  width: '70%',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  marginLeft: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('ChatssScreen', {
                      id: item.id,
                      name: item.name,
                      image: item.image,
                    });
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
                  <Image
                    source={require('../../../assets/images/menu.png')}
                    style={{
                      width: 20,
                      height: 20,
                      color: '#aaa9ad',
                      opacity: 0.4,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </Content>
      <Footer nav={props.navigation} />
    </Container>
  );
}

export default home;
