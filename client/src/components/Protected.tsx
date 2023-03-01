import { Outlet } from 'react-router';
import { createContext, useEffect, useState } from 'react';
import App from '../App';
import Navbar from './Navbar';
import logoWhite from '../assets/logo-white.png';

export const GitUserContext = createContext('noUser');

function Protected() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [username, setUsername] = useState('');

  useEffect(() => {
    //fetch the api
    fetch('/server/api/checkUser', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data: Response) => data.json())
      .then((data) => {
        //if auth succeeds, we get the username back. need to make sure we get false if it fails
        if (data != 'failed') {
          setIsLoggedIn(true);
          setUsername(data.githubId);
        }
      });
  });
  if (isLoggedIn) {
    return (
      <div>
        <Navbar setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
        <GitUserContext.Provider value={username}>
          <Outlet />
        </GitUserContext.Provider>
      </div>
    );
  } else {
    return (
      <GitUserContext.Provider value={username}>
        <App />
      </GitUserContext.Provider>
    );
  }
}

export default Protected;
