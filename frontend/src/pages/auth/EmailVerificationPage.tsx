import {
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
	type KeyboardEvent,
	type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../features/user/userSlice";
import { type AppDispatch, type RootState } from "../../app/store";

const EmailVerificationPage = () => {
	const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
	const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { error, isLoading } = useSelector((state: RootState) => state.user);

	const handleChange = (index: number, value: string) => {
		const newCode = [...code];

		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode); 
			const lastFilledIndex = newCode
				.slice()
				.reverse()
				.findIndex((digit) => digit !== "") || -1;
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex]?.focus();
		} else {
			newCode[index] = value;
			setCode(newCode);
			if (value && index < 5) {
				inputRefs.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const verificationCode = code.join("");

		try {
			await dispatch(verifyEmail(verificationCode)).unwrap();
			toast.success("Email verified successfully");
			navigate("/");
		} catch (err) {
			console.error("Verification failed", err);
			toast.error("Verification failed");
		}
	};

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const token = searchParams.get("token");
		if (token && token.length === 6 && /^[0-9]+$/.test(token)) {
			const tokenDigits = token.split("");
			setCode(tokenDigits);
		}
	}, []);

	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			const verificationCode = code.join("");
			dispatch(verifyEmail(verificationCode)).unwrap().then(() => {
				toast.success("Email verified successfully");
				navigate("/");
			}).catch((err) => {
				console.error("Verification failed", err);
				toast.error("Verification failed");
			});
		}
	}, [code, dispatch, navigate]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="max-w-[60vh] w-full h-full lg:h-[80%] flex flex-col justify-evenly backdrop-filter backdrop-blur-xl lg:rounded-[1vh] shadow-xl overflow-hidden p-[2vh]"
		>
			{/* Banner */}
			<div className="w-full h-[20%]">
				<img
					src="https://storage.googleapis.com/the-mall-uploads-giza/stores/68726dde5987f5810dee5a8a/images/mall%20image.webp"
					alt="mall banner"
					className="w-full h-full object-cover rounded-[1vh]"
				/>
			</div>
			
			{/* Title + Info */}
			<div className="text-center">
				<h2 className="text-[3vh] font-semibold">Verify Your Email</h2>
				<p className="text-[2.2vh] text-gray-300">
					Enter the 6-digit code sent to your inbox.
				</p>
			</div>

			{/* Code Boxes */}
			<form onSubmit={handleSubmit} className="space-y-[2vh]">
				<div className="flex justify-between gap-[1vh]">
					{code.map((digit, index) => (
						<input
							key={index}
							ref={(el) => { inputRefs.current[index] = el; }}
							type="text"
							maxLength={1}
							value={digit}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								handleChange(index, e.target.value)
							}
							onKeyDown={(e) => handleKeyDown(index, e)}
							className="w-1/7 aspect-square text-center text-[3vh] font-semibold bg-gray-700 text-white border-2 border-gray-600 rounded-[1vh] focus:border-green-500 focus:outline-none"
						/>
					))}
				</div>

				{/* Error */}
				{error && (
					<p className="text-red-500 font-semibold text-[2vh]">{error}</p>
				)}

				{/* Button */}
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					type="submit"
					disabled={isLoading || code.some((digit) => !digit)}
					className="w-full bg-gray-800 text-white font-bold py-[1.3vh] px-[2vh] rounded-[.5vh] shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50"
				>
					{isLoading ? "Verifying..." : "Verify Email"}
				</motion.button>
			</form>
		</motion.div>
	);
};

export default EmailVerificationPage;
