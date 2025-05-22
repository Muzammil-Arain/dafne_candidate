import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ScaleText from '../ScaleText';
import {Colors} from '../../theme';
import {ButtonView} from '../../components';
import {ms} from 'react-native-size-matters';
import ImageIcon from '../ImageIcon';
import VectorIcon from '../VectorIcon';

const LinerButton = ({
  title,
  onPress,
  LinnerColourArray = [],
  linearGradientStyle,
}) => {
  return (
    <ButtonView onPress={onPress}>
      <LinearGradient colors={LinnerColourArray} style={linearGradientStyle}>
        {title == 'Delete' ? (
          // <ImageIcon
          //   source={{
          //     uri: 'https://cdn-icons-png.flaticon.com/128/484/484662.png',
          //   }}
          //   tintColor={Colors.White}
          //   width={ms(14)}
          //   height={ms(14)}
          // />
          <VectorIcon name={'delete'} type={'MaterialIcons'} color={Colors.White} size={ms(20)} />
        ) : (
          <ScaleText fontSize={ms(14)} color={Colors.White} text={title} />
        )}
      </LinearGradient>
    </ButtonView>
  );
};

export default React.memo(LinerButton);
