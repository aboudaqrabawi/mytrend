import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  I18nManager,
} from 'react-native';
import {Root} from 'native-base';

export default class DrawerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <Root>
        <SafeAreaView style={{marginTop: 10, flex: 1}}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={styles.scrollViewContentContainerStyle}
            showsVerticalScrollIndicator={false}>
            <View style={styles.wrappingScrollView}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  this.props.navigation.navigate('Home');
                  this.props.navigation.closeDrawer();
                }}>
                {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={styles.leftIcon}
                    source={require('../../assets/images/homeIcon.png')}
                  />

                  <Text style={styles.text}>{strings.home}</Text>
                </View> */}
                <Image
                  style={[
                    styles.rightIcon,
                    {transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]},
                  ]}
                  source={require('../../assets/images/arrow.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  this.props.navigation.navigate('More'),
                    this.props.navigation.closeDrawer();
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={styles.leftIcon}
                    source={require('../../assets/images/menu.png')}
                  />
                  <Text style={styles.text}>{strings.more}</Text>
                </View>
                <Image
                  style={[
                    styles.rightIcon,
                    {transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]},
                  ]}
                  source={require('../../assets/images/arrow.png')}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    width: '100%',
    paddingBottom: 30,
  },
  wrappingScrollView: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomColor: '#111',
    borderBottomWidth: 1,
  },
  leftIcon: {
    width: 25,
    height: 25,
    tintColor: '#111',
  },
  rightIcon: {
    width: 15,
    height: 15,
    tintColor: '#111',
  },
  text: {
    lineHeight: 40,
    textAlign: 'left',
    marginLeft: 10,
    color: '#111',
  },
});
