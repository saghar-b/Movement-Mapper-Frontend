
import React, { useState } from 'react';
import NavTabs from './components/NavTabs';
import Home from './components/pages/Home';
import Score from './components/pages/Score';
import Profile from './components/pages/Profile';
import Login from './components/pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from "./components/pages/Signup";
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return(

    <BrowserRouter>
        <NavTabs isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/score" element={<Score />} />
            <Route path="*" component = {() => "404 NOT FOUND"}/>
        </Routes>
    </BrowserRouter>
    )
}

export default App;