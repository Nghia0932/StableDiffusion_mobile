import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SplashScreen} from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppRouters from './src/navigators/AppRouters';
export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <Provider store={store}>
        {isShowSplash ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            <AppRouters />
          </NavigationContainer>
        )}
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#321ae5',
  },
});
function useAsyncStorage(): {getItem: any; setItem: any} {
  throw new Error('Function not implemented.');
}
