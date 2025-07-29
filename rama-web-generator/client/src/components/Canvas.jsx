import React, { useContext } from 'react';
import { DndContext } from '@dnd-kit/core';
import { AppContext } from '../context/AppContext';

export default function Canvas() {
  const { components } = useContext(AppContext);

  return (
    <div className="h-full">
      <h2 className="text-xl font-semibold text-white mb-4">Workspace</h2>
      
      <DndContext>
        <div className="grid grid-cols-12 gap-4 min-h-[70vh] p-4 bg-gray-800/30 rounded-xl">
          {components.map((component) => (
            <div 
              key={component.id}
              className="glass-panel col-span-12 p-4 hover:border-purple-500 transition-colors"
            >
              {component.name}
            </div>
          ))}
          
          <div className="col-span-12 text-center py-12 text-gray-500 border-2 border-dashed border-gray-700 rounded-xl">
            Drag components here
          </div>
        </div>
      </DndContext>
    </div>
  );
}
