// components/FastImageComponent.js

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const FastImageComponent = ({
  uri,
  style,
  resizeMode = FastImage.resizeMode.cover,
  priority = FastImage.priority.normal,
  fallbackImage,
}) => {
  const [error, setError] = useState(false);

  return (
    <FastImage
      style={style}
      source={
        error && fallbackImage
          ? fallbackImage
          : {
              uri,
              priority,
            }
      }
      resizeMode={resizeMode}
      onError={() => setError(true)}
    />
  );
};

export default FastImageComponent;
