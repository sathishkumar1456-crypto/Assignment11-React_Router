import React, { useState, useEffect } from 'react';

const MembersManager = () => {
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // State for adding a new member
  const [newMember, setNewMember] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    planType: '', // Connected to Plan selection
    password: 'gym123'
  });

  useEffect(() => { 
    fetchMembers();
    fetchPlans();
  }, []);

  // READ: Fetch all users
  const fetchMembers = async () => {
    try {
      const res = await fetch('http://localhost:5000/users');
      setMembers(await res.json());
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  // READ: Fetch all plans
  const fetchPlans = async () => {
    try {
      const res = await fetch('http://localhost:5000/plans');
      setPlans(await res.json());
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  };

  // CREATE: Add member with duplicate check
  const handleAddMember = async (e) => {
    e.preventDefault();
    
    const isDuplicate = members.find(m => m.email === newMember.email);
    if (isDuplicate) return alert("Email already exists!");

    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newMember,
          joinDate: new Date().toISOString().split('T')[0]
        })
      });

      if (res.ok) {
        setNewMember({ fullName: '', email: '', phone: '', city: '', planType: '', password: 'gym123' });
        setShowAddForm(false);
        fetchMembers();
      }
    } catch (error) {
      alert("Error adding member.");
    }
  };

  // UPDATE: Save changes to an existing member
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/users/${editingMember.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMember)
      });
      if (res.ok) {
        setEditingMember(null);
        fetchMembers();
      }
    } catch (error) {
      alert("Update failed.");
    }
  };

  // DELETE: Remove member
  const deleteMember = async (id) => {
    if (window.confirm("Permanently delete this member?")) {
      try {
        await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
        fetchMembers();
      } catch (error) {
        alert("Delete failed.");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black uppercase text-white tracking-tighter">Member Directory</h2>
          <p className="text-slate-500 text-sm">Managing {members.length} active athletes</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20"
        >
          {showAddForm ? '✕ Close' : '+ Add Member'}
        </button>
      </div>

      {/* --- CREATE FORM --- */}
      {showAddForm && (
        <form onSubmit={handleAddMember} className="bg-[#0a0c10] p-8 rounded-[2rem] border border-blue-500/30 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-2xl">
          <input placeholder="Full Name" className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-blue-500" value={newMember.fullName} onChange={e => setNewMember({...newMember, fullName: e.target.value})} required />
          <input placeholder="Email Address" type="email" className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-blue-500" value={newMember.email} onChange={e => setNewMember({...newMember, email: e.target.value})} required />
          
          <div className="md:col-span-2">
            <select 
              className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-blue-500 appearance-none"
              value={newMember.planType}
              onChange={e => setNewMember({...newMember, planType: e.target.value})}
              required
            >
              <option value="">Select Plan Type...</option>
              {plans.map(plan => (
                <option key={plan.id} value={plan.name}>{plan.name} — ${plan.price}</option>
              ))}
            </select>
          </div>

          <input placeholder="Phone Number" className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-white" value={newMember.phone} onChange={e => setNewMember({...newMember, phone: e.target.value})} />
          <input placeholder="City" className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-white" value={newMember.city} onChange={e => setNewMember({...newMember, city: e.target.value})} />
          
          <button type="submit" className="md:col-span-2 bg-blue-600 p-4 rounded-xl font-bold uppercase text-white mt-2 hover:bg-blue-500 transition-colors">Confirm Registration</button>
        </form>
      )}

      {/* --- UPDATE FORM --- */}
      {editingMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleUpdate} className="bg-[#0a0c10] p-8 rounded-[2rem] border border-blue-500 w-full max-w-2xl space-y-4">
            <h3 className="text-xl font-bold text-white uppercase italic">Update Member Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="bg-slate-900 p-4 rounded-xl text-white border border-slate-800" value={editingMember.fullName} onChange={e => setEditingMember({...editingMember, fullName: e.target.value})} />
              <input className="bg-slate-900 p-4 rounded-xl text-white border border-slate-800" value={editingMember.email} onChange={e => setEditingMember({...editingMember, email: e.target.value})} />
              <select 
                className="md:col-span-2 bg-slate-900 p-4 rounded-xl text-white border border-slate-800"
                value={editingMember.planType}
                onChange={e => setEditingMember({...editingMember, planType: e.target.value})}
              >
                {plans.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="submit" className="flex-1 bg-blue-600 p-4 rounded-xl font-bold uppercase">Save Changes</button>
              <button type="button" onClick={() => setEditingMember(null)} className="flex-1 bg-slate-800 p-4 rounded-xl font-bold uppercase text-slate-400">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* --- READ/DELETE TABLE --- */}
      <div className="bg-[#0a0c10]/60 backdrop-blur-md rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
            <tr>
              <th className="p-6">Athlete</th>
              <th className="p-6">Plan Status</th>
              <th className="p-6">Location</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.map(m => (
              <tr key={m.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-6">
                  <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{m.fullName}</p>
                  <p className="text-xs text-slate-500">{m.email}</p>
                </td>
                <td className="p-6">
                  <span className="text-[10px] font-black bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full uppercase border border-blue-500/20">
                    {m.planType || 'Standard'}
                  </span>
                </td>
                <td className="p-6 text-sm text-slate-400">{m.city || 'Global'}</td>
                <td className="p-6 text-right space-x-6">
                  <button onClick={() => setEditingMember(m)} className="text-blue-500 text-xs font-black uppercase hover:underline">Edit</button>
                  <button onClick={() => deleteMember(m.id)} className="text-red-500/60 hover:text-red-500 text-xs font-black uppercase">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersManager;