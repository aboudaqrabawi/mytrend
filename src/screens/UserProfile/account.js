import React, {useEffect, useState} from 'react';
import {View, Text, Switch, TouchableOpacity, FlatList} from 'react-native';
import {white} from '../../../assets/colors/index';
import config from '../../../assets/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../../components/Footer';
import Loading from '../../components/LoaderBox';
import {
  ScrollView,
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';
function account(props) {
  const [data, setdata] = useState([]);
  const [checker, setchecker] = useState(false);
  useEffect(() => {
    Icones();
    Load();
  });
  function Load() {
    if (checker) {
      return <Loading />;
    }
  }
  async function toggleSwitch(name) {
    const userId = await AsyncStorage.getItem('@Trend:token');
    setchecker(true);
    try {
      let response = await fetch(
        'http://nextstageksa.com/mytrend/api/icons/changeIcon',
        {
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + userId,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({icon: name}),
        },
      );
      let res = await response.json();
      setdata(res.icons);
      if (res.status == 200) {
        setchecker(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const Icones = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');

    let response = await fetch(
      'http://nextstageksa.com/mytrend/api/icons/index',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    let res = await response.json();

    setdata(res.icons);
  };

  const renderAllItems = ({item, key}) => (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', marginLeft: 10}}>
        <Text>{item.name}</Text>

        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={item.status == 1 ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleSwitch(item.name)}
          value={item.status === 1 ? true : false}
        />
      </View>
    </View>
  );

  return (
    <Container>
      <Header
        style={{backgroundColor: '#0149AF'}}
        androidStatusBarColor="#0149AF">
        <Left>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{color: '#0149AF'}}>
            <Icon name="arrow-back" size={40} color={'#0149AF'} />
          </TouchableOpacity>
        </Left>
        <Body
          style={{
            marginLeft: '10%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            width: '100%',
          }}>
          <Text style={{color: white, width: '100%'}}>Account And Privacy</Text>
        </Body>
        <Right></Right>
      </Header>
      <Content contentContainerStyle={{marginTop: '10%'}}>
        {Load()}
        <FlatList
          style={{flex: 1, backgroundColor: 'white'}}
          data={data}
          renderItem={renderAllItems}
          keyExtractor={(item) => item.id}
        />
      </Content>
      <Footer nav={props.navigation} />
    </Container>
  );
}

export default account;
