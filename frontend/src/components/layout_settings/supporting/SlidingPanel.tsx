import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowRoundBack, IoIosHome } from 'react-icons/io';
import { ChevronRight } from 'lucide-react';
import ErrorBoundary from '../../ErrorBoundary';
import { useBreadcrumbs } from '../../../contexts/BreadcrumbContext';

interface SlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  panelId?: string;
  showBreadcrumbs?: boolean;
  onHomeClick?: () => void;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  panelId,
  showBreadcrumbs = true,
  onHomeClick
}) => {
  const { breadcrumbs, navigateToBreadcrumb, clearBreadcrumbs } = useBreadcrumbs();

  const handleBackClick = () => {
    if (breadcrumbs.length > 1) {
      // Navigate to previous breadcrumb
      const prevBreadcrumb = breadcrumbs[breadcrumbs.length - 2];
      navigateToBreadcrumb(prevBreadcrumb.id);
    } else {
      // Go back to root
      clearBreadcrumbs();
      onClose();
    }
  };

  const handleHomeClick = () => {
    clearBreadcrumbs();
    if (onHomeClick) {
      onHomeClick();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-stone-50 to-white overflow-y-auto hide-scrollbar shadow-2xl z-50"
        >
          {/* Header with gradient */}
          <div className="sticky top-0 bg-gradient-to-r from-stone-100 to-white z-10 pb-[.8vh] border-b border-stone-200">
            {/* Breadcrumb Navigation */}
            {showBreadcrumbs && breadcrumbs.length > 0 && (
              <div className="flex items-center px-[1.8vh] py-[.9vh] text-[1.7vh] overflow-x-auto hide-scrollbar bg-stone-100/80 backdrop-blur-sm">
                <button
                  onClick={handleHomeClick}
                  className="flex items-center text-stone-500 hover:text-stone-800 transition-colors flex-shrink-0"
                >
                  <IoIosHome className="text-[1.6vh]" />
                  <span className="ml-[.5vh]">Home</span>
                </button>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.id}>
                    <ChevronRight className="mx-[.5vh] text-stone-400 flex-shrink-0" size={12} />
                    <button
                      onClick={() => navigateToBreadcrumb(crumb.id)}
                      className={`flex-shrink-0 transition-colors ${
                        index === breadcrumbs.length - 1
                          ? 'text-stone-900 font-medium'
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      {crumb.label}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Title with back button */}
            <div className="flex items-center px-[1.2vh] py-[.8vh]">
              <button 
                onClick={handleBackClick}
                className="flex items-center justify-center w-[3.8vh] h-[3.8vh]  rounded-full bg-stone-200/50 hover:bg-stone-200 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <IoIosArrowRoundBack className="text-[3vh] text-stone-700"/>
              </button>
              <h2 className="text-[2.7vh] font-semibold text-stone-800 ml-3 capitalize tracking-wide">{title}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-3 space-y-2">
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SlidingPanel;
