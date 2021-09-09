// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
//   ScrollView,
//   TextInput,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import config from '../../../assets/Config';
// import {white} from '../../../assets/colors/index';
// import {Button} from 'native-base';
// import {color} from 'react-native-reanimated';
// import {TouchableOpacity} from 'react-native-gesture-handler';

// export const {width, height} = Dimensions.get('window');

// function searchvideo(props) {
//   const [videos, setVideos] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   useEffect(() => {
//     allVideos();
//   }, []);

//   const allVideos = async () => {
//     const userId = await AsyncStorage.getItem('@Trend:token');
//     let response = await fetch(config.DOMAIN + 'alltrends', {
//       method: 'GET',
//       headers: {
//         Authorization: 'Bearer ' + userId,
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//     });
//     let res = await response.json();

//     setVideos(res.trends);
//   };
//   const search = async () => {
//     if (searchText.length > 0) {
//       const Searched = await videos.filter(
//         (e) =>
//           e.title.toLowerCase().includes(searchText.toLowerCase()) ||
//           e.trend_desc.toLowerCase().includes(searchText.toLowerCase()),
//       );
//       setVideos(Searched);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{marginTop: '10%'}}>
//       <View
//         style={{
//           flex: 1,
//           height: '100%',
//           backgroundColor: '#010101',
//           margin: '10%',
//         }}>
//         <SafeAreaView
//           style={{
//             width: '100%',
//             height: '100%',
//             backgroundColor: white,
//             flex: 1,
//           }}>
//           <View>
//             <TextInput
//               style={{
//                 borderColor: '#999',
//                 borderWidth: 1,
//               }}
//               onChangeText={(text) => setSearchText(text)}
//             />
//             <Button onPress={search}>
//               <Text>search </Text>
//             </Button>
//           </View>
//         </SafeAreaView>
//       </View>
//     </ScrollView>
//   );
// }

// export default searchvideo;
