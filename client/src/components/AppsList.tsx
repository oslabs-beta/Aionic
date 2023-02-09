import { useNavigate } from "react-router";

function AppsList() {
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/home/manifests');
  }
  return (
    <div>
      <h1>This is AppsList</h1>
      <button onClick={(e)=>handleClick(e)}>Click me to go to manifests!</button>
    </div>
  )
}


export default AppsList