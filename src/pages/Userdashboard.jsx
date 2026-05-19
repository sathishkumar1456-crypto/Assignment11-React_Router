import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Userdashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Load User Session
    const savedData = localStorage.getItem('gymUser');
    if (!savedData) {
      navigate('/users');
      return;
    }
    const parsedData = JSON.parse(savedData);
    setUser(parsedData.user);
    
    // 2. Fetch fresh data and available plans
    const fetchData = async () => {
      try {
        const planRes = await fetch('http://localhost:5000/plans');
        setAvailablePlans(await planRes.json());
        
        // Optionally fetch fresh user data to ensure plan is up to date
        const userRes = await fetch(`http://localhost:5000/users/${parsedData.user.id}`);
        const freshUser = await userRes.json();
        setUser(freshUser);
        
        setLoading(false);
      } 
      catch (err) {
        console.error("Error loading dashboard:", err);
      }
    };
    fetchData();
  }, [navigate]);

  // 3. Handle Plan Selection (Upgrade/Join)
  const handleSelectPlan = async (planName) => {
    if (window.confirm(`Confirm upgrade to ${planName}?`)) {
      try {
        const res = await fetch(`http://localhost:5000/users/${user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planType: planName })
        });

        if (res.ok) {
          const updatedUser = { ...user, planType: planName };
          setUser(updatedUser);
          
          // Sync with local storage
          const session = JSON.parse(localStorage.getItem('gymUser'));
          localStorage.setItem('gymUser', JSON.stringify({ ...session, user: updatedUser }));
          
          alert("Plan updated successfully! Prepare to train.");
        }
      } catch (err) {
        alert("Transaction failed. Try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gymUser');
    navigate('/users');
  };

  // if (loading) return <div className="min-h-screen bg-[#05070a] flex items-center justify-center text-white font-black">INITIALIZING SYSTEM...</div>;

  return (
    
    <div className="min-h-screen bg-blue-800 text-slate-200 font-sans overflow-x-hidden">
      {/* BACKGROUND DECORATION */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[150px] rounded-full"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full"></div>

      <main className="relative z-10 max-w-6xl mx-auto p-6 md:p-12">
        
        {/* HEADER SECTION */}
        <header className="flex justify-between items-center mb-16">
          
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
              RSK <span className="text-orange-500">FIT GYM</span>
            </h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.3em]">Welcome back, {user?.fullName}</p>
          </div>
          <button onClick={handleLogout} className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-xl text-xs font-bold uppercase transition-all">
            Logout
          </button>
          
        </header>

        {/* CURRENT PLAN CARD (Glassmorphism) */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-zinc-900 to-black p-1 rounded-[2.5rem] shadow-2xl">
            <div className="bg-zinc-950/80 backdrop-blur-xl rounded-[2.3rem] p-10 flex flex-col md:flex-row justify-between items-center gap-8 border border-white/5">
              <div className="text-center md:text-left">
                <p className="text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2">Current Membership</p>
                <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
                  {user?.planType || "Unsubscribed"}
                </h2>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Status</span>
                </div>
              </div>
              
              <div className="bg-white/5 p-8 rounded-3xl border border-white/5 text-center min-w-[200px]">
                <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">Daily Streak</p>
                <p className="text-4xl font-black text-white">12 <span className="text-lg text-orange-500">DAYS</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* AVAILABLE PLANS GRID */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-2xl font-black uppercase text-white tracking-tighter">Available Upgrades</h3>
            <p className="text-slate-500 text-xs font-bold uppercase">All plans include pro coaching</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => (
              <div 
                key={plan.id}
                className={`group relative p-8 rounded-[2rem] border transition-all duration-500 ${
                  user?.planType === plan.name 
                  ? 'bg-blue-600/10 border-blue-500/50' 
                  : 'bg-zinc-900/40 border-white/5 hover:border-orange-500/30'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-black uppercase text-slate-400 tracking-widest border border-white/5">
                    {plan.type}
                  </span>
                  <p className="text-2xl font-black text-white">${plan.price}</p>
                </div>

                <h4 className="text-2xl font-black text-white uppercase italic mb-4">{plan.name}</h4>
                
                <ul className="space-y-3 mb-8">
                  <li className="text-xs text-slate-500 font-bold uppercase flex items-center gap-2">
                    <span className="text-orange-500">✓</span> Full Equipment Access
                  </li>
                  <li className="text-xs text-slate-500 font-bold uppercase flex items-center gap-2">
                    <span className="text-orange-500">✓</span> Free Locker Use
                  </li>
                </ul>

                <button 
                  onClick={() => handleSelectPlan(plan.name)}
                  disabled={user?.planType === plan.name}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all ${
                    user?.planType === plan.name 
                    ? 'bg-blue-600/20 text-blue-500 cursor-default' 
                    : 'bg-orange-600 text-white hover:bg-orange-500 shadow-lg shadow-orange-900/20 active:scale-95'
                  }`}
                >
                  {user?.planType === plan.name ? "Current Plan" : "Select Plan"}
                </button>
                
              </div>
              
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Userdashboard;