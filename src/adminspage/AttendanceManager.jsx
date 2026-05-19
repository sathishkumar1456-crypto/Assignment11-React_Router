import React, { useState, useEffect } from 'react';

const AttendanceManager = () => {
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);
  const [editingLog, setEditingLog] = useState(null);
  const [showManualAdd, setShowManualAdd] = useState(false);
  
  const [newEntry, setNewEntry] = useState({
    userId: '',
    userName: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  });

  useEffect(() => {
    fetchAttendance();
    fetchMembers();
  }, []);

  const fetchAttendance = async () => {
    const res = await fetch('http://localhost:5000/attendance');
    const data = await res.json();
    setAttendance(data.reverse()); // Show latest first
  };

  const fetchMembers = async () => {
    const res = await fetch('http://localhost:5000/users');
    setMembers(await res.json());
  };

  // CREATE: Manually add attendance
  const handleManualAdd = async (e) => {
    e.preventDefault();
    const selectedMember = members.find(m => m.id === newEntry.userId);
    
    const entryToSave = {
      ...newEntry,
      userName: selectedMember?.fullName || "Unknown Member"
    };

    await fetch('http://localhost:5000/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entryToSave)
    });

    setShowManualAdd(false);
    setNewEntry({ userId: '', userName: '', date: new Date().toISOString().split('T')[0], time: '' });
    fetchAttendance();
  };

  // UPDATE: Edit existing log
  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/attendance/${editingLog.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingLog)
    });
    setEditingLog(null);
    fetchAttendance();
  };

  // DELETE: Remove log entry
  const deleteLog = async (id) => {
    if (window.confirm("Delete this attendance record?")) {
      await fetch(`http://localhost:5000/attendance/${id}`, { method: 'DELETE' });
      fetchAttendance();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black uppercase text-white tracking-tighter">Attendance Logs</h2>
          <p className="text-slate-500 text-sm">Tracking daily gym traffic and athlete check-ins</p>
        </div>
        <button 
          onClick={() => setShowManualAdd(!showManualAdd)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold transition-all"
        >
          {showManualAdd ? '✕ Close' : '+ Manual Check-in'}
        </button>
      </div>

      {/* MANUAL ADD FORM */}
      {showManualAdd && (
        <form onSubmit={handleManualAdd} className="bg-[#0a0c10] p-8 rounded-[2rem] border border-emerald-500/30 grid grid-cols-1 md:grid-cols-3 gap-4">
          <select 
            className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-emerald-500"
            value={newEntry.userId}
            onChange={e => setNewEntry({...newEntry, userId: e.target.value})}
            required
          >
            <option value="">Select Member...</option>
            {members.map(m => <option key={m.id} value={m.id}>{m.fullName}</option>)}
          </select>
          <input type="date" className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-white" value={newEntry.date} onChange={e => setNewEntry({...newEntry, date: e.target.value})} />
          <input type="time" className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-white" value={newEntry.time} onChange={e => setNewEntry({...newEntry, time: e.target.value})} />
          <button className="md:col-span-3 bg-emerald-600 p-4 rounded-xl font-bold uppercase text-white">Log Attendance</button>
        </form>
      )}

      {/* UPDATE MODAL */}
      {editingLog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleUpdate} className="bg-[#0a0c10] p-8 rounded-[2rem] border border-blue-500 w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold text-white uppercase italic text-center">Update Check-in Details</h3>
            <p className="text-center text-slate-400 text-sm">{editingLog.userName}</p>
            <input type="date" className="w-full bg-slate-900 p-4 rounded-xl text-white border border-slate-800" value={editingLog.date} onChange={e => setEditingLog({...editingLog, date: e.target.value})} />
            <input type="time" className="w-full bg-slate-900 p-4 rounded-xl text-white border border-slate-800" value={editingLog.time} onChange={e => setEditingLog({...editingLog, time: e.target.value})} />
            <div className="flex gap-4">
              <button type="submit" className="flex-1 bg-blue-600 p-4 rounded-xl font-bold uppercase">Update</button>
              <button type="button" onClick={() => setEditingLog(null)} className="flex-1 bg-slate-800 p-4 rounded-xl font-bold uppercase">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* LOG TABLE */}
      <div className="bg-[#0a0c10]/60 backdrop-blur-md rounded-[2rem] border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
            <tr>
              <th className="p-6">Athlete</th>
              <th className="p-6 text-center">Date</th>
              <th className="p-6 text-center">Check-in Time</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {attendance.map(a => (
              <tr key={a.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-6 font-bold text-white">{a.userName}</td>
                <td className="p-6 text-center text-slate-400 text-sm">{a.date}</td>
                <td className="p-6 text-center font-mono text-emerald-400">{a.time}</td>
                <td className="p-6 text-right space-x-4">
                  <button onClick={() => setEditingLog(a)} className="text-blue-500 text-xs font-black uppercase">Edit</button>
                  <button onClick={() => deleteLog(a.id)} className="text-red-500/50 hover:text-red-500 text-xs font-black uppercase">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceManager;