/** @format */
import React from 'react';
import {AppStyles, Colors, Images} from '../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import {ButtonView} from '../components';
import {NavigationService} from '../utils';
import {Image} from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';

export const screenOptions = ({ route, navigation }, BackPress, isDarkMode, headerTitle, headerRight) => {
  const headerBackgroundColor = isDarkMode ? Colors.Black_21 : Colors.White;
  const headerTintColor = isDarkMode ? Colors.Whiite_CC : Colors.Black_21;

  return {
    headerBackTitleVisible: false,
    headerStyle: {
      ...AppStyles.headerStyle,
      backgroundColor: headerBackgroundColor,
    },
    headerTitleAlign: 'center',
    headerTitle: headerTitle || '', // Use the provided title or default to an empty string
    headerTitleStyle: [
      AppStyles.headerTitleStyle,
      {
        color: headerTintColor,
      },
    ],
    headerLeftContainerStyle: AppStyles.headerLeftContainerStyle,
    headerRightContainerStyle: AppStyles.headerRightContainerStyles,
    headerLeft: () => (
      <ButtonView
        onPress={BackPress || (() => NavigationService.goBack())}
        style={{
          width: ms(35),
          height: ms(35),
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Entypo name="chevron-left" color={headerTintColor} size={ms(28)} />
      </ButtonView>
    ),
    headerRight: () =>
      headerRight ? (
        <ButtonView style={{ paddingRight: ms(10) }}>
          <Image
            source={{ uri: Images.iconsource.dummyuserimage }}
            style={{ width: ms(45), height: ms(45), borderRadius: 100 }}
          />
        </ButtonView>
      ) : null,
  };
};
