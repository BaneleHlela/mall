// src/context/NavbarContext.tsx
import React, { createContext, useContext, useState } from "react";

interface NavbarContextType {
  isNavbarHidden: boolean;
  hideNavbar: () => void;
  showNavbar: () => void;
  toggleNavbar: () => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  const hideNavbar = () => setIsNavbarHidden(true);
  const showNavbar = () => setIsNavbarHidden(false);
  const toggleNavbar = () => setIsNavbarHidden(prev => !prev);

  return (
    <NavbarContext.Provider value={{ isNavbarHidden, hideNavbar, showNavbar, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = (): NavbarContextType => {
  const context = useContext(NavbarContext);
  if (!context) throw new Error("useNavbar must be used within a NavbarProvider");
  return context;
};
