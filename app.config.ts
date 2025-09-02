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
        NSMicrophoneUsageDescription:
          "$(PRODUCT_NAME) would like to use your microphone for voice recording.",
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
        "android.permission.RECORD_AUDIO",
        "android.permission.MODIFY_AUDIO_SETTINGS",
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      // Variables de entorno que estarán disponibles en expo-constants
      apiBase: process.env.EXPO_PUBLIC_API_BASE,
      apiBibleBase: process.env.EXPO_PUBLIC_API_BIBLE_BASE,
      apiKeyBible: process.env.EXPO_PUBLIC_API_KEY_BIBLE,
      getStreamApiKey: process.env.EXPO_PUBLIC_GET_STREAM_API_KEY,
      qonversionApiKey: process.env.EXPO_PUBLIC_QONVERSION_API_KEY,
      apiKeyGeocoderMap: process.env.EXPO_PUBLIC_API_KEY_GEOCODER_MAP,
      apiBaseUser: process.env.EXPO_PUBLIC_API_USER_BASE_URL,
      apiBaseMedia: process.env.EXPO_PUBLIC_API_MEDIA_BASE_URL,
      apiBaseSong: process.env.EXPO_PUBLIC_API_SONG_BASE_URL,
      apiBaseNews: process.env.EXPO_PUBLIC_API_NEWS_BASE_URL,
      apiBaseQuiz: process.env.EXPO_PUBLIC_API_QUIZ_BASE_URL,
      apiBaseVerse: process.env.EXPO_PUBLIC_API_VERSE_BASE_URL,
      apiBaseSermon: process.env.EXPO_PUBLIC_API_SERMON_BASE_URL,
      awsCognitoIdentityPoolId:
        process.env.EXPO_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
      awsUserPoolsId: process.env.EXPO_PUBLIC_AWS_USER_POOLS_ID,
      awsUserPoolsWebClientId:
        process.env.EXPO_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
      domain: process.env.EXPO_PUBLIC_DOMAIN,
      awsUserFilesS3Bucket: process.env.EXPO_PUBLIC_AWS_USER_FILES_S3_BUCKET,
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
