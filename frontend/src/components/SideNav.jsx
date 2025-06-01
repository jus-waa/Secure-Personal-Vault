import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiHome, FiSettings, FiUser, FiSearch, FiLogOut } from "react-icons/fi";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);

const [selected, setSelected] = useState("Home");
  {/* Toggle Button      
            <button onClick={() => setIsOpen(!isOpen)} className="mb-6">
              {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
            </button>
             */}

  return (
    <>
      <nav className="h-screen w-screen fixed top-0 left-0 z-50 grid grid-cols-[auto_1fr]">
        <div className={`h-full shadow-2xl bg-white flex flex-col justify-between transition-all duration-300 ${isOpen ? 'w-48' : 'w-16'}`}>
          <div className="flex flex-col items-center mt-4">
       
            <div className="relative w-full mb-8 px-4">
                <h1 className="text-xl font-bold py-3">
                    {isOpen ? "SkytVault" : "nop"}
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
                            if (!isOpen) setIsOpen(true); // only works if currently collapsed
                            }}
                            disabled={isOpen} // disables the button when isOpen is true
                            className={`${isOpen ? 'cursor-default opacity-50' : 'hover:opacity-80'}`}
                            >
                                <FiSearch className="text-2xl" />
                        </button>

                        {isOpen && (
                            <input
                            type="text"
                            placeholder="Search..."
                            className="ml-4 bg-transparent border-b border-gray-400 focus:outline-none text-sm w-full"
                            />
                        )}

                        {!isOpen && (
                            <span className="absolute left-12 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
                            Search
                            </span>
                        )}
                    </li>


                    {/* Home Row */}
                    <li
                        className={`flex items-center space-x-2 px-4 py-2 mx-2 rounded cursor-pointer ${
                        selected === 'Home'
                            ? 'bg-gray-200 font-semibold text-black'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelected('Home')}
                    >
                        <FiHome className="text-xl" />
                        {isOpen && <span className="ml-4">Home</span>}
                        {!isOpen && (
                        <span className="absolute left-12 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
                            Home
                        </span>
                        )}
                    </li>

                    {/* Setting Row */}
                    <li
                        className={`flex items-center space-x-2 px-4 py-2 mx-2 rounded cursor-pointer ${
                        selected === 'Setting'
                            ? 'bg-gray-200 font-semibold text-black'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        onClick={() => setSelected('Setting')}
                    >
                        <FiSettings className="text-xl" />
                        {isOpen && <span className="ml-4">Setting</span>}
                        {!isOpen && (
                        <span className="absolute left-12 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
                            Setting
                        </span>
                        )}
                    </li>
                </ul>

            </div>

          </div>

          {/* Bottom Section (User) */}
        <div className={`grid items-center gap-x-2 px-3 py-2 mb-4 mx-2 rounded hover:bg-gray-100 transition
                ${isOpen ? 'grid-cols-[auto_auto_1fr_auto]' : 'grid-cols-1 justify-center'}`}
            >
            <div className="flex items-center justify-center">
                <FiUser className="text-2xl" />
            </div>

            {isOpen && (
                <div className="flex flex-col">
                <span className="text-sm font-semibold">User</span>
                <span className="text-xs text-gray-500">Email</span>
                </div>
            )}

            {isOpen && <div className="flex-1" />}

            {/* ✅ Logout only visible when sidebar is open */}
            {isOpen && (
                <button
                onClick={() => console.log("Logging out...")}
                className="p-1 rounded-full hover:bg-red-100 transition"
                aria-label="Log out"
                >
                <FiLogOut className="text-xl text-red-500" />
                </button>
            )}
        </div>

        </div>
      </nav>
    </>
  );
};

export default SideNav;
