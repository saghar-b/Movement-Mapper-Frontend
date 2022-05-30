import React from "react";
import NavTabs from './components/NavTabs';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Login from './components/pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from "./components/pages/Signup";
const App = () => {
    return(

    <BrowserRouter>
        <NavTabs />
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

        </Routes>
    </BrowserRouter>
    )
}

export default App;
