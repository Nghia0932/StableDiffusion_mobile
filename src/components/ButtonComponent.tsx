import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextComponent from './TextComponent';

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
  return (
    <TouchableOpacity>
      {icon && iconFlex === 'left' && icon}
      <TextComponent text={text} color={textColor} styles={textStyles} />
      {icon && iconFlex === 'right' && icon}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
