import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';

import FormData from 'form-data';
import {appColors} from '../../constants/appColors';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authReducer';
import {
  ArrowUp,
  ArrowSquareDown,
  GalleryExport,
  Gemini,
  CloseCircle,
} from 'iconsax-react-native';
import {globalStyle} from '../../styles/globalStyles';
import {StatusBar} from 'expo-status-bar';
import socialAPI from '../../apis/socialAPI';
import * as ImagePicker from 'expo-image-picker';
import {LoadingModal} from '../../modals';

const AddNewScreen = ({navigation}: any) => {
  const [showOptions, setShowOptions] = useState(false);
  const [optionText, setOptionText] = useState('to: Every one');
  const [content, setContent] = useState('');
  const [imagesUrls, setImageUrls] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(authSelector);

  useEffect(() => {
    if (content.trim().length > 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [content]);

  function getInitials(fullname: string): string {
    const words = fullname.split(' ');
    let initials = '';
    words.forEach((word) => {
      initials += word.substring(0, 1);
    });
    return initials.toUpperCase();
  }

  const handleOptionsPress = () => {
    setShowOptions(!showOptions);
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePostSocial = async () => {
    const data = new FormData();
    data.append('email', user.email);
    data.append('content', content);
    data.append('imageUrls', image);
    console.log(data);
    const api = '/postContent';
    setIsLoading(true);
    try {
      const res = await socialAPI.HandlePostSocial(api, data, 'post');
      setContent('');
      setImage(null);
      setIsLoading(false);
      console.log(res);
      navigation.navigate('ProfileScreen', {'refresh': true});
      navigation.navigate('HomeScreen', {'refresh': true});
      setRefresh(!refresh);
    } catch (error) {
      console.log('error post social ', error);
      setIsLoading(false);
    }
  };

  return (
    <View style={globalStyle.container}>
      <ContainerComponent
        isImageBackground
        isScroll
        back
        title={"share your thinks on CTU's social"}
      >
        <SectionComponent
          styles={{justifyContent: 'space-between', flexDirection: 'row'}}
        >
          <View
            style={[
              (globalStyle.container,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 60,
                marginTop: -14,
              }),
            ]}
          >
            <View style={[styles.avatar, {backgroundColor: appColors.gray}, ,]}>
              <TextComponent
                title
                size={12}
                color={appColors.white}
                text={getInitials(user.fullname)}
              />
            </View>
            <TextComponent
              styles={{paddingLeft: 5}}
              title
              size={16}
              text={user.fullname}
            />
            <Text
              style={[styles.optionsContainerText, {color: appColors.primary}]}
            >
              {optionText}
            </Text>
            <TouchableOpacity
              onPress={handleOptionsPress}
              style={{flex: 1, paddingLeft: 100}}
            >
              <ArrowSquareDown size={24} color={appColors.text} />
            </TouchableOpacity>
            {showOptions && (
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    console.log('Everyone'),
                      setShowOptions(false),
                      setOptionText('to: every one');
                  }}
                >
                  <Text>Everyone</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    console.log('follower'),
                      setShowOptions(false),
                      setOptionText('to: follower');
                  }}
                >
                  <Text>Follower</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <ButtonComponent
            disable={isDisable}
            styles={{
              height: 30,
              paddingHorizontal: 0,
              paddingVertical: 0,
              borderRadius: 15,
              paddingRight: 5,
            }}
            onPress={handlePostSocial}
            width={80}
            text={'Post'}
            textStyles={{fontSize: 16}}
            type="primary"
            icon={
              <ArrowUp
                size={12}
                variant="Bold"
                color={appColors.white}
                style={{marginRight: 5}}
              />
            }
            iconFlex="right"
          />
        </SectionComponent>
        <SectionComponent>
          <TextInput
            autoFocus={true}
            multiline={true}
            style={{fontSize: 20, minWidth: 20}}
            value={content}
            onChangeText={(content) => setContent(content)}
            placeholder="Share your thinks..."
          />
          <SpaceComponent height={22} />
          {image ? (
            <View style={{position: 'relative', height: 260}}>
              <Image source={{uri: image}} style={{width: 300, height: 250}} />
              <TouchableOpacity
                style={{position: 'absolute', top: -10, right: 20}}
                onPress={() => setImage(null)}
              >
                <CloseCircle
                  size={32}
                  variant={'Bold'}
                  color={appColors.text}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </SectionComponent>
      </ContainerComponent>
      <View style={{justifyContent: 'space-between'}}>
        <ButtonComponent
          styles={[
            styles.viewBottom,
            {
              height: 40,
              paddingHorizontal: 0,
              paddingVertical: 0,
            },
          ]}
          width={125}
          color={appColors.gray}
          textColor="#f7ff09"
          text="Generate AI"
          type="primary"
          textStyles={{fontSize: 16}}
          icon={<Gemini size={22} variant={'Bold'} color="#f7ff09" />}
          iconFlex={'left'}
        />
        <View style={[styles.viewBottomRight]}>
          <TouchableOpacity onPress={pickImage}>
            <GalleryExport
              size={52}
              variant="Bold"
              color={appColors.primary}
              style={{justifyContent: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LoadingModal visibale={isLoading} />
    </View>
  );
};

export default AddNewScreen;
const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    top: 15,
    right: 0,
    paddingLeft: 10,
    padding: 5,
    elevation: 3,
    width: 95,
  },
  optionsContainerText: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    top: 15,
    right: 0,
    paddingLeft: 10,
    padding: 5,
    width: 95,
  },
  optionItem: {
    padding: 5,
  },
  viewBottom: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 10,
  },
  viewBottomRight: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    borderRadius: 20,
  },
});
