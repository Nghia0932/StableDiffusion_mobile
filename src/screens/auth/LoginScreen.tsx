import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {globalStyle} from '../../styles/globalStyles';
import {ButtonComponent, InputComponent} from '../../components';
import {Lock, LockCircle, LockSlash, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/appColors';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={[
        globalStyle.container,
        {
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        },
      ]}
    >
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
    </View>
  );
};

export default LoginScreen;
