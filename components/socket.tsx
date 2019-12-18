import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:3000");

export const sayHello = () => {
  socket.emit("hello");
};
