import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <div className='body'>
            <header className='container-fluid'>
                <nav className='navbar navbar-light'>
                    <div className='container d-flex align-items-center'>
                        <a className='navbar-brand' href='#'>
                            <img className='brand-logo' src='/prioritasktransparent.png' alt='Prioritask Logo' />
                        </a>
                        <ul className='navbar-nav d-flex flex-row ms-auto'>
                            <li className='nav-item mx-2'>
                                <a className='nav-link' href='index.html'>Home</a>
                            </li>
                            <li className='nav-item mx-2'>
                                <a className='nav-link' href='addTask.html'>Add Task</a>
                            </li>
                            <li className='nav-item mx-2'>
                                <a className='nav-link' href='taskList.html'>Task List</a>
                            </li>
                            <li className='nav-item mx-2'>
                                <a className='nav-link' href='motivation.html'>Motivation</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className='container mt-4'>
                <h1>Login/Register</h1>
                <form>
                    <input type='text' placeholder='Your name' />
                    <input type='password' placeholder='Password' />
                    <button type='submit'>Login</button>
                    <button type='submit'>Create</button>
                </form>
            </main>

            <footer>
                <div className='container text-center py-3'>
                    <span>Jocelyn Perucca </span>
                    <a className='text-reset' href='https://github.com/jocelynperucca/startup'>GitHub</a>
                </div>
            </footer>
        </div>
    );
}
