import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface BreadcrumbItem {
  id: string;
  label: string;
  onClose: () => void;
}

interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbItem[];
  addBreadcrumb: (id: string, label: string, onClose: () => void) => void;
  removeBreadcrumb: (id: string) => void;
  navigateToBreadcrumb: (id: string) => void;
  clearBreadcrumbs: () => void;
  currentPanel: string | null;
  setCurrentPanel: (id: string | null) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

interface BreadcrumbProviderProps {
  children: ReactNode;
}

export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [currentPanel, setCurrentPanel] = useState<string | null>(null);

  const addBreadcrumb = useCallback((id: string, label: string, onClose: () => void) => {
    setBreadcrumbs((prev) => {
      // Check if breadcrumb already exists
      const existingIndex = prev.findIndex((b) => b.id === id);
      if (existingIndex !== -1) {
        // Update the existing breadcrumb
        const updated = [...prev];
        updated[existingIndex] = { id, label, onClose };
        return updated;
      }
      // Add new breadcrumb
      return [...prev, { id, label, onClose }];
    });
    setCurrentPanel(id);
  }, []);

  const removeBreadcrumb = useCallback((id: string) => {
    setBreadcrumbs((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index === -1) return prev;
      
      // Remove this breadcrumb and all after it
      const newBreadcrumbs = prev.slice(0, index);
      
      // If there are remaining breadcrumbs, set the last one as current
      if (newBreadcrumbs.length > 0) {
        const lastBreadcrumb = newBreadcrumbs[newBreadcrumbs.length - 1];
        setCurrentPanel(lastBreadcrumb.id);
      } else {
        setCurrentPanel(null);
      }
      
      return newBreadcrumbs;
    });
  }, []);

  const navigateToBreadcrumb = useCallback((id: string) => {
    setBreadcrumbs((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index === -1) return prev;
      
      // Keep breadcrumbs up to and including the target
      const newBreadcrumbs = prev.slice(0, index + 1);
      setCurrentPanel(id);
      
      return newBreadcrumbs;
    });
  }, []);

  const clearBreadcrumbs = useCallback(() => {
    setBreadcrumbs([]);
    setCurrentPanel(null);
  }, []);

  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbs,
        addBreadcrumb,
        removeBreadcrumb,
        navigateToBreadcrumb,
        clearBreadcrumbs,
        currentPanel,
        setCurrentPanel,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumbs = (): BreadcrumbContextType => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbProvider');
  }
  return context;
};

export default BreadcrumbContext;
