import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions, StatusBar} from 'react-native';
import Trendbox from '../../components/TrendBox';
import ViewPager from '@react-native-community/viewpager';
export const {height} = Dimensions.get('window');
import Loading from '../../components/LoaderBox';
import Video from 'react-native-video';
import config from '../../../assets/Config';

function videoplayer(props) {
  const data = props.data;
  const [checker, setchecker] = useState(true);
  var selected = 0;
  // console.log(selected);
  var count = 3;

  useEffect(() => {
    setchecker(true);
  }, []);

  const renderitems = () => {
    return (
      <ViewPager
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#000',
        }}
        orientation={'vertical'}
        onPageSelected={(e) => (selected = e.nativeEvent.position)}
        initialPage={0}>
        {data.map((e, key) => {
          return (
            <View
              key={key}
              style={{
                flex: 1,
                height: height,
                backgroundColor: '#010101',
                paddingTop: 10,
              }}>
              <Trendbox data={e} nav={props.nav} />
            </View>
          );
        })}
      </ViewPager>
    );
  };

  return checker ? renderitems() : <Loading />;
}

export default videoplayer;
