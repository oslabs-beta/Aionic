import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
import { GitUserContext } from "./Protected";


function ManifestDetails(props) {
  const [mani, setMani] = useState([]);
  const [branch, setBranch] = useState('')
  const gitUser = useContext(GitUserContext);
  const { state } = useLocation();

  //load each manifest for display
  useEffect(() => {
    const stateArr = [];
    let counter = 0;
    // loop over passed in array to find correct manifests
    for (const obj of props.details) {
      if (obj.revision === props.sha) {
        const manifests = JSON.parse(obj.manifest)
        for (const manifest of manifests) {
          if (counter >= manifests.length) {
            setMani(stateArr);
            return;
          }
          stateArr.push(
            <div>
              <p>{manifest}</p>
            </div>
          )
          counter++;
          setMani(stateArr)
        }
      }
    }
  }, [])

  //back button
  const handleClick = e => {
    e.preventDefault();
    props.setDetail(false);
  }

  const parseGitLink = (str: String): String[] => {
    let temp = str.slice(19).split('/');
   temp[1] = temp[1].slice(0, temp[1].length - 4);
    return temp;
  }

  //push to git
  const handleGit = (e) => {
    e.preventDefault();
    const [owner, repo] = parseGitLink(state.query.repo);
    const octokit = new Octokit({
      auth: 'AUTH HERE'
    })
    octokit.request('PATCH /repos/{owner}/{repo}/git/refs/heads/{ref}', {
      owner: owner,
      repo: repo,
      ref: branch,
      sha: props.sha,
      force: true
    })
      .then((data) => {
        console.log('response from GitHub is: ', data)
      })
      .catch((err) => {
        console.log('error occured: ', err)
      })

  }


  return (
    <div>
      <button onClick={(e) => handleClick(e)}>Back</button>
      <h1>Manifest Details</h1>
      {mani}
      <input type='text' onChange={(e)=>setBranch(e.target.value)} ></input>
      <button onClick={(e) => handleGit(e)}>Push to git</button>
    </div>
  )
}



export default ManifestDetails;