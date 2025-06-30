import { View, Image} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Background, PopupModal, ScaleText} from '../../common';
import {Colors, Images} from '../../theme';
import {ButtonView} from '../../components';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import { screenOptions } from '../../naviagtor/config';

// const isDarkMode = datahandler.getAppTheme();
const isDarkMode = true

const options = [
  {text: 'Telentoneed Assistance', icon: Images.icon.more_icon},
  {text: 'Terms and Conditions', icon: Images.icon.more_icon},
  {text: 'Setting', icon: Images.icon.more_icon},
  {text: 'Bill Payments', icon: Images.icon.more_icon},
  {text: 'Logout', icon: Images.icon.more_icon},
];

const More = ({navigation}) => {
  const [state, setState] = useState({
    logoutModal: false,
    logoutLoading:false,
  });

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'More'
      )
    );
  }, [navigation, isDarkMode]);

  const handlepress = item => {
    if (item.text == options[4].text) {
     setState(prev => ({...prev, logoutModal:true}))
    }
  };

  const handleLogOut = () => {
    setState(prev => ({...prev, logoutLoading:true}));
    setTimeout(() => {
      setState(prev => ({...prev,logoutLoading:false,logoutModal:false}))
    }, 1500);
  };

  return (
    <Background isDarkMode={isDarkMode}>
      <View
        style={{
          marginTop: ms(20),
        }}>
        {options.map((item, index) => (
          <ButtonView onPress={() => handlepress(item)} key={index}>
            <View style={styles.optionContainer}>
              <Image
                source={item.icon}
                resizeMode="contain"
                style={styles.icon}
              />
              <ScaleText
              isDarkMode={isDarkMode}
                color={Colors.Black}
                fontSize={ms(15)}
                text={item.text}
              />
            </View>
          </ButtonView>
        ))}
      </View>
      <PopupModal
        isModalVisible={state.logoutModal}
        showButtons={true}
        ButtonTitleOne={'Yes'}
        ButtonTitleTwo={'No'}
        ButtonOneLoading={state.logoutLoading}
        ButtonOnePress={() => handleLogOut()}
        ButtonTwoPress={() => setState(prev => ({...prev, logoutModal: false}))}
        title={'Logout Confirmation'}
        description={
          'Are you sure you want to log out? This will end your current session.'
        }
      />
    </Background>
  );
};

export default More;

const styles = ScaledSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20@ms',
  },
  icon: {
    width: '40@ms',
    height: '40@ms',
    marginRight: '20@ms',
  },
});
