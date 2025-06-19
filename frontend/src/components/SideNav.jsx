import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiHome, FiSettings, FiUser, FiSearch, FiLogOut } from "react-icons/fi";
import { LuBookLock } from "react-icons/lu";
import { useAuthStore } from "../store/authStore";
import logo from "../assets/logo.png";

const SideNav = ({ searchQuery, setSearchQuery }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuthStore();

  const getSelectedItem = () => {
    const path = location.pathname;
    console.log("Current path:", path); 
    if (path === "/") return "Home";
    if (path === "/settings") return "Settings";
    return "Home";
  };

  const selected = getSelectedItem();

  const handleNavigation = (item, path) => {
    console.log(`Navigating to: ${item} - ${path}`); 
    navigate(path);
  };

  const handleLogout = () => {
    logout();
  }

  return (
    <>
      <nav className="h-screen fixed top-0 left-0 z-40">
        <div className={`h-full shadow-2xl bg-white flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-48' : 'w-16'}`}>
          <div className="flex flex-col items-center mt-4">                   
            <div className="relative w-full px-4">                
              <h1 className="text-xl font-bold mb-8 py-2">
                {isOpen ? (
                      <div className="flex items-center -top-2 absolute">
                      <h1 className="text-xl font-bold">SkyVault</h1>
                      <img 
                        src={logo}
                        alt="SkyVault Logo"
                        className="w-16 h-16"
                      />
                    </div>
                  ) :  <img src={logo} alt="Logo" className="absolute -top-2 -left-1 w-16 h-16" />
                
                }
              </h1>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -right-3 top-3 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:scale-110 transition-transform duration-200"
                aria-label="Toggle Sidebar"
              >
                {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
              </button>
            </div>
            
            <div className="">
              <ul className="flex flex-col space-y-3 w-full">
                {/* Search Row */}
                <li className="group relative flex items-center px-4 py-2 mx-2 rounded hover:bg-gray-200 w-auto">
                  <button
                    onClick={() => {
                      if (!isOpen) setIsOpen(true);
                    }}
                    disabled={isOpen}
                    className={`${isOpen ? 'cursor-default opacity-50' : 'hover:opacity-80'}`}
                  >
                    <FiSearch className="text-2xl" />
                  </button>
                  {isOpen && (
                    <div className="flex items-center w-full">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ml-4 bg-transparent border-b border-gray-400 focus:outline-none text-sm w-full"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="ml-2 text-gray-400 hover:text-black"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )}

                  {!isOpen && (
                    <span className="absolute left-12 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
                      Search
                    </span>
                  )}
                </li>
                
                {/* Home Row */}
                <li
                  className={`group relative flex items-center space-x-2 px-4 py-2 mx-2 rounded cursor-pointer transition-colors ${
                    selected === 'Home'
                      ? 'bg-gray-200 font-semibold text-black'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => handleNavigation('Home', '/')}
                >
                  <FiHome className="text-xl" />
                  {isOpen && <span className="ml-4">Home</span>}
                  {!isOpen && (
                    <span className="absolute left-12 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 whitespace-nowrap">
                      Home
                    </span>
                  )}
                </li>
                
                <li
                  className={`group relative flex items-center space-x-2 px-4 py-2 mx-2 rounded cursor-pointer transition-colors ${
                    selected === 'Settings'
                      ? 'bg-gray-200 font-semibold text-black'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => handleNavigation('Settings', '/settings')}
                >
                  <FiSettings className="text-xl" />
                  {isOpen && <span className="ml-4">Settings</span>}
                  {!isOpen && (
                    <span className="absolute left-12 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 whitespace-nowrap">
                      Settings
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
          

            <div className={`relative group flex flex-col px-3 py-2 mb-4 mx-2 rounded hover:bg-gray-100 transition`}>
                {/*icon, name, logout*/}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-2xl" />
                      {isOpen && <span className="text-sm font-semibold">{user.name}</span>}
                    </div>

                    {isOpen && (
                        <button
                            onClick={handleLogout}
                            className="p-1 rounded-full hover:bg-red-100 transition"
                            aria-label="Log out"
                        >
                          <FiLogOut className="text-xl text-red-500" />
                        </button>
                    )}
                </div>
                
                {/*email*/}
                {isOpen && (
                    <div className="mt-1">
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                )}
                {!isOpen && (
                    <span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 whitespace-nowrap">
                      {user.name} — {user.email}
                    </span>
                )}
            </div>
        </div>
      </nav>
    </>
  );
};

export default SideNav;
