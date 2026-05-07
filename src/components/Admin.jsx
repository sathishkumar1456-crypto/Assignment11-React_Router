import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  
  // 1. State for inputs
  const [adminData, setAdminData] = useState({
    email: '',
    password: ''
  });

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  // 3. Handle Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch the admin list from db.json
      const response = await fetch('http://localhost:5000/admins');
      const admins = await response.json();

      // Find if an admin matches the credentials
      const foundAdmin = admins.find(
        (a) => a.email === adminData.email && a.password === adminData.password
      );

      if (foundAdmin) {
        // --- LOCAL STORAGE API ---
        localStorage.setItem('gymAdmin', JSON.stringify({
          email: foundAdmin.email,
          role: 'admin',
          isLoggedIn: true
        }));

        alert("Admin Authorization Successful!");
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      } else {
        alert("Invalid Admin Credentials!");
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Make sure json-server is running on port 5000");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-950">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <form 
        onSubmit={handleLogin} 
        className="relative z-10 w-full max-w-md p-1 bg-gradient-to-b from-slate-700 to-slate-900 rounded-2xl shadow-2xl"
      >
        <div className="bg-slate-900 p-8 rounded-[14px]">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 text-blue-500 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest">Admin Access</h2>
            <p className="text-slate-400 text-sm mt-1">Management Console Login</p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col">
              <label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Admin Email</label>
              <input 
                name="email"
                type="email" 
                value={adminData.email}
                onChange={handleChange}
                className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="admin@gym-system.com"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 ml-1">Security Password</label>
              <input 
                name="password"
                type="password" 
                value={adminData.password}
                onChange={handleChange}
                className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/20 active:scale-95"
              >
                Authorize Login
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/')} 
              className="text-xs text-slate-400 hover:text-slate-300 transition-colors uppercase tracking-widest"
            >
              ← Return to Main Site
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Admin;