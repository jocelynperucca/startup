import React from 'react';
import './addTask.css';

export function AddTask({ userName }) {
  return (
    <main>
      <h2>Add Task</h2>
      <div>Task User:</div>
      <p>{userName}</p>
      <br />{/* Displaying the username */}
      
      <form>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input type="text" id="taskName" placeholder="Enter task name" />
        </div>
        <div>
          <label htmlFor="taskPriority">Priority:</label>
          <select id="taskPriority">
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
