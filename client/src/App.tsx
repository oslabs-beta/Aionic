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
    <div className='flex h-screen items-center justify-center'>
      <a
        href='server/auth/github'
        className='text-lg text-black font-semibold underline items-center justify-center'
      >
        Login Using GitHub
      </a>
    </div>
  );
}

export default App;
