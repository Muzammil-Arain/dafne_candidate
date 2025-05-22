/** @format */

import {Colors, Fonts} from '../../theme';
import {ScaledSheet} from 'react-native-size-matters';

export default ScaledSheet.create({
  linearGradient: {
    height: '50@ms',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '10@ms',
    borderRadius: '24@msr',
    backgroundColor: Colors.Yellow,
    borderColor: Colors.Black,
  },
  buttonTextStyle: {
    fontSize: '15@ms',
    textAlign: 'center',
    fontFamily: Fonts.type.Mediu,
    textTransform: 'capitalize',
    color: Colors.White,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderCircle: {
    width: '20@ms',
    height: '20@ms',
    borderWidth: '2@ms',
    borderColor: Colors.White,
    borderTopColor: Colors.Transparent, // Spinner effect
    borderRadius: '10@msr',
  },
});
