import { ExpoConfig, ConfigContext } from "@expo/config"

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: "SKELETOR_NEW_PROJECT",
  slug: "SKELETOR_NEW_PROJECT",
  // owner: "SKELETOR_NEW_PROJECT",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "SKELETOR_NEW_PROJECT",
  splash: {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  updates: {
    "fallbackToCacheTimeout": 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    bundleIdentifier: "test.SKELETOR_NEW_PROJECT.app",
    supportsTablet: true,
  },
  android: {
    package: "test.SKELETOR_NEW_PROJECT.app",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    }
  },
  web: {
    "favicon": "./assets/favicon.png"
  }
})
