import React, { useState } from "react";
import {
    LuBookLock,
    LuUser,
    LuLock,
} from "react-icons/lu";
import { MdPassword, MdDomainVerification } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import SideNav from "../components/SideNav";
import { useAuthStore } from "../store/authStore";
const SettingsPage = () => {
    const { user } = useAuthStore();
    return (
        <div className="relative">
            
            <SideNav />
            <div className="min-h-screen bg-amber-50 ml-48 flex flex-col place-content-center items-center py-8">
                <h1 className="flex mb-8 text-4xl text-primary">
                    <LuBookLock />
                    SkyVault Settings
                </h1>
                <div className="flex flex-col gap-8 w-full max-w-4xl px-4">
                   <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg relative z-10">
                        <h2 className="text-2xl mb-2 flex items-center gap-2">
                            <LuUser className="text-primary" />
                            Forgot your password?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            If you’ve forgotten your password, please click the button to receive instructions on how to reset it.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()} className="mt-6">
                            <Link to="/forgot-password" className=" text-primary">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="bg-primary text-white px-6 py-2 rounded-md border mt-6 flex items-center gap-2 relative z-20"
                                >
                                    <MdPassword />
                                      Forgot Password?
                                </motion.button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
