import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {Image} from 'react-native';
import {ButtonView, MoVideoPlayer} from '../../components';
import {ProgressBar} from 'react-native-paper';
import {NavigationService, Util} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms, ScaledSheet} from 'react-native-size-matters';
import HandleImagePicker from '../../components/HandleImagePicker';
import datahandler from '../../helper/datahandler';
import {TakeCameraPicture} from '../../utils/Gallery';
import {useDispatch} from 'react-redux';
import {
  PROFILE_PERCENTAGE_API,
  VIDEO_LABEL_API,
  VIDEO_QUESTION_1_API,
  VIDEO_QUESTION_2_API,
  VIDEO_QUESTION_3_API,
  VIDEO_QUESTION_4_API,
} from '../../ducks/app';
import ExpandableText from './helper';

const isDarkMode = datahandler.getAppTheme();
const LinnerColour = ['#387FF1', '#224EC9'];

const sections = [
  {
    id: 1,
    video: false,
    selected: false,
    title: 'What aspects of your job do....',
    imageUri: 'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
  },
  {
    id: 2,
    video: false,
    selected: false,
    title: 'What career achievement are...',
    imageUri: 'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
  },
  {
    id: 3,
    video: false,
    selected: false,
    title: 'What hobby or interest outside of....',
    imageUri: 'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
  },
  {
    id: 4,
    video: false,
    selected: false,
    title: 'What’s a fun fact about you that most...',
    imageUri: 'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
  },
];

