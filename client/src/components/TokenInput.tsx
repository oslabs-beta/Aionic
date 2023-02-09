function TokenInput(props) {

  const handleSubmit = (e) => {
    props.setToken()
  }
  return (
    <div>
      <h1>This is TokenInput</h1>
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <input placeholder="Insert Token Here"></input>
        <button>CLICK ME TO SUBMIT TOKEN</button>
      </form>
    </div>
  )
}

export default TokenInput