import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuBookLock } from "react-icons/lu";

import InputPassword from "../components/input/InputPassword";
import { validateEmail, validatePassword } from "../utils/helper";
import CloudDesign from "../components/CloudDesign";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if(!name) {
            setError("Please enter your name.")
            isValid = false;
        }
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
            <CloudDesign />
            <div className="h-screen w-screen flex flex-col place-content-center items-center">
            <h1 className="flex mb-4 text-4xl text-primary"><LuBookLock />LockPad</h1>
                <div className="grid grid-rows-[1fr_4fr] h-[30rem] w-3/12 border-2 bg-white rounded z-10">
                    <h1 className="place-content-center text-2xl pl-8 pt-8 pb-2">
                        Sign Up
                        <p className="text-xs text-gray-400">Welcome! Please enter your details.</p>
                    </h1>
                    <div className="w-full px-8 py-4">
                        <form onSubmit={handleSubmit}>
                            {/*Name*/}
                            <input
                             type="text"
                             placeholder="Name" 
                             className="input-box" 
                             value={name}
                             onChange={(em) => setName(em.target.value)} 
                            />
                            {/*Email*/}
                            <input
                             type="text"
                             placeholder="Email" 
                             className="input-box" 
                             value={email}
                             onChange={(em) => setEmail(em.target.value)} 
                            />
                            {/*Password*/}
                            <InputPassword
                             value={password}
                             onChange={(em) => setPassword(em.target.value)}
                            />
                            {/*Error*/}
                            {error && <p className="text-xs text-red-500 pb-2">{error}</p>}
                            {emailError && <p className="text-xs text-red-500 pb-2">{emailError}</p>}
                            {passwordError && <p className="text-xs text-red-500 pb-2">{passwordError}</p>}
                            <button type="submit" className="btn-primary">
                                Create Account
                            </button>

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
        </>
    )
}
export default SignUpPage;


