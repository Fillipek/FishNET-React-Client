import React, { useState } from 'react';
import { UserRole } from './constants';
import { apiLogin, getUserByUsername } from 'api';

import type {AuthContextValues, AuthProviderProps, LoginCredentials} from './types'
import { User } from 'providers/AuthProvider/types';
import jwt_decode from "jwt-decode";

export const AuthContext = React.createContext<AuthContextValues | undefined>(undefined);

const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<User>();

  const login = async (credentials: LoginCredentials) => {
    const response = await apiLogin(credentials)
    const user = await getUserByUsername(credentials.username)
    setUser(user)
    localStorage.setItem('accessToken', "Bearer " + response.access_token)
  };

  const logout = () => {
    setUser(undefined)
    localStorage.removeItem('accessToken')
  }

  const values = {
    user,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
