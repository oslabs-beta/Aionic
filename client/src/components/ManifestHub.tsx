import { Outlet } from "react-router";
import ManifestDetails from "./ManifestDetails";
import ManifestList from "./ManifestList";

function ManifestHub(props) {
  return (
    <div>
      <h1>This is ManifestHub</h1>
      <ManifestList />
      <ManifestDetails/>
    </div>
  )
}

export default ManifestHub;