import {StyleSheet} from 'react-native';
import {appColors} from '../constants/appColors';
export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: appColors.text,
  },
});
