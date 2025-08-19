const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

config.resolver.extraNodeModules = {
    'react-native-css-interop/jsx-runtime': require.resolve('react-native-css-interop/jsx-runtime')
  };

module.exports = withNativeWind(config, { input: './src/app/global.css' })