import React, { useEffect, useState, useCallback, useContext } from "react";
import Header from './components/header/Header.jsx';
import TodoListApp from "./pages/TodoList/TodoListApp.jsx";
import About from "./pages/About/about.jsx";
import Page404 from "./pages/Page404/page404.jsx";
import { Routes, Route } from "react-router-dom";
import './app.style.css';

export default function App() {
   
    // ---------------------------------------------------------------------------------
    return <div>
        <Header />
        <Routes>
            <Route path='/' element={ <TodoListApp /> } />

            <Route path='/about' element={ <About /> } />

            <Route path="*" element={ <Page404 /> } />
        </Routes>
    </div>

}
