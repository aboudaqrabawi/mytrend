import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {I18nManager, Image, Dimensions} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import followerPage from './Followings/followerPage';
import Login from './Login/LoginScreen';
import RegisterScreen from './Register/RegisterScreen';
import HomeScreen from './Home/HomeScreen';
import MyProfileScreen from './MyProfile/MyProfileScreen';
import MapScreen from './Map/MapScreen';
import SelectInterestings from './SelectInterestings/SelectInterestings';
import ChatIndi from './Followings/chatscreen';
// import TrendsScreen from "./Login/google.js";
import newpass from './ForgotPassword/newpass';
import Follow from './searchFollower/follow';
import UserProfileScreen from './UserProfile/UserProfileScreen';
import Account from './UserProfile/account';
import EditBio from './UserProfile/editbio';
import Code from './ForgotPassword/code';
import ChatssScreen from '../chat/homescreen/chatsscreen';
import ReportAuserProblem from './ReportAProblem/ReportAuserProblem';
import MoreScreen from './More/MoreScreen';
import RegisterFb from './Register/RegisterFB';
import ReportAProblemScreen from './ReportAProblem/ReportAProblemScreen';
import SplashScreen from './SplashScreen/SplashScreen';
import AddTrendScreen from './AddTrend/AddTrendScreen';
import ChatScreen from '../chat/homescreen/chatscreen';
import editUser from './UserProfile/editUser';
import ForgotPassword from './ForgotPassword/index';
import NotificationScreen from './Notifications/index';
import ChangePassword from './ChangePassword/index';
import MyIntrests from './MyIntrests/index';
import Followings from './Followings/index';
import Favorites from './Favorites/index';
import Updateinterest from './MyIntrests/Updateinterest';
import Strings from '../../assets/languages/Strings';
import MainStyle from '../../assets/appStyle/MainStyle';
import contactUs from './More/contactUs';
import aboutUs from './More/aboutUs';
import registergoogle from './Register/RegisterGo';
import Blocked from './More/blocked';

import privacyPolicy from './More/privacyPolicy';
import termsAndConditions from './More/termsAndConditions';
import {Button} from 'react-native';
import TrendsScreen from './Trends/TrendsScreen';
import Followers from './Followings/followers';
import followerscreen from './Followings/followerscreen';
import searchVid from './searchvideo/searchvideo';
import uploadVideo from './AddTrend/uploadvideo';
import recordVideo from './AddTrend/recordvideo';
import videopage from './UserProfile/videopage';
import signingfire from '../chat/chatss/user';
import view from './Trends/view';
import loginfirebase from '../chat/chatss/login';
import HomeFire from '../components/feed/video';
import Dashboard from '../chat/homescreen/home';
import Videopager from './AddTrend/videopage';
import Videoplayer from './Trends/videoplayer';
import Google from './Login/google.js';
var IS_RTL = I18nManager.isRTL;
const {width: width, height: height} = Dimensions.get('window');

