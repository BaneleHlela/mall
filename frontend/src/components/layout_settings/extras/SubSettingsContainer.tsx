import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

interface SubSettingsContainerProps {
  name: string;
  SettingsComponent: React.ReactNode;
}

const SubSettingsContainer: React.FC<SubSettingsContainerProps> = ({
  name,
  SettingsComponent,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="w-full h-[45px]">
        {/* Header */}
        <div
          className={`flex flex-row justify-between w-full h-full border border-black text-black shadow-md pl-2 bg-stone-50
          ${isSettingsOpen ? "rounded-t-sm" : "rounded-sm"}`}
        >
          <div className="flex flex-col justify-center text-[18px]">
            {name}
          </div>

          {/* Arrow icon */}
          <motion.div
            className="flex flex-col justify-center cursor-pointer px-2"
            onClick={() => setIsSettingsOpen((prev) => !prev)}
            animate={{ rotate: isSettingsOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowDown className="text-[150%]" />
          </motion.div>
        </div>
      </div>

      {/* Sliding Settings Component */}
      <motion.div
        className={`w-full border border-black rounded-b-sm shadow-md overflow-hidden -mt-1`}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isSettingsOpen ? "auto" : 0,
          opacity: isSettingsOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        {SettingsComponent}
      </motion.div>
    </>
  );
};

export default SubSettingsContainer;
