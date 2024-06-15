import React from 'react';
import LoginBackground from "@/app/auth/login/LoginBackground";

export default function Login() {
    return (
        <div style={{position: 'relative'}}>
            <LoginBackground/>
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>

                <div className="card">
                    <h4>Sign in to Co-assemble</h4>
                    <button>SIGN IN</button>

                    <span>or</span>
                    <button>Sign in with GitHub</button>
                </div>
            </div>
        </div>
    );
}