import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
  set: async (key, value) => {
    try {
      const stringValue =
        typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
      console.log(`✅ [Storage] Set: ${key}`);
    } catch (error) {
      console.error(`❌ [Storage] Set Error (${key}):`, error);
    }
  },

  get: async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      try {
        return JSON.parse(value);
      } catch {
        return value; // fallback if not JSON
      }
    } catch (error) {
      console.error(`❌ [Storage] Get Error (${key}):`, error);
      return null;
    }
  },

  remove: async key => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`🗑️ [Storage] Removed: ${key}`);
    } catch (error) {
      console.error(`❌ [Storage] Remove Error (${key}):`, error);
    }
  },

  clearAll: async () => {
    try {
      await AsyncStorage.clear();
      console.log('🧹 [Storage] Cleared all data');
    } catch (error) {
      console.error('❌ [Storage] Clear Error:', error);
    }
  },
  addToArray: async (key, newItem) => {
    try {
      const existing = await AsyncStorage.getItem(key);
      const parsed = existing ? JSON.parse(existing) : [];
      const updated = [...parsed, newItem];
      await AsyncStorage.setItem(key, JSON.stringify(updated));
      console.log(`✅ [Storage] Added item to ${key}`);
    } catch (error) {
      console.error(`❌ [Storage] addToArray Error (${key}):`, error);
    }
  },
  addUniqueToArray: async (key, newItem, uniqueKey = 'email') => {
    try {
      const existing = await AsyncStorage.getItem(key);
      const parsed = existing ? JSON.parse(existing) : [];

      const alreadyExists = parsed.some(
        item => item[uniqueKey] === newItem[uniqueKey],
      );
      if (!alreadyExists) {
        const updated = [...parsed, newItem];
        await AsyncStorage.setItem(key, JSON.stringify(updated));
        console.log(`✅ [Storage] Added unique item to ${key}`);
      } else {
        console.log(`⚠️ [Storage] Item already exists in ${key}`);
      }
    } catch (error) {
      console.error(`❌ [Storage] addUniqueToArray Error (${key}):`, error);
    }
  },
  removeFromArray: async (key, identifier, matchKey = 'email') => {
    try {
      const existing = await AsyncStorage.getItem(key);
      const parsed = existing ? JSON.parse(existing) : [];

      const updated = parsed.filter(item => item[matchKey] !== identifier);

      await AsyncStorage.setItem(key, JSON.stringify(updated));
      console.log(`🗑️ [Storage] Removed user from ${key}`);
    } catch (error) {
      console.error(`❌ [Storage] removeFromArray Error (${key}):`, error);
    }
  },
};
