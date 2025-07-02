import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        username,
        password,
      });

      const userData = {
        id: data._id,
        username: data.username,
        role: data.role,   // <-- role added here
        token: data.token,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      return false;
    }
  };

  const register = async (username, password, role) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        password,
        role
      });

      const userData = {
        id: data._id,
        username: data.username,
        role: data.role,   // <-- role added here
        token: data.token,
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
