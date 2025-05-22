import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalStorageKey = {
  LOGIN_RES: 'LOGIN_RES',
  USER_PROFILE: 'USER_PROFILE',
  APP_SETTINGS: 'APP_SETTINGS',
};

export const setLocalData = async (keyOrObject, value) => {
  try {
    if (typeof keyOrObject === 'string' && value !== undefined) {
      // Set single key-value pair
      await AsyncStorage.setItem(keyOrObject, JSON.stringify(value));
    } else if (typeof keyOrObject === 'object' && keyOrObject !== null) {
      // Set multiple key-value pairs
      const entries = Object.entries(keyOrObject).map(([key, val]) => [
        key,
        JSON.stringify(val),
      ]);
      await AsyncStorage.multiSet(entries);
    } else {
      throw new Error('Invalid arguments passed to setLocalData');
    }
  } catch (error) {
    console.error('Error setting local data:', error);
  }
};

export const getLocalData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting local data:', error);
  }
};

export const getMultipleLocalData = async (keys) => {
  try {
    const data = await AsyncStorage.multiGet(keys);
    return data.reduce((result, [key, value]) => {
      result[key] = value ? JSON.parse(value) : null;
      return result;
    }, {});
  } catch (error) {
    console.error('Error getting multiple local data:', error);
  }
};

export const removeLocalData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing local data:', error);
  }
};

export const clearAllLocalData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing all local data:', error);
  }
};


//Usage Examples "/\"


// Set Single Key-Value Pair:
// await setLocalData(LocalStorageKey.LOGIN_RES, { token: '12345', userId: '1' });

// Set Multiple Key-Value Pairs:
// await setLocalData({
//     [LocalStorageKey.LOGIN_RES]: { token: '12345', userId: '1' },
//     [LocalStorageKey.USER_PROFILE]: { name: 'John Doe', age: 30 },
// });

// Get Single Value
// const loginRes = await getLocalData(LocalStorageKey.LOGIN_RES);

// Get Multiple Values:
// const keys = [LocalStorageKey.LOGIN_RES, LocalStorageKey.USER_PROFILE];
// const data = await getMultipleLocalData(keys);

// Remove Specific Key:
// await removeLocalData(LocalStorageKey.LOGIN_RES);

// Clear All Data:
// await clearAllLocalData();

