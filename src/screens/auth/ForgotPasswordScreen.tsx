import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyle} from '../../styles/globalStyles';
import {ArrowLeft, ArrowRight, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
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
          value={email}
          onChange={(val) => setEmail(val)}
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

export default ForgotPasswordScreen;
