import { MouseEvent } from "react";

function App() {
  
  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent >) => {
    e.preventDefault();
    fetch('http://localhost:3000/test')
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
    })
  }

  return (
    <div>
      <h1>Vite is the best</h1>
      <button onClick={(e)=>handleClick(e)}>CLICK ME</button>
      <a href='http://localhost:3000/auth/github'>Login Using GitHub</a>
   </div>
  )
}

export default App
