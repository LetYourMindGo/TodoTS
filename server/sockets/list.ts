import { Socket } from 'socket.io';
import { addList, addUserToList, deleteList, deleteUserFromList, getList, getListsByUser } from '../db/lists';
import { getUser } from '../db/users';
import { IList, IUser } from '../types/types';

export const newList = (socket: Socket) => {

  socket.on('addList', async (newList: IList) => {
    await addList(newList);
    socket.emit('lists', newList);
  });
}

export const getNameOfList = (socket: Socket) => {

  socket.on('getNameOfList', async (id: number) => {
    const list = await getList(id);
    if (list === 'Something went wrong when searching list.' || list === 'No list.') {
      return socket.emit('nameOfList', list);
    };
    if (list) {
      return socket.emit('lists', list.name);
    }
  });
}

export const getUserLists = (socket: Socket) => {

  socket.on('getUserLists', async (username: string) => {
    const userLists = await getListsByUser(username);
    if(userLists && userLists !== 'Something went wrong when searching users lists.') {
      const listsToReturn: IList[] = userLists.map(list => {
        return ({
          name: list.name,
          id: list.id,
          users: list.users
        });
      });
      return socket.emit('lists', listsToReturn);
    };
    socket.emit('lists', []);
  });
}

export const addUser = (socket: Socket) => {

  socket.on('addUserToList', async (user: IUser, list: IList) => {
    const userFromDb = await getUser(user.username);
    if (!userFromDb || userFromDb === 'Something went wrong when getting user.') {
      return socket.emit('lists', 'No username found ');
    };
    await addUserToList(user, list);
  });
}

export const deleteUser = (socket: Socket) => {

  socket.on('deleteUserFromList', async (user: IUser, list: IList) => {
    await deleteUserFromList(user, list);
  });
}

export const deleteUserList = (socket: Socket) => {
  
  socket.on('deleteList', async (id: number, username: string) => {
    await deleteList(id);
    const userLists = await getListsByUser(username);
    if(userLists && userLists !== 'Something went wrong when searching users lists.') {
      const listsToReturn: IList[] = userLists.map(list => {
        return ({
          name: list.name,
          id: list.id,
          users: list.users
        });
      });
      return socket.emit('lists', listsToReturn);
    };
    socket.emit('lists', []);
  });
}

