const express = require('express');
const app = express();
const uuid = require('uuid');

let users = {};
let tasks = [];

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

// Define route to add a new task
apiRouter.post('/tasks', (req, res) => {
  const newTask = req.body; // Expecting task object in the request body
  if (newTask && newTask.taskName && newTask.priority && newTask.userName) {
    newTask.completed = false; // Add default properties
    tasks.push(newTask); // Store the task in the array
    res.status(201).send(newTask); // Respond with the created task
  } else {
    res.status(400).send({ error: 'Invalid task data' });
  }
});

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
    users[user.email] = user;

    res.send({ token: user.token });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
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
