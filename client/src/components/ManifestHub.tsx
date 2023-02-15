import { Outlet, useLocation } from "react-router";
import ManifestDetails from "./ManifestDetails";
import ManifestList from "./ManifestList";

function ManifestHub(props) {
  const { state } = useLocation();
  console.log('queryparam is: ', state.query.uid);
  return (
    <div>
      <h1>This is ManifestHub</h1>
      <ManifestList />
      <ManifestDetails/>
    </div>
  )
}

export default ManifestHub;