import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const navigate = useNavigate();
  // State for form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validation Logic
  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        // 1. Call your Login API
        const response = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          // 2. STORE in Local Storage
          // We stringify the object because localStorage only stores strings
          localStorage.setItem('gymUser', JSON.stringify({
            token: data.token, // If your API returns a JWT
            user: data.user,   // User details like name, email, role
            isLoggedIn: true
          }));

          alert(`Welcome back, ${data.user.fullName}!`);
          
          // 3. NAVIGATE to the dashboard (using the navigate hook you already imported)
          navigate('/userdash'); 
        } else {
          // Handle API errors (e.g., "Invalid credentials")
          setErrors({ auth: data.message || "Login failed" });
        }
      } catch (error) {
        console.error("Connection Error:", error);
        alert("Server is down. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Member Login</h2>
          <p className="text-zinc-500 text-sm mt-2">Enter your gear and get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-zinc-800 border ${errors.email ? 'border-red-500' : 'border-zinc-700'} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
              placeholder="athlete@gym.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Password</label>
            </div>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-zinc-800 border ${errors.password ? 'border-red-500' : 'border-zinc-700'} rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
          </div>

          <button 
            type="submit"
            
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-orange-900/20 active:scale-95"
          >
            Start Training
          </button>
        

        {/* Footer Link */}
           <p onClick={() => navigate('/newuser')} className="text-center text-gray-300 mt-4">
            Don't have an account? < span className="text-blue-400 cursor-pointer hover:underline font-semibold" >Join Now</span>
          </p>
        </form>
      </div>
      
    </div>
  );
};

export default Users;