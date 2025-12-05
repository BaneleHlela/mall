import { type FC, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: FC<{ className?: string }>;
}

const Input: FC<InputProps> = ({ icon: Icon, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = props.type === 'password';

  return (
    <div className="relative mb-[1vh] text-[2.2vh] overflow-hidden">
      <div className="absolute inset-y-0 left-0 flex items-center pl-[1vh] pointer-events-none">
        <Icon className="size-[2.8vh] text-black" />
      </div>
      <input
        {...props}
        type={isPassword ? (showPassword ? 'text' : 'password') : props.type}
        className="w-full pl-[4.5vh] pr-[2vh] py-[1vh] bg-[#ffffff] rounded-[.5vh] border-[.15vh] border-gray-800 focus:bg-[#ffffff30] focus:outline-none focus:border-[.3vh] focus:ring-0 placeholder-gray-400 transition duration-200"
      />
      {isPassword && (
        <div className="absolute inset-y-0 right-2 flex items-center pl-[1vh] cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
          <IoEyeSharp className={`size-[2.8vh] text-black ${showPassword ? 'opacity-100' : 'opacity-20'}`}/>
        </div>
      )}
    </div>
  );
};

export default Input;
