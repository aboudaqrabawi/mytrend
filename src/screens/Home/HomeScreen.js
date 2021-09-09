import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StatusBar,
  Platform,
  Keyboard,
  ImageBackground,
} from 'react-native';
import config from '../../../assets/Config';
import Carousel from 'react-native-snap-carousel';
import {white} from '../../../assets/colors/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: '',
      activeIndex: 0,
      searchText: '',
      area: this.props.navigation.getParam('area'),
      myTrends: [
        {
          image: '../../../assets/images/person.jpg',
        },
        {
          image: '../../../assets/images/person.jpg',
        },
        {
          image: '../../../assets/images/person.jpg',
        },
        {
          image: '../../../assets/images/person.jpg',
        },
        {
          image: '../../../assets/images/person.jpg',
        },
        {
          image: '../../../assets/images/person.jpg',
        },
      ],
      AllTrends: [
        {
          name: 'Trend Title 1',

          items: [
            {
              image: '../../../assets/images/person.jpg',
            },
            {
              image: '../../../assets/images/person.jpg',
            },
            {
              image: '../../../assets/images/person.jpg',
            },
            {
              image: '../../../assets/images/person.jpg',
            },
          ],
        },
        {
          name: 'Trend Title 2',

          items: [
            {
              image: '../../../assets/images/person.jpg',
            },
            {
              image: '../../../assets/images/person.jpg',
            },
            {
              image: '../../../assets/images/person.jpg',
            },
            {
              image: '../../../assets/images/person.jpg',
            },
          ],
        },
      ],
    };
  }

  async UNSAFE_componentWillMount() {
    this.getAllTrends();
    this.adver();
  }

  getAllTrends = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'alltrends', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    let res = await response.json();

    if (this.state.area) {
      this.setState({
        AllTrends: res.trends.filter((e) => e.area === this.state.area),
      });
    } else {
      this.setState({AllTrends: res.trends});
    }
  };

  onSearchSubmit = async () => {
    Keyboard.dismiss();
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'serch', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: this.state.searchText,
      }),
    });
    let res = await response.json();

    this.setState({AllTrends: res.messg});
  };

  adver = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'alltrends', {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    let res = await response.json();
    this.setState({ads: res.trends});
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  renderSwiper = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        // onPress={() => this.onPressRecipe(item)}
        onPress={() =>
          this.props.navigation.navigate('videopage', {id: item.id})
        }
        style={styles.swiperContainer}>
        {/* <Text >
            {item.title}
          </Text>
          
          <Text>
            {item.description}
          </Text> */}

        {item.cover_image != null ? (
          <ImageBackground
            style={styles.swiperPhoto}
            //source={{uri: item.image}}
            source={{uri: config.Video + item.cover_image}}>
            <View style={{flexDirection: 'row'}}>
              <ImageBackground
                source={require('../../../assets/images/hashColored.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: '3%',
                }}></ImageBackground>
              <Text
                style={{
                  fontSize: 20,
                  fontStyle: 'italic',
                }}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        ) : (
          <ImageBackground
            style={styles.swiperPhoto}
            //source={{uri: item.image}}
            source={require('./trend.jpeg')}>
            <View style={{flexDirection: 'row'}}>
              <ImageBackground
                source={require('../../../assets/images/hashColored.png')}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: '3%',
                }}></ImageBackground>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  fontStyle: 'italic',
                }}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        )}
      </TouchableOpacity>
    );
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  renderAllItems = ({item, index}) => (
    <View style={{backgroundColor: white, marginBottom: 20}} key={index}>
      {item ? (
        <View style={{backgroundColor: white}}>
          <TouchableOpacity style={{paddingLeft: 15, flexDirection: 'row'}}>
            <Image
              source={require('../../../assets/images/hashColored.png')}
              style={{width: 25, height: 25, marginRight: 15}}
            />
            <Text style={{color: '#3757f5', fontSize: 16, fontWeight: '700'}}>
              {item.title}
            </Text>
          </TouchableOpacity>
          <ScrollView horizontal={true}>
            {item?.user_id ? (
              <TouchableOpacity
                style={styles.itemContainer}
                key={index}
                onPress={() =>
                  this.props.navigation.navigate('videopage', {id: item.id})
                }>
                {item.cover_image ? (
                  <Image
                    source={{uri: config.Video + item.cover_image}}
                    style={styles.itemPhoto}
                  />
                ) : (
                  <Image
                    source={{
                      uri:
                        'https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg',
                    }}
                    style={styles.itemPhoto}
                  />
                )}
              </TouchableOpacity>
            ) : null}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    const Carousel_WIDTH = Dimensions.get('window').width;
    return (
      <View style={{flex: 1, marginTop: 10}}>
        <View
          style={{
            backgroundColor: '#969696',
            height: Platform.OS === 'ios' ? 35 : StatusBar.currentHeight,
          }}>
          <StatusBar
            translucent
            backgroundColor={'#666'}
            barStyle={'light-content'}
          />
        </View>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{width: '100%', marginTop: 10}}>
            <View style={{flex: 1}}>
              <TouchableOpacity style={styles.searchBar}>
                <Image
                  source={require('../../../assets/images/search.png')}
                  style={{width: 25, height: 25, tintColor: '#777'}}
                />
                <TextInput
                  style={styles.searchText}
                  placeholder={strings.search}
                  onChangeText={(text) => this.setState({searchText: text})}
                  defaultValue={this.state.searchText}
                  onSubmitEditing={() => this.onSearchSubmit()}
                />
              </TouchableOpacity>
              <Carousel
                layout={'default'}
                autoplay={true}
                loop={true}
                ref={(ref) => (this.carousel = ref)}
                data={this.state.ads}
                sliderWidth={Carousel_WIDTH - 1}
                itemWidth={Carousel_WIDTH - 1}
                renderItem={this.renderSwiper}
                onSnapToItem={(index) => this.setState({activeIndex: index})}
              />
              <FlatList
                style={{flex: 1, marginVertical: 20, backgroundColor: 'white'}}
                data={this.state.AllTrends}
                renderItem={this.renderAllItems}
                keyExtractor={(item) => item.id}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
