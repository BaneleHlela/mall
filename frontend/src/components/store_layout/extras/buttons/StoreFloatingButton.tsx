import React, { use } from 'react';
import { getBackgroundStyles } from '../../../../utils/stylingFunctions';
import { FaHome, } from "react-icons/fa"
import { IoMdChatboxes } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useAppSelector } from '../../../../app/hooks';


const StoreFloatingButton = ({
    config,
    onClick,
  }: {
    config: any;
    onClick?: () => void;
  }) => {
    if (!config) return null;
    const colors = useAppSelector((state) => state.layoutSettings.colors);
    return (
      <div
        onClick={onClick}
        style={{
          ...getBackgroundStyles(config.style?.background),
          cursor: "pointer",
          color: colors[config.style?.icon?.color as keyof typeof colors],
        }}
        className='shadow-md'
      >
        {config.show === "chat" && (
          <IoMdChatboxes size={config.style?.icon?.size} color={colors[config.style?.icon?.color as keyof typeof colors]} />
        )}
        {config.show === "home" && (
          <FaHome size={config.style?.icon?.size} color={colors[config.style?.icon?.color as keyof typeof colors]} />
        )}
        {config.show === "scroll-up" && (
          <MdOutlineKeyboardArrowUp size={config.style?.icon?.size} color={colors[config.style?.icon?.color as keyof typeof colors]} />
        )}
      </div>
    );
  };
  
export default StoreFloatingButton