import * as dotenv from 'dotenv'
dotenv.config()

module.exports = {
  expo: {
    name: 'skeletor',
    slug: 'skeletor',
    version: '0.0.1',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    scheme: 'skeletor',
    extra: {
      apiBaseURL: `${process.env.BACKEND_URL}/api`,
    },
    plugins: [
      "expo-router",
    ],
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
  },
}
