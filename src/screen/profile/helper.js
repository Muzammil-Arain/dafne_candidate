import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {Colors, Fonts} from '../../theme';
import {VectorIcon} from '../../common';

const ExpandableText = ({text, numberOfLines = 2}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(!false);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text
        numberOfLines={isExpanded ? undefined : numberOfLines}
        onTextLayout={e => {
          if (e.nativeEvent.lines.length > numberOfLines) {
            setShowSeeMore(true);
          }
        }}
        style={styles.text}>
        {text}
      </Text>

      {showSeeMore && (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: ms(5),
            alignSelf: 'flex-start',
            backgroundColor: 'black',
            padding: ms(5),
            borderRadius: 5,
            marginRight: ms(10),
          }}
          onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  text: {
    fontSize: '14@ms',
    color: Colors.Black,
    marginRight: '20@ms',
    fontFamily: Fonts.type.Roman,
    lineHeight: 18,
    width: '260@ms',
  },
});

export default ExpandableText;
