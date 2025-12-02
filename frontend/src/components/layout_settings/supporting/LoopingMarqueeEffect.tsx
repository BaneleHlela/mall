import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface MarqueeItemProps {
  items: ReactNode[];          // components instead of images
  from: number | string;
  to: number | string;
}

export default function MarqueeItem({ items, from, to }: MarqueeItemProps) {
  return (
    <div className="flex items-center">
      <motion.div
        initial={{ x: from }}
        animate={{ x: to }}
        transition={{ duration: 250, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {items.map((item, index) => (
          <div className="pr-20" key={index}>
            {item}
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ x: from }}
        animate={{ x: to }}
        transition={{ duration: 250, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {items.map((item, index) => (
          <div className="pr-20" key={index}>
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
