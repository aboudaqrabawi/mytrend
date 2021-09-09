import React, {Component, useState, useEffect} from 'react';
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
import {TouchableOpacity} from 'react-native';

const contactUs = (props) => {
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
          <Title>Contact us</Title>
        </Body>
        <Right />
      </Header>
      <Content
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            backgroundColor: '#fff',
            margin: 20,
            shadowColor: '#000',
            shadowOpacity: 0.7,
            shadowRadius: 5,
            elevation: 2,
          }}>
          Feel Free to contact us by Email
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#0149AF',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#0149AF',
            width: 100,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff', textAlign: 'center'}}>Contact Us</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

export default contactUs;
