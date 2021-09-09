import React, {Component} from 'react';
import {
  View,
  Image,
  StatusBar,
  Text,
  TextInput,
  ToastAndroid,
  Platform,
  AlertIOS,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {white, gray} from '../../../assets/colors';
import Icon from 'react-native-vector-icons/Fontisto';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProgress: false,
      userName: this.props.navigation.getParam('email'),
      name: this.props.navigation.getParam('name'),
      email: this.props.navigation.getParam('email'),
      phone: '',
      password: '123456',
      password2: '123456',
      major: '',
      uploadedImg: '',
      age: '',
      privacySelect: false,
    };
  }
  async uploadImg() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      this.setState({
        uploadedImg: image,
      });
    });
  }
  error(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG);
    } else {
      AlertIOS.alert(msg);
    }
  }
  Register() {
    if (
      this.state.userName != '' &&
      this.state.name != '' &&
      this.state.password != '' &&
      this.state.password2 != '' &&
      this.state.phone != ''
    ) {
      if (this.state.password == this.state.password2) {
        this.props.navigation.navigate('SelectInterestings', {
          name: this.state.name,
          userName: this.state.userName,
          email: this.state.email,
          major: this.state.major,
          password: this.state.password,
          phone: this.state.phone,
          image:
            'data:' +
            this.state.uploadedImg.mime +
            ';base64,' +
            this.state.uploadedImg.data,
          ext: this.state.uploadedImg.mime,
          age: this.state.age,
        });
      } else {
        this.error(strings.passwordNotMatch);
      }
    } else {
      this.error(strings.errorTxt);
    }
  }

  onPrivacyToggle = () => {
    this.setState({privacySelect: !this.state.privacySelect});
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: white}}>
        <StatusBar barStyle="light-content" backgroundColor={gray} />
        <View style={styles.loginView}>
          <View>
            <TouchableOpacity onPress={() => this.uploadImg()}>
              {this.state.uploadedImg == '' && (
                <Image
                  source={require('../../../assets/images/user.png')}
                  style={styles.userImg}
                />
              )}
              {this.state.uploadedImg != '' && (
                <Image
                  source={{
                    uri: `data:${this.state.uploadedImg.mime};base64,${this.state.uploadedImg.data}`,
                  }}
                  style={styles.proImg}
                />
              )}
            </TouchableOpacity>
          </View>

          {this.state.uploadedImg == '' && (
            <Text style={styles.uploadTxt}>{strings.uploadImg}</Text>
          )}

          <TextInput
            style={styles.textInput}
            placeholder={strings.userName + ' @'}
            placeholderTextColor={gray}
            onChangeText={(text) => this.setState({userName: text})}
            defaultValue={this.state.userName}
            returnKeyType="next"
          />

          <TextInput
            style={styles.textInput}
            placeholder={strings.name}
            placeholderTextColor={gray}
            onChangeText={(text) => this.setState({name: text})}
            defaultValue={this.state.name}
            returnKeyType="next"
          />
          <TextInput
            style={styles.textInput}
            placeholder={strings.email}
            placeholderTextColor={gray}
            onChangeText={(text) => this.setState({email: text})}
            defaultValue={this.state.email}
            returnKeyType="next"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Age"
            placeholderTextColor={gray}
            onChangeText={(text) => this.setState({age: text})}
            defaultValue={this.state.age}
            returnKeyType="next"
            keyboardType="number-pad"
            maxLength={2}
          />

          <TextInput
            style={styles.textInput}
            placeholder={strings.Phone}
            placeholderTextColor={gray}
            onChangeText={(text) => this.setState({phone: text})}
            defaultValue={this.state.phone}
            returnKeyType="next"
            keyboardType="phone-pad"
          />
          <TouchableWithoutFeedback onPress={() => this.onPrivacyToggle()}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Icon
                name={
                  this.state.privacySelect
                    ? 'checkbox-active'
                    : 'checkbox-passive'
                }
                size={10}
                style={{marginHorizontal: 5}}
              />
              <Text>
                By clicking Sign Up, you agree to our Terms, Data Policy and
                Cookie Policy. You may receive Email notifications from us and
                can opt out at any time.
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.btn}>
            <TouchableOpacity
              onPress={() =>
                this.state.privacySelect ? this.Register() : null
              }>
              <View
                style={[
                  styles.btnView,
                  {
                    backgroundColor: '#0149AF',
                    opacity: this.state.privacySelect ? 1 : 0.6,
                  },
                ]}>
                <Text style={styles.txt}>{strings.create}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
