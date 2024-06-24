import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-cover bg-center relative bg-[url('/images/login-background.svg')]">
      <div className="absolute top-2 left-5 p-2 md:top-5 md:left-10">
        <h2 className="text-2xl font-bold text-gray-800">Coassemble</h2>
      </div>
      <div className="flex-1 flex flex-col md:flex-row justify-center items-start xl:p-16 md:pl-24 md:justify-start">
        <div className="flex-1 flex flex-col justify-center items-start max-w-4xl">
          <div className="font-black md:text-7xl md:flex md:items-center mb-4">
            <p className="text-xl md:text-6xl text-color-base font-thin">
              Hello,
            </p>
          </div>
          <div className="text-6xl font-semibold md:text-7xl md:flex md:items-center">
            <p className="text-xl md:text-6xl text-color-base">WELCOME!</p>
          </div>
          <div>
            <p className="text-lg md:text-xl md:mt-4 font-bold">
              Coassemble is an app that will connect people all over the world.
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center w-full md:mt-0 mt-6">
          <div
            className="bg-white shadow-lg rounded-lg pt-10 pb-10 pl-6 pr-6 max-w-md w-full md:w-auto"
            style={{ borderRadius: "28px" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
