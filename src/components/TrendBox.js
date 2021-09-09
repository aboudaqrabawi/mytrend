import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  Dimensions,
  ToastAndroid,
  Platform,
  AlertIOS,
  Modal,
  Linking,
  StyleSheet,
  Animated,
  PanResponder,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
export const {width, height} = Dimensions.get('window');
import config from '../../assets/Config';
import Video from 'react-native-video';
import {Icon} from 'native-base';
import {gray, orange, white, yellow} from '../../assets/colors';
import {LoaderBox} from '../components/LoaderBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedNumbers from 'react-native-animated-numbers';

export default class TrendBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBtn: false,
      // animateToNumberAdd: 6,
      // animateToNumberMin: 6,
      animateToNumberAdd: this.props.data.trend_like.length,
      animateToNumberMin: this.props.data.trend_dislike.length,
      listOfComments: [],
      isVisibal: false,
      panY: new Animated.Value(height),
      like: false,
      dislike: false,
      favCount: false,
      paused: false,
      usertoken: '',
    };

    this._resetPositionAnim = Animated.timing(this.state.panY, {
      toValue: 0,
      duration: 300,
    });
    this._closeAnim = Animated.timing(this.state.panY, {
      toValue: Dimensions.get('screen').height,
      duration: 500,
    });
    this._panResponders = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: Animated.event([null, {dy: this.state.panY}]),
      onPanResponderRelease: (e, gs) => {
        if (gs.dy > 0 && gs.vy > 2) {
          return this._closeAnim.start(() => this.props.onDismiss());
        }
        return this._resetPositionAnim.start();
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isVisibal !== this.state.isVisibal && this.state.isVisibal) {
      this._resetPositionAnim.start();
    }
  }
  async getComments() {
    const userId = await AsyncStorage.getItem('@Trend:token');
    this.setState({usertoken: userId});
    this.setState({showProgress: true});
    try {
      let response = await fetch(
        'http://nextstageksa.com/mytrend/api/comment/byTrend',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + userId,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            trend_id: this.props.data.id,
          }),
        },
      );
      let res = await response.json();

      if (res.status == 400) {
        this.error(res.messg);
      } else {
        this.setState({
          showProgress: false,
          listOfComments: res.comments,
        });
      }
    } catch (error) {
      this.error(error);
      this.setState({showProgress: false});
    }
  }
  async componentDidMount() {
    this.getComments();
    this.checker();
  }

  async checker() {
    const user = await AsyncStorage.getItem('@Trend:id');
    const check = await this.props.data.trend_like.filter(
      (e) => e.user_id == user,
    );
    if (check.length > 0) {
      this.setState({like: true});
    } else {
      this.setState({like: false});
    }

    const check2 = await this.props.data.trend_dislike.filter(
      (e) => e.user_id == user,
    );
    if (check2.length > 0) {
      this.setState({dislike: true});
    } else {
      this.setState({dislike: false});
    }
  }

  _handleDismiss() {
    this._closeAnim.start(() => this.props.onDismiss());
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
  async goToUserProfile(token) {
    this.props.nav.navigate('followerPage', {
      token: token,
    });
  }

  async deleteComment(ComId) {
    const userId = await AsyncStorage.getItem('@Trend:token');
    this.setState({showProgress: true});
    try {
      let response = await fetch(
        'http://nextstageksa.com/mytrend/api/comment/delete',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + userId,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comment_id: ComId,
          }),
        },
      );
      let res = await response.json();

      if (res.status == 400) {
        this.error(res.messg);
      } else {
        this.setState({showProgress: false});
      }
    } catch (error) {
      this.error(error);
      this.setState({showProgress: false});
    }
  }

  async disLike() {
    const userId = await AsyncStorage.getItem('@Trend:token');
    this.setState({showProgress: true});
    try {
      let response = await fetch(config.DOMAIN + 'adddisliketrend', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trend_id: this.props.data.id,
        }),
      });
      let res = await response.json();

      if (res.status == 400) {
        this.error(res.messg);
      } else {
        this.setState({showProgress: false});
      }
    } catch (error) {
      this.error(error);
      this.setState({showProgress: false});
    }

    if (this.state.like) {
      let response = await fetch(config.DOMAIN + 'addliketrend', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trend_id: this.props.data.id,
        }),
      });
      let res = await response.json();
      console.log(res);
      if (res.status == 400) {
        this.error(res.messg);
      } else {
        this.setState({
          showProgress: false,
          like: !this.state.like,
          animateToNumberAdd: this.state.animateToNumberAdd - 1,
        });
      }
    }
  }

  async like() {
    const userId = await AsyncStorage.getItem('@Trend:token');

    this.setState({showProgress: true});
    try {
      let response = await fetch(config.DOMAIN + 'addliketrend', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trend_id: this.props.data.id,
        }),
      });
      let res = await response.json();

      if (res.status == 400) {
        this.error(res.messg);
      } else {
        this.setState({showProgress: false});
      }
    } catch (error) {
      this.error(error);
      this.setState({showProgress: false});
    }

    if (this.state.dislike) {
      let response = await fetch(config.DOMAIN + 'adddisliketrend', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trend_id: this.props.data.id,
        }),
      });
      let res = await response.json();

      if (res.status == 400) {
        this.error(res.messg);
      } else {
        this.setState({
          showProgress: false,
          dislike: !this.state.like,
          animateToNumberMin: this.state.animateToNumberMin - 1,
        });
      }
    }
  }
  async addComment() {
    const userId = await AsyncStorage.getItem('@Trend:token');
    this.setState({showProgress: true});
    try {
      let response = await fetch(
        'http://nextstageksa.com/mytrend/api/comment/add',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + userId,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            trend_id: this.props.data.id,
            comment_txt: this.state.comment,
          }),
        },
      );
      let res = await response.json();
      if (res.status == 400) {
        this.error(res.messg);
      } else {
        this.getComments();
        this.setState({showProgress: false, comment: ''});
      }
    } catch (error) {
      this.error(error);
      this.setState({showProgress: false});
    }
  }
  setModalStatus() {
    this.setState({
      isVisibal: !this.state.isVisibal,
    });
  }
  async shareTrend() {}

  async addToFav() {
    const userId = await AsyncStorage.getItem('@Trend:token');
    this.setState({showProgress: true});
    try {
      let response = await fetch(config.DOMAIN + 'addfavouritetrend', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trend_id: this.props.data.id,
        }),
      });
      let res = await response.json();

      if (res.status == 400) {
        this.error(res.messg);
      } else {
        this.setState({
          showProgress: false,
          favCount: !this.state.favCount,
        });
        this.error(
          !this.state.favCount ? 'Removed From Fav !' : 'Added To Fav !',
        );
      }
    } catch (error) {
      this.error(error);
      this.setState({showProgress: false});
    }
  }

  async OnpressPaused() {
    var x = await this.state.paused;
    await this.setState({paused: !x});
  }

  async downloadTrend() {
    const userId = await AsyncStorage.getItem('@Trend:token');
    this.setState({showProgress: true});
    try {
      let response = await fetch(config.DOMAIN + 'link', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + userId,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trend_id: this.props.data.id,
        }),
      });
      let res = await response.json();

      if (res.status == 400) {
        this.error(res.messg);
      } else {
        Linking.openURL(res.link);
        this.setState({showProgress: false});
      }
    } catch (error) {
      this.error(error);
      this.setState({showProgress: false});
    }
  }

  render() {
    const top = this.state.panY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1],
    });
    var list = [];
    if (this.state.listOfComments != undefined)
      if (this.state.listOfComments.length > 0) {
        list = this.state.listOfComments.map((val, key) => {
          // console.log(val.user_comment.id);

          const valid = val.user_comment.api_token;

          return (
            <View
              key={key}
              style={{
                flexDirection: 'row',
                width: width * 0.9,
                padding: 7,
                margin: 7,
                alignItems: 'center',
                borderRadius: 25,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 0.84,

                // elevation: 0.005,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.goToUserProfile();
                  this.setModalStatus();
                }}>
                <Image
                  source={{uri: config.IMG_DOMAIN + val.user_comment.image}}
                  style={{
                    width: 40,
                    height: 40,
                    marginVertical: 5,
                    borderRadius: 40 / 2,
                    borderWidth: 2,
                  }}
                />
              </TouchableOpacity>
              <View style={{paddingHorizontal: 10}}>
                <Text>{val.user_comment.name}</Text>
                <Text>{val.comment_txt}</Text>
              </View>
              {this.state.usertoken === valid && (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#0149AF',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    left: 50,
                    botton: 0,
                    width: 70,
                    height: 20,
                  }}
                  onPress={() => this.deleteComment(val.id)}>
                  <Text
                    style={{color: '#fff', textAlign: 'center', fontSize: 16}}>
                    Delete
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        });
      }
    return (
      <>
        <View
          style={{
            height: height,
            justifyContent: 'flex-end',
            backgroundColor: '#000',
          }}>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          <Video
            style={{height: height, width: '100%'}}
            source={{
              uri: config.Video + this.props.data.video,
            }}
            resizeMode="contain"
            onTouchStart={() => this.setState({paused: !this.state.paused})}
            paused={this.state.paused}
            repeat={true}
          />

          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0)',
              position: 'absolute',
              bottom: 30,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                bottom: 0,
                left: 10,
              }}>
              <View
                style={{
                  width: '80%',
                  marginBottom: '20%',
                }}>
                <Text style={{color: '#fff', fontSize: 20}}>
                  {this.props.data.title}
                </Text>

                <Text style={{color: '#fff', fontSize: 20}}>
                  {this.props.data.trend_desc}
                </Text>
              </View>
              <View
                style={{
                  width: '20%',
                  justifyContent: 'center',
                }}>
                {this.state.showBtn && (
                  <View
                    style={{
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.goToUserProfile(
                          this.props.data.user_trend.api_token,
                        )
                      }>
                      {this.props.data.user_trend.image != null ? (
                        <Image
                          source={{
                            uri:
                              config.IMG_DOMAIN +
                              this.props.data.user_trend.image,
                          }}
                          style={{
                            width: 50,
                            height: 50,
                            marginVertical: 5,
                            borderRadius: 40 / 2,
                            borderWidth: 2,
                          }}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/images/profile.png')}
                          style={{
                            width: 50,
                            height: 50,
                            marginVertical: 5,
                            borderRadius: 40 / 2,
                            borderWidth: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        alignContents: 'center',
                      }}
                      onPress={() => {
                        this.like();
                        this.setState({
                          animateToNumberAdd: !this.state.like
                            ? this.state.animateToNumberAdd + 1
                            : this.state.animateToNumberAdd - 1,
                          like: !this.state.like,
                        });
                      }}>
                      <Image
                        source={
                          this.state.like
                            ? require('../../assets/images/likeDone.png')
                            : require('../../assets/images/like.png')
                        }
                        style={{
                          width: 50,
                          height: 50,
                          marginVertical: 5,
                        }}
                      />
                      <AnimatedNumbers
                        includeComma
                        animateToNumber={this.state.animateToNumberAdd}
                        fontStyle={{
                          fontSize: 20,
                          color: white,
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        alignContents: 'center',
                      }}
                      onPress={() => {
                        this.disLike();
                        this.setState({
                          animateToNumberMin: this.state.dislike
                            ? this.state.animateToNumberMin - 1
                            : this.state.animateToNumberMin + 1,
                          dislike: !this.state.dislike,
                        });
                      }}>
                      <Image
                        source={
                          this.state.dislike
                            ? require('../../assets/images/dislikeDone.png')
                            : require('../../assets/images/dislike.png')
                        }
                        style={{
                          width: 50,
                          height: 50,
                          marginVertical: 5,
                        }}
                      />
                      <AnimatedNumbers
                        includeComma
                        animateToNumber={this.state.animateToNumberMin}
                        fontStyle={{
                          fontSize: 20,
                          color: white,
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{alignItems: 'center', alignContents: 'center'}}
                      onPress={() => {
                        this.setModalStatus();
                      }}>
                      <Image
                        source={require('../../assets/images/comment.png')}
                        style={{width: 50, height: 50, marginVertical: 5}}
                      />
                      <AnimatedNumbers
                        includeComma
                        animateToNumber={this.state.listOfComments.length}
                        fontStyle={{fontSize: 15, color: white}}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      showBtn: !this.state.showBtn,
                    });
                  }}>
                  <Icon
                    type="Ionicons"
                    name="md-ellipsis-horizontal-circle-sharp"
                    style={{
                      color: '#fff',
                      // width: '20%',
                      alignSelf: 'center',
                      fontSize: 45,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {this.state.showBtn && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  width: '70%',
                  alignSelf: 'center',
                  marginBottom: '10%',
                }}>
                <TouchableOpacity onPress={() => this.shareTrend()}>
                  <Image
                    source={require('../../assets/images/share.png')}
                    style={{
                      width: 50,
                      height: 50,
                      marginHorizontal: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.nav.navigate('ReportAProblem', {
                      id: this.props.data.id,
                    })
                  }>
                  <Image
                    source={require('../../assets/images/reperot.png')}
                    style={{
                      width: 50,
                      height: 50,
                      marginHorizontal: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addToFav()}>
                  <Image
                    source={
                      !this.state.favCount
                        ? require('../../assets/images/fav.png')
                        : require('../../assets/images/favDone.png')
                    }
                    style={{
                      width: 50,
                      height: 50,
                      marginHorizontal: 5,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.downloadTrend()}>
                  <Image
                    source={require('../../assets/images/download.png')}
                    style={{
                      width: 50,
                      height: 50,
                      marginHorizontal: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isVisibal}
            onRequestClose={() => {
              this.setModalStatus();
            }}>
            <Animated.View style={[styles.centeredView, {top}]}>
              <View style={styles.modalView}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: width * 0.9,
                    borderBottomColor: orange,
                    borderBottomWidth: 1,
                    padding: 5,
                  }}>
                  <View style={{width: width * 0.07}}>
                    <TouchableOpacity onPress={() => this.setModalStatus()}>
                      <Icon
                        type="AntDesign"
                        name="close"
                        style={{color: orange}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: width * 0.8,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text style={styles.modalText}>
                      {'Comments (' + this.state.listOfComments.length + ')'}
                    </Text>
                  </View>
                </View>
                <ScrollView>
                  {list}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: width * 0.9,
                      padding: 7,
                      margin: 7,
                      alignItems: 'center',
                      borderRadius: 25,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 1,
                        height: 1,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      // elevation: 1,
                    }}>
                    <Image
                      source={require('../../assets/images/person.jpg')}
                      style={{
                        width: 40,
                        height: 40,
                        marginVertical: 5,
                        borderRadius: 40 / 2,
                        borderWidth: 2,
                      }}
                    />
                    <View
                      style={{
                        paddingHorizontal: 10,
                        width: width * 0.7,
                      }}>
                      <Text>{'Islam '}</Text>
                      <TextInput
                        placeholder={'Add Comment '}
                        value={this.state.comment}
                        onChangeText={(text) =>
                          this.setState({
                            comment: text,
                          })
                        }
                      />
                    </View>
                    <TouchableOpacity onPress={() => this.addComment()}>
                      <Icon
                        type="AntDesign"
                        name="plus"
                        style={{color: orange}}
                      />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </Animated.View>
          </Modal>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 15,
    width: width,
    alignItems: 'center',
  },

  modalText: {
    textAlign: 'center',
    color: orange,
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  backgroundVideo: {
    // alignItems: "stretch",
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    left: 5,
    top: 5,
    right: 5,
    bottom: 5,
  },
});

// // import React, {Component, useEffect, useState} from 'react';
// // import {
// //   Dimensions,
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   StatusBar,
// //   TouchableOpacity,
// //   FlatList,
// //   ToastAndroid,
// //   Platform,
// //   AlertIOS,
// //   Header,
// // } from 'react-native';

// // import ViewPager from '@react-native-community/viewpager';
// // import styles from './styles';
// // import TrendBox from '../../components/TrendBox';
// // import Footer from '../../components/Footer';
// // import LoaderBox from '../../components/LoaderBox';
// // import {ScrollView} from 'react-native-gesture-handler';
// // export const {height} = Dimensions.get('window');
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import config from '../../../assets/Config';
// // import {white} from '../../../assets/colors';
// // import Video from 'react-native-video';
// // import { Item } from 'native-base';
// // const TrendsScreen = (props) =>{
// // const [state, setState] =useState({showProgress:false , data:[], paused:true})
// // const [selected,setSelected] = useState('')
// // useEffect(()=>{
// //   Alltrends()
// // },[])

// // const renderitems = async ()=>{
// //   {state.data.map((item , key )=> {
// //     return (
// //       <View  key={key} style={{ flex: 1, height: '100%', backgroundColor: '#010101' ,paddingTop:10}}>

// //   <Video
// //              style={StyleSheet.absoluteFill}
// //           source={{
// //                uri:
// //           "http://nextstageksa.com/mytrend/storage/01C8gQ1suScc0Wx.mp4",
// //              }}
// //                                    resizeMode="contain"
// //             onTouchStart={() => setState({...state, paused:!state.paused})}
// //                                       paused={state.paused}
// //                            repeat />

// //       </View>
// //     )
// //   })}

// // }

// // const  Alltrends = async ()=> {
// //     const userId = await AsyncStorage.getItem('@Trend:token');
// //     setState({...state, showProgress: true});
// //     try {
// //       let response = await fetch(config.DOMAIN + 'alltrends', {

// //         method: 'GET',
// //         headers: {
// //           Authorization: 'Bearer ' + userId,
// //           Accept: 'application/json',
// //           'Content-Type': 'application/json',
// //         },
// //       });
// //       let res = await response.json();
// //       console.log(res.trends)
// //       if (res.status == 400) {
// //         this.error(res.messg);
// //       } else {
// //         setState({...state, showProgress: false ,  data: res.trends });

// //       }
// //     } catch (error) {
// //       console.log(error);
// //       this.setState({showProgress: false});
// //     }
// //   }
// // console.log(state.data )
// //   const renderLoading = () => {
// //         if (state.showProgress) {
// //           return <LoaderBox />;
// //         }
// //       }

// // return(
// //   <View  style={{flex:1}}>

// //   <ViewPager style={{flex:1}} initialPage={1}  orientation={'vertical'}>

// // {state.showProgress === true ? <View>
// // {renderLoading ()}
// // </View>: state.data.map((item , key )=> {
// //     return (
// //       <View  key={key} style={{ flex: 1, height: '100%', backgroundColor: '#010101' ,paddingTop:10}}>

// //   <Video
// //              style={StyleSheet.absoluteFill}
// //           source={{
// //                uri:
// //           "http://nextstageksa.com/mytrend/storage/01C8gQ1suScc0Wx.mp4",
// //              }}
// //                                    resizeMode="contain"
// //             onTouchStart={() => setState({...state, paused:!state.paused})}
// //                                       paused={state.paused}
// //                            repeat />

// //       </View>
// //     )
// //   })}

// //     </ViewPager>

// //     </View>

// // )

// // }

// // export default TrendsScreen;
