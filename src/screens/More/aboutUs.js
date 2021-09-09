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

const aboutUs = (props) => {
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
          <Title>About Us</Title>
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
          MyTrend is a social media application that includes various groups in
          society and from various parts of the world. registration is available
          to everyone; our site growth depends on the participations and the
          constructive contributions of all its users that have the absolute
          freedom to express their opinions. the app aims primarily to
          contribute to the support of freedom of expression and the sharing in
          different aspects: cultural, economic, sports. and many other points
          while maintaining the mutual respect between its users, because it
          allows everyone to freely express their opinions and strengthen the
          mechanisms of dialogue between the different parts of the society. Our
          app main passions are: Sharing and respecting and understanding
          different points of views from the different types of users -
          Development of Arabic content; Promote a culture of peace. It also
          guarantees: Respect for everyone, no matter the status, religion, race
          or gender - One of our highest values is to focus on the equality of
          all users. we are thrilled to inform you that our initiative is not
          affiliated with any party, and completely rejects any form of racism
          and discrimination. The application seeks to establish a culture of
          knowledge and dialogue, following a noble and lofty vision and
          principles. Our app also allows its users to freely post anything that
          serves both the public and individual interests, by posting research
          and studies, news, constructive topics, videos and photos in any
          field. We are also glad to inform you that our application is
          programed to be time and effort saving, by displaying the contents
          that may interest tour users which is also refreshed, instantly and
          exclusively by their respected users, and while respecting the terms
          and the conditions of the application. We would also like to Let our
          dear users know that our application declines all responsibility for
          communication between members, agreements and comments that take place
          in the platform, and that the user is the only one who bears the
          responsibility his own statements.
        </Text>
      </Content>
    </Container>
  );
};

export default aboutUs;
