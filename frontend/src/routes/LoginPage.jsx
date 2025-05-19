import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputPassword from "../components/input/InputPassword";

import { LuBookLock } from "react-icons/lu";

const LoginPage = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    
    return(
        <>
            <div className="h-screen w-screen flex flex-col place-content-center items-center">
            <h1 className="flex mb-4 text-4xl"><LuBookLock />LockPad</h1>
                <div className="grid grid-rows-[1fr_4fr] h-96 w-3/12 border-2 rounded">
                    <h1 className="place-content-center text-2xl pl-8 pt-8 pb-2">
                        Sign In
                        <p className="text-xs text-gray-400">Welcome! Please enter your details.</p>
                    </h1>
                    <div className="w-full px-8 py-4">
                        <form onSubmit={handleSubmit}>
                            <input
                             type="text"
                             placeholder="Email" 
                             className="input-box" 
                             value={email}
                             onChange={(em) => setEmail(em.target.value)} 
                            />

                            <InputPassword
                             value={password}
                             onChange={(em) => setPassword(em.target.value)}
                            />

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
        </>
    )
}
export default LoginPage;


