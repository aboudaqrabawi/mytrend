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
} from 'react-native';
import {Icon} from 'native-base';
import {white} from '../../../assets/colors/index';
import Footer from '../../components/Footer';
import styles from './styles';
import config from '../../../assets/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    };
  }
  componentDidMount() {
    this.getAllTrends();
  }
  // componentDidUpdate() {
  //   this.getAllTrends();
  // }

  onpressModel() {
    this.setState({show: !this.state.show});
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

    let response2 = await fetch(config.DOMAIN + 'addfollow', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        user_id: id,
      }),
    });
    let res2 = await response2.json();
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
    let res = response.json();
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
            <Image
              source={{uri: config.IMG_DOMAIN + this.state.data[0].image}}
              // source={{uri:
              //   config.Video}}
              style={styles.profileImage}
            />
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text style={styles.username}>{item.user_name}</Text>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
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
                    <Text style={styles.userInteractionsText}>Following</Text>
                  </View>
                </TouchableWithoutFeedback>
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
                    <Text style={styles.userInteractionsText}>Followers</Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.userInteractions}>
                  <Text
                    style={[styles.userInteractionsText, {fontWeight: 'bold'}]}>
                    {this.state.likes.length}
                  </Text>
                  <Text style={styles.userInteractionsText}>Likes</Text>
                </View>
                <View style={styles.userInteractions}>
                  <Text
                    style={[styles.userInteractionsText, {fontWeight: 'bold'}]}>
                    {'15'}
                  </Text>
                  <Text style={styles.userInteractionsText}>Views</Text>
                </View>
              </View>
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

// import React, { useState , useEffect } from 'react';
// import {
//   FlatList,
//   ScrollView,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   AlertIOS,
//   SafeAreaView,
//   StatusBar,
//   Platform,
//   I18nManager,
//   ToastAndroid,
//   TouchableWithoutFeedback,
//   TextInput,
//   Keyboard,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {white} from '../../../assets/colors/index';
// import Footer from '../../components/Footer';
// import styles from './styles';
// import config from '../../../assets/Config';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const  UserProfileScreen = (props)=> {

//    const [state,setState] = useState({
//       activeIndex: 0,
//       follow: 0,
//       data: [],
//       searchText:'',
//       Allusers:'',
//       following:[],
//       followers:'',
//       likes:'',
//       number:1,

//     })

//     useEffect(() => {

//         getAllTrends()
// 	},[]);

//   const  getAllTrends= async () => {
//     const userId = await AsyncStorage.getItem('@Trend:token');
//     console.log(userId)
//     setState({showProgress: true});
//     try {
//       let response = await fetch(config.DOMAIN + 'usertrendinfo', {
//         method: 'GET',
//         headers: {
//           Authorization: 'Bearer ' + props.navigation.state.params.token,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });
//       let res = await response.json();

//       if (res.status == 400) {
//         error(res.messg);
//       } else {
//         console.log(res.comments)
//         setState({ ...state,
//           showProgress: false,
//           data: res.comments,
//           following:res.comments[0].followin_for_user,
//           followers: res.comments[0].user_followed   ,
//           likes:res.comments[0].user_like,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       setState({showProgress: false});
//     }

//   }

//   ///////////////////////////////////////////////////////////////////////////////////////////////////
//   ///////////////////////////////////////////////////////////////////////////////////////////////////

