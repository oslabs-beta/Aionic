import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function ManifestDetails(props) {
  const [mani, setMani] = useState([]);
  useEffect(() => {
    console.log(props.details)
    const manifests = JSON.parse(props.details[0].manifest);
    console.log('child has these: ', props.details)
    const stateArr = [];
    for (const manifest of manifests) {
      stateArr.push(
        <div>
          <p>{manifest}</p>
        </div>
      )
    }
    setMani(stateArr)
  }, [])

  const handleClick = e => {
    e.preventDefault();
    props.setDetail(false);
  }
  return (
    <div>
      <button onClick={(e)=>handleClick(e)}>Back</button>
      <h1>Manifest Details</h1>
      {mani}
      <button>Push to git</button>
    </div>
  )
}

export default ManifestDetails;

// const stateArr: any = [];
    // fetch('http://localhost:3000/api/manifests?' + new URLSearchParams({
    //   uid: state.query.uid
    // }))
    //   .then((data: Response) => data.json())
    //   .then((data: any) => {
    //     console.log('manifests are: ', data);
      
    //     for (const manifest of data) {
    //       const parsed = JSON.parse(manifest.manifest);
    //       for (const parsedMan of parsed) {
    //         stateArr.push(
    //           <div>
    //             <p>Github hash is: {manifest._id}</p>
    //             <p>{parsedMan}</p>
    //           </div>
    //         )
    //       }
        
    //     }
    //     setMlList(stateArr)
    //   })