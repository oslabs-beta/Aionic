import { useState } from 'react';
import Login from './components/Login';




function App() {
  const  [login, setLogin]  = useState(false);
  const handleClick = (e : any) => {
    e.preventDefault();
    fetch('http://localhost:3000/test')
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      });
  }
  if (!login) {
    return (
      <div>
        <h1>Vite is the best</h1>
        <button onClick={(e) => handleClick(e)}>CLICK ME</button>
        <Login setLogin={setLogin} />
      </div>
    )
  } else {
    return (
      <div>
        <h1>You have logged in</h1>
        {/* After the user is logged in, route them to Home */}
      </div>
    )
  }
}

export default App
