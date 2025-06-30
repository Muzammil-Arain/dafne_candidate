import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {screenOptions} from '../../naviagtor/config';
import {AppButton, Background, LinerButton, ScaleText} from '../../common';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {Image} from 'react-native';
import {ButtonView, MoVideoPlayer} from '../../components';
import {ProgressBar} from 'react-native-paper';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms, ScaledSheet} from 'react-native-size-matters';
import HandleImagePicker from '../../components/HandleImagePicker';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();
const LinnerColour = ['#387FF1', '#224EC9'];

const sections = [
  {
    id: 1,
    video: false,
    title: 'What aspects of your job do....',
    imageUri: 'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
  },
  {
    id: 2,
    video: false,
    title: 'What career achievement are...',
    imageUri: 'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
  },
  {
    id: 3,
    video: false,
    title: 'What hobby or interest outside of....',
    imageUri: 'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
  },
  {
    id: 4,
    video: false,
    title: 'What’s a fun fact about you that most...',
    imageUri: 'https://i.postimg.cc/RVvwcjvb/Mask-Group-5-removebg-preview.png',
  },
];

const AuthVideoUpload = ({navigation, route}) => {
  const [statedata, setStateData] = useState({
    showModal: false,
    selectedSection: null,
    dummyData: sections,
  });

  
  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
       'Upload your Video'
      )
    );
  }, [navigation, isDarkMode]);

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
    }
  };

  const onImagePicked = image => {
    let imageUri = image.uri;
    const updatedData = statedata.dummyData.map(section =>
      section.id === statedata.selectedSection.id
        ? {...section, imageUri, video: true}
        : section,
    );
    setStateData(prev => ({...prev, dummyData: updatedData, showModal: false}));
  };

  const renderSection = section => {
    return(
      <View style={styles.sectionContainer} key={section.id}>
        <ScaleText
        isDarkMode={isDarkMode}
          fontFamily={Fonts.type.Mediu}
          fontSize={ms(16)}
          TextStyle={styles.textStyle}
          text={section.title}
        />
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
              source={{uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}}
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
      </View>
    );
  }

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
          onPress={() => {
            if (route?.params?.key == false) {
              NavigationService.navigate(StackNav.AuthPictureUpload, {
                key: true,
              });
            } else {
              NavigationService.push(StackNav.CompleteProfile, {
                value: '100%',
              });
            }
          }}
          BackgroundColor={Colors.Black_02}
          title={'Next'}
        />
      </View>
      <HandleImagePicker
        media={true}
        modalVisible={statedata.showModal}
        onClose={() => setStateData(prev => ({...prev, showModal: false}))}
        onImagePicked={onImagePicked}
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
    fontFamily:Fonts.type.Black,
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
    backgroundColor:'red'
  },
});
