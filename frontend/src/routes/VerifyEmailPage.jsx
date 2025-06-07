import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import CloudDesign from "../components/CloudDesign";

const VerifyEmailPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { error, email, isLoading, isResending, verifyEmail, resendVerification } = useAuthStore();
    const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const verificationCode = code.join("");
		try {
			await verifyEmail(verificationCode);
			navigate("/");
			toast.success("Email verified successfully");
		} catch (error) {
			toast.error("Invalid Code");
			console.log(error);
		}
	};

    const handleResend = async (e) => {
		e.preventDefault();
        if (!email) {
          toast.error("Email not found, please sign up again.");
          return;
        }
		try {
			await resendVerification(email);
			toast.success("Verification Code resent.");
		} catch (error) {
			console.log(error);
		}
	};

	// Auto submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);

    return (
    <>
      <CloudDesign />
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md w-full rounded-2xl shadow-xl bg-white border-2 overflow-hidden p-6">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl mb-6 text-center text-primary">
                      Verify Your Email
                    </h2>
                    <p className="text-center text-gray-400 mb-6">
                      Enter the 6-digit code sent to your email address: <span className="font-semibold">{email}</span>
                    </p>
        
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-between">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-2xl font-bold bg-white text-sky-500 border-2 rounded-lg focus:border-sky-500 focus:outline-none"
                                />
                            ))}
                        </div>
                        <div className="grid grid-cols-[1.5fr_1fr] space-x-4 ">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={isLoading || code.some((digit) => !digit)}
                                className="bg-sky-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                            >
                                {isLoading ? "Verifying..." : "Verify Email"}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={handleResend}
                                
                                className="bg-white text-sky-500 font-bold py-3 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer border border-transparent hover:border-sky-500 duration-300"
                            >
                                {isResending ? "Resending..." : "Resend Code"}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    </>
);

}
export default VerifyEmailPage;