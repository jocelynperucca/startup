import React from 'react';
import './taskList.css';

export function TaskList({ userName }) {
  return (
    <main>
        <h2>Task List</h2>
      <div>Task User:</div>
      <p>{userName}</p>
      <br />

      {/* Task List */}
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
          <tr>
            <td>Clean Dishes</td>
            <td className="name">{userName}</td>
            <td className="priorityMedium">Medium</td>
            <td className="checkbox">
              <input type="checkbox" id="markDone1" name="done" value="done" />
              <label htmlFor="markDone1"></label>
            </td>
          </tr>
          <tr>
            <td>Vacuum</td>
            <td className="name">Jerry Titus</td>
            <td className="priorityHigh">High</td>
            <td className="checkbox">
              <input type="checkbox" id="markDone2" name="done" value="done" />
              <label htmlFor="markDone2"></label>
            </td>
          </tr>
          <tr>
            <td>Lettuce</td>
            <td className="name">Cassidy Grover</td>
            <td className="priorityLow">Low</td>
            <td className="checkbox">
              <input type="checkbox" id="markDone3" name="done" value="done" />
              <label htmlFor="markDone3"></label>
            </td>
          </tr>
        </tbody>
      </table>

      <br /><br />
      <hr className="tabledivide" />

      {/* Tasks Done Table */}
      <h2>Tasks Done</h2>
      <table id="done">
        <thead>
          <tr>
            <th>Task</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clean Dishes</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{userName}</td>
          </tr>
          <tr>
            <td>Vacuum</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>Jerry Titus</td>
          </tr>
          <tr>
            <td>Lettuce</td>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>Cassidy Grover</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
