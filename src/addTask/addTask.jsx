import React, { useState } from 'react';
import './addTask.css';

export function AddTask({ userName, setTasks }) {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if taskName is not empty
    if (taskName) {
      const newTask = { taskName, userName, priority, completed: false };

      // Debugging log to check the new task object
      console.log('New task being added:', newTask);

      // Send the new task to the backend API
      fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => {
          // Log the response status to check if the request is successful
          console.log('Response Status:', response.status);
          return response.json();
        })
        .then((data) => {
          console.log('Data received from server:', data);
          if (data) {
            // Add the newly created task to the frontend state
            setTasks((prevTasks) => [...prevTasks, data]);
            setTaskName(''); // Reset task name
            setPriority('low'); // Reset priority
          }
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
    }
  };

  return (
    <main>
      <h2>Add Task</h2>
      <div>Task User:</div>
      <p>{userName}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="taskPriority">Priority:</label>
          <select
            id="taskPriority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </main>
  );
}
