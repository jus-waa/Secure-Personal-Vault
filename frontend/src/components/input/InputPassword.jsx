import React, { useState } from 'react';
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa6";
const InputPassword = ({ value, onChange, placeholder}) => {
    const [ShowPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!ShowPassword);
    };
  
    return (
    <>
        <div className='flex input-box bg-white'>
            <input 
             value={value}
             onChange={onChange}
             type={ShowPassword ? "text" : "password"}
             placeholder={placeholder||"Password"}
             className='w-full text-sm outline-none bg-transparent'
            />

            {ShowPassword ? (<FaRegEye
             size={20}
             className="text-primary cursor-pointer"
             onClick={toggleShowPassword}
            />
            ) : (
            <FaRegEyeSlash
             size={20}
             className="text-primary cursor-pointer"
             onClick={toggleShowPassword}
            />
            )}
        </div>
    </>
  );
}

export default InputPassword;