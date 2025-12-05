import { motion } from "framer-motion";
import { useState, useEffect, type FormEvent } from "react";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/the_mall/authentication/components/Input";
import { forgotPassword, clearError } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { TbLoader3 } from "react-icons/tb";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const error = useAppSelector((state) => state.user.error);

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.user.isLoading);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword(email)).unwrap();
      setIsSubmitted(true);
    } catch (err) {
      console.error("Forgot password error:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[60vh] w-full h-full lg:h-[80%] flex flex-col justify-evenly backdrop-filter backdrop-blur-xl lg:rounded-[1vh] shadow-xl overflow-hidden p-[2vh]"
    >
      {/* Top banner image */}
      <div className="w-full h-[20%]">
        <img
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/68726dde5987f5810dee5a8a/images/mall%20image.webp"
          alt="mall theme image"
          className="w-full h-full object-cover rounded-[1vh]"
        />
      </div>

      <div className="text-center">
        <h2 className="text-[3vh] font-semibold">Forgot Password</h2>
        <p className="text-[2.2vh]">Enter your email to receive a reset link.</p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-[2.3vh]">
            Email Address
          </label>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-red-500 font-semibold mt-2 text-[2vh]">{error || "Something went wrong. Did you fill all the details?"}</p>}
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
              "Send Reset Link"
            )}
          </motion.button>
        </form>
      ) : (
        <div className="text-center mt-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Mail className="h-8 w-8 text-white" />
          </motion.div>
          <p className="text-gray-800 text-[2vh]">
            If an account exists for <strong>{email}</strong>, you’ll receive a password reset link shortly.
          </p>
        </div>
      )}

      <div className="px-8 py-4 flex justify-center">
        <Link
          to="/login"
          className="text-sm text-blue-700 hover:underline flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
