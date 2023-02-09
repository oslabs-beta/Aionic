function TokenInput(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.setToken(e.target[0].value);
  };
  return (
    <div>
      <h1>This is TokenInput</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}>
        <input placeholder='Insert Token Here'></input>
        <button>CLICK ME TO SUBMIT TOKEN</button>
      </form>
    </div>
  );
}

export default TokenInput;
