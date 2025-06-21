import { motion } from "framer-motion";
import MenubarSettings from "./menubar/MenubarSettings";
import SectionSettings from "./sections/SectionSettings";
import { IoSettings } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import SettingsContainer from "./SettingsContainer";
import GeneralLayoutSettings from "./GeneralLayoutSettings";

const LayoutSettings = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  return (
    <motion.div
      className="h-screen w-[25vw] bg-white z-10 gap-0 flex flex-col items-center justify-start p-2 space-y-1"
      style={{ boxShadow: '8px 0 8px -4px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Header with vertical line */}
      <div className="flex flex-col items-center w-full my-3 ">
        <div className="flex flex-row justify-between text-[20px]  font-[500]">
          Settings
        </div>
        <div className="w-[80%] h-[1px] bg-gray-600"></div> {/* Vertical line */}
      </div>
      <SettingsContainer
        name="General"
        options={["replace"]}
        SettingsComponent={<GeneralLayoutSettings />}
        onOptionClick={(option) => console.log(`${option} clicked`)}
      />
      <SettingsContainer
        name="Menubar"
        options={["replace"]}
        SettingsComponent={<MenubarSettings />}
        onOptionClick={(option) => console.log(`${option} clicked`)}
      />
      <SettingsContainer
        name="Pages & Sections"
        options={["replace"]}
        SettingsComponent={<MenubarSettings />}
        onOptionClick={(option) => console.log(`${option} clicked`)}
      />
    </motion.div>
  );
};

export default LayoutSettings;

      {/* <MenubarSettings /> */}
      {/* <SectionSettings /> */}