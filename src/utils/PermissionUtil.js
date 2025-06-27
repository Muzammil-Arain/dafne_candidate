/** @format */

import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Platform, Alert, Linking, PermissionsAndroid} from 'react-native';

import {Util} from './index';
const androidVersion = parseInt(Platform.Version, 10);
class PermissionUtil {
  // types define

  types = {GALLERY: 'gallery', CAMERA: 'camera'};

  // gallery permissions
  cameraPermission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA;

  // gallery permissions
  galleryPermission =
    Platform.OS === 'android' && androidVersion >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
      : PERMISSIONS.IOS.PHOTO_LIBRARY;

  // check permissions gallery and camera
  checkPermission = (type, callback) => {
    console.log('🚀 ~ getPermissionTitleAndDescription ~ type:', type);
    const permission = this.getPermissionFromType(type);

    check(permission)
      .then(result => {
        console.log('result permission', result);
        switch (result) {
          case RESULTS.UNAVAILABLE:
            this.showAlert(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.GRANTED:
            callback();
            break;
          case RESULTS.DENIED:
            request(permission).then(resultPermissions => {
              if (resultPermissions === RESULTS.GRANTED) {
                callback();
              }
            });
            break;
          case RESULTS.LIMITED:
            callback();
            // this.openSettingModal(type);
            break;
          case RESULTS.BLOCKED:
            this.openSettingModal(type);
            break;
        }
      })
      .catch(error => {
        console.log('errpr', error);
        this.showAlert(
          'This feature is not available (on this device / in this context)',
        );
      });
  };

  // show alert message
  showAlert(message) {
    Util.showMessage(message, 'danger', 5000);
  }

  // ger permission from type
  getPermissionFromType = type => {
    if (type === this.types.GALLERY) {
      return this.galleryPermission;
    }
    if (type === this.types.CAMERA) {
      return this.cameraPermission;
    }
    return this.galleryPermission;
  };

  // ger permission title and description from type
  getPermissionTitleAndDescription = type => {
    // get os
    const os = Platform.OS;
    // if type is gallery
    if (type === this.types.GALLERY) {
      return {
        title: Util.isPlatformIOS()
          ? 'Photos Permission Required'
          : 'Files And Media Permission Required',
        description: Util.isPlatformIOS()
          ? 'Open Settings => Select Photos => Enable All Photos'
          : 'Open Settings => Select Permissions => Select Files and media => Enable Allow access to media',
      };
    }
    // if type is camera
    if (type === this.types.CAMERA) {
      return {
        title: 'Camera Permission Required',
        description: Util.isPlatformIOS()
          ? 'Open Settings => Enable Camera'
          : 'Open Settings => Select Permissions => Select Camera => Allow only while using app',
      };
    }
    return {title: '', description: ''};
  };

  // open settings modal
  openSettingModal = type => {
    console.log('🚀 ~ getPermissionTitleAndDescription ~ type:', type);

    // get title and desription from type
    const {title, description} = this.getPermissionTitleAndDescription(type);

    // show alert
    Alert.alert(
      title,
      description,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Open Settings',
          onPress: () => Linking.openSettings(),
        },
      ],
      {cancelable: false},
    );
  };
}

export default new PermissionUtil();
