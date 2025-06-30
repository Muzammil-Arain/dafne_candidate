import {
  SafeAreaView,
  StatusBar,
  Animated,
  ImageBackground,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Colors, Images} from '../../theme';
import React, {useEffect, useRef, useMemo} from 'react';
// import {NavigationService} from '../../utils';
import {ButtonView} from '../../components';
import VectorIcon from '../VectorIcon';
import { ms, ScaledSheet } from 'react-native-size-matters';

const Background = ({
  isDarkMode,
  showHeader,
  scrollDisable,
  showProfile,
  children,
}) => {
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: isDarkMode ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isDarkMode]);

  const interpolatedBackgroundColor = useMemo(
    () =>
      backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.White, Colors.Black_21],
      }),
    [backgroundColor],
  );

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
    StatusBar.setBackgroundColor(
      interpolatedBackgroundColor,
      true,
    );
  }, [isDarkMode]);

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: interpolatedBackgroundColor},
      ]}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {showHeader && (
          <View style={styles.header}>
            <ButtonView
              // onPress={() => NavigationService.goBack()}
              style={[
                styles.iconButton,
                {
                  backgroundColor: isDarkMode ? Colors.Black_42 : Colors.White,
                  shadowColor: isDarkMode ? Colors.White : Colors.Black,
                },
              ]}>
              <VectorIcon
                type={'Entypo'}
                color={!isDarkMode ? Colors.Black_42 : Colors.White}
                name="chevron-left"
                size={ms(25)}
              />
            </ButtonView>
            {showProfile && (
              <ButtonView>
                <Image
                  resizeMode="contain"
                  style={styles.profileImage}
                  source={{
                    uri: Images.iconsource.dummyuserimage,
                  }}
                />
              </ButtonView>
            )}
          </View>
        )}
        <ImageBackground
          tintColor={isDarkMode ? Colors.Black_57 : null}
          style={styles.imageBackground}
          resizeMode="cover"
          // source={require('../../assets/images/background.png')}
        >
          <SafeAreaView style={styles.safeArea}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentInsetAdjustmentBehavior="automatic"
              scrollEnabled={scrollDisable}
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <View style={styles.contentContainer}>{children}</View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default Background;


const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  avoidingView: {
    flex: 1,
  },
  header: {
    height: '70@ms',  // Scaled height
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '20@ms',  // Scaled padding
    paddingTop: '10@ms',  // Scaled padding
  },
  iconButton: {
    width: '35@ms',  // Scaled width
    height: '35@ms',  // Scaled height
    borderRadius: '100@ms',  // Scaled border radius
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  profileImage: {
    width: '45@ms',  // Scaled width
    height: '45@ms',  // Scaled height
    borderRadius: '100@ms',  // Scaled border radius
  },
  imageBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: '20@ms',  // Scaled padding
  },
});
