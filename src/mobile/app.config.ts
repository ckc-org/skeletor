import { ExpoConfig, ConfigContext } from "@expo/config"

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: "SKELETOR_NAME_PLACEHOLDER",
  slug: "SKELETOR_NAME_PLACEHOLDER",
  // owner: "SKELETOR_NAME_PLACEHOLDER",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "SKELETOR_NAME_PLACEHOLDER",
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
    bundleIdentifier: "test.SKELETOR_NAME_PLACEHOLDER.app",
    supportsTablet: true,
  },
  android: {
    package: "test.SKELETOR_NAME_PLACEHOLDER.app",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    }
  },
  web: {
    "favicon": "./assets/favicon.png"
  }
})
