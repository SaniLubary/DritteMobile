import React, { ReactElement } from 'react'
import { StyleSheet, Text } from 'react-native';

const TextCustom = ({ children, variant = 'normal' }: { children: ReactElement | string, variant: keyof typeof variantStyles }) => {
  return (
    <Text style={[styles.text, variantStyles[variant]]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
  }
})

const variantStyles = StyleSheet.create({
  title: {
    fontSize: 30
  },
  normal: {
    fontSize: 16
  },
  normalBold: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default TextCustom