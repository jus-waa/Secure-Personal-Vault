import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuBookLock } from "react-icons/lu";

import InputPassword from "../components/input/InputPassword";
import { validateEmail, validatePassword } from "../utils/helper";
import CloudDesign from "../components/CloudDesign2";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        {/*Checking email validity*/}
        if(!validateEmail(email)) {
            setEmailError("Please enter a a valid email.");
            isValid = false;
        } else {
            setEmailError(null);
        }
        {/*Checking password validity*/}
        if(!validatePassword(password)) {
            setPasswordError("Please enter a valid password.");
            isValid = false;
        } else {
            setPasswordError(null);
        }

        if (!isValid) return;
    };
    
    return(
        <>
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
                            {/*Error*/}
                            {emailError && <p className="text-xs text-red-500 pb-2">{emailError}</p>}
                            {passwordError && <p className="text-xs text-red-500 pb-2">{passwordError}</p>}

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


