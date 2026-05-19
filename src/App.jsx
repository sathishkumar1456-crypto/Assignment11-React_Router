import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import GymLandingPage from './components/GymLandingPage';
import Admin from './components/Admin';
import Users from './components/Users';
import NewUser from './pages/Newuser';
import Userdashboard from './pages/Userdashboard';
import AdminHome from './pages/AdminHome';

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
        <Route path="/admin-dashboard" element={<AdminHome />} />
               
      </Routes>
    </>
    
  )
}

export default App