import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  AlertIOS,
  SafeAreaView,
  StatusBar,
  Platform,
  I18nManager,
  ToastAndroid,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Button,
  Modal,
  Dimensions,
} from 'react-native';
import {Icon} from 'native-base';
import {white} from '../../../assets/colors/index';
import Footer from '../../components/Footer';
import styles from './styles';
import config from '../../../assets/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const {height, width} = Dimensions.get('window');
export default class follwing extends React.Component {
  constructor(props) {
    super(props);
    // console.log('props', this.props.navigation.state.params)
    this.state = {
      activeIndex: 0,
      follow: 0,
      data: [],
      searchText: '',
      Allusers: '',
      following: [],
      followers: [],
      likes: '',
      fol: '',
      show: false,
      icons: '',
    };
  }

  componentDidMount() {
    this.getAllTrends();
    this.Icones();
  }

  // componentwillUpdate() {
  //   this.getAllTrends();
  // }

  onpressModel() {
    this.setState({show: !this.state.show});
  }

  async Icones() {
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
    this.setState({icons: res.icons});
    console.log(res.icons);
  }

  async block(id) {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'blockuser', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        user_blocked_id: id,
      }),
    });
    let res = await response.json();
    this.setState({show: !this.state.show});

    // let response2 = await fetch(config.DOMAIN + 'addfollow', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: 'Bearer ' + userId,
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },

    //   body: JSON.stringify({
    //     user_id: id,
    //   }),
    // });
    // let res2 = await response2.json();
  }

  async onPressFollow() {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'addfollow', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        user_id: this.state.data[0].id,
      }),
    });
    let res = await response.json();

    if (this.state.fol === 'Follow') {
      this.setState({
        fol: 'Following',
      });
    } else {
      this.setState({
        fol: 'Follow',
      });
    }
  }

  async getAllTrends() {
    const userId = await AsyncStorage.getItem('@Trend:token');
    const user1 = await AsyncStorage.getItem('@Trend:id');

    const person = await this.props.navigation.state.params.token;
    // console.log(person)
    this.setState({showProgress: true});

    let response = await fetch(config.DOMAIN + 'usertrendinfo', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + person,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    let res = await response.json();

    if (res.status == 400) {
      this.error(res.messg);
    } else {
      const checker = res.comments[0].user_followed.filter(
        (e) => e.user_Id_followed == user1,
      );
      if (checker.length > 0) {
        this.setState({fol: 'Following'});
      } else {
        this.setState({fol: 'Follow'});
      }
      // console.log(res.comments)
      this.setState({
        showProgress: false,
        data: res.comments,
        following: res.comments[0].followin_for_user,
        followers: res.comments[0].user_followed,
        likes: res.comments[0].user_like,
      });
    }
  }

  renderAllItems = ({item, key}) => (
    <View key={key} style={{backgroundColor: white, marginBottom: 20, flex: 1}}>
      <TouchableOpacity
        onPress={() => this.onpressModel()}
        style={{
          justifyContent: 'flex-end',
          alignContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <Image
          source={require('../../../assets/images/menu.png')}
          style={{width: 10, height: 10, right: 20}}
        />
      </TouchableOpacity>

      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.state.show}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              paddingHorizontal: 20,
              maxHeight: 200,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => this.onpressModel()}>
                <Text style={{marginLeft: '90%', fontSize: 12}}>close </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 50,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.block(item.id)}>
                <Text>Block</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {item.items != '' ? (
        <View style={{backgroundColor: white}}>
          <View style={styles.profileInfoContainer}>
            {item.image != 'data:undefined;base64,undefined' ? (
              <Image
                source={{
                  uri: config.IMG_DOMAIN + item.image,
                }}
                // source={{uri:
                //   config.Video}}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require('./profile.png')}
                style={{
                  width: '35%',
                  height: height / 5,
                  margin: '3%',
                  borderRadius: 200,
                  borderWidth: 2,
                  borderColor: '#e9803e',
                }}
              />
            )}

            <View
              style={{
                flex: 1,
              }}>
              <Text style={styles.username}>{item.user_name}</Text>
              {this.state.icons != '' && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  {this.state.icons[2].status === 1 && (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.props.navigation.navigate('Followings', {
                          following: this.state.following,
                        })
                      }>
                      <View style={styles.userInteractions}>
                        <Text
                          style={[
                            styles.userInteractionsText,
                            {fontWeight: 'bold'},
                          ]}>
                          {this.state.following.length}
                        </Text>
                        <Text style={styles.userInteractionsText}>
                          Following
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                  {this.state.icons[3].status === 1 && (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.props.navigation.navigate('Followers', {
                          followers: this.state.followers,
                        })
                      }>
                      <View style={styles.userInteractions}>
                        <Text
                          style={[
                            styles.userInteractionsText,
                            {fontWeight: 'bold'},
                          ]}>
                          {this.state.followers.length}
                        </Text>
                        <Text style={styles.userInteractionsText}>
                          Followers
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}

                  {this.state.icons[0].status === 1 && (
                    <View style={styles.userInteractions}>
                      <Text
                        style={[
                          styles.userInteractionsText,
                          {fontWeight: 'bold'},
                        ]}>
                        {this.state.likes.length}
                      </Text>
                      <Text style={styles.userInteractionsText}>Likes</Text>
                    </View>
                  )}

                  {this.state.icons[1].status === 1 && (
                    <View style={styles.userInteractions}>
                      <Text
                        style={[
                          styles.userInteractionsText,
                          {fontWeight: 'bold'},
                        ]}>
                        {'15'}
                      </Text>
                      <Text style={styles.userInteractionsText}>Views</Text>
                    </View>
                  )}
                </View>
              )}
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#0149AF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40%',
                    borderRadius: 20,
                    height: '50%',
                    marginRight: 5,
                  }}
                  onPress={() => this.onPressFollow()}>
                  <Text style={{color: '#fff'}}>{this.state.fol}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('ChatIndi', {
                      id: item.id,
                      name: item.name,
                      image: item.image,
                    });
                  }}
                  style={{
                    backgroundColor: '#0149AF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40%',
                    borderRadius: 20,
                    height: '50%',
                  }}>
                  <Text style={{color: white}}>Message</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{fontWeight: 'bold'}}> {item.bio}</Text>
              </View>
            </View>
          </View>
          <View style={styles.imagesGroup}>
            {this.state.fol === 'Following' ? (
              item.user_trend.map((data, index) => {
                return (
                  <TouchableOpacity
                    style={styles.itemContainer}
                    key={index}
                    onPress={() =>
                      this.props.navigation.navigate('videopage', {id: data.id})
                    }>
                    {data.cover_image != null ? (
                      <View style={styles.itemView}>
                        <Image
                          source={require('./trends.jpeg')}
                          // source={require('../../../assets/images/person.jpg')}
                          style={styles.itemPhoto}
                        />
                        <View style={styles.trendTitleView}>
                          <Image
                            source={require('../../../assets/images/hashColored.png')}
                            style={{
                              width: 15,
                              height: 15,
                              marginRight: 5,
                            }}
                          />
                          <Text style={styles.trendTitleText}>
                            {data.title}
                          </Text>
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
                            style={{
                              width: 15,
                              height: 15,
                              marginRight: 5,
                            }}
                          />
                          <Text style={styles.trendTitleText}>
                            {data.title}
                          </Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={{flex: 1, marginTop: '50%'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    // marginLeft: '45%',
                    // marginTop: '50%',
                  }}>
                  Follow
                </Text>
              </View>
            )}
          </View>
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
          <StatusBar translucent backgroundColor={'#666'} />
        </View>

        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={40} color={'#0149AF'} />
          </TouchableOpacity>

          <FlatList
            style={{flex: 1, backgroundColor: 'white'}}
            data={this.state.data}
            renderItem={this.renderAllItems}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>

        <View>
          <Footer nav={this.props.navigation} />
        </View>
      </View>
    );
  }
}
