import {
  View,
  Text,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {appInfo} from '../constants/appInfors';
import {SpaceComponent} from '../components';
import {appColors} from '../constants/appColors';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/background-splashscreen.png')}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      imageStyle={{flex: 1}}
    >
      <Image
        source={require('../assets/images/text-logo.png')}
        style={{
          width: appInfo.sizes.WIDTH,
          resizeMode: 'contain',
        }}
      />

      <ActivityIndicator color={appColors.gray} size={60} />
    </ImageBackground>
  );
};

export default SplashScreen;