//   const renderAllItems = ({item}) => (
//     <View style={{backgroundColor: white, marginBottom: 20, flex: 1}}>
//       {item.items != '' ? (
//         <View style={{backgroundColor: white}}>
//           <View style={styles.profileInfoContainer}>
//             <Image
//               // source={require('../../../assets/images/person.jpg')}
//               source={require('./profile.png')}
//               style={styles.profileImage}
//             />
//             <View
//               style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
//               <Text style={styles.username}>{item.user_name}</Text>
//               <View style={{flexDirection: 'row', marginBottom: 20}}>
//                 <TouchableWithoutFeedback
//                   onPress={() =>
//                     props.navigation.navigate('Followings',{following:state.following})
//                   }>
//                   <View style={styles.userInteractions}>
//                     <Text
//                       style={[
//                         styles.userInteractionsText,
//                         {fontWeight: 'bold'},
//                       ]}>
//                           {state.following.length}
//                     </Text>
//                     <Text style={styles.userInteractionsText}>Following</Text>
//                   </View>
//                 </TouchableWithoutFeedback>
//                 <TouchableWithoutFeedback
//                   onPress={() =>
//                     props.navigation.navigate('Followers', {followers: state.followers})
//                   }>
//                   <View style={styles.userInteractions}>
//                     <Text
//                       style={[
//                         styles.userInteractionsText,
//                         {fontWeight: 'bold'},
//                       ]}>
//                       {state.followers.length}
//                     </Text>
//                     <Text style={styles.userInteractionsText}>Followers</Text>
//                   </View>
//                 </TouchableWithoutFeedback>
//                 <View style={styles.userInteractions}>
//                   <Text
//                     style={[styles.userInteractionsText, {fontWeight: 'bold'}]}>
//                     {state.likes.length}
//                   </Text>
//                   <Text style={styles.userInteractionsText}>Likes</Text>
//                 </View>
//                 <View style={styles.userInteractions}>
//                   <Text
//                     style={[styles.userInteractionsText, {fontWeight: 'bold'}]}>
//                     {'15'}
//                   </Text>
//                   <Text style={styles.userInteractionsText}>Views</Text>
//                 </View>
//               </View>
//               <TouchableOpacity style={styles.followButton}   onPress={() =>
//                     props.navigation.navigate('editUser')
//                   }>
//                 <Text style={styles.followText}>Edit Profile</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={styles.imagesGroup}>
//             {item.user_trend.map((data, index) => {
//               return (
//                 <TouchableOpacity style={styles.itemContainer} key={index}>
//                   {data.cover_image != null ? (
//                     <View style={styles.itemView}>
//                       <Image
//                         source={require('./trends.jpeg')}
//                         // source={require('../../../assets/images/person.jpg')}
//                         style={styles.itemPhoto}
//                       />
//                       <View style={styles.trendTitleView}>
//                         <Image
//                           source={require('../../../assets/images/hashColored.png')}
//                           style={{width: 15, height: 15, marginRight: 5}}
//                         />
//                         <Text style={styles.trendTitleText}>{data.title}</Text>
//                       </View>
//                     </View>
//                   ) : (
//                     <View style={styles.itemView}>
//                       <Image
//                         source={require('../../../assets/images/person.jpg')}
//                         style={styles.itemPhoto}
//                       />
//                       <View style={styles.trendTitleView}>
//                         <Image
//                           source={require('../../../assets/images/hashColored.png')}
//                           style={{width: 15, height: 15, marginRight: 5}}
//                         />
//                         <Text style={styles.trendTitleText}>{data.title}</Text>
//                       </View>
//                     </View>
//                   )}
//                 </TouchableOpacity>
//               );
//             })}
//           </View>
//         </View>
//       ) : null}
//     </View>
//   );

//   ///////////////////////////////////////////////////////////////////////////////////////////////////
//   ///////////////////////////////////////////////////////////////////////////////////////////////////

//     return (

//       <View style={{flex: 1}}>
//         <View
//           style={{
//             backgroundColor: '#666',
//             height: Platform.OS === 'ios' ? 35 : StatusBar.currentHeight,
//           }}>
//           <StatusBar translucent backgroundColor={'#666'} />
//         </View>

//         <SafeAreaView style={styles.container}>

//           <TouchableOpacity
//             onPress={() => props.navigation.toggleDrawer()}
//             style={styles.backButton}>

//             <Icon name="menu" size={40} color={'#0149AF'} />

//           </TouchableOpacity>
//           <TouchableOpacity style={{marginLeft:'70%'}}
//           onPress={()=>props.navigation.navigate("Follow")}
//           >

// <Text>find friends </Text>

// </TouchableOpacity>

//           <FlatList
//             style={{flex: 1, backgroundColor: 'white'}}
//             data={state.data}
//             renderItem={renderAllItems}
//             keyExtractor={(item) => item.id}
//           />
//         </SafeAreaView>

//         <View>
//           <Footer nav={props.navigation} />
//         </View>
//       </View>
//     );
//   }

// export default UserProfileScreen;
