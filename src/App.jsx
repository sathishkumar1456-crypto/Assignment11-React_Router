import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GymLandingPage from './components/GymLandingPage';
import Admin from './components/Admin';
import Users from './components/Users';
import NewUser from './pages/Newuser';
import Userdashboard from './pages/Userdashboard';

function App() {
  return (
   <>
   
      <Routes>
        <Route path="/" element={<GymLandingPage/>} />
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/newuser" element={<NewUser/>}/>
        <Route path ="/userdash" element={<Userdashboard/>}/>
               
      </Routes>
    </>
    
  )
}

export default App