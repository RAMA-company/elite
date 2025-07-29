import React from 'react';
import Canvas from './components/Canvas';
import AssetLibrary from './components/AssetLibrary';
import DesignPanel from './components/DesignPanel';
import PreviewPane from './components/PreviewPane';
import ExportButton from './components/ExportButton';
import { AppProvider } from './context/AppContext';
import './styles/glass.css';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-900 p-6">
        <header className="glass-panel p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-12 mr-3 bg-purple-600 rounded-full animate-pulse" />
              <h1 className="text-3xl font-bold text-white neon-purple-glow">
                Rama Web Generator
              </h1>
            </div>
            <ExportButton />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-4 lg:col-span-1">
            <AssetLibrary />
          </div>
          
          <div className="glass-panel p-4 lg:col-span-2">
            <Canvas />
          </div>
          
          <div className="glass-panel p-4 lg:col-span-1">
            <DesignPanel />
            <PreviewPane />
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
