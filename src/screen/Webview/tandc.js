import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {ms} from 'react-native-size-matters';

import datahandler from '../../helper/datahandler';
import {screenOptions} from '../../naviagtor/config';
import {Background, ScaleText} from '../../common';
import {Colors, Fonts, Metrics} from '../../theme';
import {TERMS_AND_CONDITIONS_API} from '../../ducks/app';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const TermsandConditionScreen = ({navigation, route}) => {
  const isDarkMode = datahandler.getAppTheme();
  const [loading, setLoading] = useState(true);
  const [webviewError, setWebviewError] = useState(false);
  const [html, setHtml] = useState(null);
  const focus = useIsFocused();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {navigation},
        () => navigation.goBack(),
        isDarkMode,
        'Terms and conditions',
      ),
    );
  }, [navigation, isDarkMode]);

  const getTermsandconditions = useCallback(async () => {
    try {
      dispatch(
        TERMS_AND_CONDITIONS_API.request({
          payloadApi: {},
          cb: async res => {
            console.log('🚀 ~ getTermsandconditions ~ res:', res);
            setHtml(res?.data);
          },
        }),
      );
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    getTermsandconditions();
  }, [focus]);

  return (
    <Background style={styles.container}>
      <View style={styles.webviewContainer}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}

        {webviewError ? (
          <View style={styles.errorContainer}>
            <ScaleText
              fontSize={ms(16)}
              fontFamily={Fonts.type.Roman}
              text="Failed to load page."
              style={{color: Colors.red}}
            />
          </View>
        ) : (
          <WebView
            originWhitelist={['*']}
            source={{html: html?.toString() || ''}}
            style={styles.webview}
            scalesPageToFit={true}
            allowsZooming={true}
            useWebKit={true}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setWebviewError(true);
            }}
          />
        )}
      </View>
    </Background>
  );
};

export default TermsandConditionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  coverImage: {
    width: '95%',
    height: ms(200),
    borderRadius: 5,
    margin: ms(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  coverVideo: {
    width: '95%',
    height: ms(200),
    borderRadius: 5,
    margin: ms(10),
  },
  buttonContainer: {
    marginTop: ms(10),
  },
  modal: {
    margin: 0,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: Colors.White,
    height: Metrics.screenHeight,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
