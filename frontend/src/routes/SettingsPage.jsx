import React, { useState } from "react";
import {
  LuBookLock,
  LuUser,
  LuLock,
  LuSave,
} from "react-icons/lu";
import InputPassword from "../components/input/InputPassword";
import SideNav from "../components/SideNav";

const SettingsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="relative">
      <SideNav />
      <div className="min-h-screen bg-white ml-48 flex flex-col place-content-center items-center py-8">
        <h1 className="flex mb-8 text-4xl text-primary">
          <LuBookLock />
          SkyVault Settings
        </h1>
        <div className="flex flex-col gap-8 w-full max-w-4xl px-4">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg relative z-10">
            <h2 className="text-2xl mb-2 flex items-center gap-2">
              <LuUser className="text-primary" />
              Profile Settings
              <p className="text-xs text-gray-400 ml-2">
                Update your personal information
              </p>
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white relative z-20"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white relative z-20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white relative z-20"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors mt-6 flex items-center gap-2 relative z-20"
              >
                <LuSave />
                Update Profile
              </button>
            </form>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg relative z-10">
            <h2 className="text-2xl mb-2 flex items-center gap-2">
              <LuLock className="text-primary" />
              Change Password
              <p className="text-xs text-gray-400 ml-2">
                Update your account password
              </p>
            </h2>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6">
              <div className="grid grid-cols-1 gap-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <InputPassword
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full relative z-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <InputPassword
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full relative z-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <InputPassword
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full relative z-20"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors mt-6 flex items-center gap-2 relative z-20"
              >
                <LuLock />
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
