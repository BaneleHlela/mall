import { motion } from "framer-motion"
import MenubarSettings from "./menubar/MenubarSettings";

const LayoutSettings= () => {
  return (
    <motion.div 
      className="h-screen w-[25vw] bg-orange-300"
    >
      <MenubarSettings />
    </motion.div>
  )
}

export default LayoutSettings;