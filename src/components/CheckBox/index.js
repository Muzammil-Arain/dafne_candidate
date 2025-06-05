import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, Animated, View} from 'react-native';
import {ScaleText, VectorIcon} from '../../common';
import {Colors, Fonts} from '../../theme';
import {Controller} from 'react-hook-form';
import {InputError} from '../../common';
import ButtonView from '../ButtonView';
import {ms, ScaledSheet} from 'react-native-size-matters';

const AppCheckBox = ({
  control,
  onPress,
  name,
  error,
  CheckBoxTextStyle,
  text,
  isDarkMode,
  onChangeCustom,
  isChecked, // New prop to handle true/false condition
}) => {
  const checkBox = ({onChange, value}) => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(scaleValue, {
        toValue: isChecked ?? value ? 1 : 0, // Use isChecked prop if provided
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, [isChecked, value, scaleValue]);

    const animatedScale = scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={[
            styles.container,
            {
              backgroundColor: isDarkMode
                ? Colors.more_black[800]
                : Colors.Whiite_FA,
              borderColor: isDarkMode ? Colors.Whiite_CC : Colors.Border,
            },
          ]}
          onPress={() => {
            if (onPress) {
              onChangeCustom && onChangeCustom(!value);
              onPress(!value); // Trigger external handler
            } else {
              onChangeCustom && onChangeCustom(!value);
              onChange(!value); // Fallback to internal state change
            }
          }}>
          <Animated.View
            style={[
              styles.iconContainer,
              {transform: [{scale: animatedScale}]},
            ]}>
            {(isChecked ?? value) && ( // Render checkmark if isChecked or value is true
              <VectorIcon
                name="check"
                type="FontAwesome"
                size={ms(17)}
                color={Colors.Yellow}
              />
            )}
          </Animated.View>
        </TouchableOpacity>
        <ButtonView
          onPress={onPress}
          container={{
            marginLeft: ms(10),
          }}>
          <ScaleText
            isDarkMode={isDarkMode}
            text={text}
            fontFamily={Fonts.type.Roman}
            fontSize={ms(14)}
            TextStyle={[styles.rememberText, CheckBoxTextStyle]}
          />
        </ButtonView>
      </View>
    );
  };

  const renderController = controllerProps => {
    return (
      <View>
        {checkBox(controllerProps.field)}
        {error && renderError()}
      </View>
    );
  };

  const renderError = () => {
    return <InputError error={error} />;
  };

  return <Controller control={control} name={name} render={renderController} />;
};

export default React.memo(AppCheckBox);

const styles = ScaledSheet.create({
  container: {
    width: '20@ms',
    height: '20@ms',
    borderWidth: 1.5,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
