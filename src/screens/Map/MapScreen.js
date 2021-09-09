import React, {Component} from 'react';
import {
  Dimensions,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, OverlayComponent} from 'react-native-maps';
export const {width: width, height: height} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../assets/Config';
import FooterTab from '../../components/Footer';
import {Body, Container, Content, Header} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class OurLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getAllTrends();
  }

  async getAllTrends() {
    const userId = await AsyncStorage.getItem('@Trend:token');
    this.setState({showProgress: true});
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
      // console.log('res', response.url);
      // console.log('res', res.trends);
      if (res.status == 400) {
        this.error(res.messg);
      } else {
        // console.log(res.trends)
        this.setState({showProgress: false, data: res.trends});
      }
    } catch (error) {
      // console.log(error);
      this.setState({showProgress: false});
    }
  }
  render() {
    return (
      <Container>
        <Header
          style={{backgroundColor: '#fff'}}
          androidStatusBarColor="#0149AF">
          <Body style={{}}>
            <TouchableOpacity
              style={{
                borderRadius: 25,
                borderColor: '#999',
                borderWidth: 1,
                width: 370,
                minHeight: 40,
                maxHeight: 50,
                alignSelf: 'center',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() => this.props.navigation.navigate('Follow')}>
              <Image
                source={require('../../../assets/images/search.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#777',
                  alignContent: 'center',
                }}
              />
            </TouchableOpacity>
          </Body>
        </Header>

        <MapView
          style={{height: height, flex: 1}}
          region={{
            latitude: 31.978983,
            longitude: 35.850565,
            latitudeDelta: 0.999922,
            longitudeDelta: 0.999922,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}>
          {this.state.data.length > 0 &&
            this.state.data.map((val, key) => (
              <MapView.Marker
                key={key}
                coordinate={{
                  latitude:
                    val.lat != null && val.lng != null
                      ? parseFloat(val.lat)
                      : 31.978983,
                  longitude:
                    val.lat != null && val.lng != null
                      ? parseFloat(val.lng)
                      : 35.850565,
                }}
                title={val.title}
                onPress={() =>
                  this.props.navigation.navigate('MyProfileScreen', {
                    area: val.area,
                  })
                }>
                {val.user_trend != null && (
                  <Image
                    source={require('./trend.jpeg')}
                    style={{height: 30, width: 30, borderRadius: 30 / 2}}
                  />
                )}
              </MapView.Marker>
            ))}
        </MapView>

        <View>
          <FooterTab nav={this.props.navigation} />
        </View>
      </Container>
    );
  }
}
