import {
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {screenOptions} from '../../naviagtor/config';
import {
  AppButton,
  Background,
  LinerButton,
  ScaleText,
  VectorIcon,
} from '../../common';
import {Colors, Fonts, Images} from '../../theme';
import {ButtonView} from '../../components';
import {ProgressBar} from 'react-native-paper';
import {NavigationService, Util} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import HandleImagePicker from '../../components/HandleImagePicker';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import {styles} from './styles';
import {useDispatch} from 'react-redux';
import {
  BEHIND_UNIFORM_API,
  FAVORITE_HOBBY_API,
  PHOTO_LABEL_API,
  PROFESSIONAL_PROFILE_API,
  PROFILE_PERCENTAGE_API,
} from '../../ducks/app';

const isDarkMode = datahandler.getAppTheme();
const LinnerColour = ['#387FF1', '#224EC9'];

const sectionsData = [
  {
    id: 1,
    title: '',
    imageUri: 'https://i.postimg.cc/L5tWhKNt/Mask-Group-2.png',
    selected: false,
    err: false,
  },
  {
    id: 2,
    title: '',
    imageUri: 'https://i.postimg.cc/1XR99HK3/Image-62.png',
    selected: false,
    err: false,
  },
  {
    id: 3,
    title: '',
    imageUri:
      'https://i.postimg.cc/wjR9T3DL/cute-woman-artist-drawing-acrylic-paints-canvas-82574-3737.png',
    selected: false,
    err: false,
  },
];

const AuthPictureUpload = ({navigation, route}) => {
  const [statedata, setStateData] = useState({
    showModal: false,
    selectedSection: null,
    dummyData: sectionsData,
    isloading: false,
    question: {},
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      PHOTO_LABEL_API.request({
        payloadApi: {},
        cb: async res => {
          const sectionsData = [
            {
              id: 1,
              title: res?.question_1,
              imageUri: 'https://i.postimg.cc/L5tWhKNt/Mask-Group-2.png',
              selected: false,
              err: false,
            },
            {
              id: 2,
              title: res?.question_2,
              imageUri: 'https://i.postimg.cc/1XR99HK3/Image-62.png',
              selected: false,
              err: false,
            },
            {
              id: 3,
              title: res?.question_3,
              imageUri:
                'https://i.postimg.cc/wjR9T3DL/cute-woman-artist-drawing-acrylic-paints-canvas-82574-3737.png',
              selected: false,
              err: false,
            },
          ];
          console.log('🚀 ~ useEffect ~ sectionsData:', sectionsData);
          setStateData(prev => ({...prev,dummyData:sectionsData }));
        },
      }),
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'Upload your photos',
      ),
    );
  }, [navigation, isDarkMode]);

  const handleActionButton = (section, actionType) => {
    if (actionType === 'Delete') {
      const updatedData = statedata.dummyData.map(item =>
        item.id === section.id ? {...item, selected: false} : item,
      );
      setStateData(prev => ({...prev, dummyData: updatedData}));
    } else {
      setStateData(prev => ({
        ...prev,
        showModal: true,
        selectedSection: section,
      }));
    }
  };

  // Update the image URI for the selected section
  const onImagePicked = image => {
    let imageUri = image.uri;
    const updatedData = statedata.dummyData.map(section =>
      section.id === statedata.selectedSection.id
        ? {...section, selected: imageUri, error: null}
        : section,
    );
    setStateData(prev => ({...prev, dummyData: updatedData, showModal: false}));
  };

  const UploadImage = () => {
    const hasAtLeastOneSelected = statedata.dummyData.some(
      section => section.selected,
    );

    if (!hasAtLeastOneSelected) {
      Util.showMessage('Please upload at least one image.');
      // const updatedData = statedata.dummyData.map(section => ({
      //   ...section,
      //   error: 'Please upload at least one image',
      // }));
      // setStateData(prev => ({...prev, dummyData: updatedData}));
      return;
    }

    // Clear errors if at least one is selected
    const updatedData = statedata.dummyData.map(section => ({
      ...section,
      error: null,
    }));

    setStateData(prev => ({...prev, dummyData: updatedData, isloading: true}));

    const API_MAPPING = [
      {key: 'professional_profile', api: PROFESSIONAL_PROFILE_API},
      {key: 'behind_the_uniform', api: BEHIND_UNIFORM_API},
      {key: 'favorite_hobby', api: FAVORITE_HOBBY_API},
    ];

    let completedRequests = 0;

    API_MAPPING.forEach((item, index) => {
      const imageUri = statedata.dummyData[index]?.selected;
      if (imageUri) {
        const formData = new FormData();
        formData.append(item.key, {
          uri: imageUri,
          name: `image_${index}.jpg`,
          type: 'image/jpeg',
        });

        dispatch(
          item.api.request({
            payloadApi: formData,
            cb: res => {
              // completedRequests++;
              // if (completedRequests === API_MAPPING.length) {
              setStateData(prev => ({...prev, isloading: false}));

              if (route?.params?.key == true) {
                const formData = new FormData();
                formData.append('percentage', 'AppStack');
                dispatch(
                  PROFILE_PERCENTAGE_API.request({
                    payloadApi: formData,
                    cb: res => {
                      NavigationService.push(StackNav.CompleteProfile, {
                        value: '100%',
                      });
                    },
                  }),
                );
              } else {
                const formData = new FormData();
                formData.append(
                  'percentage',
                  `AuthVideoUpload / ${true} / ${null}`,
                );

                dispatch(
                  PROFILE_PERCENTAGE_API.request({
                    payloadApi: formData,
                    cb: res => {
                      NavigationService.navigate(StackNav.AuthVideoUpload, {
                        key: true,
                      });
                    },
                  }),
                );
              }
              // }
            },
          }),
        );
      }
    });
  };

  const renderSection = section => {
    const [textLines, setTextLines] = useState(1);

    return (
      <View style={styles.sectionContainer} key={section.id}>
        <View style={styles.titleRow}>
          <ScaleText
            isDarkMode={isDarkMode}
            fontFamily={Fonts.type.Mediu}
            fontSize={ms(16)}
            TextStyle={styles.textStyle}
            numberOfLines={textLines}
            text={section.title}
          />
          <View style={styles.lineControls}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: ms(5),
                alignSelf: 'flex-start',
                backgroundColor: 'black',
                padding: ms(5),
                borderRadius: 5,
                marginRight: ms(10),
              }}
              onPress={() => {
                if(textLines == 1){
                  setTextLines(2)
                } else{
                  setTextLines(1)
                }
              }}>
              <VectorIcon
                name={textLines == 1 ? 'plus' : 'minus'}
                type={'Entypo'}
                color={Colors.White}
                size={ms(17)}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ImageBackground
          style={styles.imageBackground}
          resizeMode="contain"
          source={Images.images.poster_background}>
          <View style={styles.counterCircle}>
            <ScaleText color={Colors.White} text={section.id.toString()} />
          </View>
          <Image
            style={styles.imageStyle}
            resizeMode="contain"
            source={{
              uri: section.selected ? section.selected : section.imageUri,
            }}
          />
          <View style={styles.buttonContainer}>
            {['Upload', 'Replace', 'Delete'].map((title, index) => (
              <ButtonView key={index}>
                <LinerButton
                  title={title}
                  LinnerColourArray={LinnerColour}
                  onPress={() => handleActionButton(section, title)}
                  linearGradientStyle={styles.linearGradientStyle}
                />
              </ButtonView>
            ))}
          </View>
        </ImageBackground>
        {section.error && <Text style={styles.errorText}>{section.error}</Text>}
      </View>
    );
  };

  return (
    <Background isDarkMode={isDarkMode}>
      {statedata.dummyData.map(renderSection)}
      <ScaleText
        isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Mediu}
        fontSize={ms(16)}
        text={'Your Profile Status'}
        color={Colors.Black}
      />
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={route?.params?.key == false ? 0.9 : 1}
          color="#387FF1"
          style={styles.progressBar}
        />
        <Text style={styles.progressText}>
          {route?.params?.key == false ? '90%' : '100%'}
        </Text>
      </View>
      <View style={{marginVertical: ms(10)}}>
        <AppButton
          isloading={statedata.isloading}
          onPress={() => {
            UploadImage();
          }}
          BackgroundColor={Colors.Black_02}
          title={'Submit'}
        />
      </View>
      <HandleImagePicker
        modalVisible={statedata.showModal}
        onClose={() => setStateData(prev => ({...prev, showModal: false}))}
        onImagePicked={onImagePicked}
        media={false}
      />
    </Background>
  );
};

export default AuthPictureUpload;
