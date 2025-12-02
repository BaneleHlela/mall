import React from 'react';
import { IoMdClose } from 'react-icons/io';
import StoreLayoutButton from '../shared_layout_components/StoreLayoutButton';
import { getBackgroundStyles, getTextStyles } from '../../../utils/stylingFunctions';
import { useStoreButtonClickHandler } from './buttons/useStoreButtonClickHandler';
import { mockLayout } from '../../../major_updates/mockLayout';

interface StoreWelcomeDivProps {
    store: any;
    onClose: () => void;
}

const StoreWelcomeDiv: React.FC<StoreWelcomeDivProps> = ({  store, onClose }) => {
    const handleButtonClick = useStoreButtonClickHandler();
    const config = mockLayout.welcomeDiv;

    const isMobile = window.innerWidth < 768;


    return (
        <div
            className="fixed bottom-0 z-50 w-fit h-fit flex items-center justify-center bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="relative flex flex-col justify-evenly items-center p-4"
                style={{
                    maxHeight: "50vh",
                    ...getBackgroundStyles(config.background),
                    border: "0px",
                    borderBottom: `${config.background.border.width} ${config.background.border.style} ${config.background.border.color}`,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2"
                    style={{ color: config.closeIcon.color }}
                >
                    <IoMdClose size={24} />
                </button>

                {/* Logo */}
                {config.logo.show && (
                    <img
                        src={store?.logo || config.logo.imageUrl}
                        alt="Store Logo"
                        style={{
                            width: isMobile ? config.logo.size.mobile : config.logo.size.desktop,
                            height: isMobile ? config.logo.size.mobile : config.logo.size.desktop,
                            objectFit: 'contain',
                        }}
                    />
                )}

                {/* Welcome Text */}
                <p
                    style={getTextStyles(config.text)}
                    className="text-center"
                >
                    {config.text.input}
                </p>

                {/* Button */}
                {config.button.show && (
                    <StoreLayoutButton
                        style={config.button}
                        onClick={() => handleButtonClick(config.button)}
                    />
                )}
            </div>
        </div>
    );
};

export default StoreWelcomeDiv;