import { motion } from "framer-motion";
import { Lock, Mail, User } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/the_mall/authentication/components/Input";
import PasswordStrengthMeter from "../../components/the_mall/authentication/components/PasswordStrengthMeter";
import { signup, clearError } from "../../features/user/userSlice";
import { TbLoader3 } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: any) => state.user);

  const isPasswordStrong = (pass: string): boolean => {
    return pass.length >= 6 && /[A-Z]/.test(pass) && /[a-z]/.test(pass) && /\d/.test(pass) && /[^A-Za-z0-9]/.test(pass);
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        signup({ email, password, firstName, lastName })
      );
      if (signup.fulfilled.match(resultAction)) {
        navigate("/verify-email");
      }
    } catch (err) {
      console.error("Sign-up failed", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[60vh] w-full h-full lg:h-[80%] flex flex-col justify-between backdrop-filter backdrop-blur-xl lg:rounded-[1vh] shadow-xl overflow-hidden p-[2vh]"
    >
      {/* Optional header image to match login page */}
      <div className="w-full h-[10%] ">
        <img
          src="https://storage.googleapis.com/the-mall-uploads-giza/stores/68726dde5987f5810dee5a8a/images/mall%20image.webp"
          alt="mall theme image"
          className="w-full h-full object-cover rounded-[1vh]"
        />
      </div>

      <div className="w-full text-center">
        <h2 className="text-[3vh] font-semibold">Create Account</h2>
        <p className="text-[2.2vh]">Start your journey with us at The Mall.</p>
      </div>

      <form onSubmit={handleSignUp}>
        <label className="text-[2.3vh]">First Name</label>
        <Input
          icon={User}
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="text-[2.3vh]">Last Name</label>
        <Input
          icon={User}
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="text-[2.3vh]">Email</label>
        <Input
          icon={Mail}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-[2.3vh]">Password</label>
        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {password && <PasswordStrengthMeter password={password} />}

        {error && <p className="text-red-500 font-semibold mt-2 text-[2vh]">{error || "Something went wrong. Did you fill all the details?"}</p>}
		<motion.button
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className="w-full mt-[1.5vh] py-[1.3vh] bg-gray-800 text-white font-bold rounded-[.5vh] shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
			type="submit"
			disabled={isLoading || !isPasswordStrong(password)}
		>
			{isLoading ? (
			<TbLoader3 className="w-6 h-6 animate-spin mx-auto" />
			) : (
			"Sign Up"
			)}
		</motion.button>
        
      </form>
		

      <div className="px-8 py-4 flex justify-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
