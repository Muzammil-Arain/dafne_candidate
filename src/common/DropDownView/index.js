import React from 'react';
import PropTypes from 'prop-types';
import {Colors, Fonts} from '../../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const DropDownView = ({
  onPress,
  title,
  value,
  errormessage,
  titlestyle,
  dropdownViewStyle,
  isDarkMode,
}) => {
  return (
    <View>
      <Text
        style={[
          styles.dropDownTitle,
          titlestyle,
          {
            color: isDarkMode ? Colors.White : Colors.Black_21,
          },
        ]}>
        {title}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.mainView,
          {
            borderWidth: 1,
            borderColor: errormessage ? 'red' : Colors.Whiite_CC,
          },
          dropdownViewStyle,
        ]}>
        <Text style={[styles.valueStyle]}>{value}</Text>
        <AntDesign name="caretdown" size={13} color={Colors.Black_56} />
      </TouchableOpacity>
      {errormessage && (
        <Text style={styles.valueErrorStyle}>{errormessage}</Text>
      )}
    </View>
  );
};

DropDownView.propTypes = {
  onPress: PropTypes.func, // Made optional
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errormessage: PropTypes.string,
  isDarkMode: PropTypes.bool,
};

DropDownView.defaultProps = {
  title: '',
  value: '',
  errormessage: null,
  onPress: () => {}, // Default empty function
};

export default React.memo(DropDownView);

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 58,
    backgroundColor: Colors.White,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropDownTitle: {
    fontSize: Fonts.size.size_15,
    fontFamily: Fonts.type.Medium,
    textTransform: 'capitalize',
  },
  valueStyle: {
    color: Colors.Black_21,
    letterSpacing: 0.2,
    fontSize: Fonts.size.size_14,
  },
  valueErrorStyle: {
    color: 'red',
    marginLeft: 2,
    fontFamily: Fonts.type.Regular,
  },
});
