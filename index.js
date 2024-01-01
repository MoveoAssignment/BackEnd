const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const codeblockRoutes = require("./routes/Codeblock.routes");
const connectDB = require("./config/mongo");
const socketIO = require("socket.io");
const { setSocket } = require("./utils/socketService");
const http = require("http");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 5001;
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/codeblocks", codeblockRoutes);

const server = http.createServer(app);
const io = socketIO(server)

setSocket(io);
const { handleClient } = require("./utils/socket");
let count=0;
io.on("connection", (socket) => {
  console.log("New WebSocket Connection... " + ++count);

  // Increment count and emit the updated count to all clients
  io.emit("count", count);
  console.log("count: ", count);

  // Listen for incoming chat messages
  socket.on("message", (message) => {
    // Broadcast the sanitized message to all connected clients
    io.emit("message", message);
  });

  // Listen for disconnect event
  socket.on("disconnect", () => {
    // Decrement count and emit the updated count to all clients
    count--;
    io.emit("count", count);
    console.log("Client has closed the socket");
    io.emit("message", "The other user has left the code block");
  });
});

// using socket comunicatin for the chat.
connectDB();
server.listen(PORT, () => {
  console.log(`Server Running on Port: http://localhost:${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server Running on Port: http://localhost:${PORT}`);
// });
