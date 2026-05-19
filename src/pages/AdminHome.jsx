import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MembersManager from '../adminspage/MembersManager';
import PlansManager from '../adminspage/PlansManager';
import AttendanceManager from '../adminspage/AttendanceManager';

const AdminHome = () => {
  const navigate = useNavigate();
  const AdminProfile = async (newPhotoUrl) => {
  try {
    // 1. Update the database entry
    const res = await fetch(`http://localhost:5000/admins/${admin.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profilePic: newPhotoUrl })
    });

    if (res.ok) {
      // 2. Update Local Storage so the change persists on refresh
      const updatedAdmin = { ...admin, profilePic: newPhotoUrl };
      setAdmin(updatedAdmin);
      localStorage.setItem('gymAdmin', JSON.stringify(updatedAdmin));
      alert("Profile picture updated!");
    }
  } catch (error) {
    console.error("Failed to update profile picture");
  }
};
  const [activeTab, setActiveTab] = useState('dashboard');
  const [admin, setAdmin] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const adminSession = localStorage.getItem('gymAdmin');
    if (!adminSession) navigate('/admin');
    else setAdmin(JSON.parse(adminSession));

    // Live clock for the "Modern" feel
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('gymAdmin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#05070a] flex text-slate-200 font-sans selection:bg-blue-500/30">
      {/* GLOW EFFECTS */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0a0c10]/80 backdrop-blur-xl border-r border-white/5 hidden lg:flex flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-black text-xl">R</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tighter italic uppercase">RSK <span className="text-blue-500">Fit GYM</span></h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] ml-1">Admin Console v2.0</p>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          <NavBtn active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} label="Dashboard" icon="📊" />
          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Management</div>
          <NavBtn active={activeTab === 'members'} onClick={() => setActiveTab('members')} label="Members" icon="👥" />
          <NavBtn active={activeTab === 'plans'} onClick={() => setActiveTab('plans')} label="Gym Plans" icon="💪" />
          <NavBtn active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} label="Attendance" icon="📅" />
        </nav>

        <div className="p-6">
          <button 
            onClick={handleLogout} 
            className="w-full group flex items-center justify-center gap-3 p-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-2xl transition-all"
          >
            <span className="text-red-500 font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative">
        {/* TOP NAVBAR */}
        <header className="h-24 px-10 flex items-center justify-between sticky top-0 z-40 bg-[#05070a]/60 backdrop-blur-md border-b border-white/5">
  <div>
    <h2 className="text-xl font-bold text-white capitalize">{activeTab} Overview</h2>
    <p className="text-xs text-slate-500 font-medium">System Status: Optimal</p>
  </div>
  
  <div className="flex items-center gap-6">
    <div className="text-right hidden sm:block">
      <p className="text-sm font-bold text-slate-200">{admin?.email.split('@')[0]}</p>
      <p className="text-[10px] text-blue-500 uppercase font-bold tracking-widest">{admin?.role}</p>
    </div>

    {/* DYNAMIC PROFILE PICTURE */}
    <div className="relative group cursor-pointer">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-blue-500/20">
         <div className="w-full h-full rounded-[14px] bg-[#05070a] overflow-hidden flex items-center justify-center">
           {admin?.profilePic ? (
             <img 
               src={admin.profilePic} 
               alt="Admin Profile" 
               className="w-full h-full object-cover transition-transform group-hover:scale-110" 
             />
           ) : (
             <span className="text-blue-500 font-black text-lg">
               {admin?.email.charAt(0).toUpperCase()}
             </span>
           )}
         </div>
      </div>
      {/* Online Status Indicator */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#05070a] rounded-full"></div>
    </div>
  </div>
</header>

        {/* DYNAMIC VIEWPORT */}
        <div className="p-10 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* STAT CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <QuickStat title="Total Members" value="1,284" growth="+12%" icon="👥" color="blue" />
                <QuickStat title="Active Sessions" value="42" growth="Live" icon="⚡" color="orange" />
                <QuickStat title="Monthly Revenue" value="$12,400" growth="+8.2%" icon="💰" color="emerald" />
              </div>

              {/* WELCOME SECTION */}
              <div className="relative overflow-hidden p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-blue-500/20">
                <div className="relative z-10 max-w-lg">
                  <h3 className="text-4xl font-black text-white mb-4 tracking-tight">Everything is running smoothly.</h3>
                  <p className="text-blue-100 text-lg mb-8 opacity-80">You have 12 pending membership approvals and 3 scheduled maintenance tasks for today.</p>
                  <button onClick={() => setActiveTab('members')} className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:scale-105 transition-transform active:scale-95 shadow-xl">
                    Manage Members
                  </button>
                </div>
                {/* Decorative SVG/Shape */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-20"></div>
              </div>
            </div>
          )}

          {/* OTHER MANAGERS */}
          {activeTab === 'members' && <MembersManager />}
          {activeTab === 'plans' && <PlansManager />}
          {activeTab === 'attendance' && <AttendanceManager />}
        </div>
      </main>
    </div>
  );
};

/* SUB-COMPONENTS */

const NavBtn = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`w-full group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
      active 
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-white/20' 
      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
    }`}
  >
    <span className={`text-xl transition-transform duration-500 ${active ? 'scale-110' : 'group-hover:rotate-12'}`}>{icon}</span>
    <span className="text-sm font-bold tracking-tight">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
  </button>
);

const QuickStat = ({ title, value, growth, icon, color }) => {
  const colors = {
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-500",
    orange: "from-orange-500/20 to-orange-600/5 border-orange-500/20 text-orange-500",
    emerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-500"
  };

  return (
    <div className={`p-8 rounded-[2rem] bg-gradient-to-br border ${colors[color]} backdrop-blur-sm`}>
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl">{icon}</div>
        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-white/5`}>{growth}</span>
      </div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
      <h4 className="text-3xl font-black text-white tracking-tighter">{value}</h4>
    </div>
  );
};

export default AdminHome;