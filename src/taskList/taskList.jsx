import React from 'react';
import './taskList.css';

export function TaskList({ tasks, completedTasks, markAsDone, userName }) {
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
          {tasks.length > 0 ? (
            tasks.map((task, index) => {
              if (!task.completed) {
                return (
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
              } else {
                return null; // Skip completed tasks
              }
            })
          ) : (
            <tr>
              <td colSpan="4">No tasks available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <hr className="tabledivide" />
      <h2>Tasks Done</h2>
      <table className="TaskList">
        <thead>
          <tr>
            <th>Task</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.length > 0 ? (
            completedTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td>{task.userName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No completed tasks.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
