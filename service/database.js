const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });const db = client.db('prioritask');
const userCollection = db.collection('user');
const taskCollection = db.collection('tasks');



// Test the database connection
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// Fetch all tasks
async function getAllTasks() {
  try {
    const cursor = taskCollection.find({});  // Empty filter to get all tasks
    return await cursor.toArray();  // Convert cursor to an array of tasks
  } catch (err) {
    console.error('Error fetching tasks from database:', err.message);
    throw new Error('Unable to fetch tasks');
  }
}

// Add a new task
async function addTask(task) {
  try {
    const result = await taskCollection.insertOne(task);
    // Retrieve the task by its inserted ID
    const insertedTask = await taskCollection.findOne({ _id: result.insertedId });
    return insertedTask;  // Return the inserted task
  } catch (err) {
    console.error('Error adding task to database:', err.message);
    throw new Error('Unable to add task');
  }
}

// Update a task by ID
async function updateTask(taskId, updatedTask) {
  try {
    // Remove the _id from updatedTask to avoid modifying the immutable field
    const { _id, ...taskUpdate } = updatedTask;

    const result = await taskCollection.updateOne(
      { id: taskId }, 
      { $set: taskUpdate }
    );

    if (result.matchedCount > 0) {
      // Fetch and return the updated task
      const updated = await taskCollection.findOne({ id: taskId });
      return updated;
    } else {
      return null;  // No task found with this ID
    }
  } catch (err) {
    console.error('Error updating task in database:', err.message);
    throw new Error('Unable to update task');
  }
}

function getUser(userName) {
  return userCollection.findOne({ userName: userName });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(userName, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    userName: userName,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}



module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  getUser,
  getUserByToken,
  createUser,
};
