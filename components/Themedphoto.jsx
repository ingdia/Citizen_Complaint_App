import { StyleSheet, useColorScheme, Image } from 'react-native'
import React from 'react'
import DarkLogo from "../assets/img/darkphoto.jpg"
import LightLogo from "../assets/img/whitephoto.jpg"

const Themedphoto = ({...props}) => {
    const colorScheme = useColorScheme()
    
    const photo = colorScheme === 'dark'? DarkLogo : LightLogo

    return (
    <Image source= {photo} style={[styles.container,styles.myphoto]}/>
  )
}

export default Themedphoto 

const styles = StyleSheet.create({
  container:{
    width: 400,
    height: 400,
    
  },
   myphoto: {
    width: "100%",
    height: "40%",
    borderRadius: 40,
  }
})