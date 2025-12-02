import { FaReact, FaNode, FaShopify, FaAndroid } from "react-icons/fa";
import LoopHorizontal from "./layout_settings/supporting/LoopingMarqueeEffect"
import MarqueeItem from "./layout_settings/supporting/LoopingMarqueeEffect";
import LoopText from "./layout_settings/supporting/LoopingMarqueeEffect"
import DoctorAbout from "./store_layout/sections/about/doctor_about/DoctorAbout"


const Scibbler = () => {
  const items = [
    <FaReact size={120} />,
    <FaNode size={120} />,
    <FaShopify size={120} />,
    <FaAndroid size={120} />,
  ];

  return (
    <div className="container mx-auto overflow-hidden select-none">
      <MarqueeItem items={items} from={0} to={"-100%"} />
    </div>
  );
}

export default Scibbler