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
import {Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import SocialLogin from './components/SocialLogin';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import authenticationAPI from '../../apis/authApi';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  const handleSignin = async () => {
    try {
      const res = await authenticationAPI.HandleAuthentication('/hello');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerComponent isImageBackground isScroll>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 45,
        }}
      >
        <Image
          source={require('../../assets/images/text-logo.png')}
          style={{width: 162, height: 114, marginBottom: 20}}
        />
      </SectionComponent>
      <SectionComponent>
        <TextComponent
          size={24}
          text="Sign in"
          title
          styles={{fontWeight: 'bold'}}
        />
        <SpaceComponent height={21} />
        <InputComponent
          value={email}
          placehoder="Email"
          onChange={(val) => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputComponent
          value={password}
          placehoder="Password"
          onChange={(val) => setPassword(val)}
          isPassword
          affix={<Lock size={22} color={appColors.gray} />}
        />
        <RowComponent justiffy="space-between">
          <RowComponent onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextComponent text="Remember Me" color={appColors.text} />
          </RowComponent>
          <ButtonComponent
            text="Forgot Password?"
            type="text"
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="SIGN IN"
          type="primary"
          textStyles={{fontWeight: 'bold'}}
          onPress={handleSignin}
        />
      </SectionComponent>
      <SocialLogin />
      <SectionComponent>
        <RowComponent justiffy="center">
          <TextComponent text="Don't have an account ?" />
          <ButtonComponent
            type="link"
            text=" Sign up"
            onPress={() => navigation.navigate('SignupScreen')}
          />
        </RowComponent>
      </SectionComponent>
    </ContainerComponent>
  );
};

export default LoginScreen;
