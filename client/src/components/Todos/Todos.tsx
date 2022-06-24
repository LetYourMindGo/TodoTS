import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { IList, ITodo } from '../../types/types';
import NewTodo from '../NewTodo/NewTodo';
import TodoItem from '../TodoItem/TodoItem';
import './Todos.css'

interface Props {
  username: string;
  personalLists: IList[];
  setPersonalLists(lists: IList[]): void;
}

const Todos:React.FC<Props> = ({ username, personalLists, setPersonalLists  }) => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [clicked, setClicked] = useState<boolean>(false);

  const url = 'https://todo-app-typescript-server.herokuapp.com/';
  const socket: Socket = io(url);

  const idFromParams: string | undefined = useParams().id?.substring(1)
  let id!: number
  if(typeof idFromParams !== 'undefined') {
    id = parseInt(idFromParams, 10)
  }
  console.log(idFromParams);
  

  socket.on('todos', (listOfTodos: ITodo[]) => {
    console.log('todos', listOfTodos);
    
    setTodos(listOfTodos)
  })
  
  

  useEffect(() => {
    socket.emit('enterList', id);
    socket.emit('getTodos', id);
    console.log(todos);
    
  }, [])

  return (
    <div className="todos-container">
      <div className="todos-container__list">
        <NewTodo id={id} />
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Todos
