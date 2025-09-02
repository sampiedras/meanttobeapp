const { getDefaultConfig } = require("expo/metro-config");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

// This replaces `const config = getDefaultConfig(__dirname);`
const config = getDefaultConfig(__dirname);

module.exports = wrapWithReanimatedMetroConfig(config);
