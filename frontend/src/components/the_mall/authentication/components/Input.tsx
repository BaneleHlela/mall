import { type FC } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: FC<{ className?: string }>;
}

const Input: FC<InputProps> = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-black" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-stone-50 rounded-md border border-gray-600 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 text-black placeholder-gray-400 transition duration-200"
      />
    </div>
  );
};

export default Input;
