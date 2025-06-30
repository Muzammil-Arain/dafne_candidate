import _ from 'lodash';
import moment from 'moment';
// import storage from '@react-native-firebase/storage';
import {Platform, StatusBar, Alert} from 'react-native';
import {showMessage as flashMessageShow} from 'react-native-flash-message';

function isPlatformAndroid() {
  return Platform.OS === 'android';
}

function isPlatformIOS() {
  return Platform.OS === 'ios';
}

function getPlatform() {
  return Platform.OS;
}

export const firebaseformatDate = dateString => {
  const milliseconds =
    dateString._seconds * 1000 + dateString._nanoseconds / 1000000;
  const updateDate = new Date(milliseconds);
  const date = moment(updateDate);
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'days').startOf('day');

  if (date.isSame(today, 'd')) {
    return 'Today';
  } else if (date.isSame(yesterday, 'd')) {
    return 'Yesterday';
  } else {
    return date.format('MMMM DD, YYYY');
  }
};

// export const UploadImageOnFirebase = async photo => {
//   const folderPath = 'CHAT_IMAGES/';
//   const filename = `${photo.name}_${new Date().toISOString()}.jpg`;
//   const uploadUri =
//     Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri;
//   try {
//     const task = storage()
//       .ref(folderPath + filename)
//       .putFile(uploadUri);
//     await task;
//     const url = await storage()
//       .ref(folderPath + filename)
//       .getDownloadURL();
//     return url;
//   } catch (e) {
//     console.log('🚀 ~ UploadImageOnFirebase ~ e:', e);
//     return null;
//   }
// };

function convert24HrTo12(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? '0' + h : h; // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? ' AM' : ' PM';
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}

function getFormattedTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  return `${minutes > 9 ? minutes : `0${minutes}`}:${
    seconds > 9 ? seconds : `0${seconds}`
  }`;
}

function translucentApp() {
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('light-content');
}

function setStatusBarLight() {
  StatusBar.setBarStyle('light-content', true);
}

function setStatusBarDark() {
  StatusBar.setBarStyle('dark-content', true);
}

function isNotEmpty(data) {
  return !_.isEmpty(data, true);
}

function isEmpty(data) {
  return _.isEmpty(data, true);
}

function clone(data) {
  return _.clone(data);
}

function cloneDeep(data) {
  return _.cloneDeep(data);
}

function getTimeDiffInMinutes(timeStamp) {
  return (Number(new Date()) - Number(new Date(timeStamp))) / (1000 * 60);
}

function compareDeep(previous, next) {
  return !_.isEqual(previous, next);
}

function getDateFromNow(date) {
  return date ? moment(date).fromNow() : '';
}

function formatDate(dateString, formattedDateFormat) {
  return dateString ? moment(dateString).format(formattedDateFormat) : '';
}

function formatDate2(dateString, currentDateFormat, formattedDateFormat) {
  return dateString
    ? moment(dateString, currentDateFormat).format(formattedDateFormat)
    : '';
}

function compareDates(date1, date2) {
  if (date1 && date2) {
    return moment(date1).isSame(date2, 'day');
  }
  return false;
}

function setStatusBarStyle(barStyle) {
  StatusBar.setBarStyle(barStyle, true);
}

function showAlertConfirm(
  title,
  message,
  doneText,
  onDonePress,
  cancelText = 'cancel',
) {
  Alert.alert(
    title,
    message,
    [
      {
        text: cancelText,
        onPress: () => {},
        style: 'cancel',
      },
      {text: doneText, onPress: () => onDonePress()},
    ],
    {cancelable: true},
  );
}

function removeFormatLocalNumber(x) {
  return x.toString().replace(/[^\d.-]/g, '');
}

function toFixedIfNecessary(value, dp = 1) {
  return +parseFloat(value).toFixed(dp);
}

/*
type : 'danger' , 'success' , 'info'
*/
function showMessage(message, type = 'danger', duration = 2000) {
  flashMessageShow({
    message,
    type,
    duration,
  });
}

function concatDataArray(state, action, dataKey = 'data') {
  const {data, reset} = action.payload;
  const newData = reset ? data : _.concat(state?.[dataKey] ?? [], data);

  state[dataKey] = newData;
}

function stringToDateObject(date, format) {
  if (date) {
    return moment(date, format).toDate();
  }
  return moment().toDate();
}

function makeRandomString(length = 20) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function formatPickerValues(data, labelKey, valueKey) {
  if (!data) return;
  return data.map(item => {
    return {...item, label: item[labelKey], value: item[valueKey]};
  });
}

export default {
  isPlatformAndroid,
  isPlatformIOS,
  getPlatform,
  convert24HrTo12,
  translucentApp,
  setStatusBarLight,
  setStatusBarDark,
  isNotEmpty,
  isEmpty,
  clone,
  cloneDeep,
  getTimeDiffInMinutes,
  compareDeep,
  getDateFromNow,
  formatDate,
  makeRandomString,
  formatDate2,
  stringToDateObject,
  compareDates,
  setStatusBarStyle,
  showAlertConfirm,
  removeFormatLocalNumber,
  toFixedIfNecessary,
  showMessage,
  concatDataArray,
  getFormattedTime,
  formatPickerValues,
};
