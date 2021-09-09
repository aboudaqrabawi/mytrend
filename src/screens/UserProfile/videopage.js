import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  Platform,
  AlertIOS,
  Header,
} from 'react-native';

import styles from './styles';
import TrendBox from '../../components/TrendBox';
import Footer from '../../components/Footer';
import LoaderBox from '../../components/LoaderBox';
import {ScrollView} from 'react-native-gesture-handler';
export const {height} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../assets/Config';
import {white} from '../../../assets/colors';
export default class videopage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,
      selected: 1,
      data: [],
    };
  
    
  }
  renderItems = ({item, index}) => {
    return <TrendBox data={item} nav={this.props.navigation} />;
  };
  renderTrendings = () => {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItems}
        keyExtractor={(item) => item.id}
        // onRefresh={() => this.onRefresh(1)}
        // refreshing={this.state.isFetching}
        ListEmptyComponent={() => {
          return (
            <View style={styles.noDataView}>
              {!this.state.showProgress && (
                <Text
                  style={{
                    fontFamily: 'gibson-regular',
                    fontSize: 16,
                    color: 'red',
                    margin: 20,
                    textAlign: 'center',
                  }}>
                 
                </Text>
              )}
            </View>
          );
        }}
      />
    );
  };
  error(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      AlertIOS.alert(msg);
    }
  }
  renderLoading() {
    if (this.state.showProgress) {
      return <LoaderBox />;
    }
  }
  componentDidMount() {
    
   this.getTrendigs() 
  }





async getTrendigs() {
    const userId = await AsyncStorage.getItem('@Trend:token');
    this.setState({showProgress: true});
    try {
      let response = await fetch(config.DOMAIN + 'alltrends', {
        //by following
        // by following
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let res = await response.json();
      
      if (res.status == 400) {
        this.error(res.messg);
      } else {
          
            let data1 = res.trends.filter((e)=> e.id === this.props.navigation.state.params.id)
         
        this.setState({showProgress: false, data: data1});
       
       
      }
    } catch (error) {
      console.log(error);
      this.setState({showProgress: false});
    }
  }

  



  render() {
    return (
      <View style={{backgroundColor: white,flex: 1}}>
       
          {this.renderLoading()}

          {this.renderTrendings()}
      
       
        <View>
          <Footer nav={this.props.navigation} />
        </View>
      </View>
    );
  }
}

