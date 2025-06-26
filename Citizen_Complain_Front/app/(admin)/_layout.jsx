import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const adminDashboard = () => {
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
  return (
    <Tabs 
     screenOptions={{headerShown: false,
         tabBarStyle:{
            backgroundColor: theme.navBackground,
            padding: 10,
            height: 90
         },
         tabBarActiveTintColor: theme.iconColorFocused,
         tabBarInactiveTintColor: theme.iconColor
     }}
   
    >
        <Tabs.Screen 
        name="AdminDashboard" options={{title: "Overview", tabBarIcon: ({focused}) => (
            <Ionicons 
             size={24}
             name={focused ? "home":"home-outline"}            
             color= { focused ? theme.iconColorFocused: theme.iconColor}
             />
        )

        }}/>
       <Tabs.Screen 
        name="AdminReport" options={{title: "Reports", tabBarIcon: ({focused}) => (
            <Ionicons 
             size={24}
             name={focused ? "clipboard":"clipboard-outline"}            
             color= { focused ? theme.iconColorFocused: theme.iconColor}
             />
        )

        }}/>
        <Tabs.Screen 
        name="DepartmentDashboard" options={{title: "Departments", tabBarIcon: ({focused}) => (
            <Ionicons 
             size={24}
             name={focused ? "business":"business-outline"}            
             color= { focused ? theme.iconColorFocused: theme.iconColor}
             />
        )

        }}/>

        <Tabs.Screen
        name="profileAdmin"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? 'person' : 'person-outline'}n
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default adminDashboard

const styles = StyleSheet.create({})