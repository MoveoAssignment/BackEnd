const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const codeblockRoutes = require("./routes/Codeblock.routes");
const connectDB = require("./config/mongo");
const {Server} = require("socket.io");
const { setSocket } = require("./utils/socketService");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 5001;
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/codeblocks", codeblockRoutes);

const server = require("http").createServer(app);
const io = new Server(server, {
  cors: { origin: "*:*", methods: ["GET", "POST"] },
});

setSocket(io);
const { handleClient } = require("./utils/socket");
handleClient(io);

// using socket comunicatin for the chat.
server.listen(SOCKET_PORT, () => {
  console.log(`Socket Server is running on port ${SOCKET_PORT}`);
  connectDB();
});

app.listen(PORT, () => {
  console.log(`Server Running on Port: http://localhost:${PORT}`);
});
