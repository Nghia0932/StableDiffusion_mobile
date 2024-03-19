import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {globalStyle} from '../../styles/globalStyles';
import Swiper from 'react-native-swiper';
import {appInfo} from '../../constants/appInfors';
import {appColors} from '../../constants/appColors';
import {TextComponent} from '../../components';

const OnboardingScreen = ({navigation}: any) => {
  const [index, setIndex] = useState(0);
  return (
    <View style={[globalStyle.container]}>
      <Swiper
        style={{}}
        loop={false}
        onIndexChanged={(num) => setIndex(num)}
        index={index}
        activeDotColor={appColors.white}
      >
        <Image
          source={require('../../assets/images/Onboarding 1.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
        <Image
          source={require('../../assets/images/Onboarding 2.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
        <Image
          source={require('../../assets/images/Onboarding 3.png')}
          style={{
            flex: 1,
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
            resizeMode: 'cover',
          }}
        />
      </Swiper>
      <View
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 22,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate('SigninScreen')}>
          <TextComponent text="Skip" size={18} color={appColors.gray2} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            index < 2
              ? setIndex(index + 1)
              : navigation.navigate('SigninScreen')
          }
        >
          <TextComponent text="Next" size={18} color={appColors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
const styles = StyleSheet.create({
  text: {
    color: appColors.white,
    fontSize: 18,
    fontWeight: '500',
  },
});
