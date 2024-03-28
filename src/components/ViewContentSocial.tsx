import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import ContainerComponent from './ContainerComponent';
import SectionComponent from './SectionComponent';
import TextComponent from './TextComponent';
import {globalStyle} from '../styles/globalStyles';
import {appColors} from '../constants/appColors';
import SpaceComponent from './SpaceComponent';
import RowComponent from './RowComponent';
import {Global} from 'iconsax-react-native';

interface Props {
  avatarUri: string;
  userName: string;
  updateAt: string;
  content?: string;
  imageUri?: string;
}

const ViewContentSocial = (props: Props) => {
  const {avatarUri, userName, updateAt, content, imageUri} = props;
  const dateString = updateAt; // Chuỗi ngày tháng cần chuyển đổi
  const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date

  // Lấy thông tin ngày, tháng, năm, giờ, phút, giây từ đối tượng Date
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Thêm số 0 đằng trước nếu số tháng có một chữ số
  const day = ('0' + date.getDate()).slice(-2); // Thêm số 0 đằng trước nếu số ngày có một chữ số
  const hours = ('0' + date.getHours()).slice(-2); // Thêm số 0 đằng trước nếu số giờ có một chữ số
  const minutes = ('0' + date.getMinutes()).slice(-2); // Thêm số 0 đằng trước nếu số phút có một chữ số

  // Tạo chuỗi mới theo định dạng "YYYY-MM-DD HH:mm:ss"
  const formattedDate = `at ${hours}:${minutes}   ${day}-${month}-${year}`;

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
        </View>

        <TextComponent text={content ? content : ''} styles={{fontSize: 16}} />

        {imageUri !== 'null' ? (
          <View>
            <SpaceComponent height={20} />
            <Image
              source={{uri: imageUri}}
              style={{
                width: 320,
                height: 255,
              }}
              resizeMode="cover"
            />
          </View>
        ) : null}
      </SectionComponent>
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
});
