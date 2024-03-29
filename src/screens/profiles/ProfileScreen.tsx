import {View, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  SectionComponent,
  ViewContentSocial,
  TextComponent,
} from '../../components';
import * as ImagePicker from 'expo-image-picker';
import {appColors} from '../../constants/appColors';
import {useDispatch, useSelector} from 'react-redux';
import {
  authSelector,
  updatePhotoAvatarUrl,
  updatePhotoBackgroundUrl,
} from '../../redux/reducers/authReducer';
import {globalStyle} from '../../styles/globalStyles';
import {PenAdd, PathToolSquare} from 'iconsax-react-native';
import {LoadingModal} from '../../modals';
import socialAPI from '../../apis/socialAPI';
import authenticationAPI from '../../apis/authApi';
import {ScrollView} from 'react-native-gesture-handler';
import TabNavigator from '../../navigators/TabNavigator';

const ProfileScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const [photoBackground, setPhotoBackground] = useState<string | null>(null);
  const [photoAvatar, setPhotoAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const user = useSelector(authSelector);
  const [hideTabBar, setHideTabBar] = useState(false);
  const [prevOffset, setPrevOffset] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const isScrollingUp = currentOffset < prevOffset;
    // Lưu lại vị trí scroll hiện tại để so sánh với scroll tiếp theo
    setPrevOffset(currentOffset);
    if (isScrollingUp) {
      setHideTabBar(false);
    } else {
      setHideTabBar(true);
    }
  };

  const pickPhotoBackground = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhotoBackground(result.assets[0].uri);
    }
    if (!result.canceled) {
      const data = new FormData();
      data.append('email', user.email);
      data.append('photoBackGroundUrl', result.assets[0].uri);

      const api = '/updateUserBackground';
      setIsLoading(true);
      try {
        const res = await authenticationAPI.HandleUpdateUser(api, data, 'put');
        setIsLoading(false);
        setPhotoBackground(res.data.uri.join());
        dispatch(updatePhotoBackgroundUrl(result.assets[0].uri));
        console.log('update successfully');
      } catch (error) {
        console.log('error to update  photoBAckGround ', error);
        setIsLoading(false);
      }
    }
  };

  const pickPhotoAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets[0].uri !== '') {
      setPhotoAvatar(result.assets[0].uri);
    }
    if (!result.canceled) {
      const data = new FormData();
      data.append('email', user.email);
      data.append('photoAvatarUrl', result.assets[0].uri);
      const api = '/updateUserAvatar';
      setIsLoading(true);
      try {
        const res = await authenticationAPI.HandleUpdateUser(api, data, 'put');
        setIsLoading(false);
        setPhotoAvatar(res.data.uri.join());
        dispatch(updatePhotoAvatarUrl(result.assets[0].uri));
      } catch (error) {
        console.log('error to update  avatar ', error);
        setIsLoading(false);
      }
    }
  };

  const deleteContent = async (_id: any) => {
    setIsLoading(true);
    const api = '/deleteContentById';
    try {
      const res = await socialAPI.HandleGetSocial(api, {_id}, 'delete');
      console.log(res);
      setIsLoading(false);
      setRefresh(true);
    } catch (error) {
      console.log('loi xoa content', error);
      setIsLoading(false);
    }
  };

  const handleDeleteConfirmation = (_id: any) => {
    Alert.alert(
      '',
      'Bạn muốn xóa bài viết này?',
      [
        {
          text: 'Đồng ý',
          onPress: () => deleteContent(_id),
        },
        {
          text: 'Hủy bỏ',
          onPress: () => ({}),
          style: 'cancel',
        },
      ],
      {cancelable: true}
    );
  };

  const listContentSocial = async () => {
    const api = '/getContentOneEmail';
    const email = user.email;
    setIsLoading(true);
    try {
      const res = await socialAPI.HandleGetSocial(api, {email}, 'post');
      setIsLoading(false);
      if (res.data !== null) {
        const dataList = res.data.data;
        const extractedData = dataList.map((post: any) => ({
          imageUri:
            post.imageUrls && post.imageUrls.length > 0
              ? post.imageUrls[0]
              : null, // Lấy ảnh đầu tiên trong mảng imageUrls
          updateAt: post.updateAt,
          content: post.content,
          _id: post._id,
        }));
        setUserPosts(extractedData);
      } else {
        console.log('ko co content nao duoc post');
      }
    } catch (error) {
      console.log('Lỗi ko lay duoc ds post:', error);
    }
  };
  useEffect(() => {
    if (route.params?.refresh || refresh == true) {
      listContentSocial(); // Gọi hàm khi nhận được dữ liệu từ PostScreen
      setRefresh(false);
      navigation.setParams({refresh: false});
      // Đặt lại trạng thái refresh
    }
  }, [route.params?.refresh, deleteContent]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.setParams({hideTabBar: true});
    });

    return unsubscribe;
  }, [hideTabBar]);

  return (
    <ScrollView onScroll={handleScroll}>
      <View style={{justifyContent: 'center', backgroundColor: '#ffff'}}>
        <SectionComponent styles={{paddingHorizontal: 0}}>
          {!user.photoBackGroundUrl ? (
            <View>
              <Image
                source={require('../../assets/images/backg_profilescreen.png')}
                style={{
                  width: '100%',
                  height: 200,
                  zIndex: -1,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={{position: 'absolute', bottom: 25, right: 10}}
                onPress={pickPhotoBackground}
              >
                <PenAdd size={32} color={appColors.gray} />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View>
                <Image
                  source={{
                    uri: user.photoBackGroundUrl.toString(),
                  }}
                  style={{
                    width: '100%',
                    height: 200,
                    zIndex: -1,
                    flex: 1,
                  }}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={{position: 'absolute', bottom: 25, right: 10}}
                  onPress={pickPhotoBackground}
                >
                  <PenAdd size={32} color={appColors.gray} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!user.photoAvatarUrl ? (
            <View style={{backgroundColor: '#ffff'}}>
              <Image
                source={require('../../assets/images/avt_profilescreen.png')}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                  position: 'absolute',
                  bottom: -50,
                  left: 10,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={{position: 'absolute', bottom: -30, left: 100}}
                onPress={pickPhotoAvatar}
              >
                <PenAdd size={24} color={appColors.primary} variant={'Bold'} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{backgroundColor: '#ffff'}}>
              <Image
                source={{uri: user.photoAvatarUrl.toString()}}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 100,
                  position: 'absolute',
                  bottom: -50,
                  left: 10,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={{position: 'absolute', bottom: -30, left: 100}}
                onPress={pickPhotoAvatar}
              >
                <PenAdd size={24} color={appColors.primary} variant={'Bold'} />
              </TouchableOpacity>
            </View>
          )}
        </SectionComponent>

        <SectionComponent>
          <View>
            <TouchableOpacity
              style={{position: 'absolute', top: 20, right: 10, zIndex: 1}}
              onPress={pickPhotoAvatar}
            >
              <PathToolSquare
                size={32}
                color={appColors.gray}
                variant={'Bold'}
              />
            </TouchableOpacity>

            <TextComponent
              styles={[
                globalStyle.text,
                {fontSize: 26, paddingTop: 32, fontWeight: 'bold'},
              ]}
              text={user.fullname}
            />
            <TextComponent
              styles={[globalStyle.text, {fontSize: 26, fontWeight: 'bold'}]}
              text="--"
            />
            <TextComponent
              styles={[globalStyle.text, {fontSize: 18}]}
              text="Đại Học Cần Thơ"
            />
            <TextComponent
              styles={[{fontSize: 16}]}
              text="K46, Khoa Học Máy Tính"
            />
          </View>
        </SectionComponent>
        <View style={styles.divider}></View>
        {userPosts &&
          userPosts.map((post, index) => (
            <ViewContentSocial
              showIcon={true}
              key={index}
              avatarUri={
                user.photoAvatarUrl ? user.photoAvatarUrl.toString() : ''
              }
              userName={user.fullname}
              updateAt={post.updateAt}
              content={post.content}
              imageUri={post.imageUri !== 'null' ? post.imageUri : 'null'}
              onPress={() => {
                handleDeleteConfirmation(post._id);
              }}
            />
          ))}
        <LoadingModal visibale={isLoading} />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  viewBottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    borderRadius: 20,
  },
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
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  divider: {
    backgroundColor: appColors.gray2,
    marginVertical: 10,
    padding: 5,
  },

  additionalInfoText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
