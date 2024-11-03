import React from 'react';


export function Login() {
  return (
    <main>
      <h1>Login/Register</h1>
      <form method="get" action="addTask.html">
        <div>

          <input type="text" placeholder="Your name" />
        </div>
        <div>
  
          <input type="Password" placeholder="Password" />
        </div>
        <button type="submit">Login</button>
        <button type="submit">Create</button>
      </form>
    </main>
  );
}