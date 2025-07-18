import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../../components/the_mall/authentication/components/Input";
import { resetPassword } from "../../features/user/userSlice";
import { TbLoader3 } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { isLoading, error, message } = useAppSelector(
    (state) => state.user
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      if (!token) {
        toast.error("Invalid token");
        return;
      }
      await dispatch(resetPassword({ token, password }));
      toast.success("Password reset successfully, redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error resetting password");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[60vh] w-full h-full lg:h-[80%] flex flex-col justify-between backdrop-filter backdrop-blur-xl lg:rounded-[1vh] shadow-xl overflow-hidden p-[2vh]"
    >
      {/* Banner image */}
      <div className="w-full h-[20%]">
        <img
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/68726dde5987f5810dee5a8a/images/mall%20image.webp"
          alt="mall banner"
          className="w-full h-full object-cover rounded-[1vh]"
        />
      </div>

      <div>
        <h2 className="text-[3vh] font-semibold">Reset Password</h2>
        <p className="text-[2.2vh]">
          Enter your new password below. Make sure it’s strong!
        </p>
      </div>

      {error && (
        <p className="text-red-500 text-[2vh] font-medium mb-[1vh]">{error}</p>
      )}
      {message && (
        <p className="text-green-500 text-[2vh] font-medium mb-[1vh]">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="text-[2.3vh]">New Password</label>
        <Input
          icon={Lock}
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="text-[2.3vh]">Confirm Password</label>
        <Input
          icon={Lock}
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-[1.5vh] py-[1.3vh] bg-gray-800 text-white font-bold rounded-[.5vh] shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <TbLoader3 className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            "Set New Password"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ResetPasswordPage;
