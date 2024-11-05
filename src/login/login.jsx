import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
    const navigate = useNavigate();

    const handleLogin = (loginUserName) => {
        // Simulate authentication process
        onAuthChange(loginUserName, AuthState.Authenticated);
        navigate('/addTask');  // Redirect to AddTask on successful login
    };

    return (
        <main>
            <h1>Login/Register</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const loginUserName = e.target.elements.username.value;
                    handleLogin(loginUserName);
                }}
            >
                <div>
                    <input type="text" name="username" placeholder="Your name" required />
                </div>
                <div>
                    <input type="password" placeholder="Password" required />
                </div>
                <div classname ="button-container">
                <button type="submit">Login</button>
                <button type="submit">Create</button>
                </div>
            </form>
        </main>
    );
}
