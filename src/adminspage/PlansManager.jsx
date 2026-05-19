import React, { useState, useEffect } from 'react';

const PlansManager = () => {
  const [plans, setPlans] = useState([]);
  // Added 'type' to the state object
  const [newPlan, setNewPlan] = useState({ 
    name: '', 
    price: '', 
    duration: '', 
    type: 'Monthly' // Default selection
  });

  useEffect(() => { fetchPlans(); }, []);

  const fetchPlans = async () => {
    const res = await fetch('http://localhost:5000/plans');
    setPlans(await res.json());
  };

  const addPlan = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPlan)
    });
    // Reset form including type
    setNewPlan({ name: '', price: '', duration: '', type: 'Monthly' });
    fetchPlans();
  };

  const deletePlan = async (id) => {
    await fetch(`http://localhost:5000/plans/${id}`, { method: 'DELETE' });
    fetchPlans();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      {/* --- ADD PLAN FORM --- */}
      <div className="lg:col-span-1 bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 h-fit shadow-2xl">
        <h3 className="text-xl font-black mb-6 uppercase text-white italic tracking-tighter">Create New Plan</h3>
        <form onSubmit={addPlan} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 mb-1 block">Plan Name</label>
            <input 
              placeholder="e.g. Pro Athlete" 
              className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white focus:border-blue-500 outline-none transition-all" 
              value={newPlan.name} 
              onChange={e => setNewPlan({...newPlan, name: e.target.value})} 
              required 
            />
          </div>

          {/* NEW: PLAN TYPE SELECTION */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 mb-1 block">Billing Cycle (Type)</label>
            <select 
              className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white focus:border-blue-500 outline-none transition-all appearance-none"
              value={newPlan.type}
              onChange={e => setNewPlan({...newPlan, type: e.target.value})}
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
              <option value="Lifetime">Lifetime</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-2 mb-1 block">Price ($)</label>
            <input 
              placeholder="99" 
              type="number" 
              className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white focus:border-blue-500 outline-none transition-all" 
              value={newPlan.price} 
              onChange={e => setNewPlan({...newPlan, price: e.target.value})} 
              required 
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 p-4 rounded-2xl font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            Launch Plan
          </button>
        </form>
      </div>

      {/* --- PLANS DISPLAY LIST --- */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map(p => (
          <div key={p.id} className="group bg-[#0a0c10]/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                {/* Visual indicator for Plan Type */}
                <span className="text-[10px] font-black bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/20">
                  {p.type || 'Monthly'}
                </span>
                <button onClick={() => deletePlan(p.id)} className="text-slate-600 hover:text-red-500 transition-colors">✕</button>
              </div>
              <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-1">{p.name}</h4>
              <p className="text-3xl font-black text-white">${p.price}<span className="text-sm text-slate-500 font-bold ml-1 italic">/ session</span></p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Status: Active</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansManager;