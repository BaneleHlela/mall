import React from 'react';
import { TbLoader3 } from 'react-icons/tb';

interface LoadingButtonProps {
  isLoading: boolean;
  label?: string; // Optional string label
  icon?: React.ReactNode; // Optional icon
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  label,
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 rounded ${className}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <TbLoader3 className="w-[3vh] h-[3vh] animate-spin mx-auto" />
      ) : (
        <>
          {icon ? (
            <span className="flex items-center space-x-2">
              {icon}
              {label && <span>{label}</span>}
            </span>
          ) : (
            label
          )}
        </>
      )}
    </button>
  );
};

export default LoadingButton;