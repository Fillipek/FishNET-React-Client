import { UserRole } from "providers/AuthProvider/constants";

export type ArticleTitle = {
  id: number;
  title: string;
}

export type User = {
  id: number,
  username: string
}

export type Article = {
  id: number;
  title: string;
  content: string;
  cteationDate: Date;
}

export type Tokens = {
  access_token:string,
  refresh_token:string
}

export type ArticleHistory = {
  id: number;
  user_id: number;
  username: string;
  commitDate: Date;
  commitMessage: string;
}

export type UsernameAndEmail = {
  username: string,
  email: string
}

export type ArticleUpdateForm = {
  title: string,
  content: string,
  commit: string
}