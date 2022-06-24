import { ioServer } from '../app';
import { Socket } from 'socket.io';
import { addTodo, deleteTodo, getTodos, toggleTodo } from '../db/todos';
import { ITodo } from '../types/types';

export const newTodo = (socket: Socket, io: ioServer) => {

  socket.on('addTodo', async (todo: ITodo, id: number) => {
    await addTodo(todo);
    const todos = await getTodos(id);
    if (todos && todos !== 'Something went wrong when searching todos.') {
      const listOfTodos: ITodo[] = todos.map(todo => {
        return ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          todoDone: todo.todoDone,
          idOfList: todo.idOfList
        });
      });
      
      return io.in('list'+id).emit('todos', listOfTodos);
    };
  });
}

export const findTodos = (socket: Socket, io: ioServer) => {

  socket.on('getTodos', async (id: number) => {
    const todos = await getTodos(id);
    if (todos && todos !== 'Something went wrong when searching todos.') {
      const listOfTodos: ITodo[] = todos.map(todo => {
        return ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          todoDone: todo.todoDone,
          idOfList: todo.idOfList
        });
      });
      return io.in('list'+id).emit('todos', listOfTodos);
    };
    io.in('list'+id).emit('todos', []);
  });
}

export const markTodo = (socket: Socket, io: ioServer) => {

  socket.on('toggleTodo', async (todo: ITodo, id: number) => {
    if (!todo.todoDone) {
      await toggleTodo(todo.id, true);
    };
    if (todo.todoDone) {
      await toggleTodo(todo.id, false);
    };
    const todos = await getTodos(todo.idOfList);
    if (todos && todos !== 'Something went wrong when searching todos.') {
      const listOfTodos: ITodo[] = todos.map(todo => {
        return ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          todoDone: todo.todoDone,
          idOfList: todo.idOfList
        });
      });
      return io.in('list'+id).emit('todos', listOfTodos);
    };
    io.in('list'+id).emit('todos', []);
  });
}

export const removeTodo = (socket: Socket, io: ioServer) => {

  socket.on('deleteTodo', async (todo: ITodo, id: number) => {
    await deleteTodo(todo.id);
    const todos = await getTodos(todo.idOfList);
    if (todos && todos !== 'Something went wrong when searching todos.') {
      const listOfTodos: ITodo[] = todos.map(todo => {
        return ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          todoDone: todo.todoDone,
          idOfList: todo.idOfList
        });
      });
      return io.in('list'+id).emit('todos', listOfTodos);
    };
    io.in('list'+id).emit('todos', []);
  });
}
