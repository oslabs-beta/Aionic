import { useNavigate } from "react-router";

function AppsList(props) {
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    return navigate('/home/manifests');
  }
  return (
    <div>
      <h1>This is AppsList</h1>
      <button>Click me to go to manifests!</button>
    </div>
  )
}


export default AppsList