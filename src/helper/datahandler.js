let store = null;
let isInternetConnected = false;
let topLoaderRef = null;
let appTheme = null;

let galleryModalRef = false;

const setAppTheme =(value) =>{
  appTheme = value
}

function getAppTheme() {
  return appTheme;
}

function setStore(value) {
  store = value;
}

function getStore() {
  return store;
}

function getStoreState() {
  return store?.getState() ?? {};
}

function dispatchAction(action) {
  const {dispatch} = store;
  dispatch(action);
}

function setGalleryModalRef(ref) {
  galleryModalRef = ref;
}

function setInternetConnected(connected) {
  isInternetConnected = connected;
}

function getIsInternetConnected() {
  return isInternetConnected;
}

function setTopLoaderRef(value) {
  topLoaderRef = value;
}

function getTopLoaderRef() {
  return topLoaderRef;
}
function setUserRoleStatus(val) {
  userRole = val;
}

function getUserRoleStatus() {
  return userRole;
}

function getGalleryModalRef() {
  return galleryModalRef;
}



export default {
  setStore,
  setGalleryModalRef,
  getStore,
  setInternetConnected,
  getIsInternetConnected,
  getStoreState,
  dispatchAction,
  setTopLoaderRef,
  setUserRoleStatus,
  getUserRoleStatus,
  getTopLoaderRef,
  getGalleryModalRef,

  //currently used
  setAppTheme,
  getAppTheme,
};
