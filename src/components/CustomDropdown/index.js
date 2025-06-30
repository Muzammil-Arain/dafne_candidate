import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Colors, Fonts} from '../../theme';
import {TextInput} from 'react-native-paper';
import DropDown from '../DropDown';
import ButtonView from '../ButtonView';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {DateTimePicker, InputError, VectorIcon} from '../../common';

const CustomDropdown = ({
  label,
  placeholder,
  value,
  data = [],
  type = 'dropdown',
  selectedValue,
  mainContainerStyle,
  error,
  isDarkMode,
}) => {
  const [modal, setModal] = useState(false);

  // Colors based on theme
  const backgroundColor = isDarkMode
    ? Colors.more_black[900]
    : Colors.White;
  const textColor = isDarkMode ? Colors.Whiite_CC : Colors.Black_21;
  const borderColor = isDarkMode ? Colors.more_black[800] : Colors.Border;
  const LabelColor = isDarkMode ? Colors.more_black[800] : Colors.Black_02;
  const activeBorderColor = isDarkMode ? Colors.Yellow_Dark : Colors.Yellow;

  const customInput = () => {
    const Label = <Text style={{color:LabelColor,backgroundColor:isDarkMode ? 'transparent' : Colors.White}}>{label}</Text>;
    return (
      <ButtonView
        style={[mainContainerStyle, {backgroundColor: isDarkMode ? 'transparent' :Colors.White}]}
        onPress={() => {
          setModal(true);
        }}>
        <TextInput
          label={Label}
          value={value === '' ? 'Select' : value}
          editable={false}
          mode="outlined"
          pointerEvents="none"
          placeholder={placeholder}
          placeholderTextColor={textColor}
          style={{
            backgroundColor,
            fontSize: ms(12),
            color: textColor,
          }}
          outlineStyle={{
            borderWidth: 1,
          }}
          textColor={textColor}
          outlineColor={borderColor}
          activeOutlineColor={activeBorderColor}
          theme={{
            fonts: {
              bodyLarge: {
                fontFamily: Fonts.type.Roman,
              },
            },
          }}
          labelStyle={{
            flexWrap: 'wrap',
            color: textColor,
          }}
        />

        {type === 'dropdown' ? (
          <DropDown
            data={data}
            isDarkMode={isDarkMode}
            isModalVisible={modal}
            handleHideModal={() => setModal(false)}
            handlePress={item => {
              selectedValue(item?.name);
              setModal(false);
            }}
            styleMainModel={{padding: 0, margin: 0}}
            innerModalViewStyle={{
              flex: 1,
              borderRadius: 0,
              backgroundColor: backgroundColor,
            }}
          />
        ) : (
          <DateTimePicker
            isDatePickerVisible={modal}
            onCancel={() => setModal(false)}
            onConfirm={item => {
              selectedValue(item);
              setModal(false);
            }}
          />
        )}

        <View
          style={{
            width: ms(15),
            height: ms(15),
            position: 'absolute',
            right: ms(10),
            top: ms(25),
          }}>
          <VectorIcon type={'AntDesign'} name={'caretdown'} color={textColor} />
        </View>
      </ButtonView>
    );
  };

  // Render error
  const renderError = () => {
    return error && <InputError error={error} />;
  };

  return (
    <View style={{marginVertical: ms(10)}}>
      {customInput()}
      {renderError()}
    </View>
  );
};

export default React.memo(CustomDropdown);

const styles = ScaledSheet.create({
  container: {
    width: '22@ms',
    height: '22@ms',
    borderWidth: 2,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
