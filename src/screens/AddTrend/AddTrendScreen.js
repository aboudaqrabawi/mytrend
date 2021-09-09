import React, {Component, useState, useEffect} from 'react';
import {
  Container,
  Header,
  Button,
  Text,
  Title,
  Body,
  Right,
  Icon,
  Content,
  List,
  ListItem,
  Form,
  Item,
  Input,
  Label,
  Left,
  View,
  Switch,
  Footer,
} from 'native-base';
import {white} from '../../../assets/colors';

import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import {
  Platform,
  Picker,
  SectionList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
// import firebaseSetup from './setup'
import config from '../../../assets/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import {width} from '../../components/TrendBox';
import Video from 'react-native-video';

const AddTrendScreen = (props) => {
  console.log(props.navigation.getParam('result'));
  const [state, setState] = useState({
    result: props.navigation.getParam('result'),
    video_ext: 'video/mp4',
    ext: 'image/jpg',

    data: ['Economie', 'Sport', 'Cooked', 'My country'],
    name: '',
    lat: '',
    lng: '',
    status: '',
    city: 'amman',
    area: 'rabieh',
    country: '',
  });

  const [cover_image, setcover_image] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedFruits, setSelectedFruits] = useState();
  const [imag, setimag] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [checker, setchecker] = useState({
    public: 'public',
    private: 'private',
  });
  const toggleSwitch = () => setIsEnabled(() => setIsEnabled(!isEnabled));
  const [trendDesc, settrendDesc] = useState('');
  const [title, settitle] = useState('');
  const [interestId, setinterestId] = useState('');
  const [inte, setinte] = useState('');
  Geolocation.getCurrentPosition((info) =>
    setState({...state, lng: info.coords.longitude, lat: info.coords.latitude}),
  );

  useEffect(async () => {
    Geocoder.geocodePosition({lat: state.lat, lng: state.lng}).then((res) => {
      // console.log(res)
      setState({
        ...state,
        country: res[0].country,
        city: res[0].locality,
        area: res[0].streetName,
      });
    });
    Interests();
  }, []);

  async function uploadCover() {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      const result1 = await RNFetchBlob.fs.readFile(file.uri, 'base64');
      setimag(file.uri);
      await setcover_image(result1);

      // console.log(cover_image)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  const Interests = async () => {
    try {
      let response = await fetch(config.DOMAIN + 'interests');
      let res = await response.json();

      await setinte(res[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadData = async (result) => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'addtrend', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        result: state.result,
        video_ext: state.video_ext,
        title: title,
        trend_desc: trendDesc,
        ext: state.ext,
        interest_id: 3,
        lat: state.lat,
        lng: state.lng,
        city: state.city,
        area: state.area,
        country: state.country,
        cover_image: cover_image,
      }),
    });

    let res = await response.json();

    props.navigation.navigate('TrendsScreen');
  };

  return (
    <Container>
      <Content contentContainerStyle={{marginTop: 40}}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '10%',
              shadowColor: '#000',
              shadowOpacity: 0.7,
              shadowRadius: 5,
              elevation: 2,
            }}>
            <View>
              <TextInput style={{textAlign: 'center'}} placeholder="trend" />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '5%',
              shadowColor: '#000',
              shadowOpacity: 0.7,
              shadowRadius: 5,
              elevation: 2,
            }}>
            <View>
              <TextInput
                style={{textAlign: 'center'}}
                placeholder="title"
                onChangeText={(text) => settitle(text)}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '5%',
              shadowColor: '#000',
              shadowOpacity: 0.7,
              shadowRadius: 5,
              elevation: 2,
            }}>
            <View>
              <TextInput
                style={{}}
                placeholder="video description"
                onChangeText={(text1) => settrendDesc(text1)}
                multiline={true}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '5%',
              shadowColor: '#000',
              shadowOpacity: 0.7,
              shadowRadius: 5,
              elevation: 2,
            }}>
            <View>
              <Picker
                selectedValue={selectedValue}
                style={{
                  height: 50,
                  width: 200,
                  textAlign: 'center',
                  color: '#0149AF',
                  fontWeight: 'bold',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setinterestId(itemValue) && setSelectedValue(itemIndex)
                }>
                <Picker.Item label="choose interest " value="0" />
                {inte != '' &&
                  inte.map((e, key) => {
                    return <Picker.Item label={e.name_en} value={e.id} />;
                  })}
              </Picker>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              height: 70,
              marginTop: '10%',
              shadowColor: '#000',
              shadowOpacity: 0.7,
              shadowRadius: 5,
              elevation: 2,
            }}>
            <TouchableOpacity onPress={() => uploadCover()} style={{top: 20}}>
              {imag ? (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#0149AF',
                      fontWeight: 'bold',
                    }}>
                    Upload a cover image
                  </Text>
                  <Image
                    source={{uri: imag}}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#0149AF',
                      fontWeight: 'bold',
                    }}>
                    Upload a cover image
                  </Text>
                  <Image
                    source={require('../../../assets/images/upload.jpeg')}
                    style={{
                      width: 50,
                      height: 50,
                      marginLeft: '20%',

                      bottom: 10,
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '5%',
              shadowColor: '#000',
              shadowOpacity: 0.7,
              shadowRadius: 5,
              elevation: 2,
            }}>
            <View
              style={{
                marginRight: '20%',
                flexDirection: 'column',
                top: 15,
              }}>
              <View style={{marginTop: '50%'}}>
                {isEnabled === true ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#0149AF',
                      fontWeight: 'bold',
                    }}>
                    {checker.public}
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#0149AF',
                      fontWeight: 'bold',
                    }}>
                    {checker.private}
                  </Text>
                )}
              </View>
              <Switch
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                }}
                trackColor={{false: '#767577', true: '#0149AF'}}
                thumbColor={isEnabled ? '#0149AF' : '#0149AF'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View
              style={{
                marginLeft: '10%',
                shadowColor: '#000',
                shadowOpacity: 0.7,
                shadowRadius: 5,
                elevation: 2,
              }}>
              <Video
                style={{height: 70, width: 70}}
                source={{
                  uri: 'https://www.youtube.com/embed/zWYi1ysvLjo',
                }}
                resizeMode="contain"
                repeat={true}
              />
            </View>
          </View>
        </View>
      </Content>
      <Footer style={{backgroundColor: '#0149AF'}}>
        <Button
          onPress={uploadData}
          style={{
            backgroundColor: '#0149AF',
            width: '100%',
            justifyContent: 'center',
            height: '100%',
          }}>
          <Text style={{textAlign: 'center'}}> upload </Text>
          <Icon
            style={{backgroundColor: '#0149AF'}}
            name="cloud-upload"
            type="MaterialIcons"
          />
        </Button>
      </Footer>
    </Container>
  );
};

export default AddTrendScreen;
