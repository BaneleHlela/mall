import { FaFacebook, FaGoogle } from "react-icons/fa";
import { API_URL } from "../../../../features/context";

const BACKEND_URL = API_URL; // Or hardcode your backend URL

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
        onClick={() => {}}
        className="py-[1vh] w-[40%] text-gray-400 rounded flex flex-row gap-[1vh] justify-center items-center bg-gray-200"
      >
        <FaFacebook className="text-gray-300 text-[3.3vh]"/> 
        <div className="">facebook</div>
      </button>
    </div>
  );
};

export default SocialLoginButtons;
