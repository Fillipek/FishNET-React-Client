import { LoginCredentials, RegisterCredentials, User } from 'providers/AuthProvider/types';
import axios from './axiosInstance';

import { ArticleTitle, Article, ArticleHistory, Tokens, UsernameAndEmail, ArticleUpdateForm } from "./types";

export async function fatchArticleTitles(): Promise<ArticleTitle[]> {
    try {
        const response = await axios.get<ArticleTitle[]>('/api/article');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch articles');
    }
}

export async function fetchArticle(id:number): Promise<Article> {
    try {
        const response = await axios.get<Article>('/api/article/'+id);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch article: ' + id);
    }
}

export async function getArticleHistory(articleId:number): Promise<ArticleHistory[]> {
    try {
        const response = await axios.get<ArticleHistory[]>("/api/article/"+articleId+"/history");
        return response.data;
    } catch (error) {
        throw new Error('Failed to get article history: ' + articleId);
    }
}

export async function apiLogin(credentials: LoginCredentials): Promise<Tokens> {
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);
    try {
        const response = await axios.post<Tokens>('/login', params);
        return response.data;
    } catch (error) {
        throw new Error("Failed to login");
    }
}

export async function getUserByUsername(username:string): Promise<User> {
    // const token = localStorage.getItem('accessToken');
    // if (token != null) {
    //     params.append('Authorization', token);
    // }
    
    // try {
    //     const response = await axios.get<User>('/api/user/',  { params: params });
    //     return response.data;
    // } catch (error) {
    //     console.error(error);
    //     throw new Error("Failed to get user");
    // }
    const params = new URLSearchParams();
    params.append('username', username);
    try {
        const ret = await axios.get<User>('/api/user/', {params:params});
        return ret.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get user");
    }
}

export async function updateUserData(values:UsernameAndEmail): Promise<void> {
    const token = localStorage.getItem('accessToken');
    if (token != null) {
        const headers = {
            Authorization: token
        }
        try {
            await axios.put<void>('/api/user/update', values, {headers:headers});
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update user");
        }
    } else {
        throw new Error("Token empty");
    }
}

export async function apiRegister(credentials: RegisterCredentials): Promise<User> {
    try {
        const res =  await axios.post<User>('/api/user/register', credentials)
        return res.data      
    } catch (error) {
        throw new Error("Failed to register");
    }
}

export async function apiPostArticle(title:string, content:string): Promise<Article>  {
    const token = localStorage.getItem('accessToken');
    if (token != null) {
        const headers = {
            Authorization: token
        }
        try {
            const res = await axios.post<Article>('/api/article/create', {title:title, content:content}, {headers:headers});
            return res.data;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update user");
        }
    } else {
        throw new Error("Token empty");
    }
}

export async function apiUpdateArticle(id:number, values:ArticleUpdateForm): Promise<Article>  {
    const token = localStorage.getItem('accessToken');
    if (token != null) {
        const headers = {
            Authorization: token
        }
        try {
            const res = await axios.put<Article>('/api/article/'+id+'/update', values, {headers:headers});
            return res.data;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update article");
        }
    } else {
        throw new Error("Token empty");
    }
}


export async function fetchAllUsers(): Promise<User[]> {
    const token = localStorage.getItem('accessToken');
    if (token != null) {
        const headers = {
            Authorization: token
        }
        try {
            const res = await axios.get<User[]>('/api/user/admin/get', {headers:headers});
            return res.data;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to get users");
        }
    } else {
        throw new Error("Token empty");
    }
}

export async function adminUpdateUser(user:User): Promise<void> {
    const token = localStorage.getItem('accessToken');
    if (token != null) {
        const headers = {
            Authorization: token
        }
        try {
            await axios.put<void[]>('/api/user/admin/update', user, {headers:headers});
        } catch (error) {
            console.error(error);
            throw new Error("Failed to update user");
        }
    } else {
        throw new Error("Token empty");
    }
}

export async function adminDeleteUser(id:number): Promise<void> {
    const token = localStorage.getItem('accessToken');
    if (token != null) {
        const headers = {
            Authorization: token
        }
        try {
            await axios.delete<void[]>('/api/user/admin/delete/' + id, {headers:headers});
        } catch (error) {
            console.error(error);
            throw new Error("Failed to delete user");
        }
    } else {
        throw new Error("Token empty");
    }
}