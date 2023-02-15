import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function ManifestDetails(props) {
  const [mlList, setMlList] = useState([]);
  const { state } = useLocation();
  console.log('queryparam in ML List is: ', state.query.uid);
  useEffect(() => {
    const stateArr: any = [];
    fetch('http://localhost:3000/api/manifest?' + new URLSearchParams({
      uid: state.query.uid
    }))
      .then((data: Response) => data.json())
      .then((data: string[]) => {
        console.log('manifests are: ', data);
      
        for (const manifest of data) {
          stateArr.push(
            <div>
              <p>{JSON.parse(manifest)}</p>
            </div>
          )
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