import { type FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: FC<{ className?: string }>;
}

const Input: FC<InputProps> = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-[1vh] text-[2.2vh]">
      <div className="absolute inset-y-0 left-0 flex items-center pl-[1vh] pointer-events-none">
        <Icon className="size-[2.8vh] text-black" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-[2vh] py-[1vh] bg-[#ffffff] rounded-[.5vh] border-[.15vh] border-gray-800 focus:bg-[#ffffff30] focus:outline-none focus:border-[.3vh] focus:ring-0 placeholder-gray-400 transition duration-200"
      />
    </div>
  );
};

export default Input;
