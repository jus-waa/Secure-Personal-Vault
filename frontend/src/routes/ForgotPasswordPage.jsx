import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import CloudDesign from "../components/CloudDesign";
import Input from "../components/Input";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};

	return (
		<>
			<CloudDesign />
			<div className="flex items-center justify-center min-h-screen px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="max-w-md w-full rounded-2xl shadow-xl bg-white border-2 overflow-hidden p-6"
				>
					<div className="p-2">
						<h2 className="text-3xl font-bold mb-6 text-center text-primary">
							Forgot Password
						</h2>

						{!isSubmitted ? (
							<form onSubmit={handleSubmit} className="space-y-6">
								<p className="text-center text-gray-500">
									Enter the email address associated with your account, and we will send you instructions to reset your password.
								</p>
								<Input
									icon={Mail}
									type="email"
									placeholder="Email Address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="w-full py-3 px-4 bg-sky-500 text-white font-bold rounded-lg shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
									type="submit"
								>
									{isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
								</motion.button>
							</form>
						) : (
							<div className="text-center">
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 500, damping: 30 }}
									className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4"
								>
									<Mail className="h-8 w-8 text-white" />
								</motion.div>
								<p className="text-gray-500 mb-6">
									If an account exists for <span className="font-semibold">{email}</span>, you will receive a password reset link shortly.
								</p>
							</div>
						)}
					</div>

					<div className="pt-4 mt-6 border-t flex justify-center">
						<Link to={"/login"} className="text-sm text-sky-500 hover:underline flex items-center">
							<ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
						</Link>
					</div>
				</motion.div>
			</div>
		</>
	);
};

export default ForgotPasswordPage;
