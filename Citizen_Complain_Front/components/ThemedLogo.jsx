import { StyleSheet, useColorScheme, Image } from 'react-native'
import React from 'react'
import DarkLogo from "../assets/img/darklogo.jpg"
import LightLogo from "../assets/img/whitelogo.jpg"

const ThemedLogo = ({...props}) => {
    const colorScheme = useColorScheme()
    
    const logo = colorScheme === 'dark'? DarkLogo : LightLogo

    return (
    <Image source= {logo} style={styles.container}/>
  )
}

export default ThemedLogo

const styles = StyleSheet.create({
  container:{
    width: 400,
    height: 400,
    
  }
})