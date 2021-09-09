import {StyleSheet} from 'react-native';
import {white} from '../../../assets/colors/index';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: white,
    flex: 1,
  },
  menuButton: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    height: 200,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderColor: '#fff',
    borderBottomColor: '#0149AF',
    borderWidth: 1.5,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    marginRight: 15,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#e9803e',
  },
  username: {
    color: '#111',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  userInteractions: {alignItems: 'center', paddingRight: 10},
  userInteractionsText: {
    color: '#111',
    fontSize: 14,
  },
  imagesGroup: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  itemContainer: {
    marginRight: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 130,
    width: '30%',
    height: 130 * 1.3,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.84,
    elevation: 3,
  },
  itemView: {
    width: '100%',
    height: '100%',
    minWidth: 120,
    minHeight: 120 * 1.3,
  },
  itemPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 15,
  },

  trendTitleView: {
    backgroundColor: '#000',
    opacity: 0.7,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  trendTitleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default styles;
