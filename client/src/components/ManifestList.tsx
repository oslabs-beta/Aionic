import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ManifestDetails from "./ManifestDetails";


function ManifestList() {
  const navigate = useNavigate();

  const handleBack = e => {
    e.preventDefault();
    navigate('/home');
  }

  //grab all the data from backend
  const [mlList, setMlList] = useState([]);
  const [detail, setDetail] = useState(false);
  const [manifests, setManifests] = useState([]);
  const [sha, setSha] = useState('');
  const { state } = useLocation();

  useEffect(() => {
    const stateArr: any = [];
    fetch('http://localhost:3000/api/manifests?' + new URLSearchParams({
      uid: state.query.uid
    }))
      .then((data: Response) => data.json())
      .then((data: any) => {
        console.log('manifests are: ', data);
        for (const el of data) {
          stateArr.push(
            <div>
              <button onClick={(e)=>handleBack(e)}>Back to all apps</button>
              <h2>These are the manifests for git sha: <span>{el.revision}</span></h2>
              <button onClick={(e) => handleClick(e)}>Click to see all manifests from that date</button>
            </div>
          )
        }
        setMlList(stateArr);
        setManifests(data);
      })
  }, []);


  //handle the click for the see more

  const handleClick = e => {
    e.preventDefault();
    const gitSha = e.target.parentNode.childNodes[1].childNodes[1].innerText
    console.log(mlList)
    setDetail(true);
    setSha(gitSha);
  }


  //conditional return for displaying the details
  
  if (!detail) {
    return (
      <div>
        {mlList}
      </div>
    )
  } else {
    return(
      <ManifestDetails
        details={manifests}
        setDetail={setDetail}
        sha={sha}
      />
    )
  }
}

export default ManifestList