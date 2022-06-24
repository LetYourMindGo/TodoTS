import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { IUser } from '../../types/types';
import './LogIn.css';

interface Props {
  username: string;
  setUsername(username: string): void;
  clicked: boolean;
  setClicked(clicked: boolean): void;
}

const LogIn: React.FC<Props> = ({ username, setUsername, clicked, setClicked }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');

  const url = 'https://todo-app-typescript-server.herokuapp.com/';
  const socket: Socket = io(url);

  const logIn = (username: string, password: string, callback: Function) => {
    socket.emit('logIn', { username, password });
    socket.on('SignInCheck', (username: string) => callback(username));
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: IUser = { username, password }
    logIn(user.username, user.password, setUsername)
    setClicked(true)
  };

  useEffect (() => {
    if (username !== 'No username found.' &&
    username !== 'Your password is incorrect.' &&
    username !== '') {
      setClicked(false);
      navigate('/todos');
    }
  }, [clicked])

  const onClick = () => navigate('/signup')

  return (
    <div className="login">
      <form className="login__form" onSubmit={onSubmit}>
        <input className="form__username" required type="text" placeholder="Username..." onChange={handleUsername}/>
        <input className="form__password" required type="password" placeholder="Password..." onChange={handlePassword}/>
        <button className="from__button" type="submit">LogIn</button>
        {(username === 'No username found.' || username === 'Your password is incorrect.') && <p>{username}</p>}
      </form>
      <p className="login__no-account">
        <button className="no-account__to-login" onClick={onClick}>SignUp</button>
         if you don't have an account yet!</p>
    </div>
  )
}

export default LogIn;
