import React, { createContext, useContext, useState, useEffect } from 'react';

interface DeviceContextType {
  isMobileOrTablet: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode; isMobileOrTabletOverride?: boolean }> = ({ children, isMobileOrTabletOverride }) => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const value = isMobileOrTabletOverride !== undefined ? { isMobileOrTablet: isMobileOrTabletOverride } : { isMobileOrTablet };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within DeviceProvider');
  }
  return context;
};