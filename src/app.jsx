import React, { useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './login/login';
import { AddTask } from './addTask/addTask';
import { TaskList } from './taskList/taskList';
import { Motivation } from './motivation/motivation';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [authState, setAuthState] = useState(userName ? AuthState.Authenticated : AuthState.Unauthenticated);
  const [tasks, setTasks] = useState([]);  // Initialize tasks as an empty array
  const [completedTasks, setCompletedTasks] = useState([]);  // Initialize completed tasks as an empty array

  const onAuthChange = (loginUserName, newAuthState) => {
    setUserName(loginUserName);
    setAuthState(newAuthState);
    if (newAuthState === AuthState.Authenticated) {
      localStorage.setItem('userName', loginUserName);
    } else {
      localStorage.removeItem('userName');
      setTasks([]);  // Clear tasks on logout
    }
  };

  // Fetch tasks on startup if authenticated
  useEffect(() => {
    if (authState === AuthState.Authenticated) {
      fetch('http://localhost:3000/api/tasks')
        .then(response => response.json())
        .then(data => setTasks(data))
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, [authState]);

  const markAsDone = (index) => {
    const task = tasks[index];
    if (task) {
      const completedTask = { ...task, completed: true, completedBy: userName };  // Add completedBy property
      setTasks(tasks.map((t, i) => (i === index ? completedTask : t)));  // Update the task to mark it done
      setCompletedTasks((prev) => [...prev, completedTask]);  // Add task to completed tasks
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
              element={authState === AuthState.Unauthenticated ? <Login onAuthChange={onAuthChange} /> : <Navigate to="/addTask" replace />}
            />
            <Route
              path='/addTask'
              element={authState === AuthState.Authenticated ? <AddTask userName={userName} setTasks={setTasks} /> : <Navigate to="/" replace />}
            />
            <Route
              path='/taskList'
              element={authState === AuthState.Authenticated ? <TaskList tasks={tasks} markAsDone={markAsDone} userName={userName} /> : <Navigate to="/" replace />}
            />
            <Route
              path='/motivation'
              element={authState === AuthState.Authenticated ? <Motivation /> : <Navigate to="/" replace />}
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
