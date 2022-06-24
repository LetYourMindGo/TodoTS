import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Home.css";

interface Props {
  username: string;
}

const Home: React.FC<Props> = ({ username }) => {
  const navigate = useNavigate();

  const onClick = () => {
    
    if (username === '') {
      navigate('/login');
      return;
    }
    navigate('/todos')};

  return (
    <div className="home">
      <h1 className="home__welcome">Welcome!</h1>
      <button className="home__to-list" onClick={onClick}>My todo list</button>
    </div>
  );
};

export default Home;