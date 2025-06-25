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
        name="Adminblog" options={{title: "profile", tabBarIcon: ({focused}) => (
            <Ionicons 
             size={24}
             name={focused ? "person":"person-outline"}            
             color= { focused ? theme.iconColorFocused: theme.iconColor}
             />
        )

        }}/>
       <Tabs.Screen 
        name="profileAdmin" options={{title: "overview", tabBarIcon: ({focused}) => (
            <Ionicons 
             size={24}
             name={focused ? "home":"home-outline"}            
             color= { focused ? theme.iconColorFocused: theme.iconColor}
             />
        )

        }}/>
        <Tabs.Screen 
        name="table_users" options={{title: "table_users", tabBarIcon: ({focused}) => (
            <Ionicons 
             size={24}
             name={focused ? "create":"create-outline"}            
             color= { focused ? theme.iconColorFocused: theme.iconColor}
             />
        )

        }}/>

        <Tabs.Screen
        name="blog"
        options={{
          title: 'Blog',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? 'document-text' : 'document-text-outline'}n
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