import { Outlet } from "react-router";
import { createContext, useEffect, useState } from "react";
import App from "../App";

export const GitUserContext = createContext('noUser');

function Protected() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [username, setUsername] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/logout', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((data) => data.json())
      .then((data) => {
        setIsLoggedIn(false);
        setUsername('');
      });
  }


  useEffect(() => {
    //fetch the api
    fetch('http://localhost:3000/api/checkUser', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
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
        <button onClick={(e) => handleClick(e)}>Logout</button>
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