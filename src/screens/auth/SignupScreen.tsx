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

interface ErrorMessage {
  userName: string;
  email: string;
  password: string;
  cofirmPassword: string;
}
const initValue = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupScreen = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [isDisable, setIsDisable] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !errorMessage ||
      (errorMessage &&
        (errorMessage.userName ||
          errorMessage.email ||
          errorMessage.password ||
          errorMessage.confirmPassword)) ||
      !values.userName ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errorMessage, values]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  const formValidator = (key: string) => {
    const data = {...errorMessage};
    let message = '';
    switch (key) {
      case 'userName':
        if (!values.userName) {
          message = 'Vui lòng nhập tên!';
        } else {
          message = '';
        }
        break;
      case 'email':
        if (!values.email) {
          message = 'Vui lòng nhập email';
        } else if (!Validate.email(values.email)) {
          message = 'Email nhập chưa đúng định dạng';
        } else {
          message = '';
        }
        break;
      case 'password':
        if (!values.password) {
          message = 'Vui lòng nhập password';
        } else if (!Validate.password(values.password)) {
          message =
            'Mật khẩu phải gồm có chữ hoa, chữ thường và ít nhất 1 ký tự đặc biệt';
        } else {
          message = '';
        }
        break;
      case 'confirmPassword':
        if (!values.password) {
          message = 'Vui lòng xác nhận lại password';
        } else if (values.confirmPassword != values.password) {
          message = 'Xác nhận password chưa khớp !!';
        } else {
          message = '';
        }
        break;
    }

    data[`${key}`] = message;
    setErrorMessage(data);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const api = `/verification`;

    try {
      const res = await authenticationAPI.HandleAuthentication(
        api,
        {email: values.email},
        'post'
      );
      navigation.navigate('VerificationScreen', {
        code: res.data.code,
        ...values,
        resetPassword: 0,
      });

      console.log(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
            onEnd={() => formValidator('userName')}
          />
          <InputComponent
            value={values.email}
            placehoder="abc@gamil.com"
            onChange={(val) => handleChangeValue('email', val)}
            allowClear
            affix={<Sms size={22} color={appColors.gray} />}
            onEnd={() => formValidator('email')}
          />
          <InputComponent
            value={values.password}
            placehoder="Your password"
            onChange={(val) => handleChangeValue('password', val)}
            allowClear
            isPassword
            affix={<Lock size={22} color={appColors.gray} />}
            onEnd={() => formValidator('password')}
          />

          <InputComponent
            value={values.confirmPassword}
            placehoder="Confirm password"
            onChange={(val) => handleChangeValue('confirmPassword', val)}
            allowClear
            isPassword
            affix={<Lock size={22} color={appColors.gray} />}
            onEnd={() => formValidator('confirmPassword')}
          />
        </SectionComponent>

        {errorMessage &&
          (errorMessage.userName ||
            errorMessage.email ||
            errorMessage.password ||
            errorMessage.confirmPassword) && (
            <SectionComponent>
              {Object.keys(errorMessage).map(
                (error, index) =>
                  errorMessage[`${error}`] && (
                    <TextComponent
                      text={errorMessage[`${error}`]}
                      key={`error${index}`}
                      color={appColors.danger}
                    />
                  )
              )}
            </SectionComponent>
          )}

        <SectionComponent>
          <ButtonComponent
            disable={isDisable}
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
