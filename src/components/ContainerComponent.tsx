import {View, Text, ImageBackground, ScrollView} from 'react-native';
import React, {ReactNode} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {globalStyle} from '../styles/globalStyles';

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
}

const ContainerComponent = (props: Props) => {
  const {children, isImageBackground, isScroll, title} = props;
  const returnContainer = isScroll ? (
    <ScrollView>{children}</ScrollView>
  ) : (
    <View>{children}</View>
  );
  return isImageBackground ? (
    <ImageBackground
      source={require('../assets/images/backg_splashcreen.png')}
      style={{flex: 1}}
      imageStyle={{flex: 1}}
    >
      <SafeAreaView style={{flex: 1}}> {returnContainer}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={globalStyle.container}>
      <View>{returnContainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;
