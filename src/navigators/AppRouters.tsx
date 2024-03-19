import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/authReducer';

const AppRouters = () => {
  const {getItem} = useAsyncStorage('auth');
  const dispatch = useDispatch();

  const auth = useSelector(authSelector);
  console.log(auth);

  useEffect(() => {
    checkSigin();
  }, []);

  const checkSigin = async () => {
    const res = await getItem();

    res && dispatch(addAuth(JSON.stringify(res)));
  };
  return <>{auth.accesstoken ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default AppRouters;
