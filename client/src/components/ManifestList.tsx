import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ManifestDetails from './ManifestDetails';

function ManifestList() {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  //grab all the data from backend
  const [mlList, setMlList] = useState([]);
  const [detail, setDetail] = useState(false);
  const [manifests, setManifests] = useState([]);
  const [sha, setSha] = useState('');
  const { state } = useLocation();

  useEffect(() => {
    const stateArr: any = [];
    console.log('uid is: ', state.query.uid);
    fetch(
      '/server/api/manifests?' +
        new URLSearchParams({
          uid: state.query.uid,
        })
    )
      .then((data: Response) => data.json())
      .then((data: any) => {
        console.log('data for this app is: ', data);
        for (const el of data) {
          stateArr.push(
            <div className='border flex flex-row place-content-between  bg-white drop-shadow rounded-md w-9/12 m-2 p-7'>
              <div className='flex flex-col'>
                <h2 className='text-lg'>Git sha:</h2>
                <span className='font-mono text-rose-700 bg-slate-100 px-2 rounded'>
                  {el.revision}
                </span>
              </div>
              <button
                className='rounded-md bg-orange-500 hover:bg-orange-600 px-3 py-1 text-white text-sm'
                onClick={(e) => handleClick(e)}
              >
                View manifests
              </button>
            </div>
          );
        }
        setMlList(stateArr);
        setManifests(data);
      });
  }, []);

  //handle the click for the see more

  const handleClick = (e) => {
    e.preventDefault();
    const gitSha = e.target.parentNode.childNodes[0].childNodes[1].innerText;
    setDetail(true);
    setSha(gitSha);
  };

  //conditional return for displaying the details

  if (!detail) {
    return (
      <div>
        <button
          className='rounded-md bg-slate-100 hover:bg-slate-200 px-4 py-2'
          onClick={(e) => handleBack(e)}
        >
          ⬅️ All apps
        </button>
        {mlList}
      </div>
    );
  } else {
    return (
      <ManifestDetails details={manifests} setDetail={setDetail} sha={sha} />
    );
  }
}

export default ManifestList;
