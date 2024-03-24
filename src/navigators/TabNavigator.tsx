import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {ReactNode} from 'react';
import {AddNewScreen} from '../screens';
import HomeNavigator from './HomeNavigator';
import MapNavigator from './MapNavigator';
import SocialNavigator from './SocialNavigator';
import ProfileNavigator from './ProfileNavigator';
import {appColors} from '../constants/appColors';
import {
  Home2,
  Profile,
  Map,
  AddSquare,
  Global,
  Home,
} from 'iconsax-react-native';
import {CircleComponent, TextComponent} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {View} from 'react-native';
import {globalStyle} from '../styles/globalStyles';
import DrawerNavigator from './DrawerNavigator';
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({focused, color, size}) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray;
          size = 25;

          switch (route.name) {
            case 'Home':
              !focused
                ? (icon = (
                    <Ionicons name="home-sharp" size={size} color={color} />
                  ))
                : (icon = (
                    <Ionicons name="home" size={size + 5} color={color} />
                  ));

              break;
            case 'Social':
              !focused
                ? (icon = <Global variant="Bold" size={size} color={color} />)
                : (icon = (
                    <Ionicons
                      name="globe-sharp"
                      size={size + 5}
                      color={color}
                    />
                  ));

              break;
            case 'Add':
              icon = (
                <CircleComponent size={52} style={{marginTop: -40}}>
                  <AddSquare size={24} color={appColors.white} variant="Bold" />
                </CircleComponent>
              );
              break;
            case 'Map':
              !focused
                ? (icon = (
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={size}
                      color={color}
                    />
                  ))
                : (icon = (
                    <MaterialCommunityIcons
                      name="map-marker-multiple"
                      size={size + 5}
                      color={color}
                    />
                  ));

              break;
            case 'Profile':
              !focused
                ? (icon = (
                    <FontAwesome6 name="user" size={size - 2} color={color} />
                  ))
                : (icon = (
                    <FontAwesome6
                      name="user-tie"
                      size={size + 3}
                      color={color}
                    />
                  ));

              break;
          }
          return icon;
        },
        tabBarLabel({focused}) {
          return route.name === 'Add' ? null : (
            <TextComponent
              text={route.name}
              flex={0}
              size={12}
              color={focused ? appColors.primary : appColors.gray}
            />
          );
        },
        tabBarVisible: route.name !== 'Add',
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Social" component={SocialNavigator} />
      <Tab.Screen
        name="Add"
        component={AddNewScreen}
        options={{tabBarStyle: {display: 'none'}}}
      />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
