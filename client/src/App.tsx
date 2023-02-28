import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Login from './components/Login';
import logo from './assets/logo-sm.png'

//successful auth will return an object with this property
interface User {
  user: string;
}

function App() {
  //isLoggedIn changes after successful GitHub auth

  const navigate = useNavigate();

    return (
      <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-400 via-blue-200 to-orange-400 gap-4'>
        <h1 className='text-2xl text-black font-semibold underline'>Aionic</h1>
        <img src={logo} alt="Aionic logo" className='w-36'/>
        <a href='http://localhost:3000/auth/github' className='text-lg text-black font-semibold underline'>Login Using GitHub</a>
      </div>
    );
}

export default App;