export default class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    strings = IS_RTL ? Strings.ar : Strings.enUS;
    styles = MainStyle.returnStyles(IS_RTL);
    lang = IS_RTL ? true : false;

    const Authload = {
      TrendsScreen: {
        screen: TrendsScreen,
        navigationOptions: {
          headerShown: false,
          title: 'Trends',

          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },
      Dashboard: {
        screen: Dashboard,
        navigationOptions: {
          headerShown: false,
        },
      },
      Updateinterest: {
        screen: Updateinterest,
        navigationOptions: {
          title: 'Updateinterest',
          headerShown: false,
        },
      },

      loginfirebase: {
        screen: loginfirebase,
        navigationOptions: {
          title: 'Updateinterest',
          headerShown: false,
        },
      },

      Videopager: {
        screen: Videopager,
        navigationOptions: {
          title: 'contactUs',
          headerShown: false,
        },
      },

      Blocked: {
        screen: Blocked,
        navigationOptions: {
          title: 'Blocked Users',
          headerShown: true,
        },
      },

      contactUs: {
        screen: contactUs,
        navigationOptions: {
          title: 'contactUs',
          headerShown: false,
        },
      },

      aboutUs: {
        screen: aboutUs,
        navigationOptions: {
          title: 'aboutUs',
          headerShown: false,
        },
      },
      privacyPolicy: {
        screen: privacyPolicy,
        navigationOptions: {
          title: 'privacyPolicy',
          headerShown: false,
        },
      },
      termsAndConditions: {
        screen: termsAndConditions,
        navigationOptions: {
          title: 'termsAndConditions',
          headerShown: false,
        },
      },

      editUser: {
        screen: editUser,
        navigationOptions: {
          title: 'editUser',
          headerShown: false,
        },
      },

      videopage: {
        screen: videopage,
        navigationOptions: {
          title: 'video',
          headerShown: false,
        },
      },

      uploadVideo: {
        screen: uploadVideo,
        navigationOptions: {
          title: 'upload',

          headerShown: false,
        },
      },
      recordVideo: {
        screen: recordVideo,
        navigationOptions: {
          title: 'record',

          headerShown: false,
        },
      },

      Chat: {
        screen: HomeFire,
        navigationOptions: {
          headerShown: false,

          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      ChatssScreen: {
        screen: ChatssScreen,
        navigationOptions: {
          headerShown: false,

          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      ChatIndi: {
        screen: ChatIndi,
        navigationOptions: {
          headerShown: false,

          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      ReportAuserProblem: {
        screen: ReportAuserProblem,
        navigationOptions: {
          headerShown: false,

          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      followerPage: {
        screen: followerPage,
        navigationOptions: {
          title: 'profile',
          headerShown: false,
        },
      },

      Followings: {
        screen: Followings,
        navigationOptions: {
          title: 'Following ',

          headerShown: true,
        },
      },

      MyProfileScreen: {
        screen: HomeScreen,
        navigationOptions: {
          title: '',
          headerShown: false,
        },
      },

      ReportAProblem: {
        screen: ReportAProblemScreen,
        navigationOptions: {
          headerShown: false,
          title: 'Report A Problem',

          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      MapScreen: {
        screen: MapScreen,
        navigationOptions: {
          title: 'Map',

          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      Notifications: {
        screen: NotificationScreen,
        navigationOptions: {
          title: 'Notifications',

          headerShown: true,
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      Favorites: {
        screen: Favorites,
        navigationOptions: {
          title: 'Favorites',

          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      AddTrendScreen: {
        screen: AddTrendScreen,
        navigationOptions: {
          title: 'Add Trend',
          headerShown: false,

          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      Account: {
        screen: Account,
        navigationOptions: {
          title: 'accout and privacy',
          headerShown: false,

          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      EditBio: {
        screen: EditBio,
        navigationOptions: {
          title: 'edit bio',

          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      followerscreen: {
        screen: followerscreen,
        navigationOptions: {
          title: 'Add Trend',

          headerShown: false,
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      Follow: {
        screen: Follow,
        navigationOptions: {
          title: 'Search for friends',
          headerShown: false,
        },
      },
      Followers: {
        screen: Followers,
        navigationOptions: {
          title: 'followers',
          headerShown: true,
          headerTitle: 'Followers',
        },
      },

      ChangePassword: {
        screen: ChangePassword,
        navigationOptions: {
          title: 'followers',
          headerShown: false,
        },
      },

      NotificationScreen: {
        screen: NotificationScreen,
        navigationOptions: {
          headerShown: false,

          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },

      signingfire: {
        screen: signingfire,
        navigationOptions: {
          headerShown: false,

          drawerIcon: ({focused, size}) => (
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 10, height: 10}}
            />
          ),
        },
      },
    };

    const screen = {
      Login: {
        screen: Login,
        navigationOptions: {
          headerShown: false,
        },
      },

      Register: {
        screen: RegisterScreen,
        navigationOptions: {
          headerTitle: strings.create,
          headerStyle: {
            elevation: 0,
          },
        },
      },
      RegisterFb: {
        screen: RegisterFb,
        navigationOptions: {
          title: 'upload',

          headerShown: false,
        },
      },

      registergoogle: {
        screen: registergoogle,
        navigationOptions: {
          title: 'upload',

          headerShown: false,
        },
      },

      ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
          headerShown: false,
        },
      },

      SelectInterestings: {
        screen: SelectInterestings,
        navigationOptions: {
          headerShown: false,
        },
      },
      Code: {
        screen: Code,
        navigationOptions: {
          headerShown: false,
        },
      },

      newpass: {
        screen: newpass,
        navigationOptions: {
          headerShown: false,
        },
      },
    };
    Authload;
    const authapp = createStackNavigator(Authload);
    const MainNavigatorNav = createStackNavigator(screen);

    const DrawerStack = createDrawerNavigator(
      {
        TrendsScreen: {
          screen: TrendsScreen,
          navigationOptions: {
            headerShown: false,
            title: 'Trends',

            drawerIcon: ({focused, size}) => (
              <Image
                source={require('../../assets/images/arrow.png')}
                style={{width: 10, height: 10}}
              />
            ),
          },
        },

        MyIntrests: {
          screen: MyIntrests,
          navigationOptions: {
            headerShown: true,
            title: 'My Interests',

            drawerIcon: ({focused, size}) => (
              <Image
                source={require('../../assets/images/arrow.png')}
                style={{width: 10, height: 10}}
              />
            ),
          },
        },

        ReportAuserProblem: {
          screen: ReportAuserProblem,
          navigationOptions: {
            headerShown: false,
            title: 'Report a problem',

            drawerIcon: ({focused, size}) => (
              <Image
                source={require('../../assets/images/arrow.png')}
                style={{width: 10, height: 10}}
              />
            ),
          },
        },

        Settings: {
          screen: MoreScreen,
          navigationOptions: {
            headerShown: false,

            drawerIcon: ({focused, size}) => (
              <Image
                source={require('../../assets/images/arrow.png')}
                style={{width: 10, height: 10}}
              />
            ),
          },
        },

        Favorites: {
          screen: Favorites,
          navigationOptions: {
            headerShown: false,

            drawerIcon: ({focused, size}) => (
              <Image
                source={require('../../assets/images/arrow.png')}
                style={{width: 10, height: 10}}
              />
            ),
          },
        },
        Notifications: {
          screen: NotificationScreen,
          navigationOptions: {
            title: 'Notifications',

            headerShown: true,
            drawerIcon: ({focused, size}) => (
              <Image
                source={require('../../assets/images/arrow.png')}
                style={{width: 10, height: 10}}
              />
            ),
          },
        },

        UserProfile: {
          screen: UserProfileScreen,
          navigationOptions: {
            headerShown: false,
            title: 'UserProfileScreen',
          },
        },
      },
      {
        // contentComponent: props => <DrawerContent {...props} />,
        drawerPosition: I18nManager.isRTL ? 'right' : 'left',
        drawerType: 'front',
        drawerWidth: width * 0.7,
        contentOptions: {
          activeTintColor: '#fff',
          activeBackgroundColor: '#fff',
          itemsContainerStyle: {
            marginTop: '50%',
          },
          iconContainerStyle: {
            opacity: 1,
          },
        },
      },
    );

    const RootNavigator = createAppContainer(
      createSwitchNavigator({
        routeOne: SplashScreen,
        routeTwo: MainNavigatorNav,

        routeThree: authapp,
        routeFour: DrawerStack,
      }),
    );
    return <RootNavigator />;
  }
}
