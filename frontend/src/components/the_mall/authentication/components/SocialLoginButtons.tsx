import { FaFacebook, FaGoogle } from "react-icons/fa";

const BACKEND_URL = "http://localhost:5000"; // Or hardcode your backend URL

const SocialLoginButtons = () => {
  const googleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  const facebookLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/facebook`;
  };

  return (
    <div className="flex gap-[.8vh] justify-evenly mt-[1vh]">
      <button
        onClick={googleLogin}
        className="py-[1vh] w-[40%] text-black rounded flex flex-row gap-[1vh] justify-center items-center bg-[#e8f0fe]"
      >
        <img
          src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
          alt="Google"
          className="w-[3.3vh] h-[3.3vh]"
        />
        <div className="">Google</div>
      </button>
      <button
        onClick={facebookLogin}
        className="py-[1vh] w-[40%] text-black rounded flex flex-row gap-[1vh] justify-center items-center bg-[#e8f0fe]"
      >
        <FaFacebook className="text-blue-600 text-[3.3vh]"/> 
        <div className="">facebook</div>
      </button>
    </div>
  );
};

export default SocialLoginButtons;
