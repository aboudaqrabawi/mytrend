import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import config from '../../assets/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {width, height} from '../screens/Map/MapScreen';
import {white} from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default class InterestBox extends Component {
  constructor(props) {
    // console.log(this.props.data)
    super(props);
    this.state = {
      selectedFruits: [],
      selected: [],
      sub: [],
    };
  }
  Save(id) {
    var x = this.state.selected;
    x.push(id);
    this.state.selected.push(x);
    console.log(this.state.selected);
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              select: true,
            });
          }}>
          <View style={styles.row}>
            <Image
              source={{
                uri: config.IMG_DOMAIN + this.props.data.image,
              }}
              style={{
                height: 200,
                width: '100%',
                resizeMode: 'cover',
                alignSelf: 'center',
                borderRadius: 5,
                borderColor: this.state.select ? 'green' : 'red',
              }}
            />
            <Text
              style={{
                paddingHorizontal: 25,
                position: 'absolute',
                color: white,
                padding: 20,
                fontWeight: 'bold',
                backgroundColor: 'rgba(1, 73, 175, 0.1)',
              }}>
       {this.props.data.label}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
