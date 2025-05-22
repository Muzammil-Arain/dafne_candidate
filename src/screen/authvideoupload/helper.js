import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {ms} from 'react-native-size-matters';
import {VectorIcon} from '../../common';
import {Colors} from '../../theme';

const ExpandableText = ({
  text,
  fontSize,
  fontFamily,
  TextStyle,
  isDarkMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [measured, setMeasured] = useState(false); // Track if measurement is done

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text
        numberOfLines={!measured || isExpanded ? undefined : 1}
        onTextLayout={e => {
          if (!measured) {
            const {lines} = e.nativeEvent;
            if (lines.length > 1) {
              setShowSeeMore(true);
            }
            setMeasured(true);
          }
        }}
        style={[
          {
            fontSize: fontSize || ms(16),
            fontFamily: fontFamily,
            color: isDarkMode ? '#fff' : '#000',
          },
          TextStyle,
        ]}>
        {text}
      </Text>

      {showSeeMore && (
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            width: ms(25),
            height: ms(25),
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={toggleExpanded}>
          <VectorIcon
            name={!isExpanded ? 'plus' : 'minus'}
            type={'Entypo'}
            color={Colors.White}
            size={ms(17)}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExpandableText;
