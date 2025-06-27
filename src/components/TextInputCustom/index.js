import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../theme';
import {Controller} from 'react-hook-form';
import {InputError} from '../../common';
import {TextInput} from 'react-native-paper';
import {ms, ScaledSheet} from 'react-native-size-matters';

const TextInputCustom = ({
  control,
  cuntomStyle,
  name,
  error,
  label,
  placeholder,
  textAlignVertical,
  multiline,
  value,
  isDarkMode,
  keyboardType,
  editable,
  issalary = false,
  optional = false, // Add an optional prop
  onChangeText, // Callback for directly handling text changes
}) => {
  console.log("🚀 ~ issalary:", issalary)
  const textColor = isDarkMode ? Colors.Whiite_CC : Colors.Black_21;
  const formatCurrency = (value, currency = 'USD') => {
  const cleaned = value.replace(/[^0-9]/g, '');

  if (!cleaned) return '';

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(cleaned);
};

  const renderInput = ({onChange, value}) => (
    <TextInput
      editable={editable}
      keyboardType={keyboardType}
      textAlignVertical={textAlignVertical}
      label={label}
      multiline={multiline}
      value={value}
      onChangeText={text => {
        if (onChange) {
          if (issalary) {
            const formatted = formatCurrency(text, 'USD');
            onChange(formatted);
          }else{
            onChange(text); // Controlled by react-hook-form
          }
        }
        if (onChangeText) {
          onChangeText(text); // External callback for direct usage
        }
      }}
      textColor={isDarkMode ? Colors.White : Colors.Black}
      mode="outlined"
      placeholder={placeholder}
      placeholderTextColor={textColor}
      style={[
        cuntomStyle,
        {
          backgroundColor: isDarkMode
            ? Colors.more_black[900]
            : Colors.Whiite_FC,
          fontSize: ms(12),
          color: textColor,
        },
      ]}
      outlineStyle={{
        borderWidth: 1,
      }}
      outlineColor={isDarkMode ? Colors.more_black[800] : Colors.Border}
      activeOutlineColor={Colors.Yellow}
    />
  );

  const renderError = () => {
    return <InputError error={error} />;
  };

  if (optional) {
    // Render without react-hook-form Controller
    return (
      <View style={styles.inputContainer}>
        {renderInput({onChange: onChangeText, value})}
        {error && renderError()}
      </View>
    );
  }

  // Render with react-hook-form Controller
  return (
    <Controller
      control={control}
      name={name}
      render={({field}) => (
        <View style={styles.inputContainer}>
          {renderInput(field)}
          {error && renderError()}
        </View>
      )}
    />
  );
};

export default React.memo(TextInputCustom);

const styles = ScaledSheet.create({
  inputContainer: {
    marginVertical: '10@ms',
  },
});
 


