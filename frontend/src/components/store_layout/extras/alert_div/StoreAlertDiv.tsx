import { motion } from "framer-motion";
import { useState, type FC } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
// Add more if needed
import { getBackgroundStyles, getTextStyles } from "../../../../utils/stylingFunctions";
import StoreButton from "../buttons/StoreButton";
import LoopingMarqueeEffect from "../../../layout_settings/supporting/LoopingMarqueeEffect";
import StoreLayoutButton from "../../shared_layout_components/StoreLayoutButton";
import { useStoreButtonClickHandler } from "../buttons/useStoreButtonClickHandler";

interface StoreAlertDivProps {
  config: any;
}

const StoreAlertDiv: FC<StoreAlertDivProps> = ({ config }) => {
  const { background, items, loopDirection = "right"} = config;
  const handleButtonClick = useStoreButtonClickHandler();

  const iconLibraries: Record<string, Record<string, React.ComponentType<any>>> = {
    Md: MdIcons,
    Fa: FaIcons,
    Bi: BiIcons,
    Ai: AiIcons,
    Bs: BsIcons,
    // extend as needed
  };


  const renderIcon = () => {
    const iconName = items.icon?.name;
    if (!iconName) return null;

    const prefix = iconName.slice(0, 2);
    const iconPack = iconLibraries[prefix];
    const IconComponent = iconPack?.[iconName] ?? null;

    return IconComponent ? (
      <div>
        <IconComponent
          style={{
            ...getTextStyles(items.icon),
          }}
        />
      </div>
    ) : null;
  };

  const renderText = () => (
    <div className="min-w-fit text-center">
      <p
        style={{
          ...getTextStyles(items.text),
        }}
      >
        {items.text.input}
      </p>
    </div>
  );

  const renderButton = () => (
    <div className="w-fit">
      <StoreLayoutButton
        style={items.button}
        onClick={() => handleButtonClick}
      />
    </div>
  );
  const content = (
    <div className="flex flex-row items-center gap-20">
      {items.icon.show && renderIcon()}
      {renderText()}
      {items.button.show && renderButton()}
    </div>
  );

  return (
    <div
      style={{
        ...getBackgroundStyles(background),
      }}
      className="flex flex-row w-full overflow-hidden"
    >
      <LoopingMarqueeEffect
        items={[content, content, content, content, content, content, content, content, content, content, content, content,  ]}
        from={loopDirection === "right" ? "-100%" : "0%"}
        to={loopDirection === "right" ? "100%" : "-100%"}
      />
    </div>
  );
};

export default StoreAlertDiv;
