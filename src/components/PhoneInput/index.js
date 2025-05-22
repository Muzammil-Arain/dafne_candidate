import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import PhoneInput from 'react-native-phone-input';
import {Controller} from 'react-hook-form';
import {InputError, ScaleText} from '../../common';
import {
  AppStyles,
  Colors,
  Fonts,
  Metrics,
  Theme,
  changeFonts,
} from '../../theme';

const PhoneInputComponent = props => {
  const {control, name, initialCountry = 'us', ref, error,isDarkMode} = props ?? '';

  const renderController = controlllerProps => {
    return (
      <View style={{marginTop: 10}}>
        {renderInput(controlllerProps.field)}
        {error && renderError()}
      </View>
    );
  };
  // render error
  const renderError = () => {
    return <InputError error={error} />;
  };

  const renderInput = fields => {
    const {value, onChange} = fields;
    return (
      <View>
        <ScaleText
        isDarkMode={isDarkMode}
          TextStyle={{
            fontWeight: '500',
          }}
          color={Colors.Black_02}
          fontFamily={Fonts.type.Roman}
          fontSize={Fonts.size.size_14}
          text="Phone *"
        />
        <PhoneInput
          value={value}
          initialValue={value ? value : ''}
          style={[
            {
              padding: 15,
              borderRadius: 5,
              backgroundColor: Colors.Whiite_FA,
              marginTop: Metrics.ratio(5),
              height: Metrics.ratio(50),
              borderWidth: 1,
              borderColor: error ? 'red' : Colors.Whiite_CC,
            },
            AppStyles.dropShadow,
          ]}
          textStyle={{
            color: '#000',
          }}
          initialCountry={initialCountry}
          textProps={{
            placeholder: 'Enter your phone number',
          }}
          autoFormat={true}
          onChangePhoneNumber={text => onChange(text)}
          ref={ref}
        />
      </View>
    );
  };
  return <Controller control={control} name={name} render={renderController} />;
};

export default PhoneInputComponent;

const styles = StyleSheet.create({});
