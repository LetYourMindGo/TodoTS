import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css'

interface Props {
  username: string;
  setUsername(username: string): void;
  clicked: boolean;
  setClicked(clicked: boolean): void;
}

const Header: React.FC<Props> = ({ username, setUsername, clicked, setClicked }) => {
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/');
  };

  const handleLogIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/login')
  }

  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUsername('');
    setClicked(false)
    console.log(clicked);
    navigate('/')
  }

  return (
    <header className="header">
      <button className="header__nav" onClick={onClick}>Home</button>
      <h3 className="header__heading">Todo App</h3>
      {username !== '' ? 
      <button className="header__nav" onClick={handleLogOut}>Log Out</button>
      : <button className="header__nav" onClick={handleLogIn}>Log In</button>}
      
    </header>
  );
};

export default Header;