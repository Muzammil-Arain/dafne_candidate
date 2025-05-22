import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {Colors} from '../../theme';

const CustomToggleSwitch = ({isOn, onToggle}) => {
  const [translateX] = useState(new Animated.Value(isOn ? 1 : 0));

  const toggleSwitch = () => {
    Animated.timing(translateX, {
      toValue: isOn ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    onToggle(!isOn);
  };

  const switchColor = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: ['#d3d3d3', Colors.DarkYellow],
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
      <Animated.View style={[styles.switchContainer]}>
        <Animated.View
          style={[
            styles.switchKnob,
            {
              transform: [
                {
                  translateX: translateX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 25], // Adjust this for knob movement
                  }),
                },
              ],
            },
          ]}
        />
        {/* Eye Icon */}
        <View
          style={{
            position: 'absolute',
            left: !isOn ? 5 : 32,
          }}>
          <Icon
            name={isOn ? 'eye' : 'eye-with-line'}
            size={14}
            color={Colors.Black_21}
            style={styles.icon}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 50,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    padding: 3,
    position: 'relative',
    backgroundColor: Colors.Whiite_DC,
  },
  switchKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.DarkYellow,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default CustomToggleSwitch;
