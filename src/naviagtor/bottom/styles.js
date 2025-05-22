import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';
import { ScaledSheet } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

export const styles = ScaledSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10@ms',
  },
  focusedIcon: {
    transform: [{ scale: 1.1 }],
  },
  icon: {
    height: '25@ms',
    width: '25@ms',
    marginTop: '5@ms',
  },
  labelFont: {
    fontSize: '11@ms',
    color: Colors.Black_57,
    fontFamily: Fonts.type.Roman,
    marginBottom: Platform.OS == 'android' ? '10@ms' : '-4@ms',
  },
  shortListIndicator: {
    position: 'absolute',
    zIndex: 1,
    top: '5@ms',
    left: '40@ms',
  },
  shortListText: {
    fontSize: '12@ms',
    color: Colors.DarkYellow,
  },
});
