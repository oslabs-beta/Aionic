import { ChangeEvent, useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  //isLoggedIn changes after successful GitHub auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    //fetch the api
    fetch('http://localhost:3000/api/checkUser')
      .then((data: Response) => data.json())
      .then((data) => {
        //if auth succeeds, we get the username back. need to make sure we get false if it fails
        if (data != 'failed') {
          setIsLoggedIn(true);
          setUsername(data.user);
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
