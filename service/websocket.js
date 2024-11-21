const WebSocket = require('ws');

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

let tasks = [
  { id: 1, taskName: "Sample Task", userName: "John", completed: false },
];

// Broadcast a message to all connected clients
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send initial task list
  ws.send(JSON.stringify({ type: 'INITIAL_TASKS', tasks }));

  // Handle incoming messages (optional)
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === 'ADD_TASK') {
      const newTask = parsedMessage.task;
      tasks.push(newTask);
      broadcast({ type: 'TASK_ADDED', task: newTask });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
