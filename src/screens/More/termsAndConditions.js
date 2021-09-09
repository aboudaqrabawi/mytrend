import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';

const termsAndConditions = (props) => {
  return (
    <Container>
      <Header
        style={{backgroundColor: '#0149AF'}}
        androidStatusBarColor="#0149AF">
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.navigate('UserProfile')}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title> TERMS AND CONDITIONS</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text
          style={{
            fontSize: 16,
            margin: 15,
            padding: 10,
            color: '#00',
            fontSize: 18,

            lineHeight: 30,
          }}>
          TERMS AND CONDITIONS Thank you for using “MyTrend”, an app specially
          created for You. By using our app, you agree to be bound by the
          following conditions so please read them carefully. • The use of our
          online app indicates your acceptance of these terms and conditions;
          therefore, we ask our dear user to read these terms of service
          thoroughly before beginning your journey at our app. • All materials,
          information and contents on the MyTrend app are displayed as they, and
          your use of the app, its services or any of our products is your
          personal choice and responsibility. • “MyTrend” app and its management
          are not bound by any liability or compensation for any errors
          resulting from your use of the app or one of its services or contents,
          and it completely disclaims any responsibility for any contracts or
          agreements that are made or conducted independently between its users
          or any other party. • Your use and browsing of this app mean you fully
          accept all the terms and conditions on this page, however, if you do
          not agree to the terms previously stated, we’re afraid you are not
          allowed to use the app or view its contents. Registration and usage
          requirements You must be a registered member to access our services or
          some of the app's features. When you register, you will provide us
          with your personal information including your name, address and a
          valid email address. You must ensure that this information is accurate
          and correct. By using “MyTrend” app and its associated functions, you
          give your explicit consent for us to send marketing messages directly
          to your provided email address, from which you can unsubscribe at any
          time. The application is available for the age over 13 years old. No
          user who does not meet this requirement can’t register or use our app.
          Content We seek through our application this to support meaningful
          Arabic content by preventing us strictly from sharing any content that
          includes: Clips, videos, or pornographic or offensive images,
          sensitive clips such as violence, murder or offense, sharing content
          that incites racism or discrimination in any way. By using our
          application and its associated functions, you give your explicit
          consent for us to send messages directly to the email address you
          provide, from which you can unsubscribe at any time. Update terms of
          use and privacy policy “MyTrend” has every right to update, change or
          replace any part of the terms of use and Privacy Policy by posting
          updates and changes to our app. It is your responsibility to check our
          app periodically for changes. Your continued use of our app after the
          posting of any changes to the Terms of Use and Privacy Policy
          constitutes acceptance of those changes.
        </Text>
      </Content>
    </Container>
  );
};

export default termsAndConditions;
