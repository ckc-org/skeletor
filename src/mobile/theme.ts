import { StyleSheet } from 'react-native'
import { ThemeManager } from 'react-native-ui-lib'

ThemeManager.setComponentForcedTheme('Button', (props, context) => {
  const { labelStyle, style, ...others } = props
  return {
    labelStyle: [styles.buttonLabelBaseStyle, labelStyle],
    style: [styles.buttonBaseStyle, style],
    borderRadius: 5,
    ...others,
  }
})

ThemeManager.setComponentForcedTheme('TextField', (props, context) => {
  const { fieldStyle, style, ...others } = props
  return {
    fieldStyle: [styles.textFieldBaseFieldStyle, fieldStyle],
    style: [styles.textFieldBaseStyle, style],
    ...others,
  }
})

const styles = StyleSheet.create({
  textFieldBaseFieldStyle: {
    width: '100%',
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
  },
  textFieldBaseStyle: {
    fontSize: 20,
  },

  buttonBaseStyle: {
    height: 50,
  },

  buttonLabelBaseStyle: {
    fontSize: 24,
  },
})
