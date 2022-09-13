import React from 'react';
import { Routes, Route, useParams } from "react-router-dom";

import Home from './pages/Home'
import Encyclopedia from './pages/Encyclopedia';
import ArticlePage from 'pages/ArticlePage';

import Navbar from './components/Navbar';
import Login from 'pages/Login';
import Logout from 'pages/Logout';
import Account from 'pages/Account';
import Register from 'pages/Register';
import NewArticle from 'pages/NewArticle';
import AdminView from 'pages/AdminView';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/encyclopedia" element={<Encyclopedia />} />
        <Route path="/encyclopedia/create" element={<NewArticle />} />
        <Route path="/encyclopedia/:id" element={<ArticlePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </>
  );
}

export default App;
