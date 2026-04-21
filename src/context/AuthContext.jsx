import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAPI } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('foodkart_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signup = async (userData) => {
    const data = await fetchAPI('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    // After signup, automatically login
    return login({ email: userData.email, password: userData.password });
  };

  const login = async (credentials) => {
    const data = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    setUser(data.user);
    localStorage.setItem('foodkart_user', JSON.stringify(data.user));
    localStorage.setItem('foodkart_token', data.access_token);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodkart_user');
    localStorage.removeItem('foodkart_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
