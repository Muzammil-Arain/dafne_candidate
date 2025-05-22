module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-paper/babel', // Keep this here if needed
    'react-native-reanimated/plugin', // This MUST be the last plugin
  ],
};
