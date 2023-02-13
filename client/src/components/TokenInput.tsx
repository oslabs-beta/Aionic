interface tokens {
  argo: boolean,
  git: boolean
}

interface props {
  tokens: tokens,
  setGit(arg0: boolean): void,
  setArgo(arg0: boolean): void
}


function TokenInput(props: props) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    props.setArgo(true);
    console.log('changing state')
  }

  return (
    <div>
      <h1>This is TokenInput</h1>
      <form
        onSubmit={(e) => {handleSubmit(e)}}>
        <input placeholder='Insert Token Here'></input>
        <button>CLICK ME TO SUBMIT TOKEN</button>
      </form>
    </div>
  );
}

export default TokenInput;
