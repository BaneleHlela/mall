import logo from "../../../../assets/logo.png";

const FirstLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center justify-center h-full ml-[3vw] p-2">
      <img src={logo} alt="Company Logo" className="h-full w-auto" />
    </div>
  );
};

export default FirstLogo;