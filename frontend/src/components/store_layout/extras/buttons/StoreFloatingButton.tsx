import React from 'react';
import { getBackgroundStyles } from '../../../../utils/stylingFunctions';
import { FaHome, } from "react-icons/fa"
import { IoMdChatboxes } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";


const StoreFloatingButton = ({ config }: {config: any}) => {
    const handleStoreFloatingButtonClick = () => {
        console.log(config.show)
    };

    return (
        <div 
            onClick={handleStoreFloatingButtonClick}
            style={{
                ...getBackgroundStyles(config.style.background)
            }}
        >
            {config.show === "chat" && (<IoMdChatboxes size={config.style.icon.size} color={config.style.icon.color} />)}
            {config.show === "home" && (<FaHome size={config.style.icon.size} color={config.style.icon.color} />)}
            {config.show === "scroll-up" && (<MdOutlineKeyboardArrowUp size={config.style.icon.size} color={config.style.icon.color} />)}
        </div>
    )
}

export default StoreFloatingButton