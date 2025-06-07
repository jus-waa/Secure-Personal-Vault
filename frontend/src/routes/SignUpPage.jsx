import React, { useState } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { LuBookLock } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import CloudDesign from "../components/CloudDesign";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import InputPassword from "../components/input/InputPassword";

import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";
import { validateEmail, validatePassword } from "../utils/helper";
import toast from "react-hot-toast";
const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
	const { signup, error, isLoading } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
		try {
            if(!validateEmail(email)){
                return toast.error("Please enter a valid email.");
            }
            if(!validatePassword(password)){
                return toast.error("Password too weak.");
            } 
			await signup(email, password, name);
			navigate("/verify-email", { state: {email} });
		} catch (error) {
			console.log(error);
		}
    };
    
    return(
        <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
        <CloudDesign />
            <div className="h-screen w-screen flex flex-col place-content-center items-center">
            <h1 className="flex mb-4 text-4xl text-primary"><LuBookLock />SkyVault</h1>
                <div className="grid grid-rows-[1fr_4fr] h-[40rem] w-3/12 border-2 bg-white rounded z-10">
                    <h1 className="place-content-center text-2xl pl-8 pt-8 pb-2">
                        Sign Up
                        <p className="text-xs text-gray-400">Welcome! Please enter your details.</p>
                    </h1>
                    <div className="w-full px-8">
                        <form onSubmit={handleSubmit}>
                            <div className="pb-1 mb-4">
                                {/*Name*/}
                                <input
                                    type="text"
                                    placeholder="Name" 
                                    className="input-box focus:border-blue-300 duration-300 mb-4" 
                                    value={name}
                                    onChange={(em) => setName(em.target.value)} 
                                />
                                {/*Email*/}
                                <input
                                    type="text"
                                    placeholder="Email" 
                                    className="input-box focus:border-blue-300 duration-300 mb-4" 
                                    value={email}
                                    onChange={(em) => setEmail(em.target.value)} 
                                />
                                {/*Password*/}
                                <InputPassword
                                    value={password}
                                    onChange={(em) => setPassword(em.target.value)}
                                />
                            </div>
                            {/*Error*/}
                            {error && <p className="text-xs text-red-500 pb-2">{error}</p>}
					        <PasswordStrengthMeter  password={password} />
                        
                            <motion.button type="submit" className="btn-primary mt-5" disabled={isLoading}>
                                {isLoading ? <Loader className=' animate-spin mx-auto' size={20} /> : "    Create Account"}
                            </motion.button>

                            <div className="text-sm text-center my-4">
                                Already have an Account?{" "}
                                <Link to="/login" className="font-semibold text-primary underline">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
       </motion.div>
    )
}
export default SignUpPage;


