import React, { useState, useEffect } from 'react';
import './taskList.css';

export function TaskList({ userName }) {
  const [tasks, setTasks] = useState([]); // Pending tasks
  const [completedTasks, setCompletedTasks] = useState([]); // Completed tasks

  // Fetch tasks from the server
  useEffect(() => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => {
        // Separate tasks into pending and completed
        setTasks(data.filter(task => !task.completed));
        setCompletedTasks(
          data
            .filter(task => task.completed)
            .sort((a, b) => new Date(b.completedDate || 0) - new Date(a.completedDate || 0)) // Sort by completedDate (default to 0 if undefined)
            .slice(0, 10) // Take only the latest 5 completed tasks
        );
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Function to mark a task as done
  const markAsDone = (task) => {
    const updatedTask = {
      ...task,
      completed: true,
      completedBy: userName,
      completedDate: new Date().toISOString(), // Add the current date/time
    };

    // Send a PUT request to update the task on the server
    fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then(response => response.json())
      .then(() => {
        // Update the local state to reflect the changes
        setTasks(tasks.filter(t => t.id !== task.id)); // Remove from pending tasks
        setCompletedTasks(prevCompleted =>
          [...prevCompleted, updatedTask]
            .sort((a, b) => new Date(b.completedDate || 0) - new Date(a.completedDate || 0)) // Sort by completedDate (default to 0 if undefined)
            .slice(0, 10) // Keep only the latest 5
        );
      })
      .catch(error => console.error('Error updating task:', error));
  };

  // Build task rows for pending tasks
  const taskRows = tasks.map((task) => (
    <tr key={task.id}>
      <td>{task.taskName}</td>
      <td>{task.userName}</td>
      <td>{task.priority}</td>
      <td className="checkbox">
        <input
          type="checkbox"
          id={`markDone${task.id}`}
          name="done"
          onChange={() => markAsDone(task)} // Mark the task as done
        />
        <label htmlFor={`markDone${task.id}`}></label>
      </td>
    </tr>
  ));

  // Build task rows for completed tasks
  const completedTaskRows = completedTasks.map((task) => (
    <tr key={task.id}>
      <td>{task.taskName}</td>
      <td>{task.completedBy}</td> {/* Show the user who completed the task */}
    </tr>
  ));

  return (
    <main>
      <h2>Task List</h2>
      <table className="TaskList">
        <thead>
          <tr>
            <th>Task</th>
            <th>Name</th>
            <th>Priority</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {taskRows.length > 0 ? taskRows : (
            <tr>
              <td colSpan="4">No tasks available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Completed Tasks (Latest 10)</h2>
      <table className="CompletedTasks">
        <thead>
          <tr>
            <th>Task</th>
            <th>Completed By</th>
          </tr>
        </thead>
        <tbody>
          {completedTaskRows.length > 0 ? completedTaskRows : (
            <tr>
              <td colSpan="2">No completed tasks.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
