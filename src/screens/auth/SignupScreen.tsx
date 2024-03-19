import {View, Image, Switch} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {Lock, Sms, User} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import SocialLogin from './components/SocialLogin';

const initValue = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};

    data[`${key}`] = value;
    setValues(data);
  };
  return (
    <ContainerComponent isImageBackground isScroll back>
      <SectionComponent>
        <TextComponent
          size={24}
          text="Sign up"
          title
          styles={{fontWeight: 'bold'}}
        />
        <SpaceComponent height={21} />
        <InputComponent
          value={values.userName}
          placehoder="Full name"
          onChange={(val) => handleChangeValue('userName', val)}
          allowClear
          affix={<User size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.email}
          placehoder="abc@gamil.com"
          onChange={(val) => handleChangeValue('email', val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={values.password}
          placehoder="Your password"
          onChange={(val) => handleChangeValue('password', val)}
          allowClear
          isPassword
          affix={<Lock size={22} color={appColors.gray} />}
        />

        <InputComponent
          value={values.confirmPassword}
          placehoder="Confirm password"
          onChange={(val) => handleChangeValue('confirmPassword', val)}
          allowClear
          isPassword
          affix={<Lock size={22} color={appColors.gray} />}
        />
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="SIGN UP"
          type="primary"
          textStyles={{fontWeight: 'bold'}}
        />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent styles={{top: -15}}>
        <RowComponent justiffy="center">
          <TextComponent text="Already have an account ?" />
          <ButtonComponent
            type="link"
            text=" Sign in"
            onPress={() => navigation.navigate('SigninScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default SignupScreen;
