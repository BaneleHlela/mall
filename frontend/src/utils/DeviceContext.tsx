import React, { createContext, useContext, useState, useEffect } from 'react';

interface DeviceContextType {
  isMobileOrTablet: boolean;
  isDesktop: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{
  children: React.ReactNode;
  isMobileOrTabletOverride?: boolean;
  isDesktopOverride?: boolean;
}> = ({ children, isMobileOrTabletOverride, isDesktopOverride }) => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(window.innerWidth < 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 768);
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const value = {
    isMobileOrTablet: isMobileOrTabletOverride !== undefined ? isMobileOrTabletOverride : isMobileOrTablet,
    isDesktop: isDesktopOverride !== undefined ? isDesktopOverride : isDesktop,
  };

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