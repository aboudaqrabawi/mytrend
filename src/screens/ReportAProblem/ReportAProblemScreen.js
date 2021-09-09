import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../assets/Config';

import styles from './styles';
import {white} from '../../../assets/colors';

export default class ReportAProblemScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 200,
      isClicked: false,
      Text: '',
      reasons: '',
      data: [],
      selected: false,
    };
  }
  componentDidMount() {
    this.getReasons();
  }
  async getReasons() {
    const userId = await AsyncStorage.getItem('@Trend:token');

    let response = await fetch(config.DOMAIN + 'report/reasons', {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    let res = await response.json();

    this.setState({data: res.reasons});
  }

  select(item, index) {
    this.setState({reasons: item});

    this.setState({selected: index});

    return true;
  }

  async SendReport() {
    const userId = await AsyncStorage.getItem('@Trend:token');

    let response = await fetch(config.DOMAIN + 'report/add', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        report_desc: this.state.Text,
        trend_id: this.props.navigation.getParam('id'),
        reason_id: this.state.reasons,
      }),
    });

    let res = await response.json();

    this.props.navigation.navigate('TrendsScreen');
  }

  renderItems = ({item, index}) => {
    return (
      <ListItem selected={false} style={{marginTop: '5%'}}>
        <Left>
          <Radio
            color={'#0149AF'}
            selectedColor={'#0149AF'}
            onPress={() => this.select(item.id, index)}
            selected={this.state.selected === index}
          />
          <Text style={{color: '#0149AF', fontSize: 16, marginLeft: 10}}>
            {item.reason_txt_en}
          </Text>
        </Left>
      </ListItem>
    );
  };

  render() {
    return (
      <Container>
        <Header
          style={{backgroundColor: white}}
          androidStatusBarColor="#0149AF">
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{color: '#0149AF'}}>
              <Icon name="arrow-back" size={40} color={'#0149AF'} />
            </TouchableOpacity>
          </Left>
          <Body style={{marginLeft: '20%'}}>
            <Text style={{color: '#0149AF', fontSize: 20}}> Report </Text>
          </Body>
        </Header>
        <View>
          <FlatList
            data={this.state.data}
            renderItem={this.renderItems}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',

            alignItems: 'center',
          }}>
          <TextInput
            style={{
              borderColor: '#0149AF',
              borderWidth: 1,
              borderRadius: 40,
              height: '50%',
              width: '80%',
              textAlign: 'center',
              fontSize: 16,
              marginTop: '5%',
            }}
            multiline={true}
            placeholder="Tell us more"
            onChangeText={(text) => this.setState({Text: text})}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#0149AF',
              marginTop: '5%',
              borderRadius: 40,
              borderWidth: 1,
              borderColor: '#0149AF',
              width: '30%',
              height: '10%',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.SendReport()}>
            <Text style={{color: '#fff', fontSize: 16}}>Send</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
