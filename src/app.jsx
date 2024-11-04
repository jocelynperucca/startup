import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login.jsx';
import { AddTask } from './addTask/addTask';
import { TaskList } from './taskList/taskList';
import { Motivation } from './motivation/motivation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <BrowserRouter>
            <div className='body'>
                <header className='container-fluid'>
                    <nav className='navbar navbar-light'>
                        <div className='container d-flex align-items-center justify-content-between'> {/* Added justify-content-between */}
                            <a className='navbar-brand' href='#'>
                                <img className='brand-logo' src='/prioritasktransparent.png' alt='Prioritask Logo' />
                            </a>
                            <ul className='navbar-nav d-flex flex-row ms-auto'> {/* ms-auto to push to right */}
                                <li className='nav-item mx-2'>
                                    <NavLink className='nav-link' to=''>Login</NavLink>
                                </li>
                                <li className='nav-item mx-2'>
                                    <NavLink className='nav-link' to='addTask'>AddTask</NavLink>
                                </li>
                                <li className='nav-item mx-2'>
                                    <NavLink className='nav-link' to='taskList'>TaskList</NavLink>
                                </li>
                                <li className='nav-item mx-2'>
                                    <NavLink className='nav-link' to='motivation'>Motivation</NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/addTask' element={<AddTask />} />
                    <Route path='/taskList' element={<TaskList />} />
                    <Route path='/motivation' element={<Motivation />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <div className='container text-center py-3'>
                        <span>Jocelyn Perucca </span>
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
