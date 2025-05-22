import {Text, View, Image} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {screenOptions} from '../../naviagtor/config';
import {Colors, Fonts, Images} from '../../theme';
import {AppButton, Background, ScaleText} from '../../common';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ButtonView} from '../../components';
import {ms} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import { styles } from './styles';

const isDarkMode = datahandler.getAppTheme();

const DummyText =
  'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letter';

const CompleteProfile = ({navigation, route}) => {
  const TotalProfileValue = route?.params?.value || '';

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {navigation},
        () => {
          if (TotalProfileValue == '75%') {
            NavigationService.navigate(StackNav.SelectOne);
          } else if (TotalProfileValue == '100%') {
            NavigationService.navigate(StackNav.UploadProfile);
          } else {
            navigation.goBack();
          }
        },
        isDarkMode,
      ),
    );
  }, [navigation, isDarkMode, TotalProfileValue]);

  return (
    <Background isDarkMode={isDarkMode}>
      <Image
        source={Images.images.congratulations}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.heading}>Congratulations!</Text>
      </View>
      <ScaleText
        isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Roman}
        textAlign="center"
        TextStyle={styles.subheading}
        color={Colors.Black_02}
        text={
          TotalProfileValue == '100%'
            ? 'WHAT NEXT?'
            : `${'Your profile is'} ${TotalProfileValue} ${'Complete '}`
        }
        fontSize={ms(17)}
      />
      {TotalProfileValue !== '100%' && (
        <View
          style={{
            marginTop: ms(20),
          }}>
          <ScaleText
            textAlign="center"
            fontFamily={Fonts.type.Roman}
            TextStyle={styles.description}
            color={Colors.Black_02}
            text={DummyText}
            fontSize={ms(14)}
          />
        </View>
      )}
      {TotalProfileValue == '100%' && (
        <View style={styles.container}>
          <ButtonView
            onPress={() =>
              NavigationService.navigate(
                'Profile',
                {
                  key: true,
                },
                'AppStack',
              )
            }>
            <Text style={styles.text}>
              1) Review your <Text style={styles.highlight}>profile</Text> to
              make sure it looks great
            </Text>
          </ButtonView>
          <View style={{marginTop: ms(10)}}>
            <ButtonView
              onPress={() =>
                NavigationService.navigate(StackNav.Notifications)
              }>
              <Text style={styles.text}>
                2) Get a coffee! Don't forget to turn on the
                <Text style={styles.highlight}>notifications</Text>
              </Text>
            </ButtonView>
          </View>
        </View>
      )}
      {TotalProfileValue == '100%' && (
        <Image
          source={Images.icon.cup}
          resizeMode="cover"
          style={{
            width: ms(130),
            height: ms(130),
            marginTop: ms(20),
            alignSelf: 'center',
          }}
        />
      )}
      <View
        style={[
          styles.footerButtonContainer,
          {
            marginTop: TotalProfileValue == '100%' ? ms(100) : ms(120),
          },
        ]}>
        {TotalProfileValue !== '100%' && (
          <AppButton
            imagesource={Images.icon.bookmark}
            BackgroundColor={Colors.Black_02}
            containerStyle={styles.saveButton}
            title="Save for Later"
          />
        )}
        <AppButton
          onPress={() => {
            if (TotalProfileValue == '75%') {
              NavigationService.navigate(StackNav.UploadProfile);
            } else if (TotalProfileValue == '100%') {
              // NavigationService.navigate(StackNav.Profile);
              NavigationService.navigate('AppStack', {
                key: true,
              });
            } else {
              NavigationService.navigate(StackNav.ProjectName);
            }
          }}
          title={TotalProfileValue == '75%' ? 'Keep Going' : 'Continue'}
        />
      </View>
    </Background>
  );
};

export default CompleteProfile;
