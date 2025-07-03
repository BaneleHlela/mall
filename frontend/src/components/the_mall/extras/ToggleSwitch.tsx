import { motion } from "framer-motion";

type ToggleSwitchProps = {
  isOn: boolean;
  onToggle: () => void;
};

export default function ToggleSwitch({ isOn, onToggle }: ToggleSwitchProps) {
  return (
    <button
    type="button"
      className={`ml-4 w-[50px] bg-gray-300 /bg-[#301150] rounded-full cursor-pointer flex p-[3px] ${
        isOn ? "justify-start" : "justify-end"
      }`}
      onClick={onToggle}
    >
      <motion.div
        className="w-[21px] h-[21px] bg-gray-900 /bg-[#9911ff] rounded-full"
        layout
        transition={{
          type: "spring",
          duration: 0.2,
          bounce: 0.2,
        }}
      />
    </button>
  );
}