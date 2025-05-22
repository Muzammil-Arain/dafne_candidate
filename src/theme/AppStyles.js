import { StyleSheet, I18nManager } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import Colors from './Colors';
import Fonts from './Fonts';
import { Util } from '../utils';

export default ScaledSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  flashMessage: {
    fontFamily: Fonts.type.semiBold,
    fontSize: '16@ms', 
    color: Colors.White,
    lineHeight: '22@ms',
  },
  transformImage: {
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
  alignCenterView: { justifyContent: 'center', alignItems: 'center' },
  flatlistContentContainer: {},

  headerStyle: {
    elevation: 0,
    height: Util.isPlatformIOS()
      ? '120@ms' 
      : '100@ms',
  },
  headerTitleStyle: {
    fontFamily: Fonts.type.Mediu,
    fontSize: '20@ms',
  },
  headerLeftContainerStyle: {
    left: Util.isPlatformIOS() ? '10@ms' : '10@ms'
  },
  headerRightContainerStyles: {
    right: Util.isPlatformIOS() ? '10@ms' : '10@ms'
  },
});
