import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/the_mall/authentication/components/Input";
import { login, clearError } from "../../features/user/userSlice";
import { type AppDispatch, type RootState } from "../../app/store";
import SocialLoginButtons from "../../components/the_mall/authentication/components/SocialLoginButtons";
import { TbLoader3 } from "react-icons/tb";

const LoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = (location.state as any)?.from?.pathname || '/';
	console.log(from)
	

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, error } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		const resultAction = await dispatch(login({ email, password }));
	  
		if (login.fulfilled.match(resultAction)) {
		  navigate(from, { replace: true });
		}
	};
	  
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-[60vh] w-full h-screen lg:h-screen flex flex-col justify-between backdrop-filter backdrop-blur-xl lg:rounded-[1vh] shadow-xl overflow-hidden px-[2vh] py-[4vh]'
		>
			<div className="w-full h-[20%] ">
				<img 
					src="https://storage.googleapis.com/the-mall-uploads-giza/stores/68726dde5987f5810dee5a8a/images/mall%20image.webp" 
					alt="mall theme image" 
					className="w-full h-full object-cover rounded-[1vh]"
				/>
			</div>
			<div className="">
				<h2 className='text-[3vh] font-semibold'>
					Welcome Back! 
				</h2>
				<p style={{lineHeight: "1.1"}} className="text-[2.2vh]">It's a great pleasure to have you login. Remember, you're on top of the world!</p>
			</div>
			
			<div className=''>
				<form onSubmit={handleLogin}>
					<label htmlFor="email" className="text-[2.3vh]">Email </label>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e: any) => setEmail(e.target.value)}
					/>
					<label htmlFor="password" className="text-[2.3vh]">Password </label>
					<Input
						icon={Lock}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e: any) => setPassword(e.target.value)}
					/>

					<div className='flex flex-col items-end mb-[1vh]'>
						<Link to='/forgot-password' className='text-end text-[2vh] text-blue-700 hover:underline'>
							Forgot password?
						</Link>
					</div>

					{error && <p className="text-red-500 font-semibold mt-2 text-[2vh]">{error || "Something went wrong. Did you fill all the details?"}</p>}

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-[1.3vh] bg-gray-800 text-white font-bold rounded-[.5vh] shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <TbLoader3 className='w-[3vh] h-[3vh] animate-spin mx-auto' /> : "Sign in"}
					</motion.button>
				</form>
			</div>
			<div className="flex flex-col">
				<div className="w-full flex flex-row items-center justify-between text-[2.2vh]">
					<span className="h-[.15vh] w-[30%] bg-gray-600"></span>
						Or sign in with
					<span className="h-[.15vh] w-[30%] bg-gray-600"></span>
				</div>
				<SocialLoginButtons/>
			</div>
			
			<div className='px-8 py-4 flex justify-center'>
				<p className='text-sm text-gray-500'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-blue-700 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
		</motion.div>
	);
};

export default LoginPage;
