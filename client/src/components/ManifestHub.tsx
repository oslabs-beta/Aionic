import { Outlet, useLocation } from "react-router";
import ManifestList from "./ManifestList";

function ManifestHub() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-300">
      <ManifestList />
    </div>
  )
}

export default ManifestHub;