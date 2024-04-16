// const app = require("./app");
// require("dotenv").config();

// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });

// const app = require("./app");
// const http = require("http");
// const socketIO = require("socket.io");
// const cors = require("cors");
// require("dotenv").config();

// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// // Socket.io event handling
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Handle events from the client
//   socket.on("message", (data) => {
//     console.log("Received message:", data);
//     // Handle the message event
//     // Add your code here to process and emit messages
//   });

//   // Clean up when a user disconnects
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//     // Handle the disconnect event
//   });
// });


// const PORT = process.env.PORT;

// // Enable CORS for Express app
// app.use(cors());

// server.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });

// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const cors = require("cors");

// // Serve static files from the "public" directory
// app.use(express.static('public'));
// // Enable CORS for all routes
// app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// // Keep track of users and their corresponding rooms
// const users = {};

// // Socket.io event handling
// io.on('connection', (socket) => {
//   socket.on('joinRoom', (roomID, username) => {
//     // Leave the current room if the user is already in a room
//     if (users[socket.id]) {
//       const previousRoom = users[socket.id];
//       socket.leave(previousRoom);
//     }

//     // Join the new room
//     socket.join(roomID);

//     // Update the user's room in the users object
//     users[socket.id] = roomID;

//     // Emit the existing room messages to the user
//     const roomMessages = getRoomMessages(roomID); // Implement this function to retrieve room messages
//     socket.emit('roomJoined', roomMessages);
//   });

//   socket.on('leaveRoom', (roomID, username) => {
//     if (users[socket.id] === roomID) {
//       // Leave the room
//       socket.leave(roomID);

//       // Remove the user from the users object
//       delete users[socket.id];
//     }
//   });

//   socket.on('message', (message) => {
//     const roomID = users[socket.id];
//     if (roomID) {
//       // Broadcast the message to all users in the room
//       io.to(roomID).emit('message', message);
//       // Save the message to the room messages
//       saveRoomMessage(roomID, message); // Implement this function to save the message to the room
//     }
//   });

//   socket.on('disconnect', () => {
//     const roomID = users[socket.id];
//     if (roomID) {
//       // Leave the room
//       socket.leave(roomID);

//       // Remove the user from the users object
//       delete users[socket.id];
//     }
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3005;
// http.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// // Define an object to hold the chat room messages
// const roomMessages = {};

// function getRoomMessages(roomID) {
//   // Retrieve the messages for the specified roomID from the roomMessages object
//   return roomMessages[roomID] || [];
// }

// function saveRoomMessage(roomID, message) {
//   // Check if the roomID already exists in the roomMessages object
//   if (!roomMessages[roomID]) {
//     roomMessages[roomID] = [];
//   }

//   // Save the message to the corresponding roomID
//   roomMessages[roomID].push(message);
// }
// const express= require('express')
// const app = require("./app");
// app.use(express())

// require("dotenv").config();
// const http = require("http");
// const socketIO = require("socket.io");
// const cors = require("cors");
// app.use(cors());

// const server = http.createServer(app);
// const io = socketIO(server
//   , {
//   cors: {
//     origin: ["http://localhost:5174"],
//   },
// }
// );
// const PORT = 3005;
// const PORT2 = 3000;

