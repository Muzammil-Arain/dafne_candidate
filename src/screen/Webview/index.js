import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import {ms} from 'react-native-size-matters';

import datahandler from '../../helper/datahandler';
import {screenOptions} from '../../naviagtor/config';
import {AppButton, Background, ScaleText} from '../../common';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {ButtonView, MoVideoPlayer} from '../../components';
import HandleImagePicker from '../../components/HandleImagePicker';
import {NavigationService, Util} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {DELETE_PHOTO_VIDEOS_API} from '../../ducks/app';
import FastImageComponent from '../../components/FastImage';

const DummyImage =
  'https://www.inzone.ae/wp-content/uploads/2025/02/dummy-profile-pic.jpg';

const WebViewScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isDarkMode = datahandler.getAppTheme();
  const {url, title = '', type = '', id, key} = route.params || {};
  const [mediaUri, setMediaUri] = useState(url ?? DummyImage);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiloading, setApiLoading] = useState(false);
  const [deleteapiloading, setDeleteApiLoading] = useState(false);
  const [webviewError, setWebviewError] = useState(false);

  const isPhoto = type === 'photo';
  const isVideo = type === 'video';

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {navigation},
        () => navigation.goBack(),
        isDarkMode,
        type === 'cv' ? 'Resume' : 'Profile',
      ),
    );
  }, [navigation, isDarkMode]);

  const onImagePicked = image => {
    if (!image) return;

    setMediaUri(image.uri);
    setShowGalleryModal(false);
    setApiLoading(true);

    const mediaType = isPhoto ? 'image/jpeg' : 'video/mp4';
    const fileName = isPhoto ? 'profile.jpg' : 'candidatevideo.mp4';
    const formData = new FormData();
    formData.append(key, {
      uri: image.uri,
      type: mediaType,
      name: image.fileName || fileName,
    });

    dispatch(
      id.request({
        payloadApi: formData,
        cb: () => {
          setApiLoading(false);
          Util.showMessage('Profile updated successfully!', 'success');
          NavigationService.navigate(StackNav.Profile);
        },
      }),
    );
  };

  const handleDete = () => {
    const mediaType = isPhoto ? 'photo' : 'video';
    const formData = new FormData();
    formData.append('media_type', mediaType);
    formData.append('key', key);
    setDeleteApiLoading(true);
    dispatch(
      DELETE_PHOTO_VIDEOS_API.request({
        payloadApi: formData,
        cb: () => {
          setDeleteApiLoading(false);
          Util.showMessage('Profile updated successfully!', 'success');
          NavigationService.navigate(StackNav.Profile);
        },
      }),
    );
  };

  if (isPhoto || isVideo) {
    return (
      <Background style={styles.container}>
        <View style={styles.mediaContainer}>
          <ScaleText
            fontSize={ms(17)}
            fontFamily={Fonts.type.Roman}
            text={title}
          />

          {isPhoto && (
            <ButtonView onPress={() => setShowImageModal(true)}>
              {/* <Image
                source={{uri: mediaUri}}
                resizeMode="cover"
                style={styles.coverImage}
              /> */}
              <FastImageComponent
                uri={mediaUri ?? ''}
                style={styles.coverImage}
                resizeMode="cover"
                fallbackImage={Images.images.dummyprofile}
              />
            </ButtonView>
          )}

          {isVideo && (
            <MoVideoPlayer
              autoPlay
              source={{uri: mediaUri}}
              style={styles.coverVideo}
            />
          )}

          <View style={styles.buttonContainer}>
            <AppButton
              ShowLinear={false}
              isloading={deleteapiloading}
              title="Delete"
              onPress={() => handleDete()}
            />
            <AppButton
              isloading={apiloading}
              title="Update"
              onPress={() => setShowGalleryModal(true)}
            />
          </View>

          <Modal isVisible={showImageModal} style={styles.modal}>
            <ImageViewer
              imageUrls={[{url: mediaUri}]}
              enableSwipeDown
              onSwipeDown={() => setShowImageModal(false)}
              backgroundColor={isDarkMode ? '#000' : '#fff'}
            />
          </Modal>
        </View>

        <HandleImagePicker
          media={isVideo}
          modalVisible={showGalleryModal}
          onClose={() => setShowGalleryModal(false)}
          onImagePicked={onImagePicked}
        />
      </Background>
    );
  }

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
            source={{uri: url || 'https://www.google.com'}}
            style={styles.webview}
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

export default WebViewScreen;

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
