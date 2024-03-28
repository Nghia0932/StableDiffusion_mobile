import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  SectionComponent,
  ViewContentSocial,
  RowComponent,
  TextComponent,
} from '../../components';

import * as ImagePicker from 'expo-image-picker';
import {appColors} from '../../constants/appColors';
import {useDispatch, useSelector} from 'react-redux';
import {
  authSelector,
  removeAuth,
  updatePhotoAvatarUrl,
  updatePhotoBackgroundUrl,
} from '../../redux/reducers/authReducer';
import {globalStyle} from '../../styles/globalStyles';
import {SearchNormal1, PenAdd, PathToolSquare} from 'iconsax-react-native';
import {LoadingModal} from '../../modals';
import socialAPI from '../../apis/socialAPI';
import authenticationAPI from '../../apis/authApi';
import {ScrollView} from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const [photoBackground, setPhotoBackground] = useState<string | null>(null);
  const [photoAvatar, setPhotoAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const user = useSelector(authSelector);

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

  const listContentSocial = async () => {
    const api = '/getContentOneEmail';
    const email = user.email;
    setIsLoading(true);
    try {
      const res = await socialAPI.HandleGetSocial(api, {email}, 'post');
      setIsLoading(false);
      const dataList = res.data.data;
      const extractedData = dataList.map((post: any) => ({
        imageUri:
          post.imageUrls && post.imageUrls.length > 0
            ? post.imageUrls[0]
            : null, // Lấy ảnh đầu tiên trong mảng imageUrls
        updateAt: post.updateAt,
        content: post.content,
      }));
      setUserPosts(extractedData);
    } catch (error) {
      console.log('Lỗi ko lay duoc ds post:', error);
    }
  };
  useEffect(() => {
    listContentSocial();
  }, []);

  return (
    <ScrollView>
      <View style={{justifyContent: 'center', backgroundColor: '#ffff'}}>
        {/*<View style={[globalStyle.container]}>
          <StatusBar barStyle={'light-content'} />
          <View
            style={{
              backgroundColor: 'rgba(81, 143, 205, 0.5)',
              height: 65,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              padding: StatusBar.currentHeight,
            }}
          >
            <RowComponent>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <RowComponent onPress={() => navigation.navigate('Searchs')}>
                  <SearchNormal1
                    size={24}
                    color={appColors.white}
                    variant="TwoTone"
                  />
                  <View
                    style={{
                      width: 1,
                      backgroundColor: appColors.gray2,
                      height: 20,
                    }}
                  />
                  <TextComponent
                    flex={1}
                    text="  Search..."
                    color={appColors.gray2}
                    size={16}
                  />
                </RowComponent>
              </View>
            </RowComponent>
          </View>
        </View>*/}
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
        {userPosts.map((post, index) => (
          <ViewContentSocial
            key={index}
            avatarUri={
              user.photoAvatarUrl ? user.photoAvatarUrl.toString() : ''
            }
            userName={user.fullname}
            updateAt={post.updateAt}
            content={post.content}
            imageUri={post.imageUri !== 'null' ? post.imageUri : 'null'}
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
