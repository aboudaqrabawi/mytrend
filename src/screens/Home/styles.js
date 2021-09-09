import {StyleSheet} from 'react-native';
import {white} from '../../../assets/colors/index';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: white,
    flex: 1,
  },
  searchBar: {
    borderRadius: 25,
    borderColor: '#999',
    borderWidth: 1,
    width: '60%',
    minHeight: 40,
    maxHeight: 50,
    alignSelf: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  searchText: {
    color: '#999',
    fontSize: 19,
    textAlign: 'center',
    width: '82%',
  },
  swiperContainer: {
    backgroundColor: white,
    borderRadius: 10,
    marginHorizontal: 1,
    height: 270,
    marginVertical: 5,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  swiperPhoto: {width: '100%', height: '100%'},

  itemContainer: {
    flex: 1,
    padding: 15,
    borderWidth: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: white,
    backgroundColor: 'transparent',
    width: 150,
  },

  itemPhoto: {
    width: 145,
    height: 145 * 1.2,
    resizeMode: 'stretch',
    borderRadius: 15,
  },
});

export default styles;
