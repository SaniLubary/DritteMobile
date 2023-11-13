import React from 'react'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { TextCustom} from './text'

export const Button = ({ title, onPress, disabled = false, variant = 'primary', textVariant = 'title' }: { title: string, onPress: () => void, disabled?: boolean, variant?: keyof typeof variantStyles, textVariant?: "title" | "normal" | "normalBold" }) => {
  return (
    <TouchableOpacity style={[styles.button, variantStyles[variant], disabled && { backgroundColor: '#435E4E' }]} onPress={disabled ? () => { } : onPress}>
      <TextCustom variant={textVariant} style={{ color: variant === 'secondary' ? "#D32455" : 'white' }}>{title}</TextCustom>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'pink',
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
  }
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#F5649E'
  },
  secondary: {
    backgroundColor: '#FFF7FA'
  },
  disabled: {
    backgroundColor: '#435E4E'
  },
  circle: {
    backgroundColor: '#3FBF8A',
    borderRadius:100,
    height: 120,
    justifyContent: 'center'
  }
})
