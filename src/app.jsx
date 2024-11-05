import React, { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login.jsx';
import { AddTask } from './addTask/addTask';
import { TaskList } from './taskList/taskList';
import { Motivation } from './motivation/motivation';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const [authState, setAuthState] = useState(userName ? AuthState.Authenticated : AuthState.Unauthenticated);

    const onAuthChange = (loginUserName, newAuthState) => {
        setUserName(loginUserName);
        setAuthState(newAuthState);
        if (newAuthState === AuthState.Authenticated) {
            localStorage.setItem('userName', loginUserName);
        } else {
            localStorage.removeItem('userName');
        }
    };

    return (
        <BrowserRouter>
            <div className='body'>
                <header className='container-fluid'>
                    <nav className='navbar navbar-light'>
                        <div className='container d-flex align-items-center justify-content-between'>
                            <a className='navbar-brand' href='#'>
                                <img className='brand-logo' src='/prioritasktransparent.png' alt='Prioritask Logo' />
                            </a>
                            <ul className='navbar-nav d-flex flex-row ms-auto'>
                                {authState === AuthState.Unauthenticated && (
                                    <li className='nav-item mx-2'>
                                        <NavLink className='nav-link' to='/'>Login</NavLink>
                                    </li>
                                )}
                                {authState === AuthState.Authenticated && (
                                    <>
                                        <li className='nav-item mx-2'>
                                            <NavLink className='nav-link' to='/addTask'>Add Task</NavLink>
                                        </li>
                                        <li className='nav-item mx-2'>
                                            <NavLink className='nav-link' to='/taskList'>Task List</NavLink>
                                        </li>
                                        <li className='nav-item mx-2'>
                                            <NavLink className='nav-link' to='/motivation'>Motivation</NavLink>
                                        </li>
                                        <li className='nav-item mx-2'>
                                            <button 
                                                className='nav-link btn btn-link' 
                                                onClick={() => onAuthChange('', AuthState.Unauthenticated)}>
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </nav>
                </header>

                <main className='container'>
                    {authState === AuthState.Authenticated && (
                        <div className='welcome-message'>
                            <h2>Welcome {userName}!</h2>
                        </div>
                    )}

                    <Routes>
                        <Route 
                            path='/' 
                            element={<Login userName={userName} authState={authState} onAuthChange={onAuthChange} />} 
                        />
                        <Route 
                            path='/addTask' 
                            element={authState === AuthState.Authenticated ? <AddTask /> : <Login userName={userName} authState={authState} onAuthChange={onAuthChange} />} 
                        />
                        <Route 
                            path='/taskList' 
                            element={authState === AuthState.Authenticated ? <TaskList /> : <Login userName={userName} authState={authState} onAuthChange={onAuthChange} />} 
                        />
                        <Route 
                            path='/motivation' 
                            element={authState === AuthState.Authenticated ? <Motivation /> : <Login userName={userName} authState={authState} onAuthChange={onAuthChange} />} 
                        />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </main>

                <footer>
                    <div className='container text-center py-3'>
                        <span>Jocelyn Perucca</span>
                        <div></div>
                        <a className='text-reset' href='https://github.com/jocelynperucca/startup'>GitHub</a>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
