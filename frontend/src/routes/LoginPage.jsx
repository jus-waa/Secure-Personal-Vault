import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { LuBookLock } from "react-icons/lu";
import InputPassword from "../components/input/InputPassword";
import CloudDesign from "../components/CloudDesign2";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();
    
    const handleSubmit = async (e) => {
       	e.preventDefault();
		await login(email, password);
    };
    
    return(
        <>
            <motion.div
		    	initial={{ opacity: 0, y: 20 }}
		    	animate={{ opacity: 1, y: 0 }}
		    	transition={{ duration: 0.5 }}
		    >
            <CloudDesign/>
                <div className="h-screen w-screen flex flex-col place-content-center items-center bg-amber-50">
                <h1 className="flex m-4 text-4xl text-primary place-content-center"><LuBookLock />SkyVault</h1>
                    <div className="grid grid-rows-[1fr_4fr] h-96 w-3/12 border-2 bg-white rounded-2xl z-10 shadow-lg">

                        <h1 className="place-content-center text-2xl pl-8 pt-8 pb-2">
                            Sign In
                            <p className="text-xs text-gray-400">Welcome! Please enter your details.</p>
                        </h1>
                        <div className="w-full px-8 py-4">
                            <form onSubmit={handleSubmit}>
                                {/*Email*/}
                                <input
                                 type="text"
                                 placeholder="Email" 
                                 className="input-box bg-white" 
                                 value={email}
                                 onChange={(em) => setEmail(em.target.value)
                                 } 
                                />
                                {/*Password*/}
                                <InputPassword
                                 value={password}
                                 onChange={(em) => setPassword(em.target.value)}
                                />
                               <div className="flex justify-between items-center pb-3">
                                    {/* Error or empty placeholder */}
                                    {error ? (
                                      <p className="text-xs text-red-500">{error}</p>
                                    ) : (
                                      <div style={{ visibility: 'hidden' }}>placeholder</div>
                                    )}

                                    {/* Forgot Password */}
                                    <div className="text-sm text-end">
                                        <Link to="/signUp" className="font-semibold text-primary">
                                          Forgot Password?
                                        </Link>
                                    </div>
                                </div>


                                <button type="submit" className="btn-primary">
                                    Login
                                </button>
                                <div className="text-sm text-center mt-4">
                                    Don't have an Account?{" "}
                                    <Link to="/signUp" className="font-semibold text-primary underline">
                                        Sign up
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
export default LoginPage;


