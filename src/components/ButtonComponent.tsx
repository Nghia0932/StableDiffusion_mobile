import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';
import {globalStyle} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';

interface Props {
  icon?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<TextStyle>;
  onPress?: () => void;
  iconFlex?: 'right' | 'left';
}

const ButtonComponent = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    textStyles,
    onPress,
    iconFlex,
  } = props;
  return type === 'primary' ? (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          globalStyle.button,
          globalStyle.shadow,
          {
            backgroundColor: color ?? appColors.primary,
            marginBottom: 15,
            width: '80%',
          },
          styles,
        ]}
      >
        {icon && iconFlex === 'left' && icon}
        <TextComponent
          text={text}
          color={textColor ?? appColors.white}
          styles={[
            textStyles,
            {
              marginLeft: icon ? 12 : 0,
              textAlign: 'center',
            },
          ]}
          flex={icon && iconFlex === 'right' ? 1 : 0}
          size={16}
        />
        {icon && iconFlex === 'right' && icon}
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextComponent
        text={text}
        color={type === 'link' ? appColors.primary : appColors.text}
      />
    </TouchableOpacity>
  );
};

export default ButtonComponent;
