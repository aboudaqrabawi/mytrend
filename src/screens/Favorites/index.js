import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  FlatList,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../../assets/Config';
import {white} from '../../../assets/colors/index';
import styles from './styles';

function Favorites(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAllTrends();
  }, []);

  const getAllTrends = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');

    try {
      let response = await fetch(config.DOMAIN + 'usertrendinfo', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let res = await response.json();
      if (res.status == 400) {
        error(res.messg);
      } else {
        setData(res.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const error = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      AlertIOS.alert(msg);
    }
  };

  const renderAllItems = ({item}) => (
    <View style={{backgroundColor: white, marginBottom: 20, flex: 1}}>
      <View style={styles.imagesGroup}>
        {item.user_trend.map((data, index) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              key={index}
              onPress={() =>
                props.navigation.navigate('videopage', {id: data.id})
              }>
              {data.cover_image != null ? (
                <View style={styles.itemView}>
                  <Image
                    // source={{uri: config.IMG_DOMAIN + data.cover_image}}
                    source={require('../../../assets/images/person.jpg')}
                    style={styles.itemPhoto}
                  />
                  <View style={styles.trendTitleView}>
                    <Image
                      source={require('../../../assets/images/hashColored.png')}
                      style={{width: 15, height: 15, marginRight: 5}}
                    />
                    <Text style={styles.trendTitleText}>{data.title}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.itemView}>
                  <Image
                    source={require('../../../assets/images/person.jpg')}
                    style={styles.itemPhoto}
                  />
                  <View style={styles.trendTitleView}>
                    <Image
                      source={require('../../../assets/images/hashColored.png')}
                      style={{width: 15, height: 15, marginRight: 5}}
                    />
                    <Text style={styles.trendTitleText}>{data.title}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <View>
      <SafeAreaView />
      <TouchableWithoutFeedback
        onPress={() => props.navigation.goBack()}
        style={styles.backButton}>
        <Icon
          name="arrow-left"
          size={40}
          color={'#0149AF'}
          style={{marginVertical: 30, marginHorizontal: 20}}
        />
      </TouchableWithoutFeedback>
      <ScrollView>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{font: 'bold', fontSize: 20}}>Favorites</Text>
          <FlatList
            style={{backgroundColor: 'white'}}
            data={data && data}
            renderItem={renderAllItems}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Favorites;
