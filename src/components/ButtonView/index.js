/** @format */

// @flow
import React, {useState, useCallback, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Platform} from 'react-native';

const ButtonView = ({
  style,
  children,
  disableRipple,
  enableClick,
  onPress,
  debounceTime,
  disabled,
  disabledOpacity,
  container,
  ...rest
}) => {
  const [isClickDisabled, setIsClickDisabled] = useState(false);
  const timeoutRef = useRef(null);

  const handlePress = useCallback(() => {
    if (enableClick) {
      onPress?.();
    } else if (!isClickDisabled) {
      setIsClickDisabled(true);
      onPress?.();
      timeoutRef.current = setTimeout(
        () => setIsClickDisabled(false),
        debounceTime,
      );
    }
  }, [enableClick, isClickDisabled, onPress, debounceTime]);

  useEffect(() => {
    // Cleanup function to clear the timeout when the component is unmounted
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const buttonOpacity = disableRipple ? 1 : 0.5;
  const disabledStyle = disabled ? {opacity: disabledOpacity} : {};

  return (
    <TouchableOpacity
      style={[style, disabledStyle, container]}
      onPress={handlePress}
      disabled={disabled || isClickDisabled}
      activeOpacity={buttonOpacity}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};

ButtonView.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  children: PropTypes.node.isRequired,
  disableRipple: PropTypes.bool,
  enableClick: PropTypes.bool,
  onPress: PropTypes.func, // Made optional
  debounceTime: PropTypes.number,
  disabled: PropTypes.bool,
  disabledOpacity: PropTypes.number,
  container: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
};

ButtonView.defaultProps = {
  style: {},
  disableRipple: false,
  enableClick: false,
  debounceTime: Platform.select({android: 700, ios: 200}),
  disabled: false,
  disabledOpacity: 0.5,
  onPress: () => {}, // Default empty function
};

export default React.memo(ButtonView);
