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
    fetch('http://localhost:3000/api/userApiKey?' + new URLSearchParams({
      user: gitUser
    }))
      .then((data: Response) => data.json())
      .then((data: []) => {
        if (data[0] !== null) {
          setArgo(true);
        }
        else return;
      })
      .catch((err) => console.log(err));

    fetch('http://localhost:3000/api/gitToken' + new URLSearchParams({
      user: gitUser
    }))
      .then((data: Response) => data.json())
      .then((data: boolean) => {
        if (data) setGit(true);
      })
      .catch((err) => console.log(err));

  }, []);

  if (argo) {
    return (
      <div>
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
