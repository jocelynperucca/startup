import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false); // Track if user is registering

    const handleLogin = async (loginUserName, password) => {
        try {
            const response = await fetch('http://localhost:3000/api/login', { // Replace with your deployed URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginUserName, password })
            });

            if (!response.ok) throw new Error('Login failed');
            const data = await response.json();

            localStorage.setItem('token', data.token);
            onAuthChange(loginUserName, AuthState.Authenticated);
            navigate('/addTask');  // Redirect to AddTask on successful login
        } catch (err) {
            setError('Invalid login credentials');
        }
    };

    const handleRegister = async (registerUserName, password) => {
        try {
            const response = await fetch('http://localhost:3000/api/register', { // Replace with your deployed URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: registerUserName, password })
            });

            if (!response.ok) {
                if (response.status === 409) {
                    setError('Username already taken');
                } else {
                    throw new Error('Registration failed');
                }
                return;
            }

            setError(null); // Clear errors on successful registration
            alert('Registration successful! You can now log in.');
            setIsRegistering(false); // Switch back to login view
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <main>
            <h1>{isRegistering ? 'Register' : 'Login'}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const userName = e.target.elements.username.value;
                    const password = e.target.elements.password.value;
                    isRegistering ? handleRegister(userName, password) : handleLogin(userName, password);
                }}
            >
                <div>
                    <input type="text" name="username" placeholder="Your name" required />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" required />
                </div>
                {error && <p className="error">{error}</p>}
                <div className="button-container">
                    <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                    <button
                        type="button"
                        onClick={() => setIsRegistering(!isRegistering)}
                    >
                        {isRegistering ? 'Go to Login' : 'Create an Account'}
                    </button>
                </div>
            </form>
        </main>
    );
}
