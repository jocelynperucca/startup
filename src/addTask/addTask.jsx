import React from 'react';
import './addTask.css'

export function AddTask() {
  return (
        <main>
            <div>Task User:</div> 
            <p>Jocelyn Titus</p>

            <br />

            {/* Add task with priority */}
            <div>
                <label htmlFor="addtask">Add Task</label>
                <input type="text" placeholder="enter task" id="addtask" />
            </div>

            {/* Priority selection */}
            <h3>Priority</h3>
            <input type="radio" id="priority1" name="priority" value="High" />
            <label htmlFor="priority1"> High</label><br />
            <input type="radio" id="priority2" name="priority" value="Medium" />
            <label htmlFor="priority2"> Medium</label><br />
            <input type="radio" id="priority3" name="priority" value="Low" />
            <label htmlFor="priority3"> Low</label><br />

            <br />

            <div>
                <button>Add</button>
            </div>

            <br />
        </main>
    );
}