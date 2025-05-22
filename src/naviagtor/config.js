/** @format */
import React from 'react';
import { AppStyles, Colors, Images } from '../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import { ButtonView } from '../components';
import { NavigationService } from '../utils';
import { Image } from 'react-native';
import { ms } from 'react-native-size-matters';

export const screenOptions = (
  { route, navigation },
  BackPress,
  isDarkMode,
  headerTitle,
  headerRight,
  headerLeft = true,
) => {
  const headerBackgroundColor = isDarkMode ? Colors.Black_21 : Colors.White;
  const headerTintColor = isDarkMode ? Colors.Whiite_CC : Colors.Black_21;

  return {
    headerBackTitleVisible: false,
    headerStyle: {
      ...AppStyles.headerStyle,
      backgroundColor: headerBackgroundColor,
    },
    headerTitleAlign: 'center',
    headerTitle: headerTitle || '',
    headerTitleStyle: [
      AppStyles.headerTitleStyle,
      {
        color: headerTintColor,
      },
    ],
    headerLeftContainerStyle: AppStyles.headerLeftContainerStyle,
    headerRightContainerStyle: AppStyles.headerRightContainerStyles,
    headerLeft: () =>
      headerLeft ? (
        <ButtonView
          onPress={BackPress || (() => NavigationService.goBack())}
          style={{
            width: ms(35),
            height: ms(35),
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Entypo name="chevron-left" color={headerTintColor} size={ms(28)} />
        </ButtonView>
      ) : null,
    headerRight: () =>
      headerRight ? (
        <ButtonView style={{ paddingRight: ms(10) }}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/128/10397/10397649.png" }}
            style={{ width: ms(25), height: ms(25) }}
          />
        </ButtonView>
      ) : null,
  };
};
