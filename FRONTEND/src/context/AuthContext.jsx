import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

const EXPIRY_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount and check expiry
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const { userData, timestamp } = parsedData;

      const now = Date.now();
      if (now - timestamp < EXPIRY_DURATION) {
        setUser(userData);
      } else {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username,
          password,
        }
      );

      const userData = {
        id: data._id,
        username: data.username,
        role: data.role,
        token: data.token,
        volunteerRequestPending: data.volunteerRequestPending,
      };

      setUser(userData);
      localStorage.setItem(
        "user",
        JSON.stringify({ userData, timestamp: Date.now() })
      );

      return true;
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      return false;
    }
  };

  const register = async (username, password, role) => {
    try {
      const finalRole = role || "user"; // Default to "user" if role is undefined

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          username,
          password,
          role: finalRole,
        }
      );

      const userData = {
        id: data._id,
        username: data.username,
        role: data.role,
        token: data.token,
        volunteerRequestPending: data.volunteerRequestPending,
      };

      setUser(userData);
      localStorage.setItem(
        "user",
        JSON.stringify({ userData, timestamp: Date.now() })
      );

      return true;
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
