/** @format */

import PropTypes from 'prop-types';
import React from 'react';

import { Text } from 'react-native';
import styles from './styles';

const InputError = ({ error, styleErr }) => {
  if (error) {
    return <Text style={[styles.errorText, styleErr]}>{error}</Text>;
  }
  return null;
};

InputError.propTypes = {
  error: PropTypes.object,
};
InputError.defaultProps = { error: undefined };
export default InputError;
