import React from 'react';
import { useNavigate } from 'react-router-dom';


const GymLandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { title: "Personal Training", desc: "One-on-one sessions with certified experts.", icon: "🏋️" },
    { title: "Class Schedules", desc: "Book Yoga, HIIT, and Zumba in one click.", icon: "📅" },
    { title: "Progress Tracking", desc: "Advanced analytics for your fitness journey.", icon: "📊" },
    { title: "Admin Controls", desc: "Seamless management for gym owners.", icon: "🛡️" },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-orange-500">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="text-2xl font-black italic tracking-tighter uppercase">
          SATHISHRSK FIT<span className="text-orange-500">PULSE</span>
        </div>
        
        <div className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-widest">
          <a href="#home" className="hover:text-orange-500 transition-colors">Home</a>
          <a href="#features" className="hover:text-orange-500 transition-colors">Features</a>
          <a href="#login" className="px-4 py-2 bg-orange-500 text-black rounded-sm hover:bg-white transition-all">Join Now</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase italic leading-none mb-4">
            Push Your <span className="text-orange-500">Limits</span>
          </h1>
          <p className="max-w-xl mx-auto text-gray-300 text-lg md:text-xl font-medium">
            The ultimate management platform for modern fitness hubs. 
            Track progress, manage members, and scale your gym.
          </p>
          <div className="mt-10 flex flex-col md:flex-row justify-center gap-4 ">
            <a href="/users" className="px-10 py-4 bg-orange-500 text-black font-black uppercase skew-x-[-10deg] hover:bg-white transition-all">
              Member Portal
            </a>
            <a href="/admin" className="px-10 py-4 border-2 border-white font-black uppercase skew-x-[-10deg] hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all">
              Admin Access
            </a>
          </div>
        </div>
      </header>

      {/* Feature Section */}
      <section id="features" className="py-24 px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 border border-gray-800 rounded-2xl hover:border-orange-500 transition-all group">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integrated Login Hub */}
      <section id="login" className="py-24 px-8">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
          {/* User Entry */}
          <div className="flex-1 p-12 border-b md:border-b-0 md:border-r border-gray-700 hover:bg-gray-700/50 transition-colors group">
            <h2 className="text-3xl font-black uppercase italic mb-4">Member <span className="text-orange-500">Login</span></h2>
            <p className="text-gray-400 mb-8">Access your workouts, plans, and membership details.</p>
            <button 
              onClick={() => navigate('/users')}
              className="w-full py-4 bg-white text-black font-bold uppercase rounded-lg group-hover:bg-orange-500 transition-all"
            >
              Enter Member Area
            </button>
          </div>

          {/* Admin Entry */}
          <div className="flex-1 p-12 hover:bg-gray-700/50 transition-colors group">
            <h2 className="text-3xl font-black uppercase italic mb-4 text-orange-500">Admin <span className="text-white">Panel</span></h2>
            <p className="text-gray-400 mb-8">Manage staff, revenue, and gym operations seamlessly.</p>
            <button 
              onClick={() => navigate('/admin')}
              className="w-full py-4 border-2 border-orange-500 text-orange-500 font-bold uppercase rounded-lg group-hover:bg-orange-500 group-hover:text-black transition-all"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </section>
      

      {/* Footer */}
      <footer className="py-12 border-t border-gray-900 text-center text-gray-500 text-sm">
        © 2026 Sathish Fitness Management System
      </footer>
    </div>
  );
};

export default GymLandingPage;