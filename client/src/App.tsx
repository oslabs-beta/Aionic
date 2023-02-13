import { ChangeEvent, useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  //isLoggedIn changes after successful GitHub auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //fetch the api
    fetch('http://localhost:3000/api/checkuser')
      .then((data: Response) => data.json())
      .then((data: string) => {
        //if auth succeeds, we get the username back. need to make sure we get false if it fails
        if (data != 'failed') {
          setIsLoggedIn(true);
          //forward to home
        }
      });
  });

  return (
    <div>
      <h1>Vite is the best</h1>
      <button onClick={(e) => handleClick(e)}>CLICK ME</button>
      <a href='http://localhost:3000/auth/github'>Login Using GitHub</a>
      {isLoggedIn ? <Home /> : <Login />}
    </div>
  );
}

export default App;
