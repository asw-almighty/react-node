import path from "path";
import express from "express";
import logger from "morgan";
import socketIO from "socket.io";

const app = express();

app.use(logger("dev"));

const staticPath = path.join(__dirname, "../");
const PORT = 3000;

app.use(express.static(staticPath));

const server = app.listen(PORT, function() {
  console.log(`✅ listening: http://localhost:${PORT}`);
});

const io = socketIO(server);
io.on("connection", socket => {
  socket.on("connected", ({ message }) => console.log(`somebody ${message}`));
  socket.on("beginPath", ({ x, y }) => {
    socket.broadcast.emit("beganPath", { x, y });
  });
  socket.on("strokePath", ({ x, y, color }) => {
    socket.broadcast.emit("strokedPath", { x, y, color });
  });
});