const AuthVideoUpload = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [statedata, setStateData] = useState({
    showModal: false,
    selectedSection: null,
    dummyData: sections,
    isloading: false,
  });

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'Upload your Video',
      ),
    );
  }, [navigation, isDarkMode]);

  useEffect(() => {
    dispatch(
      VIDEO_LABEL_API.request({
        payloadApi: {},
        cb: async res => {
          const sections = [
            {
              id: 1,
              video: false,
              selected: false,
              title:res?.question_1,
              imageUri:
                'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
            },
            {
              id: 2,
              video: false,
              selected: false,
              title:res?.question_2,
              imageUri:
                'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
            },
            {
              id: 3,
              video: false,
              selected: false,
               title:res?.question_3,
              imageUri:
                'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
            },
            {
              id: 4,
              video: false,
              selected: false,
               title:res?.question_4,
              imageUri:
                'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
            },
          ];
          console.log('🚀 ~ useEffect ~ sectionsData:', sections);
          setStateData(prev => ({...prev, dummyData: sections}));
        },
      }),
    );
  }, []);

  const handleActionButton = (section, actionType) => {
    if (actionType === 'Delete') {
      const updatedData = statedata.dummyData.map(item =>
        item.id === section.id ? {...item, imageUri: ''} : item,
      );
      setStateData(prev => ({...prev, dummyData: updatedData}));
    } else {
      setStateData(prev => ({
        ...prev,
        showModal: true,
        selectedSection: section,
      }));
      handleUpload(section);
    }
  };

  const onVideoPicked = image => {
    setStateData(prev => ({...prev, showModal: false}));
    let imageUri = image.uri;
    const updatedData = statedata.dummyData.map(section =>
      section.id === statedata.selectedSection.id
        ? {...section, imageUri: imageUri, error: null, video: true}
        : section,
    );
    setStateData(prev => ({...prev, dummyData: updatedData, showModal: false}));
  };

  const handleSubmit = () => {
    const hasAtLeastOneVideo = statedata.dummyData.some(
      section => section.video,
    );

    if (!hasAtLeastOneVideo) {
      Util.showMessage('Please upload at least one video.');
      // const updatedData = statedata.dummyData.map(section => ({
      //   ...section,
      //   error: 'Please upload at least one video.',
      // }));
      // setStateData(prev => ({...prev, dummyData: updatedData}));
      return;
    }

    // If at least one video is present, clear all errors
    const updatedData = statedata.dummyData.map(section => ({
      ...section,
      error: null,
    }));
    setStateData(prev => ({...prev, dummyData: updatedData}));

    setStateData(prev => ({...prev, isloading: true}));

    const apiMappings = [
      {key: 'media_aspects_of_job', api: VIDEO_QUESTION_1_API},
      {key: 'career_achievement_media', api: VIDEO_QUESTION_2_API},
      {key: 'hobby_or_interest_media', api: VIDEO_QUESTION_3_API},
      {key: 'fun_fact_about_you_media', api: VIDEO_QUESTION_4_API},
    ];

    apiMappings.forEach((item, index) => {
      if (statedata.dummyData[index]?.video) {
        const formData = new FormData();
        formData.append(item.key, {
          uri: statedata.dummyData[index].imageUri,
          type: 'video/mp4',
          name: 'candidatevideo.mp4',
        });
        dispatch(
          item.api.request({
            payloadApi: formData,
            cb: async res => {
              setStateData(prev => ({...prev, isloading: false}));
              if (route?.params?.key == false) {
                NavigationService.navigate(StackNav.AuthPictureUpload, {
                  key: true,
                });
              } else {
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
              }
            },
          }),
        );
      }
    });
  };

  const handleUpload = section => {
    // setStateData(prev => ({...prev, isloading: false}));
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
                }else{
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
          {section.video ? (
            <MoVideoPlayer
              autoPlay={true}
              source={{
                uri: section.imageUri,
              }}
              style={styles.videoPlayerStyle}
            />
          ) : (
            <Image
              style={styles.imageStyle}
              resizeMode="contain"
              source={{uri: section.imageUri}}
            />
          )}
          <View style={styles.buttonContainer}>
            {['Upload', 'Replace', 'Delete'].map((title, index) => (
              <ButtonView key={index}>
                <LinerButton
                  onPress={() => handleActionButton(section, title)}
                  linearGradientStyle={styles.linearGradientStyle}
                  title={title}
                  LinnerColourArray={LinnerColour}
                />
              </ButtonView>
            ))}
          </View>
        </ImageBackground>
        {/* {section.error && <Text style={styles.errorText}>{section.error}</Text>} */}
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
            handleSubmit();
          }}
          BackgroundColor={Colors.Black_02}
          title={'Next'}
        />
      </View>
      <HandleImagePicker
        media={true}
        modalVisible={statedata.showModal}
        onClose={() => setStateData(prev => ({...prev, showModal: false}))}
        onImagePicked={onVideoPicked}
      />
    </Background>
  );
};

export default AuthVideoUpload;

const styles = ScaledSheet.create({
  sectionContainer: {
    marginBottom: '40@ms',
  },
  textStyle: {
    marginLeft: '20@ms',
    width: '280@ms',
  },
  imageBackground: {
    alignSelf: 'center',
    marginVertical: '20@ms',
    width: '100%',
    height: '250@ms',
  },
  counterCircle: {
    marginTop: '-15@ms',
    backgroundColor: Colors.Yellow,
    width: '40@ms',
    height: '40@ms',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.Back_70,
  },
  imageStyle: {
    width: '180@ms',
    height: '180@ms',
    alignSelf: 'center',
  },
  buttonContainer: {
    paddingHorizontal: '20@ms',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: -15,
    right: 0,
    left: 0,
  },
  linearGradientStyle: {
    width: '70@ms',
    height: '35@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '300@ms',
  },
  progressText: {
    fontFamily: Fonts.type.Black,
    color: isDarkMode ? Colors.White : Colors.Black,
    marginLeft: 10,
    fontSize: Fonts.size.size_14,
  },
  deleteButtonStyle: {
    position: 'absolute',
    right: '20@ms',
    top: '20@ms',
  },
  videoPlayerStyle: {
    width: '200@ms',
  },
  errorText: {
    color: 'red',
    fontSize: ms(14),
    marginLeft: ms(20),
    marginTop: ms(5),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
