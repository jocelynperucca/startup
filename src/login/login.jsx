import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (loginUserName, password) => {
    const loginData = {
      userName: loginUserName,
      password: password,
    };

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include', // To send cookies with the request
      });

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        console.log('Login successful:', data);
        onAuthChange(loginUserName, AuthState.Authenticated);
        navigate('/addTask');  // Redirect to AddTask on successful login
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred during login. Please try again later.');
    }
  };

  const handleCreateUser = async (loginUserName, password) => {
    const userData = {
      userName: loginUserName,
      password: password,
    };

    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include', // To send cookies with the request
      });

      if (response.ok) {
        // Handle successful user creation
        const data = await response.json();
        console.log('User created:', data);
        setError('');
        handleLogin(loginUserName, password); // Automatically log in after creation
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Failed to create user. Please try again.');
      }
    } catch (err) {
      console.error('Error during user creation:', err);
      setError('An error occurred during user creation. Please try again later.');
    }
  };

  return (
    <main>
      <h1>Login/Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const loginUserName = e.target.elements.username.value;
          const password = e.target.elements.password.value;

          // Determine which button was clicked based on the name of the submitter
          const isLogin = e.nativeEvent.submitter?.name === 'login';
          const isCreate = e.nativeEvent.submitter?.name === 'create';

          if (isLogin) {
            handleLogin(loginUserName, password);
          } else if (isCreate) {
            handleCreateUser(loginUserName, password);
          }
        }}
      >
        <div>
          <input type="text" name="username" placeholder="Your name" required />
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" required />
        </div>
        <div className="button-container">
          <button type="submit" name="login">Login</button>
          <button type="submit" name="create">Create</button>
        </div>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </main>
  );
}
