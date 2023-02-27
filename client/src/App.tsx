import { useNavigate } from 'react-router';


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
