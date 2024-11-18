const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('prioritask');
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
    return result.ops[0];  // Return the inserted task
  } catch (err) {
    console.error('Error adding task to database:', err.message);
    throw new Error('Unable to add task');
  }
}

// Update a task by ID
async function updateTask(taskId, updatedTask) {
  try {
    const result = await taskCollection.updateOne(
      { id: taskId }, 
      { $set: updatedTask }
    );
    if (result.matchedCount > 0) {
      return updatedTask;  // Return the updated task
    } else {
      return null;  // No task found with this ID
    }
  } catch (err) {
    console.error('Error updating task in database:', err.message);
    throw new Error('Unable to update task');
  }
}

module.exports = {
  getAllTasks,
  addTask,
  updateTask,
};
