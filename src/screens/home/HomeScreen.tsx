import {
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity,
  PushNotification,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ButtonComponent,
  CircleComponent,
  InputComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authSelector, removeAuth} from '../../redux/reducers/authReducer';
import {globalStyle} from '../../styles/globalStyles';
import {appColors} from '../../constants/appColors';
import {HambergerMenu, Notification, SearchNormal1} from 'iconsax-react-native';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const auth = useSelector(authSelector);

  return (
    <View style={[globalStyle.container, {backgroundColor: appColors.gray3}]}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          backgroundColor: appColors.primary,
          height: 80,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          padding: StatusBar.currentHeight,
        }}
      >
        <RowComponent>
          <TouchableOpacity
            style={{paddingRight: 10}}
            onPress={() => navigation.openDrawer()}
          >
            <HambergerMenu size={24} color={appColors.white} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <RowComponent styles={{paddingTop: 15}}>
              <InputComponent
                value={search}
                onChange={() => {}}
                placehoder="Search..."
                minHeight={30}
                affix={<SearchNormal1 color={appColors.gray} />}
              />
            </RowComponent>
          </View>
          <View style={{paddingLeft: 10}}>
            <CircleComponent color="#524CE0" size={36}>
              <View>
                <Notification size={24} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderStartColor: '#524CE0',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                />
              </View>
            </CircleComponent>
          </View>
        </RowComponent>
      </View>
      <View style={[{flex: 1, backgroundColor: appColors.gray3}]}></View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray3,
    width: '100%',
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: appColors.white,
    marginBottom: 19,
  },
  input: {
    padding: 0,
    margin: 0,
    flex: 1,
  },
});
