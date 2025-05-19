import React from "react";
import { Link } from "react-router-dom";
import InputPassword from "../components/input/InputPassword";
const LoginPage = () => {
    function handleSubmit(e) {
        e.preventDefault();
    }
      
    return(
        <>
            <div className="h-screen w-screen flex flex-col place-content-center items-center">
            <h1 className="mb-4 text-4xl">LockPad</h1>
                <div className="grid h-2/5 w-3/12 justify-center border-2 rounded">
                    <div className="border-2 w-full">
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-2xl">Login</h1>
                            {/* input for email*/}
                            <input type="text" placeholder="Email" className="input-box" />
                            {/* input for password*/}
                            <InputPassword/>
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


