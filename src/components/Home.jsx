import React, { useState } from 'react';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {isAdmin ? 'Admin Portal' : 'Member Login'}
        </h2>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="gym@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsAdmin(!isAdmin)} 
            className="text-sm text-gray-500 underline"
          >
            Switch to {isAdmin ? 'User Login' : 'Admin Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home