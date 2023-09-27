import React from 'react'
import { Platform, StyleSheet, TouchableOpacity } from 'react-native'
import Text from './text'

const Button = ({ title, onPress, disabled = false }: { title: string, onPress: () => void, disabled?: boolean }) => {
  return (
    <TouchableOpacity style={[styles.button, disabled && { backgroundColor: 'grey' }]} onPress={disabled ? () => { } : onPress}>
      <Text variant='normalBold'>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'pink',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    })
  }
});


export default Button