import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
// import NewTask from './components/NewTask/NewTask';
import Todos from './components/Todos/Todos';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp';
import { IList } from './types/types';
import "./App.css";
import Lists from './components/Lists/Lists';
import EmptyPage from './components/EmptyPage/EmptyPage';
import NewList from './components/NewList/NewList';


const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [clicked, setClicked] = useState<boolean>(false);
  const [personalLists, setPersonalLists] = useState<IList[]>([]);

  return (
    <div className="todo-app">
      <div className="todo-app__main-container">
        <Routes>
          <Route path="/" element={(
            <>
              <Header username={username} setUsername={setUsername} clicked={clicked} setClicked={setClicked} />
              <Home username={username} />
              <Footer />
            </>
          )} />
          <Route path="/login" element={(
            <>
              <Header username={username} setUsername={setUsername} clicked={clicked} setClicked={setClicked} />
              <LogIn username={username} setUsername={setUsername} clicked={clicked} setClicked={setClicked} />
              <Footer />
            </>
          )} />
          <Route path="/signup" element={(
            <>
              <Header username={username} setUsername={setUsername} clicked={clicked} setClicked={setClicked} />
              <SignUp username={username} setUsername={setUsername} clicked={clicked} setClicked={setClicked} />
              <Footer />
            </>
          )} />
          <Route path="/todos" element={(
            <>
              <Header username={username} setUsername={setUsername} clicked={clicked} setClicked={setClicked} />
              <NewList username={username} personalLists={personalLists} setPersonalLists={setPersonalLists} />
              <Lists username={username} personalLists={personalLists} setPersonalLists={setPersonalLists} />
              <EmptyPage />
              <Footer />
            </>
          )} />
          <Route path="/todos/:id" element={(
            <>
              <Header username={username} setUsername={setUsername} clicked={clicked} setClicked={setClicked} />
              <NewList username={username} personalLists={personalLists} setPersonalLists={setPersonalLists} />
              <Lists username={username} personalLists={personalLists} setPersonalLists={setPersonalLists} />
              <Todos username={username} personalLists={personalLists} setPersonalLists={setPersonalLists} />
              <Footer />
            </>
          )} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
