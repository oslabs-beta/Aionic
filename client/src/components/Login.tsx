function Login(props) {
  return (
    <div>
      <h1>You need to login!</h1>
      <button onClick={()=>props.setLogin(true)}>Click me to login!</button>
    </div>
  )
}

export default Login;