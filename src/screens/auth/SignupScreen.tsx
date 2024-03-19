import {View, Image, Switch} from 'react-native';
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
import {Lock, Sms, User} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import SocialLogin from './components/SocialLogin';
import {LoadingModal} from '../../modals';
import authenticationAPI from '../../apis/authApi';
import {Validate} from '../../utils/validate';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initValue = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      values.userName ||
      values.email ||
      values.password ||
      values.confirmPassword
    ) {
      setErrorMessage('');
    }
  }, [values.userName, values.email, values.password, values.confirmPassword]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  const handleRegister = async () => {
    const {userName, email, password, confirmPassword} = values;
    const emailValidation = Validate.email(email);
    const passValidation = Validate.password(password);

    if (!(userName && email && password && confirmPassword)) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Password không khớp!');
      return;
    }
    if (!passValidation) {
      setErrorMessage(
        'Mật khẩu phải gồm có chữ hoa, chữ thường và ít nhất 1 ký tự đặc biệt'
      );
      return;
    }
    if (!emailValidation) {
      setErrorMessage('Email nhập chưa đúng định dạng');
      return;
    }
    // Nếu tất cả các điều kiện trên đều thoả mãn, tiến hành xử lý đăng ký
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/register',
        {
          fullname: values.userName,
          email,
          password,
        },
        'post'
      );
      dispatch(addAuth(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
          {errorMessage && (
            <TextComponent text={errorMessage} color={appColors.danger} />
          )}
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent
            text="SIGN UP"
            type="primary"
            textStyles={{fontWeight: 'bold'}}
            onPress={() => {
              handleRegister();
            }}
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
      <LoadingModal visibale={isLoading} />
    </>
  );
};

export default SignupScreen;
