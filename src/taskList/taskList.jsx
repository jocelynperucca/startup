import React from 'react';
import './taskList.css';

export function TaskList({ tasks }) {
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
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.taskName}</td>
              <td>{task.userName}</td>
              <td>{task.priority}</td>
              <td className="checkbox">
                <input type="checkbox" id={`markDone${index}`} name="done" value="done" />
                <label htmlFor={`markDone${index}`}></label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
