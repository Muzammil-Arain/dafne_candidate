import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {screenOptions} from '../../naviagtor/config';
import {AppButton, Background, ScaleText} from '../../common';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {ProgressBar} from 'react-native-paper';
import {ButtonView} from '../../components';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode  = datahandler.getAppTheme();

const UploadProfile = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
       'Complete your Profile'
      )
    );
  }, [navigation, isDarkMode]);

  return (
    <Background isDarkMode={isDarkMode}> 
      <ScaleText
      isDarkMode={isDarkMode}
        fontSize={ms(16)}
        textAlign={'center'}
        fontFamily={Fonts.type.Mediu}
        text={
          'We Want to Learn About You as a Person Because We Are All Fabulous!'
        }
      />
      <ButtonView
        onPress={() => NavigationService.navigate(StackNav.AuthPictureUpload,{
          key:false
        })}>
        <Image
          source={Images.images.ImagePoster}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </ButtonView>
      <ButtonView
        onPress={() => NavigationService.navigate(StackNav.AuthVideoUpload,{
          key:false
        })}>
        <Image
          source={Images.images.VideoPoster}
          resizeMode="contain"
          style={[styles.imageStyle, styles.imageMarginBottom]}
        />
      </ButtonView>
      <ScaleText
      isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Mediu}
        fontSize={ms(16)}
        text={'Your Profile Status'}
        color={Colors.Black}
      />
      <View style={styles.progressContainer}>
        <ProgressBar
          progress={0.8}
          color="#387FF1"
          style={styles.progressBar}
        />
        <Text style={styles.progressText}>80%</Text>
      </View>
      <View style={{marginVertical: 10}}>
        {/* <AppButton
          onPress={() => NavigationService.navigate(StackNav.AuthPictureUpload)}
          BackgroundColor={Colors.Black_02}
          title={'Next'}
        /> */}
      </View>
    </Background>
  );
};

export default UploadProfile;

const styles = ScaledSheet.create({
  imageStyle: {
    width: '100%',
    marginTop: '30@ms', // Scaled marginTop
    height: '230@ms', // Scaled height
  },
  imageMarginBottom: {
    marginBottom: '30@ms', // Scaled marginBottom
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
    color: isDarkMode ? Colors.White : Colors.Black,
    marginLeft: '10@ms', // Scaled marginLeft
    fontFamily:Fonts.type.Black,
    fontSize: Fonts.size.size_14,
  },
});