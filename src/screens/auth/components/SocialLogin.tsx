import {View, Text} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  SectionComponent,
  TextComponent,
} from '../../../components';
import {appColors} from '../../../constants/appColors';
import {Google} from 'iconsax-react-native';

const SocialLogin = () => {
  return (
    <SectionComponent>
      <TextComponent
        styles={{textAlign: 'center'}}
        text="OR"
        color={appColors.gray}
      />
      <ButtonComponent
        type="primary"
        color={appColors.white}
        text="Login with Google"
        textColor={appColors.text}
        icon={<Google size={24} color={appColors.primary} />}
        iconFlex="left"
      />
    </SectionComponent>
  );
};

export default SocialLogin;
