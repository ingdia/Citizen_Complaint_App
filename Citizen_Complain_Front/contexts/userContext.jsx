import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const normalizeEmail = (email) => email.trim().toLowerCase();

  const register = async (email, password, name) => {
    try {
      const normalizedEmail = normalizeEmail(email);
      const usersJSON = await AsyncStorage.getItem('users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      const userExists = users.some(
        (u) => normalizeEmail(u.email) === normalizedEmail
      );

      if (userExists) {
        throw new Error('This email is already registered.');
      }

    
      const isAdmin = normalizedEmail === 'admin@example.com';

      const newUser = {
        email: normalizedEmail,
        password,
        name,
        createdAt: new Date().toISOString(),
        isAdmin,
      };

      const updatedUsers = [...users, newUser];
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));

      setUser(newUser);
      console.log('User registered:', newUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const normalizedEmail = normalizeEmail(email);
      const usersJSON = await AsyncStorage.getItem('users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];

      const existingUser = users.find(
        (u) => normalizeEmail(u.email) === normalizedEmail && u.password === password
      );

      if (!existingUser) {
        throw new Error('Invalid email or password');
      }

      await AsyncStorage.setItem('currentUser', JSON.stringify(existingUser));
      setUser(existingUser);
      console.log('Login successful:', existingUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setUser(null);
      console.log('User logged out.');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

 
  const debugUsers = async () => {
    try {
      const usersJSON = await AsyncStorage.getItem('users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];
      console.log('All stored users:', users);
      return users;
    } catch (error) {
      console.error('Debug users error:', error);
      return [];
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        debugUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
