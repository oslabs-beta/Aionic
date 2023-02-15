import { useState, useEffect } from "react"
import AppsList from "./AppsList"
import TokenInput from "./TokenInput";

function AppsHub() {

  const [git, setGit] = useState(false);
  const [argo, setArgo] = useState(false);

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
        if (data) setArgo(true);
      })
      .catch((err) => console.log(err));
  },[])


  if (!argo) {
    return (
      <div>
        <TokenInput tokens={{argo: argo, git:git}} setGit={setGit} setArgo={setArgo} />
      </div>
    )
  } else {
    return (
      <div>
        <AppsList />
      </div>
    )
  }
}


export default AppsHub