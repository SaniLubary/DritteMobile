import { StyleSheet } from 'react-native'
import React from 'react'
import { SvgUri } from 'react-native-svg';

const TabIcons = ({name, size, color}: {name: string, size: number, color: string}) => {
  return <SvgUri
  width="100%"
  height="100%"
  uri="../../assets/icons/Home.svg"
/>
}

export {TabIcons}

const styles = StyleSheet.create({})