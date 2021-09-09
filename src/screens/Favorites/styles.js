import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
    backgroundColor: '#0149AF',
    opacity: 0.7,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  trendTitleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
})

export default styles;