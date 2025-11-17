import { motion, type HTMLMotionProps } from "framer-motion";
import { TbLoader3 } from "react-icons/tb";
import React from "react";

// Remove conflicting native drag events
type RemoveNativeDragEvents<T> = Omit<
  T,
  "onDrag" | "onDragStart" | "onDragEnd"
>;

type LoadingButtonProps = RemoveNativeDragEvents<
  HTMLMotionProps<"button">
> & {
  isLoading?: boolean;
  label?: string;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  label = "Sign in",
  disabled,
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center ${className}`}
      {...props}
    >
      {isLoading ? (
        <TbLoader3 className="w-[3vh] h-[3vh] animate-spin mx-auto" />
      ) : (
        label
      )}
    </motion.button>
  );
};
