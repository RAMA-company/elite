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
