import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import React from 'react';
import ContainerComponent from './ContainerComponent';
import SectionComponent from './SectionComponent';
import TextComponent from './TextComponent';
import {globalStyle} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';
import SpaceComponent from './SpaceComponent';
import RowComponent from './RowComponent';
import {
  Global,
  Messenger,
  Like1,
  MessageText1,
  Trash,
  Send,
} from 'iconsax-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonComponent from './ButtonComponent';

interface Props {
  showIcon?: boolean;
  avatarUri: string;
  userName: string;
  updateAt: string;
  content?: string;
  imageUri?: string;
  onPress?: () => void;
}

const ViewContentSocial = (props: Props) => {
  const {avatarUri, userName, updateAt, content, imageUri, onPress, showIcon} =
    props;
  const dateString = updateAt; // Chuỗi ngày tháng cần chuyển đổi
  const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
  // Cộng thêm 3 giờ
  date.setHours(date.getHours());

  // Cộng thêm 15 phút
  date.setMinutes(date.getMinutes());

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Thêm số 0 đằng trước nếu số tháng có một chữ số
  const day = ('0' + date.getDate()).slice(-2); // Thêm số 0 đằng trước nếu số ngày có một chữ số
  const hours = ('0' + date.getHours()).slice(-2); // Thêm số 0 đằng trước nếu số giờ có một chữ số
  const minutes = ('0' + date.getMinutes()).slice(-2); // Thêm số 0 đằng trước nếu số phút có một chữ số

  // Tạo chuỗi mới theo định dạng "YYYY-MM-DD HH:mm:ss"
  const formattedDate = ` ${hours}giờ ${minutes}phút   ${day}-${month}-${year}`;

  return (
    <View>
      <SectionComponent
        styles={{backgroundColor: '#ffff', marginTop: -10, paddingTop: 10}}
      >
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: avatarUri}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
            resizeMode="cover"
          />
          <SectionComponent>
            <TextComponent
              text={userName}
              styles={[globalStyle.text, {fontSize: 16, fontWeight: 'bold'}]}
            />
            <RowComponent>
              <TextComponent text={formattedDate} styles={[globalStyle.text]} />
              <Global
                style={{marginLeft: 5}}
                size={18}
                color={appColors.primary}
                variant={'Linear'}
              />
            </RowComponent>
          </SectionComponent>
          {showIcon && (
            <TouchableOpacity
              style={{position: 'absolute', bottom: 40, right: 5}}
              onPress={onPress}
            >
              <Trash size={18} color={appColors.gray} />
            </TouchableOpacity>
          )}
        </View>

        <TextComponent text={content ? content : ''} styles={{fontSize: 16}} />

        {imageUri !== 'null' ? (
          <View>
            <SpaceComponent height={20} />
            <Image
              source={{uri: imageUri}}
              style={{
                width: 360,
                height: 255,
                marginLeft: -15,
              }}
              resizeMode="cover"
            />
          </View>
        ) : null}
      </SectionComponent>
      <View style={styles.divider_1}></View>
      <SpaceComponent height={5} />
      <RowComponent
        styles={[
          globalStyle.row,
          {justifyContent: 'space-around', alignItems: 'center'},
        ]}
      >
        <ButtonComponent
          type="text"
          text={'Thích'}
          icon={<Like1 size={26} color={appColors.gray} variant={'Linear'} />}
          iconFlex={'left'}
        />
        <ButtonComponent
          text={'Bình luận'}
          icon={
            <MessageText1 size={26} color={appColors.gray} variant={'Linear'} />
          }
          iconFlex={'left'}
        />
        <ButtonComponent
          text={'Gửi'}
          icon={
            <Messenger size={26} color={appColors.gray} variant={'Linear'} />
          }
          iconFlex={'left'}
        />
        <ButtonComponent
          text={'Chia sẻ'}
          icon={<Send size={26} color={appColors.gray} />}
          iconFlex={'left'}
        />
      </RowComponent>
      <View style={styles.divider}></View>
    </View>
  );
};

export default ViewContentSocial;
const styles = StyleSheet.create({
  divider: {
    backgroundColor: appColors.gray2,
    marginVertical: 10,
    padding: 5,
  },
  divider_1: {
    backgroundColor: appColors.gray2,
    marginVertical: 10,
    padding: 0.5,
    marginHorizontal: 15,
  },
});
