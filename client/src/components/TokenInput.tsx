import { useContext, useState } from 'react';
import { GitUserContext } from './Protected';

import gitLogo from '../assets/github-mark.png';
import argoLogo from '../assets/argo-icon-black.png';

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
  const gitUser = useContext(GitUserContext);

  const handleArgoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const req = {
      api_key: argoTokenValue,
      url: argoUrlValue,
      githubId: gitUser,
    };

    fetch('http://localhost:3000/api/userApiKey', {
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
        }
      });
  };

  //waiting for BE to finish gittoken logic
  const handleGitSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const req = { gitToken: gitTokenValue, githubId: gitUser };

    fetch('http://localhost:3000/api/gitToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
      .then((data: Response) => data.json())
      .then((data) => {
        console.log('set git data: ', data);
        if (data) {
          props.setGit(true);
        }
      });
  };

  return (
    <div className='my-8 flex flex-col items-center space-y-4'>
      <div className='border flex flex-col space-y-3 bg-white drop-shadow rounded-md w-9/12 p-10'>
        <div className='flex flex-row items-center mb-2'>
          <img className='h-6 mr-2' src={argoLogo} />
          <h1 className='text-3xl text-gray-900'>Argo Input</h1>
        </div>
        <form
          className='flex flex-col space-y-4'
          onSubmit={(e) => {
            handleArgoSubmit(e);
          }}
        >
          <input
            className='block h-8 rounded w-full px-2 py-5 bg-gray-100'
            id='argoTokenInput'
            onChange={(e) => setArgoTokenValue(e.target.value)}
            placeholder='Insert Argo Token Here'
          ></input>
          <input
            className='block h-8 rounded w-3/4 px-2 py-5 bg-gray-100'
            id='argoUrlInput'
            onChange={(e) => setArgoUrlValue(e.target.value)}
            placeholder='Insert Argo URL Here'
          ></input>
          <button className='rounded-md bg-orange-500 w-24 hover:bg-orange-600 px-4 py-2 text-white'>
            Submit
          </button>
        </form>
      </div>

      <div className='border flex flex-col space-y-3 bg-white drop-shadow rounded-md w-9/12 p-10'>
        <div className='flex flex-row items-center mb-2'>
          <img className='h-6 mr-2' src={gitLogo} />
          <h1 className='text-3xl mb-2 text-gray-900'>Github Token Input</h1>
        </div>

        <form
          className='flex flex-col space-y-4'
          onSubmit={(e) => {
            handleGitSubmit(e);
          }}
        >
          <input
            className='block h-8 rounded w-3/4 px-2 py-5 bg-gray-100'
            id='gitUrlInput'
            onChange={(e) => setGitTokenValue(e.target.value)}
            placeholder='Insert Github Token Here'
          ></input>
          <button className='rounded-md bg-orange-500 w-24 hover:bg-orange-600 px-4 py-2 text-white'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default TokenInput;
