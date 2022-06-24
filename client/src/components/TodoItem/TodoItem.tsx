import React, { useState } from 'react'
import { io, Socket } from 'socket.io-client';
import { ITodo } from '../../types/types';
import './TodoItem.css';

interface Props {
  todo: ITodo
}

const TodoItem : React.FC<Props> = ({todo}) => {
  
  const url = 'https://todo-app-typescript-server.herokuapp.com/';
  const socket: Socket = io(url);

  const onToggle = () => socket.emit('toggleTodo', todo, todo.idOfList);

  const onDelete = () => socket.emit('deleteTodo', todo, todo.idOfList)

  return (
    <li className="todos__item">
      <div className={todo.todoDone ? "todos__task done" : "todos__task not-done"}>
        <p className="task__title">{todo.title}</p>
        <p className="task__description">{todo.description}</p>
        <div>
          {todo.todoDone ? 
          <button className="task__toggle not-done" onClick={onToggle}>Done</button> 
          : 
          <button className="task__toggle done" onClick={onToggle}>Not Done</button>}
          
          <button className="task__delete" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
