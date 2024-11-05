import React from 'react';
import './taskList.css';

export function TaskList({ tasks, completedTasks, markAsDone, userName }) {
  const taskRows = [];
  const completedTaskRows = [];

  // Build task rows
  for (let index = 0; index < tasks.length; index++) {
    const task = tasks[index];
    if (!task.completed) {
      taskRows.push(
        <tr key={index}>
          <td>{task.taskName}</td>
          <td>{task.userName}</td>
          <td>{task.priority}</td>
          <td className="checkbox">
            <input
              type="checkbox"
              id={`markDone${index}`}
              name="done"
              onChange={() => markAsDone(index)}
            />
            <label htmlFor={`markDone${index}`}></label>
          </td>
        </tr>
      );
    }
  }

  // Build completed task rows
  for (let index = 0; index < completedTasks.length; index++) {
    const task = completedTasks[index];
    completedTaskRows.push(
      <tr key={index}>
        <td>{task.taskName}</td>
        <td>{task.completedBy}</td> {/* Show the user who completed the task */}
      </tr>
    );
  }

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

      <h2>Completed Tasks</h2>
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
