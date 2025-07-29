import React from 'react';

const components = [
  { id: 1, name: 'Hero Section', icon: '🖼️' },
  { id: 2, name: 'Card Grid', icon: '🃏' },
  { id: 3, name: 'Contact Form', icon: '✉️' },
  { id: 4, name: 'Image Gallery', icon: '🖼️' },
  { id: 5, name: 'Pricing Table', icon: '💰' },
];

export default function AssetLibrary() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Components</h2>
      <div className="grid grid-cols-2 gap-3">
        {components.map((item) => (
          <div 
            key={item.id}
            className="glass-panel p-3 flex items-center cursor-grab hover:bg-gray-700/50 transition-colors"
            draggable
          >
            <span className="text-2xl mr-2">{item.icon}</span>
            <span className="text-white">{item.name}</span>
          </div>
        ))}
      </div>
      
      <h2 className="text-xl font-semibold text-white mt-6 mb-4">Animations</h2>
      <div className="flex flex-wrap gap-2">
        {['Fade In', 'Slide Up', 'Zoom', 'Parallax', 'Blur'].map((ani) => (
          <div 
            key={ani}
            className="glass-panel px-3 py-2 text-sm cursor-pointer hover:bg-purple-900/30 transition-colors"
          >
            {ani}
          </div>
        ))}
      </div>
    </div>
  );
}
