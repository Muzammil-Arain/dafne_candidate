import {Image, StatusBar, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {AppButton, ScaleText} from '../../common';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const Welcome = () => {
  const [isDarkMode, setIsDarkMode] = useState(null);

  useEffect(() => {
    const getTheme = datahandler.getAppTheme();
    setIsDarkMode(getTheme);
  }, []);

  const styles = useMemo(() =>
    ScaledSheet.create({
      container: {
        flex: 1,
        height: Metrics.screenHeight,
        backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White_F8,
      },
      logo: {
        alignSelf: 'center',
        marginTop: '150@ms',
        width: '250@ms',
        height: '320@ms',
      },
      contentContainer: {
        marginTop: '5@ms',
        paddingVertical: '30@ms',
        paddingHorizontal: '20@ms',
        borderTopLeftRadius: '24@msr',
        borderTopRightRadius: '24@msr',
        shadowColor: isDarkMode ? Colors.White : Colors.Black,
        flex: 1,
        elevation: 2,
        backgroundColor: isDarkMode ? Colors.Black_21 : Colors.White,
      },
      welcomeTextContainer: {
        marginVertical: '20@ms',
      },
      buttonContainer: {
        marginTop: '30@ms',
      },
    }), [isDarkMode]
  );

  if (isDarkMode === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={isDarkMode ? Colors.more_black[900] : Colors.White_F8}
      />
      <Image
        source={Images.images.app_logo}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.contentContainer}>
        <View style={styles.welcomeTextContainer}>
          <ScaleText
            isDarkMode={isDarkMode}
            textAlign={'center'}
            fontFamily={Fonts.type.Mediu}
            fontSize={ms(22)}
            text={'Welcome to Talentoneed'}
          />
        </View>
        <ScaleText
          isDarkMode={isDarkMode}
          textAlign={'center'}
          color={Colors.Black}
          fontFamily={Fonts.type.Roman}
          fontSize={ms(15)}
          text={
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
          }
        />
        <View style={styles.buttonContainer}>
          <AppButton
            onPress={() => NavigationService.navigate(StackNav.Login)}
            title={'Let\'s Start!'}
          />
        </View>
      </View>
    </View>
  );
};

export default Welcome;
