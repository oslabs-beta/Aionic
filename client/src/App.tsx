import { ChangeEvent, useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  //isLoggedIn changes after successful GitHub auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //fetch the api
    fetch('http://localhost:3000/api/checkUser')
      .then((data: Response) => data.json())
      .then((data: string) => {
        //if auth succeeds, we get the username back. need to make sure we get false if it fails
        if (data != 'failed') {
          setIsLoggedIn(true);
          //forward to home
        }
      });
    
  });

  const handleClick = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/logout')
      .then((data) => data.json)
      .then((data) => console.log(data));
  }

  if (!isLoggedIn) {
    return (
      <div>
        <a href='http://localhost:3000/auth/github'>Login Using GitHub</a>
        <button onClick={(e) => handleClick(e)}>Logout</button>
      </div>
    );
  } else {
  return <Home />
  }
}

export default App;
