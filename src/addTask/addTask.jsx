import React, { useState } from 'react';
import './addTask.css';

export function AddTask({ userName, addTask }) {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    addTask(taskName, priority); // Call the function passed from App
    setTaskName(''); // Clear the input field
    setPriority('low'); // Reset priority to default
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
            onChange={(e) => setTaskName(e.target.value)} // Update state on input change
          />
        </div>
        <div>
          <label htmlFor="taskPriority">Priority:</label>
          <select 
            id="taskPriority" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} // Update state on priority change
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
