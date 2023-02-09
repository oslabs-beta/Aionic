import { useNavigate } from "react-router";

function Login(props) {
  let navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    return navigate('/home')
  }
  return (
    <div>
      <h1>You need to login!</h1>
      <button onClick={(e) => handleClick(e)}>Click me to login!</button>
    </div>
  )
}

export default Login;