import { Server, Socket } from 'socket.io';
import { createServer } from "http";
import { config } from 'dotenv';
import { signUp, logIn } from './sockets/user';
import { newList, getUserLists, getNameOfList, addUser, deleteUserList, deleteUser } from './sockets/list';
import { findTodos, markTodo, newTodo, removeTodo } from './sockets/todo';

config();

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    allowedHeaders: ["Access-Control-Allow-Origin", "*"],
    credentials: true
  },
});

export type ioServer = typeof io;

io.on("connection", (socket: Socket) => {

  socket.on('enterList', (id: number) => socket.join('list'+id));

  signUp(socket);
  logIn(socket);

  newList(socket);
  getUserLists(socket);
  getNameOfList(socket);
  addUser(socket);
  deleteUser(socket);
  deleteUserList(socket);

  newTodo(socket, io);
  findTodos(socket, io);
  markTodo(socket, io);
  removeTodo(socket, io);

});

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Application started on URL 🎉`);
});