import React, { useState } from 'react';

const InputPassword = ({ value, onChange, placeholder}) => {
    const [ShowPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!ShowPassword);
    };
  
    return (
    <>
        <div className='input-box'>
            <input 
            value={value}
            onChange={onChange}
            type={ShowPassword ? "text" : "password"}
            placeholder={placeholder||"Password"}
            className='w-full text-sm bg-transparent rounded outline-none'
            />
        </div>
    </>
  );
}

export default InputPassword;