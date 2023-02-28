import { useState, useEffect, useContext } from 'react';
import AppsList from './AppsList';
import TokenInput from './TokenInput';
import { GitUserContext } from './Protected';

function AppsHub() {
  const [git, setGit] = useState(false);
  const [argo, setArgo] = useState(false);
  const [url, setUrl] = useState(false);
  const gitUser = useContext(GitUserContext);


  //check if token and git auth is on serverside
  useEffect(() => {
    fetch('server/api/userApiKey?' + new URLSearchParams({
      user: gitUser
    }))
      .then((data: Response) => data.json())
      .then((data: []) => {
        console.log('got api key,', data)
        if (Array.isArray(data.argoTokens)) {
          setArgo(true);
        }
        else return;
      })
      .catch((err) => console.log(err));

    fetch('server/api/gitToken?' + new URLSearchParams({
      user: gitUser
    }))
      .then((data: Response) => data.json())
      .then((data: boolean) => {
        console.log('git data is: ', data)
        if (data.githubToken !== 'no token') setGit(true);
      })
      .catch((err) => console.log(err));

  }, []);

  if (argo && git) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-orange-300'>
       <AppsList/>
      </div>
    );
  } else {
    return (
      <div>
        <TokenInput
          tokens={{ argo: argo, git: git, url: url }}
          setGit={setGit}
          setArgo={setArgo}
          setUrl={setUrl}
        />
      </div>
    );
  }
}

export default AppsHub;
