import React from "react";
import { UserRole } from "./constants";

export type User = {
  id: number,
  username: string,
  email: string,
  role: UserRole
}

export type LoginCredentials = {
  username: string;
  password: string;
}

export type AuthProviderProps = {
  children?: React.ReactNode;
}
``
export type AuthContextValues = {
  user?: User;
  login(credentials: LoginCredentials): Promise<void>;
  logout(): void;
}

export type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
}
