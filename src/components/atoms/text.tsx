import React, { ReactElement } from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native';

export const TextCustom = ({ children, variant = 'normal', style }: { style?: TextStyle, children: ReactElement | string, variant: keyof typeof variantStyles }) => {
  return (
    <Text style={[styles.text, variantStyles[variant], style]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#3A5545',
    fontFamily: 'Shanti-Regular',
  }
})

const variantStyles = StyleSheet.create({
  title: {
    fontSize: 32
  },
  medium: {
    fontSize: 24
  },
  normal: {
    fontSize: 16
  },
  normalBold: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})