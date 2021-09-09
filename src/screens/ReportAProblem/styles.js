import {StyleSheet, I18nManager} from 'react-native';

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%', flex: 1},
  keyboardAvoidingView: {flex: 1, justifyContent: 'center'},
  scrollViewContentContainerStyle: {
    color: '#fff',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
    paddingBottom: 30,
  },

  textInputView: {alignSelf: 'center', width: '90%'},

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 45,
    borderRadius: 40,
    backgroundColor: '#0149AF',
    marginTop: 5,
    padding: 2,
  },
  sendText: {
    fontSize: 25,
    color: 'white',
    //fontFamily: "DINNextMedium",
    textAlign: 'center',
  },

  reportInputBox: {
    fontSize: 15,
    color: '#111',
    //fontFamily: "DINNextMedium",
    borderWidth: 1,
    borderColor: '#0149AF',
    borderRadius: 15,
    marginTop: 10,
    padding: 10,
    height: 120,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});

export default styles;
