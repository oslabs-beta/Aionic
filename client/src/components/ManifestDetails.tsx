import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function ManifestDetails(props) {
  const [mlList, setMlList] = useState([]);
  const { state } = useLocation();
  console.log('queryparam in ML List is: ', state.query.uid);
  useEffect(() => {
    const stateArr: any = [];
    fetch('http://localhost:3000/api/manifests?' + new URLSearchParams({
      uid: state.query.uid
    }))
      .then((data: Response) => data.json())
      .then((data: any) => {
        console.log('manifests are: ', data);
      
        for (const manifest of data) {
          const parsed = JSON.parse(manifest.manifest);
          for (const parsedMan of parsed) {
            stateArr.push(
              <div>
                <p>Github hash is: {manifest._id}</p>
                <p>{parsedMan}</p>
              </div>
            )
          }
        
        }
        setMlList(stateArr)
      })
  }, [])
  return (
    <div>
      <h1>Manifest Details</h1>
      {mlList}
    </div>
  )
}

export default ManifestDetails;