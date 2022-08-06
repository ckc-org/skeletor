declare module "*.svg" {
  import React from 'react'
  import { SvgProps } from "react-native-svg"
  const content: React.FC<SvgProps>
  export default content
}

declare module "*.png" {
  import { ImageRequireSource } from 'react-native'
  const value: ImageRequireSource
  export default value
}

declare module "*.jpg" {
  import { ImageRequireSource } from 'react-native'
  const value: ImageRequireSource
  export default value
}
