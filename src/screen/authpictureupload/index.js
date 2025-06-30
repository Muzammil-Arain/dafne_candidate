import {ImageBackground, Text, View, Image} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {screenOptions} from '../../naviagtor/config';
import {AppButton, Background, LinerButton, ScaleText} from '../../common';
import {Colors, Fonts, Images} from '../../theme';
import {ButtonView} from '../../components';
import {ProgressBar} from 'react-native-paper';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import HandleImagePicker from '../../components/HandleImagePicker';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();
const LinnerColour = ['#387FF1', '#224EC9'];

const sectionsData = [
  {
    id: 1,
    title: 'Professional Profile',
    imageUri: 'https://i.postimg.cc/L5tWhKNt/Mask-Group-2.png',
  },
  {
    id: 2,
    title: 'Who is Behind the Uniform?',
    imageUri: 'https://i.postimg.cc/1XR99HK3/Image-62.png',
  },
  {
    id: 3,
    title: 'Your favorite hobby?',
    imageUri:
      'https://i.postimg.cc/wjR9T3DL/cute-woman-artist-drawing-acrylic-paints-canvas-82574-3737.png',
  },
];

const AuthPictureUpload = ({navigation,route}) => {
  console.log(route?.params?.key,'route?.params?.key');
  
  const [statedata, setStateData] = useState({
    showModal: false,
    selectedSection: null,
    dummyData: sectionsData,
  });

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
       'Upload your photos'
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
      // If it's Upload or Replace, open the modal for image selection
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
        ? {...section, imageUri}
        : section,
    );
    setStateData(prev => ({...prev, dummyData: updatedData, showModal: false}));
  };

  const renderSection = section => (
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
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={{uri: section.imageUri}}
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
    </View>
  );

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
          progress={route?.params?.key == false ?0.9 : 1}
          color="#387FF1"
          style={styles.progressBar}
        />
        <Text style={styles.progressText}>{route?.params?.key == false ? '90%' : '100%'}</Text>
      </View>
      <View style={{marginVertical: ms(10)}}>
        <AppButton
          onPress={() => {
            if(route.params.key == true){
              NavigationService.push(StackNav.CompleteProfile, {
                value: '100%',
              })
            } else{
              NavigationService.navigate(StackNav.AuthVideoUpload,{
                key:true
              })
            }
            }}
          BackgroundColor={Colors.Black_02}
          title={'Next'}
        />
      </View>
      <HandleImagePicker
        modalVisible={statedata.showModal}
        onClose={() => setStateData(prev => ({...prev, showModal: false}))}
        onImagePicked={onImagePicked}
      />
    </Background>
  );
};

export default AuthPictureUpload;

const styles = ScaledSheet.create({
  sectionContainer: {
    marginBottom: '40@ms', // Scaled marginBottom
  },
  textStyle: {
    marginLeft: '20@ms', // Scaled marginLeft
  },
  imageBackground: {
    alignSelf: 'center',
    marginVertical: '20@ms', // Scaled marginVertical
    width: '100%',
    height: '250@ms', // Scaled height
  },
  counterCircle: {
    marginTop: '-15@ms', // Scaled marginTop (negative margin)
    marginLeft: '-13@ms', // Scaled marginLeft (negative margin)
    backgroundColor: Colors.Yellow,
    width: '40@ms', // Scaled width
    height: '40@ms', // Scaled height
    borderRadius: '100@ms', // Scaled borderRadius
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '0.5@ms', // Scaled borderWidth
    borderColor: Colors.Back_70,
  },
  imageStyle: {
    width: '170@ms', // Scaled width
    height: '170@ms', // Scaled height
    alignSelf: 'center',
  },
  buttonContainer: {
    paddingHorizontal: '20@ms', // Scaled paddingHorizontal
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: '-15@ms', // Scaled bottom margin
    right: 0,
    left: 0,
  },
  linearGradientStyle: {
    width: '70@ms', // Scaled width
    height: '35@ms', // Scaled height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@ms', // Scaled borderRadius
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: '15@ms', // Scaled height
    borderRadius: '10@ms', // Scaled borderRadius
    marginVertical: '10@ms', // Scaled marginVertical
    width: '300@ms', // Scaled width
  },
  progressText: {
    color: isDarkMode ? Colors.White: Colors.Black,
    fontFamily:Fonts.type.Black,
    marginLeft: '10@ms', // Scaled marginLeft
    fontSize: Fonts.size.size_14,
  },
});