const express = require('express');
const axios = require('axios');
const app = express();
const uuid = require('uuid');
const cors = require('cors');
app.use(express.static('public'));

app.use(cors());

let users = {};
let tasks = [];

//set port
const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Define a root route to handle GET requests to '/'
app.get('/', (req, res) => {
  res.send({ msg: 'Welcome to the Startup Service!' });
});

// Define route to get all tasks
apiRouter.get('/tasks', (_req, res) => {
  res.send(tasks);
});

//motivational quote api
app.get('/api/quote', async (req, res) => {
    try {
      const response = await axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching quote:', error.message);
      res.status(500).json({ error: 'Failed to fetch quote from Forismatic API' });
    }
  });

// Define route to add a new task
apiRouter.post('/tasks', (req, res) => {
    const newTask = req.body; // Expecting task object in the request body
    if (newTask && newTask.taskName && newTask.priority && newTask.userName) {
      newTask.id = uuid.v4(); // Generate a unique ID for the task
      newTask.completed = false; // Add default properties
      tasks.push(newTask); // Store the task in the array
      res.status(201).send(newTask); // Respond with the created task
    } else {
      res.status(400).send({ error: 'Invalid task data' });
    }
  });

 // Update task status to completed
apiRouter.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
  
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask; // Update the task in the tasks array
      res.send(updatedTask); // Send back the updated task
    } else {
      res.status(404).send({ error: 'Task not found' });
    }
  });


// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