// const roomMessages = {};

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on("joinRoom", (roomID, username, userID) => {
//     socket.join(roomID);
  
//     if (!roomMessages[roomID]) {
//       roomMessages[roomID] = []; // Initialize roomMessages[roomID] as an empty array
//     }
  
//     const userJoinMessage = `${username} has joined the room`;
//     roomMessages[roomID].push(userJoinMessage);
//     io.to(roomID).emit("message", userJoinMessage);
//     io.send(userJoinMessage);
//     console.log(roomMessages);
//     socket.emit("roomJoined", roomMessages[roomID]);
//   });
  
//   socket.on("message", (message) => {
//     const roomID = Object.keys(socket.rooms)[0];
//     const username = getUsernameFromSocket(socket);
  
//     if (!roomMessages[roomID]) {
//       roomMessages[roomID] = []; // Initialize roomMessages[roomID] as an empty array
//     }
  
//     const userMessage = `${username}: ${message}`;
//     roomMessages[roomID].push(userMessage);
//     io.to(roomID).emit("message", userMessage); // Broadcast message to all clients in the room
  
//     console.log(`New message: ${userMessage}`);
//   });
  
//   socket.on("leaveRoom", (roomID, username) => {
//     socket.leave(roomID);
  
//     if (!roomMessages[roomID]) {
//       roomMessages[roomID] = []; // Initialize roomMessages[roomID] as an empty array
//     }
  
//     const userLeaveMessage = `${username} has left the room`;
//     roomMessages[roomID].push(userLeaveMessage);
//     io.to(roomID).emit("message", userLeaveMessage);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// function getUsernameFromSocket(socket) {
//   const roomID = Object.keys(socket.rooms)[1];
//   const username = roomID[0];
//    console.log("roomID:", roomID);
//    console.log("typeof roomID:", typeof roomID);
//   return username;
// }


// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
//  });

//  app.use(cors())
// server.listen(PORT2, () => {
//   console.log(`Server is running on port ${PORT2}`);
// });




//working 90%
// const express = require('express');
// const app = express();
// app.use(express());

// require('dotenv').config();
// const http = require('http');
// const socketIO = require('socket.io');
// const cors = require('cors');

// // Enable CORS
// app.use(cors());

// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: ['http://localhost:5174'],
//   },
// });

// const PORT = 3005;
// const PORT2 = 3000;

// const roomMessages = {};

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('joinRoom', (roomID, username, userID) => {
//     socket.join(roomID);

//     if (!roomMessages[roomID]) {
//       roomMessages[roomID] = []; // Initialize roomMessages[roomID] as an empty array
//     }

//     const userJoinMessage = `${username} has joined the room`;
//     roomMessages[roomID].push(userJoinMessage);

//     const usersInRoom = io.sockets.adapter.rooms.get(roomID);
//     if (usersInRoom.size === 2) {
//       io.to(roomID).emit('roomJoined', roomMessages[roomID]);
//     }

//     io.to(roomID).emit('message', userJoinMessage);
//     console.log(roomMessages);
//   });

//   socket.on('message', (message) => {
//     const roomID = Object.keys(socket.rooms)[0];
//     const username = getUsernameFromSocket(socket);

//     if (!roomMessages[roomID]) {
//       roomMessages[roomID] = []; // Initialize roomMessages[roomID] as an empty array
//     }

//     const userMessage = `${username}: ${message}`;
//     roomMessages[roomID].push(userMessage);
//     io.to(roomID).emit('message', userMessage); // Broadcast message to all clients in the room

//     console.log(`New message: ${userMessage}`);
//   });

//   socket.on('leaveRoom', (roomID, username) => {
//     socket.leave(roomID);

//     if (!roomMessages[roomID]) {
//       roomMessages[roomID] = []; // Initialize roomMessages[roomID] as an empty array
//     }

//     const userLeaveMessage = `${username} has left the room`;
//     roomMessages[roomID].push(userLeaveMessage);
//     io.to(roomID).emit('message', userLeaveMessage);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// function getUsernameFromSocket(socket) {
//   const roomID = Object.keys(socket.rooms)[1];
//   const username = roomID; // Extract the username from the roomID
//   return username;
// }

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });

// app.use(cors());
// server.listen(PORT2, () => {
//   console.log(`Server is running on port ${PORT2}`);
// });

// const express= require('express')





//90 percent almost there
// const app = require("./app");
// const http = require("http");
// require("dotenv").config();

// const {Server} = require("socket.io");
// const cors = require("cors");
// const server = http.createServer(app);
// app.use(cors());

// const io = new Server(server
//   , {
//   cors: {
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//   },
// }
// );
// const PORT = 3005;
// const PORT2 = 3000;


// const roomMessages = {};

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('joinRoom', (roomID, username, userID) => {
//     socket.join(roomID);

//     if (!roomMessages[roomID]) {
//       roomMessages[roomID] = []; // Initialize roomMessages[roomID] as an empty array
//     }

//     const userJoinMessage = `${username} has joined the room`;
//     roomMessages[roomID].push(userJoinMessage);

//     const usersInRoom = io.sockets.adapter.rooms.get(roomID);
//     if (usersInRoom.size === 2) {
//       io.to(roomID).emit('roomJoined', roomMessages[roomID]);
//     }

//     io.to(roomID).emit('message', userJoinMessage);
//      console.log(roomMessages);
//   });

//   socket.on('message', (message) => {
//     socket.to(message.room).emit('message', message);
//     const roomID = Object.keys(socket.rooms)[0];
//     const username = getUsernameFromSocket(socket);

//     if (!roomMessages[roomID]) {
//       roomMessages[roomID] = []; // Initialize roomMessages[roomID] as an empty array
//     }

//     const userMessage = `${username}: ${message}`;
//     roomMessages[roomID].push(userMessage);
//     io.to(roomID).emit('message', userMessage.data); // Broadcast message to all clients in the room
//     io.to(roomID).emit('roomMessage', roomMessages[roomID]);
//     console.log(`New message: ${userMessage}`);
//   });

//   socket.on('leaveRoom', (roomID, username) => {
//     socket.leave(roomID);

//     if (!roomMessages[roomID]) {
//       roomMessages[roomID] = []; // Initialize roomMessages[roomID] as an empty array
//     }

//     const userLeaveMessage = `${username} has left the room`;
//     roomMessages[roomID].push(userLeaveMessage);
//     io.to(roomID).emit('message', userLeaveMessage);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// function getUsernameFromSocket(socket) {
//   const roomID = Object.keys(socket.rooms)[1];
//   const username = roomID; // Extract the username from the roomID
//   return username;
// }

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });

// app.use(cors());
// server.listen(PORT2, () => {
//   console.log(`Server is running on port ${PORT2}`);
// });


const express = require("express");
const app = require('./app')
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");


require("dotenv").config();



// Express app configuration
app.use(cors());
app.use(express.json());
// const express = require("express");
// const app = require('./app')
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");


// require("dotenv").config();



// // Express app configuration
// app.use(cors());

const server = http.createServer(app);

// Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: "https://main--zesty-hotteok-c8a3b0.netlify.app",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT;
const PORT2= process.env.PORT2

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

server.listen(PORT2, () => {
  console.log(`Server is running on port: ${PORT2}`);
});