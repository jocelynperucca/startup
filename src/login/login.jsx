import React, { useState } from 'react';
import { AuthState } from './authState';  // Ensure this exists and contains the AuthState constants
import './login.css';

export function Login({ userName, authState, onAuthChange }) {
    const [name, setName] = useState(userName);
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (name && password) {
            onAuthChange(name, AuthState.Authenticated);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (name && password) {
            onAuthChange(name, AuthState.Authenticated);
        }
    };

    return (
        <main className='login'>
            <h1>Login/Register</h1>
            <form>
                <div>
                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleLogin}>Login</button>
                <button type="submit" onClick={handleRegister}>Create</button>
            </form>
        </main>
    );
}
