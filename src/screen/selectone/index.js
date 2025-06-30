import {Image, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {screenOptions} from '../../naviagtor/config';
import {Background} from '../../common';
import {Images} from '../../theme';
import {ButtonView} from '../../components';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import { ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();

const SelectOne = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'Select One'
      )
    );
  }, [navigation, isDarkMode]);

  return (
    <Background isDarkMode={isDarkMode}>
      <View style={styles.container}>
        <ButtonView onPress={() => NavigationService.navigate(StackNav.What)}>
          <Image
            source={Images.images.what}
            style={styles.image}
            resizeMode="cover"
          />
        </ButtonView>
        <ButtonView onPress={() => NavigationService.navigate(StackNav.Where,{
          key:false
        })}>
          <Image
            source={Images.images.where}
            style={styles.image}
            resizeMode="cover"
          />
        </ButtonView>
      </View>
    </Background>
  );
};

export default SelectOne;
const styles = ScaledSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '20@ms', // Scaled vertical padding
  },
  image: {
    width: '320@ms', // Scaled horizontal width
    height: '210@ms', // Scaled vertical height
    marginBottom: '40@ms', // Scaled vertical margin
    borderRadius: 14,
  },
});
