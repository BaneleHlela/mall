import React from "react";
import {
  Cross,
  Squash,
  Twirl,
  Fade,
  Slant,
  Spiral,
  Divide,
  Turn,
  Pivot,
  Sling,
  Squeeze,
  Spin,
  Rotate,
} from "hamburger-react";
import { getBackgroundStyles } from "../../../../utils/stylingFunctions";

interface StoreHamburgerProps {
  style: {
    variation: string;
    size: number;
    color: string;
    direction: "left" | "right";
    background: {
      padding: any;
      backgroundColor: string;
      border: {
        width: string;
        style: string;
        color: string;
        radius: string;
      };
    };
    shadow?: boolean;
  };
  toggled: boolean; // State passed from parent
  toggle: React.Dispatch<React.SetStateAction<boolean>>; // Function passed from parent
}

const StoreHamburger: React.FC<StoreHamburgerProps> = ({ style, toggled, toggle }) => {
  const renderIcon = () => {
    const commonProps = {
      size: style.size,
      color: style.color,
      toggled, 
      toggle,
    };

    switch (style.variation.toLowerCase()) {
      case "cross":
        return <Cross {...commonProps} direction={style.direction} />;
      case "squash":
        return <Squash {...commonProps} />;
      case "twirl":
        return <Twirl {...commonProps} direction={style.direction} />;
      case "fade":
        return <Fade {...commonProps} direction={style.direction} />;
      case "slant":
        return <Slant {...commonProps} direction={style.direction}/>;
      case "spiral":
        return <Spiral {...commonProps} direction={style.direction}/>;
      case "divide":
        return <Divide {...commonProps} />;
      case "turn":
        return <Turn {...commonProps} direction={style.direction} />;
      case "pivot":
        return <Pivot {...commonProps} direction={style.direction} />;
      case "sling":
        return <Sling {...commonProps} direction={style.direction} />;
      case "squeeze":
        return <Squeeze {...commonProps} />;
      case "spin":
        return <Spin {...commonProps}direction={style.direction} />;
      case "rotate":
        return <Rotate {...commonProps} direction={style.direction} />;
      default:
        return <Cross {...commonProps} direction={style.direction} />;
    }
  };

  return (
    <div
      style={{
        ...getBackgroundStyles(style.background),
      }}
      className={`flex flex-col justify-center items-center z-100 relative cursor-pointer ${style.shadow ? "shadow-sm" : ""} min-h-fit min-w-fit`}
    >
      {renderIcon()}
    </div>
  );
};

export default StoreHamburger;
