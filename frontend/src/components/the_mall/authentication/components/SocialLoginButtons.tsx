
const BACKEND_URL = "http://localhost:5000"; // Or hardcode your backend URL

const SocialLoginButtons = () => {
  const googleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  const facebookLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/facebook`;
  };

  return (
    <div className="flex gap-4 justify-center mt-4">
      <button
        onClick={googleLogin}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Continue with Google
      </button>
      <button
        onClick={facebookLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Continue with Facebook
      </button>
    </div>
  );
};

export default SocialLoginButtons;
