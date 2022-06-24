import React, { useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ITodo } from '../../types/types';
import './NewTodo.css';

interface Props{
  id: number
}

const NewTodo:React.FC<Props> = ({ id }) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const url = 'https://todo-app-typescript-server.herokuapp.com/';
  const socket: Socket = io(url);
  
  const getTitle = (e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
  const getDescription = (e: React.FormEvent<HTMLInputElement>) => setDescription(e.currentTarget.value);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: ITodo = {
      id: Date.now(),
      title: title,
      description: description,
      todoDone: false,
      idOfList: id
    }
    console.log('new', newTodo);
    
    
    socket.emit('addTodo', newTodo, id);
    setTitle('');
    setDescription('');
    e.currentTarget.reset();
  }


  return (
    <div className="todo-form">
      <form className="todo-form__new-task" onSubmit={handleSubmit}>
        <p className="todo-form__header">New todo</p>
        <input type="text" placeholder="Name of task..." className="todo-form__task-title" required onChange={getTitle} />
        <input type="text" placeholder="Description..." className="todo-form__task-description" onChange={getDescription} />
        <button type="submit" className="todo-form__add-btn">Add</button>
      </form>
    </div>
  );
};

export default NewTodo;