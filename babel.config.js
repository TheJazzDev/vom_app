module.exports = function (api) {
  api.cache(true);

  const plugins = ['react-native-worklets/plugin'];

  // Remove console statements in production for smaller bundle and better performance
  if (process.env.NODE_ENV === 'production') {
    plugins.push('transform-remove-console');
  }

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins,
  };
};
