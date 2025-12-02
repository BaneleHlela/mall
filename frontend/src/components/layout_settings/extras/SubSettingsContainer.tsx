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
      <div
        onClick={() => setIsSettingsOpen((prev) => !prev)} 
        className="w-full h-[7vh] text-[2vh]"
      >
        {/* Header */}
        <div
          className={`flex flex-row pl-[1.2vh] justify-between w-full h-full border-[.3vh] border-white text-black shadow-md
          ${isSettingsOpen ? "rounded-t-sm bg-gray-900 text-white" : "rounded-sm bg-stone-50"} hover:bg-gray-900 hover:text-white hover:border-white hover:border-[.3vh]`}
        >
          <div className="capitalize flex flex-col justify-center">
            {name}
          </div>

          {/* Arrow icon */}
          <motion.div
            className="flex flex-col justify-center cursor-pointer px-[1vh]"
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
        className={`w-full border-[.3vh] border-white space-y-[.3vh] bg-stone[.3vh]00 text-black rounded-b-sm shadow-md overflow-hidden -mt-1`}
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
