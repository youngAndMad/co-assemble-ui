import React from 'react';

export default function LoginBackground(
    {children}: { children: React.ReactNode }
) {
    return (
        <div className="relative flex justify-center items-center" style={{
            backgroundColor: '#f9fafc',
            height: '100vh',
        }}>
            <img
                src="/images/login-background.svg"
                alt="Login background image"
                className="absolute w-full h-full object-cover top-0 left-0"
            />
            <div className="flex" style={{
                borderRadius: '10px',
                padding: '20px',
                zIndex: 1
            }}>
                <div className="left">
                    <div style={{marginRight: '50px'}}>
                        <h1 style={{fontSize: '36px', fontWeight: 'bold', color: '#333'}}>Co-assemble</h1>
                        <h3 style={{fontSize: '24px', color: '#666'}}>WELCOME!</h3>
                        <p style={{fontSize: '18px', color: '#666'}}>
                            Co-assemble is an app that will connect people all over the world.
                        </p>
                    </div>
                </div>

                <div style={{
                    boxShadow: "3px 3px 30px -4px rgba(97,78,97,1)",
                    backgroundColor: '#ffffff',
                    borderRadius: '15px',
                    padding: '40px 25px 25px 25px',
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
