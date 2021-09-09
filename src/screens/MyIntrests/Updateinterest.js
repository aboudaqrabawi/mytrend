import React, {Component} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  View,
  StatusBar,
  Text,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {gray, black} from '../../../assets/colors/index';
import InterestBox from '../../components/InterestBox';
export const {width, height} = Dimensions.get('window');
import config from '../../../assets/Config';
import LoaderBox from '../../components/LoaderBox';
import SelectMultiple from 'react-native-select-multiple';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SelectInterestings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
      data: [],
      selectedFruits: [],
      selected: [],
      islam: [],
    };
  }

  async update() {
    const userId = await AsyncStorage.getItem('@Trend:token');
    this.state.selectedFruits.map((val, key) => {
      var x = val.value;
      this.state.islam.push(x);
    });

    let response = await fetch(config.DOMAIN + 'editinterest', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({interests: this.state.islam}),
    });

    let res = response.json();

    await this.props.navigation.navigate('MyIntrests');
  }

  renderLoading() {
    if (this.state.showProgress) {
      return <LoaderBox />;
    }
  }
  error(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      AlertIOS.alert(msg);
    }
  }
  async UNSAFE_componentWillMount() {
    this.getInterstings();
  }

  async getInterstings() {
    this.setState({showProgress: true});
    try {
      let response = await fetch(config.DOMAIN + 'interests');
      let res = await response.json();

      if (res.status != 400) {
        res[0].map((val, key) => {
          var x = {
            image: val.image,
            label: lang == 'ar' ? val.name_ar : val.name_en,
            value: val.id,
          };
          this.state.data.push(x);
        });
      } else {
        this.error(strings.thereisErr);
      }
      this.setState({showProgress: false});
    } catch (error) {
      console.log(error);
      this.setState({showProgress: false});
    }
  }
  renderList = ({item, index}) => {
    return (
      <InterestBox data={item} index={index} nav={this.props.navigation} />
    );
  };
  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    this.setState({selectedFruits});
  };
  render() {
    const renderLabel = (label, style) => {
      var x = this.state.data.find((element) => element.label == label);

      return (
        <View>
          <Image
            style={{
              alignSelf: 'center',
              width: width * 0.85,
              height: height * 0.3,
              resizeMode: 'cover',
            }}
            source={{uri: config.IMG_DOMAIN + x.image}}
          />
          <View style={{marginLeft: 10, position: 'absolute'}}>
            <Text
              style={{
                color: '#fff',
                backgroundColor: 'rgba(1, 73, 175, 0.2)',
                padding: 20,
              }}>
              {label}
            </Text>
          </View>
        </View>
      );
    };
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: '#0149AF',
            height: Platform.OS === 'ios' ? 35 : StatusBar.currentHeight,
          }}>
          <StatusBar translucent backgroundColor={'#0149AF'} />
        </View>
        <View
          style={{
            backgroundColor: '#0149AF',
            padding: 20,
          }}>
          <Text style={[styles.txt, {textAlign: 'center'}]}>
            {strings.Whatareyourinterests}
          </Text>
        </View>

        <SelectMultiple
          items={this.state.data}
          renderLabel={renderLabel}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange}
        />

        <TouchableOpacity
          style={{alignSelf: 'center', marginVertical: 20}}
          onPress={() => this.update()}>
          <View style={[styles.btnView, {backgroundColor: '#0149AF'}]}>
            <Text style={styles.txt}>{strings.completion}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
