import { useState, useEffect } from 'react';
import AppsList from './AppsList';
import TokenInput from './TokenInput';

function AppsHub() {
  const [git, setGit] = useState(false);
  const [argo, setArgo] = useState(false);
  const [url, setUrl] = useState(false);

  //check if token and git auth is on serverside
  useEffect(() => {
    fetch('http://localhost:3000/api/argoToken')
      .then((data: Response) => data.json())
      .then((data: boolean) => {
        if (data) setArgo(true);
      })
      .catch((err) => console.log(err));

    fetch('http://localhost:3000/api/gitToken')
      .then((data: Response) => data.json())
      .then((data: boolean) => {
        if (data) setGit(true);
      })
      .catch((err) => console.log(err));

    //create fetch for URL when there is an endpoint
    // fetch('http://localhost:3000/api/[URL ENDPOINT HERE]')
    //   .then((data: Response) => data.json())
    //   .then((data: boolean) => {
    //     if (data) setUrl(true);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  if (!argo) {
    return (
      <div>
        {/* <TokenInput
          tokens={{ argo: argo, git: git, url: url }}
          setGit={setGit}
          setArgo={setArgo}
          setUrl={setUrl}
        /> */}
      </div>
    );
  } else {
    return (
      <div>
        <h1>This is AppsHub</h1>
        <AppsList />

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
