import {View, Image, Switch, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {LoadingModal} from '../../modals';
import {Validate} from '../../utils/validate';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const emailValidation = Validate.email(email);

  const handleSignin = async () => {
    if (!(email && password)) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (!emailValidation) {
      Alert.alert('Email không đúng định dạng!');
      return;
    }
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/login',
        {email, password},
        'post'
      );

      dispatch(addAuth(res.data));

      await AsyncStorage.setItem(
        'auth',
        isRemember ? JSON.stringify(res.data) : email
      );

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
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
      <LoadingModal visibale={isLoading} />
    </>
  );
};

export default LoginScreen;
