import { StyleSheet, Text, useColorScheme} from 'react-native'
import React from 'react'
import {Colors} from "../constants/Colors"

const ThemedText = ({style, title= false,... props }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const textcolor = title ? theme.title : theme.text
  return (
    
      <Text style= {[{color: textcolor}, style]}{...props}/>
   
  )
}

export default ThemedText

const styles = StyleSheet.create({})