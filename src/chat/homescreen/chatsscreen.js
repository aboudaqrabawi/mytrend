import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
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
import {white} from '../../../assets/colors';
import config from '../../../assets/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../screens/Followings/styles';
import Footer from '../../components/Footer';

export const {height, width} = Dimensions.get('window');
function chatsscreen(props) {
  const [conversations, setconversations] = useState('');
  const [state, setState] = useState({message: ''});
  const id = props.navigation.getParam('id');
  const name = props.navigation.getParam('name');
  const image = props.navigation.getParam('image');

  useEffect(() => {
    conversation();
  }, [conversations]);

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

      const filtered = res.conversations.filter((e) => e.receiver == id);
      console.log(filtered);
      if (filtered) {
        console.log(filtered);
        await setconversations(filtered[0].messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (state.message) {
      try {
        const userId = await AsyncStorage.getItem('@Trend:token');
        let response = await fetch(config.DOMAIN + 'chat/sendMessage', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Authorization: 'Bearer ' + userId,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            receiver: id,
            message: state.message,
          }),
        });

        let res = await response.json();
        console.log(res);
        if (res.status === '200') {
          setState({...state, message: ''});
        }
      } catch (error) {
        console.log(error);
      }
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
        <Body
          style={{
            marginLeft: '20%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Image
            source={{
              uri: config.IMG_DOMAIN + image,
            }}
            style={{
              height: 35,
              width: 35,
              borderRadius: 25,
              borderColor: '#FAB159',
              margin: 10,
              borderWidth: 2,
            }}
          />
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              marginTop: '13%',
            }}>
            {name}
          </Text>
        </Body>
        <Right></Right>
      </Header>

      <FlatList
        data={conversations}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => (
          <SafeAreaView style={{flex: 1}}>
            <ScrollView>
              <View
                key={index}
                style={{
                  padding: 10,
                  maxWidth: Dimensions.get('window').width / 2 + 10,
                  alignSelf: item.receiver === id ? 'flex-start' : 'flex-end',
                }}>
                <View
                  style={{
                    borderRadius: 20,
                    backgroundColor: item.receiver === id ? '#F1F0F0' : '#ccc',
                  }}>
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {item.text}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      />

      <View
        style={{
          height: '12%',
          width: '100%',
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: 'rgba(1, 73, 175, 0.3)',
          borderWidth: 0.1,
          borderColor: '#fff',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <TextInput
          placeholder="enter message"
          placeholderTextColor="#000"
          style={{
            height: '70%',
            marginLeft: '15%',
            marginTop: '3%',
            marginRight: '5%',
            borderRadius: 20,
            backgroundColor: '#fff',
            textAlign: 'center',
            width: '80%',
          }}
          value={state.message}
          returnKeyType="send"
          onSubmitEditing={() => sendMessage()}
          onChangeText={(text) => setState({...state, message: text})}
        />
        <TouchableOpacity onPress={() => sendMessage()}>
          <Icon
            name="send"
            size={25}
            color="#000"
            style={{width: '20%', marginTop: '5%'}}
          />
        </TouchableOpacity>
      </View>

      <View>
        <Footer nav={props.navigation} />
      </View>
    </Container>
  );
}

export default chatsscreen;
