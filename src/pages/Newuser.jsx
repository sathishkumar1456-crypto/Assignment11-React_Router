import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewUser() {
  const navigate = useNavigate();

  // 1. Setup Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: ''
  });

  // 2. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 3. Handle Submit to db.json
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5173/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          password: formData.password, // In real apps, hash this!
          // role: 'member',
          joinDate: new Date().toISOString().split('T')[0]
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // --- LOCAL STORAGE API ---
        localStorage.setItem('gymUser', JSON.stringify(result));
        
        alert("Registration Successful!");
        navigate('/users'); // Redirect to login
      } else {
        alert("Failed to register user.");
      }
    } catch (error) {
      console.error("Error connecting to db.json:", error);
      alert("Make sure your json-server is running on port 5000");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 p-4">
      <div className="absolute top-20 left-20 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">Join the Squad</h2>
            <p className="text-zinc-400 mt-2">Create your account to start your fitness journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Name</label>
              <input 
                name="fullName"
                type="text" 
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                placeholder="Enter your name" 
                required 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                placeholder="name@example.com" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Phone Number</label>
              <input 
                name="phone"
                type="tel" 
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                placeholder="1234567890" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">City</label>
              <input 
                name="city"
                type="text" 
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                placeholder="Your location" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                name="password"
                type="password" 
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                placeholder="••••••••"
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Confirm Password</label>
              <input 
                name="confirmPassword"
                type="password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                placeholder="••••••••"
                required 
              />
            </div>
          </div>

          <button type="submit" className="w-full mt-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-orange-900/40 transition-all active:scale-[0.98]">
            Create Account
          </button>
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-zinc-500 text-xs uppercase tracking-tighter">
              By signing up, you agree to our <span className="text-orange-500 cursor-pointer hover:underline">Terms of Service</span>.
            </p>
            <p className="text-zinc-400 text-sm">
              Already have an account? <a href="/users" className="text-white font-bold hover:text-orange-500 transition-colors">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewUser;