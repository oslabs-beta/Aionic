import { Outlet, useLocation } from "react-router";
import ManifestList from "./ManifestList";

function ManifestHub(props) {
  return (
    <div>
      <h1>This is ManifestHub</h1>
      <ManifestList />
    </div>
  )
}

export default ManifestHub;