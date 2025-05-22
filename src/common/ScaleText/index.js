import React from 'react';
import {Text} from 'react-native';
import {Colors, Fonts} from '../../theme';
import { ms } from 'react-native-size-matters';

const ScaleText = ({
  text,
  fontFamily,
  fontSize,
  color,
  width,
  numberOfLines,
  textAlign,
  TextStyle,
  isDarkMode,
}) => {
  return (
    <Text
      style={[
        {
          fontFamily: fontFamily ?? Fonts.type.Roman,
          fontSize: fontSize,
          color: isDarkMode
            ? Colors.Whiite_CC
            : color
            ? color
            : Colors.Black_21,
          width: width,
          textAlign: textAlign,
          lineHeight: ms(22),
        },
        TextStyle,
      ]}
      numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

export default React.memo(ScaleText);
