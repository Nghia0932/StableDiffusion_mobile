import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyle} from '../styles/globalStyles';
import {TextComponent} from '../components';
import {appColors} from '../constants/appColors';

interface Props {
  visibale: boolean;
  mess?: string;
}

const LoadingModal = (props: Props) => {
  const {visibale, mess} = props;
  return (
    <Modal
      visible={visibale}
      style={{flex: 1}}
      transparent
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: '10%',
          marginVertical: '80%',
          borderRadius: 50,
        }}
      >
        <ActivityIndicator color={appColors.white} size={100} />
        <TextComponent text="Loading..." flex={0} color={appColors.white} />
      </View>
    </Modal>
  );
};

export default LoadingModal;
