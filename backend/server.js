import express from "express";
import { Server } from "socket.io";
const app = express();

const expressServer = app.listen(3000);

const io = new Server(expressServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
  },
});
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.emit("id", socket.id);
  socket.on("message", (data, ack) => {
    console.log(data);
    ack("Received");
    io.emit("messageB", data);
  });
});
