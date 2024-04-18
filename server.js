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
    origin: "http://localhost:5173",
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