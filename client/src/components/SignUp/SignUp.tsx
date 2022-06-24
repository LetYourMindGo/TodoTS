import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { IUser } from '../../types/types';
import './SignUp.css';

interface Props {
  username: string;
  setUsername(username: string): void;
  clicked: boolean;
  setClicked(clicked: boolean): void;
}

const SignUp: React.FC<Props> = ({ username, setUsername, clicked, setClicked }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

  const url = 'https://todo-app-typescript-server.herokuapp.com/';
  const socket: Socket = io(url);

  const signUp = (username: string, password: string, callback: Function) => {
    socket.emit('signUp', { username, password });
    socket.on('SignInCheck', (username: string) => callback(username));
  };

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
  const handleConfirmedPassword = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmedPassword(e.currentTarget.value);

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClicked(true)
    if (password !== confirmedPassword) {
      setPasswordMatch(false);
      return;
    }
    const user: IUser = { username, password }
    signUp(user.username, user.password, setUsername)
  };

  useEffect (() => {
    if (username !== 'Username already taken.' && username !== '') {
      navigate('/todos');
      setClicked(false);
    }
  }, [clicked])

  const onClick = () => navigate('/login')

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={onSubmit}>
        <input className="form__username" required type="text" placeholder="Username..." onChange={handleUsername}/>
        <input className="form__password" required type="password" placeholder="Password..." onChange={handlePassword}/>
        <input className="form__password" required type="password" placeholder="Confirm password..." onChange={handleConfirmedPassword}/>
        <p className={ passwordMatch ? "hidden" : "error" }>Your passwords don't match!</p>
        <button className="from__button" type="submit">SignUp</button>
        {username === 'Username already taken.' && <p>{username}</p>}
      </form>
      <p className="login__no-account">
        <button className="no-account__to-login" onClick={onClick}>LogIn</button>
         if you already have an account!</p>
    </div>
  )
}

export default SignUp;
