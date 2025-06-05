import { motion } from "framer-motion"
import MenubarSettings from "./menubar/MenubarSettings";
import SectionSettings from "./sections/SectionSettings";

const LayoutSettings= () => {
  return (
    <motion.div 
      className="ml-5 h-screen w-[25vw] bg-orange-300"
    >
      {/* <MenubarSettings /> */}
      <SectionSettings />
    </motion.div>
  )
}

export default LayoutSettings;