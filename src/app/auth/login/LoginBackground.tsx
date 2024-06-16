import React from 'react';

export default function LoginBackground({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-cover bg-center relative"
             style={{backgroundImage: 'url(/images/login-background.svg)'}}
        >
            <div className="absolute top-2 left-5 p-2 md:top-5 md:left-10">
                <h2 className="text-2xl font-bold text-gray-800">Co-assemble</h2>
            </div>
            <div className="flex-1 flex flex-col justify-center items-start p-6 text-gray-800 md:items-center md:pl-24">
                <div className="max-w-md text-left md:text-center">
                    <h3 className="text-3xl md:text-4xl font-semibold mb-4">Hello, WELCOME!</h3>
                    <p className="text-lg md:text-xl">
                        Co-assemble is an app that will connect people all over the world.
                    </p>
                </div>
            </div>
            <div className="flex-1 flex justify-center items-center p-6">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
