import {StyleSheet, Dimensions} from 'react-native';
import {white} from '../../../assets/colors/index';
export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333',
  },

  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(1, 73, 175, 0.5)',
    position: 'absolute',
    bottom: height * 0.9,
    alignSelf: 'center',
    width: 500,
    margin: 10,
  },
  iconTxt: {
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
    margin: '0.5%',
    fontWeight: 'bold',
  },
});

export default styles;
