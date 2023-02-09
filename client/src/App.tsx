import { useState } from 'react';
import { redirect } from 'react-router';
import Home from './components/Home';
import Login from './components/Login';




function App() {
  // const  [login, setLogin]  = useState(false);
  const handleClick = (e : any) => {
    e.preventDefault();
    fetch('http://localhost:3000/test')
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
    return (
      <div>
        <h1>Is the server running?</h1>
        <button onClick={(e) => handleClick(e)}>CLICK ME</button>
        <Login />
      </div>
    )
  // else {
  //   return (
  //     <div>
  //       {<Home/>}
  //     </div>
  //   )
  // }
}

export default App
