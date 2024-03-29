module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@app': './',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
