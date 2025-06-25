import { StyleSheet, useColorScheme } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../hooks/useUser'; 

const DashboardLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const { user, loading } = useUser(); 

  if (loading) return null; 

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.navBackground,
          padding: 10,
          height: 90,
        },
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? 'home' : 'home-outline'}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? 'clipboard' : 'clipboard-outline'}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'create',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? 'create' : 'create-outline'}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? 'person' : 'person-outline'}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />

      {user?.isAdmin && (
        <Tabs.Screen
          name="admindashboard"
          options={{
            title: 'Admin',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'shield-checkmark' : 'shield-checkmark-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />
      )}
    </Tabs>
  );
};

export default DashboardLayout;

const styles = StyleSheet.create({});
