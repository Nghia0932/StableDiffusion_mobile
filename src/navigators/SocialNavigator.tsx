import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SocialScreen} from '../screens';

const SocialNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SocialScreen" component={SocialScreen} />
    </Stack.Navigator>
  );
};

export default SocialNavigator;
