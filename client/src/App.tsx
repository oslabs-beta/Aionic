import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Home from './components/Home';
import Login from './components/Login';

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
