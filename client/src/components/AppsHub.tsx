import { useState, useEffect } from 'react';
import AppsList from './AppsList';
import TokenInput from './TokenInput';

function AppsHub() {
  const [git, setGit] = useState(false);
  const [argo, setArgo] = useState(false);
  const [url, setUrl] = useState(false);

  //check if token and git auth is on serverside
  useEffect(() => {
    fetch('http://localhost:3000/api/argoToken?' + new URLSearchParams({
      username: 'aribengiyat'
    }))
      .then((data: Response) => data.json())
      .then((data: []) => {
        console.log(data);
        if (data[0].api_key.defualt !== null) {
          console.log('argotoken from endpoint is: ', data)
          setArgo(true);
        }
        else return;
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
