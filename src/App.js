
import React, { useState } from 'react';
import NavTabs from './components/NavTabs';
import Home from './components/pages/home/Home';
import Score from './components/pages/score/Score';
import Profile from './components/pages/profile/Profile';
import Challenges from './components/pages/challenges/Challenges';
import Login from './components/pages/login/Login';
import Invite from './components/pages/invite/Invite';
import NewChallenge from './components/pages/newChallenge/NewChallenge';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from "./components/pages/signup/Signup";
const App = () => {
    // window.addEventListener("beforeunload", () => localStorage.removeItem('SavedToken'));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return(

    <BrowserRouter>
        <NavTabs isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/leaderboard" element={<Score />} />
            <Route path='/profile/newchallenge' element={<NewChallenge/>} />
            <Route path='/invite' element={<Invite/>} />
            <Route path="*" component = {() => "404 NOT FOUND"}/>
        </Routes>
    </BrowserRouter>
    )
}

export default App;