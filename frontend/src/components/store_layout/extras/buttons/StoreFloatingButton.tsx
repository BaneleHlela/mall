import React from 'react';
import { getBackgroundStyles } from '../../../../utils/stylingFunctions';
import { FaHome, } from "react-icons/fa"
import { IoMdChatboxes } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";


const StoreFloatingButton = ({
    config,
    onClick,
  }: {
    config: any;
    onClick?: () => void;
  }) => {
    return (
      <div
        onClick={onClick}
        style={{
          ...getBackgroundStyles(config.style.background),
          cursor: "pointer",
        }}
      >
        {config.show === "chat" && (
          <IoMdChatboxes size={config.style.icon.size} color={config.style.icon.color} />
        )}
        {config.show === "home" && (
          <FaHome size={config.style.icon.size} color={config.style.icon.color} />
        )}
        {config.show === "scroll-up" && (
          <MdOutlineKeyboardArrowUp size={config.style.icon.size} color={config.style.icon.color} />
        )}
      </div>
    );
};
  
export default StoreFloatingButton