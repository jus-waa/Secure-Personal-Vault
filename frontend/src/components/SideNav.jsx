import React from "react";
const SideNav = () => {
  return (
    <>  
      <nav className="h-screen w-screen fixed top-0 left-0 z-50 grid grid-cols-[1fr_5fr]">
        <div className="grid grid-rows-[1fr_4fr] place-items-center shadow-2xl bg-white">
          <h1 className="text-3xl border-2 border-red-500">SecretVault</h1>
          <div className="border-2 border-green-500">
            <ul className="flex flex-col space-y-8">
              <li>Home</li>
              <li>Notes</li>
              <li>Setting</li>
            </ul>
          </div>
          <div>
            <h1 className="border-2 m-12">User</h1>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SideNav;
