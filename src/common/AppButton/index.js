/** @format */

import React from 'react';
import {Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {ButtonView} from '../../components';
import styles from './styles';
import {Colors, Fonts} from '../../theme';
import LottieView from 'lottie-react-native';
import {ms} from 'react-native-size-matters';
import ScaleText from '../ScaleText';
import {useSelector} from 'react-redux';
import {getRequestFlag} from '../../ducks/requestFlags';

const AppButton = ({
  title,
  containerStyle,
  textStyle,
  isloading,
  onPress,
  disabled,
  BackgroundColor,
  imagesource,
  isDarkMode,
  ShowLinear = true,
  type,
}) => {
  const requestFlags = useSelector(getRequestFlag(type));
  const loading = requestFlags.loading || isloading;

  return (
    <ButtonView
      style={[
        styles.linearGradient,
        containerStyle,
        {
          backgroundColor: BackgroundColor
            ? BackgroundColor
            : ShowLinear
            ? Colors.Yellow
            : Colors.White,
          borderWidth: ShowLinear ? 0 : 1,
        },
      ]}
      disabled={loading || disabled} // Disable if `loading`, `disabled`, or `type` exists
      onPress={onPress}
      // disabled={isloading == true ? true : disabled}
    >
      {/* <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={
          ShowLinear
            ? [Colors.Yellow, Colors.Yellow]
            : BackgroundColor
            ? [BackgroundColor]
            : [Colors.White, Colors.White]
        }
        style={[
          styles.linearGradient,
          containerStyle,
          {
            borderRadius: 26,
            borderWidth: !ShowLinear ? 1 : 0,
            borderColor: !ShowLinear && Colors.Black_02,
          },
        ]}> */}
      {loading ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: ms(-20),
          }}>
          <LottieView
            source={
              !ShowLinear
                ? require('../../assets/lottie/loader_yellow.json')
                : require('../../assets/lottie/loader_white.json')
            }
            style={{
              width: ms(60),
              height: ms(60),
            }}
            autoPlay={true}
            loop={true}
          />
          <ScaleText
            TextStyle={{marginLeft: ms(-12)}}
            fontFamily={Fonts.type.Mediu}
            color={ShowLinear ? Colors.White : Colors.Black}
            fontSize={ms(14)}
            text={'Loading....'}
          />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: imagesource ? 'space-between' : 'center',
          }}>
          {imagesource && (
            <Image
              source={imagesource}
              resizeMode="contain"
              style={{width: ms(15), height: ms(15), marginRight: 5}}
            />
          )}
          <Text
            style={[
              styles.buttonTextStyle,
              textStyle,
              {
                color: ShowLinear ? Colors.White : Colors.Black,
              },
            ]}>
            {title}
          </Text>
        </View>
      )}
      {/* </LinearGradient> */}
    </ButtonView>
  );
};

export default React.memo(AppButton);

AppButton.propTypes = {
  title: PropTypes.string,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  isloading: PropTypes.bool,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

AppButton.defaultProps = {
  title: '',
  containerStyle: {},
  textStyle: {},
  isloading: false,
  onPress: () => {},
  disabled: false,
};
