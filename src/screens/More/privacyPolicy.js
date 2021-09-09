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
const privacyPolicy = (props) => {
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
          <Title>Privacy Policy</Title>
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
          Privacy Policy The privacy policy under which “MyTrend” operates
          ensures a total protection for all information collected about users
          of our application , as all this data is encrypted, no outsider nor
          intruder is allowed to see it, it is limited to the managers of the
          users service located on “MyTrend” app only. The entry of data by the
          user during the creation of his personal account through which he can
          access the app and benefit from its various services, as well as other
          information called contact information, which helps the customers
          service team and users to communicate with the user such as the phone
          or landline number, in addition to the Email address, which allows
          receiving exclusive messages and offers through it. Collecting
          personal information At the “MyTrend” , we collect personal
          information such as: IP addresses, dates and time of using our app ,
          as this contributes to the development and improvement of the app for
          all visitors and users. • We may use your personal data for other
          purposes which you have consented to at the time of providing your
          data. • As necessary for certain interests, which include the
          following: to deal with any inquiries or complaints you make. • to
          administer our app, to better understand how users interact with our
          platform and ensure that our app is presented in the most effective
          manner for you and for your device. • to share personal data among our
          affiliated businesses for administrative purposes, for providing user
          or member services and in relation to our sales and marketing
          activities. • we may anonymize, aggregate and de-identify the data
          that we collect and use such anonymized, aggregated and de-identified
          data for our own internal business purposes, including sharing it with
          our current and prospective members, business partners, our affiliated
          businesses, agents and other third parties for commercial, statistical
          and market research purposes, for example to allow those parties to
          analyses patterns among groups of people, and conducting research on
          demographics, interests and behavior. All this information that is
          collected about the user, “MyTrend” app is responsible for protecting
          it by all available means by encrypting all data, so that it is immune
          to potential electronic breaches until the user finishes browsing our
          app. Holding personal information We may retain your personal
          information in physical or electronic form on our systems or that of
          our service providers. Our systems are designed to prevent your
          personal information from being accessed, lost, or misused by
          unauthorized individuals. If you reasonably believe that there has
          been an unauthorized use or disclosure of your personal information,
          please contact us. If we no longer need your personal information, we
          will take reasonable steps to securely delete your personal
          information in accordance with our document retention policy.
          copyrights of our app Our app owns all the rights of ownership,
          copyrights and all our rights reserved, and on this basis also follows
          a strict policy: Moreover, “MyTrend” app does not allow in any way to
          transfer, steal, or re-quote any content of any kind that is related
          to our app, to any other platforms or even personal blogs, as
          violating this is a flagrant violation of intellectual property rights
          that are criminalized by the mind before the law. We are free to reuse
          any type of content shared to the app by any user without referring to
          it or asking for permission, for any purpose we deem appropriate.
        </Text>
      </Content>
    </Container>
  );
};

export default privacyPolicy;
