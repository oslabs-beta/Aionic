function App() {
  const handleClick = (e) => {
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
   </div>
  )
}

export default App
