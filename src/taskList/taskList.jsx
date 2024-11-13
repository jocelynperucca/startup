import React, { useState, useEffect } from 'react';
import './taskList.css';

export function TaskList({ userName, markAsDone }) {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/api/tasks')  // Ensure the correct backend URL
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <main>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task.taskName} (Priority: {task.priority})</span>
              {!task.completed && (
                <button onClick={() => markAsDone(index)}>Mark as Done</button>
              )}
              {task.completed && <span>Completed by {task.completedBy}</span>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
