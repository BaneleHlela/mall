import { motion } from "framer-motion";
import { useState, type FC } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
// Add more if needed
import { getBackgroundStyles } from "../../../../utils/stylingFunctions";
import StoreButton from "../buttons/StoreButton";
import UnderlinedText from "../text/UnderlinedText";
import { useAppSelector } from "../../../../app/hooks";
import { getSetting } from "../../../../utils/helperFunctions";

interface StoreAlertDivProps {
  config: any;
  objectPath: string;
}

const StoreAlertDiv: FC<StoreAlertDivProps> = ({ config, objectPath }) => {
  const { animation, background, items, loopDirection = "right", loopSpeed = 30 } = config;
  const settings = useAppSelector(state => state.layoutSettings);
  const [animateKey, setAnimateKey] = useState(0);

  const loopVariants = {
    animate: {
      x: loopDirection === "right" ? ["-100%", "100%"] : ["0", "-100%"],
      transition: {
        x: {
          repeat: 0,
          duration: loopSpeed,
          ease: "linear",
        },
      },
    },
  };
  
  
  const flashVariants = {
    flash: {
      opacity: [1, 0, 1],
      transition: {
        repeat: Infinity,
        duration: 1, // 1 second for full flash cycle
        ease: "easeInOut",
      },
    },
  };
  const iconLibraries: Record<string, Record<string, React.ComponentType<any>>> = {
    Md: MdIcons,
    Fa: FaIcons,
    Bi: BiIcons,
    Ai: AiIcons,
    Bs: BsIcons,
    // extend as needed
  };


  const renderItem = (key: string) => {
    if (key.startsWith("icon")) {
        const iconName = (items as any)[key]?.name; // e.g. "FaBeer" or "MdHome"
      
        if (!iconName) return null;
      
        const prefix = iconName.slice(0, 2); // "Fa", "Md", etc.
        const iconPack = iconLibraries[prefix];
      
        const IconComponent = iconPack?.[iconName] ?? null;
      
        return IconComponent ? (
          <div key={key}>
            <IconComponent
              className="w-6 h-6"
              style={{
                width: getSetting(`${key}.size`, settings, `${objectPath}.items`),
                height: getSetting(`${key}.size`, settings, `${objectPath}.items`),
                color: config.items[key]?.color || "black",
              }}
            />
          </div>
        ) : null;
    }
      

    if (key.startsWith("text")) {
      return (
        <div className="min-w-fit text-center" key={key}>
          <UnderlinedText style={getSetting(`${key}`, settings, `${objectPath}.items`)} />
        </div>
      );
    }

    if (key.startsWith("button")) {
      return (
        <div className="w-fit" key={key}>
          <StoreButton
            style={getSetting(`${key}`, settings, `${objectPath}.items`)}
            onClick={() => {}}
          />
        </div>
      );
    }

    return null;
  };

  const handleAnimationComplete = () => {
    setAnimateKey(prev => prev + 1);
  };
  // Render full content block once
  const content = (
    <div
      className="flex flex-row items-center m-10"
      style={{ gap: config.items.gap.item }}
    >
      {config.items.order.map((key: string) => renderItem(key))}
    </div>
  );

  return (
    <div
      style={{
        ...getBackgroundStyles(background),
      }}
      className="overflow-hidden flex flex-row w-full"
    >
      {animation === "loop" ? (
        <motion.div
          key={animateKey}
          className="flex flex-row items-center w-full"
          variants={loopVariants}
          animate="animate"
          onAnimationComplete={handleAnimationComplete}
          style={{ gap: config.items.gap.allItems }}
        >
            {content}
                <div style={{ width: config.items.gap }} /> 
            {content}
                <div style={{ width: config.items.gap }} />
            {content}
                <div style={{ width: config.items.gap }} /> 
            {content}
                <div style={{ width: config.items.gap }} /> 
            {content}
                <div style={{ width: config.items.gap }} /> 
            {content}
                <div style={{ width: config.items.gap }} />
            {content}
                <div style={{ width: config.items.gap }} /> 
            {content}
                <div style={{ width: config.items.gap }} /> 
        </motion.div>
      ) : animation === "flash" ? (
        <motion.div
          className="flex flex-row items-center w-full justify-center"
          variants={flashVariants}
          animate="flash"
          style={{ gap: config.items.gap.item }}
        >
          {config.items.order.map((key: string) => renderItem(key))}
        </motion.div>
      ) : (
        <div className="w-full flex flex-row justify-center items-center" style={{ gap: config.items.gap.item }}>
          {config.items.order.map((key: string) => renderItem(key))}
        </div>
      )}
    </div>
  );
};

export default StoreAlertDiv;
