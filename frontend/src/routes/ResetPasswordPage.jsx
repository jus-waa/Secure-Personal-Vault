import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../components/Input";
import { Lock, ArrowLeft, Loader } from "lucide-react";
import toast from "react-hot-toast";
import CloudDesign from "../components/CloudDesign";

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			await resetPassword(token, password);
			toast.success("Password reset successfully!");
			setTimeout(() => navigate("/login"), 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
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
							Reset Password
						</h2>

						<form onSubmit={handleSubmit} className="space-y-6">
							<Input
								icon={Lock}
								type="password"
								placeholder="New Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>

							<Input
								icon={Lock}
								type="password"
								placeholder="Confirm New Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="w-full py-3 px-4 bg-sky-500 text-white font-bold rounded-lg shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
								type="submit"
								disabled={isLoading}
							>
								{isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Set New Password"}
							</motion.button>
						</form>
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

export default ResetPasswordPage;
