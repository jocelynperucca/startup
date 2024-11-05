import React, { useState } from 'react';
import './addTask.css';

export function AddTask({ userName, setTasks }) {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName) {
      const newTask = { taskName, userName, priority, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskName(''); // Reset task name
      setPriority('low'); // Reset priority
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
