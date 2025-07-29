import React from 'react';

export default function PreviewPane() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Preview</h2>
      <div className="glass-panel p-4">
        <div className="flex space-x-2 mb-4">
          <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm">Desktop</button>
          <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm">Tablet</button>
          <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm">Mobile</button>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg h-64 overflow-auto">
          <div className="p-4">
            <div className="bg-gray-900 h-32 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">Website Preview</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
