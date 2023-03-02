import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';
import { GitUserContext } from './Protected';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/default.css';
import yaml from 'highlight.js/lib/languages/json';
hljs.registerLanguage('yaml', yaml);
import yaml2 from 'js-yaml';
function ManifestDetails(props) {
  const [mani, setMani] = useState([]);
  const [branch, setBranch] = useState('');
  const [token, setToken] = useState('');
  const gitUser = useContext(GitUserContext);
  const { state } = useLocation();
  //load each manifest for display
  useEffect(() => {
    let counter = 0;
    getToken();
    const stateArr = [];
    // loop over passed in array to find correct manifests
    for (const obj of props.details) {
      console.log('props.details is: ', props.details);
      if (obj.revision === props.sha) {
        console.log('obj is: ', obj);
        const manifests = JSON.parse(obj.manifest);
        for (const manifest of manifests) {
          if (counter >= manifests.length) {
            setMani(stateArr);
            return;
          }
          const high = hljs.highlight(yaml2.dump(JSON.parse(manifest)), {
            language: 'yaml',
          }).value;
          console.log(
            'typeof manifest is: ',
            typeof manifest,
            JSON.parse(manifest),
            'of manifests is: ',
            typeof manifests,
            high
          );
          stateArr.push(
            <div className='bg-gray-200 max-w-5xl'>
              <pre className='hljs p-5'>
                <code dangerouslySetInnerHTML={{ __html: high }}></code>
              </pre>
            </div>
          );
          console.log('statearr is: ', stateArr);
          setMani(stateArr);
        }
      }
    }
  }, []);
  //get github token from db
  const getToken = () => {
    console.log('getting token, gitUser is: ', gitUser);
    fetch(
      '/server/api/gitToken?' +
        new URLSearchParams({
          user: gitUser,
        })
    )
      .then((data) => data.json())
      .then((data) => {
        console.log('Data recieved from db for token, ', data);
        if (data.githubToken) {
          setToken(data.githubToken);
        } else console.log('token does not exist in DB!');
      });
  };
  //back button
  const handleClick = (e) => {
    e.preventDefault();
    props.setDetail(false);
  };
  //helper function to get repo owner and name
  const parseGitLink = (str: String): String[] => {
    let temp = str.slice(19).split('/');
    temp[1] = temp[1].slice(0, temp[1].length - 4);
    return temp;
  };
  //push to git
  const handleGit = (e) => {
    e.preventDefault();
    const [owner, repo] = parseGitLink(state.query.repo);
    console.log(token);
    const octokit = new Octokit({
      auth: token,
    });
    octokit
      .request('PATCH /repos/{owner}/{repo}/git/refs/heads/{ref}', {
        owner: owner,
        repo: repo,
        ref: branch,
        sha: props.sha,
        force: true,
      })
      .then((data) => {
        console.log('response from GitHub is: ', data);
      })
      .catch((err) => {
        console.log('error occured: ', err);
      });
  };
  //get more manifests
  const moreManifests = () => {
    fetch('http://');
  };
  return (
    <div>
      <button
        className='rounded-md bg-slate-100 hover:bg-slate-200 px-4 py-2'
        onClick={(e) => handleClick(e)}
      >
        ⬅️ Back
      </button>
      <div className='flex flex-col justify-center items-center'>
        {/* container for input and git sha */}
        <div className='flex flex-col -center mb-6 w-2/5'>
          <div className='flex flex-col items-center'>
            <h2 className='text-xl'>Manifests for git sha:</h2>
            <span className='flex justify-center font-mono text-rose-700 mb-3 px-2 rounded'>
              {props.sha}
            </span>
          </div>

          <div className='flex justify-center mb-3'>
            <input
              placeholder='Input git branch name'
              className='flex-none h-10 rounded-tl-md rounded-bl-md w-[490px] px-2 bg-gray-100'
              type='text'
              onChange={(e) => setBranch(e.target.value)}
            />
            <button
              className='flex-none rounded-tr-md rounded-br-md bg-orange-500 hover:bg-orange-600 px-4 text-white w-[7rem]'
              onClick={(e) => handleGit(e)}
            >
              Push to git
            </button>
          </div>
        </div>

        <div className='flex justify-center gap-5'>
          <div className='flex flex-col max-w-2xl gap-5'>{mani}</div>
        </div>
      </div>
    </div>
  );
}
export default ManifestDetails;
