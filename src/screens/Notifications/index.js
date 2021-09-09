import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {white} from '../../../assets/colors';

import {
  Toast,
  Root,
  ListItem,
  Body,
  Radio,
  Container,
  Content,
  Header,
  Left,
  Icon,
  Right,
} from 'native-base';
import {FAB, Portal, Provider} from 'react-native-paper';
import styles from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../assets/Config';
import Footer from '../../components/Footer';

function Notifiactions(props) {
  const [state, setState] = useState({open: false});
  const [noti, setnoti] = useState([]);
  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  useEffect(() => {
    getNotification();
  }, []);
  const getNotification = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'notification/index', {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    let res = await response.json();
    setnoti(res.notifications);
  };

  const renderItems = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: '5%',

          backgroundColor: '#fff',
          borderRadius: 60,
          margin: '2%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          height: 50,
          shadowColor: '#000',
          shadowOpacity: 0.7,
          shadowRadius: 5,
          elevation: 2,
        }}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
          {item.subject}
        </Text>
      </View>
    );
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
        <Body style={{marginLeft: '20%'}}>
          <Text style={{color: '#0149AF', fontSize: 20}}> Notifications </Text>
        </Body>
      </Header>
      <Content contentContainerStyle={{flex: 1, marginTop: '5%'}}>
        <FlatList
          data={noti}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
        />
      </Content>
      <Footer nav={props.navigation} />
    </Container>
    // <Provider>
    //   <SafeAreaView />

    //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //     <Icon name="bell-cancel" size={100} />
    //     <Text style={{fontSize: 20}}>You dont have any notifications.</Text>
    //   </View>
    //   <Portal>
    //     <FAB.Group
    //       open={open}
    //       fabStyle={{backgroundColor: '#0149AF'}}
    //       icon={open ? 'minus' : 'plus'}
    //       actions={[
    //         {
    //           icon: 'check',
    //           label: 'Mark All As Read',
    //           onPress: () => console.log('Pressed email'),
    //         },
    //         {
    //           icon: 'delete',
    //           label: 'Delete All Notifiactions',
    //           onPress: () => console.log('Pressed notifications'),
    //         },
    //       ]}
    //       onStateChange={onStateChange}
    //     />
    //   </Portal>
    // </Provider>
  );
}

export default Notifiactions;
