import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
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
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';

export const {height, width} = Dimensions.get('window');
import Footer from '../../components/Footer';
import styles from './styles';
import config from '../../../assets/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {white} from '../../../assets/colors/index';
import {
  Toast,
  Root,
  Text,
  ListItem,
  Body,
  Radio,
  Container,
  Content,
  Header,
  Left,
  Icon,
  View,
  Right,
} from 'native-base';
import like from '../../components/feed/like';

const UserProfileScreen = (props) => {
  const [data, setdata] = useState([]);
  const [following, setfollowing] = useState([]);
  const [followers, setfollowers] = useState([]);
  const [likes, setlikes] = useState([]);
  const [show, setshow] = useState(false);

  useEffect(() => {
    user();
  }, [data]);
  const click = () => {
    setshow(!show);
  };

  const DeleteVideo = async (id) => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'deleteTrend', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({trend_id: id}),
    });
    let res = await response.json();
  };

  const user = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');

    try {
      let response = await fetch(config.DOMAIN + 'usertrendinfo2', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let res = await response.json();

      if (res.status == 200) {
        setdata(res.comments);
        setfollowing(res.comments[0].followin_for_user);
        setfollowers(res.comments[0].user_followed);
        setlikes(res.comments[0].user_like);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItems = ({item, index}) => {
    return (
      <View style={{flex: 1}} key={index}>
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#fff',
            borderBottomColor: '#0149AF',
            borderWidth: 1.5,
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
          }}>
          {item.image != 'data:undefined;base64,undefined' ? (
            <Image
              source={{uri: config.IMG_DOMAIN + item.image}}
              style={{
                width: '35%',
                height: height / 5,
                margin: '3%',
                borderRadius: 200,
                borderWidth: 2,
                borderColor: '#e9803e',
              }}
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

          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  right: '10%',
                  top: '10%',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                @{item.name}
              </Text>
              <Image
                source={require('../../../assets/images/verified.png')}
                style={{width: 20, height: 20, top: 25, marginRight: 10}}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  marginLeft: '2%',
                  marginTop: '15%',
                  flexDirection: 'column',
                }}
                onPress={() =>
                  props.navigation.navigate('Followings', {
                    following: following,
                  })
                }>
                <Text
                  style={{
                    fontSize: 14,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {following.length}
                </Text>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                  Following
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: '2%',
                  marginTop: '15%',
                  flexDirection: 'column',
                }}
                onPress={() =>
                  props.navigation.navigate('Followers', {
                    followers: followers,
                  })
                }>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {followers.length}
                </Text>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                  Followers
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: '2%',
                  marginTop: '15%',
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {likes.length}
                </Text>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>likes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: '2%',
                  marginTop: '15%',
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  10
                </Text>
                <Text style={{fontSize: 14, fontWeight: 'bold'}}>Views</Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginTop: '7%'}}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('editUser')}
                style={{
                  backgroundColor: '#0149AF',
                  marginRight: 10,
                  borderRadius: 80,
                  width: 80,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    color: white,
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Edit profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('EditBio', {bio: item.bio})
                }
                style={{
                  backgroundColor: '#0149AF',
                  width: 80,
                  height: 40,
                  borderRadius: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    color: white,
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                  }}>
                  Edit bio
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: 10,
          }}>
          {item.user_trend.map((data, index) => {
            return (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  marginBottom: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  maxWidth: 130,
                  width: '30%',
                  height: 130 * 1.3,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 3,
                    height: 3,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 1.84,
                  elevation: 3,
                }}
                onPress={() =>
                  props.navigation.navigate('videopage', {id: data.id})
                }>
                {data.cover_image != null ? (
                  <View style={styles.itemView}>
                    <Image
                      source={{uri: config.Video + data.cover_image}}
                      // source={require('../../../assets/images/person.jpg')}
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
                    <TouchableOpacity
                      onPress={() => click()}
                      style={{
                        justifyContent: 'flex-end',
                        alignContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <Image
                        source={require('../../../assets/images/menu.png')}
                        style={{width: 10, height: 10}}
                      />
                    </TouchableOpacity>
                    <Modal
                      animationType={'fade'}
                      transparent={true}
                      visible={show}>
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
                            <TouchableOpacity onPress={() => click()}>
                              <Text style={{marginLeft: '90%', fontSize: 12}}>
                                close{' '}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                height: 50,
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center',
                              }}
                              onPress={() => DeleteVideo(data.id)}>
                              <Text>Delete</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Modal>
                    <Image
                      source={require('../../../assets/images/login.png')}
                      // source={require('../../../assets/images/person.jpg')}
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
  };

  return (
    <Container>
      <Content>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.toggleDrawer()}
            style={styles.backButton}>
            <Icon name="menu" size={40} color={'#0149AF'} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={renderItems}
          keyExtractor={(item) => item.id}
        />
      </Content>
      <Footer nav={props.navigation} />
    </Container>
  );
};

export default UserProfileScreen;
