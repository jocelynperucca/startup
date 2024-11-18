const express = require('express');
const axios = require('axios');
const app = express();
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const cors = require('cors');
const db = require('./database'); // Import the database module
app.use(express.static('public'));

// Use the CORS middleware with the updated options
app.use(cors());

const authCookieName = 'token';


const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Define a root route to handle GET requests to '/'
app.get('/', (req, res) => {
  res.send({ msg: 'Welcome to the Startup Service!' });
});

// Define route to get all tasks (fetch from the database)
apiRouter.get('/tasks', async (req, res) => {
  try {
    const tasks = await db.getAllTasks();  // Fetch tasks from the database
    res.send(tasks);  // Respond with the tasks
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
});

// Motivational quote API
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
apiRouter.post('/tasks', async (req, res) => {
  const newTask = req.body; // Expecting task object in the request body
  if (newTask && newTask.taskName && newTask.priority && newTask.userName) {
    newTask.id = uuid.v4(); // Generate a unique ID for the task
    newTask.completed = false; // Set default 'completed' to false

    try {
      // Insert task into the database
      const insertedTask = await db.addTask(newTask);
      res.status(201).send(insertedTask);  // Send back the created task
    } catch (err) {
      console.error('Error adding task:', err.message);
      res.status(500).send({ error: 'Failed to add task' });
    }
  } else {
    res.status(400).send({ error: 'Invalid task data' });
  }
});

// Define route to update task status (fetch from the database)
apiRouter.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  try {
    // Update the task in the database
    const task = await db.updateTask(taskId, updatedTask);
    if (task) {
      res.send(task);  // Send back the updated task
    } else {
      res.status(404).send({ error: 'Task not found' });
    }
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).send({ error: 'Failed to update task' });
  }
});

// DeleteAuth logout a user (to be handled by db)
apiRouter.delete('/auth/logout', (req, res) => {
  // For now, we'll just return a 204 status since no DB operations for logout here
  res.status(204).end();
});


// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await db.getUser(req.body.userName)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await db.createUser(req.body.userName, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await db.getUser(req.body.userName);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

// secureApiRouter.use(async (req, res, next) => {
//   const authToken = req.cookies[authCookieName];
//   const user = await db.getUserByToken(authToken);
//   if (user) {
//     next();
//   } else {
//     res.status(401).send({ msg: 'Unauthorized' });
//   }
// });

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});