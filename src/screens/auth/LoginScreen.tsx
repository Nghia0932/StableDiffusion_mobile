import {View, Text} from 'react-native';
import React from 'react';
import {globalStyle} from '../../styles/globalStyles';
import {ButtonComponent} from '../../components';

const LoginScreen = () => {
  return (
    <View style={globalStyle.container}>
      <Text>Login Screen</Text>
      <ButtonComponent
        text="forger password"
        type="link"
        onPress={() => console.log('login')}
        icon={
          <View>
            <Text>Icon </Text>
          </View>
        }
        textColor="#1518e8"
      />
    </View>
  );
};

export default LoginScreen;
