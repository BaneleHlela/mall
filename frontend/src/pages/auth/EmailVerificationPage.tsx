import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent, type FormEvent } from "react";
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
	const { error, isLoading } = useSelector((state: RootState) => state.user)


	const handleChange = (index: number, value: string) => {
		const newCode = [...code];

		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
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
			navigate("/home");
		} catch (err) {
			console.error("Verification failed", err);
		}
	};

	// Auto-fill code from token in URL
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const token = searchParams.get("token");
		if (token && token.length === 6 && /^[0-9]+$/.test(token)) {
			const tokenDigits = token.split("");
			setCode(tokenDigits);
		}
	}, [location.search]);
	
	// Auto-submit when all code digits are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit") as unknown as FormEvent);
		}
	}, [code]);

	return (
		<div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
			>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Verify Your Email
				</h2>
				<p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='flex justify-between'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength={1}
								value={digit}
								onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
							/>
						))}
					</div>
					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit'
						disabled={isLoading || code.some((digit) => !digit)}
						className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
					>
						{isLoading ? "Verifying..." : "Verify Email"}
					</motion.button>
				</form>
			</motion.div>
		</div>
	);
};

export default EmailVerificationPage;
