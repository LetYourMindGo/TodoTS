import React from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { IList } from '../../types/types';


interface Props {
  list: IList
  username: string
}

const List:React.FC<Props> = ({list, username}) => {
  const navigate = useNavigate()
  
  const url = 'https://todo-app-typescript-server.herokuapp.com/';
  const socket: Socket = io(url);

  const onClick = () => {
    navigate(`/todos/:${list.id}`)
  }

  const onDelete = async () => socket.emit('deleteList', list.id, username)

  return (
    <div>
      <h3 onClick={onClick}>{list.name}</h3>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default List;
