import React, {useState} from 'react';
import {
  ContainerComponent,
  InputComponent,
  TextComponent,
} from '../../components';
import {Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';
import {View} from 'react-native-reanimated/lib/typescript/Animated';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ContainerComponent isImageBackground>
      <TextComponent text="hello" />
      {/*<InputComponent
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
      />*/}
    </ContainerComponent>
  );
};

export default LoginScreen;
