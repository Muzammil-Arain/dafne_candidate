/** @format */

import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

const ImageContainer = Metrics.screenWidth * 0.32;
const ImageHeight = Metrics.screenWidth * 0.27;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemContainer: {
    width: Metrics.screenWidth * 0.9,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  buttonStyle: {
    flexDirection: 'row',
    borderBottomColor: 'rgba(216, 214, 214,0.8)',
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: Metrics.ratio(15, 15),
  },
  textStyle: {
    paddingLeft: Metrics.ratio(15, 15),
    fontSize: Metrics.generatedFontSize(16, 16),
    // fontFamily: Fonts.font_type.railWayRagular,
    color: Colors.black,
  },
  cancelButton: {
    padding: Metrics.ratio(15, 15, true),
    width: Metrics.screenWidth * 0.9,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyleCancel: {
    fontSize: Metrics.generatedFontSize(18, 18),
    // fontFamily: Fonts.font_type.railWayRagular,
    color: Colors.black,
  },
});
