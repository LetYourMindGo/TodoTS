import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IList } from '../../types/types';
import List from '../List/List';
import './Lists.css';

interface Props {
  username: string;
  personalLists: IList[];
  setPersonalLists(lists: IList[]): void;
}

const Lists: React.FC<Props> = ({ username, personalLists, setPersonalLists }) => {

  const url = 'https://todo-app-typescript-server.herokuapp.com/';
  const socket: Socket = io(url);
  
  socket.on('lists', (lists: IList[]) => setPersonalLists(lists))

  useEffect(() => {
    socket.emit('getUserLists', username)
  }, [])

  return (
    <div>
      {personalLists.map(list => (
        <List key={list.id} list={list} username={username} />
      ))}
    </div>
  )
}

export default Lists;