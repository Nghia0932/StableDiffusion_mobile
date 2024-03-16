import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SplashScreen} from './src/screens';
import AuthNavigator from './src/navigators/AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';

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
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      )}
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
