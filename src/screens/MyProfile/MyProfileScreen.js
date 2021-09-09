import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {white} from '../../../assets/colors/index';
import config from '../../../assets/Config';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class MyProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      user: {},
      AllTrends: [
        {
          username: 'Sereen',
          following: '5903',
          followers: '51459',
          likes: '254152',
          views: '173642',
          items: [
            {
              name: 'Trend Title 1',
              image: '../../../assets/images/person.jpg',
            },
            {
              name: 'Trend Title 2',
              image: '../../../assets/images/person.jpg',
            },
            {
              name: 'Trend Title 3',
              image: '../../../assets/images/person.jpg',
            },
            {
              name: 'Trend Title 4',
              image: '../../../assets/images/person.jpg',
            },
            {
              name: 'Trend Title 5',
              image: '../../../assets/images/person.jpg',
            },
            {
              name: 'Trend Title 6',
              image: '../../../assets/images/person.jpg',
            },
            {
              name: 'Trend Title 7',
              image: '../../../assets/images/person.jpg',
            },
            {
              name: 'Trend Title 8',
              image: '../../../assets/images/person.jpg',
            },
          ],
        },
      ],
    };
  }

  async UNSAFE_componentWillMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'getuserprofilebyid', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.props.navigation.getParam('user'),
      }),
    });
    let res = await response.json();
    this.setState({user: res.comments});
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  renderAllItems = ({item}) => (
    <View style={{backgroundColor: white, marginBottom: 20, flex: 1}}>
      {item.items != '' ? (
        <View style={{backgroundColor: white}}>
          <View style={styles.profileInfoContainer}>
            <Image
              source={{uri: this.state.user?.image}}
              style={styles.profileImage}
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.username}>{this.state.user?.user_name}</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.userInteractions}>
                  <Text
                    style={[styles.userInteractionsText, {fontWeight: 'bold'}]}>
                    {this.state.user?.following}
                  </Text>
                  <Text style={styles.userInteractionsText}>Following</Text>
                </View>
                <View style={styles.userInteractions}>
                  <Text
                    style={[styles.userInteractionsText, {fontWeight: 'bold'}]}>
                    {this.state.user?.followars}
                  </Text>
                  <Text style={styles.userInteractionsText}>Followers</Text>
                </View>
                <View style={styles.userInteractions}>
                  <Text
                    style={[styles.userInteractionsText, {fontWeight: 'bold'}]}>
                    {this.state.user?.likes ? this.state.user?.likes : '0'}
                  </Text>
                  <Text style={styles.userInteractionsText}>Likes</Text>
                </View>
                <View style={styles.userInteractions}>
                  <Text
                    style={[styles.userInteractionsText, {fontWeight: 'bold'}]}>
                    0
                  </Text>
                  <Text style={styles.userInteractionsText}>Views</Text>
                </View>
              </View>
            </View>
          </View>
          {/* <View style={styles.imagesGroup}>
            {item.items.map((data, index) => {
              return (
                <TouchableOpacity style={styles.itemContainer} key={index}>
                  {data.image != null ? (
                    <View style={styles.itemView}>
                      <Image
                        // source={{uri: data.image}}
                        source={require('../../../assets/images/person.jpg')}
                        style={styles.itemPhoto}
                      />
                      <View style={styles.trendTitleView}>
                        <Image
                          source={require('../../../assets/images/hashColored.png')}
                          style={{width: 15, height: 15, marginRight: 5}}
                        />
                        <Text style={styles.trendTitleText}>{data.name}</Text>
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
                        <Text style={styles.trendTitleText}>{data.name}</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View> */}
        </View>
      ) : null}
    </View>
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#666',
            height: Platform.OS === 'ios' ? 35 : StatusBar.currentHeight,
          }}>
          <StatusBar
            // translucent
            backgroundColor={'#666'}
            barStyle={'light-content'}
          />
        </View>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={styles.menuButton}>
            <Icon name="menu" size={40} color={'#0149AF'} />
          </TouchableOpacity>
          <FlatList
            style={{flex: 1, backgroundColor: 'white'}}
            data={this.state.AllTrends}
            renderItem={this.renderAllItems}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    );
  }
}
