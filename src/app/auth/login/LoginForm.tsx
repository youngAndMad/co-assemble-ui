import React from 'react';
import {useRouter} from "next/navigation";

export default function LoginForm() {

    const router = useRouter();

    const handleLoginWithGitHub = () => router.push("/oauth2/authorization/github") // todo move to env

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 style={{marginBottom: '20px'}}>Sign in to Co-assemble</h2>
            <form style={{width: '300px', display: 'flex', flexDirection: 'column'}}>
                <label style={{marginBottom: '10px'}}>
                    E-mail
                    <input type="email" style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}/>
                </label>
                <label style={{marginBottom: '10px'}}>
                    Password
                    <input type="password" style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}/>
                </label>
                <a href="#" style={{marginBottom: '20px', color: '#0066cc'}}>Forgot password?</a>
                <button type="submit" style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#333',
                    color: '#fff',
                    cursor: 'pointer'
                }}>
                    SIGN IN
                </button>
                <p style={{marginTop: '20px'}}>or</p>
                <button style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#fff',
                    cursor: 'pointer'
                }} onClick={handleLoginWithGitHub}>
                    Sign in with GitHub
                </button>
            </form>
            <p style={{marginTop: '20px'}}>New here? <a href="#" style={{color: '#0066cc'}}>Sign Up!</a></p>
        </div>
    );
}