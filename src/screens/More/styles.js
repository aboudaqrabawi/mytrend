import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  headerTitleView: {
    backgroundColor: '#0149AF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  headerTitleText: {
    paddingStart: 10,
    color: '#fff',
    fontWeight: 'bold',
    width: '100%',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    padding: 5,
    // borderBottomColor: '#999',
    // borderBottomWidth: 1,
  },
  text: {
    lineHeight: 40,
    textAlign: 'left',
    //fontFamily: "DINNextMedium",
    marginLeft: 10,
  },
});

export default styles;
