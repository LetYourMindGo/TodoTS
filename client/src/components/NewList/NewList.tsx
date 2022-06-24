import React, { useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { IList } from '../../types/types';
import './NewList.css';

interface Props {
  username: string;
  personalLists: IList[];
  setPersonalLists(lists: IList[]): void;
}

const NewList: React.FC<Props> = ({ username, personalLists, setPersonalLists }) => {
  const [listName, setListName] = useState<string>('');

  const url = 'https://todo-app-typescript-server.herokuapp.com/';
  const socket: Socket = io(url);

  socket.on('lists', (list: IList) => {
    const newLists: IList[] = personalLists.concat(list);
    setPersonalLists(newLists);
  });

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => setListName(e.currentTarget.value);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username) {
      const newList: IList = {
        id: Date.now(),
        name: listName,
        users: [username]
      };
    socket.emit('addList', newList);
    setListName('');
    e.currentTarget.reset();
    };
  };

  return (
    <form className="new-list-form" onSubmit={handleSubmit}>
      <input className="new-list-form__name" type="text" placeholder="New list..." required onChange={handleName} />
      <button className="new-list-form__button" type="submit" >Add</button>
    </form>
  )
}

export default NewList
