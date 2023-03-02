import { useNavigate } from 'react-router';
import logoWhite from '../assets/logo-white.png';

function Navbar({ setIsLoggedIn, setUsername }) {
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault();
    fetch('/server/logout', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setIsLoggedIn(false);
        setUsername('');
      });
      navigate('/');
  };

  return (
    <nav className='w-screen flex h-14 justify-between bg-orange-500 text-white'>
      <img src={logoWhite} className='my-2 mx-3' />
      <button className='mx-3 my-4' onClick={(e) => handleClick(e)}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
