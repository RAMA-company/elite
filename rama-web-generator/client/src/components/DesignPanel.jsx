import React from 'react';

export default function DesignPanel() {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Design</h2>
      
      <div className="glass-panel p-4 mb-4">
        <h3 className="text-white mb-2">Color Palette</h3>
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-[#c770ff] rounded-full border-2 border-white"></div>
          <div className="w-8 h-8 bg-[#5e17eb] rounded-full"></div>
          <div className="w-8 h-8 bg-[#00ffcc] rounded-full"></div>
          <button className="ml-auto text-purple-400">+</button>
        </div>
      </div>
      
      <div className="glass-panel p-4">
        <h3 className="text-white mb-2">Typography</h3>
        <select className="w-full bg-gray-800 text-white p-2 rounded">
          <option>Inter (Default)</option>
          <option>Poppins</option>
          <option>Montserrat</option>
        </select>
      </div>
    </div>
  );
}
