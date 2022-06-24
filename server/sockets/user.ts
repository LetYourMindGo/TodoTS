import { Socket } from 'socket.io';
import { hash, compare } from 'bcrypt';
import { addUser, getUser } from '../db/users';
import { IUser } from '../types/types';

const incryptPass = async (password: string) => {
  const incryptedPass = await hash(password, 10);
  return incryptedPass;
};

export const signUp = (socket: Socket) => {

  socket.on('signUp', async (user: IUser) => {
    
    const userFromDb = await getUser(user.username);
    if (userFromDb !== 'Something went wrong when getting user.') {
      return socket.emit('SignInCheck', 'Username already taken.');
    };

    if (userFromDb === 'Something went wrong when getting user.') {
      user.password = await incryptPass(user.password);
      await addUser(user);
    };
    socket.emit('SignInCheck', user.username);
  });
}

export const logIn = (socket: Socket) => {
  
  socket.on('logIn', async (user: IUser) => {
    const userFromDb = await getUser(user.username);
    if (!userFromDb || userFromDb === 'Something went wrong when getting user.') {
      return socket.emit('loginStatus', 'No username found.');
    };
    const checkPass: boolean = await compare(user.password, userFromDb.password);
    if (!checkPass) {
      return socket.emit('SignInCheck', 'Your password is incorrect.');
    };
    socket.emit('SignInCheck', userFromDb.username);
  });
}