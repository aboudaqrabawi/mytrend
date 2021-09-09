import React, {Component, useState, useEffect} from 'react';
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
  ListItem,
} from 'react-native';
import LoaderBox from '../../components/LoaderBox';
import config from '../../../assets/Config';
import Carousel from 'react-native-snap-carousel';
import {white} from '../../../assets/colors/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Icon} from 'native-base';

export const {height, width} = Dimensions.get('window');

const Follow = (props) => {
  const [searchText, setsearchText] = useState('');
  const [Trends, setTrends] = useState('');
  const [Users, setUsers] = useState('');
  useEffect(() => {
    onSearchSubmit();
  }, [searchText]);
  const onSearchSubmit = async () => {
    const userId = await AsyncStorage.getItem('@Trend:token');
    let response = await fetch(config.DOMAIN + 'serch/findText', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + userId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: searchText,
      }),
    });
    let res = await response.json();
    console.log(res);
    setUsers(res.messg[2]);
    setTrends(res.messg[0]);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{backgroundColor: white, marginBottom: 20, flex: 1}}>
        <View
          style={{
            width: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: 10,
          }}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('followerPage', {token: item.api_token})
            }
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff',
              width: width,
              textAlign: 'center',
              color: '#0149AF',
              shadowColor: '#000',
              shadowOpacity: 0.7,
              shadowRadius: 5,
              elevation: 2,
              marginBottom: 10,
            }}>
            {item.image ? (
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#fff',
                }}>
                <Image
                  style={{
                    width: 40,
                    height: 40,

                    padding: 20,
                    borderRadius: 60,
                    borderWidth: 3,
                  }}
                  source={{uri: config.IMG_DOMAIN + item.image}}
                />

                <Text
                  style={{
                    marginTop: '10%',
                    marginLeft: '10%',
                    color: '#0149AF',
                  }}>
                  {' '}
                  {item.name}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#fff',
                }}>
                <Image
                  style={{
                    width: 40,
                    height: 40,

                    padding: 20,
                    borderRadius: 60,
                    borderWidth: 3,
                  }}
                  source={require('./profile.png')}
                />

                <Text
                  style={{
                    marginTop: '10%',
                    marginLeft: '10%',
                    color: '#0149AF',
                  }}>
                  {' '}
                  {item.name}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItems = ({item, index}) => {
    return (
      <View style={{backgroundColor: white, marginBottom: 20, flex: 1}}>
        <View
          style={{
            width: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingLeft: 10,
          }}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('videopage', {id: item.id})
            }
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff',
              width: width,
              textAlign: 'center',
              color: '#0149AF',
              shadowColor: '#000',
              shadowOpacity: 0.7,
              shadowRadius: 5,
              elevation: 2,
              marginBottom: 10,
            }}>
            {item.image ? (
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#fff',
                }}>
                <Image
                  style={{
                    width: 40,
                    height: 40,

                    padding: 20,
                    borderRadius: 60,
                    borderWidth: 3,
                  }}
                  source={{uri: config.IMG_DOMAIN + item.cover_image}}
                />

                <Text
                  style={{
                    marginTop: '10%',
                    marginLeft: '10%',
                    color: '#0149AF',
                  }}>
                  {' '}
                  {item.name}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#fff',
                }}>
                <Image
                  source={require('../../../assets/images/hashColored.png')}
                  style={{
                    width: 15,
                    height: 15,
                    marginRight: 5,
                  }}
                />
                <Image
                  style={{
                    width: 40,
                    height: 40,

                    padding: 20,
                    borderRadius: 60,
                    borderWidth: 3,
                  }}
                  // source={{uri: config.Video + item.cover_image}}
                  source={require('../UserProfile/trends.jpeg')}
                />

                <Text
                  style={{
                    marginTop: '10%',
                    marginLeft: '10%',
                    color: '#0149AF',
                  }}>
                  {' '}
                  {item.title}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, height: height, backgroundColor: white}}>
      <View style={styles.buttonsView}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{color: '#0149AF'}}>
          <Icon name="arrow-back" size={40} color={'#0149AF'} />
        </TouchableOpacity>

        <View>
          <TextInput
            style={{
              backgroundColor: '#fff',
              width: width,
              textAlign: 'center',
              color: '#0149AF',
              shadowColor: '#000',
              shadowOpacity: 0.9,
              shadowRadius: 5,
              elevation: 2,
            }}
            placeholder={strings.search}
            onChangeText={(text) => setsearchText(text)}
            defaultValue={searchText}
          />
        </View>
      </View>
      <ScrollView>
        <View>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginBottom: 10,
                marginLeft: 10,
                color: '#0149AF',
              }}>
              <Image
                source={require('../../../assets/images/hashColored.png')}
                style={{
                  width: 15,
                  height: 15,
                  marginRight: 5,
                }}
              />
              People
            </Text>
          </View>
          <FlatList
            data={Users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />

          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginBottom: 10,
                marginLeft: 10,
                color: '#0149AF',
              }}>
              <Image
                source={require('../../../assets/images/hashColored.png')}
                style={{
                  width: 15,
                  height: 15,
                  marginRight: 5,
                }}
              />
              Trends
            </Text>
          </View>
          <FlatList
            data={Trends}
            renderItem={renderItems}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
      {/* renderItems */}
    </View>
  );
};
export default Follow;
