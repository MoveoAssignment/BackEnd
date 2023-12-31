let count = 0;
let id;

const handleClient = (io) => {
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
};

module.exports = { handleClient };
