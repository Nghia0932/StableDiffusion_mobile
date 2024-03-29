import {
  View,
  Text,
  Button,
  StatusBar,
  TouchableOpacity,
  PushNotification,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ButtonComponent,
  CircleComponent,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  ViewContentSocial,
} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authSelector, removeAuth} from '../../redux/reducers/authReducer';
import {globalStyle} from '../../styles/globalStyles';
import {appColors} from '../../constants/appColors';
import {
  HambergerMenu,
  Notification,
  PathToolSquare,
  PenAdd,
  SearchNormal,
  SearchNormal1,
} from 'iconsax-react-native';
import {LoadingModal} from '../../modals';
import socialAPI from '../../apis/socialAPI';
import authenticationAPI from '../../apis/authApi';

const HomeScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(true);
  const [photoBackground, setPhotoBackground] = useState<string | null>(null);
  const [photoAvatar, setPhotoAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const user = useSelector(authSelector);
  const [hideTabBar, setHideTabBar] = useState(false);
  const [prevOffset, setPrevOffset] = useState(0);

  const listContentSocial = async () => {
    const api = '/getContentOneEmail';
    const email = user.email;
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
  }, [route.params?.refresh]);

  return (
    <View style={[globalStyle.container, {backgroundColor: appColors.white}]}>
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
                  marginHorizontal: 10,
                  height: 20,
                }}
              />
              <TextComponent
                flex={1}
                text="Search..."
                color={appColors.gray2}
                size={16}
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
        <SpaceComponent height={20} />
      </View>
      <ScrollView>
        <View style={{justifyContent: 'center', backgroundColor: '#ffff'}}>
          <View style={[styles.divider]}></View>
          {userPosts &&
            userPosts.map((post, index) => (
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
  divider: {
    backgroundColor: appColors.gray2,
    marginVertical: 10,
    padding: 5,
  },
});
