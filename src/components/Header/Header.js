import React, {Component} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  I18nManager,
  SafeAreaView,
} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: 85,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: '#111',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          shadowOpacity: 0.3,
          shadowColor: '#000',
          shadowOffset: {
            width: 3,
            height: 3,
          },
          elevation: 3,
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            width: '90%',
          }}>
          {this.props.backButton ? (
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                width: 25,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/images/arrow.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  tintColor: '#fff',
                  transform: [{scaleX: I18nManager.isRTL ? 1 : -1}],
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.props.navigation.toggleDrawer()}
              style={{
                width: 25,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/images/menu.png')}
                style={{width: '100%', height: '100%', tintColor: '#fff'}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          )}

          <Text
            style={{
              fontSize: 25,
              // fontFamily: 'DINNextMedium',
              color: 'white',
            }}>
            {this.props.title != null && this.props.title != undefined
              ? this.props.title
              : ''}
          </Text>
          <View>
            {this.props.backButton ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.toggleDrawer()}
                style={{
                  width: 25,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/images/menu.png')}
                  style={{width: '100%', height: '100%', tintColor: '#fff'}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
