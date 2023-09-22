module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: '@react-native',
  plugins: ['module-resolver', '@typescript-eslint'],
  rules: {
    'module-resolver/use-alias': 2,
  },
};
