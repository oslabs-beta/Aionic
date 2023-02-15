import { useState } from 'react';

interface tokens {
  argo: boolean;
  git: boolean;
  url: boolean;
}

interface props {
  tokens: tokens;
  setGit(arg0: boolean): void;
  setArgo(arg0: boolean): void;
  setUrl(arg0: boolean): void;
}

function TokenInput(props: props) {
  const [argoTokenValue, setArgoTokenValue] = useState('');
  const [argoUrlValue, setArgoUrlValue] = useState('');
  const [gitTokenValue, setGitTokenValue] = useState('');

  const handleArgoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  

    const req = { api_key: argoTokenValue, url: argoUrlValue };
    console.log(req);

    fetch('http://localhost:3000/db/addToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
      .then((data: Response) => data.json())
      .then((data) => {
        if (data == 'success') {
          props.setArgo(true); //need to check what data we will get back
          props.setUrl(true);
          console.log('changing argo state');
        }
      });
  };

  //waiting for BE to finish gittoken logic
  const handleGitSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const req = { gitToken: gitTokenValue };

    fetch('http://localhost:3000/api/gitToken', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
      .then((data: Response) => data.json())
      .then((data) => {
        if (data) {
          props.setGit(true);
          console.log('changing git state');
        }
      });
  };

  return (
    <div>
      <div>
        <h1>Argo Input</h1>
        <form
          onSubmit={(e) => {
            handleArgoSubmit(e);
          }}>
          <input
            id='argoTokenInput'
            onChange={(e) => setArgoTokenValue(e.target.value)}
            placeholder='Insert Argo Token Here'></input>
          <input
            id='argoUrlInput'
            onChange={(e) => setArgoUrlValue(e.target.value)}
            placeholder='Insert Argo URL Here'></input>
          <button>CLICK ME TO SUBMIT ARGO DATA</button>
        </form>
      </div>

      <div>
        <h1>Github Token Input</h1>
        <form
          onSubmit={(e) => {
            handleGitSubmit(e);
          }}>
          <input
            id='gitUrlInput'
            onChange={(e) => setGitTokenValue(e.target.value)}
            placeholder='Insert Github Token Here'></input>
          <button>CLICK ME TO SUBMIT GITHUB TOKEN</button>
        </form>
      </div>
    </div>
  );
}

export default TokenInput;
