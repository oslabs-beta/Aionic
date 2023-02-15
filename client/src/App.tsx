import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Home from './components/Home';
import Login from './components/Login';

//successful auth will return an object with this property
interface User {
  user: string;
}

function App() {
  //isLoggedIn changes after successful GitHub auth

  const navigate = useNavigate();

    return (
      <div>
        <a href='http://localhost:3000/auth/github'>Login Using GitHub</a>
      </div>
    );
}

export default App;
