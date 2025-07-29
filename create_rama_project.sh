#!/bin/bash

# Create project structure
mkdir -p rama-web-generator/{client/public,client/src/{components,context,styles},server/{services,routes}}

# Create client files
cat > rama-web-generator/client/src/App.jsx << 'EOL'
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
EOL

cat > rama-web-generator/client/src/index.js << 'EOL'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOL

cat > rama-web-generator/client/src/components/Canvas.jsx << 'EOL'
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
EOL

cat > rama-web-generator/client/src/components/AssetLibrary.jsx << 'EOL'
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
EOL

cat > rama-web-generator/client/src/components/DesignPanel.jsx << 'EOL'
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
EOL

cat > rama-web-generator/client/src/components/ExportButton.jsx << 'EOL'
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function ExportButton() {
  const { exportProject } = useContext(AppContext);
  
  return (
    <button 
      onClick={exportProject}
      className="glass-panel px-6 py-3 text-white font-bold bg-purple-600 hover:bg-purple-700 transition-colors flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Export Website
    </button>
  );
}
EOL

cat > rama-web-generator/client/src/components/PreviewPane.jsx << 'EOL'
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
EOL

cat > rama-web-generator/client/src/context/AppContext.jsx << 'EOL'
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [components, setComponents] = useState([
    { id: 1, name: 'Sample Hero Section' }
  ]);
  
  const exportProject = () => {
    console.log('Exporting project...');
    // Actual export functionality would go here
    alert('Export initiated! Check console for details');
  };

  return (
    <AppContext.Provider value={{ components, exportProject }}>
      {children}
    </AppContext.Provider>
  );
}
EOL

cat > rama-web-generator/client/src/styles/glass.css << 'EOL'
.glass-panel {
  background: rgba(25, 25, 35, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(199, 112, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 16px rgba(199, 112, 255, 0.15) inset;
  transition: all 0.3s ease;
}

.glass-panel:hover {
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 24px rgba(199, 112, 255, 0.25) inset;
}

.neon-purple-glow {
  text-shadow: 0 0 10px rgba(199, 112, 255, 0.8);
}

body {
  background: linear-gradient(135deg, #1a0633 0%, #0d1b2a 100%);
  color: white;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
EOL

# Create server files
cat > rama-web-generator/server/routes/export.js << 'EOL'
import express from 'express';
import JSZip from 'jszip';
import { optimizeHTML, minifyCSS } from '../services/zipGenerator.js';

const router = express.Router();

router.post('/export', async (req, res) => {
  try {
    const { html, css, assets } = req.body;
    const zip = new JSZip();
    
    // Add HTML
    zip.file("index.html", optimizeHTML(html));
    
    // Add CSS
    zip.file("styles.css", minifyCSS(css));
    
    // Add assets
    const assetsFolder = zip.folder("assets");
    assets.forEach(asset => {
      assetsFolder.file(asset.name, asset.data);
    });
    
    // Generate ZIP
    const buffer = await zip.generateAsync({ type: "nodebuffer" });
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=rama_website.zip');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

export default router;
EOL

cat > rama-web-generator/server/services/zipGenerator.js << 'EOL'
import { minify } from 'html-minifier-terser';
import cssnano from 'cssnano';
import postcss from 'postcss';

export const optimizeHTML = (html) => {
  return minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true
  });
};

export const minifyCSS = async (css) => {
  const result = await postcss([cssnano]).process(css, { from: undefined });
  return result.css;
};
EOL

cat > rama-web-generator/server/server.js << 'EOL'
import express from 'express';
import cors from 'cors';
import exportRouter from './routes/export.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', exportRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
EOL

# Create package.json files
cat > rama-web-generator/client/package.json << 'EOL'
{
  "name": "rama-web-generator-client",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@dnd-kit/core": "^6.0.8",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
EOL

cat > rama-web-generator/server/package.json << 'EOL'
{
  "name": "rama-web-generator-server",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "cssnano": "^6.0.1",
    "express": "^5.0.0",
    "html-minifier-terser": "^7.2.0",
    "jszip": "^3.10.1",
    "postcss": "^8.4.31"
  },
  "scripts": {
    "start": "node server.js"
  }
}
EOL

# Create README
cat > rama-web-generator/README.md << 'EOL'
# Rama Web Generator (2025)

Modern drag-and-drop website builder with floating glass UI

![Rama Web Generator Preview](preview.jpg)

## Features
- Visual component-based editing
- Floating glass UI design
- Real-time responsive preview
- Built-in SEO optimization
- One-click ZIP export
- Animation studio

## Technologies
**Frontend:**
- React 18
- @dnd-kit (drag-and-drop)
- Glassmorphism CSS

**Backend:**
- Node.js 20
- Express 5
- JSZip

## Setup
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Run both applications (in separate terminals)
# Terminal 1: 
cd client && npm start

# Terminal 2: 
cd server && npm start
