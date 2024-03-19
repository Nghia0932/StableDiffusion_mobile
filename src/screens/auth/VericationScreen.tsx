import {View, Text} from 'react-native';
import React from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ArrowRight, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';

const VericationScreen = () => {
  return (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponent
          text="Reset Password"
          title
          styles={{fontWeight: 'bold'}}
        />
        <TextComponent text="Please enter your email address to request a password reset" />
        <SpaceComponent height={26} />
        <InputComponent
          placehoder="abc@gmail.com"
          value=""
          onChange={() => {}}
          affix={<Sms size={20} color={appColors.gray} />}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="SEND"
          type="primary"
          icon={<ArrowRight size={20} color={appColors.white} />}
          iconFlex="right"
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default VericationScreen;
