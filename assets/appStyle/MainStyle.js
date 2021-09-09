import { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { RegularFont, BoldFont } from '../fonts/index';
import { black, gray, white } from '../colors/index';
export const { width, height } = Dimensions.get('window');

export default class MainStyle extends Component {
  static returnStyles(IS_RTL) {
    styles = StyleSheet.create({
      loginView: {
        width: width * 0.9,
        alignSelf: 'center',
        justifyContent: 'center',
      },
      loginImg: {
        alignSelf: 'center',
        marginVertical: width * 0.2,
        resizeMode: 'cover',
      },
      textInput: {
        borderBottomColor: gray,
        borderBottomWidth: 2,
        marginVertical: 10,
      },
      buttonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 30,
      },
      btnView: {
        backgroundColor: black,
        padding: 10,
        borderRadius: 25,
        width: width * 0.43,
        justifyContent: 'center',
      },
      txt: {
        color: white,
        textAlign: 'center',
      },
      userImg: {
        alignSelf: 'center',
        marginVertical: 30,
        resizeMode: 'cover',
        height: height * 0.25,
        width: width * 0.5,
      },
      uploadTxt: {
        textAlign: 'center',
        bottom: 70,
        left: 0,
        color: white,
      },
      btn: {
        marginVertical: 20,
        alignSelf: 'center',
      },
      proImg: {
        height: 150,
        width: 150,
        borderRadius: 150 / 2,
        borderWidth: 1,
        borderColor: '#EDEFF8',
        alignSelf: 'center',
        marginVertical: 30,
        resizeMode: 'cover',
      },
      row: {
        width: width * 0.98,
        alignSelf: 'center',
        marginVertical: 5,
        backgroundColor: white,
        // padding: 10,
        // alignItems: 'center',
        borderColor: gray,
        borderWidth: 2,
        borderRadius: 5
      },
      backgroundVideo: {
        backgroundColor: 'red',
        width: width,
        height: height * 0.3,
      },
      container: {
        flex: 1,
        height: 200,
        width: width * 0.8,
        borderRadius: 15,
        marginVertical: 20,
        alignSelf: 'center',
        overflow: 'hidden',
      },
      video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
      mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        justifyContent: 'center',
      },
    });

    return styles;
  }
}
