import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: "meanttobe",
    slug: "meanttobe",
    scheme: "meanttobe",
    version: "2.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      requireFullScreen: true,
      supportsTablet: false,
      bundleIdentifier: "com.meanttobe",
      googleServicesFile: "./config/prod/GoogleService-Info.plist",
      infoPlist: {
        UIBackgroundModes: ["remote-notification"],
        ITSAppUsesNonExemptEncryption: false,
        LSApplicationQueriesSchemes: [
          "whatsapp",
          "instagram",
          "facebook",
          "twitter",
          "linkedin",
          "google",
        ],
        NSLocationAlwaysAndWhenInUseUsageDescription:
          "Meanttobe uses your device's location to help you find cashback offers near you.",
        NSLocationUsageDescription:
          "Meanttobe uses your device's location to help you find cashback offers near you.",
        NSLocationAlwaysUsageDescription:
          "Meanttobe uses your device's location to help you find cashback offers near you.",
        NSLocationWhenInUseUsageDescription:
          "Meanttobe uses your device's location to help you find cashback offers near you.",
      },
      entitlements: {
        "aps-environment": "production",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      versionCode: 70,
      package: "com.meanttobe",
      googleServicesFile: "./config/prod/google-services.json",
      permissions: [
        "android.permission.INTERNET",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.ACCESS_MEDIA_LOCATION",
        "android.permission.CAMERA",
        "android.permission.BILLING",
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "@react-native-firebase/app",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
  };
};
