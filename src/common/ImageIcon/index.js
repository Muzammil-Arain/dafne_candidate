import React from 'react';
import {Image} from 'react-native';
import {Colors} from '../../theme';

const ImageIcon = ({source, tintColor, width, height, isDarkMode}) => {
  return (
    <Image
      source={source}
      tintColor={
        tintColor ? tintColor : isDarkMode ? Colors.White : Colors.Black_21
      }
      resizeMode="contain"
      style={{
        width: width,
        height: height,
      }}
    />
  );
};

export default React.memo(ImageIcon);

// icon website link
// https://www.flaticon.com/search?word=mobile%20number
